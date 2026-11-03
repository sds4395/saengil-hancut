'use strict';
const toastEl = $('#toast'); let toastT = 0;
function toast(msg){ toastEl.textContent = msg; toastEl.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => toastEl.hidden = true, 2200); }

function syncPressed(){
  document.querySelectorAll('#species button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === state.species)));
  document.querySelectorAll('#mode button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === state.mode)));
  document.querySelectorAll('.thumb').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === state.tpl)));
  $('#daysBtn').textContent = state.species === 'dog' ? '견생 N일' : '묘생 N일';
  TEMPLATES.days.label = state.species === 'dog' ? '견생기록' : '묘생기록';
  thumbs.days.parentElement.lastChild.textContent = TEMPLATES.days.label;
  $('#dateLabel').textContent = state.mode === 'gotcha' ? '입양일' : '생일';
  $('#sampleBadge').hidden = !state.sample;
}
function updateSummary(){
  const I = info();
  $('#sumTitle').textContent = `${I.name} · ${TEMPLATES[state.tpl].label}`;
  $('#sumSub').textContent = state.mode === 'birthday' && I.dday > 0 ? `${I.life} ${I.days.toLocaleString()}일째 · 생일 D-${I.dday}` : `${I.life} ${I.days.toLocaleString()}일째`;
  $('#msg').placeholder = state.mode === 'days' ? `${I.life} ${I.days.toLocaleString()}일째` : I.line;
}

$('#name').value = state.name; $('#date').value = state.date; $('#date').max = iso(T0);
$('#name').addEventListener('input', e => { state.name = e.target.value; render(); });
$('#msg').addEventListener('input', e => { state.msg = e.target.value; render(); });
$('#date').addEventListener('input', e => { state.date = e.target.value; render(); });
$('#species').addEventListener('click', e => { const v = e.target.dataset && e.target.dataset.v; if (!v) return; state.species = v; syncPressed(); render(); });
$('#mode').addEventListener('click', e => {
  const v = e.target.dataset && e.target.dataset.v; if (!v) return; state.mode = v;
  if (v === 'days' && state.tpl !== 'days') state.tpl = 'days';
  if (prof){ const d = v === 'gotcha' && prof.adopt ? prof.adopt : prof.birth; if (d){ state.date = d; $('#date').value = d; } }
  syncPressed(); render();
});
$('#scale').addEventListener('input', e => { state.scale = +e.target.value; $('#scaleOut').textContent = Math.round(state.scale*100) + '%'; render(false); });
$('#scale').addEventListener('change', () => render());
$('#outline').addEventListener('change', e => { state.outline = e.target.checked; render(); });
$('#resetPos').addEventListener('click', () => { state.scale = 1; state.dx = 0; state.dy = 0; $('#scale').value = 1; $('#scaleOut').textContent = '100%'; render(); });

let drag = null;
out.addEventListener('pointerdown', e => { drag = { x: e.clientX, y: e.clientY }; out.setPointerCapture(e.pointerId); });
out.addEventListener('pointermove', e => {
  if (!drag) return; const k = W / out.getBoundingClientRect().width;
  state.dx += (e.clientX - drag.x) * k; state.dy += (e.clientY - drag.y) * k;
  drag = { x: e.clientX, y: e.clientY }; render(false);
});
const endDrag = () => { if (drag){ drag = null; render(); } };
out.addEventListener('pointerup', endDrag); out.addEventListener('pointercancel', endDrag);

