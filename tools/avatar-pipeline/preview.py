import bpy, sys, math, mathutils
args = sys.argv[sys.argv.index('--')+1:]
out, show = args[0], args[1].split(',')
for o in bpy.data.objects:
    if o.type == 'MESH':
        vis = o.name == 'Body' or o.name in show
        o.hide_render = not vis
cols = {'G_tee': (0.75, 0.2, 0.2), 'G_pants': (0.15, 0.2, 0.4), 'G_dress': (0.3, 0.5, 0.35), 'G_base': (0.5, 0.48, 0.45),
        'G_jacket': (0.35, 0.3, 0.25), 'G_skirt': (0.6, 0.5, 0.2), 'G_shoesLow': (0.1, 0.1, 0.1), 'G_sneakers': (0.9, 0.9, 0.9), 'G_coat': (0.5, 0.4, 0.3), 'G_hoodie': (0.4,0.4,0.45), 'G_shorts': (0.2,0.3,0.5), 'G_boots': (0.25,0.15,0.1), 'G_blouse': (0.9,0.85,0.8), 'G_cardigan': (0.6,0.6,0.5), 'G_dressLong': (0.5,0.2,0.3), 'G_skirtLong': (0.3,0.3,0.3)}
for o in bpy.data.objects:
    if o.name in cols: o.color = (*cols[o.name], 1)
    elif o.type == 'MESH': o.color = (0.85, 0.82, 0.78, 1)
sc = bpy.context.scene
sc.render.engine = 'BLENDER_WORKBENCH'
sc.display.shading.color_type = 'OBJECT'; sc.display.shading.light = 'STUDIO'
sc.display.shading.show_cavity = True
sc.render.resolution_x = 900; sc.render.resolution_y = 900
cam_d = bpy.data.cameras.new('c'); cam = bpy.data.objects.new('c', cam_d); sc.collection.objects.link(cam); sc.camera = cam
cam_d.type = 'ORTHO'; cam_d.ortho_scale = 1.85
imgs = []
for i, ang in enumerate((0, 35, 180)):
    a = math.radians(ang)
    cam.location = (3*math.sin(a), -3*math.cos(a), 0.85)
    cam.rotation_euler = (math.radians(90), 0, a)
    sc.render.filepath = f'{out}_{i}.png'
    bpy.ops.render.render(write_still=True)
