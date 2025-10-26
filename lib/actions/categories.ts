import { supabase } from '../supabase'
import type { Category } from '../types'

// ============================================================================
// ACTIONS POUR LES CATÉGORIES (FRONTEND)
// ============================================================================

export const categoriesActions = {
  // Récupérer toutes les catégories d'événements
  async getEventCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('event_categories')
      .select('*')
      .order('name', { ascending: true })

    if (error) throw error
    return data || []
  },

  // Récupérer toutes les rubriques
  async getEventRubriques(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('event_rubriques')
      .select('*')
      .order('name', { ascending: true })

    if (error) throw error
    return data || []
  },

  // Récupérer toutes les catégories de blog
  async getBlogCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name', { ascending: true })

    if (error) throw error
    return data || []
  },

  // Récupérer tous les tags
  async getTags(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('name', { ascending: true })

    if (error) throw error
    return data || []
  }
}

