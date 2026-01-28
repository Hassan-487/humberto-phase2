// import { Navigate } from "react-router-dom";
// import { useAuth } from "@/contexts/AuthContext";
// import { Loader2 } from "lucide-react";
// import type { UserRole } from "@/services/auth.service";

// interface RoleBasedRouteGuardProps {
//   children: React.ReactNode;
//   allowedRoles: UserRole[];
//   redirectTo?: string;
// }


// export function RoleBasedRouteGuard({ 
//   children, 
//   allowedRoles,
//   redirectTo = "/login"
// }: RoleBasedRouteGuardProps) {
//   const { isAuthenticated, user, isLoading } = useAuth();

//   // Show loading state
//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     );
//   }

//   if (!isAuthenticated || !user) {
//     return <Navigate to={redirectTo} replace />;
//   }

//   // Check if user's role is allowed
//   if (!allowedRoles.includes(user.role)) {
//     // Redirect based on user's actual role
//     if (user.role === 'driver') {
//       return <Navigate to="/driver/dashboard" replace />;
//     }
//     return <Navigate to="/dashboard" replace />;
//   }

//   // User is authenticated and has correct role
//   return <>{children}</>;
// }

// /**
//  * Shorthand for admin/support routes
//  */
// export function AdminRoute({ children }: { children: React.ReactNode }) {
//   return (
//     <RoleBasedRouteGuard allowedRoles={['admin', 'support']}>
//       {children}
//     </RoleBasedRouteGuard>
//   );
// }

// /**
//  * Shorthand for driver routes
//  */
// export function DriverRoute({ children }: { children: React.ReactNode }) {
//   return (
//     <RoleBasedRouteGuard allowedRoles={['driver']}>
//       {children}
//     </RoleBasedRouteGuard>
//   );
// }






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

/**
 * Route guard that protects routes based on user role
 */
export function RoleBasedRouteGuard({ 
  children, 
  allowedRoles,
  redirectTo = "/login"
}: RoleBasedRouteGuardProps) {
  const { isAuthenticated, user, isLoading } = useAuth();

  console.log('🛡️ Route Guard Check:', { 
    isAuthenticated, 
    isLoading, 
    userRole: user?.role,
    allowedRoles 
  });

  // Show loading state
  if (isLoading) {
    console.log('⏳ Auth still loading...');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated || !user) {
    console.log('❌ Not authenticated, redirecting to login');
    return <Navigate to={redirectTo} replace />;
  }

  // Check if user's role is allowed
  if (!allowedRoles.includes(user.role)) {
    console.log('⚠️ User role not allowed:', user.role, 'Allowed:', allowedRoles);
    
    // Redirect based on user's actual role
    if (user.role === 'driver') {
      console.log('↪️ Redirecting driver to driver dashboard');
      return <Navigate to="/driver/dashboard" replace />;
    }
    console.log('↪️ Redirecting to admin dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  console.log('✅ Access granted!');
  // User is authenticated and has correct role
  return <>{children}</>;
}

/**
 * Shorthand for admin/support routes
 * Wraps content with DashboardLayout
 */
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