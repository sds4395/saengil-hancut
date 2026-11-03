'use strict';
const PRODUCTS = {
  banner_s: { label: '현수막 S', price: 15000, desc: '60×90cm 패브릭 현수막 · 출시 예정가' },
  banner_l: { label: '현수막 L', price: 22000, desc: '90×150cm 패브릭 현수막 · 출시 예정가' },
  topper:   { label: '케이크 토퍼', price: 6000, desc: '12cm 사진 토퍼 2개 · 출시 예정가' }
};
let product = 'banner_s';
function syncProduct(){
  const p = PRODUCTS[product];
  document.querySelectorAll('#product button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === product)));
  $('#priceVal').textContent = p.price.toLocaleString() + '원'; $('#priceDesc').textContent = p.desc;
  $('#orderBtn').textContent = `${p.label} 사전신청`;
}
function showOrderDone(){
  const o = backend.order; if (!o) return;
  const p = PRODUCTS[o.product] || PRODUCTS.banner_s;
  setStatus($('#orderStatus'), `${p.label} 사전신청이 접수돼 있어요. 다시 신청하면 최신 디자인과 상품으로 바뀌어요.`, 'ok');
  $('#orderContact').value = o.contact || '';
}
$('#product').addEventListener('click', e => { const v = e.target.dataset && e.target.dataset.v; if (!v) return; product = v; syncProduct(); });
$('#orderBtn').addEventListener('click', async () => {
  const st = $('#orderStatus'), contact = $('#orderContact').value.trim(), p = PRODUCTS[product], I = info();
  if (!isContact(contact)){ setStatus(st, '연락받을 휴대폰 번호나 이메일을 정확히 입력해 주세요.', 'err'); $('#orderContact').focus(); return; }
  if (!$('#orderAgree').checked){ setStatus(st, '사전신청을 하려면 연락처 저장에 동의해 주세요.', 'err'); return; }
  $('#orderBtn').disabled = true;
  const now = new Date().toISOString(), prev = backend.order;
  const data = {
    product, price: p.price, petName: I.name, species: state.species, mode: state.mode, template: state.tpl,
    line: I.line, date: state.date, contact, count: (prev && prev.count || 0) + 1,
    firstAt: (prev && prev.firstAt) || now, updatedAt: now
  };
  try {
    const where = await saveOrder(data);
    backend.order = data;
    setStatus(st, `${p.label} 사전신청 완료! 제작이 시작되면 ${contact}(으)로 가장 먼저 연락드릴게요.`, 'ok');
    if (where === 'local') st.textContent += ' (테스트 모드: 이 기기에만 저장됐어요)';
    if (backend.owner) loadStats();
  } catch (e) {
    setStatus(st, '신청을 저장하지 못했어요. 잠시 후 다시 눌러 주세요.', 'err');
  } finally { $('#orderBtn').disabled = false; }
});

