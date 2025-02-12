
import { Timeline } from "@/components/Timeline";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ResumePreview } from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const handleAddAccomplishment = () => {
    // In a real app, this would open a form to add a new accomplishment
    toast({
      title: "Coming soon!",
      description: "The ability to add accomplishments will be available soon.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Accomplish It</h1>
          <Button
            onClick={handleAddAccomplishment}
            className="bg-accent hover:bg-accent/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Accomplishment
          </Button>
        </div>
      </header>
      <main className="h-[calc(100vh-64px)]">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={60} minSize={40}>
            <Timeline />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={40} minSize={30}>
            <ResumePreview />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
};

export default Index;
