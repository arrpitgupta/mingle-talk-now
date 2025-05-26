
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle } from 'lucide-react';

const AuthPage = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    // For now, simulate login - will connect to backend later
    if (loginData.email && loginData.password) {
      onLogin({ 
        id: Date.now(), 
        username: loginData.email.split('@')[0], 
        email: loginData.email 
      });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // For now, simulate registration - will connect to backend later
    if (registerData.username && registerData.email && registerData.password) {
      onLogin({ 
        id: Date.now(), 
        username: registerData.username, 
        email: registerData.email 
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-2 text-white">
            <MessageCircle className="h-8 w-8" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              MingleTalk
            </h1>
          </div>
        </div>

        <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white text-center">Welcome</CardTitle>
            <CardDescription className="text-gray-300 text-center">
              Connect and chat with people around the world
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/10">
                <TabsTrigger value="login" className="text-white data-[state=active]:bg-white/20">
                  Login
                </TabsTrigger>
                <TabsTrigger value="register" className="text-white data-[state=active]:bg-white/20">
                  Register
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                  >
                    Login
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Username"
                    value={registerData.username}
                    onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 transition-all duration-300"
                  >
                    Register
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
