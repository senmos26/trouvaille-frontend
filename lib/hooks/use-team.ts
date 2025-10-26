import { useQuery } from '@tanstack/react-query'
import { teamActions } from '../actions/team'

// ============================================================================
// HOOKS POUR L'ÉQUIPE (FRONTEND)
// ============================================================================

export const useTeamMembers = () => {
  return useQuery({
    queryKey: ['team-members'],
    queryFn: () => teamActions.getAll(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useTeamMember = (id: string) => {
  return useQuery({
    queryKey: ['team-member', id],
    queryFn: () => teamActions.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  })
}

