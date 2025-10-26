import { useQuery } from '@tanstack/react-query'
import { getEventCategories, getEventRubriques } from '../actions/categories'

export function useEventCategories() {
  return useQuery({
    queryKey: ['event-categories'],
    queryFn: getEventCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useEventRubriques() {
  return useQuery({
    queryKey: ['event-rubriques'],
    queryFn: getEventRubriques,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

