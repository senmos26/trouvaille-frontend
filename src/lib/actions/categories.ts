import { supabase } from '../supabase'

export async function getEventCategories() {
  try {
    const { data, error } = await supabase
      .from('event_categories')
      .select('*')
      .order('name')

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching event categories:', error)
    return []
  }
}

export async function getEventRubriques() {
  try {
    const { data, error } = await supabase
      .from('event_rubriques')
      .select('*')
      .order('name')

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching event rubriques:', error)
    return []
  }
}

