import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';
import { getUserTranslations, getUserStats, Translation } from '@/services/translationHistory';
import { formatDistanceToNow } from 'date-fns';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [stats, setStats] = useState({
    totalTranslations: 0,
    translationsThisWeek: 0,
    uniquePersonas: 0,
    streak: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user) return;

      setIsLoading(true);
      try {
        const [translationsData, statsData] = await Promise.all([
          getUserTranslations(user.id),
          getUserStats(user.id)
        ]);

        setTranslations(translationsData);
        setStats(statsData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-6xl flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, <span className="gradient-text">{user?.name}</span>! ✨
            </h1>
            <p className="text-muted-foreground">Here's your slang translation dashboard</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="text-2xl font-bold mb-1">{stats.totalTranslations}</div>
                <div className="text-sm font-medium mb-1">Translations</div>
                <div className="text-xs text-muted-foreground">+{stats.translationsThisWeek} this week</div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="text-2xl font-bold mb-1">{stats.uniquePersonas}</div>
                <div className="text-sm font-medium mb-1">Personas Used</div>
                <div className="text-xs text-muted-foreground">
                  {stats.uniquePersonas === 6 ? 'All unlocked! 🎉' : 'Keep exploring! 🔍'}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="text-2xl font-bold mb-1">{stats.streak} days</div>
                <div className="text-sm font-medium mb-1">Streak</div>
                <div className="text-xs text-muted-foreground">Keep it up! 🔥</div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="text-2xl font-bold mb-1">Pro</div>
                <div className="text-sm font-medium mb-1">Current Plan</div>
                <div className="text-xs text-muted-foreground">Unlimited access</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Translations */}
            <Card className="glass-card lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Translations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {translations.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No translations yet. Start translating to build your history!</p>
                    <Button 
                      className="mt-4 bg-primary hover:bg-primary/90"
                      onClick={() => navigate('/translator')}
                    >
                      Start Translating
                    </Button>
                  </div>
                ) : (
                  <>
                    {translations.slice(0, 5).map((translation) => (
                      <div key={translation.id} className="border-l-2 border-primary pl-4 space-y-2">
                        <div className="flex justify-between items-start">
                          <span className="text-sm font-medium">{translation.persona}</span>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(translation.created_at), { addSuffix: true })}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">{translation.input_text}</div>
                        <div className="text-sm bg-primary/10 p-2 rounded">{translation.output_text}</div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full mt-4">
                      View All Translations
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90" 
                  onClick={() => navigate('/translator')}
                >
                  New Translation
                </Button>
                <Button variant="outline" className="w-full">
                  Export History
                </Button>
                <Button variant="outline" className="w-full">
                  Share Favorites
                </Button>
                <Button variant="outline" className="w-full">
                  Account Settings
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Usage Chart Placeholder */}
          <Card className="glass-card mt-6">
            <CardHeader>
              <CardTitle>Usage Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-white/5 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">📊</div>
                  <p className="text-muted-foreground">Usage charts coming soon!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
