// ============================================================================
// TYPES TYPESCRIPT POUR LA TROUVAILLE (FRONTEND)
// ============================================================================

// ============================================================================
// TYPES DE BASE
// ============================================================================

export interface Category {
  id: string
  name: string
  description?: string
  color: string
  icon?: string
  created_at: string
  updated_at: string
}

export interface Tag {
  id: string
  name: string
  color: string
  created_at: string
  updated_at: string
}

// ============================================================================
// TYPES POUR LES ÉVÉNEMENTS
// ============================================================================

export interface EventSpeaker {
  id: string
  event_id: string
  name: string
  bio?: string
  photo?: string
  linkedin?: string
  twitter?: string
  created_at: string
}

export interface EventModerator {
  id: string
  event_id: string
  name: string
  bio?: string
  photo?: string
  linkedin?: string
  twitter?: string
  created_at: string
}

export interface EventGalleryPhoto {
  id: string
  event_id: string
  image_url: string
  title?: string
  alt_text?: string
  sort_order: number
  created_at: string
}

export interface EventHighlight {
  id: string
  event_id: string
  highlight: string
  sort_order: number
  created_at: string
}

export interface EventProgramItem {
  id: string
  event_id: string
  time: string
  title: string
  description?: string
  sort_order: number
  created_at: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category_id?: string
  rubrique_id?: string
  themes?: string
  image?: string
  price: string
  max_participants?: number
  participants: number
  status: 'draft' | 'published' | 'cancelled'
  created_at: string
  updated_at: string
  
  // Relations
  category?: Category
  rubrique?: Category
  speakers?: EventSpeaker[]
  moderators?: EventModerator[]
  tags?: Tag[]
  gallery?: EventGalleryPhoto[]
  highlights?: EventHighlight[]
  program?: EventProgramItem[]
}

// ============================================================================
// TYPES POUR LES ARTICLES DE BLOG
// ============================================================================

export interface BlogComment {
  id: string
  post_id: string
  author_name: string
  author_email: string
  content: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  category_id?: string
  author: string
  image?: string
  slug: string
  likes: number
  comments_count: number
  status: 'draft' | 'published' | 'archived'
  published_at?: string
  created_at: string
  updated_at: string
  
  // Relations
  category?: Category
  tags?: Tag[]
  comments?: BlogComment[]
}

// ============================================================================
// TYPES POUR L'ÉQUIPE
// ============================================================================

export interface TeamEducation {
  id: string
  member_id: string
  degree: string
  school: string
  year: string
  sort_order: number
  created_at: string
}

export interface TeamExperience {
  id: string
  member_id: string
  title: string
  company: string
  period: string
  description?: string
  sort_order: number
  created_at: string
}

export interface TeamAchievement {
  id: string
  member_id: string
  achievement: string
  sort_order: number
  created_at: string
}

export interface TeamMember {
  id: string
  name: string
  position: string
  bio: string
  image?: string
  email?: string
  skills: string[]
  social_linkedin?: string
  social_twitter?: string
  social_facebook?: string
  sort_order: number
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
  
  // Relations
  education?: TeamEducation[]
  experience?: TeamExperience[]
  achievements?: TeamAchievement[]
}

// ============================================================================
// TYPES POUR LES OBJECTIFS
// ============================================================================

export interface Objective {
  id: string
  title: string
  description: string
  icon: string
  color: string
  sort_order: number
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

// ============================================================================
// TYPES POUR LES TÉMOIGNAGES
// ============================================================================

export interface Testimonial {
  id: string
  quote: string
  author_name: string
  author_title: string
  author_company?: string
  author_photo?: string
  initials?: string
  rating?: number
  status: 'draft' | 'published' | 'archived'
  sort_order: number
  created_at: string
  updated_at: string
}

// ============================================================================
// TYPES POUR LA TIMELINE
// ============================================================================

export interface TimelineEntry {
  id: string
  year: string
  title: string
  content: string
  images: string[]
  sort_order: number
  status: 'draft' | 'published' | 'archived'
  created_at: string
  updated_at: string
}

// ============================================================================
// TYPES POUR LES INSCRIPTIONS
// ============================================================================

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
}

// ============================================================================
// TYPES POUR LES CONTACTS
// ============================================================================

export interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
  status: 'new' | 'read' | 'replied' | 'closed'
  created_at: string
  updated_at: string
}

// ============================================================================
// TYPES POUR LES RÉPONSES API
// ============================================================================

export interface ApiResponse<T> {
  data: T
  error?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  limit: number
  offset: number
}

// ============================================================================
// TYPES POUR LES FILTRES ET RECHERCHE
// ============================================================================

export interface EventFilters {
  search?: string
  category_id?: string
  rubrique_id?: string
  date_from?: string
  date_to?: string
  limit?: number
  offset?: number
}

export interface BlogFilters {
  search?: string
  category_id?: string
  tag_id?: string
  limit?: number
  offset?: number
}

// ============================================================================
// TYPES POUR LES STATISTIQUES
// ============================================================================

export interface DashboardStats {
  events: {
    total: number
    upcoming: number
    this_month: number
  }
  blog: {
    total_posts: number
    total_likes: number
    total_comments: number
  }
  team: {
    total_members: number
  }
  registrations: {
    total: number
    this_month: number
    pending: number
  }
  contacts: {
    total: number
    new: number
    this_month: number
  }
}

// ============================================================================
// TYPES POUR LES FORMULAIRES
// ============================================================================

export interface RegistrationFormData {
  name: string
  email: string
  phone?: string
  company?: string
  position?: string
  motivation?: string
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
}

export interface CommentFormData {
  author_name: string
  author_email: string
  content: string
}

// ============================================================================
// TYPES POUR LES ICÔNES
// ============================================================================

export type IconName = 
  | 'MessageSquare'
  | 'BookOpen'
  | 'Globe'
  | 'Briefcase'
  | 'Users'
  | 'Leaf'
  | 'Target'
  | 'Sparkles'
  | 'Heart'
  | 'Award'
  | 'TrendingUp'
  | 'Lightbulb'
  | 'Rocket'
  | 'Star'
  | 'Zap'
  | 'Crown'
  | 'Eye'
  | 'Flame'
  | 'Trophy'
  | 'Gift'

