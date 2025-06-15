
import { useState } from 'react';
import { Heart, MessageCircle, Calendar, BookOpen, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Post, Comment } from '../pages/BulletinBoard';

interface PostModalProps {
  post: Post;
  onClose: () => void;
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
}

export const PostModal = ({ post, onClose, onLike, onComment }: PostModalProps) => {
  const [newComment, setNewComment] = useState('');
  const TypeIcon = post.type === 'event' ? Calendar : BookOpen;

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onComment(post.id, newComment);
      setNewComment('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <TypeIcon className="w-5 h-5 text-slate-600" />
              <Badge variant={post.type === 'event' ? 'default' : 'secondary'}>
                {post.type}
              </Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-slate-800 mb-3">
            {post.title}
          </h2>

          {/* Meta */}
          <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
            <span>By {post.author}</span>
            <span>{post.createdAt.toLocaleDateString()}</span>
          </div>

          {/* Content */}
          <div className="prose prose-slate max-w-none mb-6">
            <p className="text-slate-700 whitespace-pre-wrap">
              {post.content}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pb-6 border-b">
            <Button
              variant="ghost"
              onClick={() => onLike(post.id)}
              className="flex items-center gap-2 text-slate-600 hover:text-red-500"
            >
              <Heart className="w-5 h-5" />
              {post.likes} Likes
            </Button>
            <div className="flex items-center gap-2 text-slate-600">
              <MessageCircle className="w-5 h-5" />
              {post.comments.length} Comments
            </div>
          </div>

          {/* Add Comment */}
          <div className="mt-6 space-y-3">
            <h3 className="font-semibold text-slate-800">Add a comment</h3>
            <Textarea
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[80px]"
            />
            <Button onClick={handleSubmitComment} disabled={!newComment.trim()}>
              Post Comment
            </Button>
          </div>

          {/* Comments */}
          {post.comments.length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold text-slate-800">Comments</h3>
              {post.comments.map((comment) => (
                <div key={comment.id} className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-slate-800">{comment.author}</span>
                    <span>
                      {comment?.createdAt
                        ? new Date(comment.createdAt).toLocaleDateString()
                        : 'Unknown date'}
                    </span>
                  </div>
                  <p className="text-slate-700 mb-2">{comment.content}</p>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-slate-600 hover:text-red-500">
                      <Heart className="w-4 h-4 mr-1" />
                      {comment.likes}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
