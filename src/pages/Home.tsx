import { format } from "date-fns";
import { Medal, Star, Award, Trophy, ChevronRight, Calendar, Briefcase, Building2, Upload, FileText, Download, Share2, Pencil, Eye, EyeOff, Settings, Plus, Globe, Twitter, Linkedin, Github, Mail, Phone, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAccomplishmentStore } from "@/store/accomplishments";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { View } from "@/types/accomplishment";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface ProfileSettings {
  name: string;
  avatarUrl: string;
  bio: string;
  website: string;
  twitter: string;
  linkedin: string;
  github: string;
  email: string;
  phone: string;
  location: string;
}

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
  
  const [profileSettings, setProfileSettings] = useState<ProfileSettings>({
    name: "",
    avatarUrl: "",
    bio: "",
    website: "",
    twitter: "",
    linkedin: "",
    github: "",
    email: "",
    phone: "",
    location: ""
  });

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
    if (!newAccomplishment.title || !newAccomplishment.privateDetails || !newAccomplishment.role || !newAccomplishment.company) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const accomplishment = {
      id: Date.now().toString(),
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

  const blurMetrics = (text: string) => {
    return text.replace(/\$?\d+([,.]?\d+)?(\s*%|\s*k|\s*M)?/g, '***');
  };

  const getCompanyDisplay = (company: string) => {
    if (view === "private") return company;
    return <span className="bg-gray-200 px-1.5 py-0.5 rounded">REDACTED</span>;
  };

  const formatDetails = (details: string) => {
    if (view === "private") return details;
    const redactedText = blurMetrics(details);
    return <span dangerouslySetInnerHTML={{ __html: redactedText }} />;
  };

  const selectedItem = accomplishments.find(a => a.id === selectedAccomplishment);

  useEffect(() => {
    const savedProfile = localStorage.getItem('profileSettings');
    if (savedProfile) {
      setProfileSettings(JSON.parse(savedProfile));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('view', view);
    window.dispatchEvent(new Event('viewChange'));
  }, [view]);

  const handleSaveProfile = () => {
    localStorage.setItem('profileSettings', JSON.stringify(profileSettings));
    setShowSettings(false);
    toast({
      title: "Success",
      description: "Profile settings saved successfully!"
    });
  };

  const handleViewToggle = (checked: boolean) => {
    setView(checked ? "public" : "private" as View);
  };

  const ProfileSection = () => {
    if (view !== "public") return null;

    return (
      <div className="mb-8">
        <div className="flex flex-col items-center text-center space-y-4 mb-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={profileSettings.avatarUrl} alt={profileSettings.name} />
            <AvatarFallback>{profileSettings.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-xl">{profileSettings.name}</h2>
            <p className="text-sm text-gray-600 mt-1">{profileSettings.bio}</p>
          </div>
        </div>
        
        <div className="flex justify-center gap-6">
          {profileSettings.website && (
            <a href={profileSettings.website} target="_blank" rel="noopener noreferrer" 
               className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
              <Globe className="h-4 w-4" />
              Website
            </a>
          )}
          {profileSettings.twitter && (
            <a href={profileSettings.twitter} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
              <Twitter className="h-4 w-4" />
              Twitter
            </a>
          )}
          {profileSettings.linkedin && (
            <a href={profileSettings.linkedin} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          )}
          {profileSettings.github && (
            <a href={profileSettings.github} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
              <Github className="h-4 w-4" />
              GitHub
            </a>
          )}
        </div>

        <div className="flex justify-center gap-6 mt-4">
          {profileSettings.email && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="h-4 w-4" />
              {profileSettings.email}
            </div>
          )}
          {profileSettings.phone && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="h-4 w-4" />
              {profileSettings.phone}
            </div>
          )}
          {profileSettings.location && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              {profileSettings.location}
            </div>
          )}
        </div>
        <Separator className="mt-6" />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F6FBFB]">
      <div className="max-w-7xl mx-auto px-4">
        <main className="max-w-2xl mx-auto py-8">
          {view === "private" && (
            <div className="flex justify-between mb-4 items-center">
              <Button
                onClick={() => setShowAddModal(true)}
                className="gap-2 bg-[#377E7F] hover:bg-[#377E7F]/90 text-white"
              >
                <Plus className="h-4 w-4" />
                Add Accomplishment
              </Button>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="view-mode" className="text-sm text-gray-600 flex items-center gap-2">
                    <EyeOff className="w-4 h-4" />
                    Private View
                  </Label>
                  <Switch
                    id="view-mode"
                    checked={view === "public"}
                    onCheckedChange={handleViewToggle}
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
          )}

          {view === "public" && (
            <div className="flex justify-end mb-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="view-mode" className="text-sm text-gray-600 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Public View
                </Label>
                <Switch
                  id="view-mode"
                  checked={view === "public"}
                  onCheckedChange={handleViewToggle}
                />
              </div>
            </div>
          )}

          <ProfileSection />

          <Card className="p-6 [box-shadow:rgba(0,_0,_0,_0.05)_0px_6px_24px_0px,_rgba(0,_0,_0,_0.08)_0px_0px_0px_1px] border-0">
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
                                <h3 className="font-medium text-sm text-gray-900 leading-5">
                                  {accomplishment.title}
                                </h3>
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
                            <div className="mt-1.5 text-xs text-gray-600 leading-relaxed">
                              {formatDetails(accomplishment.privateDetails)}
                            </div>
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
      </div>

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
                <p>{view === "private" ? selectedItem.privateDetails : formatDetails(selectedItem.privateDetails)}</p>
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-4">
              <h3 className="font-medium text-sm">Profile Information</h3>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={profileSettings.name}
                      onChange={(e) => setProfileSettings(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="avatarUrl">Profile Picture URL</Label>
                    <Input
                      id="avatarUrl"
                      value={profileSettings.avatarUrl}
                      onChange={(e) => setProfileSettings(prev => ({ ...prev, avatarUrl: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileSettings.bio}
                    onChange={(e) => setProfileSettings(prev => ({ ...prev, bio: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium text-sm">Social Links</h3>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={profileSettings.website}
                      onChange={(e) => setProfileSettings(prev => ({ ...prev, website: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      value={profileSettings.twitter}
                      onChange={(e) => setProfileSettings(prev => ({ ...prev, twitter: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={profileSettings.linkedin}
                      onChange={(e) => setProfileSettings(prev => ({ ...prev, linkedin: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      value={profileSettings.github}
                      onChange={(e) => setProfileSettings(prev => ({ ...prev, github: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium text-sm">Contact Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileSettings.email}
                    onChange={(e) => setProfileSettings(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profileSettings.phone}
                    onChange={(e) => setProfileSettings(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileSettings.location}
                    onChange={(e) => setProfileSettings(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium text-sm">Visibility Settings</h3>
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
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowSettings(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProfile}>
              Save Changes
            </Button>
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
