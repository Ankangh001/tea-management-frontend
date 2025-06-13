import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Post } from './BulletinBoard';

interface CreatePostModalProps {
  onClose: () => void;
  onSubmit: (
    post: Omit<Post, 'id' | 'likes' | 'comments' | 'createdAt'> | Post
  ) => void;
  initialData?: Post;
}

export const CreatePostModal = ({
  onClose,
  onSubmit,
  initialData,
}: CreatePostModalProps) => {
  const isEditMode = !!initialData;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<'event' | 'blog' | 'news'>('blog');
  const [isPinned, setIsPinned] = useState(false);
  const [author, setAuthor] = useState('Admin');

  // Pre-fill data in edit mode
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
      setType(initialData.type);
      setIsPinned(initialData.isPinned);
      setAuthor(initialData.author);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const postData = {
      title,
      content,
      type,
      isPinned,
      author,
    };

    // If editing, include post ID
    if (isEditMode && initialData) {
      onSubmit({ ...initialData, ...postData });
    } else {
      onSubmit(postData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {isEditMode ? 'Edit Post' : 'Create New Post'}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content..."
                className="min-h-[120px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Post Type</Label>
              <RadioGroup
                value={type}
                onValueChange={(value: 'event' | 'blog' | 'news') => setType(value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="blog" id="blog" />
                  <Label htmlFor="blog">Blog Post</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="event" id="event" />
                  <Label htmlFor="event">Event</Label>
                </div>
                  <div className="flex items-center space-x-2">
                  <RadioGroupItem value="news" id="news" />
                  <Label htmlFor="news">News</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author name..."
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="pinned"
                checked={isPinned}
                onCheckedChange={setIsPinned}
              />
              <Label htmlFor="pinned">Pin this post</Label>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                {isEditMode ? 'Update Post' : 'Create Post'}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
