import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Post, Comment } from "./BulletinBoard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { isLoggedIn, getCurrentUser } from "@/utils/auth";

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [commentContent, setCommentContent] = useState("");
  const [adminReplies, setAdminReplies] = useState<{ [key: string]: string }>({});

  const currentUser = getCurrentUser();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/api/posts/${id}`);
        const commentsRes = await api.get(`/api/posts/${id}/comments`);

        setPost({
          ...res.data,
          id: res.data.id.toString(),
          type: res.data.post_type,
          isPinned: res.data.is_pinned,
          createdAt: new Date(res.data.created_at),
          likes: res.data.likes || 0,
          comments: commentsRes.data || [],
        });
      } catch (err) {
        console.error("Failed to load post", err);
      }
    };

    fetchPost();
  }, [id]);

  const handleLike = async () => {
    if (!isLoggedIn() || !currentUser) return (window.location.href = "/login");

    try {
      await api.post(`/api/posts/${id}/like`, {
        author: currentUser.name, // 👈 Pass author name
      });

      if (post) setPost({ ...post, likes: post.likes + 1 });
    } catch (err: any) {
      alert(err?.response?.data?.message || "You already liked this post");
    }
  };


  const handleComment = async () => {
    if (!isLoggedIn() || !currentUser) return (window.location.href = "/login");
    try {
      const res = await api.post(`/api/posts/${id}/comments`, {
        content: commentContent,
        author: currentUser.name,
      });
      setPost((prev) =>
        prev
          ? { ...prev, comments: [...prev.comments, { ...res.data, createdAt: new Date() }] }
          : prev
      );
      setCommentContent("");
    } catch {
      alert("You already commented");
    }
  };

  const handleReply = async (commentId: string) => {
    try {
      await api.post(`/api/comments/${commentId}/reply`, {
        reply: adminReplies[commentId],
      });
      alert("Reply posted");
    } catch {
      alert("Reply already given");
    }
  };

  if (!post) return <div className="text-center py-10">Loading...</div>;

  const hasCommented = post.comments.some((c) => c.author === currentUser?.name);

  return (
    <div className="bg-slate-50 min-h-screen pt-16">
      {/* Full-width image */}
      {post.image_url && (
        <div className="w-full h-64 bg-cover bg-center" style={{ backgroundImage: `url(${post.image_url})` }} />
      )}

      <div className="max-w-4xl mx-auto bg-white rounded shadow -mt-20 p-6 relative z-10">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">{post.title}</h1>
        <p className="text-sm text-slate-500 mb-4">
          By {post.author} | {post.createdAt.toDateString()}
        </p>
        <div className="prose max-w-none text-slate-700 mb-6" dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* Like Button */}
        <Button onClick={handleLike} className="mb-4">👍 Like ({post.likes})</Button>

        {/* Comment Box */}
        {!hasCommented && (
          <div className="space-y-2 mt-6">
            <Textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Leave your comment"
            />
            <Button onClick={handleComment}>Submit Comment</Button>
          </div>
        )}

        {/* Comments Section */}
        <div className="mt-10 space-y-6">
          <h2 className="text-lg font-semibold">Comments</h2>
          {post.comments.map((comment) => (
            <div key={comment.id} className="border p-4 rounded bg-slate-50">
              <p className="text-slate-800">{comment.content}</p>
              <p className="text-xs text-slate-500 mt-1">- {comment.author}</p>

              {/* Admin Reply Section */}
              {currentUser?.role === "super_admin" && !comment.reply && (
                <div className="mt-2 space-y-1">
                  <Input
                    value={adminReplies[comment.id] || ""}
                    onChange={(e) =>
                      setAdminReplies((prev) => ({ ...prev, [comment.id]: e.target.value }))
                    }
                    placeholder="Write your reply..."
                  />
                  <Button
                    size="sm"
                    onClick={() => handleReply(comment.id)}
                    className="mt-1"
                  >
                    Reply
                  </Button>
                </div>
              )}

              {comment.reply && (
                <div className="mt-3 ml-4 p-3 border-l-4 border-blue-300 bg-blue-50 rounded">
                  <p className="text-slate-700">{comment.reply}</p>
                  <p className="text-xs text-slate-500 mt-1">– Admin</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
