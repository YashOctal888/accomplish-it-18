
import { useAccomplishmentStore } from "@/store/accomplishments";
import { Card, CardContent, CardHeader } from "./ui/card";
import { format } from "date-fns";
import { Building2, Briefcase, Calendar, MapPin, Globe, AtSign, Mail } from "lucide-react";

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
    <div className="p-6 h-full overflow-auto bg-white space-y-8">
      {/* Profile Section */}
      <div className="relative">
        {/* Header Image */}
        <div className="h-48 w-full bg-gradient-to-r from-purple-600 via-purple-400 to-purple-800 rounded-t-lg" />
        
        {/* Profile Info */}
        <div className="px-6">
          <div className="relative -mt-24 mb-4">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-100">
              <img
                src="/lovable-uploads/c7eac1db-6669-4461-a0b5-a3c4a2e9e8c5.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">John Doe</h1>
              <p className="text-gray-600 mt-1">Professional at {selectedAccomplishments[0]?.company}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>New York, USA</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <AtSign className="w-4 h-4" />
                  <span>Portfolio</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Globe className="w-4 h-4" />
                  <span>Website</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Experience</h2>
          <div className="space-y-6">
            {selectedAccomplishments.map((accomplishment) => (
              <Card key={accomplishment.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900">{accomplishment.title}</h3>
                      <div className="space-y-1 mt-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Briefcase className="w-4 h-4 mr-2" />
                          {accomplishment.role} at {accomplishment.company}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          {format(new Date(accomplishment.date), "MMMM d, yyyy")}
                        </div>
                      </div>
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
      </div>
    </div>
  );
};
