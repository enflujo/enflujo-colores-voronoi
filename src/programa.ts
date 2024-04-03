import './scss/estilos.scss';
import vs from './espectros/gradienteBasico.vert';
import fs from './espectros/gradienteBasico.frag';
import { crearPrograma, normalizarColor, subirDatosAlEspectro } from './utilidades';

const gl = document.querySelector<HTMLCanvasElement>('#lienzo')?.getContext('webgl') as WebGL2RenderingContext;

const programa = crearPrograma(gl, vs, fs);

if (programa) {
  const posiciones = gl.getAttribLocation(programa, 'posiciones');
  const coordenadasTextura = gl.getAttribLocation(programa, 'coordenadasTextura');

  const arribaIzq = gl.getUniformLocation(programa, 'arribaIzq');
  const arribaDer = gl.getUniformLocation(programa, 'arribaDer');
  const abajoIzq = gl.getUniformLocation(programa, 'abajoIzq');
  const abajoDer = gl.getUniformLocation(programa, 'abajoDer');

  /* 
Las coordenadas van por pares (x, y), cada una es un vértice del triángulo. Aquí hay 3 triángulos. Las primeras 12 coordenadas son las originales, las últimas 6 son el triángulo que está "encima".
Las coordenadas van de -1 a 1. 
En x: -1 = límite izquierdo,  0 = centro, 1 = límite derecho. 
En y: -1 = límite de abajo, 0 = centro, 1 = límite de arriba.
*/
  subirDatosAlEspectro(
    gl,
    posiciones,
    [
      // Triángulo 1
      // v1: izq abajo
      -1, -1,
      // v2: izq arriba
      -1, 1,
      // v3: centro arriba
      0, 0,
      // Triángulo 2
      // v1: centro arriba
      0, 0,
      // v2: der abajo
      1, -1,
      // v3: der arriba
      1, 1,
      // Triángulo 3
      -1, -1, 0, 0, 1, -1,
      // Triángulo 4
      -1, 1, 0, 0, 1, 1,
    ]
  );

  /*
Algo parecido aquí pero con los colores:
0, 0 = azul
0, 1 = amarillo
1, 0 = rojo
1, 1 = blanco

El color se define en cada punto x, y.
*/
  /**
   * Esto parece ser otra cosa porque el color se define abajo en los `uniform3fv`.
   */
  subirDatosAlEspectro(
    gl,
    coordenadasTextura,
    [
      // t1
      0, 1, 1, 1, 1, 0,
      // t2
      1, 0, 0, 1, 1, 1,
      // t3
      0, 1, 1, 0, 0, 1,
      // t4
      1, 1, 1, 0, 1, 1,
    ]
  );

  gl.useProgram(programa);
  gl.uniform3fv(arribaIzq, normalizarColor(200, 55, 138));
  gl.uniform3fv(abajoIzq, normalizarColor(18, 139, 184));
  gl.uniform3fv(arribaDer, normalizarColor(200, 252, 252));
  gl.uniform3fv(abajoDer, normalizarColor(203, 79, 121));
  gl.drawArrays(gl.TRIANGLES, 0, 12);
}
