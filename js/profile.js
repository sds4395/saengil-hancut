'use strict';
const pf = { species: 'dog' };
function readProfileForm(){
  return {
    name: $('#pName').value.trim(), species: pf.species,
    birth: $('#pBirth').value, adopt: $('#pAdopt').value,
    notify: { birthday: $('#nBirth').checked, gotcha: $('#nGotcha').checked, hundred: $('#nHundred').checked },
    contact: $('#pContact').value.trim()
  };
}
function upcoming(p){
  const t = today0(), out = [], nm = p.name || '우리 아이', life = p.species === 'dog' ? '견생' : '묘생';
  const nextYearly = d => { let n = new Date(t.getFullYear(), d.getMonth(), d.getDate()); if (n < t) n = new Date(t.getFullYear()+1, d.getMonth(), d.getDate()); return n; };
  const b = parseD(p.birth);
  if (b && b <= t){
    const nb = nextYearly(b), n = nb.getFullYear() - b.getFullYear();
    out.push({ date: nb, title: `${nm} ${n}번째 생일`, on: p.notify.birthday });
    const lived = Math.round((t - b) / 864e5) + 1; const k = Math.max(100, Math.ceil(lived / 100) * 100);
    out.push({ date: new Date(b.getFullYear(), b.getMonth(), b.getDate() + k - 1), title: `${life} ${k.toLocaleString()}일`, on: p.notify.hundred });
  }
  const a = parseD(p.adopt);
  if (a && a <= t){
    const na = nextYearly(a), n = na.getFullYear() - a.getFullYear();
    out.push({ date: na, title: n >= 1 ? `가족 된 지 ${n}년` : '우리 가족 된 날', on: p.notify.gotcha });
  }
  return out.sort((x, y) => x.date - y.date);
}
function renderAnn(){
  const p = readProfileForm(), list = upcoming(p), ul = $('#annList');
  $('#nHundredLabel').textContent = (p.species === 'dog' ? '견생' : '묘생') + ' 100일마다';
  ul.replaceChildren();
  if (!list.length){ const li = document.createElement('li'); li.className = 'empty'; li.textContent = '생일을 입력하면 다가오는 기념일이 여기에 보여요.'; ul.append(li); return; }
  const t = today0();
  for (const it of list){
    const dd = Math.round((it.date - t) / 864e5);
    const li = document.createElement('li');
    const s1 = document.createElement('span'); s1.className = 'dd'; s1.textContent = dd === 0 ? 'D-DAY' : `D-${dd}`;
    const box = document.createElement('div');
    const b = document.createElement('b'); b.textContent = it.title;
    const sm = document.createElement('small'); sm.textContent = `${dot(it.date)} (${WEEK[it.date.getDay()]})`;
    box.append(b, sm);
    const tg = document.createElement('span'); tg.className = 'tag' + (it.on ? ' on' : ''); tg.textContent = it.on ? '알림 받기' : '알림 꺼짐';
    li.append(s1, box, tg); ul.append(li);
  }
}
function syncProfileSpecies(){ document.querySelectorAll('#pSpecies button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === pf.species))); }
function openProfile(){
  const p = prof || { name: state.sample ? '' : state.name, species: state.species, birth: state.mode === 'birthday' ? state.date : '', adopt: state.mode === 'gotcha' ? state.date : '', notify: { birthday: true, gotcha: true, hundred: true }, contact: '' };
  $('#pName').value = p.name || ''; pf.species = p.species || 'dog';
  $('#pBirth').value = p.birth || ''; $('#pAdopt').value = p.adopt || '';
  $('#pBirth').max = iso(T0); $('#pAdopt').max = iso(T0);
  $('#nBirth').checked = p.notify ? !!p.notify.birthday : true;
  $('#nGotcha').checked = p.notify ? !!p.notify.gotcha : true;
  $('#nHundred').checked = p.notify ? !!p.notify.hundred : true;
  $('#pContact').value = p.contact || ''; $('#pAgree').checked = !!(prof && prof.contact);
  $('#pStatus').hidden = true; syncProfileSpecies(); renderAnn();
  $('#profileSheet').hidden = false;
}
function applyProfile(fromLoad){
  if (!prof) return;
  state.name = prof.name || state.name; state.species = prof.species || state.species;
  const d = state.mode === 'gotcha' && prof.adopt ? prof.adopt : prof.birth;
  if (d) state.date = d;
  $('#name').value = state.name; $('#date').value = state.date;
  $('#petBtnLabel').textContent = `${prof.name || '우리 아이'} 프로필`;
  $('#petBtn').classList.add('done');
  syncPressed(); render();
  if (!fromLoad) $('#orderContact').value = $('#orderContact').value || prof.contact || '';
}
['#pName', '#pBirth', '#pAdopt', '#nBirth', '#nGotcha', '#nHundred'].forEach(s => $(s).addEventListener('input', renderAnn));
['#nBirth', '#nGotcha', '#nHundred'].forEach(s => $(s).addEventListener('change', renderAnn));
$('#pSpecies').addEventListener('click', e => { const v = e.target.dataset && e.target.dataset.v; if (!v) return; pf.species = v; syncProfileSpecies(); renderAnn(); });
$('#petBtn').addEventListener('click', openProfile);
$('#pClose').addEventListener('click', () => { $('#profileSheet').hidden = true; });
$('#pSave').addEventListener('click', async () => {
  const p = readProfileForm(), st = $('#pStatus');
  if (!p.name){ setStatus(st, '아이 이름을 입력해 주세요.', 'err'); $('#pName').focus(); return; }
  if (!p.birth){ setStatus(st, '생일을 입력해 주세요. 정확히 모르면 추정일도 괜찮아요.', 'err'); $('#pBirth').focus(); return; }
  const wantsAlarm = p.notify.birthday || p.notify.gotcha || p.notify.hundred;
  if (wantsAlarm && !isContact(p.contact)){ setStatus(st, '알림 받을 휴대폰 번호나 이메일을 정확히 입력해 주세요.', 'err'); $('#pContact').focus(); return; }
  if (wantsAlarm && !$('#pAgree').checked){ setStatus(st, '알림을 받으려면 연락처 저장에 동의해 주세요.', 'err'); return; }
  if (!wantsAlarm) p.contact = '';
  prof = p; applyProfile(false);
  $('#pSave').disabled = true;
  try {
    const where = await savePet(p);
    setStatus(st, wantsAlarm ? `저장했어요. 다가오는 기념일에 ${p.contact}(으)로 알려드릴게요.` : '저장했어요. 알림은 꺼둔 상태예요.', 'ok');
    if (where === 'local') st.textContent += ' (테스트 모드: 이 기기에만 저장됐어요)';
    if (backend.owner) loadStats();
  } catch (e) {
    setStatus(st, '저장하지 못했어요. 잠시 후 다시 눌러 주세요.', 'err');
  } finally { $('#pSave').disabled = false; }
});

