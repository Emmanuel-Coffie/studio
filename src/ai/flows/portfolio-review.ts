'use server';
/**
 * @fileOverview A portfolio review AI agent.
 *
 * - portfolioReview - A function that handles the portfolio review process.
 * - PortfolioReviewInput - The input type for the portfolioReview function.
 * - PortfolioReviewOutput - The return type for the portfolioReview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PortfolioReviewInputSchema = z.object({
  portfolioDescription: z
    .string()
    .describe('The description of the portfolio to be reviewed.'),
});
export type PortfolioReviewInput = z.infer<typeof PortfolioReviewInputSchema>;

const PortfolioReviewOutputSchema = z.object({
  feedback: z.string().describe('The professional feedback on the portfolio presentation.'),
  suggestions: z
    .string()
    .describe(
      'Actionable suggestions for improving the portfolio based on industry best practices, design principles, and UX guidelines.'
    ),
});
export type PortfolioReviewOutput = z.infer<typeof PortfolioReviewOutputSchema>;

export async function portfolioReview(input: PortfolioReviewInput): Promise<PortfolioReviewOutput> {
  return portfolioReviewFlow(input);
}

const prompt = ai.definePrompt({
  name: 'portfolioReviewPrompt',
  model: 'googleai/gemini-1.5-flash-latest',
  input: {schema: PortfolioReviewInputSchema},
  output: {schema: PortfolioReviewOutputSchema},
  prompt: `You are an elite Creative Director and UX Strategist at a top-tier design agency. 
  Your goal is to provide a comprehensive, high-level, and constructive review of a professional portfolio based on its description.

  Portfolio Context: {{{portfolioDescription}}}

  Please structure your output into two highly professional and encouraging parts:
  1. Feedback: A thoughtful analysis of the current presentation. Focus on brand identity, visual hierarchy, and the emotional resonance of the design.
  2. Suggestions: Actionable, strategic advice to elevate the portfolio to industry-leading standards. Focus on user flow, conversion (getting hired), and content strategy.

  Tone: Expert, inspiring, and direct. Use professional terminology (e.g., whitespace, typography, accessibility, conversion path).`,
});

const portfolioReviewFlow = ai.defineFlow(
  {
    name: 'portfolioReviewFlow',
    inputSchema: PortfolioReviewInputSchema,
    outputSchema: PortfolioReviewOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('The AI failed to generate a response. This can happen if the input is too brief or violates safety guidelines.');
    }
    return output;
  }
);
