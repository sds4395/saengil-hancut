'use strict';
const ed = { canvas: $('#edCanvas'), ctx: null, id: null, mode: 'erase', size: 26, last: null, saved: null };
ed.ctx = ed.canvas.getContext('2d');
function edCompose(){
  const { w, h, mask } = work; ed.canvas.width = w; ed.canvas.height = h;
  ed.id = new ImageData(new Uint8ClampedArray(work.img.data), w, h);
  for (let i = 0; i < w*h; i++) ed.id.data[i*4+3] = mask[i];
  ed.ctx.putImageData(ed.id, 0, 0);
}
function openEditor(){ ed.saved = new Uint8ClampedArray(work.mask); $('#tol').value = work.tol; $('#tolOut').textContent = work.tol; edCompose(); $('#editor').hidden = false; }
function closeEditor(){ $('#editor').hidden = true; }
function dab(px, py){
  const { w, h, mask } = work; const k = w / ed.canvas.getBoundingClientRect().width; const r = ed.size * k;
  const x0 = Math.max(0, Math.floor(px - r)), x1 = Math.min(w-1, Math.ceil(px + r));
  const y0 = Math.max(0, Math.floor(py - r)), y1 = Math.min(h-1, Math.ceil(py + r));
  const v = ed.mode === 'erase' ? 0 : 255, r2 = r*r;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++){
    const dx = x - px, dy = y - py; if (dx*dx + dy*dy > r2) continue;
    const i = y*w + x; mask[i] = v; ed.id.data[i*4+3] = v;
  }
  ed.ctx.putImageData(ed.id, 0, 0, x0, y0, x1 - x0 + 1, y1 - y0 + 1);
}
function edPoint(e){ const rc = ed.canvas.getBoundingClientRect(); return [(e.clientX - rc.left) * work.w / rc.width, (e.clientY - rc.top) * work.h / rc.height]; }
ed.canvas.addEventListener('pointerdown', e => { pushHistory(); ed.canvas.setPointerCapture(e.pointerId); ed.last = edPoint(e); dab(...ed.last); });
ed.canvas.addEventListener('pointermove', e => {
  if (!ed.last) return; const p = edPoint(e); const [lx, ly] = ed.last;
  const k = work.w / ed.canvas.getBoundingClientRect().width;
  const steps = Math.max(1, Math.ceil(Math.hypot(p[0]-lx, p[1]-ly) / Math.max(2, ed.size * k * 0.4)));
  for (let s = 1; s <= steps; s++) dab(lx + (p[0]-lx)*s/steps, ly + (p[1]-ly)*s/steps);
  ed.last = p;
});
const edEnd = () => { ed.last = null; };
ed.canvas.addEventListener('pointerup', edEnd); ed.canvas.addEventListener('pointercancel', edEnd);
$('#brushMode').addEventListener('click', e => { const v = e.target.dataset && e.target.dataset.v; if (!v) return; ed.mode = v;
  document.querySelectorAll('#brushMode button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === v))); });
$('#brush').addEventListener('input', e => { ed.size = +e.target.value; $('#brushOut').textContent = ed.size; });
$('#tol').addEventListener('input', e => { $('#tolOut').textContent = e.target.value; });
$('#tol').addEventListener('change', e => { pushHistory(); work.tol = +e.target.value; autoCut(); edCompose(); });
$('#edUndo').addEventListener('click', () => { const m = work.history.pop(); if (!m){ toast('더 되돌릴 작업이 없어요'); return; } work.mask = m; edCompose(); });
$('#edAll').addEventListener('click', () => { pushHistory(); work.mask.fill(255); edCompose(); });
$('#edCancel').addEventListener('click', () => { if (ed.saved) work.mask = ed.saved; closeEditor(); });
$('#edDone').addEventListener('click', () => { applyMask(); closeEditor(); render(); });
$('#openEditor').addEventListener('click', openEditor);

