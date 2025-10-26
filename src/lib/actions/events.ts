import { supabase } from '../supabase'

export async function getEvents(params?: {
  limit?: number
  category_id?: string
  rubrique_id?: string
  search?: string
}) {
  try {
    let query = supabase
      .from('events')
      .select(`
        *,
        category:event_categories(id, name, color, icon),
        rubrique:event_rubriques(id, name, color),
        speakers:event_speakers(id, name, bio, photo),
        moderators:event_moderators(id, name, bio, photo),
        tags:event_tags(tag:tags(id, name, color)),
        gallery:event_gallery(id, image_url, title, alt_text, sort_order),
        highlights:event_highlights(id, highlight, sort_order),
        program:event_program(id, time, title, description, sort_order)
      `)
      .eq('status', 'published')
      .order('date', { ascending: false })

    if (params?.limit) {
      query = query.limit(params.limit)
    }

    if (params?.category_id) {
      query = query.eq('category_id', params.category_id)
    }

    if (params?.rubrique_id) {
      query = query.eq('rubrique_id', params.rubrique_id)
    }

    if (params?.search) {
      query = query.or(`title.ilike.%${params.search}%,description.ilike.%${params.search}%`)
    }

    const { data, error, count } = await query

    if (error) throw error

    return {
      data: data || [],
      total: count || 0
    }
  } catch (error) {
    console.error('Error fetching events:', error)
    return {
      data: [],
      total: 0
    }
  }
}

export async function getEvent(eventId: string) {
  try {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        category:event_categories(id, name, color, icon),
        rubrique:event_rubriques(id, name, color),
        speakers:event_speakers(id, name, bio, photo, linkedin, twitter),
        moderators:event_moderators(id, name, bio, photo, linkedin, twitter),
        tags:event_tags(tag:tags(id, name, color)),
        gallery:event_gallery(id, image_url, title, alt_text, sort_order),
        highlights:event_highlights(id, highlight, sort_order),
        program:event_program(id, time, title, description, sort_order)
      `)
      .eq('id', eventId)
      .eq('status', 'published')
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching event:', error)
    return null
  }
}

export async function searchEvents(searchQuery: string) {
  try {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        category:event_categories(id, name, color, icon),
        rubrique:event_rubriques(id, name, color),
        speakers:event_speakers(id, name, bio, photo),
        moderators:event_moderators(id, name, bio, photo),
        tags:event_tags(tag:tags(id, name, color)),
        gallery:event_gallery(id, image_url, title, alt_text, sort_order)
      `)
      .eq('status', 'published')
      .or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`)
      .order('date', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error searching events:', error)
    return []
  }
}

