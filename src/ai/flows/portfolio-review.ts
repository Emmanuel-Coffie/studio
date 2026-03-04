// This file is machine-generated - edit with caution!
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
  feedback: z.string().describe('The feedback on the portfolio presentation.'),
  suggestions: z
    .string()
    .describe(
      'The suggestions for improving the portfolio based on industry best practices, design principles, and UX guidelines.'
    ),
});
export type PortfolioReviewOutput = z.infer<typeof PortfolioReviewOutputSchema>;

export async function portfolioReview(input: PortfolioReviewInput): Promise<PortfolioReviewOutput> {
  return portfolioReviewFlow(input);
}

const prompt = ai.definePrompt({
  name: 'portfolioReviewPrompt',
  input: {schema: PortfolioReviewInputSchema},
  output: {schema: PortfolioReviewOutputSchema},
  prompt: `You are an elite portfolio consultant and design critic specializing in high-end tech portfolios. 
  Your goal is to provide a comprehensive, constructive, and inspiring review of a professional portfolio based on its description.

  Portfolio Description: {{{portfolioDescription}}}

  Please structure your output into two clear parts:
  1. Feedback: A thoughtful analysis of the current presentation, highlighting strengths and identifying areas that lack clarity or impact.
  2. Suggestions: Actionable, high-level advice on UX, visual design, and content strategy to elevate the portfolio to industry-leading standards.

  Be professional, encouraging, and specific. Use professional design terminology where appropriate.`,
});

const portfolioReviewFlow = ai.defineFlow(
  {
    name: 'portfolioReviewFlow',
    inputSchema: PortfolioReviewInputSchema,
    outputSchema: PortfolioReviewOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
