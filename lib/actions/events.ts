import { supabase } from '../supabase'
import type { Event, EventFilters, RegistrationFormData, ApiResponse, PaginatedResponse } from '../types'

// ============================================================================
// ACTIONS POUR LES ÉVÉNEMENTS (FRONTEND)
// ============================================================================

export const eventActions = {
  // Récupérer tous les événements publiés
  async getAll(filters: EventFilters = {}): Promise<PaginatedResponse<Event>> {
    const { data, error, count } = await supabase
      .from('events')
      .select(`
        *,
        category:event_categories(*),
        rubrique:event_rubriques(*),
        speakers:event_speakers(*),
        moderators:event_moderators(*),
        tags:event_tags(tag:tags(*)),
        gallery:event_gallery(*),
        highlights:event_highlights(*),
        program:event_program(*)
      `, { count: 'exact' })
      .eq('status', 'published')
      .order('date', { ascending: false })
      .range(filters.offset || 0, (filters.offset || 0) + (filters.limit || 20) - 1)

    if (error) throw error

    return {
      data: data || [],
      total: count || 0,
      limit: filters.limit || 20,
      offset: filters.offset || 0
    }
  },

  // Récupérer un événement par ID
  async getById(id: string): Promise<Event | null> {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        category:event_categories(*),
        rubrique:event_rubriques(*),
        speakers:event_speakers(*),
        moderators:event_moderators(*),
        tags:event_tags(tag:tags(*)),
        gallery:event_gallery(*),
        highlights:event_highlights(*),
        program:event_program(*)
      `)
      .eq('id', id)
      .eq('status', 'published')
      .single()

    if (error) throw error
    return data
  },

  // Rechercher des événements
  async search(filters: EventFilters): Promise<PaginatedResponse<Event>> {
    const { data, error } = await supabase
      .rpc('search_events', {
        search_query: filters.search,
        category_filter: filters.category_id,
        rubrique_filter: filters.rubrique_id,
        date_from: filters.date_from,
        date_to: filters.date_to,
        limit_count: filters.limit || 20,
        offset_count: filters.offset || 0
      })

    if (error) throw error

    return {
      data: data.events || [],
      total: data.total || 0,
      limit: filters.limit || 20,
      offset: filters.offset || 0
    }
  },

  // S'inscrire à un événement
  async register(eventId: string, registrationData: RegistrationFormData): Promise<ApiResponse<{ id: string; created_at: string } | null>> {
    try {
      const { data, error } = await supabase
        .rpc('register_to_event', {
          event_uuid: eventId,
          participant_name: registrationData.name,
          participant_email: registrationData.email,
          participant_phone: registrationData.phone,
          participant_company: registrationData.company,
          participant_position: registrationData.position,
          participant_motivation: registrationData.motivation
        })

      if (error) throw error

      return { data: data || { id: '', created_at: '' }, success: true }
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Une erreur est survenue', 
        success: false 
      }
    }
  },

  // Récupérer la galerie d'un événement
  async getGallery(eventId: string): Promise<{ images: Array<{ id: string; image_url: string; alt_text?: string }> }> {
    const { data, error } = await supabase
      .rpc('get_event_gallery', {
        event_uuid: eventId
      })

    if (error) throw error
    return data
  }
}
