import { Viewer } from "./init";
import * as update from "./update";

// LOADERS
import { BaseCustomUniforms } from "./types/interfaces";
import * as mad from './loaders/MadFunctions';
import * as SL from './shaders_lib/shader_lib';

// code here :D -> this function runs once before the application loop be called
export async function start(viewer: Viewer) {
  //setup
  const u: BaseCustomUniforms = mad.CreateUniforms();
  const customMaterial = await mad.NewMaterial(SL.vertex.VERTEX, SL.frag.FRAGMENT, u);

  const model = await mad.LoadModel('jelly');
  model.traverse((childs: any) => {
    childs.material = customMaterial;
  });

  viewer.scene.add(model);

  const uniforms: BaseCustomUniforms = u;
  update.update(viewer, uniforms);
}
