'use server'

import { supabase } from '../supabase'
import type { ApiResponse, PaginatedResponse } from '../types'

export interface EventRegistration {
  id: string
  event_id: string
  name: string
  email: string
  phone?: string
  company?: string
  position?: string
  motivation?: string
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface EventRegistrationFormData {
  event_id: string
  name: string
  email: string
  phone?: string
  company?: string
  position?: string
  motivation?: string
}

export const registrationActions = {
  // Créer une inscription à un événement
  async create(data: EventRegistrationFormData): Promise<ApiResponse<EventRegistration>> {
    try {
      const { data: registration, error } = await supabase
        .from('event_registrations')
        .insert({
          event_id: data.event_id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          position: data.position,
          motivation: data.motivation,
          status: 'pending'
        })
        .select()
        .single()

      if (error) throw error

      return { data: registration, success: true }
    } catch (error) {
      console.error('Error creating event registration:', error)
      return { 
        data: null, 
        error: (error as Error).message, 
        success: false 
      }
    }
  },

  // Récupérer toutes les inscriptions
  async getAll(): Promise<PaginatedResponse<EventRegistration>> {
    const { data, error, count } = await supabase
      .from('event_registrations')
      .select(`
        *,
        event:events(id, title, date, category:event_categories(name))
      `, { count: 'exact' })
      .order('created_at', { ascending: false })

    if (error) throw error

    return {
      data: data || [],
      total: count || 0,
      limit: 100,
      offset: 0
    }
  },

  // Récupérer les inscriptions d'un événement
  async getByEvent(eventId: string): Promise<PaginatedResponse<EventRegistration>> {
    const { data, error, count } = await supabase
      .from('event_registrations')
      .select(`
        *,
        event:events(id, title, date, category:event_categories(name))
      `, { count: 'exact' })
      .eq('event_id', eventId)
      .order('created_at', { ascending: false })

    if (error) throw error

    return {
      data: data || [],
      total: count || 0,
      limit: 100,
      offset: 0
    }
  },

  // Mettre à jour le statut d'une inscription
  async updateStatus(registrationId: string, status: 'pending' | 'confirmed' | 'cancelled'): Promise<ApiResponse<boolean>> {
    try {
      const { error } = await supabase
        .from('event_registrations')
        .update({ status })
        .eq('id', registrationId)

      if (error) throw error

      return { data: true, success: true }
    } catch (error) {
      return { data: false, error: (error as Error).message, success: false }
    }
  },

  // Supprimer une inscription
  async delete(registrationId: string): Promise<ApiResponse<boolean>> {
    try {
      const { error } = await supabase
        .from('event_registrations')
        .delete()
        .eq('id', registrationId)

      if (error) throw error

      return { data: true, success: true }
    } catch (error) {
      return { data: false, error: (error as Error).message, success: false }
    }
  },

  // Vérifier si un email est déjà inscrit à un événement
  async checkEmailExists(eventId: string, email: string): Promise<ApiResponse<boolean>> {
    try {
      const { data, error } = await supabase
        .from('event_registrations')
        .select('id')
        .eq('event_id', eventId)
        .eq('email', email)
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
        throw error
      }

      return { data: !!data, success: true }
    } catch (error) {
      return { data: false, error: (error as Error).message, success: false }
    }
  }
}
