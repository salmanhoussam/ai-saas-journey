import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// بيانات Supabase تبعك
const SUPABASE_URL = "https://znloborouipckokqpidu.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_1sLCk0nZR20iQCyvRqfoxg_uI6Mun2c";

// إنشاء الكلاينت
export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
