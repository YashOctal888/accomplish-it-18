
import { useAccomplishmentStore } from "@/store/accomplishments";
import { Card, CardContent, CardHeader } from "./ui/card";
import { format } from "date-fns";
import { Building2, Briefcase, Calendar } from "lucide-react";

export const ResumePreview = () => {
  const { getSelectedAccomplishments } = useAccomplishmentStore();
  const selectedAccomplishments = getSelectedAccomplishments();

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

  return (
    <div className="p-6 h-full overflow-auto bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Professional Accomplishments</h2>
      <div className="space-y-6">
        {selectedAccomplishments.map((accomplishment) => (
          <Card key={accomplishment.id} className="border-l-4 border-l-accent">
            <CardHeader>
              <h3 className="font-semibold text-lg text-gray-900">{accomplishment.title}</h3>
              <div className="space-y-2 mt-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  {format(new Date(accomplishment.date), "MMMM d, yyyy")}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Briefcase className="w-4 h-4 mr-2" />
                  {accomplishment.role}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Building2 className="w-4 h-4 mr-2" />
                  {accomplishment.company}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{accomplishment.privateDetails}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
