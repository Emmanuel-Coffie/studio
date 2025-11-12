import Image from 'next/image';
import Link from 'next/link';
import { projectsData } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { SectionWrapper, SectionHeader, SectionTitle, SectionDescription } from './section-wrapper';
import { Github, ExternalLink } from 'lucide-react';
import { CardGlass } from './card-glass';

export function Projects() {
  return (
    <SectionWrapper id="projects">
      <SectionHeader>
        <SectionTitle>My Projects</SectionTitle>
        <SectionDescription>
          Here are some of the projects I&apos;m proud to have worked on. Each one represents a unique challenge and a learning opportunity.
        </SectionDescription>
      </SectionHeader>
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-1 md:grid-cols-2">
        {projectsData.map((project) => {
          const projectImage = PlaceHolderImages.find(img => img.id === project.imagePlaceholder);
          return (
            <CardGlass key={project.id} className="flex flex-col overflow-hidden">
              {projectImage && (
                <div className="relative h-48 w-full">
                  <Image
                    src={projectImage.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover rounded-t-xl"
                    data-ai-hint={projectImage.imageHint}
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="font-headline text-xl text-foreground">{project.title}</CardTitle>
                <CardDescription className="text-muted-foreground/80">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-white/10 text-foreground/80 border-none">{tech}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button asChild variant="outline">
                  <Link href={project.repoLink} target="_blank" rel="noopener noreferrer">
                    <Github />
                    <span>GitHub</span>
                  </Link>
                </Button>
                <Button asChild>
                  <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink />
                    <span>Live Demo</span>
                  </Link>
                </Button>
              </CardFooter>
            </CardGlass>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
