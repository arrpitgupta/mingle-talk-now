
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle } from 'lucide-react';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-3 lg:p-4 border-t border-white/10 bg-black/20 backdrop-blur-md">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2 lg:space-x-3">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-full px-3 lg:px-4 py-2 text-sm lg:text-base focus:ring-2 focus:ring-purple-500/50"
        />
        <Button 
          type="submit"
          disabled={!message.trim()}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-full p-2 lg:p-2 transition-all duration-300 flex-shrink-0"
        >
          <MessageCircle className="h-4 w-4 lg:h-5 lg:w-5" />
        </Button>
      </form>
      
      <div className="mt-2 text-center">
        <p className="text-gray-400 text-xs">Press Enter to send, Shift + Enter for new line</p>
      </div>
    </div>
  );
};

export default MessageInput;
