'use strict';
const out = $('#out'), octx = out.getContext('2d');
let fontKey = '';
async function fontsFor(I){
  const txt = [I.name, I.line, I.short, I.pre, I.eyebrow, I.life, '번째생일축하해가족된지년일째생일한컷오늘의주인공0123456789,'].join('');
  if (txt === fontKey) return; fontKey = txt;
  try {
    await Promise.all([
      document.fonts.load(`80px "Bagel Fat One"`, txt),
      document.fonts.load(`700 40px "IBM Plex Sans KR"`, txt),
      document.fonts.load(`60px "Nanum Pen Script"`, txt),
      document.fonts.load(`500 40px "IBM Plex Mono"`, "0123456789.' SINCE")
    ]);
  } catch (e) {}
}
function paint(ctx, id, s){
  const I = info();
  ctx.save(); ctx.setTransform(s, 0, 0, s, 0, 0); ctx.clearRect(0, 0, W, H);
  TEMPLATES[id].draw(ctx, I); ctx.restore();
}
let raf = 0, thumbT = 0;
function render(withThumbs = true){
  if (!raf) raf = requestAnimationFrame(async () => {
    raf = 0; await fontsFor(info()); paint(octx, state.tpl, 1); updateSummary();
  });
  if (withThumbs){ clearTimeout(thumbT); thumbT = setTimeout(drawThumbs, 260); }
}
const thumbWrap = $('#thumbs'), thumbs = {};
for (const id of Object.keys(TEMPLATES)){
  const b = document.createElement('button'); b.type = 'button'; b.className = 'thumb'; b.dataset.v = id;
  const c = document.createElement('canvas'); c.width = 216; c.height = 270;
  b.append(c, document.createTextNode(TEMPLATES[id].label));
  b.addEventListener('click', () => { state.tpl = id; syncPressed(); render(false); });
  thumbWrap.append(b); thumbs[id] = c;
}
function drawThumbs(){ for (const id in thumbs) paint(thumbs[id].getContext('2d'), id, 216 / W); }
if (document.fonts && document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', () => { render(); });

