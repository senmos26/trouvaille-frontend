import { useQuery } from '@tanstack/react-query'
import { getEvents, getEvent, searchEvents } from '../actions/events'

export function useEvents(params?: {
  limit?: number
  category_id?: string
  rubrique_id?: string
  search?: string
}) {
  return useQuery({
    queryKey: ['events', params],
    queryFn: () => getEvents(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useEvent(eventId: string) {
  return useQuery({
    queryKey: ['event', eventId],
    queryFn: () => getEvent(eventId),
    enabled: !!eventId,
    staleTime: 5 * 60 * 1000,
  })
}

export function useSearchEvents(searchQuery: string) {
  return useQuery({
    queryKey: ['events', 'search', searchQuery],
    queryFn: () => searchEvents(searchQuery),
    enabled: !!searchQuery && searchQuery.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

