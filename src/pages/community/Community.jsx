import React, { useState, useEffect } from 'react';
import CreatePost from '../../components/community/CreatePost';
import PostCard from '../../components/community/PostCard';
import { FaSearch, FaUsers, FaHashtag, FaChartLine, FaBolt } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import communityService from '../../services/communityService';
import toast from 'react-hot-toast';

const Community = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check authentication
  useEffect(() => {
    if (!isLoggedIn) {
      toast.error('Please login to access the community');
      navigate('/login');
      return;
    }

    // Check if user is a doctor
    if (user?.role !== 'Doctor') {
      toast.error('Community access is only available for doctors');
      navigate('/');
      return;
    }
  }, [isLoggedIn, user, navigate]);

  // Fetch posts
  useEffect(() => {
    if (isLoggedIn && user?.role === 'Doctor') {
      fetchPosts();
    }
  }, [isLoggedIn, user]);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await communityService.getAllPosts();
      
      if (response.succeeded && response.data) {
        setPosts(response.data);
      } else {
        setError(response.message || 'Failed to load posts');
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = () => {
    // Refresh posts after creating a new one
    fetchPosts();
  };

  const handlePostDeleted = (postId) => {
    // Remove deleted post from the list
    setPosts(posts.filter(p => p.postId !== postId));
  };

  if (!isLoggedIn || user?.role !== 'Doctor') {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar - Navigation & Profile (Visible on LG) */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full border-4 border-primary/10 p-1 mb-4 group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
                    {user?.username?.charAt(0)?.toUpperCase() || 'D'}
                  </div>
                </div>
                <h2 className="text-lg font-bold text-gray-900">{user?.username || 'Doctor'}</h2>
                <p className="text-sm text-gray-500 font-medium">{user?.role || 'Doctor'}</p>
                
                <div className="w-full mt-6 pt-6 border-t border-gray-50 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Posts</span>
                    <span className="text-primary font-bold">{posts.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Connections</span>
                    <span className="text-primary font-bold">482</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-4 px-2">Community Explorer</h3>
              <nav className="space-y-1">
                <a href="#" className="flex items-center space-x-3 px-4 py-3 bg-primary/5 text-primary rounded-xl font-medium">
                  <FaUsers className="w-4 h-4" />
                  <span>Medical Feed</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
                  <FaHashtag className="w-4 h-4" />
                  <span>Trending Topics</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
                  <FaBolt className="w-4 h-4" />
                  <span>Research Hub</span>
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content - Feed */}
          <div className="lg:col-span-6 space-y-6">
            {/* Header / Search (Mobile friendly) */}
            <div className="lg:hidden flex items-center justify-between mb-4">
               <h1 className="text-2xl font-bold text-gray-900">Community</h1>
               <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                 <FaUsers />
               </div>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400 w-4 h-4" />
              </div>
              <input 
                type="text" 
                placeholder="Search cases, doctors, or topics..." 
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 shadow-sm rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>

            <CreatePost onPostCreated={handlePostCreated} />

            {/* Posts Loading/Error/Empty States */}
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="mt-4 text-gray-600">Loading posts...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                <p className="text-red-600 mb-4">{error}</p>
                <button 
                  onClick={fetchPosts}
                  className="px-6 py-2 bg-primary text-white rounded-xl hover:bg-primaryHover transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                <FaUsers className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No posts yet</h3>
                <p className="text-gray-600">Be the first to share something with the community!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map(post => (
                  <PostCard 
                    key={post.postId} 
                    post={post} 
                    onPostDeleted={handlePostDeleted}
                    onPostUpdated={fetchPosts}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar - Suggestions & News */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
               <div className="flex items-center justify-between mb-6">
                 <h3 className="text-base font-bold text-gray-900">Trending Now</h3>
                 <FaChartLine className="text-primary w-4 h-4" />
               </div>
               <div className="space-y-5">
                 {[
                   { tag: "#HashimotosInsights", posts: "24 posts today" },
                   { tag: "#ThyroidAI", posts: "115 posts this week" },
                   { tag: "#MinimallyInvasive", posts: "42 posts today" }
                 ].map((trend, i) => (
                   <div key={i} className="group cursor-pointer">
                     <p className="text-sm font-bold text-gray-800 group-hover:text-primary transition-colors">{trend.tag}</p>
                     <p className="text-xs text-gray-500 mt-0.5">{trend.posts}</p>
                   </div>
                 ))}
               </div>
               <button className="w-full mt-6 py-2.5 text-sm font-bold text-primary border border-primary/20 rounded-xl hover:bg-primary/5 transition-colors">
                 Show more
               </button>
            </div>

            <div className="bg-primary/5 rounded-2xl border border-primary/10 shadow-sm p-6">
               <h3 className="text-base font-bold text-primary mb-2">Connect with Experts</h3>
               <p className="text-sm text-gray-600 mb-6">Join specialized groups and collaborate with doctors worldwide.</p>
               <button className="w-full py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primaryHover transition-all transform hover:-translate-y-0.5 shadow-lg shadow-primary/20">
                 Explore Groups
               </button>
            </div>
            
            <div className="px-4 py-2 flex flex-wrap gap-x-4 gap-y-2">
              <span className="text-xs text-gray-400 hover:underline cursor-pointer">Privacy</span>
              <span className="text-xs text-gray-400 hover:underline cursor-pointer">Terms</span>
              <span className="text-xs text-gray-400 hover:underline cursor-pointer">Advertising</span>
              <span className="text-xs text-gray-400 hover:underline cursor-pointer">© 2025 THYROCAREX</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Community;
