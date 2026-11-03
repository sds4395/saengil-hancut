'use strict';
function makeSample(){
  const c = document.createElement('canvas'); c.width = 800; c.height = 960;
  const x = c.getContext('2d'); const TAU = Math.PI * 2;
  const el = (cx, cy, rx, ry, col, rot=0) => { x.fillStyle = col; x.beginPath(); x.ellipse(cx, cy, rx, ry, rot, 0, TAU); x.fill(); };
  x.fillStyle = '#BFE3D0'; x.fillRect(0, 0, 800, 960);
  const orange = '#E8964A', cream = '#FFF1DC';
  x.strokeStyle = orange; x.lineWidth = 58; x.lineCap = 'round';
  x.beginPath(); x.arc(610, 610, 75, Math.PI*0.95, Math.PI*2.15); x.stroke();
  el(400, 700, 225, 210, orange);
  el(400, 730, 118, 160, cream);
  x.fillStyle = orange; rr(x, 292, 760, 86, 168, 42); x.fill(); rr(x, 422, 760, 86, 168, 42); x.fill();
  el(335, 915, 48, 26, cream); el(465, 915, 48, 26, cream);
  const ear = (cx, rot) => { x.save(); x.translate(cx, 235); x.rotate(rot);
    x.fillStyle = orange; x.beginPath(); x.moveTo(-82, 70); x.quadraticCurveTo(-30, -120, 0, -118); x.quadraticCurveTo(30, -120, 82, 70); x.fill();
    x.fillStyle = '#F7B9A8'; x.beginPath(); x.moveTo(-44, 50); x.quadraticCurveTo(-14, -60, 0, -62); x.quadraticCurveTo(14, -60, 44, 50); x.fill(); x.restore(); };
  ear(262, -0.32); ear(538, 0.32);
  el(400, 405, 212, 192, orange);
  el(400, 478, 142, 104, cream);
  el(318, 418, 62, 50, cream); el(482, 418, 62, 50, cream);
  el(332, 330, 24, 14, cream); el(468, 330, 24, 14, cream);
  el(335, 412, 23, 25, '#22180F'); el(465, 412, 23, 25, '#22180F');
  el(343, 402, 8, 8, '#FFFFFF'); el(473, 402, 8, 8, '#FFFFFF');
  el(400, 458, 32, 22, '#22180F');
  x.strokeStyle = '#22180F'; x.lineWidth = 7; x.lineCap = 'round';
  x.beginPath(); x.moveTo(400, 478); x.lineTo(400, 500); x.quadraticCurveTo(380, 522, 360, 506); x.moveTo(400, 500); x.quadraticCurveTo(420, 522, 440, 506); x.stroke();
  el(400, 528, 20, 16, '#FF8FA3');
  x.globalAlpha = 0.55; el(282, 478, 34, 20, '#FF9CAE'); el(518, 478, 34, 20, '#FF9CAE'); x.globalAlpha = 1;
  return c;
}

