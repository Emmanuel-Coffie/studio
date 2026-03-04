'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { getPortfolioReview } from '@/app/actions';
import { SectionWrapper, SectionHeader, SectionTitle, SectionDescription } from './section-wrapper';
import { CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Loader2, Sparkles, Wand2, Lightbulb, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { CardGlass } from './card-glass';
import { Separator } from './ui/separator';

const initialState = {
  feedback: null,
  suggestions: null,
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="submit" 
      disabled={pending} 
      className="w-full bg-accent text-accent-foreground hover:bg-accent/90 transition-all shadow-[0_0_20px_rgba(var(--accent),0.3)] hover:shadow-[0_0_30px_rgba(var(--accent),0.5)]"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          AI Brainstorming...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Get Professional Review
        </>
      )}
    </Button>
  );
}

export function AiReview() {
  const [state, formAction] = useActionState(getPortfolioReview, initialState);

  return (
    <SectionWrapper id="ai-review">
      <SectionHeader>
        <SectionTitle>AI Portfolio Consultant</SectionTitle>
        <SectionDescription>
          Elevate your digital presence. Describe your portfolio's layout, themes, and content to receive expert feedback from our AI critic.
        </SectionDescription>
      </SectionHeader>
      
      <div className="mx-auto max-w-3xl">
        <CardGlass className="mb-8">
          <CardContent className="p-6">
            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Textarea
                  name="portfolioDescription"
                  placeholder="Describe your portfolio details... (e.g., 'A dark-themed minimalist UI for a backend dev. Using glowing accents. Featured projects show as large cards with hover states...')"
                  rows={6}
                  required
                  className="bg-white/5 border-white/20 placeholder:text-muted-foreground/40 focus:border-accent/50 transition-colors"
                />
                <p className="text-xs text-muted-foreground/60 text-right">Minimum 50 characters for better results.</p>
              </div>
              <SubmitButton />
              {state?.message && !state.feedback && (
                <Alert variant="destructive" className="mt-4">
                  <AlertTitle>Notice</AlertTitle>
                  <AlertDescription>{state.message}</AlertDescription>
                </Alert>
              )}
            </form>
          </CardContent>
        </CardGlass>

        {state?.feedback && state?.suggestions && (
          <div className="space-y-6 animate-fade-in">
            <CardGlass className="border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 font-headline text-2xl text-foreground">
                  <CheckCircle2 className="text-primary h-6 w-6" />
                  Design Critique
                </CardTitle>
                <Separator className="bg-white/10" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="prose prose-invert max-w-none">
                  <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                    {state.feedback}
                  </p>
                </div>
              </CardContent>
            </CardGlass>

            <CardGlass className="border-accent/20 bg-accent/5">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 font-headline text-2xl text-foreground">
                  <Lightbulb className="text-accent h-6 w-6" />
                  Strategic Improvements
                </CardTitle>
                <Separator className="bg-white/10" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="prose prose-invert max-w-none">
                  <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                    {state.suggestions}
                  </p>
                </div>
              </CardContent>
            </CardGlass>
            
            <div className="text-center text-sm text-muted-foreground/50 pt-4">
              Powered by Genkit & Gemini 1.5 Flash
            </div>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
