import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'signin' | 'signup';
  onModeChange: (mode: 'signin' | 'signup') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode, onModeChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setIsSubmitting(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (mode === 'signup' && !name) {
      toast({
        title: "Error",
        description: "Please enter your name.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === 'signin') {
        await signIn(email, password);
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
      } else {
        await signUp(email, password, name);
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
      }
      onClose();
      resetForm();
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        resetForm();
        onClose();
      }
    }}>
      <DialogContent className="glass-card border-white/20 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text text-center">
            {mode === 'signin' ? 'Welcome Back' : 'Join GenMode'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                disabled={isSubmitting}
                className="bg-white/5 border-white/20"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={isSubmitting}
              className="bg-white/5 border-white/20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={isSubmitting}
              minLength={6}
              className="bg-white/5 border-white/20"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {mode === 'signin' ? 'Signing in...' : 'Creating account...'}
              </>
            ) : (
              mode === 'signin' ? 'Sign In' : 'Create Account'
            )}
          </Button>
        </form>
        
        <div className="text-center">
          <button
            type="button"
            onClick={() => {
              resetForm();
              onModeChange(mode === 'signin' ? 'signup' : 'signin');
            }}
            className="text-primary hover:text-primary/80 text-sm"
            disabled={isSubmitting}
          >
            {mode === 'signin' 
              ? "Don't have an account? Sign up" 
              : "Already have an account? Sign in"
            }
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
