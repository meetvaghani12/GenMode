
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import AuthModal from '@/components/AuthModal';

const Pricing = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Free',
      price: isAnnual ? '0' : '0',
      period: 'forever',
      description: 'Perfect for trying out GenMode',
      features: [
        '10 translations per day',
        '3 personas available',
        'Basic translations',
        'Copy to clipboard',
      ],
      limitations: [
        'No translation history',
        'No priority support',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Pro',
      price: isAnnual ? '8' : '10',
      period: isAnnual ? 'month (billed annually)' : 'month',
      description: 'For regular slang enthusiasts',
      features: [
        'Unlimited translations',
        'All 6 personas',
        'Advanced AI translations',
        'Translation history',
        'Export & share features',
        'Priority support',
      ],
      limitations: [],
      cta: 'Start Pro Trial',
      popular: true,
    },
    {
      name: 'Team',
      price: isAnnual ? '24' : '30',
      period: isAnnual ? 'month (billed annually)' : 'month',
      description: 'For brands and content teams',
      features: [
        'Everything in Pro',
        'Up to 5 team members',
        'Brand voice customization',
        'API access (coming soon)',
        'Analytics dashboard',
        'Dedicated support',
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Choose Your <span className="gradient-text">Vibe</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Plans that scale with your slang translation needs ✨
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`${!isAnnual ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  isAnnual ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <div
                  className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                    isAnnual ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
              <span className={`${isAnnual ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                Annual
              </span>
              {isAnnual && (
                <Badge variant="secondary" className="ml-2">
                  Save 20%
                </Badge>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={plan.name}
                className={`glass-card relative ${
                  plan.popular ? 'ring-2 ring-primary scale-105' : ''
                } hover:scale-105 transition-all duration-300`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-3xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="text-green-400">✓</div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    {plan.limitations.map((limitation, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="text-muted-foreground">✗</div>
                        <span className="text-sm text-muted-foreground">{limitation}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? 'bg-primary hover:bg-primary/90'
                        : 'bg-secondary hover:bg-secondary/80'
                    }`}
                    onClick={() => setShowAuthModal(true)}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features Comparison */}
          <Card className="glass-card mt-12">
            <CardHeader>
              <CardTitle className="text-center">Feature Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3">Feature</th>
                      <th className="text-center py-3">Free</th>
                      <th className="text-center py-3">Pro</th>
                      <th className="text-center py-3">Team</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    <tr className="border-b border-white/10">
                      <td className="py-3">Daily Translations</td>
                      <td className="text-center">10</td>
                      <td className="text-center">Unlimited</td>
                      <td className="text-center">Unlimited</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3">Available Personas</td>
                      <td className="text-center">3</td>
                      <td className="text-center">6</td>
                      <td className="text-center">6+</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3">Translation History</td>
                      <td className="text-center">✗</td>
                      <td className="text-center">✓</td>
                      <td className="text-center">✓</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3">Team Collaboration</td>
                      <td className="text-center">✗</td>
                      <td className="text-center">✗</td>
                      <td className="text-center">✓</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3">API Access</td>
                      <td className="text-center">✗</td>
                      <td className="text-center">✗</td>
                      <td className="text-center">Coming Soon</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="glass-card mt-8">
            <CardHeader>
              <CardTitle className="text-center">Pricing FAQ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Can I change plans anytime?</h4>
                  <p className="text-sm text-muted-foreground">
                    Absolutely! Upgrade or downgrade your plan at any time. Changes take effect immediately.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Is there a free trial?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes! Pro plan comes with a 7-day free trial. No credit card required to start.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">What payment methods do you accept?</h4>
                  <p className="text-sm text-muted-foreground">
                    We accept all major credit cards, PayPal, and bank transfers for annual plans.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Need a custom plan?</h4>
                  <p className="text-sm text-muted-foreground">
                    For enterprise needs or custom integrations, contact our sales team for a tailored solution.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode="signup"
        onModeChange={() => {}}
      />
    </div>
  );
};

export default Pricing;
