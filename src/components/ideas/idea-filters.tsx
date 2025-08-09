"use client";

import type { Category, Status } from "@/lib/types";
import { categories, statuses } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, SlidersHorizontal, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";

type IdeaFiltersProps = {
  status: Status | "all";
  onStatusChange: (status: Status | "all") => void;
  selectedCategories: Category[];
  onCategoryChange: (category: Category, checked: boolean) => void;
  sortBy: "name" | "date";
  onSortByChange: (sortBy: "name" | "date") => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
};

export function IdeaFilters({
  status,
  onStatusChange,
  selectedCategories,
  onCategoryChange,
  sortBy,
  onSortByChange,
  onClearFilters,
  hasActiveFilters,
}: IdeaFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center p-4 bg-card rounded-lg border shadow-sm">
      <div className="flex gap-2 items-center flex-wrap">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex-shrink-0">
              Status: <span className="font-semibold ml-1.5 capitalize">{status}</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup
              value={status}
              onValueChange={(value) => onStatusChange(value as Status | "all")}
            >
              <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
              {statuses.map((s) => (
                <DropdownMenuRadioItem key={s} value={s}>
                  {s}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex-shrink-0">
              Categories
              {selectedCategories.length > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-primary-foreground bg-primary rounded-full">
                  {selectedCategories.length}
                </span>
              )}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-4" align="start">
            <div className="space-y-4">
              <p className="font-semibold text-sm">Filter by category</p>
              <div className="space-y-2">
                {categories.map((c) => (
                  <div key={c} className="flex items-center space-x-2">
                    <Checkbox
                      id={c}
                      checked={selectedCategories.includes(c)}
                      onCheckedChange={(checked) => onCategoryChange(c, !!checked)}
                    />
                    <Label htmlFor={c} className="font-normal">
                      {c}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex gap-2 items-center sm:ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              Sort by: <span className="font-semibold ml-1.5 capitalize">{sortBy}</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuRadioGroup value={sortBy} onValueChange={(value) => onSortByChange(value as "name" | "date")}>
              <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        {hasActiveFilters && (
          <Button variant="ghost" size="icon" onClick={onClearFilters} title="Clear filters">
            <Trash2 className="h-4 w-4 text-muted-foreground" />
          </Button>
        )}
      </div>
    </div>
  );
}
