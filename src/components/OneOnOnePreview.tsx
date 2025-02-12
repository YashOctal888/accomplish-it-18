
import { useAccomplishmentStore } from "@/store/accomplishments";
import { Card, CardContent } from "./ui/card";
import { format } from "date-fns";
import { 
  SmilePlus, 
  Share2, 
  MessageSquare, 
  MoreHorizontal,
  Save,
  Plus,
  Users,
  Trophy,
  Clock
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

export const OneOnOnePreview = () => {
  const { getSelectedAccomplishments, accomplishments } = useAccomplishmentStore();
  
  // Get the current role (assuming the most recent role is the current one)
  const currentRole = accomplishments.length > 0 
    ? accomplishments.reduce((latest, acc) => {
        return new Date(acc.date) > new Date(latest.date) ? acc : latest;
      }).role
    : null;

  // Filter selected accomplishments to only show those from current role
  const selectedAccomplishments = getSelectedAccomplishments().filter(
    acc => acc.role === currentRole
  );

  if (selectedAccomplishments.length === 0) {
    return (
      <div className="p-6 h-full flex items-center justify-center text-center">
        <div className="text-gray-500">
          <p className="text-lg font-medium mb-2">1:1 Meeting Preview</p>
          <p className="text-sm">Select accomplishments from your current role to discuss in your 1:1</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-auto space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Header Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">1:1 Roles & Expectations</h1>
                <div className="flex items-center gap-2 text-gray-500">
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Saved now
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="gap-2">
                  <SmilePlus className="h-4 w-4" />
                  Add Icon
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share Page
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Comments
                </Button>
              </div>
              
              <Separator />
            </div>

            {/* Roles Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 bg-green-50/50 p-3 rounded-md">
                <Users className="h-5 w-5 text-gray-600" />
                <h2 className="font-semibold text-lg">Roles</h2>
              </div>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-gray-700">
                  <span className="font-medium">Manager:</span> Jane Smith, CEO
                </li>
                <li className="text-gray-700">
                  <span className="font-medium">Product Manager:</span> Mark Taylor
                </li>
              </ul>
            </div>

            {/* Expectations Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 bg-blue-50/50 p-3 rounded-md">
                <Trophy className="h-5 w-5 text-gray-600" />
                <h2 className="font-semibold text-lg">Expectations</h2>
              </div>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-gray-700">
                  Complete your 1:1 agenda and submit 1 day before your scheduled 1:1
                </li>
                <li className="text-gray-700">
                  This is an opportunity for you to share information about your projects and your manager to share feedback directly to you
                </li>
                <li className="text-gray-700">
                  Use this time to set expectations about your projects and to manage your career
                </li>
              </ul>
            </div>

            {/* How to use this time Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 bg-orange-50/50 p-3 rounded-md">
                <Clock className="h-5 w-5 text-gray-600" />
                <h2 className="font-semibold text-lg">How to use this time</h2>
              </div>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-gray-700">
                  This time is for you! So use this time in the way that is best useful to you.
                </li>
                <li className="text-gray-700">
                  Track your progress towards business goals and personal growth goals in your notes
                </li>
              </ul>
            </div>

            {/* Recent Accomplishments Section */}
            {selectedAccomplishments.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 bg-purple-50/50 p-3 rounded-md">
                  <Trophy className="h-5 w-5 text-gray-600" />
                  <h2 className="font-semibold text-lg">Recent Accomplishments</h2>
                </div>
                <ul className="list-disc pl-6 space-y-2">
                  {selectedAccomplishments.map((accomplishment) => (
                    <li key={accomplishment.id} className="text-gray-700">
                      {accomplishment.privateDetails}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
