
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Plus, Search, MapPin, Loader2 } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Progress } from "@/components/ui/progress";
// import { useTrucks } from "@/hooks/useTrucks";
// import { AddTruckDialog } from "@/components/AddTruckDialog";
// import { TruckDetailsSheet } from "@/components/TruckDetailSheet";
// import { PermissionGuard } from "@/components/PermissionGuard";

// const getStatusBadgeClass = (status: string) => {
//   const baseClass =
//     "status-badge px-2.5 py-0.5 rounded-full text-[11px] font-semibold border capitalize";

//   switch (status?.toLowerCase()) {
//     case "available":
//       return `${baseClass} bg-emerald-500/10 text-emerald-600 border-emerald-500/20`;
//     case "assigned":
//     case "in_transit":
//       return `${baseClass} bg-blue-500/10 text-blue-600 border-blue-500/20`;
//     case "maintenance":
//       return `${baseClass} bg-amber-500/10 text-amber-600 border-amber-500/20`;
//     case "stopped":
//       return `${baseClass} bg-slate-500/10 text-slate-600 border-slate-500/20`;
//     case "out_of_service":
//       return `${baseClass} bg-rose-500/10 text-rose-600 border-rose-500/20`;
//     default:
//       return `${baseClass} bg-muted text-muted-foreground border-border`;
//   }
// };

// export default function Trucks() {
//   const { trucks, loading } = useTrucks();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedTruck, setSelectedTruck] = useState<any | null>(null);
//   const [isAddOpen, setIsAddOpen] = useState(false);

//   const filtered = trucks.filter((t) =>
//     t.licensePlate?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <div className="flex h-64 items-center justify-center">
//         <Loader2 className="animate-spin text-primary h-8 w-8" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-2xl font-bold tracking-tight">Fleet Inventory</h2>
//           <p className="text-sm text-muted-foreground">
//             Manage and track your active vehicles.
//           </p>
//         </div>
//         <PermissionGuard>
//           <Button onClick={() => setIsAddOpen(true)} className="gap-2">
//             <Plus className="h-4 w-4" /> Add New Truck
//           </Button>
//         </PermissionGuard>
//       </div>

//       {/* SEARCH */}
//       <div className="relative max-w-md">
//         <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//         <Input
//           className="pl-10"
//           placeholder="Search by license plate..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* TABLE */}
//       <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="bg-muted/50 border-b">
//                 <th className="p-4 text-left text-[10px] uppercase">Truck</th>
//                 <th className="p-4 text-left text-[10px] uppercase">Driver</th>
//                 <th className="p-4 text-left text-[10px] uppercase">Status</th>
//                 <th className="p-4 text-left text-[10px] uppercase">Location</th>
//                 <th className="p-4 text-right text-[10px] uppercase">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filtered.map((t) => (
//                 <tr key={t._id} className="border-b hover:bg-muted/30">
//                   <td className="p-4 font-bold">{t.licensePlate}</td>

//                   <td className="p-4 text-sm">
//                     {t.currentDriver
//                       ? `${t.currentDriver.firstName} ${t.currentDriver.lastName}`
//                       : (
//                         <span className="italic text-muted-foreground">
//                           Unassigned
//                         </span>
//                       )}
//                   </td>

//                   <td className="p-4">
//                     <span className={getStatusBadgeClass(t.status)}>
//                       {t.status.replace("_", " ")}
//                     </span>
//                   </td>

//                   <td className="p-4 text-xs">
//                     <div className="flex items-center gap-1">
//                       <MapPin className="h-3.5 w-3.5 text-primary/70" />
//                       {t.lastKnownLocation?.address || "No data"}
//                     </div>
//                   </td>

                  

//                   <td className="p-4 text-right">
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       onClick={() => setSelectedTruck(t)}
//                     >
//                       View Profile
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <AddTruckDialog open={isAddOpen} onClose={() => setIsAddOpen(false)} />

//       <TruckDetailsSheet
//         truck={selectedTruck}
//         isOpen={!!selectedTruck}
//         onClose={() => setSelectedTruck(null)}
//       />
//     </div>
//   );
// }




import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, MapPin, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTrucks } from "@/hooks/useTrucks";
import { AddTruckDialog } from "@/components/AddTruckDialog";
import { TruckDetailsSheet } from "@/components/TruckDetailSheet";
import { PermissionGuard } from "@/components/PermissionGuard";
import { useTranslation } from 'react-i18next';

const getStatusBadgeClass = (status: string) => {
  const baseClass =
    "status-badge px-2.5 py-0.5 rounded-full text-[11px] font-semibold border capitalize";

  switch (status?.toLowerCase()) {
    case "available":
      return `${baseClass} bg-emerald-500/10 text-emerald-600 border-emerald-500/20`;
    case "assigned":
    case "in_transit":
      return `${baseClass} bg-blue-500/10 text-blue-600 border-blue-500/20`;
    case "maintenance":
      return `${baseClass} bg-amber-500/10 text-amber-600 border-amber-500/20`;
    case "stopped":
      return `${baseClass} bg-slate-500/10 text-slate-600 border-slate-500/20`;
    case "out_of_service":
      return `${baseClass} bg-rose-500/10 text-rose-600 border-rose-500/20`;
    default:
      return `${baseClass} bg-muted text-muted-foreground border-border`;
  }
};

export default function Trucks() {
  const { trucks, loading } = useTrucks();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTruck, setSelectedTruck] = useState<any | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const filtered = trucks.filter((t) =>
    t.licensePlate?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-primary h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t('trucks.title')}</h2>
          <p className="text-sm text-muted-foreground">
            {t('trucks.description')}
          </p>
        </div>
        <PermissionGuard>
          <Button onClick={() => setIsAddOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" /> {t('trucks.addTruck')}
          </Button>
        </PermissionGuard>
      </div>

      {/* SEARCH */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-10"
          placeholder={t('trucks.search')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 border-b">
                <th className="p-4 text-left text-[10px] uppercase">{t('trucks.truck')}</th>
                <th className="p-4 text-left text-[10px] uppercase">{t('trucks.driver')}</th>
                <th className="p-4 text-left text-[10px] uppercase">{t('trucks.status')}</th>
                <th className="p-4 text-left text-[10px] uppercase">{t('trucks.location')}</th>
                <th className="p-4 text-right text-[10px] uppercase">{t('trucks.action')}</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((truck) => (
                <tr key={truck._id} className="border-b hover:bg-muted/30">
                  <td className="p-4 font-bold">{truck.licensePlate}</td>

                  <td className="p-4 text-sm">
                    {truck.currentDriver
                      ? `${truck.currentDriver.firstName} ${truck.currentDriver.lastName}`
                      : (
                        <span className="italic text-muted-foreground">
                          {t('trucks.unassigned')}
                        </span>
                      )}
                  </td>

                  <td className="p-4">
                    <span className={getStatusBadgeClass(truck.status)}>
                      {t(`status.${truck.status}`)}
                    </span>
                  </td>

                  <td className="p-4 text-xs">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-primary/70" />
                      {truck.lastKnownLocation?.address || t('trucks.noData')}
                    </div>
                  </td>

                  <td className="p-4 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedTruck(truck)}
                    >
                      {t('trucks.viewProfile')}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddTruckDialog open={isAddOpen} onClose={() => setIsAddOpen(false)} />

      <TruckDetailsSheet
        truck={selectedTruck}
        isOpen={!!selectedTruck}
        onClose={() => setSelectedTruck(null)}
      />
    </div>
  );
}