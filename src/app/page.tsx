"use client";

import { useState, useMemo, useCallback } from "react";
import type { Idea, Category, Status } from "@/lib/types";
import { Header } from "@/components/layout/header";
import { AddIdeaSheet } from "@/components/ideas/add-idea-sheet";
import { IdeaList } from "@/components/ideas/idea-list";
import { IdeaFilters } from "@/components/ideas/idea-filters";
import { useToast } from "@/hooks/use-toast";

const initialIdeas: Idea[] = [
  {
    id: '1',
    name: 'AI-Powered Meal Planner',
    description: 'A mobile app that generates weekly meal plans based on user dietary preferences, allergies, and available ingredients. It uses AI to optimize for nutrition and reduce food waste.',
    targetAudience: 'Health-conscious individuals, busy families, and people looking to save money on groceries.',
    keyFeatures: 'AI-driven recommendations, recipe database, grocery list generation, pantry tracking.',
    categories: ['AI', 'Mobile'],
    status: 'Planned',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
  {
    id: '2',
    name: 'No-Code Website Builder for Artists',
    description: 'A web platform that allows artists to create stunning portfolio websites without writing any code. Focus on visual-first templates and easy integration with platforms like Instagram and Etsy.',
    targetAudience: 'Photographers, illustrators, designers, and other visual artists.',
    keyFeatures: 'Drag-and-drop editor, beautiful templates, e-commerce integration, social media feeds.',
    categories: ['No-Code', 'Web'],
    status: 'In Progress',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
  },
  {
    id: '3',
    name: 'Community Skill-Sharing App',
    description: 'A platform to connect people in a local community for skill sharing. Users can offer lessons or request help on anything from coding to gardening.',
    targetAudience: 'Local communities, lifelong learners, hobbyists.',
    keyFeatures: 'User profiles, skill listings, scheduling, in-app messaging, reviews and ratings.',
    categories: ['Web', 'Mobile'],
    status: 'Completed',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
  },
  {
    id: '4',
    name: 'Gamified Language Learning',
    description: 'An interactive mobile app that makes learning a new language fun through games, challenges, and a compelling storyline.',
    targetAudience: 'Students, travelers, and anyone interested in learning a new language.',
    keyFeatures: 'Gamification, leaderboards, personalized learning paths, chatbot for practice.',
    categories: ['Mobile', 'AI'],
    status: 'On Hold',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
  },
];

export default function Home() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [ideas, setIdeas] = useState<Idea[]>(initialIdeas);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [filteredStatus, setFilteredStatus] = useState<Status | "all">("all");
  const [sortBy, setSortBy] = useState<"name" | "date">("date");
  const { toast } = useToast();

  const handleAddIdea = useCallback((newIdea: Omit<Idea, "id" | "createdAt">) => {
    const ideaWithMetadata: Idea = {
      ...newIdea,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setIdeas((prev) => [ideaWithMetadata, ...prev]);
    setIsSheetOpen(false);
    toast({
      title: "Idea Added!",
      description: `"${ideaWithMetadata.name}" has been added to your list.`,
    });
  }, [toast]);

  const onCategoryChange = useCallback((category: Category, checked: boolean) => {
    setFilteredCategories(prev => 
      checked ? [...prev, category] : prev.filter(c => c !== category)
    );
  }, []);

  const filteredIdeas = useMemo(() => {
    return ideas
      .filter((idea) => {
        if (filteredStatus === "all") return true;
        return idea.status === filteredStatus;
      })
      .filter((idea) => {
        if (filteredCategories.length === 0) return true;
        return filteredCategories.every((cat) => idea.categories.includes(cat));
      })
      .sort((a, b) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [ideas, filteredStatus, filteredCategories, sortBy]);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header onAddIdea={() => setIsSheetOpen(true)} />
      <main className="flex-1 container py-8">
        <div className="space-y-8">
          <div className="text-center px-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Your App Ideas</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Browse, filter, and manage your next big projects.
            </p>
          </div>
          <IdeaFilters
            status={filteredStatus}
            onStatusChange={setFilteredStatus}
            selectedCategories={filteredCategories}
            onCategoryChange={onCategoryChange}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            onClearFilters={() => {
              setFilteredCategories([]);
              setFilteredStatus("all");
            }}
            hasActiveFilters={filteredCategories.length > 0 || filteredStatus !== 'all'}
          />
          <IdeaList ideas={filteredIdeas} />
        </div>
      </main>
      <AddIdeaSheet
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        onAddIdea={handleAddIdea}
      />
    </div>
  );
}
