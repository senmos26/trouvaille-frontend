'use client'

import { supabase } from '../supabase'
import type { ApiResponse, Contact } from '../types'

export interface ContactFormInput {
  name: string
  email: string
  subject: string
  message: string
}

// Créer un message de contact dans la table `contacts`
export async function createContact(data: ContactFormInput): Promise<ApiResponse<Contact>> {
  try {
    const { error } = await supabase
      .from('contacts')
      .insert({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        status: 'new',
      })

    if (error) throw error

    return { data: null, success: true }
  } catch (error) {
    console.error('Error creating contact message:', error)
    return {
      data: null,
      success: false,
      error: (error as Error).message,
    }
  }
}
