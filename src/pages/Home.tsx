
import { format } from "date-fns";
import { Medal, Star, Award, Trophy, ChevronRight } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50/50">
      <main className="max-w-2xl mx-auto py-8 px-4">
        <Card className="p-6 shadow-sm border-gray-100">
          <div className="space-y-6">
            {accomplishments.map((accomplishment, index) => {
              const Icon = getIcon(index);
              return (
                <div key={accomplishment.id} className="relative">
                  {index < accomplishments.length - 1 && (
                    <div className="absolute left-[11px] top-[24px] h-full w-[2px] bg-gray-100" />
                  )}
                  <div className="flex gap-3">
                    <div className={cn(
                      "h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                      accomplishment.highlighted ? "bg-blue-50 text-blue-500" : "bg-gray-50 text-gray-400"
                    )}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-x-2">
                        <div className="min-w-0">
                          <h3 className="font-medium text-sm text-gray-900 leading-5">{accomplishment.title}</h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {format(new Date(accomplishment.date), "MMM d, yyyy")}
                          </p>
                        </div>
                        <button className="flex-shrink-0 text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center gap-0.5 pt-0.5">
                          See Details
                          <ChevronRight className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="mt-1.5 text-xs text-gray-600 leading-relaxed">
                        {accomplishment.description}
                      </p>
                      {accomplishment.tags && accomplishment.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {accomplishment.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className={cn(
                                "inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                                tag === "highlight"
                                  ? "bg-blue-50 text-blue-600"
                                  : "bg-gray-50 text-gray-600"
                              )}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
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
