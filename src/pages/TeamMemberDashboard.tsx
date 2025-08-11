import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Plus } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";
import { hasRole } from "@/utils/auth";
import API from "@/lib/api"; // Axios wrapper

interface Message {
  id: number;
  sender: {
    id: number;
    name: string;
    email: string;
  };
  subject: string | null;
  content: string;
  created_at: string;
}

export const TeamMemberDashboard = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await API.get("/api/messages/inbox");
        setMessages(response.data);
      } catch (error) {
        toast.error("Failed to load messages.");
        console.error(error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 mt-[80px]">
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold mb-6 text-gradient bg-gradient-to-r from-orange-500 to-purple-600 text-transparent bg-clip-text">
              My Messages
            </h2>
            {hasRole('team_editor') && (
              <Button
                onClick={() => navigate("/admin/create-post")}
                className="flex items-center gap-2 whitespace-nowrap bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700"
              >
                <Plus className="w-4 h-4" />
                Create Post
              </Button>
            )}
          </div>

          {messages.length === 0 ? (
            <p className="text-gray-600">No messages received yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {messages.map((msg) => (
                <Card key={msg.id} className="shadow-lg hover:shadow-xl transition-all border border-purple-200">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm text-gray-500">{new Date(msg.created_at).toLocaleString()}</div>
                      <MessageCircle className="text-purple-500" />
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{msg.subject || "No Subject"}</h3>
                    <p className="text-gray-700 whitespace-pre-line mb-3">{msg.content}</p>
                    <div className="text-sm text-gray-500 mt-2">
                      From: <span className="font-medium text-purple-600">{msg.sender.name}</span> (<a className="underline" href={`mailto:${msg.sender.email}`}>{msg.sender.email}</a>)
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
