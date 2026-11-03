# 생일한컷

반려동물 사진 한 장으로 **얼굴 그대로** 생일 포스터를 만드는 모바일 웹 서비스입니다.
AI가 아이를 다시 그리지 않고, 사진의 배경만 지운 뒤 원본을 템플릿에 붙입니다.

- 템플릿 9종: 풍선파티, 케이크, 폴라로이드, 견생기록, 네컷, 매거진, 초대장, 네온, 플라워
- 기념일 3종: 생일, 입양기념일, 견생(묘생) N일
- 실물 굿즈 사전신청: 현수막 S/L, 케이크 토퍼
- 내 아이 등록 + 기념일 알림 신청 (다가오는 기념일 D-day 계산)

서버 없이 브라우저에서만 동작하는 정적 사이트라 GitHub Pages에 그대로 올릴 수 있습니다.

## 파일 구성

| 파일 | 하는 일 |
|---|---|
| `index.html` | 화면 구조 |
| `css/style.css` | 디자인 (라이트/다크 모드) |
| `js/settings.js` | **운영 설정** (Supabase 주소·키) |
| `js/config.js` | 캔버스 크기, 폰트, 색상 |
| `js/dates.js` | 날짜·나이·조사(이/가) 계산 |
| `js/state.js` | 화면 상태, 기념일 문구 계산 |
| `js/cutout.js` | 배경 자동 제거 (원본 픽셀 보존) |
| `js/sample.js` | 첫 화면 예시 강아지 |
| `js/drawkit.js` | 풍선·별·하트 등 그리기 도구 |
| `js/pet.js` | 누끼 배치, 흰 테두리 스티커 |
| `js/templates.js` | 템플릿 9종 |
| `js/render.js` | 미리보기·썸네일 그리기, 폰트 로딩 |
| `js/ui.js` | 입력값·버튼·드래그 |
| `js/upload.js` | 사진 불러오기 |
| `js/editor.js` | 배경 다듬기 브러시 |
| `js/export.js` | 이미지 만들기, 인스타 캡션 |
| `js/storage.js` | 신청 저장 (Supabase 또는 테스트 모드) |
| `js/profile.js` | 내 아이 등록, 다가오는 기념일 |
| `js/order.js` | 실물 굿즈 사전신청 |
| `js/main.js` | 시작 |

새 템플릿은 `js/templates.js`의 `TEMPLATES`에 항목 하나를 추가하면 썸네일까지 자동으로 붙습니다.

## 웹사이트로 띄우기 (GitHub Pages)

1. 이 폴더를 GitHub 저장소에 올립니다.
2. 저장소 **Settings → Pages** → Source를 `Deploy from a branch`, Branch를 `main` / `(root)`로 저장
3. 1~2분 뒤 `https://<깃허브아이디>.github.io/<저장소이름>/` 에서 열립니다.

## 사전신청 · 알림 신청을 실제로 모으기 (Supabase, 무료)

설정 전에는 **테스트 모드**라 신청 내용이 각자 기기에만 저장됩니다.

1. [supabase.com](https://supabase.com) 에서 GitHub 계정으로 가입 → New project
2. 왼쪽 **SQL Editor**에 `supabase.sql` 내용을 붙여 넣고 Run
3. **Project Settings → API**에서 `Project URL`과 `anon public` 키를 복사
4. `js/settings.js`의 두 값을 채우고 저장소에 다시 올리기

신청 내역은 Supabase의 **Table Editor**에서 `orders`, `pets` 표로 확인합니다.
방문자는 신청을 '추가'만 할 수 있고 다른 사람의 연락처는 읽을 수 없습니다.

## 다음 단계 후보

- 실제 기념일 알림 발송 (카카오 알림톡 또는 문자)
- 복잡한 배경 사진용 AI 배경 제거 옵션
- 실물 주문 결제 연동
