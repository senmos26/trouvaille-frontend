import { supabase, isSupabaseConfigured, getSupabaseConfigErrorMessage, logSupabaseError, toastSupabaseError } from '../supabase'

export async function getTestimonials() {
  try {
    if (!isSupabaseConfigured()) {
      throw new Error(getSupabaseConfigErrorMessage() || 'Supabase is not configured')
    }

    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('status', 'published')
      .order('sort_order', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    logSupabaseError('Error fetching testimonials:', error)
    toastSupabaseError('Error fetching testimonials:', error)
    return []
  }
}

