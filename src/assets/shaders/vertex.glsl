precision mediump float;

void main(void){
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}