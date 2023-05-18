import * as THREE from "three";
import { Viewer } from "./init";
import Stats from "three/examples/jsm/libs/stats.module";

let _viewer: Viewer;
const clock = new THREE.Clock();
let _uniforms: any;
let stats: any;

export function update(viewer: Viewer, uniforms: any) {
  _viewer = viewer;
  _uniforms = uniforms;

  clock.start();

  stats = Stats();
  viewer.container.appendChild(stats.dom);
  stats.update();

  loop();
}

function loop() {
  requestAnimationFrame(loop);

  if (_uniforms != null) {
    _uniforms.map((uni: any) => {
      uni.time.value = clock.getElapsedTime();
      uni.cameraViewMatrix.value = _viewer.camera.matrixWorldInverse;
      const camPos = _viewer.camera.position;
      uni.camPos.value = camPos;
    });
  }

  _viewer.update();
  stats.update();
}
