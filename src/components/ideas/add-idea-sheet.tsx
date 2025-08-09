"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { AIGeneratorDialog } from "./ai-generator-dialog";
import { addIdeaSchema, categories, statuses } from "@/lib/validators";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Wand2 } from "lucide-react";
import type { Idea } from "@/lib/types";

type AddIdeaFormValues = z.infer<typeof addIdeaSchema>;

type AddIdeaSheetProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onAddIdea: (idea: AddIdeaFormValues) => void;
};

export function AddIdeaSheet({ isOpen, onOpenChange, onAddIdea }: AddIdeaSheetProps) {
  const [isAiDialogOpen, setIsAiDialogOpen] = useState(false);

  const form = useForm<AddIdeaFormValues>({
    resolver: zodResolver(addIdeaSchema),
    defaultValues: {
      name: "",
      description: "",
      targetAudience: "",
      keyFeatures: "",
      categories: [],
      status: "Planned",
    },
  });

  function onSubmit(values: AddIdeaFormValues) {
    onAddIdea(values);
    form.reset();
  }
  
  function handleIdeaGenerated(name: string, description: string) {
    form.setValue("name", name, { shouldValidate: true });
    form.setValue("description", description, { shouldValidate: true });
    setIsAiDialogOpen(false);
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent className="sm:max-w-lg w-full flex flex-col">
          <SheetHeader>
            <SheetTitle>Add a New Idea</SheetTitle>
            <SheetDescription>
              Fill out the details of your new project concept. Use the AI generator for a creative boost!
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full pr-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <Button type="button" variant="outline" className="w-full" onClick={() => setIsAiDialogOpen(true)}>
                    <Wand2 className="mr-2 h-4 w-4 text-primary" />
                    Generate with AI
                  </Button>

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>App Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., AI-Powered Meal Planner" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Describe your app idea in a few sentences." {...field} rows={4} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                   <FormField
                    control={form.control}
                    name="targetAudience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Audience</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Busy professionals, students" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                   <FormField
                    control={form.control}
                    name="keyFeatures"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Key Features</FormLabel>
                        <FormControl>
                          <Textarea placeholder="List the main features, separated by commas." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="categories"
                    render={() => (
                      <FormItem>
                        <FormLabel>Categories</FormLabel>
                        <div className="space-y-2">
                          {categories.map((item) => (
                            <FormField
                              key={item}
                              control={form.control}
                              name="categories"
                              render={({ field }) => {
                                return (
                                  <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), item])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">{item}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {statuses.map((status) => (
                              <SelectItem key={status} value={status}>{status}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <SheetFooter className="pt-4">
                    <SheetClose asChild>
                      <Button type="button" variant="outline">Cancel</Button>
                    </SheetClose>
                    <Button type="submit">Save Idea</Button>
                  </SheetFooter>
                </form>
              </Form>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
      <AIGeneratorDialog 
        isOpen={isAiDialogOpen}
        onOpenChange={setIsAiDialogOpen}
        onIdeaGenerated={handleIdeaGenerated}
      />
    </>
  );
}
