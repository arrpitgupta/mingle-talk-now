
import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const MessageArea = ({ selectedChat, messages, onSendMessage, currentUser }) => {
  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-black/5">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">💬</span>
          </div>
          <h3 className="text-white text-xl font-medium mb-2">Welcome to MingleTalk</h3>
          <p className="text-gray-400">Select a chat room to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-black/5">
      {/* Chat Header */}
      <div className="p-4 border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">#</span>
          </div>
          <div>
            <h2 className="text-white font-semibold">{selectedChat.name}</h2>
            <p className="text-gray-400 text-sm">12 members</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <MessageList messages={messages} currentUser={currentUser} />

      {/* Message Input */}
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default MessageArea;
