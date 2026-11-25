# Mannequin asset pipeline

Builds `public/models/mannequin-{a,b}.glb` and their baked maps
(`-normal.webp`, `-ao.webp`) in Blender (tested with Blender 5.3).

## Source and license

- Source: Blender Studio "Human Base Meshes" bundle v1.4.1,
  realistic body collections
  (`human-base-meshes-bundle-v1.4.1.zip` from download.blender.org,
  asset-bundles/human-base-meshes).
- License: **CC0 1.0** (asset metadata: author Dan Ulrich / Blender
  Studio). The derived mannequins and garments are also released
  under CC0, consistent with the app's CC0 export terms.
- Not used: MakeHuman / MPFB, generative AI, real-person scans.

## What the scripts do

- `build_body.py`: decimates the sculpt to ~12k triangles, flattens
  chest/groin detail into a mannequin form, repacks UVs, bakes a 1K
  normal map and AO from the full-resolution sculpt, builds a
  22-bone humanoid armature with automatic weights, calls
  `garments.py`, and exports a skinned GLB (no embedded images).
- `garments.py`: cuts every garment from the body surface (offset,
  ease, thickness, hem rims), skins it to the same armature, and
  always adds an opaque base layer (`G_base`).
- `preview.py`: Eevee preview renders for quick review.

Run per figure: `-- <source object> <out dir> <tag> [decimate ratio, default 0.58]`
(the source object is the realistic body mesh in the bundle; its
mesh children — the eyes — are kept).

```sh
Blender -b human_base_meshes_bundle.blend -P build_body.py -- <female body object> out/ female
Blender -b human_base_meshes_bundle.blend -P build_body.py -- <male body object> out/ male
```

Figures are labelled A / B in the app, never by gender
(docs/LEGAL-ETHICS.md J-04).

## Material rules

- **Hair materials must use alpha-test cutout (`alphaTest`, glTF `alphaMode: "MASK"`), never transparent blending (`transparent: true` / `"BLEND"`).** Layered hair cards with alpha blending cause heavy overdraw and sort-order artefacts on standalone XR GPUs (Quest). Prefix hair meshes with `H_` (or name the material `*hair*`); the runtime normalizes them via `applyHairCutoutRule` / `createHairMaterial` in `src/avatar.ts` (`HAIR_ALPHA_TEST = 0.5`, `depthWrite = true`, `transparent = false`), and `src/export3d.ts` exports them as `alphaMode: "MASK"`.
