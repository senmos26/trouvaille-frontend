'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { 
  createRegistration, 
  getAllRegistrations, 
  getRegistrationsByEvent, 
  updateRegistrationStatus
} from '../actions/registrations'
import type { EventRegistrationFormData } from '../actions/registrations'

// Hook pour créer une inscription
export const useCreateRegistration = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: EventRegistrationFormData) => createRegistration(data),
    onSuccess: () => {
      // Invalider les caches des inscriptions et des événements
      queryClient.invalidateQueries({ queryKey: ['event-registrations'] })
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })
}

// Hook pour récupérer toutes les inscriptions
export const useRegistrations = () => {
  return useQuery({
    queryKey: ['event-registrations'],
    queryFn: () => getAllRegistrations(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Hook pour récupérer les inscriptions d'un événement
export const useEventRegistrations = (eventId: string) => {
  return useQuery({
    queryKey: ['event-registrations', eventId],
    queryFn: () => getRegistrationsByEvent(eventId),
    enabled: !!eventId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Hook pour mettre à jour le statut d'une inscription
export const useUpdateRegistrationStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ 
      registrationId, 
      status 
    }: { 
      registrationId: string
      status: 'pending' | 'confirmed' | 'cancelled' 
    }) => updateRegistrationStatus(registrationId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event-registrations'] })
    },
  })
}
