
import { useAccomplishmentStore } from "../store/accomplishments";
import { AccomplishmentCard } from "./AccomplishmentCard";
import { Button } from "./ui/button";
import { Share2 } from "lucide-react";
import { toast } from "./ui/use-toast";
import { ScrollArea } from "./ui/scroll-area";

export const Timeline = () => {
  const {
    accomplishments,
    toggleSelected,
  } = useAccomplishmentStore();

  const handleShare = () => {
    // In a real app, this would generate a unique sharing link
    const shareUrl = `${window.location.origin}/share/${Math.random().toString(36).slice(2)}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link copied!",
      description: "Link has been copied to clipboard.",
    });
  };

  return (
    <div className="h-[calc(100vh-96px)] animate-fade-in">
      <div className="flex items-center justify-end space-x-2 mb-4 px-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleShare}
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Link
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-220px)] px-4">
        <div className="relative space-y-0">
          {accomplishments.map((accomplishment) => (
            <AccomplishmentCard
              key={accomplishment.id}
              accomplishment={accomplishment}
              onSelect={toggleSelected}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
