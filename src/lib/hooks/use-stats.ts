import { useQuery } from '@tanstack/react-query'
import { getStats } from '../actions/stats'

export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: getStats,
    staleTime: 10 * 60 * 1000, // 10 minutes - stats don't change often
    refetchOnWindowFocus: false,
  })
}
