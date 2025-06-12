import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import AuthModal from '@/components/AuthModal';
import { ArrowDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const personas = [
  { id: 'tiktoker', name: 'TikToker', emoji: '📱', description: 'Viral vibes only' },
  { id: 'fashionista', name: 'Fashion Model', emoji: '💅', description: 'Serving looks & tea' },
  { id: 'memelord', name: 'Meme Lord', emoji: '😂', description: 'Chaotic energy activated' },
  { id: 'gamer', name: 'Gamer', emoji: '🎮', description: 'Touch grass? Never heard of it' },
  { id: 'bookworm', name: 'BookTok Queen', emoji: '📚', description: 'Academic weapon mode' },
  { id: 'vsco', name: 'VSCO Girl', emoji: '🌊', description: 'And I oop- sksksk' },
];

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">GenMode</span>
              <br />
              <span className="text-muted-foreground text-3xl md:text-4xl">Your Text, Gen-Z Style</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Transform boring text into authentic Gen-Z slang with our AI-powered translator. 
              Choose your persona and let the vibes flow ✨
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/translator">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                  Start Translating
                </Button>
              </Link>
              {user ? (
                <Link to="/dashboard">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-primary/20 hover:bg-primary/10 text-lg px-8 py-6"
                  >
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Button 
                  onClick={() => setShowAuthModal(true)}
                  variant="outline" 
                  size="lg" 
                  className="border-primary/20 hover:bg-primary/10 text-lg px-8 py-6"
                >
                  Sign Up Free
                </Button>
              )}
            </div>
          </div>
          
          <div className="mt-12 animate-bounce">
            <ArrowDown className="mx-auto text-primary" size={32} />
          </div>
        </div>
      </section>

      {/* Personas Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Choose Your <span className="gradient-text">Persona</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {personas.map((persona, index) => (
              <Card 
                key={persona.id} 
                className="glass-card hover:scale-105 transition-all duration-300 cursor-pointer group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {persona.emoji}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{persona.name}</h3>
                  <p className="text-muted-foreground text-sm">{persona.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Why <span className="gradient-text">GenMode</span>?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="text-3xl">🤖</div>
              <h3 className="text-xl font-semibold">AI-Powered</h3>
              <p className="text-muted-foreground">Advanced AI understands context and delivers authentic Gen-Z translations</p>
            </div>
            
            <div className="space-y-4">
              <div className="text-3xl">🎭</div>
              <h3 className="text-xl font-semibold">Role-Based</h3>
              <p className="text-muted-foreground">Each persona brings unique slang patterns and communication styles</p>
            </div>
            
            <div className="space-y-4">
              <div className="text-3xl">💾</div>
              <h3 className="text-xl font-semibold">Save & Share</h3>
              <p className="text-muted-foreground">Keep your best translations and share them across all platforms</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to get <span className="gradient-text">slaying</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already translating their way to Gen-Z fluency
          </p>
          
          {user ? (
            <Link to="/dashboard">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 animate-glow">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <Link to="/translator">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 animate-glow">
                Try GenMode Now
              </Button>
            </Link>
          )}
        </div>
      </section>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode="signup"
        onModeChange={() => {}}
      />
    </div>
  );
};

export default Index;
