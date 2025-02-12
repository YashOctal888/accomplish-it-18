
import { Button } from "@/components/ui/button";
import { PlusCircle, Sparkles } from "lucide-react";
import { useState } from "react";
import { ResumeBuilderModal } from "@/components/ResumeBuilderModal";
import { Card } from "@/components/ui/card";

const ResumeBuilder = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <main className="h-[calc(100vh-56px)] flex items-center justify-center">
        {!showModal ? (
          <div className="space-y-8">
            <div className="text-center space-y-3 w-[280px] mx-auto">
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => setShowModal(true)}
                className="gap-2 w-full"
              >
                <PlusCircle className="w-5 h-5" />
                Add a new resume
              </Button>
              <div className="text-sm text-muted-foreground">or</div>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => setShowModal(true)}
                className="gap-2 w-full"
              >
                <Sparkles className="w-5 h-5" />
                Let AI Build Your Resume
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
              <Card className="w-[280px] h-[400px] p-4 cursor-pointer hover:border-accent transition-colors">
                <div className="h-full flex flex-col">
                  <div className="flex-1 bg-gray-100 rounded-md mb-4">
                    {/* Preview Image 1 */}
                  </div>
                  <div className="text-lg font-medium">Professional</div>
                  <p className="text-sm text-muted-foreground">Clean and modern design for corporate roles</p>
                </div>
              </Card>

              <Card className="w-[280px] h-[400px] p-4 cursor-pointer hover:border-accent transition-colors">
                <div className="h-full flex flex-col">
                  <div className="flex-1 bg-gray-100 rounded-md mb-4">
                    {/* Preview Image 2 */}
                  </div>
                  <div className="text-lg font-medium">Creative</div>
                  <p className="text-sm text-muted-foreground">Stand out with a unique layout for creative positions</p>
                </div>
              </Card>

              <Card className="w-[280px] h-[400px] p-4 cursor-pointer hover:border-accent transition-colors">
                <div className="h-full flex flex-col">
                  <div className="flex-1 bg-gray-100 rounded-md mb-4">
                    {/* Preview Image 3 */}
                  </div>
                  <div className="text-lg font-medium">Academic</div>
                  <p className="text-sm text-muted-foreground">Comprehensive layout for academic and research roles</p>
                </div>
              </Card>
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
