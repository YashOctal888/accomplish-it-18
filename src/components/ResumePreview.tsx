import { useAccomplishmentStore } from "@/store/accomplishments";
import { format } from "date-fns";
import { FileText, Maximize2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "./ui/use-toast";

export const ResumePreview = () => {
  const { getSelectedAccomplishments } = useAccomplishmentStore();
  const selectedAccomplishments = getSelectedAccomplishments();
  const [isFullScreen, setIsFullScreen] = useState(false);

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
    <div className="space-y-6">
      <div className="border-b pb-6">
        <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
        <p className="text-gray-600 mt-2">Professional Software Engineer</p>
        <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
          <span>United States</span>
          <span>•</span>
          <span>john.doe@example.com</span>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Professional Experience</h2>
        <div className="space-y-6">
          {selectedAccomplishments.map((accomplishment) => (
            <div key={accomplishment.id} className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{accomplishment.role}</h3>
                  <p className="text-gray-600">{accomplishment.company}</p>
                </div>
                <p className="text-sm text-gray-500">{format(new Date(accomplishment.date), "MMM yyyy")}</p>
              </div>
              <p className="text-sm text-gray-700">{accomplishment.title}</p>
              {accomplishment.description && (
                <p className="text-sm text-gray-600">{accomplishment.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {Array.from(new Set(selectedAccomplishments.flatMap(acc => acc.tags || []))).map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  if (isFullScreen) {
    return (
      <div className="fixed inset-0 bg-white z-50 overflow-auto">
        <div className="max-w-4xl mx-auto p-8">
          <div className="flex justify-end mb-4 gap-2">
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
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-auto bg-gray-50">
      <div className="flex justify-end mb-4 gap-2">
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
    </div>
  );
};
