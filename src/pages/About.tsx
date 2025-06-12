
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';

const About = () => {
  const team = [
    { name: 'Alex Chen', role: 'AI Engineer', emoji: '🤖', bio: 'Turning algorithms into authentic Gen-Z vibes' },
    { name: 'Maya Rodriguez', role: 'UX Designer', emoji: '🎨', bio: 'Making interfaces that just hit different' },
    { name: 'Jordan Kim', role: 'Full-Stack Dev', emoji: '💻', bio: 'Code wizard who speaks fluent meme' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              About <span className="gradient-text">GenMode</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Bridging the gap between generations, one translation at a time ✨
            </p>
          </div>

          {/* Mission Section */}
          <Card className="glass-card mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-lg">
              <p>
                In a world where language evolves faster than ever, GenMode was born from a simple realization: 
                communication shouldn't have generational barriers.
              </p>
              <p>
                We noticed that Gen-Z has created a rich, nuanced language that's often misunderstood by other generations. 
                Our AI-powered platform doesn't just translate words—it captures the essence, emotion, and cultural context 
                that makes Gen-Z communication so authentic and vibrant.
              </p>
              <p>
                Whether you're a parent trying to connect with your teenager, a brand looking to speak authentically 
                to younger audiences, or just someone who wants to understand the cultural zeitgeist, GenMode is your bridge.
              </p>
            </CardContent>
          </Card>

          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="glass-card text-center">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold mb-2">Authenticity</h3>
                <p className="text-muted-foreground">
                  We respect and celebrate Gen-Z culture, ensuring our translations feel genuine, not forced.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card text-center">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-semibold mb-2">Inclusivity</h3>
                <p className="text-muted-foreground">
                  Our personas represent diverse voices and experiences within Gen-Z culture.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card text-center">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously evolve with language trends, keeping our translations fresh and relevant.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Team Section */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Meet the Team</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {team.map((member, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl mb-3">{member.emoji}</div>
                    <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary text-sm mb-2">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Story Section */}
          <Card className="glass-card mt-8">
            <CardHeader>
              <CardTitle className="text-2xl">Our Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                GenMode started in a college dorm room when our founder couldn't explain to their parents why 
                "no cap" wasn't about baseball equipment. What began as a joke between friends quickly evolved 
                into a passion project.
              </p>
              <p>
                We spent months studying linguistic patterns, cultural contexts, and the beautiful complexity of 
                how Gen-Z communicates online and offline. Our AI models are trained not just on words, but on 
                the emotional intelligence that makes this generation's communication so unique.
              </p>
              <p>
                Today, GenMode helps thousands of users daily—from confused millennials to marketing teams 
                looking to connect authentically with younger audiences. We're not just translating text; 
                we're facilitating understanding across generations.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
