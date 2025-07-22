import { useEffect, useRef } from 'react';
import { MessageCircle, Users, Zap, Shield, Globe, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroImage from '@/assets/hero-chat.jpg';

gsap.registerPlugin(ScrollTrigger);

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Hero section animations
    tl.fromTo('.hero-title', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    )
    .fromTo('.hero-subtitle', 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.5'
    )
    .fromTo('.hero-buttons', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3'
    )
    .fromTo('.hero-image', 
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' }, '-=0.8'
    );

    // Features animation on scroll
    gsap.fromTo('.feature-card',
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Stats animation
    gsap.fromTo('.stat-item',
      { scale: 0.5, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.stats-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const features = [
    {
      icon: MessageCircle,
      title: 'Real-time Messaging',
      description: 'Instant communication with lightning-fast message delivery and typing indicators.'
    },
    {
      icon: Users,
      title: 'Group Chats',
      description: 'Create and manage group conversations with friends, family, or colleagues.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for speed with minimal latency and maximum performance.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'End-to-end encryption ensures your conversations remain private and secure.'
    },
    {
      icon: Globe,
      title: 'Cross-Platform',
      description: 'Access your messages from any device, anywhere in the world.'
    },
    {
      icon: Heart,
      title: 'User Friendly',
      description: 'Intuitive design that makes chatting enjoyable and effortless.'
    }
  ];

  const stats = [
    { number: '10M+', label: 'Active Users' },
    { number: '500M+', label: 'Messages Sent' },
    { number: '99.9%', label: 'Uptime' },
    { number: '50+', label: 'Countries' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden hero-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-background/20 to-background/10"></div>
        
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Connect, Chat, 
                <span className="text-gradient block">Mingle</span>
              </h1>
              <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                Experience the future of communication with our lightning-fast, 
                secure messaging platform that brings people together.
              </p>
              <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg"
                  onClick={onGetStarted}
                  className="bg-gradient-primary text-lg px-8 py-6 hover:scale-105 hover:shadow-xl transition-all duration-300 glow-effect"
                >
                  Start Chatting Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 py-6 border-primary/30 hover:bg-primary/10 hover:scale-105 transition-all duration-300"
                >
                  Watch Demo
                </Button>
              </div>
            </div>
            
            <div className="hero-image relative">
              <div className="relative z-10">
                <img 
                  src={heroImage} 
                  alt="Mingle Talk Chat Interface" 
                  className="rounded-3xl shadow-2xl w-full max-w-lg mx-auto"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-20 animate-pulse-glow"></div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce-gentle">
          <div className="w-4 h-4 bg-primary rounded-full opacity-60"></div>
        </div>
        <div className="absolute bottom-40 right-20 animate-bounce-gentle" style={{ animationDelay: '1s' }}>
          <div className="w-6 h-6 bg-accent rounded-full opacity-40"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item text-center">
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-gradient">Mingle Talk?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the features that make Mingle Talk the perfect choice for your communication needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="feature-card group hover:shadow-xl transition-all duration-300 card-glass border-primary/20">
                <CardContent className="p-8 text-center">
                  <div className="mb-6 relative inline-block">
                    <feature.icon className="h-12 w-12 text-primary group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-bg">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start <span className="text-gradient">Mingling?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join millions of users who trust Mingle Talk for their daily communication needs.
          </p>
          <Button 
            size="lg"
            onClick={onGetStarted}
            className="bg-gradient-primary text-xl px-12 py-6 hover:scale-105 hover:shadow-xl transition-all duration-300 glow-effect"
          >
            Get Started for Free
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;