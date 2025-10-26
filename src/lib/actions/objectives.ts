import { supabase } from '../supabase'

export async function getObjectives() {
  try {
    const { data, error } = await supabase
      .from('objectives')
      .select('*')
      .eq('status', 'active')
      .order('sort_order', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching objectives:', error)
    return []
  }
}

