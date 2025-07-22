import { useNavigate } from 'react-router-dom';

import LandingPage from '@/components/LandingPage';
import Navbar from '@/components/Navbar';

const Landing = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/app');
  };

  const handleRegister = () => {
    navigate('/app');
  };

  const handleGetStarted = () => {
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onLogin={handleLogin} onRegister={handleRegister} />
      <LandingPage onGetStarted={handleGetStarted} />
    </div>
  );
};

export default Landing;