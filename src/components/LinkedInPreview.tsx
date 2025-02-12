import { useAccomplishmentStore } from "@/store/accomplishments";
import { format, differenceInYears } from "date-fns";
import { Building2, MessageSquare, MoreHorizontal, Shield, FileText, Maximize2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useMemo } from "react";
import { toast } from "./ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const LinkedInPreview = () => {
  const { getSelectedAccomplishments } = useAccomplishmentStore();
  const selectedAccomplishments = getSelectedAccomplishments();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const groupedAccomplishments = useMemo(() => {
    const groups = selectedAccomplishments.reduce((acc, accomplishment) => {
      if (!acc[accomplishment.company]) {
        acc[accomplishment.company] = [];
      }
      acc[accomplishment.company].push(accomplishment);
      return acc;
    }, {} as Record<string, typeof selectedAccomplishments>);

    return Object.entries(groups).sort(([, aAccomplishments], [, bAccomplishments]) => {
      const aLatestDate = Math.max(...aAccomplishments.map(a => new Date(a.date).getTime()));
      const bLatestDate = Math.max(...bAccomplishments.map(b => new Date(b.date).getTime()));
      return bLatestDate - aLatestDate;
    });
  }, [selectedAccomplishments]);

  const getProfileHeadline = () => {
    if (selectedAccomplishments.length === 0) return "";
    
    const latestAccomplishment = [...selectedAccomplishments].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];

    const highlightedAccomplishments = selectedAccomplishments.filter(acc => 
      acc.tags?.includes('highlight')
    );

    if (highlightedAccomplishments.length > 0) {
      return `${latestAccomplishment.role} | ${highlightedAccomplishments[0].title}`;
    }

    return `${latestAccomplishment.role} with expertise in ${selectedAccomplishments[0].tags?.slice(0, 2).join(" and ") || "various domains"}`;
  };

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

  const ProfileHeader = () => (
    <div className="bg-white rounded-lg border mb-4">
      <div className="h-24 bg-[#1B2437] rounded-t-lg relative">
        <div className="absolute -bottom-12 left-6">
          <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center">
            <Building2 className="w-16 h-16 text-gray-400" />
          </div>
        </div>
      </div>
      <div className="pt-16 px-6 pb-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold text-gray-900">John Doe</h1>
              <Shield className="w-5 h-5 text-gray-500" />
              <span className="text-gray-500">· 1st</span>
            </div>
            <p className="text-gray-700 mt-1">{getProfileHeadline()}</p>
            <div className="flex items-center gap-2 text-gray-500 mt-2">
              <span>United States</span>
              <span>·</span>
              <a href="#" className="text-blue-600 hover:underline">Contact info</a>
            </div>
            <div className="flex items-center gap-4 mt-3 text-gray-600">
              <div className="flex items-center gap-1">
                <span className="font-medium">500+</span>
                <span>followers</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1">
                <span className="text-blue-600 hover:underline cursor-pointer">500+ connections</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <MessageSquare className="w-4 h-4" />
            Message
          </Button>
          <Button variant="outline" className="gap-2">
            <MoreHorizontal className="w-4 h-4" />
            More
          </Button>
        </div>
      </div>
    </div>
  );

  const ResumeContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Experience</h2>
          <div className="space-y-8">
            {groupedAccomplishments.map(([company, accomplishments]) => {
              const latestAccomplishment = [...accomplishments].sort(
                (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
              )[0];

              const latestDate = new Date(latestAccomplishment.date);
              const earliestDate = new Date(Math.min(...accomplishments.map(a => new Date(a.date).getTime())));
              const durationYears = differenceInYears(latestDate, earliestDate);
              
              return (
                <div key={company} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-gray-500" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900">{latestAccomplishment.role}</h3>
                    <div className="mt-1">
                      <p className="text-sm text-gray-600">{company} · Full-time</p>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                        <span>{format(earliestDate, "MMM yyyy")}</span>
                        <span>-</span>
                        <span>{format(latestDate, "MMM yyyy")}</span>
                        <span className="mx-1">·</span>
                        <span>{durationYears} yrs</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">United States</p>
                    </div>
                    <div className="mt-3 space-y-2">
                      {accomplishments.map((accomplishment) => (
                        <p key={accomplishment.id} className="text-sm text-gray-700">• {accomplishment.title}</p>
                      ))}
                    </div>
                    {accomplishments.flatMap(acc => acc.tags || []).length > 0 && (
                      <div className="mt-4">
                        <div className="flex flex-wrap gap-2">
                          {Array.from(new Set(accomplishments.flatMap(acc => acc.tags || []))).map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {accomplishments.some(acc => acc.attachments && acc.attachments.length > 0) && (
                      <div className="mt-4 space-y-2">
                        {accomplishments.flatMap(acc => acc.attachments || []).map((attachment) => (
                          <div key={attachment.id} className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 bg-gray-50">
                            <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                              <p className="text-xs text-gray-500">{attachment.type} · {attachment.size}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const ExportModal = () => (
    <Dialog open={showExportModal} onOpenChange={setShowExportModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export LinkedIn Update</DialogTitle>
          <DialogDescription>
            Your LinkedIn update is ready to be exported. You can copy the content and paste it directly into LinkedIn.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="rounded-lg border bg-gray-50 p-4">
            <p className="text-sm text-gray-700">{getProfileHeadline()}</p>
          </div>
          {selectedAccomplishments.map((accomplishment) => (
            <div key={accomplishment.id} className="rounded-lg border bg-gray-50 p-4">
              <p className="text-sm text-gray-700">{accomplishment.title}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );

  if (selectedAccomplishments.length === 0) {
    return (
      <div className="p-6 h-full flex items-center justify-center text-center">
        <div className="text-gray-500">
          <p className="text-lg font-medium mb-2">LinkedIn Preview</p>
          <p className="text-sm">Select accomplishments from the timeline to see them in your LinkedIn profile</p>
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
          <ProfileHeader />
          <ResumeContent />
          <ExportModal />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-auto bg-gray-50 space-y-4">
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
      <ProfileHeader />
      <ResumeContent />
      <ExportModal />
    </div>
  );
};
