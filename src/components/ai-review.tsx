'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { getPortfolioReview } from '@/app/actions';
import { SectionWrapper, SectionHeader, SectionTitle, SectionDescription } from './section-wrapper';
import { CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Loader2, Sparkles, Lightbulb, CheckCircle2, Info } from 'lucide-react';
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
          Analyzing Portfolio...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Get Expert Review
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
      
      <div className="mx-auto max-w-4xl space-y-8">
        <CardGlass className="border-white/10 shadow-xl">
          <CardContent className="p-6">
            <form action={formAction} className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground/80">
                  <Info className="h-4 w-4" />
                  <span>Tip: Mention your target industry and tech stack for better results.</span>
                </div>
                <Textarea
                  name="portfolioDescription"
                  placeholder="Describe your portfolio details... (e.g., 'I am a backend dev using a minimalist dark theme with neon purple accents. My projects are listed as a vertical timeline...')"
                  rows={6}
                  required
                  className="bg-white/5 border-white/20 placeholder:text-muted-foreground/40 focus:border-accent/50 transition-colors resize-none text-lg p-4"
                />
                <p className="text-xs text-muted-foreground/60 text-right">Minimum 50 characters required.</p>
              </div>
              <SubmitButton />
              {state?.message && !state.feedback && (
                <Alert variant="destructive" className="mt-4 border-destructive/50 bg-destructive/5">
                  <AlertTitle>Notice</AlertTitle>
                  <AlertDescription>{state.message}</AlertDescription>
                </Alert>
              )}
            </form>
          </CardContent>
        </CardGlass>

        {state?.feedback && state?.suggestions && (
          <div className="grid gap-6 md:grid-cols-2 animate-fade-in">
            <CardGlass className="border-primary/20 flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-3 font-headline text-2xl text-foreground">
                  <CheckCircle2 className="text-primary h-6 w-6" />
                  Visual Analysis
                </CardTitle>
              </CardHeader>
              <Separator className="bg-white/10 mx-6" />
              <CardContent className="pt-6 flex-1">
                <div className="max-w-none">
                  <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed text-base">
                    {state.feedback}
                  </p>
                </div>
              </CardContent>
            </CardGlass>

            <CardGlass className="border-accent/20 bg-accent/5 flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-3 font-headline text-2xl text-foreground">
                  <Lightbulb className="text-accent h-6 w-6" />
                  Actionable Steps
                </CardTitle>
              </CardHeader>
              <Separator className="bg-white/10 mx-6" />
              <CardContent className="pt-6 flex-1">
                <div className="max-w-none">
                  <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed text-base">
                    {state.suggestions}
                  </p>
                </div>
              </CardContent>
            </CardGlass>
            
            <div className="md:col-span-2 text-center text-sm text-muted-foreground/50 pt-4 font-mono">
              PROCESSED BY GEMINI 1.5 FLASH & GENKIT
            </div>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
