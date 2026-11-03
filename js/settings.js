/* 운영 설정
   Supabase 프로젝트를 만든 뒤 아래 두 값을 채우면, 사전신청·알림 등록이 서버에 쌓입니다.
   (Supabase > Project Settings > API 에서 'Project URL' 과 'anon public' 키)
   비워 두면 '테스트 모드'로 동작해 각자 기기에만 저장됩니다.
   anon 키는 공개돼도 되는 키예요. 표에는 '추가'만 허용되도록 supabase.sql 에서 막아 두었습니다. */
window.HANCUT_SETTINGS = {
  supabaseUrl: '',
  supabaseAnonKey: ''
};
