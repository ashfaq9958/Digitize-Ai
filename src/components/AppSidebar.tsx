import { FileSearch, ClipboardCheck, FileEdit } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Extraction",
    url: "/extraction",
    icon: FileSearch,
    description: "Create & manage templates",
  },
  {
    title: "Cross-Validation",
    url: "/cross-validation",
    icon: ClipboardCheck,
    description: "Validate extracted data",
  },
  {
    title: "Form-Filling",
    url: "/form-filling",
    icon: FileEdit,
    description: "Auto-fill forms",
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath.startsWith(path);

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-60"} collapsible="icon">
      <SidebarContent className="bg-gradient-card">
        <div className="p-4 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <FileSearch className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">
                  Digitize AI
                </h1>
                <p className="text-xs text-muted-foreground">
                  Extract & Process
                </p>
              </div>
            </div>
          )}
        </div>

        <SidebarGroup className="px-2 py-4">
          <SidebarGroupLabel className="text-muted-foreground text-xs uppercase tracking-wider mb-2">
            {!isCollapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (  
                <SidebarMenuItem key={item.title} className="mb-4">
                  {" "}
                  {/* 👈 adds space below each item */}
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive: navIsActive }) =>
                        `flex items-start gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 group
             ${
               navIsActive || isActive(item.url)
                 ? "bg-primary text-primary-foreground shadow-glow"
                 : "hover:bg-muted/60 text-foreground"
             }`
                      }
                    >
                      <item.icon className="h-4 w-4 mt-0.5 text-muted-foreground group-hover:text-foreground" />
                      {!isCollapsed && (
                        <div className="flex flex-col flex-1">
                          <span className="font-medium leading-tight">
                            {item.title}
                          </span>
                          <span className="text-xs opacity-80 leading-snug">
                            {item.description}
                          </span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
