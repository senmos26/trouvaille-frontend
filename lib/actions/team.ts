import { supabase } from '../supabase'
import type { TeamMember, ApiResponse } from '../types'

// ============================================================================
// ACTIONS POUR L'ÉQUIPE (FRONTEND)
// ============================================================================

export const teamActions = {
  // Récupérer tous les membres d'équipe actifs
  async getAll(): Promise<TeamMember[]> {
    const { data, error } = await supabase
      .from('team_members')
      .select(`
        *,
        education:team_education(*),
        experience:team_experience(*),
        achievements:team_achievements(*)
      `)
      .eq('status', 'active')
      .order('sort_order', { ascending: true })

    if (error) throw error
    return data || []
  },

  // Récupérer un membre par ID
  async getById(id: string): Promise<TeamMember | null> {
    const { data, error } = await supabase
      .from('team_members')
      .select(`
        *,
        education:team_education(*),
        experience:team_experience(*),
        achievements:team_achievements(*)
      `)
      .eq('id', id)
      .eq('status', 'active')
      .single()

    if (error) throw error
    return data
  }
}

