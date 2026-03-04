'use server';
/**
 * @fileOverview AI Project Catalyst - Architects project ideas into technical roadmaps.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProjectCatalystInputSchema = z.object({
  projectIdea: z.string().describe('The core idea or vision for the project.'),
});
export type ProjectCatalystInput = z.infer<typeof ProjectCatalystInputSchema>;

const ProjectCatalystOutputSchema = z.object({
  techStack: z.array(z.string()).describe('Recommended technologies (e.g., Next.js, Firebase).'),
  mvpFeatures: z.array(z.string()).describe('Core features required for a Minimum Viable Product.'),
  roadmap: z.array(z.object({
    week: z.string(),
    goals: z.string()
  })).describe('A 4-week high-level development roadmap.'),
  architectureNote: z.string().describe('A brief note on the overall architectural strategy.'),
});
export type ProjectCatalystOutput = z.infer<typeof ProjectCatalystOutputSchema>;

export async function projectCatalyst(input: ProjectCatalystInput): Promise<ProjectCatalystOutput> {
  return projectCatalystFlow(input);
}

const prompt = ai.definePrompt({
  name: 'projectCatalystPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: {schema: ProjectCatalystInputSchema},
  output: {schema: ProjectCatalystOutputSchema},
  prompt: `You are a world-class CTO and Software Architect. 
  A developer has come to you with a project idea: "{{{projectIdea}}}"

  Your task is to architect this project into a professional reality. 
  
  Please provide:
  1. A modern, efficient tech stack tailored to this specific idea.
  2. The most critical features for an MVP (focus on speed to market and core value).
  3. A concise 4-week roadmap to get from zero to a working prototype.
  4. A brief architectural insight (e.g., serverless, monolithic vs microservices, database choice).

  Be precise, modern, and inspiring. Use current industry best practices.`,
});

const projectCatalystFlow = ai.defineFlow(
  {
    name: 'projectCatalystFlow',
    inputSchema: ProjectCatalystInputSchema,
    outputSchema: ProjectCatalystOutputSchema,
  },
  async input => {
    try {
      const {output} = await prompt(input);
      if (!output) {
        throw new Error('Architect failed to generate a response.');
      }
      return output;
    } catch (error: any) {
      console.error('Genkit Flow Error:', error);
      throw error;
    }
  }
);
