import { supabase } from '../supabase'

export async function getTeamMembers() {
  try {
    const { data, error } = await supabase
      .from('team_members')
      .select(`
        *,
        education:team_education(id, degree, school, year, sort_order),
        experience:team_experience(id, title, company, period, description, sort_order),
        achievements:team_achievements(id, achievement, sort_order)
      `)
      .eq('status', 'active')
      .order('sort_order')

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching team members:', error)
    return []
  }
}

export async function getTeamMember(memberId: string) {
  try {
    const { data, error } = await supabase
      .from('team_members')
      .select(`
        *,
        education:team_education(id, degree, school, year, sort_order),
        experience:team_experience(id, title, company, period, description, sort_order),
        achievements:team_achievements(id, achievement, sort_order)
      `)
      .eq('id', memberId)
      .eq('status', 'active')
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching team member:', error)
    return null
  }
}

