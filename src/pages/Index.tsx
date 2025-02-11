
import { Timeline } from "@/components/Timeline";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <h1 className="text-2xl font-semibold text-gray-900">Accomplish It</h1>
        </div>
      </header>
      <main>
        <Timeline />
      </main>
    </div>
  );
};

export default Index;
