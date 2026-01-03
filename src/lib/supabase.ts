import { createClient } from '@supabase/supabase-js'

const rawSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Diagnostic logs
console.log('🔍 [SUPABASE CONFIG] URL:', rawSupabaseUrl)
console.log('🔍 [SUPABASE CONFIG] Anon Key exists:', !!supabaseAnonKey)
console.log('🔍 [SUPABASE CONFIG] Anon Key length:', supabaseAnonKey.length)
console.log('🔍 [SUPABASE CONFIG] Anon Key first 20 chars:', supabaseAnonKey.substring(0, 20))

const supabaseUrl = rawSupabaseUrl
  ? rawSupabaseUrl.startsWith('http://') || rawSupabaseUrl.startsWith('https://')
    ? rawSupabaseUrl
    : `https://${rawSupabaseUrl}`
  : ''

export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabaseAnonKey)
}

export function getSupabaseConfigErrorMessage() {
  if (isSupabaseConfigured()) return null
  return 'Supabase credentials not found. Create .env.local with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
}

interface SupabaseError {
  name?: string;
  message?: string;
  details?: string;
  hint?: string;
  code?: string;
  status?: number;
}

export function logSupabaseError(context: string, error: unknown) {
  const e = error as SupabaseError
  console.error(context, {
    name: e?.name,
    message: e?.message,
    details: e?.details,
    hint: e?.hint,
    code: e?.code,
    status: e?.status,
  })
}

export function toastSupabaseError(context: string, error: unknown) {
  if (typeof window === 'undefined') return

  const e = error as SupabaseError
  const message =
    e?.message ||
    (typeof error === 'string' ? error : null) ||
    (error instanceof Error ? error.message : null) ||
    'Unknown error'

  const meta = [e?.code, e?.status].filter(Boolean).join(' · ')
  const description = [meta, e?.details, e?.hint].filter(Boolean).join('\n')

  void import('sonner')
    .then(({ toast }) => {
      toast.error(context.replace(/:$/, ''), {
        description: description ? `${message}\n${description}` : message,
      })
    })
    .catch(() => {
      // ignore toast failures
    })
}

if (!rawSupabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials not found. Make sure to create .env.local with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
} else if (!rawSupabaseUrl.startsWith('http://') && !rawSupabaseUrl.startsWith('https://')) {
  console.warn('⚠️ NEXT_PUBLIC_SUPABASE_URL is missing http(s)://. It will be normalized automatically, but you should fix the env value.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
})

