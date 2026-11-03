'use strict';
const outlineBuf = document.createElement('canvas');
function placePet(ctx, cx, bottom, maxW, maxH, k = 1){
  const b = work.bbox; if (!b) return;
  let h = maxH, w = h * b.w / b.h;
  if (w > maxW){ w = maxW; h = w * b.h / b.w; }
  w *= state.scale * k; h *= state.scale * k;
  const x = cx - w/2 + state.dx, y = bottom - h + state.dy;
  ctx.save();
  ctx.fillStyle = 'rgba(29,26,43,.16)'; ctx.beginPath(); ctx.ellipse(x + w/2, y + h - 6, w*0.36, Math.max(10, h*0.035), 0, 0, Math.PI*2); ctx.fill();
  if (state.outline){
    const r = Math.max(6, Math.min(w, h) * 0.022), pd = Math.ceil(r) + 2;
    outlineBuf.width = Math.ceil(w) + pd*2; outlineBuf.height = Math.ceil(h) + pd*2;
    const o = outlineBuf.getContext('2d');
    o.drawImage(work.cut, b.x, b.y, b.w, b.h, pd, pd, w, h);
    o.globalCompositeOperation = 'source-in'; o.fillStyle = '#FFFFFF'; o.fillRect(0, 0, outlineBuf.width, outlineBuf.height);
    o.globalCompositeOperation = 'source-over';
    ctx.shadowColor = 'rgba(29,26,43,.22)'; ctx.shadowBlur = 24; ctx.shadowOffsetY = 10;
    ctx.drawImage(outlineBuf, x - pd, y - pd);
    ctx.shadowColor = 'transparent';
    for (let k = 0; k < 20; k++){ const a = k / 20 * Math.PI * 2; ctx.drawImage(outlineBuf, x - pd + Math.cos(a)*r, y - pd + Math.sin(a)*r); }
  } else {
    ctx.shadowColor = 'rgba(29,26,43,.2)'; ctx.shadowBlur = 24; ctx.shadowOffsetY = 10;
  }
  ctx.drawImage(work.cut, b.x, b.y, b.w, b.h, x, y, w, h);
  ctx.restore();
}
function coverPhoto(ctx, x, y, w, h){
  const iw = work.w, ih = work.h; const s = Math.max(w/iw, h/ih) * state.scale;
  const dw = iw*s, dh = ih*s;
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  ctx.drawImage(work.src, x + (w-dw)/2 + state.dx*0.6, y + (h-dh)/2 + state.dy*0.6, dw, dh);
  ctx.restore();
}

