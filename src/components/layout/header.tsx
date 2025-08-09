"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

type HeaderProps = {
  onAddIdea: () => void;
};

export function Header({ onAddIdea }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <a className="flex items-center gap-2" href="/">
            <Icons.logo className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold tracking-tight">IdeaFlow</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button onClick={onAddIdea} className="shadow-sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Idea
          </Button>
        </div>
      </div>
    </header>
  );
}
