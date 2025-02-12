
import { Button } from "@/components/ui/button";
import { PlusCircle, Sparkles, Linkedin } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-gray-50/50">
      <main className="h-[calc(100vh-56px)] flex items-center justify-center">
        {!showModal ? (
          <div className="space-y-8">
            <div className="text-center space-y-3 w-[280px] mx-auto">
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => handleModalOpen('resume')}
                className="gap-2 w-full"
              >
                <PlusCircle className="w-5 h-5" />
                Add a new resume
              </Button>
              <div className="text-sm text-muted-foreground">or</div>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => handleModalOpen('resume')}
                className="gap-2 w-full"
              >
                <Sparkles className="w-5 h-5" />
                Let AI Build Your Resume
              </Button>
              <div className="text-sm text-muted-foreground pt-2">or</div>
              <Button
                variant="default"
                size="lg"
                onClick={() => handleModalOpen('linkedin')}
                className="gap-2 w-full bg-[#0077B5] hover:bg-[#006097]"
              >
                <Linkedin className="w-5 h-5" />
                Create LinkedIn Update
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
              <Card className="w-[140px] h-[100px] p-3 cursor-pointer hover:border-accent transition-colors">
                <div className="h-full flex flex-col">
                  <div className="flex-1 bg-gray-100 rounded-md mb-1">
                    {/* Preview Image 1 */}
                  </div>
                  <div className="text-xs font-medium">Professional</div>
                  <p className="text-[10px] text-muted-foreground">Clean and modern design</p>
                </div>
              </Card>

              <Card className="w-[140px] h-[100px] p-3 cursor-pointer hover:border-accent transition-colors">
                <div className="h-full flex flex-col">
                  <div className="flex-1 bg-gray-100 rounded-md mb-1">
                    {/* Preview Image 2 */}
                  </div>
                  <div className="text-xs font-medium">Creative</div>
                  <p className="text-[10px] text-muted-foreground">Stand out design</p>
                </div>
              </Card>

              <Card className="w-[140px] h-[100px] p-3 cursor-pointer hover:border-accent transition-colors">
                <div className="h-full flex flex-col">
                  <div className="flex-1 bg-gray-100 rounded-md mb-1">
                    {/* Preview Image 3 */}
                  </div>
                  <div className="text-xs font-medium">Academic</div>
                  <p className="text-[10px] text-muted-foreground">Research focused</p>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          <ResumeBuilderModal onClose={() => setShowModal(false)} type={modalType} />
        )}
      </main>
    </div>
  );
};

export default ResumeBuilder;
