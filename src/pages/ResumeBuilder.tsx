
import { FileText, MessagesSquare, FileSpreadsheet, Linkedin } from "lucide-react";
import { useState } from "react";
import { ResumeBuilderModal } from "@/components/ResumeBuilderModal";
import { Card } from "@/components/ui/card";

const ResumeBuilder = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'resume' | 'linkedin'>('resume');

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
      <main className="h-[calc(100vh-56px)] flex items-center justify-center">
        {!showModal ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 w-full max-w-2xl">
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
        ) : (
          <ResumeBuilderModal onClose={() => setShowModal(false)} type={modalType} />
        )}
      </main>
    </div>
  );
};

export default ResumeBuilder;
