import { useQuery } from '@tanstack/react-query'
import { getTeamMembers } from '../actions/team'

export function useTeamMembers() {
  return useQuery({
    queryKey: ['team-members'],
    queryFn: getTeamMembers,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

