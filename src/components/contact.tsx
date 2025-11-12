'use client';

import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { submitContactForm } from '@/app/actions';
import { SectionWrapper, SectionHeader, SectionTitle, SectionDescription } from './section-wrapper';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Loader2, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from './ui/label';

const initialState = {
  message: null,
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          Send Message
        </>
      )}
    </Button>
  );
}

export function Contact() {
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? 'Success!' : 'Error',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
      if (state.success) {
        formRef.current?.reset();
      }
    }
  }, [state, toast]);

  return (
    <SectionWrapper id="contact">
      <SectionHeader>
        <SectionTitle>Get in Touch</SectionTitle>
        <SectionDescription>
          Have a project in mind or just want to say hello? Feel free to reach out. I&apos;m always open to discussing new opportunities.
        </SectionDescription>
      </SectionHeader>
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardContent className="p-6">
            <form ref={formRef} action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Your Name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="Your Email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" placeholder="Your Message" rows={6} required />
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
}
