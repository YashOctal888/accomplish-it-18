import { useAccomplishmentStore } from "@/store/accomplishments";
import { Card, CardContent, CardHeader } from "./ui/card";
import { format } from "date-fns";
import { Building2, Briefcase, Calendar, MapPin, Globe, AtSign, Mail, Maximize2, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "./ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const ResumePreview = ({ type = 'resume' }: { type?: 'resume' | 'linkedin' }) => {
  const { getSelectedAccomplishments, clearSelection } = useAccomplishmentStore();
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
    setShowExportModal(true);
  };

  const ResumeContent = () => (
    <div className="space-y-6">
      <div className="relative">
        <div className="h-40 w-full bg-gradient-to-r from-blue-500/10 via-blue-400/10 to-blue-500/10 rounded-t-lg" />
        <div className="px-6">
          <div className="relative -mt-20 mb-4">
            <div className="w-28 h-28 rounded-full border-4 border-white overflow-hidden bg-gray-50">
              <img
                src="/lovable-uploads/c7eac1db-6669-4461-a0b5-a3c4a2e9e8c5.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">John Doe</h1>
              <p className="text-sm text-gray-600 mt-0.5">Professional at {selectedAccomplishments[0]?.company}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>New York, USA</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                  <AtSign className="w-3.5 h-3.5" />
                  <span>Portfolio</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Website</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Experience</h2>
          <div className="space-y-4">
            {selectedAccomplishments.map((accomplishment) => (
              <Card key={accomplishment.id} className="border border-gray-100 hover:shadow-sm transition-shadow">
                <CardHeader className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-gray-900">{accomplishment.title}</h3>
                      <div className="space-y-1 mt-1">
                        <div className="flex items-center text-xs text-gray-600">
                          <Briefcase className="w-3.5 h-3.5 mr-1.5" />
                          {accomplishment.role} at {accomplishment.company}
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                          <Calendar className="w-3.5 h-3.5 mr-1.5" />
                          {format(new Date(accomplishment.date), "MMM d, yyyy")}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <p className="text-xs text-gray-600 leading-relaxed">{accomplishment.privateDetails}</p>
                  {accomplishment.tags && accomplishment.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {accomplishment.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={cn(
                            "inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                            tag === "highlight"
                              ? "bg-blue-50 text-blue-600"
                              : "bg-gray-50 text-gray-600"
                          )}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (selectedAccomplishments.length === 0) {
    return (
      <div className="p-6 h-full flex items-center justify-center text-center">
        <div className="text-gray-500">
          <p className="text-lg font-medium mb-2">Resume Preview</p>
          <p className="text-sm">Select accomplishments from the timeline to see them in your resume</p>
        </div>
      </div>
    );
  }

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
          <ResumeContent />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-6 h-full overflow-auto bg-white space-y-4">
        <div className="flex justify-end gap-2">
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
        <ResumeContent />
      </div>

      <Dialog open={showExportModal} onOpenChange={setShowExportModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Options</DialogTitle>
            <DialogDescription>
              Choose your export format:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-lg mb-2">Basic Export</h3>
                <p className="text-gray-600 mb-4">Standard format with watermark</p>
                <Button
                  variant="secondary"
                  onClick={() => {
                    console.log('Exporting basic version...');
                    setShowExportModal(false);
                  }}
                >
                  Export Basic Version
                </Button>
              </div>
              
              <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                <h3 className="font-semibold text-lg mb-2">Premium Export</h3>
                <p className="text-gray-600 mb-4">High-quality format with no watermark</p>
                <Button
                  variant="default"
                  onClick={() => {
                    console.log('Premium export selected...');
                    setShowExportModal(false);
                  }}
                >
                  Get Premium Version
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
