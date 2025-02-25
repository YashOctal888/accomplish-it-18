
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Settings, User, ChevronDown, LogOut } from "lucide-react";
import Home from "./pages/Home";
import ResumeBuilder from "./pages/ResumeBuilder";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`relative h-14 flex items-center px-4 text-sm font-medium transition-colors hover:text-white ${
        isActive 
          ? "text-white after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-0.5 after:bg-white" 
          : "text-white/80 hover:after:absolute hover:after:bottom-[-1px] hover:after:left-0 hover:after:right-0 hover:after:h-0.5 hover:after:bg-white/50"
      }`}
    >
      {children}
    </Link>
  );
};

const ProfileDropdown = () => {
  const location = useLocation();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-4 h-14 text-sm font-medium text-white/80 hover:text-white">
        <User className="h-4 w-4" />
        <span>Profile</span>
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <Link to="/profile">
          <DropdownMenuItem className="cursor-pointer">
            <User className="h-4 w-4 mr-2" />
            Profile
          </DropdownMenuItem>
        </Link>
        <Link to="/settings">
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-red-600">
          <LogOut className="h-4 w-4 mr-2" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Navigation = ({ isPublicView }: { isPublicView: boolean }) => {
  if (isPublicView) return null;

  return (
    <nav className="bg-[#377E7F]">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        <Link to="/">
          <img 
            src="/lovable-uploads/b319e0ed-4a1d-4f33-a859-c9ab1db0a991.png" 
            alt="Accomplish It" 
            className="h-9"
          />
        </Link>
        <NavigationMenu className="absolute left-1/2 -translate-x-1/2">
          <NavigationMenuList className="space-x-2">
            <NavigationMenuItem>
              <NavLink to="/">
                Accomplishments
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink to="/resume-builder">
                Artifacts
              </NavLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <ProfileDropdown />
      </div>
    </nav>
  );
};

const App = () => {
  const [isPublicView, setIsPublicView] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      const view = localStorage.getItem('view');
      setIsPublicView(view === 'public');
    };

    handleStorageChange();
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('viewChange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('viewChange', handleStorageChange);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation isPublicView={isPublicView} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume-builder" element={<ResumeBuilder />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
