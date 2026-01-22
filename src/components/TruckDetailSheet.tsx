// import { useState } from "react";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetFooter, // Added for professional footer layout
// } from "@/components/ui/sheet";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import { PermissionGuard } from "@/components/PermissionGuard";
// import { 
//   Truck as TruckIcon, 
//   MapPin, 
//   Fuel, 
//   Calendar, 
//   Gauge, 
//   User, 
//   Package,
//   Trash2,
//   Edit3,
//   History,
//   ShieldCheck,
//   Wrench,
//   AlertTriangle
// } from "lucide-react";
// import { useDeleteTruck } from "@/hooks/useTrucks";
// import { UpdateTruckDialog } from "./UpdateTruckDialog";

// const getStatusStyles = (status: string) => {
//   switch (status?.toLowerCase()) {
//     case "available":
//       return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
//     case "in_transit":
//     case "assigned":
//       return "bg-blue-500/10 text-blue-500 border-blue-500/20";
//     case "maintenance":
//       return "bg-amber-500/10 text-amber-500 border-amber-500/20";
//     case "stopped":
//       return "bg-slate-500/10 text-slate-500 border-slate-500/20";
//     case "out_of_service":
//       return "bg-rose-500/10 text-rose-500 border-rose-500/20";
//     default:
//       return "bg-muted text-muted-foreground border-border";
//   }
// };

// export function TruckDetailsSheet({ truck, isOpen, onClose }: any) {
//   const [isUpdateOpen, setIsUpdateOpen] = useState(false);
//   const deleteMutation = useDeleteTruck();

//   if (!truck) return null;

//   const handleDelete = async () => {
//     if (confirm("Are you sure you want to delete this truck? This action is permanent.")) {
//       await deleteMutation.mutateAsync(truck._id);
//       onClose();
//     }
//   };

//   return (
//     <>
//       <Sheet open={isOpen} onOpenChange={onClose}>
//         {/* Added flex and h-full to enable fixed footer layout */}
//         <SheetContent className="sm:max-w-md flex flex-col h-full p-0">
//           <SheetHeader className="p-6 border-b bg-card">
//             <SheetTitle className="flex items-center gap-2 font-bold text-xl">
//               <TruckIcon className="h-6 w-6 text-primary" />
//               Truck Profile: {truck.licensePlate}
//             </SheetTitle>
//           </SheetHeader>

//           {/* Scrollable content area */}
//           <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-none">
            
//             {/* --- STATUS & DRIVER CARD --- */}
//             <div className="p-4 bg-muted/30 rounded-xl border border-border shadow-sm">
//               <div className="flex justify-between items-start">
//                 <div className="space-y-1">
//                   <Label className="text-[10px] uppercase text-muted-foreground font-bold tracking-widest">Live Status</Label>
//                   <div>
//                     <Badge variant="outline" className={`capitalize px-3 py-0.5 font-semibold ${getStatusStyles(truck.status)}`}>
//                       {truck.status?.replace("_", " ") || "Unknown"}
//                     </Badge>
//                   </div>
//                 </div>
//                 <div className="text-right space-y-1">
//                   <Label className="text-[10px] uppercase text-muted-foreground font-bold tracking-widest">Primary Driver</Label>
//                   <p className="font-bold flex items-center justify-end gap-1.5 text-foreground">
//                     <User className="h-4 w-4 text-primary" />
//                     {truck.currentDriver 
//                       ? `${truck.currentDriver.firstName} ${truck.currentDriver.lastName}`
//                       : "Unassigned"}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* --- TECHNICAL SPECS --- */}
//             <div className="space-y-3">
//               <h4 className="text-sm font-bold flex items-center gap-2 border-b pb-1 text-foreground/80">
//                 <Gauge className="h-4 w-4" /> Vehicle Specifications
//               </h4>
//               <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
//                 <div className="space-y-0.5">
//                   <Label className="text-muted-foreground text-xs font-medium">Make & Model</Label>
//                   <p className="font-semibold">{truck.make} {truck.model}</p>
//                 </div>
//                 <div className="space-y-0.5">
//                   <Label className="text-muted-foreground text-xs font-medium">Model Year</Label>
//                   <p className="font-semibold">{truck.year}</p>
//                 </div>
//                 <div className="space-y-0.5">
//                   <Label className="text-muted-foreground text-xs font-medium">Fuel System</Label>
//                   <p className="font-semibold capitalize">{truck.fuelType}</p>
//                 </div>
//                 <div className="space-y-0.5">
//                   <Label className="text-muted-foreground text-xs font-medium">Samsara Device</Label>
//                   <p className="font-mono text-[11px] bg-muted/50 px-1 rounded">{truck.samsaraDeviceId}</p>
//                 </div>
//               </div>
//             </div>

//             {/* --- FLEET METRICS & FUEL --- */}
//             <div className="space-y-3">
//               <h4 className="text-sm font-bold flex items-center gap-2 border-b pb-1 text-foreground/80">
//                 <Package className="h-4 w-4" /> Fleet Performance
//               </h4>
//               <div className="p-4 bg-card rounded-lg border border-border space-y-5 shadow-sm">
//                 <div className="space-y-2">
//                   <div className="flex justify-between items-center text-xs font-bold">
//                     {/* <Label className="flex items-center gap-1.5">
//                       <Fuel className="h-3.5 w-3.5 text-primary" /> Current Fuel
//                     </Label> */}
//                     {/* <span className={truck.fuelLevel < 20 ? 'text-destructive' : 'text-emerald-600'}>
//                       {truck.fuelLevel ?? 0}%
//                     </span> */}
//                   {/* </div>
//                   <Progress value={truck.fuelLevel ?? 0} className="h-2.5" />
//                 </div> */}
//                 <div className="grid grid-cols-2 gap-4 pt-3 border-t border-dashed">
//                    <div className="space-y-1">
//                      <Label className="text-[10px] text-muted-foreground uppercase font-bold">Mileage</Label>
//                      <p className="font-bold text-sm text-foreground">{truck.odometer?.toLocaleString() || 0} km</p>
//                    </div>
//                    <div className="space-y-1 text-right">
//                      <Label className="text-[10px] text-muted-foreground uppercase font-bold">Weight Capacity</Label>
//                      <p className="font-bold text-sm text-foreground">{truck.weight_capacity?.toLocaleString()} kg</p>
//                    </div>
//                 </div>
//               </div>
//             </div>

//             {/* --- MAINTENANCE LOG --- */}
//             <div className="space-y-3">
//               <h4 className="text-sm font-bold flex items-center gap-2 border-b pb-1 text-foreground/80">
//                 <Wrench className="h-4 w-4" /> Service History
//               </h4>
//               <div className="space-y-3">
//                 {truck.maintenanceRecords && truck.maintenanceRecords.length > 0 ? (
//                   truck.maintenanceRecords.map((record: any, idx: number) => (
//                     <div key={idx} className="p-3 border-l-4 border-l-primary bg-muted/20 rounded-r-md text-xs shadow-sm">
//                       <div className="flex justify-between items-center mb-1">
//                         <span className="font-bold uppercase tracking-tight">{record.type}</span>
//                         <span className="text-muted-foreground flex items-center gap-1">
//                           <Calendar className="h-3 w-3" />
//                           {new Date(record.date).toLocaleDateString()}
//                         </span>
//                       </div>
//                       <p className="text-muted-foreground leading-snug">{record.description}</p>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="flex flex-col items-center justify-center py-8 bg-muted/10 rounded-xl border-2 border-dashed border-border">
//                     <AlertTriangle className="h-6 w-6 text-muted-foreground/40 mb-2" />
//                     <p className="text-xs text-muted-foreground font-medium">No maintenance logs found</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* --- LOCATION TRACKING --- */}
//             <div className="space-y-3">
//               <h4 className="text-sm font-bold flex items-center gap-2 border-b pb-1 text-primary">
//                 <MapPin className="h-4 w-4" /> Current Location
//               </h4>
//               <div className="p-3 border rounded-lg bg-blue-50/10 border-blue-500/10 text-sm shadow-sm">
//                 <p className="font-medium text-foreground leading-relaxed">
//                   {truck.lastKnownLocation?.address || "Address not reported"}
//                 </p>
//                 {truck.updatedAt && (
//                   <p className="text-[10px] text-muted-foreground flex items-center gap-1.5 mt-2">
//                     <History className="h-3.5 w-3.5" />
//                     Last updated: {new Date(truck.updatedAt).toLocaleString()}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>

//             <PermissionGuard>
//           <SheetFooter className="p-6 border-t bg-muted/10 mt-auto">
//             <div className="flex w-full gap-4">
//               <Button className="flex-1 gap-2 h-11" variant="outline" onClick={() => setIsUpdateOpen(true)}>
//                 <Edit3 className="h-4 w-4" /> Edit Details
//               </Button>
//               <Button 
//                 className="flex-1 gap-2 h-11" 
//                 variant="destructive" 
//                 onClick={handleDelete}
//                 disabled={deleteMutation.isPending}
//               >
//                 <Trash2 className="h-4 w-4" /> {deleteMutation.isPending ? "Removing..." : "Delete Truck"}
//               </Button>
//             </div>
//           </SheetFooter>
//           </PermissionGuard>
//         </SheetContent>
//       </Sheet>
      
//       <UpdateTruckDialog 
//         open={isUpdateOpen} 
//         onClose={() => setIsUpdateOpen(false)} 
//         truck={truck} 
//       />
//     </>
//   );
// }




import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PermissionGuard } from "@/components/PermissionGuard";
import {
  Truck as TruckIcon,
  MapPin,
  Calendar,
  Gauge,
  User,
  Trash2,
  Edit3,
  History,
  Wrench,
  AlertTriangle,
} from "lucide-react";
import { useDeleteTruck } from "@/hooks/useTrucks";
import { UpdateTruckDialog } from "./UpdateTruckDialog";

const getStatusStyles = (status: string) => {
  switch (status?.toLowerCase()) {
    case "available":
      return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    case "in_transit":
    case "assigned":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    case "maintenance":
      return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    case "stopped":
      return "bg-slate-500/10 text-slate-500 border-slate-500/20";
    case "out_of_service":
      return "bg-rose-500/10 text-rose-500 border-rose-500/20";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

export function TruckDetailsSheet({ truck, isOpen, onClose }: any) {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const deleteMutation = useDeleteTruck();

  if (!truck) return null;

  const handleDelete = async () => {
    if (
      confirm(
        "Are you sure you want to delete this truck? This action is permanent."
      )
    ) {
      await deleteMutation.mutateAsync(truck._id);
      onClose();
    }
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="sm:max-w-md flex flex-col h-full p-0">
          {/* HEADER */}
          <SheetHeader className="p-6 border-b bg-card">
            <SheetTitle className="flex items-center gap-2 font-bold text-xl">
              <TruckIcon className="h-6 w-6 text-primary" />
              Truck Profile: {truck.licensePlate}
            </SheetTitle>
          </SheetHeader>

          {/* BODY */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-none">
            {/* STATUS & DRIVER */}
            <div className="p-4 bg-muted/30 rounded-xl border shadow-sm">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <Label className="text-[10px] uppercase text-muted-foreground font-bold">
                    Live Status
                  </Label>
                  <Badge
                    variant="outline"
                    className={`capitalize px-3 py-0.5 font-semibold ${getStatusStyles(
                      truck.status
                    )}`}
                  >
                    {truck.status?.replace("_", " ") || "Unknown"}
                  </Badge>
                </div>

                <div className="text-right space-y-1">
                  <Label className="text-[10px] uppercase text-muted-foreground font-bold">
                    Primary Driver
                  </Label>
                  <p className="font-bold flex items-center justify-end gap-1.5">
                    <User className="h-4 w-4 text-primary" />
                    {truck.currentDriver
                      ? `${truck.currentDriver.firstName} ${truck.currentDriver.lastName}`
                      : "Unassigned"}
                  </p>
                </div>
              </div>
            </div>

            {/* VEHICLE SPECIFICATIONS */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold flex items-center gap-2 border-b pb-1">
                <Gauge className="h-4 w-4" /> Vehicle Specifications
              </h4>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Model
                  </Label>
                  <p className="font-semibold">{truck.model}</p>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">
                    Model Year
                  </Label>
                  <p className="font-semibold">{truck.year}</p>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">
                    Weight Capacity
                  </Label>
                  <p className="font-semibold">
                    {truck.weight_capacity?.toLocaleString()} kg
                  </p>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">
                    Samsara Device
                  </Label>
                  <p className="font-mono text-[11px] bg-muted/50 px-1 rounded">
                    {truck.samsaraDeviceId || "—"}
                  </p>
                </div>
              </div>
            </div>

            {/* MAINTENANCE LOG */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold flex items-center gap-2 border-b pb-1">
                <Wrench className="h-4 w-4" /> Service History
              </h4>

              {truck.maintenanceRecords?.length ? (
                truck.maintenanceRecords.map((record: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 border-l-4 border-l-primary bg-muted/20 rounded-r-md text-xs"
                  >
                    <div className="flex justify-between mb-1">
                      <span className="font-bold uppercase">
                        {record.type}
                      </span>
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(record.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-muted-foreground">
                      {record.description}
                    </p>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center py-8 border-2 border-dashed rounded-xl">
                  <AlertTriangle className="h-6 w-6 text-muted-foreground/40 mb-2" />
                  <p className="text-xs text-muted-foreground">
                    No maintenance logs found
                  </p>
                </div>
              )}
            </div>

            {/* LOCATION */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold flex items-center gap-2 border-b pb-1 text-primary">
                <MapPin className="h-4 w-4" /> Current Location
              </h4>

              <div className="p-3 border rounded-lg bg-blue-50/10">
                <p className="font-medium">
                  {truck.lastKnownLocation?.address ||
                    "Address not reported"}
                </p>

                {truck.updatedAt && (
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-2">
                    <History className="h-3.5 w-3.5" />
                    Last updated:{" "}
                    {new Date(truck.updatedAt).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* FOOTER ACTIONS */}
          <PermissionGuard>
            <SheetFooter className="p-6 border-t bg-muted/10">
              <div className="flex w-full gap-4">
                <Button
                  className="flex-1 gap-2"
                  variant="outline"
                  onClick={() => setIsUpdateOpen(true)}
                >
                  <Edit3 className="h-4 w-4" /> Edit Details
                </Button>

                <Button
                  className="flex-1 gap-2"
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                  {deleteMutation.isPending
                    ? "Removing..."
                    : "Delete Truck"}
                </Button>
              </div>
            </SheetFooter>
          </PermissionGuard>
        </SheetContent>
      </Sheet>

      <UpdateTruckDialog
        open={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        truck={truck}
      />
    </>
  );
}
