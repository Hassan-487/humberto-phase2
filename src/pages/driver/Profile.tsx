// import { useDriverAuth } from "@/contexts/DriverAuthContext";
// import { useNavigate } from 'react-router-dom';
// import { AppLayout } from '@/components/layout/Driverlayout/AppLayout';
// import { PageHeader } from '@/components/layout/Driverlayout/PageHeader';
// import { Button } from '@/components/ui/button';
// import { 
//   User, 
//   Phone, 
//   Mail, 
//   CreditCard, 
//   Calendar, 
//   Star,
//   LogOut,
//   ChevronRight,
//   Route
// } from 'lucide-react';

// const Profile = () => {
//   const { logout } = useDriverAuth();
//   const navigate = useNavigate();
//   const driver = useDriverAuth();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   const infoItems = [
//     { icon: Phone, label: 'Phone', value: driver.phone },
//     { icon: Mail, label: 'Email', value: driver.email },
//     { icon: CreditCard, label: 'License Number', value: driver.licenseNumber },
//     { icon: Calendar, label: 'License Expiry', value: driver.licenseExpiry },
//     { icon: CreditCard, label: 'License Type', value: driver.licenseType },
//     { icon: Calendar, label: 'Joined', value: driver.joinedDate },
//   ];

//   return (
//     <AppLayout>
//       <PageHeader title="Profile" />
      
//       <div className="px-4 pb-6 space-y-5">
//         {/* Profile Header */}
//         <div className="card-elevated p-5 text-center">
//           <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
//             <User className="w-12 h-12 text-primary-foreground" />
//           </div>
//           <h2 className="text-xl font-bold">{driver.name}</h2>
//           <p className="text-muted-foreground text-sm">Driver ID: {driver.id}</p>
          
//           {/* Stats Row */}
//           <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-border">
//             <div className="text-center">
//               <div className="flex items-center justify-center gap-1 text-warning">
//                 <Star className="w-4 h-4 fill-warning" />
//                 <span className="font-bold">{driver.rating}</span>
//               </div>
//               <p className="text-xs text-muted-foreground">Rating</p>
//             </div>
//             <div className="w-px h-8 bg-border" />
//             <div className="text-center">
//               <div className="flex items-center justify-center gap-1">
//                 <Route className="w-4 h-4 text-primary" />
//                 <span className="font-bold">{driver.totalTrips}</span>
//               </div>
//               <p className="text-xs text-muted-foreground">Total Trips</p>
//             </div>
//           </div>
//         </div>

//         {/* Personal Information */}
//         <div className="card-elevated overflow-hidden">
//           <h3 className="font-semibold px-4 pt-4 pb-2">Personal Information</h3>
//           <div className="divide-y divide-border">
//             {infoItems.map((item) => (
//               <div key={item.label} className="flex items-center gap-3 px-4 py-3">
//                 <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
//                   <item.icon className="w-5 h-5 text-muted-foreground" />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-xs text-muted-foreground">{item.label}</p>
//                   <p className="font-medium truncate">{item.value}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Quick Links */}
//         <div className="card-elevated overflow-hidden">
//           <h3 className="font-semibold px-4 pt-4 pb-2">Quick Links</h3>
//           <div className="divide-y divide-border">
//             {[
//               { label: 'Settings', sublabel: 'App preferences' },
//               { label: 'Help & Support', sublabel: 'Get assistance' },
//               { label: 'Terms & Conditions', sublabel: 'Legal information' },
//             ].map((item) => (
//               <button 
//                 key={item.label}
//                 className="flex items-center justify-between w-full px-4 py-3 hover:bg-muted/50 transition-colors"
//               >
//                 <div className="text-left">
//                   <p className="font-medium">{item.label}</p>
//                   <p className="text-xs text-muted-foreground">{item.sublabel}</p>
//                 </div>
//                 <ChevronRight className="w-5 h-5 text-muted-foreground" />
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Logout Button */}
//         <Button
//           variant="outline"
//           className="w-full h-12 text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
//           onClick={handleLogout}
//         >
//           <LogOut className="w-5 h-5 mr-2" />
//           Sign Out
//         </Button>

//         <p className="text-center text-xs text-muted-foreground">
//           Driver Portal v1.0.0
//         </p>
//       </div>
//     </AppLayout>
//   );
// };

// export default Profile;



import { useDriverAuth } from "@/contexts/DriverAuthContext";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/Driverlayout/AppLayout";
import { PageHeader } from "@/components/layout/Driverlayout/PageHeader";
import { Button } from "@/components/ui/button";
import {
  User,
  Phone,
  Mail,
  CreditCard,
  Calendar,
  Star,
  LogOut,
  ChevronRight,
  Route,
} from "lucide-react";

const Profile = () => {
  const { driver, logout } = useDriverAuth(); // ✅ CORRECT
  const navigate = useNavigate();

  if (!driver) return null; // safety guard

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const infoItems = [
    { icon: Phone, label: "Phone", value: driver.phone ?? "—" },
    { icon: Mail, label: "Email", value: driver.email },
    { icon: CreditCard, label: "License Number", value: driver.licenseNumber ?? "—" },
    { icon: Calendar, label: "License Expiry", value: driver.licenseExpiry ?? "—" },
    { icon: CreditCard, label: "License Type", value: driver.licenseType ?? "—" },
    { icon: Calendar, label: "Joined", value: driver.joinedDate ?? "—" },
  ];

  return (
    <AppLayout>
      <PageHeader title="Profile" />

      <div className="px-4 pb-6 space-y-5">
        {/* Profile Header */}
        <div className="card-elevated p-5 text-center">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-12 h-12 text-primary-foreground" />
          </div>

          <h2 className="text-xl font-bold">
            {driver.firstName} {driver.lastName}
          </h2>

          <p className="text-muted-foreground text-sm">
            Driver ID: {driver.id}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-border">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-warning">
                <Star className="w-4 h-4 fill-warning" />
                <span className="font-bold">{driver.rating ?? "—"}</span>
              </div>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>

            <div className="w-px h-8 bg-border" />

            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Route className="w-4 h-4 text-primary" />
                <span className="font-bold">{driver.totalTrips ?? 0}</span>
              </div>
              <p className="text-xs text-muted-foreground">Total Trips</p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="card-elevated overflow-hidden">
          <h3 className="font-semibold px-4 pt-4 pb-2">
            Personal Information
          </h3>

          <div className="divide-y divide-border">
            {infoItems.map((item) => (
              <div key={item.label} className="flex items-center gap-3 px-4 py-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                </div>

                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-medium truncate">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="card-elevated overflow-hidden">
          <h3 className="font-semibold px-4 pt-4 pb-2">Quick Links</h3>

          <div className="divide-y divide-border">
            {[
              { label: "Settings", sublabel: "App preferences" },
              { label: "Help & Support", sublabel: "Get assistance" },
              { label: "Terms & Conditions", sublabel: "Legal information" },
            ].map((item) => (
              <button
                key={item.label}
                className="flex items-center justify-between w-full px-4 py-3 hover:bg-muted/50"
              >
                <div className="text-left">
                  <p className="font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.sublabel}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full h-12 text-destructive border-destructive/30 hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sign Out
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Driver Portal v1.0.0
        </p>
      </div>
    </AppLayout>
  );
};

export default Profile;
