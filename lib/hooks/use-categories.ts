import { useQuery } from '@tanstack/react-query'
import { categoriesActions } from '../actions/categories'

// ============================================================================
// HOOKS POUR LES CATÉGORIES (FRONTEND)
// ============================================================================

export const useEventCategories = () => {
  return useQuery({
    queryKey: ['event-categories'],
    queryFn: () => categoriesActions.getEventCategories(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  })
}

export const useEventRubriques = () => {
  return useQuery({
    queryKey: ['event-rubriques'],
    queryFn: () => categoriesActions.getEventRubriques(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  })
}

export const useBlogCategories = () => {
  return useQuery({
    queryKey: ['blog-categories'],
    queryFn: () => categoriesActions.getBlogCategories(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  })
}

export const useTags = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: () => categoriesActions.getTags(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  })
}

