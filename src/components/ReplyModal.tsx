import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Post } from '../pages/BulletinBoard';
import api from "@/lib/api";

export function ReplyModal(
  {
  post,
  onClose,
  onReply,
}: {
  post: Post;
  onClose: () => void;
  onReply: (commentId: string, replyText: string) => void;
}) {

  const [replies, setReplies] = useState<{ [commentId: string]: string }>({});

  const handleReply = async (commentId: string) => {
    try {
      const replyText = replies[commentId];
      await api.post(`/api/comments/${commentId}/reply`, { reply: replyText });

      // 🔄 Instantly show "Already Replied"
      onReply(commentId, replyText);

      // Optional: Clear the input
      setReplies(prev => ({ ...prev, [commentId]: "" }));
    } catch {
      alert("Already replied");
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded shadow max-w-lg w-full">
        <Dialog.Title className="text-lg font-bold mb-2">Reply to Comments</Dialog.Title>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {post.comments.map(comment => (
            <div key={comment.id} className="border p-3 rounded bg-slate-50">
              <p className="text-slate-800">{comment.content}</p>
              <p className="text-xs text-slate-500 mb-2">— {comment.author}</p>

              {comment.reply ? (
                <p className="text-green-700 text-sm">✅ Already Replied</p>
              ) : (
                <>
                  <Input
                    placeholder="Type reply..."
                    value={replies[comment.id] || ""}
                    onChange={(e) => setReplies(prev => ({ ...prev, [comment.id]: e.target.value }))}
                  />
                  <Button size="sm" onClick={() => handleReply(comment.id)} className="mt-1">
                    Send Reply
                  </Button>
                </>
              )}
            </div>
          ))}
        </div>
        <Button variant="outline" className="mt-4" onClick={onClose}>Close</Button>
      </div>
    </Dialog>
  );
}
