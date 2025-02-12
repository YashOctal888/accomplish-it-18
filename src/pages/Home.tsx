import { format } from "date-fns";
import { Medal, Star, Award, Trophy, ChevronRight, Calendar, Briefcase, Building2, Upload, FileText, Download, Share2, Pencil, Eye, EyeOff, Settings, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAccomplishmentStore } from "@/store/accomplishments";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { View } from "@/types/accomplishment";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface VisibilitySettings {
  title: boolean;
  date: boolean;
  company: boolean;
  role: boolean;
  details: boolean;
  attachments: boolean;
  tags: boolean;
}

const Home = () => {
  const accomplishments = useAccomplishmentStore((state) => state.accomplishments);
  const [selectedAccomplishment, setSelectedAccomplishment] = useState<string | null>(null);
  const [view, setView] = useState<View>("private");
  const [showSettings, setShowSettings] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const { toast } = useToast();
  
  const [newAccomplishment, setNewAccomplishment] = useState({
    title: "",
    date: format(new Date(), "yyyy-MM-dd"),
    role: "",
    company: "",
    privateDetails: "",
    tags: [] as string[]
  });

  const [visibilitySettings, setVisibilitySettings] = useState<VisibilitySettings>({
    title: true,
    date: true,
    company: true,
    role: true,
    details: true,
    attachments: false,
    tags: true,
  });

  // Group accomplishments by month and year
  const groupedAccomplishments = accomplishments.reduce((groups, accomplishment) => {
    const date = new Date(accomplishment.date);
    const key = format(date, "MMMM yyyy");
    
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(accomplishment);
    return groups;
  }, {} as Record<string, typeof accomplishments>);

  const getIcon = (index: number) => {
    const icons = [Medal, Trophy, Star, Award];
    return icons[index % icons.length];
  };

  const handleOpenDetails = (id: string) => {
    if (view === "private") {
      setSelectedAccomplishment(id);
    }
  };

  const handleCloseDetails = () => {
    setSelectedAccomplishment(null);
  };

  const handleAddAccomplishment = () => {
    // Basic validation
    if (!newAccomplishment.title || !newAccomplishment.privateDetails || !newAccomplishment.role || !newAccomplishment.company) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const accomplishment = {
      id: Date.now().toString(), // Simple way to generate unique ID
      ...newAccomplishment,
      attachments: [],
      tags: newAccomplishment.tags
    };

    useAccomplishmentStore.setState((state) => ({
      accomplishments: [accomplishment, ...state.accomplishments]
    }));

    setNewAccomplishment({
      title: "",
      date: format(new Date(), "yyyy-MM-dd"),
      role: "",
      company: "",
      privateDetails: "",
      tags: []
    });

    setShowAddModal(false);
    toast({
      title: "Success",
      description: "Accomplishment added successfully!"
    });
  };

  // Function to blur metrics in text
  const blurMetrics = (text: string) => {
    return text.replace(/\$?\d+([,.]?\d+)?(\s*%|\s*k|\s*M)?/g, '***');
  };

  // Function to blur company name
  const getCompanyDisplay = (company: string) => {
    if (view === "private") return company;
    return "Company ***";
  };

  const selectedItem = accomplishments.find(a => a.id === selectedAccomplishment);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <main className="max-w-2xl mx-auto py-8 px-4">
        <div className="flex justify-between mb-4 items-center">
          <Button
            onClick={() => setShowAddModal(true)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Accomplishment
          </Button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="view-mode" className="text-sm text-gray-600 flex items-center gap-2">
                {view === "private" ? (
                  <>
                    <EyeOff className="w-4 h-4" />
                    Private View
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    Public View
                  </>
                )}
              </Label>
              <Switch
                id="view-mode"
                checked={view === "public"}
                onCheckedChange={(checked) => setView(checked ? "public" : "private")}
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setShowSettings(true)}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card className="p-6 shadow-sm border-gray-100">
          <div className="space-y-6">
            {Object.entries(groupedAccomplishments).map(([dateGroup, items], groupIndex) => (
              <div key={dateGroup}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px flex-1 bg-gray-200" />
                  <span className="text-sm font-medium text-gray-500">{dateGroup}</span>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>
                {items.map((accomplishment, index) => {
                  const Icon = getIcon(index);
                  return (
                    <div key={accomplishment.id} className="relative">
                      {index < items.length - 1 && (
                        <div className="absolute left-[11px] top-[24px] h-full w-[2px] bg-gray-100" />
                      )}
                      <div className="flex gap-3">
                        <div className={cn(
                          "h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                          accomplishment.tags?.includes("highlight") ? "bg-blue-50 text-blue-500" : "bg-gray-50 text-gray-400"
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
                            {view === "private" && (
                              <button 
                                onClick={() => handleOpenDetails(accomplishment.id)}
                                className="flex-shrink-0 text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center gap-0.5 pt-0.5"
                              >
                                See Details
                                <ChevronRight className="h-3 w-3" />
                              </button>
                            )}
                          </div>
                          <p className="mt-1.5 text-xs text-gray-600 leading-relaxed">
                            {view === "private" ? accomplishment.privateDetails : blurMetrics(accomplishment.privateDetails)}
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
            ))}
          </div>
        </Card>
      </main>

      {/* Details Dialog */}
      <Dialog open={!!selectedAccomplishment} onOpenChange={(open) => !open && handleCloseDetails()}>
        <DialogContent className="max-w-lg">
          {selectedItem && (
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium text-lg">{selectedItem.title}</h3>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <Star className="h-3.5 w-3.5 text-yellow-500" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <Pencil className="h-3.5 w-3.5 text-gray-500" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  {format(new Date(selectedItem.date), "MMMM d, yyyy")}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Briefcase className="w-4 h-4 mr-2" />
                  {selectedItem.role}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Building2 className="w-4 h-4 mr-2" />
                  {getCompanyDisplay(selectedItem.company)}
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <p>{view === "private" ? selectedItem.privateDetails : blurMetrics(selectedItem.privateDetails)}</p>
              </div>

              {selectedItem.attachments && selectedItem.attachments.length > 0 && view === "private" && (
                <div className="space-y-2">
                  {selectedItem.attachments.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-2 min-w-0">
                        <div className={cn(
                          "p-1.5 rounded-md",
                          file.type.toLowerCase() === 'docx' ? 'bg-blue-100 text-blue-600' :
                          file.type.toLowerCase() === 'pwr' ? 'bg-orange-100 text-orange-600' :
                          file.type.toLowerCase() === 'xlc' ? 'bg-green-100 text-green-600' :
                          'bg-gray-100 text-gray-600'
                        )}>
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-xs truncate">{file.name}</p>
                          <p className="text-[10px] text-gray-500">{file.type.toUpperCase()} • {file.size}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <Download className="w-3.5 h-3.5" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <Share2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedItem.tags && selectedItem.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {selectedItem.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className={cn(
                        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
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
          )}
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Visibility Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="text-sm text-gray-600 mb-4">
              Choose which components to show in the public view:
            </div>
            {Object.entries(visibilitySettings).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={value}
                  onCheckedChange={(checked) => 
                    setVisibilitySettings(prev => ({
                      ...prev,
                      [key]: checked === true
                    }))
                  }
                />
                <Label htmlFor={key} className="text-sm font-medium capitalize">
                  {key}
                </Label>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Accomplishment Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Accomplishment</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newAccomplishment.title}
                onChange={(e) => setNewAccomplishment(prev => ({ ...prev, title: e.target.value }))}
                placeholder="E.g., Launched new product feature"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={newAccomplishment.date}
                onChange={(e) => setNewAccomplishment(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={newAccomplishment.role}
                onChange={(e) => setNewAccomplishment(prev => ({ ...prev, role: e.target.value }))}
                placeholder="E.g., Product Manager"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={newAccomplishment.company}
                onChange={(e) => setNewAccomplishment(prev => ({ ...prev, company: e.target.value }))}
                placeholder="E.g., Tech Corp"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="details">Details</Label>
              <Textarea
                id="details"
                value={newAccomplishment.privateDetails}
                onChange={(e) => setNewAccomplishment(prev => ({ ...prev, privateDetails: e.target.value }))}
                placeholder="Describe your accomplishment with specific metrics and impact..."
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2">
                {["Achievement", "Leadership", "Project", "Innovation", "Sales", "Technical"].map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={tag}
                      checked={newAccomplishment.tags.includes(tag)}
                      onCheckedChange={(checked) => {
                        setNewAccomplishment(prev => ({
                          ...prev,
                          tags: checked
                            ? [...prev.tags, tag]
                            : prev.tags.filter(t => t !== tag)
                        }));
                      }}
                    />
                    <label
                      htmlFor={tag}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {tag}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddAccomplishment}>
              Add Accomplishment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
