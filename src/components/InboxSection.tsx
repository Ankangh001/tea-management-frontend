
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Inbox, Mail, MailOpen, Clock } from 'lucide-react';

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  recipient: string;
  timestamp: string;
  read: boolean;
}

const InboxSection: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const loadMessages = () => {
      const savedMessages = localStorage.getItem('messages');
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      } else {
        // Add some dummy messages
        const dummyMessages: Message[] = [
          {
            id: 1,
            name: 'Sarah Johnson',
            email: 'sarah@example.com',
            message: 'Hi! I\'d love to discuss the upcoming project requirements. Could we schedule a meeting this week?',
            recipient: 'You',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            read: false
          },
          {
            id: 2,
            name: 'Mike Chen',
            email: 'mike@example.com',
            message: 'Great work on the presentation yesterday! The client was really impressed with our proposal.',
            recipient: 'You',
            timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
            read: true
          },
          {
            id: 3,
            name: 'Emily Davis',
            email: 'emily@example.com',
            message: 'Could you help me with the database migration? I\'m running into some issues with the connection.',
            recipient: 'You',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            read: false
          }
        ];
        setMessages(dummyMessages);
        localStorage.setItem('messages', JSON.stringify(dummyMessages));
      }
    };

    loadMessages();
  }, []);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const unreadCount = messages.filter(msg => !msg.read).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Inbox className="w-5 h-5 mr-2" />
            Your Messages
          </div>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="bg-red-500">
              {unreadCount} new
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {messages.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Inbox className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No messages yet</p>
            <p className="text-sm">Messages from the public form will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-4 rounded-lg border transition-colors ${
                  message.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {message.read ? (
                      <MailOpen className="w-4 h-4 text-gray-500" />
                    ) : (
                      <Mail className="w-4 h-4 text-blue-600" />
                    )}
                    <span className="font-medium text-gray-900">{message.name}</span>
                    <span className="text-sm text-gray-500">{message.email}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatTime(message.timestamp)}
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{message.message}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InboxSection;
