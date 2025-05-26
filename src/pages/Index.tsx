import React from 'react';
import AuthPage from '../components/AuthPage';
import ChatContainer from '../components/ChatContainer';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

const AppContent = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {!isAuthenticated ? (
        <AuthPage />
      ) : (
        <ChatContainer user={user} onLogout={logout} />
      )}
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
