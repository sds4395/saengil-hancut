-- 생일한컷: 사전신청 · 알림 등록 저장용 표
-- Supabase > SQL Editor 에 통째로 붙여 넣고 Run 하세요.

create table if not exists pets (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  device_id   text,
  name        text not null,
  species     text,
  birth       date,
  adopt       date,
  notify      jsonb,
  contact     text
);

create table if not exists orders (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  device_id   text,
  product     text not null,
  price       integer,
  pet_name    text,
  species     text,
  mode        text,
  template    text,
  line        text,
  pet_date    date,
  contact     text not null,
  request_no  integer
);

-- 방문자는 '추가'만 할 수 있고, 남의 연락처를 읽거나 고칠 수 없게 막습니다.
alter table pets   enable row level security;
alter table orders enable row level security;

drop policy if exists "visitors can add pets"   on pets;
drop policy if exists "visitors can add orders" on orders;
create policy "visitors can add pets"   on pets   for insert to anon with check (true);
create policy "visitors can add orders" on orders for insert to anon with check (true);

-- 수요 확인용 쿼리 (SQL Editor 에서 운영자만 실행)
-- select product, count(distinct device_id) as 신청자수 from orders group by product;
-- select count(distinct device_id) as 알림등록 from pets where contact is not null;
