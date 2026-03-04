'use client';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Skills } from '@/components/skills';
import { Projects } from '@/components/projects';
import { Timeline } from '@/components/timeline';
import { AiCatalyst } from '@/components/ai-catalyst';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Timeline />
        <Projects />
        <AiCatalyst />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
