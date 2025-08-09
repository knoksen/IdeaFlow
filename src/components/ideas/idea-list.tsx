import type { Idea } from "@/lib/types";
import { IdeaCard } from "./idea-card";

export function IdeaList({ ideas }: { ideas: Idea[] }) {
  if (ideas.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed rounded-lg bg-card">
        <h3 className="text-xl font-semibold">No ideas found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your filters or adding a new idea!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} />
      ))}
    </div>
  );
}
