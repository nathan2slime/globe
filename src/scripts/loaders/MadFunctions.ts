import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { BaseCustomUniforms } from "../types/interfaces";
import * as THREE from "three";

function LoadFile(filename: string): Promise<string> {
  return new THREE.FileLoader().loadAsync(filename) as Promise<string>;
}
function CreateUniforms() {
  const default_uniforms: BaseCustomUniforms = {
    time: { value: 0 },
    base: { value: new THREE.Texture() },
  };
  return default_uniforms;
}
function NewMaterial(vertFilename: any, fragFilename: any, uniforms: any) {

  const default_material = new THREE.ShaderMaterial({
    precision: "mediump",
    opacity: 1,
    uniforms: uniforms,
    // glslVersion: THREE.GLSL3,
  });

  const vertex_shader_promise = LoadFile(`/assets/shaders/${vertFilename}.glsl`);
  const fragment_shader_promise = LoadFile(`/assets/shaders/${fragFilename}.glsl`);

  return Promise.all([vertex_shader_promise, fragment_shader_promise]).then(
    ([vertex, fragment]) => {
      default_material.vertexShader = vertex;
      default_material.fragmentShader = fragment;
      return default_material;
    });
}

// LOAD TEXTURE
function LoadTextureAsPromise(texture: string): Promise<THREE.Texture> {
  return new THREE.TextureLoader().loadAsync(`/assets/textures/${texture}`) as Promise<THREE.Texture>;
}

async function LoadTexture(texture: string) {
  const textures_promise = await LoadTextureAsPromise(texture);
  return Promise.resolve(textures_promise).then((texture) => {
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.NearestFilter;
    return texture;
  });
}

// Load GLTF - GLB
async function LoadModel(name: string) {

  return new Promise((resolve, _reject) => {
    new GLTFLoader().load(`/assets/models/${name}.glb`,
      function (glb) {
        let model = glb.scene as THREE.Group;
        resolve(model);
      },
    )
  }) as Promise<THREE.Group>;
}


export { CreateUniforms, NewMaterial, LoadTexture, LoadModel };
