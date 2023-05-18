import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function CustomLoadModel(name: string) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      `src/assets/${name}.glb`,
      function (glb) {
        let model = glb.scene as THREE.Group;
        model.traverse((n) => {
          if (n.isObject3D) {
            n.castShadow = true;
            n.receiveShadow = true;
          }
        });
        resolve(model);
      },
      (_xhr) => {
        //console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      },
      (_error) => {
        reject("erro ao carregar modelo");
      },
    );
  }) as Promise<THREE.Group>;
}
