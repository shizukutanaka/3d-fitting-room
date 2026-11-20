# External runtime verification #2: Blender 5.2 + VRM Addon for Blender
# (saturday06) — an independent VRM importer implementation (Python, its own
# glTF/VRM parser), unrelated to three.js.
# Run: blender --background --factory-startup --python verify-blender.py -- <file.vrm> [file.glb]
# Prints a JSON report between BLENDER-REPORT-BEGIN/END markers.
import bpy
import json
import sys
import traceback

argv = sys.argv[sys.argv.index("--") + 1:]
vrm_path = argv[0]
glb_path = argv[1] if len(argv) > 1 else None

report = {"runtime": "Blender " + bpy.app.version_string + " + VRM Addon for Blender"}


def clear_scene():
    # NOTE: read_factory_settings would unregister the extension again,
    # so just delete every object instead.
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete()


def scene_stats():
    meshes = [o for o in bpy.context.scene.objects if o.type == "MESH"]
    arms = [o for o in bpy.context.scene.objects if o.type == "ARMATURE"]
    return meshes, arms


# ---- VRM import ----
# The addon is installed as a Blender extension; make sure it is enabled
# even under --factory-startup (which skips saved preferences).
try:
    bpy.ops.preferences.addon_enable(module="bl_ext.user_default.vrm")
except Exception:
    pass
clear_scene()
vrm_result = {}
try:
    res = bpy.ops.import_scene.vrm(filepath=vrm_path)
    vrm_result["operator_result"] = sorted(res)
    meshes, arms = scene_stats()
    vrm_result["mesh_objects"] = len(meshes)
    vrm_result["total_vertices"] = sum(len(o.data.vertices) for o in meshes)
    vrm_result["armatures"] = len(arms)
    if arms:
        arm = arms[0]
        bones = [b.name for b in arm.data.bones]
        vrm_result["bone_count"] = len(bones)
        vrm_result["bone_names"] = bones
        ext = getattr(arm.data, "vrm_addon_extension", None)
        if ext is not None:
            vrm_result["spec_version"] = getattr(ext, "spec_version", None)
            vrm1 = getattr(ext, "vrm1", None)
            if vrm1 is not None:
                meta = getattr(vrm1, "meta", None)
                if meta is not None:
                    # NOTE: the addon stores the VRM meta "name" in `vrm_name`
                    # (plain `name` is Blender's built-in ID property), and it
                    # does not read meta.licenseUrl at all: its importer only
                    # reads `otherLicenseUrl` (see importer/vrm1_importer.py)
                    # and its exporter always writes the standard license URL.
                    vrm_result["meta"] = {
                        "name": getattr(meta, "vrm_name", None),
                        "version": getattr(meta, "version", None),
                        "authors": [a.value for a in getattr(meta, "authors", [])],
                        "copyright_information": getattr(meta, "copyright_information", None),
                        "other_license_url": getattr(meta, "other_license_url", None),
                        "avatar_permission": getattr(meta, "avatar_permission", None),
                        "commercial_usage": getattr(meta, "commercial_usage", None),
                        "credit_notation": getattr(meta, "credit_notation", None),
                        "allow_redistribution": getattr(meta, "allow_redistribution", None),
                        "modification": getattr(meta, "modification", None),
                    }
                hb = getattr(getattr(vrm1, "humanoid", None), "human_bones", None)
                if hb is not None:
                    bone_attrs = [
                        "hips", "spine", "chest", "upper_chest", "neck", "head",
                        "left_eye", "right_eye", "jaw",
                        "left_upper_leg", "left_lower_leg", "left_foot", "left_toes",
                        "right_upper_leg", "right_lower_leg", "right_foot", "right_toes",
                        "left_shoulder", "left_upper_arm", "left_lower_arm", "left_hand",
                        "right_shoulder", "right_upper_arm", "right_lower_arm", "right_hand",
                    ]
                    mapping = {}
                    for attr in bone_attrs:
                        entry = getattr(hb, attr, None)
                        node = getattr(entry, "node", None) if entry is not None else None
                        bone_name = getattr(node, "bone_name", "") if node is not None else ""
                        if bone_name:
                            mapping[attr] = bone_name
                    vrm_result["humanoid_mapping"] = mapping
                    vrm_result["humanoid_mapped_count"] = len(mapping)
    vrm_result["imported"] = True
except Exception:
    vrm_result["imported"] = False
    vrm_result["error"] = traceback.format_exc()
report["vrm"] = vrm_result

# ---- plain GLB import (Blender's bundled glTF importer) ----
if glb_path:
    clear_scene()
    glb_result = {}
    try:
        res = bpy.ops.import_scene.gltf(filepath=glb_path)
        glb_result["operator_result"] = sorted(res)
        meshes, arms = scene_stats()
        glb_result["mesh_objects"] = len(meshes)
        glb_result["armatures"] = len(arms)
        glb_result["bone_count"] = len(arms[0].data.bones) if arms else 0
        glb_result["imported"] = True
    except Exception:
        glb_result["imported"] = False
        glb_result["error"] = traceback.format_exc()
    report["glb"] = glb_result

print("BLENDER-REPORT-BEGIN")
print(json.dumps(report, indent=1, ensure_ascii=False, default=str))
print("BLENDER-REPORT-END")
