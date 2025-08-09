"use server";

import { generateIdeaDetails } from "@/ai/flows/generate-idea-details";
import { aiKeywordsSchema } from "@/lib/validators";

export async function generateIdeaDetailsAction(formData: FormData) {
  const keywords = formData.get("keywords");

  const validation = aiKeywordsSchema.safeParse({ keywords });

  if (!validation.success) {
    return { success: false, error: validation.error.flatten().fieldErrors };
  }

  try {
    const result = await generateIdeaDetails({ keywords: validation.data.keywords });
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
    return { success: false, error: { _errors: [errorMessage] } };
  }
}
