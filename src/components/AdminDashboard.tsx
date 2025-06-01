
import { useState } from 'react';
import { Plus, Pin, Edit, Trash2, MessageCircle, Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreatePostModal } from './CreatePostModal';
import { Post } from './BulletinBoard';

const mockStats = {
  totalPosts: 12,
  totalLikes: 156,
  totalComments: 43,
  totalViews: 2847
};

const mockPosts: Post[] = [
  {
    id: '1',
    title: '🎉 Company Annual Event 2024',
    content: 'Join us for our biggest celebration of the year!',
    type: 'event',
    isPinned: true,
    likes: 24,
    comments: [
      {
        id: '1',
        content: 'Can\'t wait!',
        author: 'Sarah Chen',
        likes: 5,
        createdAt: new Date('2024-01-15')
      }
    ],
    createdAt: new Date('2024-01-10'),
    author: 'Events Team'
  },
  {
    id: '2',
    title: '📢 New Security Protocols',
    content: 'Important updates to our security guidelines.',
    type: 'blog',
    isPinned: true,
    likes: 15,
    comments: [],
    createdAt: new Date('2024-01-08'),
    author: 'IT Security'
  }
];

export const AdminDashboard = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreatePost = (newPost: Omit<Post, 'id' | 'likes' | 'comments' | 'createdAt'>) => {
    const post: Post = {
      ...newPost,
      id: Date.now().toString(),
      likes: 0,
      comments: [],
      createdAt: new Date()
    };
    setPosts(prev => [post, ...prev]);
  };

  const handleTogglePin = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        // Check if we're trying to pin and already have 3 pinned posts
        const pinnedCount = prev.filter(p => p.isPinned).length;
        if (!post.isPinned && pinnedCount >= 3) {
          alert('Maximum 3 posts can be pinned at once');
          return post;
        }
        return { ...post, isPinned: !post.isPinned };
      }
      return post;
    }));
  };

  const handleDeletePost = (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setPosts(prev => prev.filter(post => post.id !== postId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{mockStats.totalPosts}</div>
            <div className="text-sm text-slate-600">Total Posts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-500">{mockStats.totalLikes}</div>
            <div className="text-sm text-slate-600">Total Likes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{mockStats.totalComments}</div>
            <div className="text-sm text-slate-600">Total Comments</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{mockStats.totalViews}</div>
            <div className="text-sm text-slate-600">Total Views</div>
          </CardContent>
        </Card>
      </div>

      {/* Posts Management */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.map(post => (
              <div key={post.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-slate-800">{post.title}</h3>
                    <Badge variant={post.type === 'event' ? 'default' : 'secondary'}>
                      {post.type}
                    </Badge>
                    {post.isPinned && (
                      <Pin className="w-4 h-4 text-blue-600" fill="currentColor" />
                    )}
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-1">{post.content}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {post.comments.length}
                    </span>
                    <span>By {post.author}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleTogglePin(post.id)}
                    className={post.isPinned ? 'text-blue-600' : 'text-slate-600'}
                  >
                    <Pin className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-600">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeletePost(post.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create Post Modal */}
      {showCreateModal && (
        <CreatePostModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreatePost}
        />
      )}
    </div>
  );
};
