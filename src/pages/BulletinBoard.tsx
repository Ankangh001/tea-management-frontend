
import { useState, useEffect } from 'react';
import { PostCard } from '../components/PostCard';
import { PostModal } from '../components/PostModal';
import { Pin, Calendar, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isLoggedIn, getCurrentUser } from "@/utils/auth";
import api from "@/lib/api";

export interface Post {
  id: string;
  title: string;
  content: string;
  post_type: string;
  author: string;
  isPinned: boolean;
  type: string;
  createdAt: Date;
  likes: number;
  image?: string;      // actual image file path
  image_url?: string;  // this is appended by Laravel and used for display
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  likes: number;
  createdAt: Date;
}


const BulletinBoard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [filter, setFilter] = useState<'all' | 'event' | 'blog' | 'news'>('all');

  const pinnedPosts = posts.filter(post => post.isPinned);
  const regularPosts = posts.filter(post => !post.isPinned);
  
  const filteredPosts = filter === 'all' 
    ? regularPosts 
    : regularPosts.filter(post => post.type === filter);

  const handleLike = async (postId: string) => {
    if (!isLoggedIn()) {
      window.location.href = "/login";
      return;
    }

    try {
      await api.post(
        `/api/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );

      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      );
    } catch (err) {
      console.error("Failed to like post", err);
    }
  };

  const handleComment = async (postId: string, content: string) => {
    if (!isLoggedIn()) {
      window.location.href = "/login";
      return;
    }

    const user = getCurrentUser();

    try {
      const response = await api.post(
        `/api/posts/${postId}/comments`,
        {
          content,
          author: user?.name || "Anonymous",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );

      const newComment: Comment = {
        ...response.data,
        createdAt: new Date(response.data.created_at),
      };

      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? { ...post, comments: [...post.comments, newComment] }
            : post
        )
      );
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/api/posts");
        const rawPosts = response.data;

        const postsWithComments = await Promise.all(
          rawPosts.map(async (post: any) => {
            const commentsRes = await api.get(`/api/posts/${post.id}/comments`);
            return {
              ...post,
              id: post.id.toString(),
              type: post.post_type,
              isPinned: post.is_pinned,
              createdAt: new Date(post.created_at),
              likes: post.likes || 0,
              comments: commentsRes.data || [],
            };
          })
        );

        setPosts(postsWithComments);
      } catch (err) {
        console.error("Failed to load posts/comments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p className="text-center text-slate-500 py-8">Loading posts...</p>;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 mt-[80px]">
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Filter Tabs */}
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className="flex items-center gap-2"
            >
              All Posts
            </Button>
            <Button
              variant={filter === 'event' ? 'default' : 'outline'}
              onClick={() => setFilter('event')}
              className="flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Events
            </Button>
            <Button
              variant={filter === 'blog' ? 'default' : 'outline'}
              onClick={() => setFilter('blog')}
              className="flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Blog Posts
            </Button>
            <Button
              variant={filter === 'news' ? 'default' : 'outline'}
              onClick={() => setFilter('news')}
              className="flex items-center gap-2"
            >
            📰 News
            </Button>
          </div>

          {/* Pinned Posts */}
          {pinnedPosts.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Pin className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-slate-800">Pinned Posts</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {pinnedPosts.map(post => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onLike={handleLike}
                    onClick={() => setSelectedPost(post)}
                    isPinned
                  />
                ))}
              </div>
            </div>
          )}

          {/* Regular Posts */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-800">Latest Updates</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  onClick={() => setSelectedPost(post)}
                />
              ))}
            </div>
          </div>

          {/* Post Modal */}
          {selectedPost && (
            <PostModal
              post={selectedPost}
              onClose={() => setSelectedPost(null)}
              onLike={handleLike}
              onComment={handleComment}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default BulletinBoard;