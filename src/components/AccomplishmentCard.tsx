
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
    <div className="relative pl-8 pb-8 relative before:absolute before:left-[11px] before:top-[28px] before:h-[calc(100%-40px)] before:w-0.5 before:bg-gray-200">
      <div className="absolute left-0 top-6 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
        <Check className="w-4 h-4 text-white" />
      </div>

      <Card
        className={cn(
          "w-full transition-all duration-300 hover:shadow-lg animate-slide-up ml-6",
          selected && "ring-2 ring-accent"
        )}
      >
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
          {view === "private" && onSelect && (
            <Checkbox
              checked={selected}
              onCheckedChange={() => onSelect(accomplishment.id)}
              className="mt-1"
            />
          )}
          <div className="flex-1 ml-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg leading-tight">{title}</h3>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Star className="h-4 w-4 text-yellow-500" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Pencil className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                {format(new Date(date), "MMMM d, yyyy")}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Briefcase className="w-4 h-4 mr-2" />
                {role}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Building2 className="w-4 h-4 mr-2" />
                {company}
              </div>
            </div>
          </div>
        </CardHeader>
        {view === "private" && (
          <CardContent>
            <div className="mt-2 text-sm text-gray-600">
              <p className="italic">{privateDetails}</p>
              
              <div className="mt-4 space-y-4">
                {attachments && attachments.length > 0 && (
                  <div className="space-y-2">
                    {attachments.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={cn("p-2 rounded-lg", getFileIcon(file.type))}>
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-xs text-gray-500">{file.type.toUpperCase()} • {file.size}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center justify-center">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      accept=".doc,.docx,.pdf,.ppt,.pptx,.xls,.xlsx"
                    />
                    <Button variant="outline" asChild>
                      <div>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Document
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

