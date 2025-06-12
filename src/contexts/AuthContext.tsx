import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface AuthUser {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isInitialized: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const STORAGE_KEY = 'genz-user-data';
const SESSION_KEY = 'genz-session-timestamp';
const SESSION_DATA_KEY = 'genz-session-data';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    // Initialize user from localStorage if available
    const storedUser = localStorage.getItem(STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const updateStoredSession = (sessionData?: Session | null) => {
    const timestamp = new Date().toISOString();
    localStorage.setItem(SESSION_KEY, timestamp);
    if (sessionData) {
      localStorage.setItem(SESSION_DATA_KEY, JSON.stringify(sessionData));
    }
  };

  const clearStoredSession = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_DATA_KEY);
  };

  const setUserWithStorage = (userData: AuthUser | null, sessionData?: Session | null) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      updateStoredSession(sessionData);
    } else {
      clearStoredSession();
    }
  };

  const getStoredSessionData = () => {
    const sessionStr = localStorage.getItem(SESSION_DATA_KEY);
    if (!sessionStr) return null;
    try {
      return JSON.parse(sessionStr) as Session;
    } catch {
      return null;
    }
  };

  const setUserFromSession = async (supabaseUser: User, sessionData?: Session | null) => {
    try {
      // First check if we have the profile data in localStorage
      const storedUser = localStorage.getItem(STORAGE_KEY);
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        if (userData.id === supabaseUser.id) {
          setUser(userData);
          updateStoredSession(sessionData);
          return;
        }
      }

      // If not in localStorage, fetch from database
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('name')
        .eq('id', supabaseUser.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        return;
      }

      const userData = {
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        name: profile?.name || supabaseUser.email?.split('@')[0] || 'User'
      };

      setUserWithStorage(userData, sessionData);
    } catch (error) {
      console.error('Error in setUserFromSession:', error);
      setUserWithStorage(null);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        await setUserFromSession(data.user, data.session);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name
          }
        }
      });
      
      if (error) throw error;

      if (!data.user) {
        throw new Error('User creation failed');
      }

      // Wait a moment for the trigger to create the profile
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Try to fetch the profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      // If profile doesn't exist (trigger didn't work), create it manually
      if (profileError || !profile) {
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([{ id: data.user.id, name: name }]);
        
        if (insertError) {
          console.error('Error creating profile:', insertError);
          // Continue anyway as the user is created
        }
      }

      // Set the user session
      await setUserFromSession(data.user, data.session);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUserWithStorage(null);
    } catch (error) {
      throw error;
    }
  };

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get the current session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        if (session?.user) {
          await setUserFromSession(session.user, session);
        } else {
          setUserWithStorage(null);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setUserWithStorage(null);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    initializeAuth();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.id);
      
      if (event === 'SIGNED_OUT') {
        setUserWithStorage(null);
        return;
      }

      if (session?.user) {
        setIsLoading(true);
        try {
          await setUserFromSession(session.user, session);
        } finally {
          setIsLoading(false);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, isInitialized, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
