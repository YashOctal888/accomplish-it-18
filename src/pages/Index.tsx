
import { Timeline } from "@/components/Timeline";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ResumePreview } from "@/components/ResumePreview";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { View } from "@/types/accomplishment";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

const Index = () => {
  const [view, setView] = useState<View>("private");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Accomplish It</h1>
            <div className="flex items-center gap-2">
              <Label htmlFor="view-mode" className="text-sm text-gray-600 flex items-center gap-2">
                {view === "private" ? (
                  <>
                    <EyeOff className="w-4 h-4" />
                    Private View
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    Public View
                  </>
                )}
              </Label>
              <Switch
                id="view-mode"
                checked={view === "public"}
                onCheckedChange={(checked) => setView(checked ? "public" : "private")}
              />
            </div>
          </div>
        </div>
      </header>
      <main className="h-[calc(100vh-64px)]">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={60} minSize={40}>
            <Timeline view={view} />
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
