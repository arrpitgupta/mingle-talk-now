
import React, { useState } from 'react';
import ChatSidebar from './ChatSidebar';
import MessageArea from './MessageArea';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

const ChatContainer = ({ user, onLogout }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);

  // Mock chat rooms
  const chatRooms = [
    { id: 1, name: 'General', lastMessage: 'Hey everyone!', timestamp: '2:30 PM', unread: 2 },
    { id: 2, name: 'Tech Talk', lastMessage: 'React is awesome', timestamp: '1:45 PM', unread: 0 },
    { id: 3, name: 'Random', lastMessage: 'Good morning!', timestamp: '9:15 AM', unread: 5 },
  ];

  const handleSendMessage = (messageText) => {
    if (messageText.trim() && selectedChat) {
      const newMessage = {
        id: Date.now(),
        text: messageText,
        user: user.username,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };
      setMessages([...messages, newMessage]);
    }
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <MessageCircle className="h-6 w-6 text-purple-400" />
            <h1 className="text-xl font-bold text-white">MingleTalk</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-300">Welcome, {user.username}</span>
            <Button 
              onClick={onLogout}
              variant="outline" 
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex w-full pt-20">
        <ChatSidebar 
          chatRooms={chatRooms}
          selectedChat={selectedChat}
          onSelectChat={setSelectedChat}
          currentUser={user}
        />
        <MessageArea 
          selectedChat={selectedChat}
          messages={messages}
          onSendMessage={handleSendMessage}
          currentUser={user}
        />
      </div>
    </div>
  );
};

export default ChatContainer;
