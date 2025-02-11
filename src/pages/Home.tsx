
import { format } from "date-fns";
import { Package, Truck, CheckCircle, FileCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TimelineEvent {
  id: string;
  title: string;
  timestamp: string;
  details?: string[];
  icon: React.ReactNode;
  status: "completed" | "in-progress";
}

const timelineEvents: TimelineEvent[] = [
  {
    id: "1",
    title: "Product Shipped",
    timestamp: "2023-09-13T17:23:00",
    details: [
      "Courier Service: UPS, R. Gosling",
      "Estimated Delivery Date: 15/09/2023"
    ],
    icon: <Truck className="h-5 w-5" />,
    status: "completed"
  },
  {
    id: "2",
    title: "Product Packaging",
    timestamp: "2023-09-13T16:13:00",
    details: [
      "Tracking number: 3409-4934-4253",
      "Warehouse: Apple Spot 13b"
    ],
    icon: <Package className="h-5 w-5" />,
    status: "completed"
  },
  {
    id: "3",
    title: "Order Confirmed",
    timestamp: "2023-09-13T15:53:00",
    icon: <CheckCircle className="h-5 w-5" />,
    status: "completed"
  },
  {
    id: "4",
    title: "Order Placed",
    timestamp: "2023-09-13T15:43:00",
    icon: <FileCheck className="h-5 w-5" />,
    status: "completed"
  }
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <h1 className="text-2xl font-semibold text-gray-900">Order Timeline</h1>
        </div>
      </header>
      <main className="max-w-3xl mx-auto py-8 px-4">
        <Card className="p-6">
          <div className="space-y-8">
            {timelineEvents.map((event, index) => (
              <div key={event.id} className="relative">
                {index < timelineEvents.length - 1 && (
                  <div className="absolute left-[17px] top-[28px] h-full w-px bg-gray-200" />
                )}
                <div className="flex gap-4">
                  <div className={cn(
                    "rounded-full p-1 flex-shrink-0",
                    event.status === "completed" ? "bg-green-100" : "bg-gray-100"
                  )}>
                    {event.icon}
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{event.title}</h3>
                        <p className="text-sm text-gray-500">
                          {format(new Date(event.timestamp), "d/MM/yyyy h:mm a")}
                        </p>
                      </div>
                      <button className="text-sm font-medium text-green-600 hover:text-green-700">
                        See Details
                      </button>
                    </div>
                    {event.details && (
                      <div className="mt-2 space-y-1">
                        {event.details.map((detail, idx) => (
                          <p key={idx} className="text-sm text-gray-600">
                            {detail}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Home;
