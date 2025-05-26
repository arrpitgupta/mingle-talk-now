import React, { useState, useEffect } from 'react';
import ChatSidebar from './ChatSidebar';
import MessageArea from './MessageArea';
import ProfileSection from './ProfileSection';
import UserList from './UserList';
import { Button } from '@/components/ui/button';
import { MessageCircle, Menu, X } from 'lucide-react';
import { socketService } from '@/lib/socket';
import { ChatMessage } from '@/lib/types';
import { User } from '@/services/users';

interface Chat {
  id: string;
  name: string;
  type: 'private' | 'group';
  lastMessage?: string;
  timestamp?: string;
  unread?: number;
}

interface Message {
  id: number;
  text: string;
  user: string;
  timestamp: string;
  isOwn: boolean;
}

const ChatContainer = ({ user: initialUser, onLogout }) => {
  const [user, setUser] = useState<User>(initialUser);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatRooms, setChatRooms] = useState<Chat[]>([]);

  // Connect to socket when component mounts
  useEffect(() => {
    socketService.connect();

    // Initialize chat rooms
    const initialChatRooms: Chat[] = [
      {
        id: 'general',
        name: 'General',
        type: 'group',
        lastMessage: 'Welcome to the general chat!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
    setChatRooms(initialChatRooms);

    // Cleanup on unmount
    return () => {
      socketService.disconnect();
    };
  }, []);

  // Handle incoming messages
  useEffect(() => {
    const handleNewMessage = (message: ChatMessage) => {
      if (message.roomId === selectedChat?.id) {
        const newMessage = {
          id: Date.now(),
          text: message.content,
          user: message.sender,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwn: message.sender === user.username
        };
        setMessages(prev => [...prev, newMessage]);

        // Update chat room's last message
        setChatRooms(prev => prev.map(room => 
          room.id === message.roomId 
            ? { ...room, lastMessage: message.content, timestamp: newMessage.timestamp }
            : room
        ));
      }
    };

    const handlePrivateMessage = (message: ChatMessage) => {
      if (message.roomId === selectedChat?.id) {
        const newMessage = {
          id: Date.now(),
          text: message.content,
          user: message.sender,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwn: message.sender === user.username
        };
        setMessages(prev => [...prev, newMessage]);

        // Update chat room's last message
        setChatRooms(prev => prev.map(room => 
          room.id === message.roomId 
            ? { ...room, lastMessage: message.content, timestamp: newMessage.timestamp }
            : room
        ));
      }
    };

    socketService.onMessage(handleNewMessage);
    socketService.onPrivateMessage(handlePrivateMessage);

    return () => {
      socketService.offMessage(handleNewMessage);
      socketService.offPrivateMessage(handlePrivateMessage);
    };
  }, [selectedChat, user.username]);

  // Join room when chat is selected
  useEffect(() => {
    if (selectedChat) {
      socketService.joinRoom(selectedChat.id);
      // Clear messages when switching chats
      setMessages([]);
    }
  }, [selectedChat]);

  const handleSendMessage = (messageText) => {
    if (messageText.trim() && selectedChat) {
      const newMessage = {
        id: Date.now(),
        text: messageText,
        user: user.username,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };
      setMessages(prev => [...prev, newMessage]);

      // Update chat room's last message
      setChatRooms(prev => prev.map(room => 
        room.id === selectedChat.id 
          ? { ...room, lastMessage: messageText, timestamp: newMessage.timestamp }
          : room
      ));

      // Send message through socket
      if (selectedChat.type === 'private') {
        socketService.sendPrivateMessage({
          roomId: selectedChat.id,
          sender: user.username,
          content: messageText
        });
      } else {
        socketService.sendMessage({
          roomId: selectedChat.id,
          sender: user.username,
          content: messageText
        });
      }
    }
  };

  const handleUpdateProfile = (profileData) => {
    setUser(profileData);
  };

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat);
    setSidebarOpen(false);
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
        <div className="h-full flex flex-col">
          <UserList 
            currentUser={user}
            onSelectChat={handleSelectChat}
          />
          <ChatSidebar 
            chatRooms={chatRooms}
            selectedChat={selectedChat}
            onSelectChat={handleSelectChat}
            currentUser={user}
            onOpenProfile={() => setShowProfile(true)}
          />
        </div>
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
