import { useQuery } from '@tanstack/react-query'
import { objectivesActions } from '../actions/objectives'

// ============================================================================
// HOOKS POUR LES OBJECTIFS (FRONTEND)
// ============================================================================

export const useObjectives = () => {
  return useQuery({
    queryKey: ['objectives'],
    queryFn: () => objectivesActions.getAll(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

