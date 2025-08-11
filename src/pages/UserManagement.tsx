import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/sonner';

interface User {
  id: number;
  name: string;
  email: string;
  roles: { name: string }[];
}

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'team'>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await api.get(`/api/users?search=${search}`);
      setUsers(response.data);
    } catch {
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = () => fetchUsers();

  const toggleRole = async (userId: number) => {
    try {
      await api.post(`/api/users/${userId}/toggle-role`);
      fetchUsers();
    } catch {
      toast.error("Could not update role");
    }
  };

  const toggleEditorRole = async (userId: number) => {
    try {
      await api.post(`/api/users/${userId}/toggle-editor-role`);
      fetchUsers();
      toast.success("Editor role updated successfully");
    } catch {
      toast.error("Could not update editor role");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 mt-[80px]">
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex space-x-4 mb-6 border-b pb-2">
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'users' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('users')}
            >
              User Management
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'team' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('team')}
            >
              Team Members
            </button>
          </div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">User Management</h2>
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Search by email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Search</Button>
            </div>
            <div className="space-y-3">
              {users
                .filter(user => {
                  if (activeTab === 'users') {
                    return !user.roles.some(role => role.name === 'super_admin');
                  }
                  return user.roles.some(role => role.name === 'team_viewer');
                })
                .map((user) => (
                  <div key={user.id} className="flex items-center justify-between bg-white p-3 rounded shadow">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Roles: {user.roles.length > 0 ? user.roles.map(r => r.name).join(', ') : 'No roles assigned'}
                      </p>
                    </div>
                    {activeTab === 'users' && (
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Assign Team Member</span>
                          <Switch
                            checked={user.roles.some((r) => r.name === 'team_viewer')}
                            onCheckedChange={() => toggleRole(user.id)}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Allow Create Posts</span>
                          <Switch
                            checked={user.roles.some((r) => r.name === 'team_editor')}
                            onCheckedChange={() => toggleEditorRole(user.id)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
    );
};

export default UserManagement;