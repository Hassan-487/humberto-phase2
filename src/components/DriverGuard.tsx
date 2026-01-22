// import { useAuth } from "@/contexts/AuthContext";
// import { ReactNode } from "react";

// interface DriverGuardProps {
//   children: ReactNode;
//   fallback?: ReactNode; // Optional: what to show if they AREN'T a driver
// }

// export function DriverGuard({ children, fallback = null }: DriverGuardProps) {
//   const { user } = useAuth();

//   // Strictly allow only the driver role
//   if (user?.role === "driver") {
//     return <>{children}</>;
//   }
//   return <>{fallback}</>;
// }




import { Navigate } from "react-router-dom";
import { useDriverAuth } from "@/contexts/DriverAuthContext";

export const DriverGuard = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading, driver } = useDriverAuth();

  if (isLoading) return null;

  if (!isAuthenticated || driver?.role !== "driver") {
    return <Navigate to="/driver/login" replace />;
  }

  return children;
};
