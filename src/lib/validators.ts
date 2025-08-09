import { z } from "zod";

export const categories = ["No-Code", "AI", "Web", "Mobile", "Other"] as const;
export const statuses = ["Planned", "In Progress", "Completed", "On Hold"] as const;

export const ideaSchema = z.object({
  id: z.string(),
  name: z.string().min(3, "Name must be at least 3 characters long."),
  description: z.string().min(10, "Description must be at least 10 characters long."),
  targetAudience: z.string().min(3, "Target audience must be specified."),
  keyFeatures: z.string().min(10, "Key features must be at least 10 characters long."),
  categories: z.array(z.enum(categories)).min(1, "Please select at least one category."),
  status: z.enum(statuses),
  createdAt: z.date(),
});

export const addIdeaSchema = ideaSchema.omit({ id: true, createdAt: true });

export const aiKeywordsSchema = z.object({
  keywords: z.string().min(3, "Please enter at least one keyword."),
});
