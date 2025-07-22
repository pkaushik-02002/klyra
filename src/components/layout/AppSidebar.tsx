import { 
  LayoutDashboard, 
  CreditCard, 
  Bell, 
  BarChart3, 
  Settings,
  Plus
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
  { 
    title: "Dashboard", 
    url: "/app", 
    icon: LayoutDashboard,
    exact: true 
  },
  { 
    title: "Subscriptions", 
    url: "/app/subscriptions", 
    icon: CreditCard 
  },
  { 
    title: "Reminders", 
    url: "/app/reminders", 
    icon: Bell 
  },
  { 
    title: "Insights", 
    url: "/app/insights", 
    icon: BarChart3 
  },
  { 
    title: "Settings", 
    url: "/app/settings", 
    icon: Settings 
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  
  const isActive = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className={cn("border-r border-border", state === "collapsed" ? "w-14" : "w-64")}>
      <SidebarHeader className="border-b border-border p-4">
        {state !== "collapsed" && (
          <div className="flex items-center gap-2">
            <img src="/images/logos/Klyra-official-logo.png" alt="Klyra Logo" title="Klyra Logo" className="h-16 w-16 rounded-lg" />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                        isActive(item.url, item.exact)
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Add Subscription Button */}
        <div className="mt-6">
          <Button className="premium-button w-full">
            <Plus className="h-4 w-4" />
            {state !== "collapsed" && <span className="ml-2">Add Subscription</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}