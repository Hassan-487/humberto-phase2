
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminRoute, DriverRoute } from "@/components/RoleBaseGuard";


import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import Drivers from "./pages/Drivers";
import Trucks from "./pages/Trucks";
import Trips from "./pages/Trips";
import Alerts from "./pages/Alerts";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

// Driver Pages
import DriverDashboard from "./pages/driver/DriverDashboard";
import DriverTrips from "./pages/driver/DriverTrips";
import TripDetails from "./pages/driver/TripDetails";
import TruckScreen from "./pages/driver/TruckScreen";
import Profile from "./pages/driver/Profile";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30000,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
      
          
          <Routes>
           
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />

            {/* Admin/Support Routes */}
            <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
            <Route path="/drivers" element={<AdminRoute><Drivers /></AdminRoute>} />
            <Route path="/trucks" element={<AdminRoute><Trucks /></AdminRoute>} />
            <Route path="/trips" element={<AdminRoute><Trips /></AdminRoute>} />
            <Route path="/alerts" element={<AdminRoute><Alerts /></AdminRoute>} />
            {/* <Route path="/reports" element={<AdminRoute><Reports /></AdminRoute>} /> */}
            <Route path="/settings" element={<AdminRoute><Settings /></AdminRoute>} />

            {/* Driver Routes */}
             <Route path="/driver/dashboard" element={<DriverRoute><DriverDashboard /></DriverRoute>} />
            <Route path="/driver/trips" element={<DriverRoute><DriverTrips /></DriverRoute>} />
            <Route path="/driver/trips/:tripId" element={<DriverRoute><TripDetails /></DriverRoute>} />
            <Route path="/driver/truck" element={<DriverRoute><TruckScreen /></DriverRoute>} />
            <Route path="/driver/profile" element={<DriverRoute><Profile /></DriverRoute>} /> 
              


            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;