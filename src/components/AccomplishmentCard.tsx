
import { Accomplishment, View } from "../types/accomplishment";
import { Card, CardHeader } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { format } from "date-fns";
import { Circle, Calendar, Briefcase, Building2, FileText, Download, Share2, Star, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useAccomplishmentStore } from "../store/accomplishments";

interface AccomplishmentCardProps {
  accomplishment: Accomplishment;
  view: View;
}

export const AccomplishmentCard = ({
  accomplishment,
  view,
}: AccomplishmentCardProps) => {
  const { title, date, role, company, privateDetails, selected, attachments, tags } = accomplishment;
  const { toggleSelected } = useAccomplishmentStore();

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

  // Function to blur sensitive numbers in text
  const blurMetrics = (text: string) => {
    return text.replace(/\$?\d+([,.]?\d+)?(\s*%|\s*k|\s*M)?/g, '***');
  };

  // Function to blur company name
  const getCompanyDisplay = () => {
    if (view === "private") return company;
    return "Company ***";
  };

  return (
    <div className="relative pl-4 sm:pl-6 pb-4 relative before:absolute before:left-[11px] before:top-[28px] before:h-[calc(100%-40px)] before:w-0.5 before:bg-gray-200">
      <div className="absolute left-0 top-6 w-4 h-4 rounded-full bg-accent flex items-center justify-center">
        <Circle className="w-2 h-2 text-white fill-current" />
      </div>

      <Card
        className={cn(
          "w-full max-w-[560px] transition-all duration-300 hover:shadow-md animate-slide-up ml-2 sm:ml-4",
          selected && view === "private" && "ring-2 ring-accent"
        )}
      >
        <CardHeader className="p-3">
          <div className="flex items-start gap-2">
            {view === "private" && (
              <Checkbox
                checked={selected}
                onCheckedChange={() => toggleSelected(accomplishment.id)}
                className="mt-1"
              />
            )}
            <div className="flex-1 min-w-0">
              {/* First row */}
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-sm">{title}</h3>
                {view === "private" && (
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Star className="h-3.5 w-3.5 text-yellow-500" />
                    <Pencil className="h-3.5 w-3.5 text-gray-500" />
                  </div>
                )}
              </div>

              {/* Second row */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600 mb-2">
                <div className="flex items-center">
                  <Building2 className="w-3.5 h-3.5 mr-1 text-gray-500" />
                  {getCompanyDisplay()}
                </div>
                <div className="flex items-center">
                  <Briefcase className="w-3.5 h-3.5 mr-1 text-gray-500" />
                  {role}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1 text-gray-500" />
                  {format(new Date(date), "MMM d, yyyy")}
                </div>
              </div>

              {/* Description */}
              {privateDetails && (
                <p className="text-xs text-gray-600 mb-2">
                  {view === "private" ? privateDetails : blurMetrics(privateDetails)}
                </p>
              )}

              {/* Documents section */}
              {view === "private" && attachments && attachments.length > 0 && (
                <div className="space-y-1.5 mb-2">
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

              {/* Tags */}
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className={cn(
                        "px-1.5 py-0.5 text-[10px] rounded-full",
                        tag === "highlight"
                          ? "bg-accent/10 text-accent font-medium"
                          : "bg-gray-100 text-gray-600"
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
