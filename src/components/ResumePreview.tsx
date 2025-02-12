import { useAccomplishmentStore } from "@/store/accomplishments";
import { Card, CardContent, CardHeader } from "./ui/card";
import { format } from "date-fns";
import { Building2, Briefcase, Calendar, MapPin, Globe, AtSign, Mail, Maximize2, FileText, Check, Download, Sparkles, Infinity } from "lucide-react";
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
    setShowExportModal(true);
  };

  const ResumeContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Experience</h2>
          <div className="space-y-8">
            {selectedAccomplishments.map((accomplishment) => (
              <div key={accomplishment.id} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-gray-500" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900">{accomplishment.role}</h3>
                  <div className="mt-1">
                    <p className="text-sm text-gray-600">{accomplishment.company} · Full-time</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                      <span>{format(new Date(accomplishment.date), "MMM yyyy")}</span>
                      <span>-</span>
                      <span>Present</span>
                      <span className="mx-1">·</span>
                      <span>1 yr 2 mos</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5">Greater Atlanta Area</p>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{accomplishment.privateDetails}</p>
                  </div>
                  {accomplishment.tags && accomplishment.tags.length > 0 && (
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {accomplishment.tags.map((tag, index) => (
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
                  {accomplishment.attachments && accomplishment.attachments.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {accomplishment.attachments.map((attachment) => (
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
        <ResumeContent />
      </div>

      <Dialog open={showExportModal} onOpenChange={setShowExportModal}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Choose Your Export Plan</DialogTitle>
            <DialogDescription>
              Select the plan that best fits your needs
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid gap-6 sm:grid-cols-3">
              {/* Basic Plan */}
              <div className="relative rounded-lg border p-4 hover:shadow-sm transition-shadow">
                <div className="space-y-2">
                  <Download className="w-8 h-8 text-gray-400" />
                  <h3 className="font-semibold">Basic</h3>
                  <p className="text-2xl font-bold">Free<span className="text-xs font-normal text-gray-500 ml-1">*watermarked</span></p>
                  <div className="text-sm text-gray-500 space-y-2">
                    <p className="font-medium text-gray-700">Format options:</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-gray-400" />
                        <span>PDF</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-gray-400" />
                        <span>PNG</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <Button 
                  className="w-full mt-4" 
                  variant="outline"
                  onClick={() => {
                    console.log('Basic export selected...');
                    setShowExportModal(false);
                  }}
                >
                  Export Now
                </Button>
              </div>

              {/* Premium Plan */}
              <div className="relative rounded-lg border p-4 bg-primary/5 border-primary/20 hover:shadow-sm transition-shadow">
                <div className="space-y-2">
                  <Sparkles className="w-8 h-8 text-primary" />
                  <h3 className="font-semibold">Premium</h3>
                  <p className="text-2xl font-bold">$3.99<span className="text-sm font-normal text-gray-500">/export</span></p>
                  <div className="text-sm text-gray-500 space-y-2">
                    <p className="font-medium text-gray-700">Format options:</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        <span>DOC, PDF, PNG</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        <span>TXT, HTML, RTF</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        <span>ATS Review</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        <span>AI Optimizations</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <Button 
                  className="w-full mt-4"
                  onClick={() => {
                    console.log('Premium export selected...');
                    setShowExportModal(false);
                  }}
                >
                  Get Premium Export
                </Button>
              </div>

              {/* Subscription Plan */}
              <div className="relative rounded-lg border p-4 bg-accent/5 border-accent/20 hover:shadow-sm transition-shadow">
                <div className="absolute -top-2 right-4">
                  <span className="px-2 py-1 bg-accent text-white text-xs rounded-full">Best Value</span>
                </div>
                <div className="space-y-2">
                  <Infinity className="w-8 h-8 text-accent" />
                  <h3 className="font-semibold">Unlimited</h3>
                  <p className="text-2xl font-bold">$8.99<span className="text-sm font-normal text-gray-500">/month</span></p>
                  <p className="text-xs text-gray-500">Billed annually</p>
                  <div className="text-sm text-gray-500 space-y-2">
                    <p className="font-medium text-gray-700">Everything in Premium, plus:</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-accent" />
                        <span>Unlimited Exports</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-accent" />
                        <span>AI Updates</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-accent" />
                        <span>24/7 Support</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <Button 
                  className="w-full mt-4 bg-accent hover:bg-accent/90"
                  onClick={() => {
                    console.log('Subscription selected...');
                    setShowExportModal(false);
                  }}
                >
                  Start Subscription
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
