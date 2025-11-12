import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { SectionWrapper, SectionHeader, SectionTitle, SectionDescription } from './section-wrapper';

export function About() {
  const aboutImage = PlaceHolderImages.find(img => img.id === 'about-me');

  return (
    <SectionWrapper id="about" className="bg-secondary">
      <SectionHeader>
        <SectionTitle>About Me</SectionTitle>
        <SectionDescription>
          A brief introduction to who I am, my passions, and my journey in the world of technology.
        </SectionDescription>
      </SectionHeader>
      <div className="mx-auto max-w-5xl">
        <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-12">
          <div className="relative mx-auto w-full max-w-sm">
            {aboutImage && (
              <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                width={600}
                height={600}
                className="aspect-square rounded-full object-cover shadow-lg"
                data-ai-hint={aboutImage.imageHint}
              />
            )}
          </div>
          <div className="space-y-4 text-center md:text-left">
            <h3 className="font-headline text-2xl font-bold text-primary">
              Developer, Innovator, Problem-Solver
            </h3>
            <p className="text-muted-foreground">
              Hello! I&apos;m a passionate developer with a knack for creating beautiful and functional digital products. My journey into tech started with a simple curiosity about how websites worked, and it has since evolved into a full-fledged passion for software engineering and user-centric design.
            </p>
            <p className="text-muted-foreground">
              I thrive on turning complex problems into simple, elegant solutions. Whether it&apos;s building a responsive front-end or designing a robust back-end, I&apos;m always eager to learn new technologies and apply my skills to create meaningful impact.
            </p>
            <p className="text-muted-foreground">
              When I&apos;m not coding, you can find me exploring the outdoors, reading a good book, or experimenting with new recipes in the kitchen.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
