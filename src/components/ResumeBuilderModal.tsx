
import { Timeline } from "@/components/Timeline";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ResumePreview } from "@/components/ResumePreview";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResumeBuilderModalProps {
  onClose: () => void;
}

export const ResumeBuilderModal = ({ onClose }: ResumeBuilderModalProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="flex h-14 items-center justify-between px-4 max-w-7xl mx-auto">
          <div className="font-semibold">Create New Resume</div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="h-[calc(100vh-56px)]">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={60} minSize={40}>
            <Timeline />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={40} minSize={30}>
            <ResumePreview />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
