
import { useAccomplishmentStore } from "@/store/accomplishments";
import { Card, CardContent, CardHeader } from "./ui/card";
import { format } from "date-fns";
import { MessageSquare, CheckCircle, Circle, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export const OneOnOnePreview = () => {
  const { getSelectedAccomplishments } = useAccomplishmentStore();
  const selectedAccomplishments = getSelectedAccomplishments();

  if (selectedAccomplishments.length === 0) {
    return (
      <div className="p-6 h-full flex items-center justify-center text-center">
        <div className="text-gray-500">
          <p className="text-lg font-medium mb-2">1:1 Meeting Preview</p>
          <p className="text-sm">Select accomplishments from the timeline to discuss in your 1:1</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-auto space-y-6">
      <div className="flex justify-between items-center">
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          Next Meeting: Tomorrow, 2:00 PM
        </Badge>
        <Button variant="outline" size="sm">Share Notes</Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold">Weekly 1:1 with Manager</h2>
              <p className="text-sm text-gray-500">{format(new Date(), "MMMM d, yyyy")}</p>
            </div>
            <MessageSquare className="w-5 h-5 text-gray-400" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Updates & Accomplishments</h3>
            <div className="space-y-3">
              {selectedAccomplishments.map((accomplishment) => (
                <div key={accomplishment.id} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <div className="text-sm text-gray-600">{accomplishment.privateDetails}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Ongoing Projects</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Circle className="w-4 h-4 text-blue-500 mt-0.5" />
                <div className="text-sm text-gray-600">
                  Frontend migration to Next.js - 75% complete
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Circle className="w-4 h-4 text-orange-500 mt-0.5" />
                <div className="text-sm text-gray-600">
                  API documentation update - In progress
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Blockers & Concerns</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
                <div className="text-sm text-gray-600">
                  Need design review for new features
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Action Items</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-4 h-4 flex items-center justify-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
                <div className="text-sm text-gray-600">
                  Schedule technical review meeting
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-4 h-4 flex items-center justify-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
                <div className="text-sm text-gray-600">
                  Follow up with design team
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
