import { useQuery } from '@tanstack/react-query'
import { getTeamMembers, getTeamMember } from '../actions/team'

export function useTeamMembers() {
  return useQuery({
    queryKey: ['team-members'],
    queryFn: getTeamMembers,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useTeamMember(id: string) {
  return useQuery({
    queryKey: ['team-member', id],
    queryFn: () => getTeamMember(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  })
}

