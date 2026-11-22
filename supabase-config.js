window.SUPABASE_URL = 'https://caqlefawaeevvozhdxgc.supabase.co';
window.SUPABASE_ANON_KEY = 'sb_publishable_5WyjbWQGDHYN0Wy2lID6lA_iznlcGbG';

window.supabaseClient = null;

if (window.supabase && window.SUPABASE_URL && window.SUPABASE_ANON_KEY) {
  window.supabaseClient = window.supabase.createClient(
    window.SUPABASE_URL,
    window.SUPABASE_ANON_KEY
  );
}
