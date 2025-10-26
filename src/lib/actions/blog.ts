import { supabase } from '../supabase'

export async function getBlogPosts() {
  try {
    const { data, error, count } = await supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(id, name, color),
        tags:blog_post_tags(tag:tags(id, name, color))
      `, { count: 'exact' })
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    if (error) throw error

    return {
      data: data || [],
      total: count || 0
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return {
      data: [],
      total: 0
    }
  }
}

export async function getBlogPost(postId: string) {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(id, name, color),
        tags:blog_post_tags(tag:tags(id, name, color)),
        comments:blog_comments(id, author_name, author_email, content, created_at, status)
      `)
      .eq('id', postId)
      .eq('status', 'published')
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export async function getBlogCategories() {
  try {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name')

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching blog categories:', error)
    return []
  }
}

export async function likeBlogPost(postId: string, userIp: string = 'anonymous') {
  try {
    // Vérifier si l'utilisateur a déjà liké ce post
    const { data: existingLike, error: checkError } = await supabase
      .from('blog_likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_ip', userIp)
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError
    }

    if (existingLike) {
      // L'utilisateur a déjà liké, on retire le like (toggle)
      const { error: deleteError } = await supabase
        .from('blog_likes')
        .delete()
        .eq('post_id', postId)
        .eq('user_ip', userIp)

      if (deleteError) throw deleteError

      // Décrémenter le compteur de likes
      const { error: updateError } = await supabase.rpc('decrement_blog_likes', {
        post_id: postId
      })

      if (updateError) {
        console.warn('Failed to update likes count:', updateError)
      }

      return { success: true, data: null, action: 'unliked' }
    }

    // Ajouter le like
    const { data, error } = await supabase
      .from('blog_likes')
      .insert({
        post_id: postId,
        user_ip: userIp
      })

    if (error) throw error

    // Mettre à jour le compteur de likes
    const { error: updateError } = await supabase.rpc('increment_blog_likes', {
      post_id: postId
    })

    if (updateError) {
      console.warn('Failed to update likes count:', updateError)
    }

    return { success: true, data, action: 'liked' }
  } catch (error) {
    console.error('Error liking blog post:', error)
    throw error
  }
}

export async function addBlogComment(postId: string, commentData: {
  author_name: string
  author_email: string
  content: string
}) {
  try {
    const { data, error } = await supabase
      .from('blog_comments')
      .insert({
        post_id: postId,
        ...commentData,
        status: 'pending' // Les commentaires sont en attente de modération
      })
      .select()

    if (error) throw error

    // Mettre à jour le compteur de commentaires
    const { error: updateError } = await supabase.rpc('increment_blog_comments', {
      post_id: postId
    })

    if (updateError) {
      console.warn('Failed to update comments count:', updateError)
    }

    return data
  } catch (error) {
    console.error('Error adding blog comment:', error)
    throw error
  }
}

export async function getBlogComments(postId: string) {
  try {
    const { data, error } = await supabase
      .from('blog_comments')
      .select('*')
      .eq('post_id', postId)
      .eq('status', 'approved')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching blog comments:', error)
    return []
  }
}
