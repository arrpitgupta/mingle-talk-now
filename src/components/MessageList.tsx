
import React, { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const MessageList = ({ messages, currentUser }) => {
  const messagesEndRef = useRef(null);

  // Mock messages for demonstration
  const allMessages = [
    {
      id: 1,
      text: "Hey everyone! Welcome to the chat room! 👋",
      user: "Alice",
      timestamp: "2:15 PM",
      isOwn: false
    },
    {
      id: 2,
      text: "Thanks! Excited to be here",
      user: "Bob",
      timestamp: "2:16 PM",
      isOwn: false
    },
    {
      id: 3,
      text: "This chat app looks amazing! Great work on the UI 🎨",
      user: "Charlie",
      timestamp: "2:18 PM",
      isOwn: false
    },
    ...messages
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {allMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} animate-fadeInUp`}
          >
            <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {!message.isOwn && (
                <Avatar className="h-8 w-8 ring-2 ring-white/20">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-teal-500 text-white text-sm">
                    {message.user.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div className={`rounded-2xl px-4 py-2 shadow-lg ${
                message.isOwn 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                  : 'bg-white/10 backdrop-blur-md text-white border border-white/20'
              }`}>
                {!message.isOwn && (
                  <p className="text-xs text-gray-300 mb-1 font-medium">{message.user}</p>
                )}
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-1 ${message.isOwn ? 'text-purple-100' : 'text-gray-400'}`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default MessageList;
