// Types de base pour l'API
export interface ApiResponse<T> {
  data: T | null
  success: boolean
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  limit: number
  offset: number
}

// Types pour les événements
export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  image?: string
  participants: number
  price: string
  status: 'draft' | 'published' | 'cancelled'
  category?: {
    id: string
    name: string
    color: string
    icon?: string
  }
  rubrique?: {
    id: string
    name: string
    color: string
  }
  speakers?: Array<{
    name: string
    title?: string
    bio?: string
  }>
  moderators?: Array<{
    name: string
    title?: string
    bio?: string
  }>
  themes?: string
  highlights?: Array<{
    highlight: string
  }>
  program?: Array<{
    time: string
    title: string
  }>
  tags?: Array<{
    tag?: {
      name: string
    }
    name?: string
  }>
  gallery?: Array<{
    image_url: string
    alt_text?: string
  }>
  created_at: string
  updated_at: string
}

// Types pour les inscriptions aux événements
export interface EventRegistration {
  id: string
  event_id: string
  name: string
  email: string
  phone?: string
  company?: string
  position?: string
  motivation?: string
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at: string
  updated_at: string
  event?: {
    id: string
    title: string
    date: string
    category?: {
      name: string
    }
  }
}

export interface EventRegistrationFormData {
  event_id: string
  name: string
  email: string
  phone?: string
  company?: string
  position?: string
  motivation?: string
}

// Types pour les articles de blog
export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  image?: string
  author_name: string
  author_title?: string
  published_at?: string
  status: 'draft' | 'published'
  likes: number
  comments_count: number
  category?: {
    id: string
    name: string
    color: string
  }
  tags?: Array<{
    tag?: {
      name: string
    }
    name?: string
  }>
  created_at: string
  updated_at: string
}

// Types pour les commentaires de blog
export interface BlogComment {
  id: string
  post_id: string
  name: string
  email: string
  content: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  updated_at: string
  post?: {
    title: string
  }
}

// Types pour les membres de l'équipe
export interface TeamMember {
  id: string
  name: string
  position: string
  bio?: string
  image?: string
  email?: string
  linkedin?: string
  twitter?: string
  order: number
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

// Types pour les objectifs
export interface Objective {
  id: string
  title: string
  description: string
  icon: string
  order: number
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

// Types pour les témoignages
export interface Testimonial {
  id: string
  content: string
  author_name: string
  author_title: string
  author_company?: string
  image?: string
  rating: number
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

// Types pour les entrées de timeline
export interface TimelineEntry {
  id: string
  title: string
  description: string
  date: string
  type: 'milestone' | 'achievement' | 'event'
  image?: string
  order: number
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

// Types pour les catégories
export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  color: string
  icon?: string
  created_at: string
  updated_at: string
}

// Types pour les contacts
export interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: 'new' | 'read' | 'replied' | 'closed'
  created_at: string
  updated_at: string
}

