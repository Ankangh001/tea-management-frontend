
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Lock, Unlock, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import TeamMemberCard from '@/components/TeamMemberCard';
import MessageForm from '@/components/MessageForm';

const Index = () => {
  const [showPublicFeatures, setShowPublicFeatures] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-screen flex items-center justify-center pt-[80px]">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Team Member
            <span className="block bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Management System
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with our team members, manage profiles, and streamline communication 
            with our comprehensive management platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
