import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowDown } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative flex h-[calc(100vh-5rem)] min-h-[500px] w-full flex-col items-center justify-center text-center">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium">
            Full-Stack Developer & Designer
          </div>
          <h1 className="font-headline text-4xl font-bold tracking-tighter text-primary sm:text-6xl md:text-7xl">
            Crafting Digital Experiences
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            Welcome to my personal portfolio. I specialize in building modern,
            responsive, and user-friendly web applications.
          </p>
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="#projects">View My Work</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-10 animate-bounce">
          <a href="#about" aria-label="Scroll to about section">
            <ArrowDown className="h-6 w-6 text-muted-foreground" />
          </a>
      </div>
    </section>
  );
}
