import { supabase } from '../supabase'
import type { Testimonial } from '../types'

// ============================================================================
// ACTIONS POUR LES TÉMOIGNAGES (FRONTEND)
// ============================================================================

export const testimonialsActions = {
  // Récupérer tous les témoignages publiés
  async getAll(): Promise<Testimonial[]> {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('status', 'published')
      .order('sort_order', { ascending: true })

    if (error) throw error
    return data || []
  }
}

