'use strict';
const work = { src:null, img:null, mask:null, cut:null, bbox:null, w:0, h:0, tol:30, history:[] };

function setSource(canvas, isSample){
  work.src = canvas; work.w = canvas.width; work.h = canvas.height;
  work.img = canvas.getContext('2d').getImageData(0, 0, work.w, work.h);
  work.mask = new Uint8ClampedArray(work.w * work.h).fill(255);
  work.cut = document.createElement('canvas'); work.cut.width = work.w; work.cut.height = work.h;
  work.history = [];
  state.sample = isSample; state.scale = 1; state.dx = 0; state.dy = 0;
  autoCut(); applyMask();
}

function autoCut(){
  const { w, h } = work, d = work.img.data, N = w * h;
  const tol = work.tol, local = (tol * 0.5) ** 2 * 3, global = (tol * 2) ** 2 * 3;
  const dist = (a, b) => { a *= 4; b *= 4; const r = d[a]-d[b], g = d[a+1]-d[b+1], bl = d[a+2]-d[b+2]; return r*r + g*g + bl*bl; };
  // 테두리 색 분포로 '배경일 가능성이 높은' 테두리 픽셀만 시작점으로 사용
  const border = [];
  for (let x = 0; x < w; x++){ border.push(x, (h-1)*w + x); }
  for (let y = 1; y < h-1; y++){ border.push(y*w, y*w + w - 1); }
  const key = i => ((d[i*4] >> 4) << 8) | ((d[i*4+1] >> 4) << 4) | (d[i*4+2] >> 4);
  const hist = new Uint32Array(4096); for (const i of border) hist[key(i)]++;
  const thr = border.length * 0.02;
  const seed = new Int32Array(N).fill(-1), q = new Int32Array(N); let qh = 0, qt = 0;
  for (const i of border){ if (seed[i] === -1 && hist[key(i)] >= thr){ seed[i] = i; q[qt++] = i; } }
  while (qh < qt){
    const i = q[qh++], x = i % w, s = seed[i];
    const nb = [x > 0 ? i-1 : -1, x < w-1 ? i+1 : -1, i-w, i+w];
    for (const j of nb){
      if (j < 0 || j >= N || seed[j] !== -1) continue;
      if (dist(i, j) < local && dist(s, j) < global){ seed[j] = s; q[qt++] = j; }
    }
  }
  const m = work.mask;
  for (let i = 0; i < N; i++) m[i] = seed[i] >= 0 ? 0 : 255;
  // 가장자리 살짝 부드럽게
  const out = new Uint8ClampedArray(N);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++){
    let s = 0, c = 0;
    for (let yy = Math.max(0, y-1); yy <= Math.min(h-1, y+1); yy++)
      for (let xx = Math.max(0, x-1); xx <= Math.min(w-1, x+1); xx++){ s += m[yy*w + xx]; c++; }
    out[y*w + x] = s / c;
  }
  work.mask = out;
}

function applyMask(){
  const { w, h, mask } = work;
  const id = new ImageData(new Uint8ClampedArray(work.img.data), w, h);
  let x0 = w, y0 = h, x1 = -1, y1 = -1;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++){
    const i = y*w + x, a = mask[i]; id.data[i*4+3] = a;
    if (a > 40){ if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  }
  work.cut.getContext('2d').putImageData(id, 0, 0);
  work.bbox = x1 < 0 ? { x:0, y:0, w, h } : { x:x0, y:y0, w:x1-x0+1, h:y1-y0+1 };
}

function pushHistory(){ work.history.push(new Uint8ClampedArray(work.mask)); if (work.history.length > 15) work.history.shift(); }

