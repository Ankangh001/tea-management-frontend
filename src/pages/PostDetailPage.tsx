import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Post } from "./BulletinBoard";
import { isLoggedIn, getCurrentUser } from "@/utils/auth";
import { Button } from '@/components/ui/button';

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [liked, setLiked] = useState(false);
  const [commented, setCommented] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleLike = async () => {
    if (!isLoggedIn()) return (window.location.href = "/login");

    try {
      await api.post(`/api/posts/${id}/like`);
      setPost((prev) => prev && { ...prev, likes: prev.likes + 1 });
      setLiked(true);
    } catch {
      toast.error("Failed to like");
    }
  };

  const handleComment = async () => {
    if (!isLoggedIn()) return (window.location.href = "/login");

    try {
      const res = await api.post(`/api/posts/${id}/comments`, { content: newComment });
      setPost((prev) => prev && { ...prev, comments: [...prev.comments, res.data] });
      setCommented(true);
      setNewComment("");
    } catch (err) {
      toast.error(err.response?.data?.error || "Comment failed");
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/api/posts/${id}`);
        setPost({
          ...res.data,
          id: res.data.id.toString(),
          type: res.data.post_type,
          isPinned: res.data.is_pinned,
          createdAt: new Date(res.data.created_at),
          likes: res.data.likes || 0,
          comments: [],
        });
      } catch (err) {
        console.error("Failed to load post");
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="w-full mt-[80px]">
      {/* Full-width header image */}
      {post.image_url && (
        <div className="w-full h-[400px] overflow-hidden">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Body with off-white background */}
      <div className="bg-[#f9fafb] min-h-screen py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white shadow-md p-6 rounded-lg">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">{post.title}</h1>
          <p className="text-sm text-slate-500 mb-4">
            By {post.author} | {post.createdAt.toDateString()}
          </p>
          <div
            className="text-slate-700 leading-relaxed prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>


      <div className="bg-[#f9fafb] min-h-screen py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white shadow-md p-6 rounded-lg">
          {/* Like Button */}
          <Button className="flex items-center gap-2" onClick={handleLike} disabled={liked}>
            ❤️ Like ({post.likes})
          </Button>

          {/* Comment Input */}
          {!commented ? (
            <div className="mt-6">
              <textarea
                placeholder="Leave a comment"
                className="w-full border p-2 rounded"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button onClick={handleComment} className="mt-2">Submit Comment</Button>
            </div>
          ) : (
            <p className="mt-4 text-green-700">You’ve already commented on this post.</p>
          )}

          {/* Comments List */}
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold">Comments</h3>
            {post.comments.map((c, idx) => (
              <div key={idx} className="p-3 border rounded bg-slate-50">
                <p className="font-medium">{c.author}</p>
                <p>{c.content}</p>
                {c.reply && (
                  <div className="mt-2 p-2 bg-blue-100 rounded">
                    <p className="text-sm text-blue-700">Admin Reply: {c.reply}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
