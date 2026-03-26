

import { ReactNode, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  Users,
  Truck,
  Route,
  AlertTriangle,
  FileText,
  Settings,
  LogOut,
  Menu,
  Building2,
  User2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardLayoutProps {
  children: ReactNode;
}

const menuItems = [
  { icon: LayoutDashboard, labelKey: 'sidebar.dashboard', path: '/dashboard' },
  { icon: Users, labelKey: 'sidebar.drivers', path: '/drivers' },
  { icon: Truck, labelKey: 'sidebar.trucks', path: '/trucks' },
  { icon: Building2, labelKey: 'sidebar.company', path: '/company' },
  { icon: User2, labelKey: 'sidebar.customer', path: '/customer' },
  { icon: Route, labelKey: 'sidebar.trips', path: '/trips' },
  { icon: AlertTriangle, labelKey: 'sidebar.alerts', path: '/alerts' },
  { icon: FileText, labelKey: 'sidebar.agreements', path: '/agreements' },
  // { icon: FileText, labelKey: 'sidebar.reports', path: '/reports' },
  
  { icon: Settings, labelKey: 'sidebar.settings', path: '/settings' }
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/login', { replace: true });
    }
  };

  const getUserInitials = () => {
    if (!user) return '?';
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user.firstName) return user.firstName[0].toUpperCase();
    if (user.email) return user.email[0].toUpperCase();
    return '?';
  };

  const getDisplayName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user?.firstName) return user.firstName;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  const activeMenu =
    menuItems.find(item => item.path === location.pathname)?.labelKey ||
    'sidebar.dashboard';

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-sidebar transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <Truck className="h-8 w-8 text-sidebar-primary" />
            {sidebarOpen && (
              <span className="text-xl font-bold text-sidebar-foreground">
                FleetPro
              </span>
            )}
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <div
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && <span>{t(item.labelKey)}</span>}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <div
            onClick={handleLogout}
            className="sidebar-item text-sidebar-muted hover:text-destructive cursor-pointer"
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span>{t('sidebar.logout')}</span>}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <h1 className="text-lg font-semibold text-foreground">
              {t(activeMenu)}
            </h1>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">
                  {getDisplayName()}
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  {user?.role || 'User'}
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">
                  {getUserInitials()}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
