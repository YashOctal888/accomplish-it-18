
import { Timeline } from "@/components/Timeline";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ResumePreview } from "@/components/ResumePreview";

const ResumeBuilder = () => {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <main className="h-screen">
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

export default ResumeBuilder;

