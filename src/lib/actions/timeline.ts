import { supabase } from '../supabase'

export async function getTimelineEntries() {
  try {
    const { data, error } = await supabase
      .from('timeline_entries')
      .select('*')
      .eq('status', 'published')
      .order('sort_order', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching timeline entries:', error)
    return []
  }
}

