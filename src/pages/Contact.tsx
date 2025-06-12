
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent! ✨",
      description: "We'll get back to you within 24 hours.",
    });
    
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Have questions? Want to collaborate? We'd love to hear from you! 💌
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail size={20} />
                  Send us a message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="bg-white/5 border-white/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="bg-white/5 border-white/20"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      required
                      className="bg-white/5 border-white/20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more..."
                      required
                      className="min-h-[120px] bg-white/5 border-white/20 resize-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message ✨'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info & FAQs */}
            <div className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Quick Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="text-xl">📧</div>
                    <div>
                      <p className="font-medium">Email us</p>
                      <p className="text-sm text-muted-foreground">hello@GenMode.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="text-xl">💬</div>
                    <div>
                      <p className="font-medium">Social Media</p>
                      <p className="text-sm text-muted-foreground">@GenMode on all platforms</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="text-xl">⚡</div>
                    <div>
                      <p className="font-medium">Response Time</p>
                      <p className="text-sm text-muted-foreground">Usually within 24 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Frequently Asked</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">How accurate are the translations?</h4>
                    <p className="text-sm text-muted-foreground">
                      Our AI is trained on authentic Gen-Z conversations and achieves 95%+ accuracy in context and tone.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1">Can I suggest new personas?</h4>
                    <p className="text-sm text-muted-foreground">
                      Absolutely! We love community input and regularly add new personas based on user feedback.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1">Is there an API available?</h4>
                    <p className="text-sm text-muted-foreground">
                      Coming soon! Join our mailing list to be notified when the API launches.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Partnership Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Interested in integrating GenMode into your platform? We offer custom solutions for:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Educational platforms</li>
                    <li>• Social media management tools</li>
                    <li>• Marketing agencies</li>
                    <li>• Content creation platforms</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
