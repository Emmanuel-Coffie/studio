'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { getPortfolioReview } from '@/app/actions';
import { SectionWrapper, SectionHeader, SectionTitle, SectionDescription } from './section-wrapper';
import { CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { CardGlass } from './card-glass';

const initialState = {
  feedback: null,
  suggestions: null,
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Get AI Feedback
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
        <SectionTitle>AI Portfolio Review</SectionTitle>
        <SectionDescription>
          Get instant, AI-powered feedback on your portfolio. Just describe your portfolio&apos;s presentation, and our AI will provide suggestions for improvement.
        </SectionDescription>
      </SectionHeader>
      <div className="mx-auto max-w-3xl">
        <CardGlass>
          <CardContent className="p-6">
            <form action={formAction} className="space-y-4">
              <Textarea
                name="portfolioDescription"
                placeholder="Describe your portfolio here. For example: 'My portfolio has a minimalist black and white theme. The navigation is at the top. Projects are displayed in a grid with hover effects...' (min. 50 characters)"
                rows={6}
                required
                className="bg-white/5 border-white/20 placeholder:text-muted-foreground/60"
              />
              <SubmitButton />
              {state?.message && !state.feedback && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{state.message}</AlertDescription>
                </Alert>
              )}
            </form>
          </CardContent>
        </CardGlass>

        {state?.feedback && state?.suggestions && (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <CardGlass>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-xl text-foreground">
                  <Wand2 className="text-primary" />
                  Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-muted-foreground/80">{state.feedback}</p>
              </CardContent>
            </CardGlass>
            <CardGlass>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-xl text-foreground">
                  <Sparkles className="text-primary" />
                  Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-muted-foreground/80">{state.suggestions}</p>
              </CardContent>
            </CardGlass>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
