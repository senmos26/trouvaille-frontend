import { supabase } from '../supabase'
import type { BlogPost, BlogComment, BlogFilters, CommentFormData, ApiResponse, PaginatedResponse } from '../types'

// ============================================================================
// ACTIONS POUR LES ARTICLES DE BLOG (FRONTEND)
// ============================================================================

export const blogActions = {
  // Récupérer tous les articles publiés
  async getAll(filters: BlogFilters = {}): Promise<PaginatedResponse<BlogPost>> {
    const { data, error, count } = await supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(*),
        tags:blog_post_tags(tag:tags(*))
      `, { count: 'exact' })
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .range(filters.offset || 0, (filters.offset || 0) + (filters.limit || 20) - 1)

    if (error) throw error

    return {
      data: data || [],
      total: count || 0,
      limit: filters.limit || 20,
      offset: filters.offset || 0
    }
  },

  // Récupérer un article par ID
  async getById(id: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(*),
        tags:blog_post_tags(tag:tags(*)),
        comments:blog_comments(*)
      `)
      .eq('id', id)
      .eq('status', 'published')
      .single()

    if (error) throw error
    return data
  },

  // Récupérer un article par slug
  async getBySlug(slug: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(*),
        tags:blog_post_tags(tag:tags(*)),
        comments:blog_comments(*)
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error) throw error
    return data
  },

  // Rechercher des articles
  async search(filters: BlogFilters): Promise<PaginatedResponse<BlogPost>> {
    const { data, error } = await supabase
      .rpc('search_blog_posts', {
        search_query: filters.search,
        category_filter: filters.category_id,
        tag_filter: filters.tag_id,
        limit_count: filters.limit || 20,
        offset_count: filters.offset || 0
      })

    if (error) throw error

    return {
      data: data.posts || [],
      total: data.total || 0,
      limit: filters.limit || 20,
      offset: filters.offset || 0
    }
  },

  // Liker un article
  async like(postId: string, userIp: string): Promise<ApiResponse<{ liked: boolean; likes_count: number }>> {
    try {
      const { data, error } = await supabase
        .rpc('like_blog_post', {
          post_uuid: postId,
          user_ip: userIp
        })

      if (error) throw error

      return { data, success: true }
    } catch (error) {
      return { 
        data: { liked: false, likes_count: 0 }, 
        error: error instanceof Error ? error.message : 'Une erreur est survenue', 
        success: false 
      }
    }
  },

  // Récupérer les commentaires d'un article
  async getComments(postId: string): Promise<BlogComment[]> {
    const { data, error } = await supabase
      .from('blog_comments')
      .select('*')
      .eq('post_id', postId)
      .in('status', ['approved', 'pending']) // Afficher aussi les commentaires en attente pour le développement
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Ajouter un commentaire
  async addComment(postId: string, commentData: CommentFormData): Promise<ApiResponse<{ id: string; created_at: string }>> {
    try {
      const { data, error } = await supabase
        .rpc('add_blog_comment', {
          post_uuid: postId,
          author_name: commentData.author_name,
          author_email: commentData.author_email,
          comment_content: commentData.content
        })

      if (error) throw error

      return { data, success: true }
    } catch (error) {
      return { 
        data: { id: '', created_at: '' }, 
        error: error instanceof Error ? error.message : 'Une erreur est survenue', 
        success: false 
      }
    }
  }
}
