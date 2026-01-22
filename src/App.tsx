import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DriverAuthProvider } from "@/contexts/DriverAuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Drivers from "./pages/Drivers";
import Trucks from "./pages/Trucks";
import Trips from "./pages/Trips";
import Alerts from "./pages/Alerts";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { DriverGuard } from "./components/DriverGuard";
import DriverDashboard from "./pages/driver/DriverDashboard";
import DriverTrips from "./pages/driver/DriverTrips";
import TripDetails from "./pages/driver/TripDetails";
import TruckScreen from "./pages/driver/TruckScreen";
import Profile from "./pages/driver/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

             <Route path="/drivers" element={<ProtectedRoute><Drivers /></ProtectedRoute>} />
            <Route path="/trucks" element={<ProtectedRoute><Trucks /></ProtectedRoute>} />
            <Route path="/trips" element={<ProtectedRoute><Trips /></ProtectedRoute>} />
            <Route path="/alerts" element={<ProtectedRoute><Alerts /></ProtectedRoute>} />
            {/* <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} /> */}
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

/////////////////////////////////////////////////second one 




// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider } from "@/contexts/AuthContext";
// import { DriverAuthProvider } from "@/contexts/DriverAuthContext";
// import { ProtectedRoute } from "@/components/ProtectedRoute";
// import { DriverGuard } from "@/components/DriverGuard";

// // Admin/Support Pages
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Drivers from "./pages/Drivers";
// import Trucks from "./pages/Trucks";
// import Trips from "./pages/Trips";
// import Alerts from "./pages/Alerts";
// import Reports from "./pages/Reports";
// import Settings from "./pages/Settings";
// import NotFound from "./pages/NotFound";

// // Driver Pages
// import DriverLogin from "./pages/driver/DRiverLogin";
// import DriverDashboard from "./pages/driver/DriverDashboard";
// import DriverTrips from "./pages/driver/DriverTrips";
// import TripDetails from "./pages/driver/TripDetails";
// import TruckScreen from "./pages/driver/TruckScreen";
// import Profile from "./pages/driver/Profile";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       retry: 1,
//       staleTime: 30000,
//     },
//   },
// });

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           {/* Root redirect */}
//           <Route path="/" element={<Navigate to="/login" replace />} />

//           {/* Admin/Support Login & Routes */}
//           <Route path="/login" element={<Login />} />
          
//           <Route
//             path="/*"
//             element={
//               <AuthProvider>
//                 <Routes>
//                   <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//                   <Route path="/drivers" element={<ProtectedRoute><Drivers /></ProtectedRoute>} />
//                   <Route path="/trucks" element={<ProtectedRoute><Trucks /></ProtectedRoute>} />
//                   <Route path="/trips" element={<ProtectedRoute><Trips /></ProtectedRoute>} />
//                   <Route path="/alerts" element={<ProtectedRoute><Alerts /></ProtectedRoute>} />
//                   {/* <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} /> */}
//                   <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
//                 </Routes>
//               </AuthProvider>
//             }
//           />

//           {/* Driver Portal Routes
//           <Route path="/driver/login" element={<DriverLogin />} /> */}
          
//           {/* <Route
//             path="/driver/*"
//             element={
//               <DriverAuthProvider>
//                 <Routes>
//                   <Route path="/" element={<Navigate to="/driver/dashboard" replace />} />
//                   <Route path="/dashboard" element={<DriverGuard><DriverDashboard /></DriverGuard>} />
//                   <Route path="/trips" element={<DriverGuard><DriverTrips /></DriverGuard>} />
//                   <Route path="/trips/:tripId" element={<DriverGuard><TripDetails /></DriverGuard>} />
//                   <Route path="/truck" element={<DriverGuard><TruckScreen /></DriverGuard>} />
//                   <Route path="/profile" element={<DriverGuard><Profile /></DriverGuard>} />
//                 </Routes>
//               </DriverAuthProvider>
//             }
//           /> */}

//           {/* 404 */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App
