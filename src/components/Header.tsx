import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const Header = () => {
  const { user, signOut, isLoading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      toast({
        title: "Signed out",
        description: "You've been successfully signed out.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const openSignIn = () => {
    setAuthMode('signin');
    setShowAuthModal(true);
  };

  const openSignUp = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold gradient-text">
              GenMode
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/translator" className="text-muted-foreground hover:text-primary transition-colors">
                Translator
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              <Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
                Pricing
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {isLoading ? (
                <Button disabled variant="ghost" className="hover:bg-primary/20">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading
                </Button>
              ) : user ? (
                <>
                  <Link to="/dashboard">
                    <Button variant="ghost" className="hover:bg-primary/20">
                      Dashboard
                    </Button>
                  </Link>
                  <Button 
                    onClick={handleSignOut} 
                    variant="outline" 
                    className="border-primary/20 hover:bg-primary/10"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={openSignIn} variant="ghost" className="hover:bg-primary/20">
                    Sign In
                  </Button>
                  <Button onClick={openSignUp} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  );
};

export default Header;
