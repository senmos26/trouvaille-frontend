import { useQuery } from '@tanstack/react-query'
import { getObjectives } from '../actions/objectives'

export function useObjectives() {
  return useQuery({
    queryKey: ['objectives'],
    queryFn: getObjectives,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

