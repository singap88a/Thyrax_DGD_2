import api from './api';

const communityService = {
  // Add a new post (with optional image)
  addPost: async (content, imageFile) => {
    try {
      const formData = new FormData();
      formData.append('Content', content);
      if (imageFile) {
        formData.append('ImagePost', imageFile);
      }

      const response = await api.post('/Community/Add-Post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error adding post:', error);
      throw error;
    }
  },

  // Get all posts
  getAllPosts: async () => {
    try {
      const response = await api.get('/Community/Display-All-Posts');
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  // Add a comment to a post
  addComment: async (postId, content) => {
    try {
      const formData = new FormData();
      formData.append('PostId', postId);
      formData.append('Content', content);

      const response = await api.post('/Community/Add-Comment', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  },

  // Get comments for a specific post
  getPostComments: async (postId) => {
    try {
      const response = await api.get(`/Community/PostId:${postId}/comments`);
      return response.data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  },

  // Toggle like on a post
  toggleLike: async (postId) => {
    try {
      const formData = new FormData();
      formData.append('PostId', postId);

      const response = await api.post('/Community/Add-Post-Like', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error toggling like:', error);
      throw error;
    }
  },

  // Delete a comment
  deleteComment: async (commentId) => {
    try {
      const response = await api.delete(`/Community/DeleteComment?CommentId=${commentId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  },

  // Delete a post
  deletePost: async (postId) => {
    try {
      const response = await api.delete(`/Community/post/${postId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  },
};

export default communityService;
