import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { eventActions } from '../actions/events'
import type { EventFilters, RegistrationFormData } from '../types'

// ============================================================================
// HOOKS POUR LES ÉVÉNEMENTS (FRONTEND)
// ============================================================================

export const useEvents = (filters: EventFilters = {}) => {
  return useQuery({
    queryKey: ['events', filters],
    queryFn: () => eventActions.getAll(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useEvent = (id: string) => {
  return useQuery({
    queryKey: ['event', id],
    queryFn: () => eventActions.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export const useSearchEvents = (filters: EventFilters) => {
  return useQuery({
    queryKey: ['events-search', filters],
    queryFn: () => eventActions.search(filters),
    enabled: !!(filters.search || filters.category_id || filters.rubrique_id),
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useEventGallery = (eventId: string) => {
  return useQuery({
    queryKey: ['event-gallery', eventId],
    queryFn: () => eventActions.getGallery(eventId),
    enabled: !!eventId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useRegisterToEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ eventId, data }: { eventId: string; data: RegistrationFormData }) =>
      eventActions.register(eventId, data),
    onSuccess: (_, { eventId }) => {
      queryClient.invalidateQueries({ queryKey: ['event', eventId] })
    },
  })
}

