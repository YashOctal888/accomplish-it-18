
import { Button } from "@/components/ui/button";
import { PlusCircle, Sparkles } from "lucide-react";
import { useState } from "react";
import { ResumeBuilderModal } from "@/components/ResumeBuilderModal";

const ResumeBuilder = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <main className="h-[calc(100vh-56px)] flex items-center justify-center">
        {!showModal ? (
          <div className="text-center space-y-4">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => setShowModal(true)}
              className="gap-2"
            >
              <PlusCircle className="w-5 h-5" />
              Add a new resume
            </Button>
            <div>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => setShowModal(true)}
                className="gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Let AI Build Your Resume
              </Button>
            </div>
          </div>
        ) : (
          <ResumeBuilderModal onClose={() => setShowModal(false)} />
        )}
      </main>
    </div>
  );
};

export default ResumeBuilder;
