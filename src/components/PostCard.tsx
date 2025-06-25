
import { Calendar, BookOpen, Heart, MessageCircle, Pin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Post } from '../pages/BulletinBoard';
import { Link } from "react-router-dom";

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onClick: () => void;
  isPinned?: boolean;
}

export const PostCard = ({ post, onLike, onClick, isPinned }: PostCardProps) => {
  const typeIcon = post.type === 'event' ? Calendar : BookOpen;
  const TypeIcon = typeIcon;

  return (
    <Link to={`/posts/${post.id}`}>
      <Card 
        className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
          isPinned ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
        }`}
        onClick={onClick}
      >
        <CardHeader className="pb-3">
          <img src={post.image ? post.image : '/placeholder.webp'} alt={post.title} className="w-100 h-[150px] rounded object-cover" />
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 flex-1">
              <TypeIcon className="w-4 h-4 text-slate-600" />
              <Badge variant={post.type === 'event' ? 'default' : 'secondary'}>
                {post.type}
              </Badge>
              {isPinned && (
                <Pin className="w-4 h-4 text-blue-600" fill="currentColor" />
              )}
            </div>
          </div>
          <h3 className="font-semibold text-slate-800 line-clamp-2 leading-tight">
            {post.title}
          </h3>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-slate-600 text-sm line-clamp-3 mb-4"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>By {post.author}</span>
            <span>{post.createdAt.toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center gap-4 mt-3 pt-3 border-t">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onLike(post.id);
              }}
              className="flex items-center gap-1 text-slate-600 hover:text-red-500"
            >
              <Heart className="w-4 h-4" />
              {post.likes}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-slate-600"
            >
              <MessageCircle className="w-4 h-4" />
              {post.comments.length}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
