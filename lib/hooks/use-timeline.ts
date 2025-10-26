import { useQuery } from '@tanstack/react-query'
import { timelineActions } from '../actions/timeline'

// ============================================================================
// HOOKS POUR LA TIMELINE (FRONTEND)
// ============================================================================

export const useTimelineEntries = () => {
  return useQuery({
    queryKey: ['timeline-entries'],
    queryFn: () => timelineActions.getAll(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

