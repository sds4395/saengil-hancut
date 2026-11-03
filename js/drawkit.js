'use strict';
function rr(ctx, x, y, w, h, r){
  ctx.beginPath(); r = Math.min(r, w/2, h/2);
  ctx.moveTo(x+r, y); ctx.arcTo(x+w, y, x+w, y+h, r); ctx.arcTo(x+w, y+h, x, y+h, r);
  ctx.arcTo(x, y+h, x, y, r); ctx.arcTo(x, y, x+w, y, r); ctx.closePath();
}
function rng(seed){ return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function fit(ctx, text, family, weight, size, maxW, min=20){
  let s = size;
  for (;;){ ctx.font = `${weight} ${s}px ${family}`; if (ctx.measureText(text).width <= maxW || s <= min) break; s -= 4; }
  return s;
}
function spacing(ctx, v){ if ('letterSpacing' in ctx) ctx.letterSpacing = v; }
function balloon(ctx, x, y, r, col, rot){
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  ctx.strokeStyle = 'rgba(29,26,43,.4)'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(0, r*1.2); ctx.bezierCurveTo(-r*.35, r*1.8, r*.35, r*2.4, -r*.1, r*3.1); ctx.stroke();
  ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(0, 0, r, r*1.18, 0, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.moveTo(0, r*1.12); ctx.lineTo(-r*.13, r*1.3); ctx.lineTo(r*.13, r*1.3); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.beginPath(); ctx.ellipse(-r*.38, -r*.45, r*.16, r*.3, -0.5, 0, Math.PI*2); ctx.fill();
  ctx.restore();
}
function bunting(ctx, y, cols){
  const p = t => { const a = (1-t)*(1-t), b = 2*(1-t)*t, c = t*t; return [a*-20 + b*(W/2) + c*(W+20), a*y + b*(y+90) + c*y]; };
  ctx.strokeStyle = 'rgba(29,26,43,.45)'; ctx.lineWidth = 3;
  ctx.beginPath(); for (let i = 0; i <= 40; i++){ const [px, py] = p(i/40); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  for (let i = 0; i < 11; i++){
    const [px, py] = p((i + 0.5) / 11);
    ctx.fillStyle = cols[i % cols.length];
    ctx.beginPath(); ctx.moveTo(px-38, py); ctx.lineTo(px+38, py); ctx.lineTo(px, py+82); ctx.closePath(); ctx.fill();
  }
}
function confetti(ctx, seed, n, cols, area){
  const r = rng(seed); const [ax, ay, aw, ah] = area || [0, 0, W, H];
  for (let i = 0; i < n; i++){
    ctx.save(); ctx.translate(ax + r()*aw, ay + r()*ah); ctx.rotate(r()*Math.PI);
    ctx.fillStyle = cols[i % cols.length];
    if (r() < 0.5){ ctx.fillRect(-9, -4, 18, 8); } else { ctx.beginPath(); ctx.arc(0, 0, 6, 0, Math.PI*2); ctx.fill(); }
    ctx.restore();
  }
}
function star(ctx, cx, cy, R, col, rot=0){
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.fillStyle = col; ctx.beginPath();
  for (let i = 0; i < 10; i++){ const a = i * Math.PI / 5 - Math.PI/2, rad = i % 2 ? R*.45 : R; ctx.lineTo(Math.cos(a)*rad, Math.sin(a)*rad); }
  ctx.closePath(); ctx.fill(); ctx.restore();
}
function heart(ctx, cx, cy, s, col, rot=0){
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.scale(s, s); ctx.fillStyle = col; ctx.beginPath();
  ctx.moveTo(0, 30); ctx.bezierCurveTo(-60, -10, -30, -55, 0, -25); ctx.bezierCurveTo(30, -55, 60, -10, 0, 30); ctx.fill(); ctx.restore();
}
function pill(ctx, text, cx, cy, size, bg, fg){
  ctx.save(); ctx.font = `700 ${size}px ${F.body}`;
  const w = ctx.measureText(text).width + size*1.4, h = size * 1.9;
  ctx.shadowColor = 'rgba(29,26,43,.18)'; ctx.shadowBlur = 20; ctx.shadowOffsetY = 6;
  ctx.fillStyle = bg; rr(ctx, cx - w/2, cy - h/2, w, h, h/2); ctx.fill();
  ctx.shadowColor = 'transparent'; ctx.fillStyle = fg; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(text, cx, cy + size*0.04); ctx.restore();
}
function stamp(ctx, x, y, align='right'){
  const t = today0(); const s = `'${String(t.getFullYear()).slice(2)} ${pad(t.getMonth()+1)} ${pad(t.getDate())}`;
  ctx.save(); ctx.font = `500 40px ${F.mono}`; ctx.textAlign = align; ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#FF8A1E'; ctx.shadowColor = 'rgba(255,120,20,.7)'; ctx.shadowBlur = 14; ctx.fillText(s, x, y); ctx.restore();
}

