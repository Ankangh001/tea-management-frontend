
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Lock, Unlock, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import TeamMemberCard from '@/components/TeamMemberCard';
import MessageForm from '@/components/MessageForm';

const Index = () => {
  const [showPublicFeatures, setShowPublicFeatures] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Product Manager',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'Senior Developer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Emily Davis',
      role: 'UX Designer',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'Alex Rodriguez',
      role: 'DevOps Engineer',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const handleMessageClick = (member: any) => {
    setSelectedMember(member);
  };

  const closeMessageForm = () => {
    setSelectedMember(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Team Member
              <span className="block text-blue-600">Management System</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Connect with our team members, manage profiles, and streamline communication 
              with our comprehensive management platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                onClick={() => setShowPublicFeatures(!showPublicFeatures)}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
                size="lg"
              >
                <Unlock className="w-6 h-6 mr-3" />
                Public Features
                {showPublicFeatures ? (
                  <ChevronUp className="w-5 h-5 ml-3" />
                ) : (
                  <ChevronDown className="w-5 h-5 ml-3" />
                )}
              </Button>

              <Link to="/post" className="w-full sm:w-auto">
                <Button
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 text-lg rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
                  size="lg"
                >
                  <Lock className="w-6 h-6 mr-3" />
                  Featured Posts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Public Features Section */}
      {showPublicFeatures && (
        <div className="py-16 bg-white/80 backdrop-blur-sm animate-in slide-in-from-top-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 mr-3 text-blue-600" />
                Meet Our Team
              </h2>
              <p className="text-lg text-gray-600">
                Get to know our amazing team members and reach out to them directly
              </p>
            </div>

            {/* Team Members Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {teamMembers.map((member) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  onMessageClick={handleMessageClick}
                />
              ))}
            </div>

            {/* Message Form */}
            {selectedMember && (
              <div className="flex justify-center">
                <MessageForm
                  recipientName={selectedMember.name}
                  onClose={closeMessageForm}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Features Overview */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-8">
                <Unlock className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Public Access</h3>
                <p className="text-gray-600 mb-4">
                  Browse team member profiles, learn about our team, and send messages without requiring an account.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• View team member profiles</li>
                  <li>• Send direct messages</li>
                  <li>• No registration required</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-50 to-gray-100">
              <CardContent className="p-8">
                <Lock className="w-12 h-12 text-gray-700 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Private Dashboard</h3>
                <p className="text-gray-600 mb-4">
                  Access advanced features including profile management, message inbox, and team administration tools.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Edit your profile</li>
                  <li>• Manage incoming messages</li>
                  <li>• Advanced team tools</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
