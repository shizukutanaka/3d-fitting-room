extends SceneTree
## External runtime verification #3: Godot Engine 4 + godot-vrm (V-Sekai).
## Loads the editor-imported .vrm scene and inspects what the importer made
## of it: skeleton, meshes, VRM meta, humanoid profile.
## Run after `godot --headless --editor --import`:
##   godot --headless --script verify_godot.gd   (with this file in res://)

func _find_all(node: Node, acc: Array) -> void:
	acc.push_back(node)
	for c in node.get_children():
		_find_all(c, acc)


func _init() -> void:
	var failures: Array[String] = []
	for path in ["res://character.vrm", "res://character.glb"]:
		var packed: PackedScene = load(path)
		print("GODOT-REPORT ", path, " loaded=", packed != null)
		if packed == null:
			failures.append(path + " failed to load as PackedScene")
			continue
		var root: Node = packed.instantiate()
		var nodes: Array = []
		_find_all(root, nodes)
		var mesh_count := 0
		var skel: Skeleton3D = null
		var toplevel: Node = null
		for n in nodes:
			if n is MeshInstance3D:
				mesh_count += 1
			if n is Skeleton3D and skel == null:
				skel = n
			var sc: Script = n.get_script()
			if sc and sc.resource_path.ends_with("vrm_toplevel.gd"):
				toplevel = n
		print("GODOT-REPORT ", path, " nodes=", nodes.size(), " mesh_instances=", mesh_count)
		if skel:
			var names: Array[String] = []
			for i in skel.get_bone_count():
				names.append(skel.get_bone_name(i))
			print("GODOT-REPORT ", path, " skeleton_bones=", skel.get_bone_count(), " names=", names)
			if skel.get_bone_count() < 17:
				failures.append(path + ": skeleton has fewer than 17 bones")
		else:
			failures.append(path + ": no Skeleton3D found")
		if path.ends_with(".vrm"):
			if toplevel == null:
				failures.append("vrm: no VRMTopLevel node (VRM extension did not process the file)")
			else:
				var meta: Resource = toplevel.get("vrm_meta")
				if meta:
					print("GODOT-REPORT vrm_meta title=", meta.get("title"),
						" version=", meta.get("version"),
						" authors=", meta.get("authors"),
						" allowed_user=", meta.get("allowed_user_name"),
						" commercial=", meta.get("commercial_usage_type"),
						" other_permission_url=", meta.get("other_permission_url"))
				else:
					failures.append("vrm: VRMTopLevel has no vrm_meta")
		root.free()
	for f in failures:
		print("GODOT-FAIL ", f)
	print("GODOT RESULT: ", "PASS" if failures.is_empty() else "FAIL (%d)" % failures.size())
	quit(0 if failures.is_empty() else 1)
