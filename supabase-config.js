window.SUPABASE_URL = 'https://cjeswtssbtgljutswzkw.supabase.co';
window.SUPABASE_ANON_KEY = 'sb_publishable_y4kUdPu-5acwqO10us7bOQ_54FV9iZx';

window.supabaseClient = null;

if (window.supabase && window.SUPABASE_URL && window.SUPABASE_ANON_KEY) {
  window.supabaseClient = window.supabase.createClient(
    window.SUPABASE_URL,
    window.SUPABASE_ANON_KEY
  );
}
