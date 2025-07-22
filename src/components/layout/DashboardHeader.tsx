import { Bell, Search, User, Moon, Sun, LogOut, Settings, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTheme } from "@/components/theme-provider";
import { useAuthContext } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/use-firebase";
import { useNavigate } from "react-router-dom";

export function DashboardHeader() {
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuthContext();
  const { profile, loading: profileLoading } = useUserProfile(user?.uid || null);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (profile?.displayName) {
      return profile.displayName.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    if (user?.displayName) {
      return user.displayName.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  // Get user display name
  const getUserDisplayName = () => {
    return profile?.displayName || user?.displayName || "User";
  };

  // Get user email
  const getUserEmail = () => {
    return user?.email || "";
  };

  // Get user photo URL
  const getUserPhotoURL = () => {
    return profile?.photoURL || user?.photoURL || "";
  };

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between gap-4 px-4 sm:px-6 h-full">
        {/* Left side - Search and Sidebar Trigger */}
        <div className="flex items-center gap-4 flex-1">
          <SidebarTrigger />
          
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search subscriptions..." 
                className="pl-9 premium-input"
              />
            </div>
          </div>
        </div>

        {/* Right side - Theme, Notifications, and User Profile */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="hidden sm:flex"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-primary">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-4">
                <h3 className="font-semibold mb-2">Notifications</h3>
                <div className="space-y-2">
                  <div className="p-2 rounded-lg bg-muted/50">
                    <p className="text-sm font-medium">Netflix payment due tomorrow</p>
                    <p className="text-xs text-muted-foreground">$15.99 • Monthly</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50">
                    <p className="text-sm font-medium">Spotify payment processed</p>
                    <p className="text-xs text-muted-foreground">$9.99 • Today</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50">
                    <p className="text-sm font-medium">Adobe Creative Cloud renewal</p>
                    <p className="text-xs text-muted-foreground">$52.99 • In 3 days</p>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full hover:bg-muted/50 transition-all duration-200">
                <Avatar className="h-9 w-9 border-2 border-primary/10">
                  <AvatarImage 
                    src={getUserPhotoURL()} 
                    alt={getUserDisplayName()} 
                  />
                  <AvatarFallback className="bg-gradient-to-br from-primary/10 to-primary/20 text-primary font-semibold">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72" align="end" forceMount>
              {/* User Profile Section */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-primary/10">
                    <AvatarImage 
                      src={getUserPhotoURL()} 
                      alt={getUserDisplayName()} 
                    />
                    <AvatarFallback className="bg-gradient-to-br from-primary/10 to-primary/20 text-primary font-semibold text-lg">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">
                      {profileLoading ? "Loading..." : getUserDisplayName()}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {getUserEmail()}
                    </p>
                    {profile?.monthlyBudget && (
                      <p className="text-xs text-success mt-1">
                        Budget: ${profile.monthlyBudget}/month
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                <DropdownMenuItem 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => navigate("/app/settings")}
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => navigate("/app/settings")}
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>

                <DropdownMenuItem 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => navigate("/app/subscriptions")}
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Subscriptions</span>
                </DropdownMenuItem>
              </div>

              <DropdownMenuSeparator />
              
              <div className="p-2">
                <DropdownMenuItem 
                  className="text-destructive focus:text-destructive cursor-pointer"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}