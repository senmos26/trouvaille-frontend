import { useQuery } from '@tanstack/react-query'
import { testimonialsActions } from '../actions/testimonials'

// ============================================================================
// HOOKS POUR LES TÉMOIGNAGES (FRONTEND)
// ============================================================================

export const useTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: () => testimonialsActions.getAll(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

