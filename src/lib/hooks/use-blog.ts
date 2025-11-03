import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getBlogPosts, getBlogPost, getBlogCategories, likeBlogPost, addBlogComment, getBlogComments } from '../actions/blog'

export function useBlogPosts() {
  return useQuery({
    queryKey: ['blog-posts'],
    queryFn: getBlogPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useBlogPost(postId: string) {
  return useQuery({
    queryKey: ['blog-post', postId],
    queryFn: () => getBlogPost(postId),
    enabled: !!postId,
    staleTime: 5 * 60 * 1000,
  })
}

export function useBlogCategories() {
  return useQuery({
    queryKey: ['blog-categories'],
    queryFn: getBlogCategories,
    staleTime: 10 * 60 * 1000,
  })
}

export function useLikeBlogPost() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ postId, userIp }: { postId: string; userIp?: string }) => 
      likeBlogPost(postId, userIp),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] })
      queryClient.invalidateQueries({ queryKey: ['blog-post'] })
    },
  })
}

export function useAddBlogComment() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ postId, commentData }: { 
      postId: string; 
      commentData: { author_name: string; author_email: string; content: string } 
    }) => addBlogComment(postId, commentData),
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ['blog-post', postId] })
      queryClient.invalidateQueries({ queryKey: ['blog-comments', postId] })
    },
  })
}

// Alias pour compatibilité
export const useAddComment = useAddBlogComment

export function useBlogComments(postId: string) {
  return useQuery({
    queryKey: ['blog-comments', postId],
    queryFn: () => getBlogComments(postId),
    enabled: !!postId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}
