import React, { useState, useEffect } from 'react';
import { FaRegHeart, FaHeart, FaRegComment, FaShare, FaEllipsisH, FaTrash } from 'react-icons/fa';
import communityService from '../../services/communityService';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';

const PostCard = ({ post, onPostDeleted, onPostUpdated }) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(post.commentsCount);
  const [loadingComments, setLoadingComments] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const API_BASE = 'https://thyrocarex.runasp.net';

  // Check if current user is the post author
  const isOwnPost = user?.username === post.doctorName;

  // Fetch comments when comment section is opened
  useEffect(() => {
    if (showComments && comments.length === 0) {
      fetchComments();
    }
  }, [showComments]);

  const fetchComments = async () => {
    setLoadingComments(true);
    try {
      const response = await communityService.getPostComments(post.postId);
      if (response.succeeded && response.data) {
        setComments(response.data);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast.error('Failed to load comments');
    } finally {
      setLoadingComments(false);
    }
  };

  const handleLike = async () => {
    const previousLiked = isLiked;
    const previousCount = likesCount;
    
    // Optimistic update
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);

    try {
      const response = await communityService.toggleLike(post.postId);
      if (!response.succeeded) {
        // Revert on failure
        setIsLiked(previousLiked);
        setLikesCount(previousCount);
        toast.error('Failed to update like');
      }
    } catch (error) {
      // Revert on error
      setIsLiked(previousLiked);
      setLikesCount(previousCount);
      console.error('Error toggling like:', error);
      toast.error('Failed to update like');
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setSubmittingComment(true);
    try {
      const response = await communityService.addComment(post.postId, commentText);
      
      if (response.succeeded) {
        toast.success('Comment added!');
        setCommentText('');
        setCommentsCount(prev => prev + 1);
        // Refresh comments
        await fetchComments();
      } else {
        toast.error(response.message || 'Failed to add comment');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    try {
      const response = await communityService.deleteComment(commentId);
      
      if (response.succeeded) {
        toast.success('Comment deleted!');
        setComments(comments.filter(c => c.commentId !== commentId));
        setCommentsCount(prev => prev - 1);
      } else {
        toast.error(response.message || 'Failed to delete comment');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error('Failed to delete comment');
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const response = await communityService.deletePost(post.postId);
      
      if (response.succeeded) {
        toast.success('Post deleted!');
        if (onPostDeleted) {
          onPostDeleted(post.postId);
        }
      } else {
        toast.error(response.message || 'Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="mb-6 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl group transition-all duration-300 hover:shadow-md">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            {post.doctorImage ? (
              <img 
                src={`${API_BASE}/${post.doctorImage}`} 
                alt={post.doctorName} 
                className="w-10 h-10 rounded-full object-cover border-2 border-primary/20" 
              />
            ) : (
              <div className="flex items-center justify-center w-10 h-10 text-white rounded-full bg-primary/10 border-2 border-primary/30">
                <span className="font-bold text-primary">{post.doctorName?.charAt(0) || 'D'}</span>
              </div>
            )}
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 hover:text-primary transition-colors cursor-pointer">
              {post.doctorName}
            </h3>
            <p className="text-xs text-gray-500 font-medium">{post.specialization} • {formatDate(post.createdAt)}</p>
          </div>
        </div>
        
        {isOwnPost && (
          <div className="relative">
            <button 
              onClick={() => setShowOptions(!showOptions)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 transition-colors"
            >
              <FaEllipsisH className="w-4 h-4" />
            </button>
            {showOptions && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-10">
                <button
                  onClick={() => {
                    setShowOptions(false);
                    handleDeletePost();
                  }}
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg flex items-center space-x-2"
                >
                  <FaTrash className="w-3 h-3" />
                  <span className="text-sm">Delete Post</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
      </div>

      {/* Post Image */}
      {post.imagePost && (
        <div className="relative mt-2 overflow-hidden bg-gray-100">
          <img 
            src={`${API_BASE}/${post.imagePost}`} 
            alt="Post content" 
            className="w-full max-h-[500px] object-cover transition-transform duration-500 group-hover:scale-[1.02]" 
          />
        </div>
      )}

      {/* Post Stats */}
      <div className="px-4 py-2 flex items-center justify-between text-xs text-gray-500 border-t border-gray-50">
        <div className="flex items-center space-x-1">
          <div className="flex items-center justify-center w-5 h-5 bg-primary/10 rounded-full text-[10px] text-primary">
            <FaHeart />
          </div>
          <span>{likesCount} likes</span>
        </div>
        <button 
          onClick={() => setShowComments(!showComments)}
          className="hover:underline cursor-pointer"
        >
          {commentsCount} comments
        </button>
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between px-2 py-1 mx-2 mb-1 border-t border-gray-50">
        <button 
          onClick={handleLike}
          className={`flex items-center justify-center flex-1 py-2 space-x-2 rounded-lg transition-all duration-300 ${
            isLiked ? "text-primary bg-primary/5" : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          {isLiked ? <FaHeart className="w-4 h-4" /> : <FaRegHeart className="w-4 h-4" />}
          <span className="text-sm font-medium">Like</span>
        </button>
        <button 
          onClick={() => setShowComments(!showComments)}
          className={`flex items-center justify-center flex-1 py-2 space-x-2 rounded-lg transition-all duration-300 ${
            showComments ? "text-primary bg-primary/5" : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <FaRegComment className="w-4 h-4" />
          <span className="text-sm font-medium">Comment</span>
        </button>
        <button className="flex items-center justify-center flex-1 py-2 space-x-2 text-gray-600 rounded-lg hover:bg-gray-50 transition-all duration-300">
          <FaShare className="w-4 h-4" />
          <span className="text-sm font-medium">Share</span>
        </button>
      </div>

      {/* Comment Section */}
      {showComments && (
        <div className="px-4 pb-4 bg-gray-50/50 border-t border-gray-50 pt-4 animate-fade-in">
          {/* New Comment Input */}
          <form onSubmit={handleAddComment} className="flex items-center space-x-3 mb-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-8 h-8 text-white rounded-full bg-primary/10 border border-primary/20">
                <span className="text-xs font-bold text-primary">{user?.username?.charAt(0) || 'U'}</span>
              </div>
            </div>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                disabled={submittingComment}
                className="w-full px-4 py-2 text-sm bg-white border border-gray-200 rounded-full focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
              <button 
                type="submit"
                disabled={!commentText.trim() || submittingComment}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors ${
                  commentText.trim() && !submittingComment ? "text-primary hover:bg-primary/10" : "text-gray-300"
                }`}
              >
                <FaShare className="w-3 h-3 rotate-[-45deg]" />
              </button>
            </div>
          </form>

          {/* Comment List */}
          {loadingComments ? (
            <div className="text-center py-4 text-gray-500">Loading comments...</div>
          ) : (
            <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar">
              {comments.map((comment) => {
                const isOwnComment = user?.username === comment.doctorName;
                
                return (
                  <div key={comment.commentId} className="flex space-x-3">
                    <div className="flex-shrink-0 pt-1">
                      {comment.doctorImage ? (
                        <img 
                          src={`${API_BASE}/${comment.doctorImage}`} 
                          alt={comment.doctorName} 
                          className="w-8 h-8 rounded-full object-cover border border-gray-200" 
                        />
                      ) : (
                        <div className="flex items-center justify-center w-8 h-8 text-white rounded-full bg-gray-100 border border-gray-200">
                          <span className="text-xs font-bold text-gray-400">{comment.doctorName?.charAt(0) || 'D'}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm relative group">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-xs font-bold text-gray-900">{comment.doctorName}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] text-gray-400">{formatDate(comment.createdAt)}</span>
                          {isOwnComment && (
                            <button
                              onClick={() => handleDeleteComment(comment.commentId)}
                              className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <FaTrash className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed font-medium mb-1">{comment.specialization}</p>
                      <p className="text-sm text-gray-800 leading-relaxed">{comment.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;
