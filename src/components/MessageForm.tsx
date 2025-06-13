
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MessageFormProps {
  recipientName: string;
  onClose: () => void;
}

const MessageForm: React.FC<MessageFormProps> = ({ recipientName, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store message in localStorage for the dashboard
    const existingMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    const newMessage = {
      id: Date.now(),
      ...formData,
      recipient: recipientName,
      timestamp: new Date().toISOString(),
      read: false
    };
    localStorage.setItem('messages', JSON.stringify([newMessage, ...existingMessages]));
    
    toast({
      title: "Message sent!",
      description: `Your message to ${recipientName} has been sent successfully.`,
    });
    
    setFormData({ name: '', email: '', message: '' });
    onClose();
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-6 animate-in slide-in-from-bottom-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl">Message {recipientName}</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <Textarea
              placeholder="Your message..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MessageForm;
