'use strict';
/* 저장소: settings.js 에 Supabase 주소/키가 있으면 서버에 저장,
   없으면 '테스트 모드'로 이 기기(localStorage)에만 저장합니다.
   신청자 정보는 서버에 '추가'만 가능하고, 조회는 Supabase 관리 화면에서 운영자만 합니다. */
const backend = { owner: false, order: null, remote: false };
let prof = null;
const WEEK = ['일','월','화','수','목','금','토'];
const isContact = s => /@.+\./.test(s) || s.replace(/\D/g, '').length >= 9;
function setStatus(el, msg, kind){ el.textContent = msg; el.className = 'status ' + (kind || ''); el.hidden = false; }

const LS = {
  get(k){ try { return JSON.parse(localStorage.getItem('hancut.' + k)); } catch (e) { return null; } },
  set(k, v){ try { localStorage.setItem('hancut.' + k, JSON.stringify(v)); } catch (e) {} }
};
function deviceId(){
  let id = LS.get('device');
  if (!id){ id = 'd_' + Math.random().toString(36).slice(2) + Date.now().toString(36); LS.set('device', id); }
  return id;
}
const SB = window.HANCUT_SETTINGS || {};
backend.remote = !!(SB.supabaseUrl && SB.supabaseAnonKey);

async function sbInsert(table, row){
  const res = await fetch(`${SB.supabaseUrl.replace(/\/$/, '')}/rest/v1/${table}`, {
    method: 'POST',
    headers: { apikey: SB.supabaseAnonKey, Authorization: 'Bearer ' + SB.supabaseAnonKey, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify(row)
  });
  if (!res.ok) throw new Error('save failed ' + res.status);
}

async function savePet(p){
  LS.set('pet', p);
  if (!backend.remote) return 'local';
  await sbInsert('pets', {
    device_id: deviceId(), name: p.name, species: p.species,
    birth: p.birth || null, adopt: p.adopt || null, notify: p.notify, contact: p.contact || null
  });
  return 'remote';
}
async function saveOrder(o){
  LS.set('order', o);
  if (!backend.remote) return 'local';
  await sbInsert('orders', {
    device_id: deviceId(), product: o.product, price: o.price, pet_name: o.petName, species: o.species,
    mode: o.mode, template: o.template, line: o.line, pet_date: o.date || null, contact: o.contact, request_no: o.count
  });
  return 'remote';
}
function loadStats(){}

async function connect(){
  const p = LS.get('pet'); if (p){ prof = p; applyProfile(true); }
  const o = LS.get('order'); if (o){ backend.order = o; showOrderDone(); }
}
