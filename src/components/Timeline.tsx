
import { useAccomplishmentStore } from "../store/accomplishments";
import { AccomplishmentCard } from "./AccomplishmentCard";
import { ScrollArea } from "./ui/scroll-area";
import { format } from "date-fns";

export const Timeline = () => {
  const { accomplishments } = useAccomplishmentStore();

  // Group accomplishments by month and year
  const groupedAccomplishments = accomplishments.reduce((groups, accomplishment) => {
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
