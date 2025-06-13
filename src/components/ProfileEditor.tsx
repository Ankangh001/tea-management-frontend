
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProfileEditor: React.FC = () => {
  const [profile, setProfile] = useState({
    name: '',
    role: '',
    bio: '',
    imageUrl: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      setProfile({
        name: 'John Doe',
        role: 'Team Lead',
        bio: 'Passionate about building great products and leading amazing teams.',
        imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userProfile', JSON.stringify(profile));
    toast({
      title: "Profile updated!",
      description: "Your profile has been saved successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="w-5 h-5 mr-2" />
          Profile Editor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={profile.imageUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-200"
            />
            <div className="flex-1">
              <Input
                placeholder="Profile image URL"
                value={profile.imageUrl}
                onChange={(e) => setProfile({ ...profile, imageUrl: e.target.value })}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                placeholder="Your name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Input
                placeholder="Your role"
                value={profile.role}
                onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                required
              />
            </div>
          </div>
          
          <div>
            <Textarea
              placeholder="Tell us about yourself..."
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              rows={4}
            />
          </div>
          
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            Save Profile
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileEditor;
