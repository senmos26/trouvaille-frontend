import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { blogActions } from '../actions/blog'
import type { BlogFilters, CommentFormData } from '../types'

// ============================================================================
// HOOKS POUR LES ARTICLES DE BLOG (FRONTEND)
// ============================================================================

export const useBlogPosts = (filters: BlogFilters = {}) => {
  return useQuery({
    queryKey: ['blog-posts', filters],
    queryFn: () => blogActions.getAll(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useBlogPost = (id: string) => {
  return useQuery({
    queryKey: ['blog-post', id],
    queryFn: () => blogActions.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export const useBlogPostBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['blog-post-slug', slug],
    queryFn: () => blogActions.getBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  })
}

export const useSearchBlogPosts = (filters: BlogFilters) => {
  return useQuery({
    queryKey: ['blog-posts-search', filters],
    queryFn: () => blogActions.search(filters),
    enabled: !!(filters.search || filters.category_id || filters.tag_id),
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useLikeBlogPost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ postId, userIp }: { postId: string; userIp: string }) =>
      blogActions.like(postId, userIp),
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ['blog-post', postId] })
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] })
    },
  })
}

export const useAddComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ postId, data }: { postId: string; data: CommentFormData }) =>
      blogActions.addComment(postId, data),
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ['blog-post', postId] })
      queryClient.invalidateQueries({ queryKey: ['blog-comments', postId] })
    },
  })
}

export const useBlogComments = (postId: string) => {
  return useQuery({
    queryKey: ['blog-comments', postId],
    queryFn: () => blogActions.getComments(postId),
    enabled: !!postId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

