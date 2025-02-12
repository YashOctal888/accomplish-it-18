
import { useAccomplishmentStore } from "@/store/accomplishments";
import { Card, CardContent, CardHeader } from "./ui/card";
import { format } from "date-fns";
import { Trophy, Target, TrendingUp, Lightbulb } from "lucide-react";
import { Button } from "./ui/button";

export const PerformanceReviewPreview = () => {
  const { getSelectedAccomplishments } = useAccomplishmentStore();
  const selectedAccomplishments = getSelectedAccomplishments();

  if (selectedAccomplishments.length === 0) {
    return (
      <div className="p-6 h-full flex items-center justify-center text-center">
        <div className="text-gray-500">
          <p className="text-lg font-medium mb-2">Performance Review Preview</p>
          <p className="text-sm">Select accomplishments from the timeline to include in your review</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-auto space-y-6">
      <div className="flex justify-end">
        <Button variant="outline" size="sm">Export Review</Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <h2 className="text-xl font-semibold">Q4 2024 Performance Review</h2>
          <p className="text-sm text-gray-500">Period: Oct 2024 - Dec 2024</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
              <Trophy className="w-4 h-4 text-yellow-500" />
              Key Achievements
            </h3>
            <div className="space-y-3">
              {selectedAccomplishments.map((accomplishment) => (
                <div key={accomplishment.id} className="text-sm text-gray-600 pl-6">
                  • {accomplishment.privateDetails}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-blue-500" />
              Goals Progress
            </h3>
            <div className="pl-6 space-y-2">
              <div className="text-sm text-gray-600">
                • Completed 85% of set objectives for Q4
              </div>
              <div className="text-sm text-gray-600">
                • Exceeded expectations in project delivery
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-green-500" />
              Areas of Growth
            </h3>
            <div className="pl-6 space-y-2">
              <div className="text-sm text-gray-600">
                • Leadership and mentoring of junior team members
              </div>
              <div className="text-sm text-gray-600">
                • Technical architecture design skills
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-purple-500" />
              Development Areas
            </h3>
            <div className="pl-6 space-y-2">
              <div className="text-sm text-gray-600">
                • Public speaking and presentation skills
              </div>
              <div className="text-sm text-gray-600">
                • Cross-functional team collaboration
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
