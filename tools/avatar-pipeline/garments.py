# Garments cut from the rigged body surface (same UVs, same skin weights),
# so every garment fits the body by construction and follows the skeleton
# (and Body Scale Calibration) without per-garment rigging.
# exec'd from build_body.py: uses lo, arm_o, J, H, crotch, sel, np, bpy, mathutils.
import bmesh, math
GARMENTS = []
GI = {g.name: g.index for g in lo.vertex_groups}
def gset(*names): return {GI[n] for n in names if n in GI}
ARM = {1: gset('leftUpperArm', 'leftLowerArm', 'leftHand'), -1: gset('rightUpperArm', 'rightLowerArm', 'rightHand')}
ARMS = ARM[1] | ARM[-1]
FEET = gset('leftFoot', 'leftToes', 'rightFoot', 'rightToes')
def wsum(v, dl, groups): return sum(w for g, w in v[dl].items() if g in groups)
def arm_t(p, side):
    a = arm[side]; ln = np.linalg.norm(a['tip'] - a['sh'])
    return float(np.dot(np.array(p) - a['sh'], a['axis']) / ln)
def new_mat(name):
    m = bpy.data.materials.get(name) or bpy.data.materials.new(name); return m
def finish(o, name, rim=0.004, dec=1.0):
    o.data.materials.clear(); o.data.materials.append(new_mat(name))
    for p in o.data.polygons: p.material_index = 0
    sel([o], o); bpy.ops.object.shade_smooth()
    if dec < 1.0:
        md = o.modifiers.new('dec', 'DECIMATE'); md.ratio = dec
        bpy.ops.object.modifier_move_to_index(modifier='dec', index=0)
        bpy.ops.object.modifier_apply(modifier='dec')
    if rim > 0:
        md = o.modifiers.new('rim', 'SOLIDIFY'); md.thickness = rim; md.offset = -1
        md.use_rim_only = True; md.use_even_offset = True
        bpy.ops.object.modifier_move_to_index(modifier='rim', index=0)
        bpy.ops.object.modifier_apply(modifier='rim')
    GARMENTS.append(o)
    print('GARMENT', name, sum(len(p.vertices)-2 for p in o.data.polygons), 'tris')
    return o
def surface(name, cuts, ease, drop=lambda c, v, dl: False):
    """Copy the body, bisect along hem planes, drop the far side, inflate.
    cuts: list of (point, normal, mask(v, dl)) -> delete where dot(c-p, n) > 0 and mask.
    ease(co, v, dl) -> outward offset in metres."""
    o = lo.copy(); o.data = lo.data.copy(); o.name = name
    bpy.context.collection.objects.link(o)
    bm = bmesh.new(); bm.from_mesh(o.data); dl = bm.verts.layers.deform.active
    bmesh.ops.delete(bm, geom=[f for f in bm.faces if f.material_index == 1], context='FACES')
    for p, n, mask in cuts:
        bmesh.ops.bisect_plane(bm, geom=bm.verts[:] + bm.edges[:] + bm.faces[:], plane_co=p, plane_no=n)
    P = [(mathutils.Vector(p), mathutils.Vector(n).normalized(), mask) for p, n, mask in cuts]
    kill = []
    for f in bm.faces:
        c = f.calc_center_median()
        vs = f.verts
        if drop(c, vs, dl): kill.append(f); continue
        for p, n, mask in P:
            if (c - p).dot(n) > 1e-5 and all(mask(v, dl) for v in vs):
                kill.append(f); break
    bmesh.ops.delete(bm, geom=kill, context='FACES')
    bmesh.ops.delete(bm, geom=[v for v in bm.verts if not v.link_faces], context='VERTS')
    inner = [v for v in bm.verts if not v.is_boundary]
    for _ in range(2):
        bmesh.ops.smooth_vert(bm, verts=inner, factor=0.5, use_axis_x=True, use_axis_y=True, use_axis_z=True)
    bm.normal_update()
    off = [(v, v.normal.copy(), ease(v.co, v, dl)) for v in bm.verts]
    for v, n, e in off: v.co += n * e
    bm.to_mesh(o.data); bm.free()
    return o
ANY = lambda v, dl: True
def armmask(side): return lambda v, dl: wsum(v, dl, ARM[side]) > 0.3
def no_arms(c, vs, dl): return sum(wsum(v, dl, ARMS) for v in vs) / len(vs) > 0.5
def no_feet(c, vs, dl): return sum(wsum(v, dl, FEET) for v in vs) / len(vs) > 0.5
def hem(z): return ((0, 0, z), (0, 0, -1), ANY)
def neckline(drop_front, lower=0.0):
    p = (0, J['neck'][1], J['neck'][2] - 0.012*H - lower)
    return (p, (0, -drop_front, 1), lambda v, dl: abs(v.co.x) < 0.2)
def sleeves(t):
    out = []
    for side in (1, -1):
        a = arm[side]; ln = np.linalg.norm(a['tip'] - a['sh'])
        out.append((tuple(a['sh'] + a['axis']*t*ln), tuple(a['axis']), armmask(side)))
    return out
def top_ease(base, cuff=0.0):
    def e(co, v, dl):
        aw = wsum(v, dl, ARMS)
        if aw > 0.3:
            side = 1 if co.x > 0 else -1
            return base + cuff*max(0.0, arm_t(co, side))
        return base
    return e
def make_top(name, sleeve_t, ease, hem_z, neck_drop, neck_lower=0.0, cuff=0.004, rim=0.004):
    o = surface(name, [hem(hem_z), neckline(neck_drop, neck_lower)] + sleeves(sleeve_t), top_ease(ease, cuff),
                drop=lambda c, vs, dl: c.z < hem_z or no_feet(c, vs, dl))
    return o
def leg_ease(waist_e, flare):
    def e(co, v, dl):
        k = max(0.0, (crotch - co.z) / crotch)
        return waist_e + flare * k
    return e
def make_bottom(name, waist_z, hem_z, ease_w, flare, rim=0.004):
    return surface(name, [((0, 0, waist_z), (0, 0, 1), ANY), hem(hem_z)], leg_ease(ease_w, flare),
                   drop=lambda c, vs, dl: no_arms(c, vs, dl) or c.z > waist_z + 0.01)
# ---- lathe skirts (not body-hugging: the body has two legs) ----
BODY_CO = np.array([v.co[:] for v in lo.data.vertices])
BODY_ARM = np.array([sum(g.weight for g in v.groups if g.group in ARMS) for v in lo.data.vertices])
TORSO = BODY_CO[(BODY_ARM < 0.2)]
def skirt(name, z_top, z_hem, ease, flare, na=40, nr=14):
    yc = J['hips'][1]
    me = bpy.data.meshes.new(name); o = bpy.data.objects.new(name, me)
    bpy.context.collection.objects.link(o)
    bm = bmesh.new(); uvl = bm.loops.layers.uv.new('UVMap')
    rings = []; prev = None
    for r_i in range(nr + 1):
        t = r_i / nr; z = z_top + (z_hem - z_top) * t
        s = TORSO[np.abs(TORSO[:, 2] - z) < 0.02]
        ang = np.arctan2(s[:, 1] - yc, s[:, 0]); rad = np.hypot(s[:, 0], s[:, 1] - yc)
        ring = []
        for a_i in range(na):
            th = 2*math.pi*a_i/na
            d = np.abs((ang - th + math.pi) % (2*math.pi) - math.pi)
            rb = rad[d < 0.25].max() if np.any(d < 0.25) else 0.1
            r = rb + ease + flare*(z_top - z)
            if prev is not None: r = max(r, prev[a_i])
            ring.append(r)
        prev = ring
        rings.append([bm.verts.new((r*math.cos(2*math.pi*a/na), yc + r*math.sin(2*math.pi*a/na), z)) for a, r in enumerate(ring)])
    for r_i in range(nr):
        for a in range(na):
            b = (a + 1) % na
            f = bm.faces.new((rings[r_i][a], rings[r_i][b], rings[r_i+1][b], rings[r_i+1][a]))
            for l, (uu, vv) in zip(f.loops, ((a, r_i), (a+1, r_i), (a+1, r_i+1), (a, r_i+1))):
                l[uvl].uv = (uu/na*1.6, vv/nr*(z_top - z_hem)*1.6)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    bm.to_mesh(me); bm.free()
    for gname in ('hips', 'leftUpperLeg', 'rightUpperLeg'): o.vertex_groups.new(name=gname)
    for v in me.vertices:
        t = (z_top - v.co.z) / max(1e-4, z_top - z_hem)
        sx = max(-1.0, min(1.0, v.co.x / 0.12))
        wl = min(0.75, 0.9 * t) * abs(sx) ** 0.5
        o.vertex_groups['hips'].add([v.index], 1 - wl, 'REPLACE')
        if wl > 0: o.vertex_groups['leftUpperLeg' if sx > 0 else 'rightUpperLeg'].add([v.index], wl, 'REPLACE')
    o.parent = arm_o
    md = o.modifiers.new('Armature', 'ARMATURE'); md.object = arm_o
    return o
def join(a, b):
    sel([a, b], a); bpy.ops.object.join(); return a
WAIST = 0.595*H
# tops
finish(make_top('G_tee', 0.27, 0.011, 0.535*H, 0.5), 'tee')
finish(make_top('G_blouse', 0.75, 0.012, 0.545*H, 1.1, 0.01, cuff=0.01), 'blouse')
finish(make_top('G_hoodie', 0.73, 0.022, 0.505*H, 0.15, 0.0, cuff=0.006), 'hoodie', rim=0.008)
d = make_top('G_dress', 0.10, 0.010, 0.58*H, 0.7)
finish(join(d, skirt('dskirt', 0.60*H, 0.33*H, 0.004, 0.10)), 'dress')
d = make_top('G_dressLong', 0.10, 0.010, 0.58*H, 0.7)
finish(join(d, skirt('dlskirt', 0.60*H, 0.10*H, 0.004, 0.09)), 'dressLong')
# outer layers (over any top)
j = make_top('G_jacket', 0.77, 0.028, 0.615*H, 1.2, 0.02, cuff=0.006)
finish(join(j, skirt('jskirt', 0.615*H, 0.50*H, 0.030, 0.14)), 'jacket', rim=0.007)
k = make_top('G_cardigan', 0.75, 0.024, 0.615*H, 1.8, 0.03, cuff=0.004)
finish(join(k, skirt('kskirt', 0.615*H, 0.475*H, 0.026, 0.13)), 'cardigan', rim=0.006)
c = make_top('G_coat', 0.78, 0.034, 0.56*H, 1.2, 0.02, cuff=0.006)
finish(join(c, skirt('cskirt', 0.585*H, 0.26*H, 0.026, 0.12)), 'coat', rim=0.008)
# bottoms
finish(make_bottom('G_pants', WAIST, 0.06*H, 0.007, 0.03), 'pants')
finish(make_bottom('G_shorts', WAIST, 0.36*H, 0.007, 0.03), 'shorts')
finish(skirt('G_skirt', WAIST, 0.36*H, 0.008, 0.12), 'skirt')
finish(skirt('G_skirtLong', WAIST, 0.10*H, 0.008, 0.10), 'skirtLong')
# shoes
def shoe(name, top_z, ease):
    return surface(name, [((0, 0, top_z), (0, 0, 1), ANY)], lambda co, v, dl: ease + (0.004 if co.z < 0.01 else 0.0),
                   drop=lambda c, vs, dl: no_arms(c, vs, dl) or c.z > top_z + 0.01)
finish(shoe('G_shoesLow', 0.045*H, 0.004), 'shoesLow', rim=0.003, dec=0.45)
finish(shoe('G_sneakers', 0.06*H, 0.007), 'sneakers', rim=0.005, dec=0.45)
finish(shoe('G_boots', 0.22*H, 0.006), 'boots', rim=0.004, dec=0.45)
# always-on opaque base layer (LEGAL-ETHICS §2 / J-04)
b1 = surface('G_base', [((0, 0, 0.545*H), (0, 0, 1), ANY), hem(crotch - 0.025*H)], lambda co, v, dl: 0.0022,
             drop=lambda c, vs, dl: no_arms(c, vs, dl) or c.z > 0.55*H)
b2 = surface('baseTop', [((0, 0, 0.79*H), (0, 0, 1), ANY), hem(0.655*H)], lambda co, v, dl: 0.0028,
             drop=lambda c, vs, dl: no_arms(c, vs, dl) or c.z > 0.80*H)
finish(join(b1, b2), 'base', rim=0.002)
