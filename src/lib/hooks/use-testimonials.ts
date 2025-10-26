import { useQuery } from '@tanstack/react-query'
import { getTestimonials } from '../actions/testimonials'

export function useTestimonials() {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: getTestimonials,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

