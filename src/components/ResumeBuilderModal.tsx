
import { Timeline } from "@/components/Timeline";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ResumePreview } from "@/components/ResumePreview";
import { LinkedInPreview } from "@/components/LinkedInPreview";
import { PerformanceReviewPreview } from "@/components/PerformanceReviewPreview";
import { OneOnOnePreview } from "@/components/OneOnOnePreview";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type ArtifactType = 'resume' | 'linkedin' | 'performance-review' | '1:1';

interface ResumeBuilderModalProps {
  onClose: () => void;
  type?: ArtifactType;
}

export const ResumeBuilderModal = ({ onClose, type = 'resume' }: ResumeBuilderModalProps) => {
  const getPreviewComponent = () => {
    switch (type) {
      case 'linkedin':
        return <LinkedInPreview />;
      case 'performance-review':
        return <PerformanceReviewPreview />;
      case '1:1':
        return <OneOnOnePreview />;
      case 'resume':
      default:
        return <ResumePreview />;
    }
  };

  const getModalTitle = () => {
    switch (type) {
      case 'linkedin':
        return 'Create LinkedIn Update';
      case 'performance-review':
        return 'Create Performance Review';
      case '1:1':
        return 'Create 1:1 Notes';
      case 'resume':
      default:
        return 'Create New Resume';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <div className="border-b">
        <div className="flex h-14 items-center justify-between px-4 max-w-7xl mx-auto">
          <div className="font-semibold">
            {getModalTitle()}
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="h-[calc(100vh-56px)]">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={60} minSize={40}>
            <Timeline />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={40} minSize={30}>
            {getPreviewComponent()}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
