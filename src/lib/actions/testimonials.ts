import { supabase } from '../supabase'

export async function getTestimonials() {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('status', 'published')
      .order('sort_order', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

