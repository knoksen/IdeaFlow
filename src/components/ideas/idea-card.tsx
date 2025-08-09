import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";
import type { Idea } from "@/lib/types";
import { formatDistanceToNow } from 'date-fns';

export function IdeaCard({ idea }: { idea: Idea }) {
  const StatusIcon = Icons[idea.status.toLowerCase().replace(' ', '') as keyof typeof Icons] || Icons.planned;

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 bg-card">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-xl">{idea.name}</CardTitle>
            <Badge 
              className="flex-shrink-0"
              variant={idea.status === 'Completed' ? 'default' : 'secondary'}
            >
              <StatusIcon className="h-4 w-4 mr-2" />
              {idea.status}
            </Badge>
        </div>
        <CardDescription>
          Added {formatDistanceToNow(new Date(idea.createdAt), { addSuffix: true })}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4 text-sm">
        <div>
          <h4 className="font-semibold mb-1 text-card-foreground/90">Description</h4>
          <p className="text-muted-foreground line-clamp-3">{idea.description}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-1 text-card-foreground/90">Target Audience</h4>
          <p className="text-muted-foreground line-clamp-2">{idea.targetAudience}</p>
        </div>
         <div>
          <h4 className="font-semibold mb-1 text-card-foreground/90">Key Features</h4>
          <p className="text-muted-foreground line-clamp-2">{idea.keyFeatures}</p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-wrap gap-2">
          {idea.categories.map(category => (
            <Badge key={category} variant="outline">{category}</Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
