import * as THREE from "three";
import { Viewer } from "./init";
import Stats from "three/examples/jsm/libs/stats.module";
import { BaseCustomUniforms } from "./types/interfaces";

const clock = new THREE.Clock();
let uniforms: BaseCustomUniforms;
let viewer: Viewer;
let stats: any;

export function update(_viewer: Viewer, _uniforms: BaseCustomUniforms) {
  viewer = _viewer;
  uniforms = _uniforms;

  clock.start();
  stats = Stats();

  viewer.container.appendChild(stats.dom);

  stats.update();

  loop();
}

function loop() {
  requestAnimationFrame(loop);

  const dt = clock.getDelta(); 
  uniforms.time.value += dt;

  viewer.update();
  stats.update();
}
