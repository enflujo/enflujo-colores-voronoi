export function crearPrograma(gl: WebGL2RenderingContext, espectroVertices: string, espectroFragmentos: string) {
  const programa = gl.createProgram();
  if (!programa) return;

  const vertices = crearEspectro(gl, gl.VERTEX_SHADER, espectroVertices);
  const fragmentos = crearEspectro(gl, gl.FRAGMENT_SHADER, espectroFragmentos);

  if (!vertices || !fragmentos) return;

  gl.attachShader(programa, vertices);
  gl.attachShader(programa, fragmentos);
  gl.linkProgram(programa);

  const success = gl.getProgramParameter(programa, gl.LINK_STATUS);
  if (success) return programa;

  console.log(gl.getProgramInfoLog(programa));
  gl.deleteProgram(programa);
}

function crearEspectro(gl: WebGL2RenderingContext, tipo: number, fuente: string) {
  const espectro = gl.createShader(tipo);

  if (!espectro) return;
  gl.shaderSource(espectro, fuente);
  gl.compileShader(espectro);
  var success = gl.getShaderParameter(espectro, gl.COMPILE_STATUS);
  if (success) return espectro;

  console.log(gl.getShaderInfoLog(espectro));
  gl.deleteShader(espectro);
}

export function subirDatosAlEspectro(gl: WebGL2RenderingContext, loc: number, data: number[]) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(
    loc,
    2, // 2 elements per iteration
    gl.FLOAT, // type of data in buffer
    false, // normalize
    0, // stride
    0 // offset
  );
}

export function normalizarColor(r: number, g: number, b: number) {
  return [r / 255, g / 255, b / 255];
}
