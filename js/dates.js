'use strict';
const pad = n => String(n).padStart(2, '0');
const today0 = () => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDate()); };
const iso = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const dot = d => `${d.getFullYear()}.${pad(d.getMonth()+1)}.${pad(d.getDate())}`;
const parseD = s => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ''); return m ? new Date(+m[1], +m[2]-1, +m[3]) : null; };
function hasBatchim(s){ const c = s.charCodeAt(s.length-1); if (c < 0xAC00 || c > 0xD7A3) return false; return (c - 0xAC00) % 28 !== 0; }
const withGa = s => s + (hasBatchim(s) ? '이가' : '가');

