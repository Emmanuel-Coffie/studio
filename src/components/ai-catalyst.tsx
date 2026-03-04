'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { getProjectArchitecture } from '@/app/actions';
import { SectionWrapper, SectionHeader, SectionTitle, SectionDescription } from './section-wrapper';
import { CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Loader2, Zap, Layout, ListChecks, Calendar, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { CardGlass } from './card-glass';
import { Badge } from './ui/badge';

const initialState = {
  data: null,
  message: null,
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="submit" 
      disabled={pending} 
      className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Architecting Vision...
        </>
      ) : (
        <>
          <Zap className="mr-2 h-4 w-4" />
          Catalyze Project
        </>
      )}
    </Button>
  );
}

export function AiCatalyst() {
  const [state, formAction] = useActionState(getProjectArchitecture, initialState);

  return (
    <SectionWrapper id="ai-catalyst">
      <SectionHeader>
        <SectionTitle>AI Project Catalyst</SectionTitle>
        <SectionDescription>
          Transform your creative sparks into technical roadmaps. Describe your project idea, and our AI Architect will build the blueprint.
        </SectionDescription>
      </SectionHeader>
      
      <div className="mx-auto max-w-4xl space-y-8">
        <CardGlass>
          <CardContent className="p-6">
            <form action={formAction} className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground/80 mb-2">
                <Info className="h-4 w-4" />
                <span>Describe your app, website, or tool idea in a few sentences.</span>
              </div>
              <Textarea
                name="projectIdea"
                placeholder="e.g., 'A mobile app for track athletes to log their recovery times and get AI-powered training adjustments...'"
                rows={4}
                required
                className="bg-white/5 border-white/20"
              />
              <SubmitButton />
              {state?.message && (
                <Alert variant={state.success ? "default" : "destructive"} className="mt-4">
                  <AlertTitle>{state.success ? "Blueprint Ready" : "Notice"}</AlertTitle>
                  <AlertDescription>{state.message}</AlertDescription>
                </Alert>
              )}
            </form>
          </CardContent>
        </CardGlass>

        {state?.data && (
          <div className="grid gap-6 animate-fade-in">
            <div className="grid gap-6 md:grid-cols-2">
              <CardGlass className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Layout className="h-5 w-5 text-primary" />
                    Recommended Stack
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {state.data.techStack.map((tech: string) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </CardContent>
              </CardGlass>

              <CardGlass className="border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <ListChecks className="h-5 w-5 text-accent" />
                    MVP Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {state.data.mvpFeatures.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-accent font-bold">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </CardGlass>
            </div>

            <CardGlass className="border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Calendar className="h-5 w-5 text-primary" />
                  4-Week Roadmap
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {state.data.roadmap.map((item: any, i: number) => (
                  <div key={i} className="p-4 rounded-lg bg-white/5 border border-white/5">
                    <div className="text-xs font-bold text-primary mb-1">{item.week}</div>
                    <div className="text-sm text-muted-foreground">{item.goals}</div>
                  </div>
                ))}
              </CardContent>
              <div className="p-6 pt-0 text-sm italic text-muted-foreground/60 border-t border-white/5 mt-4">
                Architect's Note: {state.data.architectureNote}
              </div>
            </CardGlass>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
