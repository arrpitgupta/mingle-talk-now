import React, { useState, useEffect } from 'react';
import { User } from '@/services/users';
import { getOnlineUsers } from '@/services/users';
import { socketService } from '@/lib/socket';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User as UserIcon } from 'lucide-react';

interface UserListProps {
  currentUser: User;
  onSelectChat: (chat: { id: string; name: string; type: 'private' }) => void;
}

const UserList: React.FC<UserListProps> = ({ currentUser, onSelectChat }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const onlineUsers = await getOnlineUsers();
        setUsers(onlineUsers.filter((user: User) => user.id !== currentUser.id));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();

    // Listen for online/offline events
    socketService.onUserOnline((userId) => {
      setUsers(prev => {
        if (!prev.find(u => u.id === userId)) {
          return [...prev, { id: userId, username: 'New User', email: '' }];
        }
        return prev;
      });
    });

    socketService.onUserOffline((userId) => {
      setUsers(prev => prev.filter(u => u.id !== userId));
    });

    return () => {
      socketService.offUserOnline(() => {});
      socketService.offUserOffline(() => {});
    };
  }, [currentUser.id]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-white mb-4">Online Users</h2>
      <div className="space-y-2">
        {users.map((user) => (
          <Button
            key={user.id}
            variant="ghost"
            className="w-full justify-start space-x-2 text-white hover:bg-white/10"
            onClick={() => onSelectChat({ id: user.id, name: user.username, type: 'private' })}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>
                <UserIcon className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <span>{user.username}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default UserList; 