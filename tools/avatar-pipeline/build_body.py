# Blender headless: CC0 Human Base Mesh -> decimated, baked, rigged mannequin GLB.
# usage: blender -b bundle.blend --python build_body.py -- <SRC_OBJECT> <OUT_DIR> <TAG> [ratio]
import bpy, sys, os, numpy as np, mathutils
args = sys.argv[sys.argv.index('--')+1:]
SRC, OUT, TAG = args[0], args[1], args[2]
RATIO = float(args[3]) if len(args) > 3 else 0.58
os.makedirs(OUT, exist_ok=True)
src = bpy.data.objects[SRC]
eyes = [c for c in src.children if c.type == 'MESH']
keep = {src.name} | {e.name for e in eyes}
for o in list(bpy.data.objects):
    if o.name not in keep:
        bpy.data.objects.remove(o, do_unlink=True)
for o in bpy.data.objects:
    o.hide_set(False); o.hide_viewport = False; o.hide_render = False
# move to origin
off = src.matrix_world.translation.copy()
for e in eyes:
    mw = e.matrix_world.copy(); e.parent = None; e.matrix_world = mw
src.location -= off
for e in eyes: e.location -= off
bpy.context.view_layer.update()
def sel(objs, active):
    bpy.ops.object.select_all(action='DESELECT')
    for o in objs: o.select_set(True)
    bpy.context.view_layer.objects.active = active
# high: duplicate at multires level 2
sel([src], src)
bpy.ops.object.duplicate()
hi = bpy.context.active_object; hi.name = 'HI'
m = hi.modifiers[0]; m.levels = 2
bpy.ops.object.modifier_apply(modifier=m.name)
# low: base level, decimated
sel([src], src)
lo = src; lo.name = 'Body'
m = lo.modifiers[0]; m.levels = 0
bpy.ops.object.modifier_apply(modifier=m.name)
d = lo.modifiers.new('dec', 'DECIMATE'); d.ratio = RATIO; d.use_symmetry = True; d.symmetry_axis = 'X'
bpy.ops.object.modifier_apply(modifier=d.name)
bpy.ops.object.shade_smooth()
# fold UDIM tiles into 0-1 and repack islands
uvl = lo.data.uv_layers.active.data
import math
for poly in lo.data.polygons:
    ls = list(poly.loop_indices)
    cu = sum(uvl[i].uv[0] for i in ls)/len(ls); cv = sum(uvl[i].uv[1] for i in ls)/len(ls)
    fu, fv = math.floor(cu), math.floor(cv)
    for i in ls: uvl[i].uv = (uvl[i].uv[0]-fu, uvl[i].uv[1]-fv)
sel([lo], lo)
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT')
bpy.ops.uv.select_all(action='SELECT')
bpy.ops.uv.average_islands_scale()
bpy.ops.object.mode_set(mode='OBJECT')
import bmesh
from bpy_extras import bmesh_utils
bm = bmesh.new(); bm.from_mesh(lo.data); uvk = bm.loops.layers.uv.active
Hl = max(v.co.z for v in bm.verts)
for isl in bmesh_utils.bmesh_linked_uv_islands(bm, uvk):
    zc_ = sum(f.calc_center_median().z for f in isl)/len(isl)
    xc_ = sum(abs(f.calc_center_median().x) for f in isl)/len(isl)
    k = 2.0 if zc_ > 0.85*Hl else (1.3 if (xc_ > 0.30 and zc_ < 0.62*Hl) else 1.0)
    if k == 1.0: continue
    ls = [l for f in isl for l in f.loops]
    cu = sum(l[uvk].uv.x for l in ls)/len(ls); cv = sum(l[uvk].uv.y for l in ls)/len(ls)
    for l in ls: l[uvk].uv = ((l[uvk].uv.x-cu)*k+cu, (l[uvk].uv.y-cv)*k+cv)
bm.to_mesh(lo.data); bm.free()
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT'); bpy.ops.uv.select_all(action='SELECT')
bpy.ops.uv.pack_islands(rotate=True, margin=0.004)
bpy.ops.object.mode_set(mode='OBJECT')
print('LOW tris', sum(len(p.vertices)-2 for p in lo.data.polygons))
# ---- J-04: mannequin-smooth chest tips and groin on both meshes ----
def smooth_centers(obj):
    c = np.array([v.co[:] for v in obj.data.vertices]); Hh = c[:, 2].max()
    cen = []
    for side in (1, -1):
        m = (c[:, 2] > 0.66*Hh) & (c[:, 2] < 0.78*Hh) & (c[:, 0]*side > 0.04) & (c[:, 0]*side < 0.16)
        q = c[m]; cen.append((q[np.argmin(q[:, 1])], 0.05))
    m = (c[:, 2] > 0.38*Hh) & (c[:, 2] < 0.50*Hh) & (np.abs(c[:, 0]) < 0.06)
    q = c[m]; g = q[np.argmin(q[:, 1])]; cen.append((g, 0.085))
    a, b = cen[0][0], cen[1][0]
    x = (abs(a[0]) + abs(b[0]))/2; y = (a[1] + b[1])/2; z = (a[2] + b[2])/2
    cen[0] = (np.array([x, y, z]), 0.05); cen[1] = (np.array([-x, y, z]), 0.05)
    return cen
CEN = smooth_centers(lo)
print('smooth centres', [np.round(c, 3) for c, r in CEN])
def smooth_region(obj, iters):
    c = np.array([v.co[:] for v in obj.data.vertices])
    w = np.zeros(len(c))
    for cc, r in CEN:
        d = np.linalg.norm(c - cc, axis=1); w = np.maximum(w, np.clip(1 - d/r, 0, 1)**0.7)
    vg = obj.vertex_groups.new(name='smooth')
    for i in np.nonzero(w > 0)[0]: vg.add([int(i)], float(w[i]), 'REPLACE')
    md = obj.modifiers.new('sm', 'SMOOTH'); md.factor = 1.0; md.iterations = iters; md.vertex_group = 'smooth'
    sel([obj], obj); bpy.ops.object.modifier_apply(modifier=md.name)
    obj.vertex_groups.remove(obj.vertex_groups['smooth'])
smooth_region(hi, 60)
smooth_region(lo, 12)
# ---- bake normal + AO (hi -> lo) ----
sc = bpy.context.scene
sc.render.engine = 'CYCLES'; sc.cycles.device = 'CPU'; sc.cycles.samples = 64
mat = bpy.data.materials.new('bake'); mat.use_nodes = True
lo.data.materials.clear(); lo.data.materials.append(mat)
nt = mat.node_tree
def bake(kind, name, cs):
    img = bpy.data.images.new(name, 1024, 1024, alpha=False, float_buffer=False)
    img.colorspace_settings.name = cs
    n = nt.nodes.new('ShaderNodeTexImage'); n.image = img
    nt.nodes.active = n
    sel([hi, lo], lo)
    sc.render.bake.use_selected_to_active = True
    sc.render.bake.cage_extrusion = 0.012
    sc.render.bake.max_ray_distance = 0.03
    sc.render.bake.margin = 8
    if kind == 'NORMAL':
        sc.render.bake.normal_space = 'TANGENT'
    bpy.ops.object.bake(type=kind)
    img.filepath_raw = os.path.join(OUT, f'{TAG}_{name}.png'); img.file_format = 'PNG'; img.save()
    nt.nodes.remove(n)
bake('NORMAL', 'normal', 'Non-Color')
sc.cycles.samples = 128
bake('AO', 'ao', 'Non-Color')
bpy.data.objects.remove(hi, do_unlink=True)
lo.data.materials.clear()
mb = bpy.data.materials.new('mannequin'); lo.data.materials.append(mb)
# join eyes (material slot 1)
me_eye = bpy.data.materials.new('eye')
for e in eyes:
    e.data.materials.clear(); e.data.materials.append(me_eye)
    sel([e], e); bpy.ops.object.shade_smooth()
sel([lo] + eyes, lo); bpy.ops.object.join()
# ---- landmarks ----
co = np.array([v.co[:] for v in lo.data.vertices])
H = co[:, 2].max()
def slab(z, tol=0.012, xmin=None, xmax=None):
    s = co[np.abs(co[:, 2]-z) < tol]
    if xmin is not None: s = s[s[:, 0] > xmin]
    if xmax is not None: s = s[s[:, 0] < xmax]
    return s
def centroid(s): return (s.min(0) + s.max(0)) / 2
# crotch: lowest z where centre line x~0 is covered
zc = H*0.40
while zc < H*0.6:
    s = slab(zc, 0.006)
    s = s[np.abs(s[:, 0]) < 0.015]
    if len(s) and s[:, 1].max() > 0.02: break
    zc += 0.002
crotch = zc
print('H', H, 'crotch', crotch/H)
# arms: verts outside the torso below the armpit
arm = {}
for side in (1, -1):
    s = co[(co[:, 0]*side > 0.20) & (co[:, 2] < 0.80*H) & (co[:, 2] > 0.30*H)]
    c = s.mean(0); u, sv, vt = np.linalg.svd(s - c); ax = vt[0]
    if ax[2] > 0: ax = -ax          # point down the arm
    t = (s - c) @ ax
    tip = c + ax*t.max()
    # shoulder joint: intersect axis with z = 0.815H, pulled inward
    k = (0.815*H - c[2]) / ax[2]
    sh = c + ax*k
    arm[side] = dict(axis=ax, tip=tip, sh=sh)
    print('arm', side, 'tip', tip/H, 'sh', sh/H)
def inner(p, ax, tol=0.012):
    # centre of the limb cross-section through p perpendicular to ax
    d = (co - p) @ ax
    s = co[np.abs(d) < tol]
    s = s[np.linalg.norm((s - p) - np.outer((s - p) @ ax, ax), axis=1) < 0.09]
    return centroid(s) if len(s) else p
def leg_c(z, side):
    s = slab(z, 0.01, 0.0 if side > 0 else None, 0.0 if side < 0 else None)
    s = s[np.abs(s[:, 0]) < 0.2]
    return centroid(s)
def mid(z):
    s = slab(z, 0.012); s = s[np.abs(s[:, 0]) < 0.17]
    return centroid(s)
J = {}
J['hips'] = mid(crotch + 0.06*H)
J['spine'] = mid(0.62*H)
J['chest'] = mid(0.69*H)
J['upperChest'] = mid(0.76*H)
J['neck'] = mid(0.835*H); J['neck'][1] += 0.01
J['head'] = mid(0.875*H)
J['headTop'] = np.array([0, J['head'][1], H])
for side, L in ((1, 'left'), (-1, 'right')):
    # glTF/VRM convention: avatar faces -Y in Blender here, so +X is the avatar's left
    a = arm[side]; ax = a['axis']; sh = a['sh']; tip = a['tip']
    ln = np.linalg.norm(tip - sh)
    J[L+'Shoulder'] = np.array([side*0.03, J['upperChest'][1]-0.005, 0.795*H])
    J[L+'UpperArm'] = inner(sh + ax*0.02*ln, ax)
    J[L+'LowerArm'] = inner(sh + ax*0.435*ln, ax)
    J[L+'Hand'] = inner(sh + ax*0.775*ln, ax)
    J[L+'HandTip'] = tip
    hipx = leg_c(crotch - 0.04*H, side)
    J[L+'UpperLeg'] = np.array([hipx[0], J['hips'][1], crotch + 0.045*H])
    J[L+'LowerLeg'] = leg_c(0.285*H, side)
    an = leg_c(0.05*H, side); J[L+'Foot'] = an
    f = co[(co[:, 0]*side > 0) & (co[:, 2] < 0.03*H)]
    toe = f[np.argmin(f[:, 1])]
    J[L+'Toes'] = np.array([an[0], toe[1]*0.62 + an[1]*0.38, 0.012*H])
    J[L+'ToeTip'] = np.array([an[0], toe[1], 0.012*H])
for k in list(J):
    if k.startswith('left'):
        r = 'right'+k[4:]; a = J[k]; b = J[r]
        x = (abs(a[0])+abs(b[0]))/2; y = (a[1]+b[1])/2; z = (a[2]+b[2])/2
        J[k] = np.array([x, y, z]); J[r] = np.array([-x, y, z])
    elif not k.startswith('right'):
        J[k] = np.array([0.0, J[k][1], J[k][2]])
for k, v in J.items(): print('J', k, np.round(v, 3), round(v[2]/H, 3))
# ---- armature ----
bpy.ops.object.armature_add(location=(0, 0, 0)); arm_o = bpy.context.active_object; arm_o.name = 'Armature'
bpy.ops.object.mode_set(mode='EDIT')
eb = arm_o.data.edit_bones; eb.remove(eb[0])
def V(p): return mathutils.Vector((float(p[0]), float(p[1]), float(p[2])))
chain = [('hips', None, 'spine'), ('spine', 'hips', 'chest'), ('chest', 'spine', 'upperChest'),
         ('upperChest', 'chest', 'neck'), ('neck', 'upperChest', 'head'), ('head', 'neck', 'headTop')]
for L in ('left', 'right'):
    chain += [(L+'Shoulder', 'upperChest', L+'UpperArm'), (L+'UpperArm', L+'Shoulder', L+'LowerArm'),
              (L+'LowerArm', L+'UpperArm', L+'Hand'), (L+'Hand', L+'LowerArm', L+'HandTip'),
              (L+'UpperLeg', 'hips', L+'LowerLeg'), (L+'LowerLeg', L+'UpperLeg', L+'Foot'),
              (L+'Foot', L+'LowerLeg', L+'Toes'), (L+'Toes', L+'Foot', L+'ToeTip')]
for name, parent, tail in chain:
    b = eb.new(name); b.head = V(J[name]); b.tail = V(J[tail])
    if (b.tail - b.head).length < 1e-3: b.tail = b.head + mathutils.Vector((0, 0, 0.05))
    if parent: b.parent = eb[parent]
bpy.ops.object.mode_set(mode='OBJECT')
sel([lo, arm_o], arm_o)
bpy.ops.object.parent_set(type='ARMATURE_AUTO')
empty = [g.name for g in lo.vertex_groups if not any(g.index in [x.group for x in v.groups] for v in lo.data.vertices[:1])]
print('vgroups', len(lo.vertex_groups))
# eyes rigid to head
eyemask = np.array([p.material_index == 1 for p in lo.data.polygons])
eye_verts = {vi for p in lo.data.polygons if p.material_index == 1 for vi in p.vertices}
gh = lo.vertex_groups['head']
for g in lo.vertex_groups:
    g.remove(list(eye_verts))
gh.add(list(eye_verts), 1.0, 'REPLACE')
unweighted = sum(1 for v in lo.data.vertices if len(v.groups) == 0)
print('unweighted verts', unweighted)
np.save(os.path.join(OUT, f'{TAG}_joints.npy'), np.array([J[k] for k in sorted(J)]))
with open(os.path.join(OUT, f'{TAG}_joints.txt'), 'w') as fh:
    for k in sorted(J): fh.write(f'{k} {J[k][0]:.4f} {J[k][1]:.4f} {J[k][2]:.4f}\n')
exec(open(os.path.join(os.path.dirname(__file__), 'garments.py')).read())
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT, f'{TAG}_rigged.blend'))
sel([lo, arm_o] + GARMENTS, arm_o)
bpy.ops.export_scene.gltf(filepath=os.path.join(OUT, f'{TAG}.glb'), export_format='GLB', use_selection=True,
    export_skins=True, export_animations=False, export_materials='EXPORT', export_image_format='NONE',
    export_yup=True, export_texcoords=True, export_normals=True, export_tangents=False, export_morph=False)
print('DONE')
