
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
  onMessageClick: (member: TeamMember) => void;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, onMessageClick }) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <CardContent className="p-6 text-center">
        <div className="mb-4">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-20 h-20 rounded-full mx-auto object-cover ring-2 ring-blue-100 group-hover:ring-blue-200 transition-colors"
          />
        </div>
        <h3 className="font-semibold text-lg text-gray-900 mb-1">{member.name}</h3>
        <p className="text-gray-600 mb-4">{member.role}</p>
        <Button
          onClick={() => onMessageClick(member)}
          className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
          size="sm"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Message Me
        </Button>
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
