
import { useAccomplishmentStore } from "../store/accomplishments";
import { AccomplishmentCard } from "./AccomplishmentCard";
import { ScrollArea } from "./ui/scroll-area";

export const Timeline = () => {
  const {
    accomplishments,
    toggleSelected,
  } = useAccomplishmentStore();

  return (
    <div className="h-[calc(100vh-96px)] animate-fade-in">
      <ScrollArea className="h-[calc(100vh-220px)] px-4">
        <div className="relative space-y-0">
          {accomplishments.map((accomplishment) => (
            <AccomplishmentCard
              key={accomplishment.id}
              accomplishment={accomplishment}
              onSelect={toggleSelected}
              view="private"
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
