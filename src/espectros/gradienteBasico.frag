precision mediump float;
varying vec2 v_texcoord;
uniform vec3 arribaIzq;
uniform vec3 arribaDer;
uniform vec3 abajoIzq;
uniform vec3 abajoDer;

void main() {
  vec3 izq = mix(abajoIzq, arribaIzq, v_texcoord.t);
  vec3 der = mix(abajoDer, arribaDer, v_texcoord.t);
  vec3 centro = mix(der, izq, v_texcoord.s);
  gl_FragColor = vec4(centro, 1);
}