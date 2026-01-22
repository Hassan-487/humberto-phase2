// import { 
//   Phone, 
//   Activity, 
//   Shield, 
//   ShieldCheck, 
//   Gauge 
// } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Label } from "@/components/ui/label";

// interface DriverProfileSheetProps {
//   selectedDriver: any;
//   getStatusBadgeClass: (status: string) => string;
// }

// export function DriverProfileSheet({ selectedDriver, getStatusBadgeClass }: DriverProfileSheetProps) {
//   if (!selectedDriver) return null;

//   return (
//     <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-none">
//       {/* PROFILE HEADER */}
//       <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border shadow-sm">
//         <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20 shadow-inner">
//           <span className="text-2xl font-black text-primary">
//             {selectedDriver.firstName[0]}{selectedDriver.lastName[0]}
//           </span>
//         </div>
//         <div className="space-y-1">
//           <h3 className="text-lg font-black text-foreground">
//             {selectedDriver.firstName} {selectedDriver.lastName}
//           </h3>
//           <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
//             DRIVER ID: {selectedDriver._id.slice(-6).toUpperCase()}
//           </p>
//           <Badge variant="outline" className={`mt-1 capitalize ${getStatusBadgeClass(selectedDriver.employmentStatus)}`}>
//             {selectedDriver.employmentStatus?.replace('_', ' ')}
//           </Badge>
//         </div>
//       </div>

//       {/* PERFORMANCE METRICS  */}
//       <section className="space-y-4">
//         <Label className="font-bold flex items-center gap-2 text-primary uppercase text-[10px] tracking-widest">
//           <Activity className="h-4 w-4" /> Comprehensive Performance
//         </Label>
//         <div className="grid grid-cols-2 gap-3">
//           <div className="p-3 bg-card border rounded-xl shadow-sm">
//             <p className="text-[9px] text-muted-foreground font-bold uppercase">Total Trips</p>
//             <p className="text-lg font-bold">{selectedDriver.performanceMetrics?.totalTrips || 0}</p>
//           </div>
//           <div className="p-3 bg-card border rounded-xl shadow-sm">
//             <p className="text-[9px] text-emerald-600 font-bold uppercase">Successful</p>
//             <p className="text-lg font-bold text-emerald-600">{selectedDriver.performanceMetrics?.successfulTrips || 0}</p>
//           </div>
//           <div className="p-3 bg-card border rounded-xl shadow-sm">
//             <p className="text-[9px] text-amber-600 font-bold uppercase">Delayed</p>
//             <p className="text-lg font-bold text-amber-600">{selectedDriver.performanceMetrics?.delayedTrips || 0}</p>
//           </div>
//           <div className="p-3 bg-card border rounded-xl shadow-sm">
//             <p className="text-[9px] text-rose-600 font-bold uppercase">Cancelled</p>
//             <p className="text-lg font-bold text-rose-600">{selectedDriver.performanceMetrics?.cancelledTrips || 0}</p>
//           </div>
//         </div>
        
//         <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl grid grid-cols-2 gap-4">
//           <div className="space-y-1">
//             <Label className="text-[10px] font-bold text-muted-foreground">TOTAL HOURS</Label>
//             <div className="flex items-baseline gap-1">
//               <span className="text-xl font-black">{selectedDriver.performanceMetrics?.totalDrivingHours || 0}</span>
//               <span className="text-[10px] font-medium text-muted-foreground">hrs</span>
//             </div>
//           </div>
//           <div className="space-y-1">
//             <Label className="text-[10px] font-bold text-muted-foreground">AVG SPEED</Label>
//             <div className="flex items-baseline gap-1">
//               <span className="text-xl font-black">{selectedDriver.performanceMetrics?.averageSpeed || 0}</span>
//               <span className="text-[10px] font-medium text-muted-foreground">km/h</span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* EMERGENCY CONTACT  */}
//       <section className="space-y-3 pt-4 border-t">
//         <Label className="font-bold flex items-center gap-2 text-rose-600 uppercase text-[10px] tracking-widest">
//           <Shield className="h-4 w-4" /> Emergency Contact Details
//         </Label>
//         <div className="p-4 bg-rose-500/5 border border-rose-200 rounded-xl space-y-4">
//           <div className="flex justify-between items-center">
//             <div className="space-y-0.5">
//               <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">Contact Name</p>
//               <p className="text-sm font-bold text-foreground">{selectedDriver.emergencyContact?.name || "Not Set"}</p>
//             </div>
//             {selectedDriver.emergencyContact?.relationship && (
//               <Badge variant="secondary" className="text-[9px] h-5">{selectedDriver.emergencyContact.relationship}</Badge>
//             )}
//           </div>
//           <div className="pt-3 border-t border-rose-200/50">
//             <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight mb-1">Phone Number</p>
//             <div className="flex items-center gap-2">
//               <Phone className="h-3.5 w-3.5 text-rose-500" />
//               <span className="text-sm font-bold text-rose-700">{selectedDriver.emergencyContact?.phoneNumber || "N/A"}</span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/*  COMPLIANCE & LICENSE */}
//       <section className="space-y-4 pt-4 border-t">
//         <Label className="font-bold flex items-center gap-2 text-muted-foreground uppercase text-[10px] tracking-widest">
//           <ShieldCheck className="h-4 w-4" /> License Information
//         </Label>
//         <div className="p-4 bg-muted/20 border rounded-xl grid grid-cols-2 gap-4">
//           <div>
//             <p className="text-[10px] text-muted-foreground font-bold uppercase">License Number</p>
//             <p className="text-xs font-bold font-mono">{selectedDriver.licenseNumber}</p>
//           </div>
//           <div className="text-right">
//             <p className="text-[10px] text-muted-foreground font-bold uppercase">Expiration</p>
//             <p className="text-xs font-bold">
//               {selectedDriver.licenseExpiry ? new Date(selectedDriver.licenseExpiry).toLocaleDateString() : 'N/A'}
//             </p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }



import {
  Phone,
  Activity,
  ShieldCheck,
  Gauge,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

interface DriverProfileSheetProps {
  selectedDriver: any;
  getStatusBadgeClass: (status: string) => string;
}

export function DriverProfileSheet({
  selectedDriver,
  getStatusBadgeClass,
}: DriverProfileSheetProps) {
  if (!selectedDriver) return null;

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-none">
      {/* PROFILE HEADER */}
      <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border shadow-sm">
        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
          <span className="text-2xl font-black text-primary">
            {selectedDriver.firstName[0]}
            {selectedDriver.lastName[0]}
          </span>
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-black text-foreground">
            {selectedDriver.firstName} {selectedDriver.lastName}
          </h3>

          {/* EMAIL */}
          <p className="text-xs text-muted-foreground font-medium">
            {selectedDriver.email}
          </p>

          <Badge
            variant="outline"
            className={`mt-1 capitalize ${getStatusBadgeClass(
              selectedDriver.employmentStatus
            )}`}
          >
            {selectedDriver.employmentStatus?.replace("_", " ")}
          </Badge>
        </div>
      </div>

      {/* PERFORMANCE METRICS */}
      <section className="space-y-4">
        <Label className="font-bold flex items-center gap-2 text-primary uppercase text-[10px] tracking-widest">
          <Activity className="h-4 w-4" /> Performance Overview
        </Label>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-card border rounded-xl">
            <p className="text-[9px] uppercase font-bold text-muted-foreground">
              Total Trips
            </p>
            <p className="text-lg font-bold">
              {selectedDriver.performanceMetrics?.totalTrips || 0}
            </p>
          </div>

          <div className="p-3 bg-card border rounded-xl">
            <p className="text-[9px] uppercase font-bold text-emerald-600">
              Successful
            </p>
            <p className="text-lg font-bold text-emerald-600">
              {selectedDriver.performanceMetrics?.successfulTrips || 0}
            </p>
          </div>

          <div className="p-3 bg-card border rounded-xl col-span-2">
            <p className="text-[9px] uppercase font-bold text-amber-600">
              Delayed
            </p>
            <p className="text-lg font-bold text-amber-600">
              {selectedDriver.performanceMetrics?.delayedTrips || 0}
            </p>
          </div>
        </div>
      </section>

      {/* LICENSE INFORMATION */}
      <section className="space-y-4 pt-4 border-t">
        <Label className="font-bold flex items-center gap-2 text-muted-foreground uppercase text-[10px] tracking-widest">
          <ShieldCheck className="h-4 w-4" /> License Information
        </Label>

        <div className="p-4 bg-muted/20 border rounded-xl grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] text-muted-foreground font-bold uppercase">
              License Number
            </p>
            <p className="text-xs font-bold font-mono">
              {selectedDriver.licenseNumber}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[10px] text-muted-foreground font-bold uppercase">
              Expiration
            </p>
            <p className="text-xs font-bold">
              {selectedDriver.licenseExpiry
                ? new Date(
                    selectedDriver.licenseExpiry
                  ).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
