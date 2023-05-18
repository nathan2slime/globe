import * as THREE from "three";

function load_texture_as_promise(texture: string) {
  return new Promise((resolve, _reject) => {
    const texture_loader = new THREE.TextureLoader();
    const textureLoaded = texture_loader.load(`assets/textures/${texture}.png`);
    resolve(textureLoaded);
  }) as Promise<THREE.Texture>;
}
export async function load_texture(texture: string) {
  const textures_promise = await load_texture_as_promise(texture);

  return Promise.resolve(textures_promise).then((texture) => {
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.NearestFilter;
    // texture.wrapS = THREE.RepeatWrapping;
    // texture.wrapT = THREE.RepeatWrapping;
    return texture;
  });
}
