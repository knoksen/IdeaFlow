"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { generateIdeaDetailsAction } from "@/app/actions";
import { aiKeywordsSchema } from "@/lib/validators";
import { Loader2, Wand2 } from "lucide-react";
import { Textarea } from "../ui/textarea";

type AIFormValues = z.infer<typeof aiKeywordsSchema>;
type AIGeneratorDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onIdeaGenerated: (name: string, description: string) => void;
};

export function AIGeneratorDialog({ isOpen, onOpenChange, onIdeaGenerated }: AIGeneratorDialogProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<AIFormValues>({
    resolver: zodResolver(aiKeywordsSchema),
    defaultValues: {
      keywords: "",
    },
  });

  const onSubmit = (values: AIFormValues) => {
    const formData = new FormData();
    formData.append("keywords", values.keywords);

    startTransition(async () => {
      const result = await generateIdeaDetailsAction(formData);
      if (result.success && result.data) {
        onIdeaGenerated(result.data.name, result.data.description);
        toast({
          title: "Success!",
          description: "AI has generated a name and description for you.",
        });
        form.reset();
      } else {
        const errorMsg = result.error?._errors?.join(", ") || "Failed to generate idea details.";
        toast({
          variant: "destructive",
          title: "Error",
          description: errorMsg,
        });
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-primary" />
            AI Idea Generator
          </DialogTitle>
          <DialogDescription>
            Enter a few keywords (e.g., "social media for dogs") and let AI generate a creative name and description for your app.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keywords</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., fitness tracker, gamification, social challenges" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
