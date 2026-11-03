'use strict';
const T0 = today0();
const state = {
  name: '보리', species: 'dog', mode: 'birthday',
  date: iso(new Date(T0.getFullYear()-4, T0.getMonth(), T0.getDate())),
  msg: '', tpl: 'balloon', scale: 1, dx: 0, dy: 0, outline: true, sample: true
};

function info(){
  const t = today0();
  let b = parseD(state.date) || t; if (b > t) b = t;
  const days = Math.round((t - b) / 864e5) + 1;
  let next = new Date(t.getFullYear(), b.getMonth(), b.getDate());
  if (next < t) next = new Date(t.getFullYear()+1, b.getMonth(), b.getDate());
  const n = next.getFullYear() - b.getFullYear();
  const dday = Math.round((next - t) / 864e5);
  const life = state.species === 'dog' ? '견생' : '묘생';
  const name = (state.name || '').trim() || '우리 아이';
  let eyebrow, line, short, pre, badge;
  if (state.mode === 'birthday'){
    eyebrow = 'HAPPY BIRTHDAY'; badge = 'HBD';
    short = n < 1 ? '태어난 날' : `${n}번째 생일`;
    line = n < 1 ? '세상에 온 걸 환영해' : `${n}번째 생일 축하해`;
    pre = `${name}의`;
  } else if (state.mode === 'gotcha'){
    eyebrow = 'GOTCHA DAY'; badge = 'LOVE';
    short = n < 1 ? '우리 가족 된 날' : `가족 된 지 ${n}년`;
    line = n < 1 ? '우리 가족이 된 걸 환영해' : `가족이 된 지 ${n}년`;
    pre = withGa(name);
  } else {
    eyebrow = 'EVERY DAY'; badge = 'DAY';
    short = `${life} ${days.toLocaleString()}일`;
    line = `${life} ${days.toLocaleString()}일째`;
    pre = `${name}의`;
  }
  if (state.msg.trim()) line = state.msg.trim();
  return { t, b, days, n, dday, life, name, eyebrow, line, short, pre, badge };
}

