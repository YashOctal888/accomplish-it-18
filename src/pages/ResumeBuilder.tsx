
import { FileText, MessagesSquare, FileSpreadsheet, Linkedin } from "lucide-react";
import { useState } from "react";
import { ResumeBuilderModal } from "@/components/ResumeBuilderModal";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const ResumeBuilder = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'resume' | 'linkedin'>('resume');

  // Simulated previous artifacts - in a real app, this would come from your backend
  const previousArtifacts = [
    {
      title: "Q4 Performance Review",
      type: "Performance Review",
      date: "2024-02-15",
      icon: FileSpreadsheet
    },
    {
      title: "Weekly 1:1 with Manager",
      type: "1:1",
      date: "2024-02-10",
      icon: MessagesSquare,
      tags: ["Auto-updated", "Shared"]
    },
    {
      title: "Software Engineer Resume",
      type: "Resume",
      date: "2024-02-01",
      icon: FileText
    }
  ];

  const handleModalOpen = (type: 'resume' | 'linkedin') => {
    setModalType(type);
    setShowModal(true);
  };

  const artifacts = [
    {
      title: "Performance Review",
      description: "Track and manage performance reviews",
      icon: FileSpreadsheet,
      onClick: () => handleModalOpen('resume')
    },
    {
      title: "1:1",
      description: "Document one-on-one meetings",
      icon: MessagesSquare,
      onClick: () => handleModalOpen('resume')
    },
    {
      title: "Resume",
      description: "Create and update your resume",
      icon: FileText,
      onClick: () => handleModalOpen('resume')
    },
    {
      title: "LinkedIn Profile",
      description: "Generate LinkedIn content",
      icon: Linkedin,
      onClick: () => handleModalOpen('linkedin')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
      <main className="py-8 px-4 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {artifacts.map((artifact) => {
            const Icon = artifact.icon;
            return (
              <Card
                key={artifact.title}
                className="p-6 hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center text-center"
                onClick={artifact.onClick}
              >
                <Icon className="w-8 h-8 mb-4 text-gray-600" />
                <h3 className="font-medium mb-2">{artifact.title}</h3>
                <p className="text-sm text-gray-500">{artifact.description}</p>
              </Card>
            );
          })}
        </div>

        <Separator className="my-8" />

        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Previous Artifacts</h2>
          <div className="grid grid-cols-1 gap-4">
            {previousArtifacts.map((artifact) => {
              const Icon = artifact.icon;
              return (
                <Card
                  key={artifact.title}
                  className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div>
                        <h3 className="font-medium text-sm text-gray-900 mb-1">{artifact.title}</h3>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-gray-500">{artifact.type}</p>
                          {artifact.tags?.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-[10px] h-4">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(artifact.date).toLocaleDateString()}
                    </div>
                  </div>
                </Card>
              )}
            )}
          </div>
        </div>

        {showModal && (
          <ResumeBuilderModal onClose={() => setShowModal(false)} type={modalType} />
        )}
      </main>
    </div>
  );
};

export default ResumeBuilder;
