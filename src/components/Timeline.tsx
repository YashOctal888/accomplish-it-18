
import { useAccomplishmentStore } from "../store/accomplishments";
import { AccomplishmentCard } from "./AccomplishmentCard";
import { ScrollArea } from "./ui/scroll-area";
import { format } from "date-fns";
import { View } from "@/types/accomplishment";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

interface TimelineProps {
  view?: View;
}

export const Timeline = ({ view = "private" }: TimelineProps) => {
  const { accomplishments } = useAccomplishmentStore();
  const [selectedCompany, setSelectedCompany] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");

  // Get unique companies
  const companies = useMemo(() => {
    return Array.from(new Set(accomplishments.map(a => a.company))).sort();
  }, [accomplishments]);

  // Get unique years
  const years = useMemo(() => {
    return Array.from(new Set(accomplishments.map(a => format(new Date(a.date), "yyyy")))).sort().reverse();
  }, [accomplishments]);

  // Get all unique tags
  const tags = useMemo(() => {
    const allTags = accomplishments.flatMap(a => a.tags || []);
    return Array.from(new Set(allTags)).sort();
  }, [accomplishments]);

  // Filter accomplishments
  const filteredAccomplishments = useMemo(() => {
    return accomplishments.filter(accomplishment => {
      const date = new Date(accomplishment.date);
      const matchesCompany = selectedCompany === "all" || accomplishment.company === selectedCompany;
      const matchesYear = selectedYear === "all" || format(date, "yyyy") === selectedYear;
      const matchesMonth = selectedMonth === "all" || format(date, "MM") === selectedMonth;
      const matchesTag = selectedTag === "all" || accomplishment.tags?.includes(selectedTag);
      return matchesCompany && matchesYear && matchesMonth && matchesTag;
    });
  }, [accomplishments, selectedCompany, selectedYear, selectedMonth, selectedTag]);

  // Group filtered accomplishments by month and year
  const groupedAccomplishments = filteredAccomplishments.reduce((groups, accomplishment) => {
    const date = new Date(accomplishment.date);
    const key = format(date, "MMMM yyyy");
    
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(accomplishment);
    return groups;
  }, {} as Record<string, typeof accomplishments>);

  const selectTriggerClassName = "h-8 bg-white border border-[#8E9196] hover:bg-gray-50 hover:border-gray-400 transition-colors text-sm font-medium";

  return (
    <div className="h-[calc(100vh-96px)] animate-fade-in bg-white">
      {view === "private" && (
        <div className="p-4 space-y-2 border-b">
          <div className="flex flex-wrap gap-2">
            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger className={cn("w-auto min-w-28", selectTriggerClassName)}>
                <SelectValue placeholder="Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Companies</SelectItem>
                {companies.map(company => (
                  <SelectItem key={company} value={company}>
                    {company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className={cn("w-auto min-w-24", selectTriggerClassName)}>
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {years.map(year => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className={cn("w-auto min-w-24", selectTriggerClassName)}>
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Months</SelectItem>
                {Array.from({ length: 12 }, (_, i) => {
                  const month = (i + 1).toString().padStart(2, '0');
                  return (
                    <SelectItem key={month} value={month}>
                      {format(new Date(2024, i, 1), "MMMM")}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger className={cn("w-auto min-w-24", selectTriggerClassName)}>
                <SelectValue placeholder="Tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                {tags.map(tag => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <ScrollArea className={cn("px-4", view === "private" ? "h-[calc(100vh-180px)]" : "h-[calc(100vh-96px)]")}>
        <div className="relative space-y-0">
          {Object.entries(groupedAccomplishments).map(([dateGroup, items]) => (
            <div key={dateGroup}>
              <div className="flex items-center gap-2 py-4 pl-4 sm:pl-6">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-xs font-medium text-gray-500">{dateGroup}</span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>
              {items.map((accomplishment) => (
                <AccomplishmentCard
                  key={accomplishment.id}
                  accomplishment={accomplishment}
                  view={view}
                />
              ))}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
