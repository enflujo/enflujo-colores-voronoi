/*
De https://webgl2fundamentals.org/webgl/lessons/webgl-fundamentals.html
Para trabajar en pixeles y no en "clip space", se cambia el shader para poder pasar la posición en pixeles. En vez de vec4, usamos vec2, que solo tiene valores x y z.
  attribute vec2 a_position;
 
 Luego agregamos un 'uniform' llamado u_resolution. To set that we need to look up its location.
  uniform vec2 u_resolution;
 
  void main() {
    /convertir la posición de pixeles a 0.0 - 1.0
    vec2 zeroToOne = a_position / u_resolution;
 
    / convertir de 0->1 a 0->2
    vec2 zeroToTwo = zeroToOne * 2.0;
 
    / convertir de  0->2 a -1->+1 (clip space)
    vec2 clipSpace = zeroToTwo - 1.0;
 
    gl_Position = vec4(clipSpace, 0, 1);
  }
*/


attribute vec4 posiciones;
attribute vec2 coordenadasTextura;
varying vec2 v_texcoord;
void main() {
  gl_Position = posiciones;
  v_texcoord = coordenadasTextura;
}