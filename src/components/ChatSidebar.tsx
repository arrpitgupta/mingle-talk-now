
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const ChatSidebar = ({ chatRooms, selectedChat, onSelectChat, currentUser }) => {
  return (
    <div className="w-80 bg-black/20 backdrop-blur-md border-r border-white/10 flex flex-col">
      {/* User Profile Section */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 ring-2 ring-purple-400/50">
            <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              {currentUser.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-white font-medium">{currentUser.username}</p>
            <p className="text-green-400 text-sm flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              Online
            </p>
          </div>
        </div>
      </div>

      {/* Chat Rooms */}
      <div className="flex-1">
        <div className="p-4">
          <h3 className="text-gray-300 text-sm font-medium mb-3">Chat Rooms</h3>
        </div>
        <ScrollArea className="flex-1">
          <div className="space-y-1 px-2">
            {chatRooms.map((room) => (
              <div
                key={room.id}
                onClick={() => onSelectChat(room)}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-white/10 ${
                  selectedChat?.id === room.id ? 'bg-purple-500/20 border border-purple-500/30' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-white font-medium"># {room.name}</h4>
                  {room.unread > 0 && (
                    <Badge className="bg-purple-500 text-white text-xs">
                      {room.unread}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-gray-400 text-sm truncate">{room.lastMessage}</p>
                  <span className="text-gray-500 text-xs">{room.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Online Users */}
      <div className="p-4 border-t border-white/10">
        <h3 className="text-gray-300 text-sm font-medium mb-3">Online Users</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-gray-300 text-sm">5 users online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
