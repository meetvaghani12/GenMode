import { supabase } from '@/integrations/supabase/client';
import { PersonaType } from '@/types/persona';

export interface Translation {
  id: string;
  user_id: string;
  input_text: string;
  output_text: string;
  persona: PersonaType;
  created_at: string;
}

export const saveTranslation = async (
  userId: string,
  inputText: string,
  outputText: string,
  persona: PersonaType
): Promise<Translation | null> => {
  try {
    console.log('Attempting to save translation:', { userId, inputText, outputText, persona });
    
    // Get current session to ensure we're authenticated
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      console.error('No active session:', sessionError);
      throw new Error('Authentication required');
    }

    // Try to insert the translation
    const { data, error } = await supabase
      .from('translations')
      .insert([
        {
          user_id: userId,
          input_text: inputText,
          output_text: outputText,
          persona: persona,
        }
      ])
      .select('*')
      .single();

    if (error) {
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      
      // If the table doesn't exist, we need to notify the user to run the migrations
      if (error.code === '42P01') {
        console.error('The translations table does not exist. Please run the database migrations.');
        throw new Error('Database setup required. Please contact support to initialize the translations feature.');
      }
      
      throw error;
    }

    console.log('Translation saved successfully:', data);
    return data;
  } catch (error) {
    console.error('Full error object:', error);
    if (error instanceof Error) {
      console.error('Error saving translation:', error.message);
    }
    return null;
  }
};

export const getUserTranslations = async (userId: string): Promise<Translation[]> => {
  try {
    // Get current session to ensure we're authenticated
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      console.error('No active session:', sessionError);
      throw new Error('Authentication required');
    }

    const { data, error } = await supabase
      .from('translations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      throw error;
    }

    console.log('Fetched translations:', data);
    return data || [];
  } catch (error) {
    console.error('Full error object:', error);
    if (error instanceof Error) {
      console.error('Error fetching translations:', error.message);
    }
    return [];
  }
};

export const getUserStats = async (userId: string) => {
  try {
    // Get current session to ensure we're authenticated
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      console.error('No active session:', sessionError);
      throw new Error('Authentication required');
    }

    console.log('Fetching stats for user:', userId);
    
    const { data: translations, error: translationsError } = await supabase
      .from('translations')
      .select('persona, created_at')
      .eq('user_id', userId);

    if (translationsError) {
      console.error('Error details:', {
        code: translationsError.code,
        message: translationsError.message,
        details: translationsError.details,
        hint: translationsError.hint
      });
      throw translationsError;
    }

    if (!translations) {
      console.log('No translations found for stats calculation');
      return {
        totalTranslations: 0,
        translationsThisWeek: 0,
        uniquePersonas: 0,
        streak: 0
      };
    }

    console.log('Fetched translations for stats:', translations);

    // Calculate total translations
    const totalTranslations = translations.length;

    // Calculate translations this week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const translationsThisWeek = translations.filter(
      t => new Date(t.created_at) > oneWeekAgo
    ).length;

    // Count unique personas used
    const uniquePersonas = new Set(translations.map(t => t.persona)).size;

    // Calculate streak (consecutive days with translations)
    const dates = translations
      .map(t => new Date(t.created_at).toLocaleDateString())
      .sort()
      .reverse();
    const uniqueDates = [...new Set(dates)];
    
    let streak = 0;
    const today = new Date().toLocaleDateString();
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();
    
    // Check if user translated today or yesterday to maintain streak
    const hasRecentActivity = uniqueDates[0] === today || uniqueDates[0] === yesterday;
    
    if (hasRecentActivity) {
      streak = 1;
      let checkDate = new Date(uniqueDates[0]);
      
      for (let i = 1; i < uniqueDates.length; i++) {
        const currentDate = new Date(uniqueDates[i]);
        const dayDifference = Math.floor(
          (checkDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24)
        );
        
        if (dayDifference === 1) {
          streak++;
          checkDate = currentDate;
        } else {
          break;
        }
      }
    }

    const stats = {
      totalTranslations,
      translationsThisWeek,
      uniquePersonas,
      streak
    };

    console.log('Calculated stats:', stats);
    return stats;
  } catch (error) {
    console.error('Full error object:', error);
    if (error instanceof Error) {
      console.error('Error fetching user stats:', error.message);
    }
    return {
      totalTranslations: 0,
      translationsThisWeek: 0,
      uniquePersonas: 0,
      streak: 0
    };
  }
}; 