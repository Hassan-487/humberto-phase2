// import { Routes, Route, Navigate } from "react-router-dom";
// import { DriverGuard } from "@/components/DriverGuard";

// // Driver Pages
// import DriverDashboard from "./DriverDashboard";
// import DriverTrips from "./DriverTrips";
// import TripDetails from "./TripDetails";
// import TruckScreen from "./TruckScreen";
// import Profile from "./Profile";

// /**
//  * Driver-only routes
//  * Wrapped by DriverAuthProvider at app level
//  */
// const DriverRoutes = () => {
//   return (
//     <Routes>
//       {/* Default redirect */}
//       <Route
//         path="/"
//         element={<Navigate to="/driver/dashboard" replace />}
//       />

//       {/* Dashboard */}
//       <Route
//         path="/dashboard"
//         element={
//           <DriverGuard>
//             <DriverDashboard />
//           </DriverGuard>
//         }
//       />

//       {/* Trips */}
//       <Route
//         path="/trips"
//         element={
//           <DriverGuard>
//             <DriverTrips />
//           </DriverGuard>
//         }
//       />

//       {/* Trip Details */}
//       <Route
//         path="/trips/:tripId"
//         element={
//           <DriverGuard>
//             <TripDetails />
//           </DriverGuard>
//         }
//       />

//       {/* Truck */}
//       <Route
//         path="/truck"
//         element={
//           <DriverGuard>
//             <TruckScreen />
//           </DriverGuard>
//         }
//       />

//       {/* Profile */}
//       <Route
//         path="/profile"
//         element={
//           <DriverGuard>
//             <Profile />
//           </DriverGuard>
//         }
//       />

//       {/* Catch-all */}
//       <Route
//         path="*"
//         element={<Navigate to="/driver/dashboard" replace />}
//       />
//     </Routes>
//   );
// };

// export default DriverRoutes;
