import Image from 'next/image';
import Link from 'next/link';
import { blogData } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { SectionWrapper, SectionHeader, SectionTitle, SectionDescription } from './section-wrapper';
import { ArrowRight } from 'lucide-react';

export function Blog() {
  return (
    <SectionWrapper id="blog">
      <SectionHeader>
        <SectionTitle>My Thoughts & Insights</SectionTitle>
        <SectionDescription>
          A collection of articles where I share my knowledge, experiences, and thoughts on technology and development.
        </SectionDescription>
      </SectionHeader>
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {blogData.map((post) => {
          const postImage = PlaceHolderImages.find(img => img.id === post.imagePlaceholder);
          return (
            <Card key={post.id} className="flex flex-col overflow-hidden">
              {postImage && (
                <div className="relative h-48 w-full">
                  <Image
                    src={postImage.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    data-ai-hint={postImage.imageHint}
                  />
                </div>
              )}
              <CardHeader>
                <p className="text-sm text-muted-foreground">{post.date}</p>
                <CardTitle className="font-headline text-xl">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{post.excerpt}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild variant="link" className="p-0 h-auto">
                  <Link href={post.link}>
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
