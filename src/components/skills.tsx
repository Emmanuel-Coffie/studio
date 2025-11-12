import { skillsData } from '@/lib/placeholder-data';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { SectionWrapper, SectionHeader, SectionTitle, SectionDescription } from './section-wrapper';

export function Skills() {
  return (
    <SectionWrapper id="skills">
      <SectionHeader>
        <SectionTitle>Technical Skills</SectionTitle>
        <SectionDescription>
          A summary of my technical abilities and areas of expertise, with a visual representation of my proficiency.
        </SectionDescription>
      </SectionHeader>
      <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {skillsData.map((category) => (
          <Card key={category.category} className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline text-xl">{category.category}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-6">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-1 flex justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} aria-label={`${skill.name} proficiency`} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
