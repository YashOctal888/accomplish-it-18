
import { Accomplishment, View } from "../types/accomplishment";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { format } from "date-fns";
import { Check, Calendar, Briefcase, Building2, Upload, FileText, Download, Share2, Star, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

interface AccomplishmentCardProps {
  accomplishment: Accomplishment;
  view: View;
  onSelect?: (id: string) => void;
}

export const AccomplishmentCard = ({
  accomplishment,
  view,
  onSelect,
}: AccomplishmentCardProps) => {
  const { title, date, role, company, privateDetails, selected, attachments, tags } = accomplishment;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // In a real app, this would upload to a server
    const fakeUpload = {
      id: Math.random().toString(),
      name: file.name,
      type: file.type,
      size: `${(file.size / (1024 * 1024)).toFixed(1)}MB`,
      url: URL.createObjectURL(file)
    };

    toast({
      title: "File uploaded",
      description: `${file.name} has been uploaded successfully.`,
    });
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'docx':
        return 'bg-blue-100 text-blue-600';
      case 'pwr':
        return 'bg-orange-100 text-orange-600';
      case 'xlc':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="relative pl-4 sm:pl-6 pb-4 relative before:absolute before:left-[11px] before:top-[28px] before:h-[calc(100%-40px)] before:w-0.5 before:bg-gray-200">
      <div className="absolute left-0 top-6 w-4 h-4 rounded-full bg-accent flex items-center justify-center">
        <Check className="w-2.5 h-2.5 text-white" />
      </div>

      <Card
        className={cn(
          "w-full max-w-[560px] transition-all duration-300 hover:shadow-md animate-slide-up ml-2 sm:ml-4",
          selected && "ring-2 ring-accent"
        )}
      >
        <CardHeader className="space-y-2 p-2.5 sm:p-3">
          {view === "private" && onSelect && (
            <Checkbox
              checked={selected}
              onCheckedChange={() => onSelect(accomplishment.id)}
              className="mt-0.5"
            />
          )}
          <div className="flex-1 w-full">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <h3 className="font-medium text-xs sm:text-sm leading-tight">{title}</h3>
              <div className="flex items-center gap-0.5 flex-shrink-0">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Star className="h-3 w-3 text-yellow-500" />
                </Button>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Pencil className="h-3 w-3 text-gray-500" />
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mb-1.5">
              {tags?.map((tag, index) => (
                <span
                  key={index}
                  className={cn(
                    "px-1 py-0.5 text-[10px] rounded-full",
                    tag === "highlight"
                      ? "bg-accent/10 text-accent font-medium"
                      : "bg-gray-100 text-gray-600"
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="space-y-1">
              <div className="flex items-center text-[11px] text-gray-600">
                <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                {format(new Date(date), "MMMM d, yyyy")}
              </div>
              <div className="flex items-center text-[11px] text-gray-600">
                <Briefcase className="w-3 h-3 mr-1 flex-shrink-0" />
                {role}
              </div>
              <div className="flex items-center text-[11px] text-gray-600">
                <Building2 className="w-3 h-3 mr-1 flex-shrink-0" />
                {company}
              </div>
            </div>
          </div>
        </CardHeader>
        {view === "private" && (
          <CardContent className="pt-0 p-2.5 sm:p-3">
            <div className="text-[11px] text-gray-600">
              <p className="italic">{privateDetails}</p>
              
              <div className="mt-2 space-y-1.5">
                {attachments && attachments.length > 0 && (
                  <div className="space-y-1.5">
                    {attachments.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-1.5 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-1.5 min-w-0">
                          <div className={cn("p-1 rounded-md", getFileIcon(file.type))}>
                            <FileText className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-[10px] truncate">{file.name}</p>
                            <p className="text-[9px] text-gray-500">{file.type.toUpperCase()} • {file.size}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5 flex-shrink-0">
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Download className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Share2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center justify-center mt-3">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      accept=".doc,.docx,.pdf,.ppt,.pptx,.xls,.xlsx"
                    />
                    <Button variant="outline" size="sm" asChild>
                      <div>
                        <Upload className="w-3 h-3 mr-1" />
                        <span className="text-[10px]">Upload Document</span>
                      </div>
                    </Button>
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

