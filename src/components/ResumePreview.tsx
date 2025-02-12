import { useAccomplishmentStore } from "@/store/accomplishments";
import { format } from "date-fns";
import { FileText, Maximize2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "./ui/use-toast";
import { Separator } from "./ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";

export const ResumePreview = () => {
  const { getSelectedAccomplishments } = useAccomplishmentStore();
  const selectedAccomplishments = getSelectedAccomplishments();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const handleExport = () => {
    if (selectedAccomplishments.length === 0) {
      toast({
        title: "No accomplishments selected",
        description: "Please select at least one accomplishment to export.",
        variant: "destructive",
      });
      return;
    }
    // Add resume-specific export logic here
  };

  const ExportModal = () => (
    <Dialog open={showExportModal} onOpenChange={setShowExportModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export Resume</DialogTitle>
          <DialogDescription>
            Your resume is ready to be exported. You can download it or copy the content.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="rounded-lg border bg-gray-50 p-4">
            <h3 className="font-medium text-gray-900 mb-2">Experience</h3>
            {selectedAccomplishments.map((accomplishment) => (
              <div key={accomplishment.id} className="mb-2">
                <p className="text-sm text-gray-700">{accomplishment.role} at {accomplishment.company}</p>
                <p className="text-sm text-gray-600">{accomplishment.title}</p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  if (selectedAccomplishments.length === 0) {
    return (
      <div className="p-6 h-full flex items-center justify-center text-center">
        <div className="text-gray-500">
          <p className="text-lg font-medium mb-2">Resume Preview</p>
          <p className="text-sm">Select accomplishments from the timeline to create your resume</p>
        </div>
      </div>
    );
  }

  const content = (
    <div className="max-w-3xl mx-auto space-y-12">
      <div className="space-y-4">
        <h1 className="text-[42px] font-bold text-gray-900 leading-tight">John Doe</h1>
        <div className="flex items-center gap-2 text-lg text-gray-600">
          <span>Digital Product Designer</span>
          <span className="text-gray-300">|</span>
          <span>johndoe.design</span>
        </div>
        <p className="text-gray-500 text-lg leading-relaxed">
          I build products that delight customers through a blend of frontend engineering and design experiences. 
          My speciality lies in consumer-facing fintech products.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-12">
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Experience</h2>
            <div className="space-y-10">
              {selectedAccomplishments.map((accomplishment) => (
                <div key={accomplishment.id} className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">{accomplishment.company}</h3>
                  <div className="flex items-baseline gap-2 text-gray-500">
                    <span className="font-medium">{accomplishment.role}</span>
                    <span>|</span>
                    <span>{format(new Date(accomplishment.date), "yyyy")} - Present</span>
                  </div>
                  <ul className="mt-4 space-y-2">
                    <li className="text-gray-600">• {accomplishment.title}</li>
                    {accomplishment.description && (
                      <li className="text-gray-600">• {accomplishment.description}</li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Education</h2>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">Purdue University</h3>
              <p className="text-gray-500">Computer Science - Software Design</p>
              <p className="text-gray-500">Graphic Communications</p>
              <p className="text-gray-500">2009 - 2013</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Achievements</h2>
            <div className="space-y-2">
              {selectedAccomplishments
                .filter(acc => acc.tags?.includes('highlight'))
                .map((accomplishment) => (
                  <p key={accomplishment.id} className="text-gray-600">{accomplishment.title}</p>
                ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(selectedAccomplishments.flatMap(acc => acc.tags || []))).map((tag, index) => (
                <span
                  key={index}
                  className="text-gray-600"
                >
                  {tag}
                  {index < selectedAccomplishments.flatMap(acc => acc.tags || []).length - 1 && ", "}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  if (isFullScreen) {
    return (
      <div className="fixed inset-0 bg-white z-50 overflow-auto">
        <div className="max-w-5xl mx-auto p-12">
          <div className="flex justify-end mb-8 gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleExport}
              className="gap-2"
            >
              <FileText className="w-4 h-4" />
              Export
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsFullScreen(false)}
              className="gap-2"
            >
              <Maximize2 className="w-4 h-4" />
              Exit Full Screen
            </Button>
          </div>
          {content}
          <ExportModal />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-auto bg-gray-50">
      <div className="flex justify-end mb-8 gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleExport}
          className="gap-2"
        >
          <FileText className="w-4 h-4" />
          Export
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setIsFullScreen(true)}
          className="gap-2"
        >
          <Maximize2 className="w-4 h-4" />
          Full Screen
        </Button>
      </div>
      {content}
      <ExportModal />
    </div>
  );
};
