import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onLogin: () => void;
  onRegister: () => void;
}

const Navbar = ({ onLogin, onRegister }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate navbar on mount
    gsap.fromTo('.navbar', 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
    );

    // Animate logo and buttons
    gsap.fromTo('.nav-item', 
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3, ease: 'power2.out' }
    );
  }, []);

  return (
    <nav className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="nav-item flex items-center space-x-3 group">
            <div className="relative">
              <MessageCircle className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
            </div>
            <span className="text-2xl font-bold text-gradient">
              Mingle Talk
            </span>
          </Link>

          {/* Navigation Items */}
          {/* <div className="hidden md:flex items-center space-x-8">
            <Link to="#features" className="nav-item text-foreground/80 hover:text-primary transition-colors duration-300">
              Features
            </Link>
            <Link to="#about" className="nav-item text-foreground/80 hover:text-primary transition-colors duration-300">
              About
            </Link>
            <Link to="#contact" className="nav-item text-foreground/80 hover:text-primary transition-colors duration-300">
              Contact
            </Link>
          </div> */}

          {/* Auth Buttons */}
          <div className="nav-item flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={onLogin}
              className="hover:bg-primary/10 hover:text-primary transition-all duration-300"
            >
              Login
            </Button>
            <Button 
              onClick={onRegister}
              className="bg-gradient-primary text-primary-foreground hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;