
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { ResumeBuilderModal } from "@/components/ResumeBuilderModal";

const ResumeBuilder = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <main className="h-[calc(100vh-56px)] flex items-center justify-center">
        {!showModal ? (
          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => setShowModal(true)}
              className="gap-2"
            >
              <PlusCircle className="w-5 h-5" />
              Add a new resume
            </Button>
          </div>
        ) : (
          <ResumeBuilderModal onClose={() => setShowModal(false)} />
        )}
      </main>
    </div>
  );
};

export default ResumeBuilder;
