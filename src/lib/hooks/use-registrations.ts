'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { registrationActions } from '../actions/registrations'
import type { EventRegistration, EventRegistrationFormData } from '../actions/registrations'

// Hook pour créer une inscription
export const useCreateRegistration = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: EventRegistrationFormData) => registrationActions.create(data),
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
    queryFn: () => registrationActions.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Hook pour récupérer les inscriptions d'un événement
export const useEventRegistrations = (eventId: string) => {
  return useQuery({
    queryKey: ['event-registrations', eventId],
    queryFn: () => registrationActions.getByEvent(eventId),
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
    }) => registrationActions.updateStatus(registrationId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event-registrations'] })
    },
  })
}

// Hook pour supprimer une inscription
export const useDeleteRegistration = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (registrationId: string) => registrationActions.delete(registrationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event-registrations'] })
    },
  })
}

// Hook pour vérifier si un email existe déjà
export const useCheckEmailExists = () => {
  return useMutation({
    mutationFn: ({ 
      eventId, 
      email 
    }: { 
      eventId: string
      email: string 
    }) => registrationActions.checkEmailExists(eventId, email),
  })
}
