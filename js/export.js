'use strict';
function caption(I){
  const tag = state.species === 'dog' ? '강아지' : '고양이';
  const yrs = Math.max(1, Math.ceil(I.days / 365));
  if (state.mode === 'birthday') return `오늘은 ${I.name}의 ${I.n < 1 ? '첫' : I.n + '번째'} 생일 🎂\n${I.life} ${I.days.toLocaleString()}일째, 앞으로도 건강하게 오래오래 같이 놀자!\n\n#${tag}생일 #${I.life}${yrs}년차 #${I.name} #생일한컷`;
  if (state.mode === 'gotcha') return `${withGa(I.name)} 우리 가족이 된 지 ${Math.max(1, I.n)}년 🏡\n와줘서 고마워, 앞으로도 잘 부탁해!\n\n#입양기념일 #가족된날 #${tag}스타그램 #${I.name} #생일한컷`;
  return `${I.name} ${I.life} ${I.days.toLocaleString()}일째 🐾\n오늘도 좋은 하루!\n\n#${I.life}기록 #${tag}스타그램 #${I.name} #생일한컷`;
}
$('#make').addEventListener('click', async () => {
  const I = info(); await fontsFor(I); paint(octx, state.tpl, 1);
  $('#resultImg').src = out.toDataURL('image/jpeg', 0.92);
  $('#resultTitle').textContent = `${I.name}의 한컷 완성`;
  $('#caption').value = caption(I);
  if (!$('#orderContact').value && prof && prof.contact) $('#orderContact').value = prof.contact;
  $('#resultSheet').hidden = false;
});
$('#resClose').addEventListener('click', () => { $('#resultSheet').hidden = true; });
$('#copyCap').addEventListener('click', () => {
  const ta = $('#caption');
  const fallback = () => { ta.focus(); ta.select(); toast('캡션을 선택했어요. 복사해서 붙여 넣으세요'); };
  try { navigator.clipboard.writeText(ta.value).then(() => toast('캡션을 복사했어요'), fallback); } catch (e) { fallback(); }
});

