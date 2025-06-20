import { useState, useEffect } from 'react';
import { Plus, Pin, Edit, Trash2, MessageCircle, Heart, Reply } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreatePostModal } from '../components/CreatePostModal';
import { Post } from './BulletinBoard';
import { toast } from '@/components/ui/sonner';
import api from "@/lib/api";
import { useNavigate } from "react-router-dom";


export const TeamMemberDashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalLikes: 0,
    totalComments: 0,
    totalViews: 0
  });

  const fetchPosts = async () => {
    try {
      await api.get('/sanctum/csrf-cookie');
      const response = await api.get('/api/posts');
      const fetchedPosts = response.data.map((post: any) => ({
        ...post,
        id: post.id.toString(),
        type: post.post_type,
        isPinned: post.is_pinned,
        createdAt: new Date(post.created_at),
        likes: 0,
        comments: []
      }));
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Failed to fetch posts", error);
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      await api.get('/sanctum/csrf-cookie');
      const response = await api.get('/api/stats');
      setStats({
        totalPosts: response.data.total_posts,
        totalLikes: response.data.total_likes,
        totalComments: response.data.total_comments,
        totalViews: response.data.total_views
      });
    } catch (error) {
      console.error("Failed to fetch stats", error);
      toast.error("Failed to load dashboard stats");
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchStats();
  }, []);

  const handleCreatePost = async (newPost: Omit<Post, 'id' | 'likes' | 'comments' | 'createdAt'>) => {
    try {
      await api.get('/sanctum/csrf-cookie');
      const response = await api.post('/api/posts', {
        title: newPost.title,
        content: newPost.content,
        post_type: newPost.type,
        author: newPost.author,
        is_pinned: newPost.isPinned
      }, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
      });

      const post: Post = {
        ...response.data,
        id: response.data.id.toString(),
        likes: 0,
        comments: [],
        createdAt: new Date(response.data.created_at)
      };

      setPosts(prev => [post, ...prev]);
      fetchStats();
      toast.success("Post created successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create post");
    }
  };

  const handleUpdatePost = async (updatedPost: Post) => {
    try {
      await api.get('/sanctum/csrf-cookie');
      const response = await api.put(`/api/posts/${updatedPost.id}`, {
        title: updatedPost.title,
        content: updatedPost.content,
        post_type: updatedPost.type,
        author: updatedPost.author,
        is_pinned: updatedPost.isPinned
      });

      const updated = {
        ...response.data,
        id: response.data.id.toString(),
        type: response.data.post_type,
        isPinned: response.data.is_pinned,
        createdAt: new Date(response.data.created_at),
        likes: 0,
        comments: []
      };

      setPosts(prev => prev.map(p => p.id === updated.id ? updated : p));
      setEditingPost(null);
      toast.success("Post updated");
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Failed to update post");
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await api.get('/sanctum/csrf-cookie');
      await api.delete(`/api/posts/${postId}`);
      setPosts(prev => prev.filter(p => p.id !== postId));
      fetchStats();
      toast.success("Post deleted");
    } catch (error) {
      console.error("Failed to delete post", error);
      toast.error("Failed to delete post");
    }
  };

  const handleTogglePin = async (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const pinnedCount = posts.filter(p => p.isPinned).length;
    if (!post.isPinned && pinnedCount >= 3) {
      alert('Maximum 3 posts can be pinned at once');
      return;
    }

    const updatedPost = {
      title: post.title,
      content: post.content,
      post_type: post.type,
      author: post.author,
      is_pinned: !post.isPinned
    };

    try {
      await api.put(`/api/posts/${postId}`, updatedPost, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
      });

      setPosts(prev =>
        prev.map(p =>
          p.id === postId ? { ...p, isPinned: !p.isPinned } : p
        )
      );
    } catch (err) {
      console.error("Failed to toggle pin", err);
    }
  };

  if (loading) {
    return <p className="text-center py-10 text-slate-500">Loading posts...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 mt-[80px]">
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          TEAM MEMBER DASHBOARD
        </div>
      </main>
    </div>
  );
};
