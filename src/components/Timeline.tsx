
import { useAccomplishmentStore } from "../store/accomplishments";
import { AccomplishmentCard } from "./AccomplishmentCard";
import { Button } from "./ui/button";
import { Share2, Linkedin, FileText, Plus } from "lucide-react";
import { Switch } from "./ui/switch";
import { toast } from "./ui/use-toast";
import { ScrollArea } from "./ui/scroll-area";

export const Timeline = () => {
  const {
    accomplishments,
    view,
    setView,
    toggleSelected,
    getSelectedAccomplishments,
    clearSelection,
  } = useAccomplishmentStore();

  const handleShare = (type: "private" | "public") => {
    // In a real app, this would generate a unique sharing link
    const shareUrl = `${window.location.origin}/share/${type}/${Math.random().toString(36).slice(2)}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link copied!",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} link has been copied to clipboard.`,
    });
  };

  const handleExport = (platform: "resume" | "linkedin") => {
    const selected = getSelectedAccomplishments();
    if (selected.length === 0) {
      toast({
        title: "No accomplishments selected",
        description: "Please select at least one accomplishment to export.",
        variant: "destructive",
      });
      return;
    }
    // In a real app, this would format and export the accomplishments
    toast({
      title: "Export successful!",
      description: `${selected.length} accomplishments exported to ${platform}.`,
    });
    clearSelection();
  };

  const handleAddAccomplishment = () => {
    // In a real app, this would open a form to add a new accomplishment
    toast({
      title: "Coming soon!",
      description: "The ability to add accomplishments will be available soon.",
    });
  };

  return (
    <div className="h-[calc(100vh-96px)] animate-fade-in">
      <div className="flex items-center justify-between mb-4 px-4">
        <Button
          onClick={handleAddAccomplishment}
          className="bg-accent hover:bg-accent/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Accomplishment
        </Button>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Public</span>
          <Switch
            checked={view === "private"}
            onCheckedChange={(checked) => setView(checked ? "private" : "public")}
          />
          <span className="text-sm font-medium">Private</span>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-2 mb-4 px-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare("private")}
        >
          <Share2 className="w-4 h-4 mr-2" />
          Private Link
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare("public")}
        >
          <Share2 className="w-4 h-4 mr-2" />
          Public Link
        </Button>
      </div>

      {view === "private" && (
        <div className="flex items-center justify-end space-x-2 mb-4 px-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleExport("resume")}
          >
            <FileText className="w-4 h-4 mr-2" />
            Export to Resume
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleExport("linkedin")}
          >
            <Linkedin className="w-4 h-4 mr-2" />
            Export to LinkedIn
          </Button>
        </div>
      )}

      <ScrollArea className="h-[calc(100vh-220px)] px-4">
        <div className="relative space-y-0">
          {accomplishments.map((accomplishment) => (
            <AccomplishmentCard
              key={accomplishment.id}
              accomplishment={accomplishment}
              view={view}
              onSelect={view === "private" ? toggleSelected : undefined}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
