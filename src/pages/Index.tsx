
import React, { useState } from 'react';
import AuthPage from '../components/AuthPage';
import ChatContainer from '../components/ChatContainer';

const Index = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {!isAuthenticated ? (
        <AuthPage onLogin={handleLogin} />
      ) : (
        <ChatContainer user={user} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Index;
