import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { PersonaType } from '@/types/persona';
import { translateText } from '@/services/translation';
import { saveTranslation } from '@/services/translationHistory';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Copy, Check } from 'lucide-react';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Skeleton Loading Component
const TranslationSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    {/* Intro paragraph skeleton */}
    <div className="space-y-2">
      <div className="h-5 bg-white/5 rounded w-[85%]"></div>
      <div className="h-5 bg-white/5 rounded w-[70%]"></div>
    </div>

    {/* Bullet points skeleton */}
    <div className="space-y-3">
      {/* Bullet point 1 */}
      <div className="flex items-start space-x-2">
        <div className="h-5 bg-white/5 rounded w-3 mt-[2px]">•</div>
        <div className="flex-1">
          <div className="h-5 bg-white/5 rounded w-[90%]"></div>
        </div>
      </div>

      {/* Bullet point 2 */}
      <div className="flex items-start space-x-2">
        <div className="h-5 bg-white/5 rounded w-3 mt-[2px]">•</div>
        <div className="flex-1">
          <div className="h-5 bg-white/5 rounded w-[75%]"></div>
        </div>
      </div>

      {/* Bullet point 3 */}
      <div className="flex items-start space-x-2">
        <div className="h-5 bg-white/5 rounded w-3 mt-[2px]">•</div>
        <div className="flex-1">
          <div className="h-5 bg-white/5 rounded w-[85%]"></div>
        </div>
      </div>

      {/* Bullet point 4 */}
      <div className="flex items-start space-x-2">
        <div className="h-5 bg-white/5 rounded w-3 mt-[2px]">•</div>
        <div className="flex-1">
          <div className="h-5 bg-white/5 rounded w-[80%]"></div>
        </div>
      </div>
    </div>

    {/* Conclusion paragraph skeleton */}
    <div className="space-y-2">
      <div className="h-5 bg-white/5 rounded w-[75%]"></div>
      <div className="h-5 bg-white/5 rounded w-[60%]"></div>
    </div>
  </div>
);

const personas = [
  { id: 'direct', name: 'Direct Translation', emoji: '🎯', description: 'Just translate without style' },
  { id: 'tiktoker', name: 'TikToker', emoji: '📱', description: 'Viral vibes only' },
  { id: 'fashionista', name: 'Fashion Model', emoji: '💅', description: 'Serving looks & tea' },
  { id: 'memelord', name: 'Meme Lord', emoji: '😂', description: 'Chaotic energy activated' },
  { id: 'gamer', name: 'Gamer', emoji: '🎮', description: 'Touch grass? Never heard of it' },
  { id: 'bookworm', name: 'BookTok Queen', emoji: '📚', description: 'Academic weapon mode' },
  { id: 'vsco', name: 'VSCO Girl', emoji: '🌊', description: 'And I oop- sksksk' },
] as const;

const Translator = () => {
  const { user } = useAuth();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [selectedPersona, setSelectedPersona] = useState<PersonaType | ''>('direct');
  const [isTranslating, setIsTranslating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [translationMode, setTranslationMode] = useState<'direct' | 'full'>('direct');
  const { toast } = useToast();

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to translate.",
        variant: "destructive",
      });
      return;
    }

    if (translationMode === 'full' && !selectedPersona) {
      toast({
        title: "Error",
        description: "Please select a role first.",
        variant: "destructive",
      });
      return;
    }

    setIsTranslating(true);
    try {
      // If in direct mode, force the persona to be 'direct'
      const persona = translationMode === 'direct' ? 'direct' : (selectedPersona as PersonaType);
      const result = await translateText(inputText, persona);
      
      if (result.error) {
        toast({
          title: "Translation Failed",
          description: result.error,
          variant: "destructive",
        });
        return;
      }

      setOutputText(result.text);

      // Save translation to history
      if (user) {
        const savedTranslation = await saveTranslation(
          user.id,
          inputText,
          result.text,
          persona
        );

        if (!savedTranslation) {
          toast({
            title: "Warning",
            description: "Translation completed but couldn't save to history.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to translate text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCopy = async () => {
    if (!outputText) return;
    
    try {
      await navigator.clipboard.writeText(outputText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      
      toast({
        title: "Copied!",
        description: "Translation copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy text. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            <span className="gradient-text">Translate</span> to Gen-Z
          </h1>

          {/* Translation Mode Selection */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              size="lg"
              variant={translationMode === 'direct' ? 'default' : 'outline'}
              onClick={() => {
                setTranslationMode('direct');
                setSelectedPersona('direct');
                setInputText('');
                setOutputText('');
              }}
              className="w-48"
            >
              🎯 Direct Translation
            </Button>
            <Button
              size="lg"
              variant={translationMode === 'full' ? 'default' : 'outline'}
              onClick={() => {
                setTranslationMode('full');
                setSelectedPersona('');
                setInputText('');
                setOutputText('');
              }}
              className="w-48"
            >
              ✨ Full Translator
            </Button>
          </div>
          
          {/* Persona Selection Dropdown - Only show in full translator mode */}
          {translationMode === 'full' && (
            <div className="mb-8">
              <Select
                value={selectedPersona}
                onValueChange={(value: PersonaType) => setSelectedPersona(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  {personas.filter(p => p.id !== 'direct').map((persona) => (
                    <SelectItem 
                      key={persona.id} 
                      value={persona.id}
                      className="flex items-center gap-2"
                    >
                      <span className="text-xl mr-2">{persona.emoji}</span>
                      <span>{persona.name}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {/* Translation Area */}
          <div className="space-y-4">
            <Textarea
              placeholder="Enter your text here..."
              className="min-h-[200px] bg-white/5 border-white/20"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <Button 
              className="w-full bg-primary hover:bg-primary/90" 
              onClick={handleTranslate}
              disabled={isTranslating || !inputText.trim()}
            >
              {isTranslating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Translating...
                </>
              ) : (
                'Translate'
              )}
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="relative">
              <Textarea
                placeholder="Translation will appear here..."
                className="min-h-[200px] bg-white/5 border-white/20"
                value={outputText}
                readOnly
              />
              {isTranslating ? (
                <div className="absolute inset-0 p-6 bg-background/95">
                  <TranslationSkeleton />
                </div>
              ) : outputText && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 hover:bg-white/10"
                  onClick={handleCopy}
                >
                  {isCopied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translator;
