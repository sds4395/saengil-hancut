'use strict';
const TEMPLATES = {
  balloon: { label: '풍선파티', draw(ctx, I){
    ctx.fillStyle = '#FFE3EA'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(255,255,255,.75)';
    for (let y = 30, row = 0; y < H; y += 56, row++) for (let x = (row % 2) * 28 + 14; x < W; x += 56){ ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI*2); ctx.fill(); }
    confetti(ctx, 11, 46, [C.cherry, C.butter, C.mint, C.sky], [0, 160, W, 760]);
    balloon(ctx, 140, 400, 92, C.cherry, -0.18); balloon(ctx, 268, 300, 74, C.sky, 0.06);
    balloon(ctx, 944, 370, 98, C.butter, 0.16); balloon(ctx, 818, 270, 70, C.mint, -0.06);
    bunting(ctx, 46, [C.cherry, C.butter, C.mint, C.sky]);
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = C.ink; ctx.font = `58px ${F.display}`; spacing(ctx, '3px'); ctx.fillText(I.eyebrow, W/2, 300); spacing(ctx, '0px');
    const s = fit(ctx, I.name, F.display, '', 176, 600, 80);
    ctx.font = `${s}px ${F.display}`; ctx.lineJoin = 'round';
    ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 16; ctx.strokeText(I.name, W/2, 300 + s*0.95);
    ctx.fillStyle = C.cherry; ctx.fillText(I.name, W/2, 300 + s*0.95);
    placePet(ctx, W/2, 1300, 820, 820);
    pill(ctx, I.line, W/2, 1212, 44, '#FFFFFF', C.ink);
    stamp(ctx, W - 48, H - 30);
  }},
  cake: { label: '케이크', draw(ctx, I){
    ctx.fillStyle = '#FFE27A'; ctx.fillRect(0, 0, W, H);
    ctx.save(); ctx.translate(W/2, 720); ctx.fillStyle = 'rgba(255,255,255,.3)';
    for (let i = 0; i < 28; i += 2){ const a = i * Math.PI * 2 / 28; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 1700, a, a + Math.PI*2/28); ctx.closePath(); ctx.fill(); }
    ctx.restore();
    ctx.textAlign = 'center'; ctx.fillStyle = C.ink;
    const ps = fit(ctx, I.pre, F.body, 700, 56, 900);
    ctx.font = `700 ${ps}px ${F.body}`; ctx.fillText(I.pre, W/2, 150);
    const s = fit(ctx, I.short, F.display, '', 150, 960, 70);
    ctx.font = `${s}px ${F.display}`; ctx.fillText(I.short, W/2, 165 + s);
    placePet(ctx, 470, 1150, 760, 780);
    const ty = 1062;
    ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, ty, W, H - ty);
    ctx.fillStyle = 'rgba(255,79,109,.42)';
    for (let x = 0; x < W; x += 90) ctx.fillRect(x, ty, 45, H - ty);
    for (let y = ty; y < H; y += 90) ctx.fillRect(0, y, W, 45);
    ctx.fillStyle = 'rgba(29,26,43,.14)'; ctx.fillRect(0, ty, W, 8);
    const cx = 830, base = 1120;
    ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.ellipse(cx, base + 6, 190, 36, 0, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = 'rgba(29,26,43,.14)'; ctx.lineWidth = 3; ctx.stroke();
    ctx.fillStyle = '#FFB3C1'; ctx.fillRect(cx - 140, base - 170, 280, 170);
    ctx.beginPath(); ctx.ellipse(cx, base, 140, 30, 0, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = C.cream; ctx.beginPath(); ctx.ellipse(cx, base - 170, 140, 30, 0, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(cx - 140, base - 170);
    for (let i = 0; i < 7; i++){ const x0 = cx - 140 + i*40; ctx.quadraticCurveTo(x0 + 20, base - 170 + (i % 2 ? 70 : 44), x0 + 40, base - 170 + 12); }
    ctx.lineTo(cx + 140, base - 170); ctx.closePath(); ctx.fill();
    const rs = rng(5);
    for (let i = 0; i < 16; i++){ ctx.save(); ctx.translate(cx - 120 + rs()*240, base - 90 + rs()*80); ctx.rotate(rs()*3); ctx.fillStyle = [C.sky, C.mint, C.butter, '#FFFFFF'][i % 4]; ctx.fillRect(-8, -3, 16, 6); ctx.restore(); }
    if (state.mode !== 'days'){
      ctx.font = `86px ${F.display}`; ctx.fillStyle = '#FFFFFF'; ctx.textAlign = 'center';
      ctx.fillText(String(Math.max(1, I.n)), cx, base - 50);
    } else heart(ctx, cx, base - 78, 1.1, '#FFFFFF');
    ctx.fillStyle = C.sky; ctx.fillRect(cx - 12, base - 300, 24, 124);
    ctx.fillStyle = '#FFFFFF'; for (let k = 0; k < 4; k++){ ctx.save(); ctx.beginPath(); ctx.rect(cx - 12, base - 300, 24, 124); ctx.clip(); ctx.translate(cx, base - 290 + k*34); ctx.rotate(-0.5); ctx.fillRect(-30, 0, 60, 10); ctx.restore(); }
    const g = ctx.createRadialGradient(cx, base - 330, 4, cx, base - 330, 90); g.addColorStop(0, 'rgba(255,216,77,.7)'); g.addColorStop(1, 'rgba(255,216,77,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, base - 330, 90, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#FF8A1E'; ctx.beginPath(); ctx.moveTo(cx, base - 372); ctx.quadraticCurveTo(cx + 26, base - 330, cx, base - 306); ctx.quadraticCurveTo(cx - 26, base - 330, cx, base - 372); ctx.fill();
    ctx.fillStyle = C.butter; ctx.beginPath(); ctx.ellipse(cx, base - 322, 8, 14, 0, 0, Math.PI*2); ctx.fill();
    stamp(ctx, 48, H - 30, 'left');
  }},
  polaroid: { label: '폴라로이드', draw(ctx, I){
    for (let y = 0; y < H; y += 90) for (let x = 0; x < W; x += 90){ ctx.fillStyle = ((x + y) / 90) % 2 ? '#FFFFFF' : '#D3F1E6'; ctx.fillRect(x, y, 90, 90); }
    ctx.save(); ctx.translate(W/2, 660); ctx.rotate(-0.045);
    ctx.shadowColor = 'rgba(29,26,43,.22)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 18;
    ctx.fillStyle = '#FFFFFF'; ctx.fillRect(-410, -540, 820, 1060);
    ctx.shadowColor = 'transparent';
    ctx.fillStyle = '#E9E6F2'; ctx.fillRect(-370, -500, 740, 760);
    coverPhoto(ctx, -370, -500, 740, 760);
    ctx.textAlign = 'center'; ctx.fillStyle = C.ink;
    const cap = `${I.name}, ${I.line}`;
    const s = fit(ctx, cap, F.pen, '', 92, 720, 44);
    ctx.font = `${s}px ${F.pen}`; ctx.fillText(cap, 0, 375);
    ctx.font = `500 30px ${F.mono}`; ctx.fillStyle = '#8C8AA0'; ctx.fillText(dot(I.t), 0, 450);
    ctx.fillStyle = 'rgba(255,216,77,.85)'; ctx.save(); ctx.translate(0, -560); ctx.rotate(0.04); ctx.fillRect(-110, -26, 220, 56); ctx.restore();
    ctx.restore();
    star(ctx, 130, 1210, 70, C.butter, 0.3); star(ctx, 960, 1150, 40, C.sky, -0.2);
    heart(ctx, 110, 210, 1.3, C.cherry, -0.25);
    ctx.save(); ctx.translate(950, 170); ctx.rotate(0.18);
    ctx.fillStyle = C.cherry; ctx.beginPath(); ctx.arc(0, 0, 96, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 5; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.arc(0, 0, 80, 0, Math.PI*2); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#FFFFFF'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    fit(ctx, I.badge, F.display, '', 52, 130); ctx.fillText(I.badge, 0, 4); ctx.restore();
  }},
  days: { label: '견생기록', draw(ctx, I){
    ctx.fillStyle = '#EEF1F8'; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(29,26,43,.07)'; ctx.lineWidth = 2;
    for (let x = 90; x < W; x += 90){ ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = 90; y < H; y += 90){ ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    ctx.textBaseline = 'alphabetic';
    ctx.font = `500 28px ${F.mono}`; ctx.fillStyle = '#6C6981';
    ctx.textAlign = 'left'; ctx.fillText('EVERY DAY IS A GOOD DAY', 60, 92);
    ctx.textAlign = 'right'; ctx.fillText(`SINCE ${dot(I.b)}`, W - 60, 92);
    const num = I.days.toLocaleString();
    ctx.textAlign = 'center';
    const s = fit(ctx, num, F.display, '', 360, 980, 120);
    ctx.font = `${s}px ${F.display}`; ctx.fillStyle = C.blue; ctx.fillText(num, W/2, 140 + s*0.92);
    ctx.font = `64px ${F.display}`; ctx.fillStyle = C.ink; ctx.fillText('일째 함께하는 중', W/2, 140 + s*0.92 + 90);
    placePet(ctx, W/2, 1236, 860, 820);
    ctx.fillStyle = C.ink; ctx.fillRect(0, 1236, W, H - 1236);
    ctx.textAlign = 'left'; ctx.fillStyle = '#FFFFFF';
    const ns = fit(ctx, I.name, F.display, '', 54, 460); ctx.font = `${ns}px ${F.display}`; ctx.fillText(I.name, 60, 1312);
    ctx.textAlign = 'right'; ctx.fillStyle = C.butter; ctx.font = `700 36px ${F.body}`;
    ctx.fillText(state.msg.trim() ? I.line : `${I.life} ${num}일째`, W - 60, 1308);
  }},
  fourcut: { label: '네컷', draw(ctx, I){
    ctx.fillStyle = C.ink; ctx.fillRect(0, 0, W, H);
    const m = 46, gap = 22, fw = (W - m*2 - gap) / 2, fh = (H - m - 190 - gap) / 2;
    const bgs = ['#FFD6E0', '#CFE6FF', '#FFF0B3', '#D3F1E6'], ks = [1, 1.28, 0.9, 1.12];
    for (let i = 0; i < 4; i++){
      const fx = m + (i % 2) * (fw + gap), fy = m + Math.floor(i / 2) * (fh + gap);
      ctx.save(); rr(ctx, fx, fy, fw, fh, 10); ctx.clip();
      ctx.fillStyle = bgs[i]; ctx.fillRect(fx, fy, fw, fh);
      if (i === 0) confetti(ctx, 3, 14, [C.cherry, C.sky, C.butter], [fx, fy, fw, fh * .5]);
      if (i === 3){ ctx.fillStyle = 'rgba(255,255,255,.55)'; for (let y = fy + 20; y < fy + fh; y += 44) for (let x = fx + 20; x < fx + fw; x += 44){ ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI*2); ctx.fill(); } }
      placePet(ctx, fx + fw/2, fy + fh + 14 + (ks[i] > 1.2 ? 70 : 0), fw * .92, fh * .9, ks[i]);
      if (i === 1) heart(ctx, fx + fw - 60, fy + 60, 0.9, C.cherry, 0.2);
      if (i === 2){ star(ctx, fx + 56, fy + 60, 34, C.butter, 0.2); star(ctx, fx + fw - 50, fy + 120, 22, '#FFFFFF', -0.3); }
      ctx.restore();
    }
    ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left'; ctx.fillStyle = '#FFFFFF';
    ctx.font = `60px ${F.display}`; ctx.fillText('생일한컷', m, H - 78);
    ctx.font = `700 32px ${F.body}`; ctx.fillStyle = C.butter;
    const lt = `${I.name} · ${I.line}`; fit(ctx, lt, F.body, 700, 32, 560); ctx.fillText(lt, m, H - 34);
    ctx.textAlign = 'right'; ctx.font = `500 30px ${F.mono}`; ctx.fillStyle = 'rgba(255,255,255,.7)';
    ctx.fillText(dot(I.t), W - m, H - 78); ctx.fillText(I.eyebrow, W - m, H - 36);
  }},
  magazine: { label: '매거진', draw(ctx, I){
    ctx.fillStyle = '#C9B8FF'; ctx.fillRect(0, 0, W, H);
    const t = I.t, mast = state.species === 'dog' ? 'DAENG' : 'NYANG';
    ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
    ctx.font = `500 26px ${F.mono}`; ctx.fillStyle = C.ink;
    ctx.fillText(`VOL.${Math.max(1, I.n)} · ${t.getFullYear()}.${pad(t.getMonth()+1)} ISSUE`, 60, 74);
    ctx.textAlign = 'right'; ctx.fillText('₩ FREE', W - 60, 74);
    ctx.textAlign = 'center';
    const ms = fit(ctx, mast, F.display, '', 300, 970, 120);
    ctx.font = `${ms}px ${F.display}`; ctx.fillStyle = C.ink; ctx.fillText(mast, W/2, 70 + ms * 0.86);
    placePet(ctx, W/2, H - 30, 900, 1000);
    const lines = (x, y, align, small, big, body) => {
      ctx.save(); ctx.textAlign = align; ctx.lineJoin = 'round';
      ctx.font = `500 24px ${F.mono}`; ctx.fillStyle = C.cherry; ctx.fillText(small, x, y);
      const bs = fit(ctx, big, F.display, '', 70, 400, 34); ctx.font = `${bs}px ${F.display}`;
      ctx.strokeStyle = '#C9B8FF'; ctx.lineWidth = 12; ctx.strokeText(big, x, y + bs + 4); ctx.fillStyle = C.ink; ctx.fillText(big, x, y + bs + 4);
      if (body){ const s = fit(ctx, body, F.body, 700, 34, 400, 20); ctx.font = `700 ${s}px ${F.body}`; ctx.strokeText(body, x, y + bs + 56); ctx.fillText(body, x, y + bs + 56); }
      ctx.restore();
    };
    lines(60, 560, 'left', 'COVER STORY', I.name, I.line);
    lines(W - 60, 920, 'right', 'EXCLUSIVE', '오늘의 주인공', `${I.life} ${I.days.toLocaleString()}일째`);
    ctx.save(); ctx.translate(150, 1190); ctx.rotate(-0.12);
    ctx.fillStyle = C.butter; ctx.beginPath(); ctx.arc(0, 0, 92, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = C.ink; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = `500 22px ${F.mono}`; ctx.fillText('SPECIAL', 0, -30);
    fit(ctx, I.badge, F.display, '', 50, 140); ctx.fillText(I.badge, 0, 14); ctx.restore();
    const r = rng(9); ctx.fillStyle = C.ink;
    for (let x = W - 250; x < W - 60;){ const bw = 2 + Math.floor(r()*5); ctx.fillRect(x, H - 150, bw, 96); x += bw + 2 + Math.floor(r()*5); }
  }},
  ticket: { label: '초대장', draw(ctx, I){
    ctx.fillStyle = C.cherry; ctx.fillRect(0, 0, W, H);
    ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.lineWidth = 26;
    for (let x = -H; x < W; x += 80){ ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + H, H); ctx.stroke(); }
    ctx.restore();
    const cx0 = 70, cy0 = 110, cw = 940, ch = 1130, cut = 880;
    ctx.save(); ctx.shadowColor = 'rgba(29,26,43,.25)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 14;
    ctx.fillStyle = C.cream; rr(ctx, cx0, cy0, cw, ch, 30); ctx.fill(); ctx.restore();
    ctx.fillStyle = C.cherry; ctx.beginPath(); ctx.arc(cx0, cut, 34, 0, Math.PI*2); ctx.arc(cx0 + cw, cut, 34, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = 'rgba(29,26,43,.3)'; ctx.lineWidth = 4; ctx.setLineDash([14, 12]);
    ctx.beginPath(); ctx.moveTo(cx0 + 50, cut); ctx.lineTo(cx0 + cw - 50, cut); ctx.stroke(); ctx.setLineDash([]);
    ctx.textBaseline = 'alphabetic'; ctx.font = `500 28px ${F.mono}`; ctx.fillStyle = C.cherry;
    ctx.textAlign = 'left'; ctx.fillText('ADMIT ONE', cx0 + 50, cy0 + 70);
    ctx.textAlign = 'right'; ctx.fillText(dot(I.t), cx0 + cw - 50, cy0 + 70);
    ctx.textAlign = 'center'; ctx.fillStyle = C.ink;
    const ns = fit(ctx, `${I.name} PARTY`, F.display, '', 110, 840, 50);
    ctx.font = `${ns}px ${F.display}`; ctx.fillText(`${I.name} PARTY`, W/2, cy0 + 90 + ns);
    ctx.save(); ctx.beginPath(); ctx.rect(cx0, cy0, cw, cut - cy0 - 6); ctx.clip();
    placePet(ctx, W/2, cut - 10, 760, 560); ctx.restore();
    ctx.textAlign = 'left'; ctx.font = `500 26px ${F.mono}`; ctx.fillStyle = '#8C8AA0';
    ctx.fillText('YOU ARE INVITED TO', cx0 + 60, cut + 80);
    const ls = fit(ctx, I.line, F.display, '', 64, 560, 30);
    ctx.font = `${ls}px ${F.display}`; ctx.fillStyle = C.ink; ctx.fillText(I.line, cx0 + 60, cut + 90 + ls);
    ctx.font = `700 30px ${F.body}`; ctx.fillStyle = C.cherry; ctx.fillText(`${I.life} ${I.days.toLocaleString()}일째`, cx0 + 60, cut + 230);
    ctx.font = `500 24px ${F.mono}`; ctx.fillStyle = '#8C8AA0'; ctx.fillText('DRESS CODE: 간식 지참', cx0 + 60, cut + 290);
    const r = rng(4); ctx.fillStyle = C.ink;
    for (let x = cx0 + cw - 240; x < cx0 + cw - 60;){ const bw = 2 + Math.floor(r()*6); ctx.fillRect(x, cut + 60, bw, 220); x += bw + 3 + Math.floor(r()*5); }
  }},
  neon: { label: '네온', draw(ctx, I){
    ctx.fillStyle = '#14112A'; ctx.fillRect(0, 0, W, H);
    const g = ctx.createRadialGradient(W/2, 760, 40, W/2, 760, 760); g.addColorStop(0, 'rgba(140,90,255,.45)'); g.addColorStop(1, 'rgba(140,90,255,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    const r = rng(21);
    for (let i = 0; i < 90; i++){ ctx.fillStyle = `rgba(255,255,255,${0.3 + r()*0.6})`; ctx.beginPath(); ctx.arc(r()*W, r()*H*0.7, 1 + r()*2.4, 0, Math.PI*2); ctx.fill(); }
    star(ctx, 120, 160, 26, '#FFF3A0', 0.2); star(ctx, 960, 120, 18, '#FFF3A0', -0.3);
    const words = I.eyebrow.split(' ');
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; ctx.lineJoin = 'round';
    words.forEach((wd, i) => {
      const s = fit(ctx, wd, F.display, '', 150, 920, 60); ctx.font = `${s}px ${F.display}`;
      const y = 230 + i * 160;
      ctx.save(); ctx.shadowColor = i ? '#4DE8FF' : '#FF5FA2'; ctx.shadowBlur = 36;
      ctx.strokeStyle = i ? '#4DE8FF' : '#FF5FA2'; ctx.lineWidth = 10; ctx.strokeText(wd, W/2, y);
      ctx.shadowBlur = 12; ctx.strokeStyle = i ? '#D8FBFF' : '#FFE0EE'; ctx.lineWidth = 4; ctx.strokeText(wd, W/2, y);
      ctx.restore();
    });
    placePet(ctx, W/2, 1220, 820, 800);
    ctx.save(); ctx.font = `700 46px ${F.body}`; ctx.fillStyle = '#E8FFF8'; ctx.shadowColor = '#4DFFC7'; ctx.shadowBlur = 22;
    const tl = `${I.name} · ${I.line}`; fit(ctx, tl, F.body, 700, 46, 960); ctx.fillText(tl, W/2, 1300); ctx.restore();
  }},
  flower: { label: '플라워', draw(ctx, I){
    ctx.fillStyle = '#FFF2F5'; ctx.fillRect(0, 0, W, H);
    const cx = W/2, cy = 640, R = 400, cols = ['#FF8FAB', '#FFC2D1', '#FFFFFF', '#FFD84D', '#B5A8FF'];
    const flower = (x, y, r, col, rot) => {
      ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.fillStyle = col;
      for (let p = 0; p < 5; p++){ const a = p / 5 * Math.PI * 2; ctx.beginPath(); ctx.ellipse(Math.cos(a)*r*.55, Math.sin(a)*r*.55, r*.5, r*.36, a, 0, Math.PI*2); ctx.fill(); }
      ctx.fillStyle = col === '#FFD84D' ? '#FF8A1E' : '#FFD84D'; ctx.beginPath(); ctx.arc(0, 0, r*.26, 0, Math.PI*2); ctx.fill(); ctx.restore();
    };
    const items = []; const r = rng(17);
    for (let i = 0; i < 30; i++){ const a = i / 30 * Math.PI * 2, rad = R + (r() - .5) * 50; items.push({ x: cx + Math.cos(a)*rad, y: cy + Math.sin(a)*rad, s: 46 + r()*34, c: cols[i % cols.length], rot: r()*3, front: Math.sin(a) > 0.55, leaf: a + Math.PI/2 }); }
    const leaves = list => list.forEach(f => { ctx.save(); ctx.translate(f.x, f.y); ctx.rotate(f.leaf); ctx.fillStyle = '#8CC9A0'; ctx.beginPath(); ctx.ellipse(f.s*.9, 0, f.s*.55, f.s*.22, 0, 0, Math.PI*2); ctx.fill(); ctx.restore(); });
    leaves(items); items.filter(f => !f.front).forEach(f => flower(f.x, f.y, f.s, f.c, f.rot));
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R - 30, 0, Math.PI*2); ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.restore();
    placePet(ctx, cx, cy + R - 20, 620, 640);
    items.filter(f => f.front).forEach(f => flower(f.x, f.y, f.s, f.c, f.rot));
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    ctx.font = `500 28px ${F.mono}`; ctx.fillStyle = '#B07A8A'; spacing(ctx, '4px'); ctx.fillText(I.eyebrow, W/2, 150); spacing(ctx, '0px');
    const ns = fit(ctx, I.name, F.pen, '', 130, 900, 60); ctx.font = `${ns}px ${F.pen}`; ctx.fillStyle = C.ink; ctx.fillText(I.name, W/2, 1170);
    const ls = fit(ctx, I.line, F.body, 700, 42, 900); ctx.font = `700 ${ls}px ${F.body}`; ctx.fillStyle = '#B07A8A'; ctx.fillText(I.line, W/2, 1240);
    stamp(ctx, W - 48, H - 30);
  }}
};

