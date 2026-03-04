import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowDown, Download } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] md:h-[calc(100vh-5rem)] w-full flex-col items-center justify-center text-center px-4">
      <div className="container">
        <div className="mx-auto max-w-3xl space-y-6 animate-fade-in">
          <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-xs sm:text-sm font-medium animate-slide-up [animation-delay:0.2s]">
            Full-Stack Developer & Innovator
          </div>
          <h1 className="font-headline text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-primary animate-slide-up [animation-delay:0.3s]">
            Crafting Digital Experiences
          </h1>
          <p className="mx-auto max-w-[600px] text-base sm:text-lg text-muted-foreground md:text-xl animate-slide-up [animation-delay:0.4s]">
            Welcome to my personal portfolio. I specialize in building modern,
            responsive, and user-friendly web applications with a focus on impact.
          </p>
        </div>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in [animation-delay:0.5s]">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto min-w-[160px]">
            <Link href="#projects">View My Work</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto min-w-[160px] border-primary text-primary hover:bg-primary/5">
            <Link href="/cv.pdf" target="_blank" download>
              <Download className="mr-2 h-4 w-4" />
              Download CV
            </Link>
          </Button>
          <Button asChild size="lg" variant="ghost" className="w-full sm:w-auto">
            <Link href="#contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-10 animate-bounce hidden sm:block">
          <a href="#about" aria-label="Scroll to about section">
            <ArrowDown className="h-6 w-6 text-muted-foreground" />
          </a>
      </div>
    </section>
  );
}
