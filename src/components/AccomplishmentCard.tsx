
import { Accomplishment, View } from "../types/accomplishment";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { format } from "date-fns";
import { Check, Calendar, Briefcase, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccomplishmentCardProps {
  accomplishment: Accomplishment;
  view: View;
  onSelect?: (id: string) => void;
}

export const AccomplishmentCard = ({
  accomplishment,
  view,
  onSelect,
}: AccomplishmentCardProps) => {
  const { title, date, role, company, privateDetails, selected } = accomplishment;

  return (
    <Card
      className={cn(
        "w-full transition-all duration-300 hover:shadow-lg animate-slide-up",
        selected && "ring-2 ring-accent"
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        {view === "private" && onSelect && (
          <Checkbox
            checked={selected}
            onCheckedChange={() => onSelect(accomplishment.id)}
            className="mt-1"
          />
        )}
        <div className="flex-1 ml-4">
          <h3 className="font-semibold text-lg leading-tight">{title}</h3>
          <div className="space-y-2 mt-2">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              {format(new Date(date), "MMMM d, yyyy")}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Briefcase className="w-4 h-4 mr-2" />
              {role}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Building2 className="w-4 h-4 mr-2" />
              {company}
            </div>
          </div>
        </div>
      </CardHeader>
      {view === "private" && (
        <CardContent>
          <div className="mt-2 text-sm text-gray-600">
            <p className="italic">{privateDetails}</p>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
