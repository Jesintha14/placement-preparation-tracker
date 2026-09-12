import { createClient, SupabaseClient } from '@supabase/supabase-js';

const STORAGE_KEY_URL = 'placement_tracker_supabase_url';
const STORAGE_KEY_ANON = 'placement_tracker_supabase_anon_key';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isConnected: boolean;
}

let cachedClient: SupabaseClient | null = null;

export const getSupabaseConfig = (): SupabaseConfig => {
  const envUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
  const envAnon = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

  const storedUrl = localStorage.getItem(STORAGE_KEY_URL) || envUrl;
  const storedAnon = localStorage.getItem(STORAGE_KEY_ANON) || envAnon;

  const isValid = Boolean(storedUrl && storedAnon && storedUrl.startsWith('http'));

  return {
    url: storedUrl,
    anonKey: storedAnon,
    isConnected: isValid
  };
};

export const getSupabaseClient = (): SupabaseClient | null => {
  const config = getSupabaseConfig();
  if (!config.isConnected) {
    return null;
  }
  if (!cachedClient) {
    try {
      cachedClient = createClient(config.url, config.anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        }
      });
    } catch (err) {
      console.error('Failed to initialize Supabase client:', err);
      return null;
    }
  }
  return cachedClient;
};

export const saveSupabaseCredentials = (url: string, anonKey: string): boolean => {
  try {
    if (!url || !anonKey) {
      localStorage.removeItem(STORAGE_KEY_URL);
      localStorage.removeItem(STORAGE_KEY_ANON);
      cachedClient = null;
      return false;
    }
    localStorage.setItem(STORAGE_KEY_URL, url.trim());
    localStorage.setItem(STORAGE_KEY_ANON, anonKey.trim());
    cachedClient = createClient(url.trim(), anonKey.trim());
    return true;
  } catch (err) {
    console.error('Error saving Supabase credentials:', err);
    return false;
  }
};
