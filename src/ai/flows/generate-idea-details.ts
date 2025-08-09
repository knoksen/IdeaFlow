'use server';

/**
 * @fileOverview AI-powered name and description generator for app ideas.
 *
 * - generateIdeaDetails - A function that generates a creative app name and description from keywords.
 * - GenerateIdeaDetailsInput - The input type for the generateIdeaDetails function.
 * - GenerateIdeaDetailsOutput - The return type for the generateIdeaDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateIdeaDetailsInputSchema = z.object({
  keywords: z
    .string()
    .describe('A comma-separated list of keywords related to the app idea.'),
});
export type GenerateIdeaDetailsInput = z.infer<typeof GenerateIdeaDetailsInputSchema>;

const GenerateIdeaDetailsOutputSchema = z.object({
  name: z.string().describe('A creative name for the app idea.'),
  description: z.string().describe('A detailed description of the app idea.'),
  progress: z.string().describe('Summary of the idea generation process')
});
export type GenerateIdeaDetailsOutput = z.infer<typeof GenerateIdeaDetailsOutputSchema>;

export async function generateIdeaDetails(
  input: GenerateIdeaDetailsInput
): Promise<GenerateIdeaDetailsOutput> {
  return generateIdeaDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateIdeaDetailsPrompt',
  input: {schema: GenerateIdeaDetailsInputSchema},
  output: {schema: GenerateIdeaDetailsOutputSchema},
  prompt: `You are a creative app idea generator. Generate a creative name and detailed description for an app based on the following keywords: {{{keywords}}}.\n
  Make sure that the outputted JSON is valid and can be parsed by Typescript.
  Include a progress field in the outputted JSON.`, // Adding instructions about JSON output.
});

const generateIdeaDetailsFlow = ai.defineFlow(
  {
    name: 'generateIdeaDetailsFlow',
    inputSchema: GenerateIdeaDetailsInputSchema,
    outputSchema: GenerateIdeaDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
