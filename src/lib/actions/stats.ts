import { supabase, isSupabaseConfigured, getSupabaseConfigErrorMessage, logSupabaseError } from '../supabase'

export interface Stats {
  young_leaders: number
  webinars: number
  partnerships: number
}

export async function getStats(): Promise<{ data: Stats | null; error: string | null }> {
  try {
    if (!isSupabaseConfigured()) {
      throw new Error(getSupabaseConfigErrorMessage() || 'Supabase is not configured')
    }

    const { data, error } = await supabase
      .from('stats')
      .select('*')
      .single()

    if (error) throw error

    return {
      data: data as Stats,
      error: null
    }
  } catch (error) {
    logSupabaseError('getStats', error)
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Failed to fetch stats'
    }
  }
}
