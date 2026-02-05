

import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import type { UserRole } from "@/services/auth.service";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
//import { DriverDashboardLayout } from "@/components/layout/DriverDashboardLayout";

interface RoleBasedRouteGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
}

export function RoleBasedRouteGuard({ 
  children, 
  allowedRoles,
  redirectTo = "/login"
}: RoleBasedRouteGuardProps) {
  const { isAuthenticated, user, isLoading } = useAuth();


  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to={redirectTo} replace />;
  }
  if (!allowedRoles.includes(user.role)) {    
    // Redirect based on user's actual role
    if (user.role === 'driver') {
      
      return <Navigate to="/driver/dashboard" replace />;
    }
    console.log('↪️ Redirecting to admin dashboard');
    return <Navigate to="/dashboard" replace />;
  }


  return <>{children}</>;
}


export function AdminRoute({ children }: { children: React.ReactNode }) {
  return (
    <RoleBasedRouteGuard allowedRoles={['admin', 'support']}>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </RoleBasedRouteGuard>
  );
}

/**
 * Shorthand for driver routes
 * Wraps content with DriverDashboardLayout
 */
export function DriverRoute({ children }: { children: React.ReactNode }) {
  return (
    <RoleBasedRouteGuard allowedRoles={['driver']}>
        {children}
    </RoleBasedRouteGuard>
  );
}