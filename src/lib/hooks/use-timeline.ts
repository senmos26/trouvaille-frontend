import { useQuery } from '@tanstack/react-query'
import { getTimelineEntries } from '../actions/timeline'

export function useTimelineEntries() {
  return useQuery({
    queryKey: ['timeline-entries'],
    queryFn: getTimelineEntries,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

