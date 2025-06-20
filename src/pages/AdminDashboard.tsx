import { useState, useEffect } from 'react';
import { Plus, Pin, Edit, Trash2, MessageCircle, Heart, Reply } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreatePostModal } from '../components/CreatePostModal';
import { Post } from './BulletinBoard';

import axios from 'axios';
import { toast } from '@/components/ui/sonner';
import api from "@/lib/api";

export const AdminDashboard = () => {
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
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Admin Dashboard</h2>
              <p className="text-slate-600">Manage your bulletin board content</p>
            </div>
            <Button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Post
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-blue-600">{stats.totalPosts}</div><div className="text-sm text-slate-600">Total Posts</div></CardContent></Card>
            <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-red-500">{stats.totalLikes}</div><div className="text-sm text-slate-600">Total Likes</div></CardContent></Card>
            <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-green-600">{stats.totalComments}</div><div className="text-sm text-slate-600">Total Comments</div></CardContent></Card>
            <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-purple-600">{stats.totalViews}</div><div className="text-sm text-slate-600">Total Views</div></CardContent></Card>
          </div>

          <Card>
            <CardHeader><CardTitle>Manage Posts</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {posts.length === 0 ? (
                  <p className="text-center text-slate-500">No posts yet. Create your first one!</p>
                ) : (
                  posts.map(post => (
                    <div key={post.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-slate-800">{post.title}</h3>
                          <Badge
                            variant="outline"
                            className={
                              post.type === 'news'
                                ? 'bg-yellow-100 text-yellow-800'
                                : post.type === 'blog'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'border border-gray-300 text-gray-800 bg-transparent'
                            }
                          >
                            {post.type}
                          </Badge>
                          {post.isPinned && <Pin className="w-4 h-4 text-blue-600" fill="currentColor" />}
                        </div>
                        <p className="text-sm text-slate-600 line-clamp-1">{post.content}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                          <span className="flex items-center gap-1"><Heart className="w-4 h-4" />{post.likes}</span>
                          <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" />{post.comments.length}</span>
                          <span>By {post.author}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleTogglePin(post.id)} ><Reply className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => handleTogglePin(post.id)} className={post.isPinned ? 'text-blue-600' : 'text-slate-600'}><Pin className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" className="text-slate-600" onClick={() => setEditingPost(post)}><Edit className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDeletePost(post.id)}><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {showCreateModal && !editingPost && (
            <CreatePostModal onClose={() => setShowCreateModal(false)} onSubmit={handleCreatePost} />
          )}
          {editingPost && (
            <CreatePostModal onClose={() => setEditingPost(null)} onSubmit={handleUpdatePost} initialData={editingPost} />
          )}
        </div>
      </main>
    </div>
  );
};
