
import { useState, useEffect } from 'react';
import { PostCard } from './PostCard';
import { PostModal } from './PostModal';
import { Pin, Calendar, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface Post {
  id: string;
  title: string;
  content: string;
  type: 'event' | 'blog' | 'news';
  isPinned: boolean;
  likes: number;
  comments: Comment[];
  createdAt: Date;
  author: string;
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  likes: number;
  createdAt: Date;
}

const mockPosts: Post[] = [
  {
    id: '1',
    title: '🎉 Company Annual Event 2024',
    content: 'Join us for our biggest celebration of the year! Mark your calendars for December 15th. We\'ll have team presentations, awards ceremony, and networking dinner.',
    type: 'event',
    isPinned: true,
    likes: 24,
    comments: [
      {
        id: '1',
        content: 'Can\'t wait! Will there be live streaming for remote employees?',
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
    content: 'Important updates to our security guidelines. All employees must complete the new security training by January 30th.',
    type: 'blog',
    isPinned: true,
    likes: 15,
    comments: [],
    createdAt: new Date('2024-01-08'),
    author: 'IT Security'
  },
  {
    id: '3',
    title: '🚀 Product Launch Success',
    content: 'Our latest product exceeded expectations with 150% of projected sales in the first week! Thank you to everyone who made this possible.',
    type: 'blog',
    isPinned: false,
    likes: 43,
    comments: [
      {
        id: '2',
        content: 'Amazing work team! The marketing campaign was spot on.',
        author: 'Mike Johnson',
        likes: 8,
        createdAt: new Date('2024-01-05')
      },
      {
        id: '3',
        content: 'Proud to be part of this success story!',
        author: 'Lisa Wong',
        likes: 3,
        createdAt: new Date('2024-01-06')
      }
    ],
    createdAt: new Date('2024-01-05'),
    author: 'Product Team'
  }
];

export const BulletinBoard = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [filter, setFilter] = useState<'all' | 'event' | 'blog'>('all');

  const pinnedPosts = posts.filter(post => post.isPinned);
  const regularPosts = posts.filter(post => !post.isPinned);
  
  const filteredPosts = filter === 'all' 
    ? regularPosts 
    : regularPosts.filter(post => post.type === filter);

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handleComment = (postId: string, content: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      content,
      author: 'Current User',
      likes: 0,
      createdAt: new Date()
    };

    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    ));
  };

  return (
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
  );
};
