
import { useAccomplishmentStore } from "../store/accomplishments";
import { AccomplishmentCard } from "./AccomplishmentCard";
import { ScrollArea } from "./ui/scroll-area";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState, useMemo } from "react";

export const Timeline = () => {
  const { accomplishments } = useAccomplishmentStore();
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("");

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
      const matchesCompany = !selectedCompany || accomplishment.company === selectedCompany;
      const matchesYear = !selectedYear || format(date, "yyyy") === selectedYear;
      const matchesMonth = !selectedMonth || format(date, "MM") === selectedMonth;
      const matchesTag = !selectedTag || accomplishment.tags?.includes(selectedTag);
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

  return (
    <div className="h-[calc(100vh-96px)] animate-fade-in">
      <div className="p-4 space-y-2 border-b">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Select value={selectedCompany} onValueChange={setSelectedCompany}>
            <SelectTrigger>
              <SelectValue placeholder="Company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Companies</SelectItem>
              {companies.map(company => (
                <SelectItem key={company} value={company}>
                  {company}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Years</SelectItem>
              {years.map(year => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger>
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Months</SelectItem>
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
            <SelectTrigger>
              <SelectValue placeholder="Tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Tags</SelectItem>
              {tags.map(tag => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-220px)] px-4">
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
                  view="private"
                />
              ))}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
