import { supabase } from '../supabase'
import type { TimelineEntry } from '../types'

// ============================================================================
// ACTIONS POUR LA TIMELINE (FRONTEND)
// ============================================================================

export const timelineActions = {
  // Récupérer toutes les entrées de timeline publiées
  async getAll(): Promise<TimelineEntry[]> {
    const { data, error } = await supabase
      .from('timeline_entries')
      .select('*')
      .eq('status', 'published')
      .order('sort_order', { ascending: true })

    if (error) throw error
    return data || []
  }
}

