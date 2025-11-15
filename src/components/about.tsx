import Image from 'next/image';
import { SectionWrapper, SectionHeader, SectionTitle, SectionDescription } from './section-wrapper';
import { CardGlass } from './card-glass';

export function About() {
  return (
    <SectionWrapper id="about">
      <SectionHeader>
        <SectionTitle>About Me</SectionTitle>
        <SectionDescription>
          A brief introduction to who I am, my passions, and my journey in the world of technology.
        </SectionDescription>
      </SectionHeader>
      <div className="mx-auto max-w-5xl">
        <CardGlass>
          <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-12 p-8">
            <div className="relative mx-auto h-80 w-80 flex justify-center">
                <Image 
                  src="/Gemini_Generated_Image_tvqr2xtvqr2xtvqr.png"
                  alt="A portrait of Emmanuel Mawutor Coffie."
                  width={320}
                  height={320}
                  className="rounded-full border-4 border-white/20 shadow-lg object-cover"
                  data-ai-hint="professional portrait"
                />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <h3 className="font-headline text-2xl font-bold text-primary">
                Developer, Innovator, Problem-Solver
              </h3>
              <p className="text-muted-foreground">
                Hello! I'm Emmanuel Mawutor Coffie, a passionate developer with a knack for creating beautiful and functional digital products. My journey into tech started with a simple curiosity about how websites worked, and it has since evolved into a full-fledged passion for software engineering and user-centric design.
              </p>
              <p className="text-muted-foreground">
                I thrive on turning complex problems into simple, elegant solutions. Whether it's building a responsive front-end or designing a robust back-end, I'm always eager to learn new technologies and apply my skills to create meaningful impact.
              </p>
              <p className="text-muted-foreground">
                When I'm not coding, you can find me staying active as an athlete or reading a good book.
              </p>
            </div>
          </div>
        </CardGlass>
      </div>
    </SectionWrapper>
  );
}
