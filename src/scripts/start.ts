import { Viewer } from "./init";
import * as update from "./update";

// LOADERS
// import * as SL from './shaders_lib/shader_lib';
// import * as loader from './loaders/loadGLB';
// import * as loaderTex from './loaders/loadTexture';
// import * as loaderShader from './loaders/loadShader';

// code here :D -> this function runs once before the application loop be called
export async function start(viewer: Viewer) {
  //setup
  const uniforms: [] = [];
  update.update(viewer, uniforms);
}
