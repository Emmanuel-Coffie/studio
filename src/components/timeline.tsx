import { experienceData } from '@/lib/placeholder-data';
import { SectionWrapper, SectionHeader, SectionTitle, SectionDescription } from './section-wrapper';
import { CardGlass } from './card-glass';
import { Briefcase, GraduationCap, Trophy, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Timeline() {
  return (
    <SectionWrapper id="journey" className="bg-secondary/30">
      <SectionHeader>
        <SectionTitle>My Journey</SectionTitle>
        <SectionDescription>
          A timeline of my professional experience, education, and significant milestones.
        </SectionDescription>
      </SectionHeader>

      <div className="relative mx-auto max-w-4xl px-4">
        {/* Vertical Line */}
        <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20 md:left-1/2 md:-translate-x-1/2" />

        <div className="space-y-12">
          {experienceData.map((item, index) => {
            const isEven = index % 2 === 0;
            const Icon = item.type === 'work' ? Briefcase : item.type === 'education' ? GraduationCap : Trophy;

            return (
              <div key={item.id} className={cn(
                "relative flex flex-col md:flex-row md:items-center",
                isEven ? "md:flex-row-reverse" : ""
              )}>
                {/* Timeline Dot */}
                <div className="absolute left-4 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground md:left-1/2">
                  <Icon className="h-4 w-4" />
                </div>

                {/* Content Card */}
                <div className={cn(
                  "ml-10 w-full md:ml-0 md:w-[45%]",
                  isEven ? "md:text-left" : "md:text-right"
                )}>
                  <CardGlass className="hover:border-primary/50 transition-colors">
                    <div className={cn(
                      "mb-2 flex items-center gap-2 text-sm font-bold text-primary",
                      !isEven && "md:justify-end"
                    )}>
                      <Calendar className="h-4 w-4" />
                      {item.period}
                    </div>
                    <h3 className="font-headline text-xl font-bold text-foreground">{item.title}</h3>
                    <div className="text-sm font-medium text-accent mb-3">{item.organization}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardGlass>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
