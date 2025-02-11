
import { format } from "date-fns";
import { Medal, Star, Award, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAccomplishmentStore } from "@/store/accomplishments";

const Home = () => {
  const accomplishments = useAccomplishmentStore((state) => state.accomplishments);

  const getIcon = (index: number) => {
    const icons = [Medal, Trophy, Star, Award];
    return icons[index % icons.length];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <h1 className="text-2xl font-semibold text-gray-900">Accomplishment Timeline</h1>
        </div>
      </header>
      <main className="max-w-3xl mx-auto py-8 px-4">
        <Card className="p-6">
          <div className="space-y-8">
            {accomplishments.map((accomplishment, index) => {
              const Icon = getIcon(index);
              return (
                <div key={accomplishment.id} className="relative">
                  {index < accomplishments.length - 1 && (
                    <div className="absolute left-[17px] top-[28px] h-full w-px bg-gray-200" />
                  )}
                  <div className="flex gap-4">
                    <div className={cn(
                      "rounded-full p-1 flex-shrink-0",
                      accomplishment.highlighted ? "bg-amber-100" : "bg-gray-100"
                    )}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{accomplishment.title}</h3>
                          <p className="text-sm text-gray-500">
                            {format(new Date(accomplishment.date), "d/MM/yyyy")}
                          </p>
                        </div>
                        {accomplishment.highlighted && (
                          <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-800 ring-1 ring-inset ring-amber-600/20">
                            Highlight
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        {accomplishment.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Home;
