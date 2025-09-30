import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { 
  Bell, 
  Search, 
  Shield, 
  AlertTriangle, 
  Activity, 
  Bot, 
  Settings, 
  Moon, 
  Sun,
  Menu,
  ChevronDown
} from 'lucide-react';

// Import page components
import DashboardPage from './pages/DashboardPage';
import AlertsPage from './pages/AlertsPage';
import AIAssistantPage from './pages/AIAssistantPage';
import PlaybooksPage from './pages/PlaybooksPage';
import SettingsPage from './pages/SettingsPage';

// Navigation helper function
const renderPageContent = (selectedNav: string) => {
  switch (selectedNav) {
    case 'dashboard':
      return <DashboardPage />;
    case 'alerts':
      return <AlertsPage />;
    case 'assistant':
      return <AIAssistantPage />;
    case 'playbooks':
      return <PlaybooksPage />;
    case 'settings':
      return <SettingsPage />;
    default:
      return <DashboardPage />;
  }
};

interface SOCDashboardProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function SOCDashboard({ isDarkMode, toggleDarkMode }: SOCDashboardProps) {
  const [selectedNav, setSelectedNav] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
    { id: 'assistant', label: 'AI Assistant', icon: Bot },
    { id: 'playbooks', label: 'Playbooks', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 bg-sidebar border-r border-sidebar-border flex flex-col`}>
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            {!sidebarCollapsed && (
              <div>
                <h1 className="text-sidebar-foreground">SOC Dashboard</h1>
                <p className="text-xs text-sidebar-foreground/60">Security Operations</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={selectedNav === item.id ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 ${sidebarCollapsed ? 'px-2' : ''}`}
                  onClick={() => setSelectedNav(item.id)}
                >
                  <Icon className="w-5 h-5" />
                  {!sidebarCollapsed && item.label}
                </Button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b bg-card border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search alerts, incidents, or ask AI..."
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                5
              </span>
            </Button>

            <Separator orientation="vertical" className="h-6" />

            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/api/placeholder/32/32" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm">John Doe</p>
                <p className="text-xs text-muted-foreground">SOC Analyst</p>
              </div>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {renderPageContent(selectedNav)}
        </main>
      </div>
    </div>
  );
}