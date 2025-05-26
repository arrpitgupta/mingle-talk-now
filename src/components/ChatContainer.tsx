
import React, { useState } from 'react';
import ChatSidebar from './ChatSidebar';
import MessageArea from './MessageArea';
import ProfileSection from './ProfileSection';
import { Button } from '@/components/ui/button';
import { MessageCircle, Menu, X } from 'lucide-react';

const ChatContainer = ({ user: initialUser, onLogout }) => {
  const [user, setUser] = useState(initialUser);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock chat rooms
  const chatRooms = [
    { id: 1, name: 'General', lastMessage: 'Hey everyone!', timestamp: '2:30 PM', unread: 2 },
    { id: 2, name: 'Tech Talk', lastMessage: 'React is awesome', timestamp: '1:45 PM', unread: 0 },
    { id: 3, name: 'Random', lastMessage: 'Good morning!', timestamp: '9:15 AM', unread: 5 },
    { id: 4, name: 'Design', lastMessage: 'New mockups ready', timestamp: 'Yesterday', unread: 1 },
    { id: 5, name: 'Gaming', lastMessage: 'Anyone up for a match?', timestamp: 'Yesterday', unread: 3 },
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

  const handleUpdateProfile = (profileData) => {
    setUser(profileData);
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-white hover:bg-white/10"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <MessageCircle className="h-6 w-6 text-purple-400" />
            <h1 className="text-lg lg:text-xl font-bold text-white">MingleTalk</h1>
          </div>
          <div className="flex items-center space-x-2 lg:space-x-4">
            <span className="hidden sm:block text-sm text-gray-300">Welcome, {user.username}</span>
            <Button 
              onClick={onLogout}
              variant="outline" 
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs lg:text-sm"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed lg:relative z-50 lg:z-10
        transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        transition-transform duration-300 ease-in-out
        w-80 lg:w-80 h-full
      `}>
        <ChatSidebar 
          chatRooms={chatRooms}
          selectedChat={selectedChat}
          onSelectChat={(chat) => {
            setSelectedChat(chat);
            setSidebarOpen(false); // Close sidebar on mobile when chat is selected
          }}
          currentUser={user}
          onOpenProfile={() => setShowProfile(true)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col pt-16 lg:pt-20">
        <MessageArea 
          selectedChat={selectedChat}
          messages={messages}
          onSendMessage={handleSendMessage}
          currentUser={user}
        />
      </div>

      {/* Profile Section Modal */}
      {showProfile && (
        <ProfileSection
          user={user}
          onUpdateProfile={handleUpdateProfile}
          onClose={() => setShowProfile(false)}
        />
      )}
    </div>
  );
};

export default ChatContainer;
