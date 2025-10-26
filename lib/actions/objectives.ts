import { supabase } from '../supabase'
import type { Objective } from '../types'

// ============================================================================
// ACTIONS POUR LES OBJECTIFS (FRONTEND)
// ============================================================================

export const objectivesActions = {
  // Récupérer tous les objectifs actifs
  async getAll(): Promise<Objective[]> {
    const { data, error } = await supabase
      .from('objectives')
      .select('*')
      .eq('status', 'active')
      .order('sort_order', { ascending: true })

    if (error) throw error
    return data || []
  }
}

