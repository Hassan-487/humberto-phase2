

// import { useState, useMemo, useEffect } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Loader2, MapPin } from "lucide-react";

// import { useTrucks } from "@/hooks/useTrucks";
// import { useDrivers } from "@/hooks/useDrivers";
// import { useCreateTrip } from "@/hooks/useTrips";
// import { LargeMapPicker } from "./LargeMapPicker";

// type MapMode = "origin" | "destination" | null;

// const EMPTY_FORM = {
//   origin: "",
//   destination: "",

//   originLocation: null,
//   destinationLocation: null,

//   originPickupTime: "",
//   destinationDeliveryTime: "",

//   truckId: "",
//   driverId: "",
//   weight: "",
//   estimatedHours: "",
//   cargoDescription: "",
// };

// export function CreateTripDialog({
//   open,
//   onClose,
// }: {
//   open: boolean;
//   onClose: () => void;
// }) {
//   const { trucks } = useTrucks();
//   const { drivers } = useDrivers();
//   const { mutateAsync, isPending } = useCreateTrip();

//   const availableTrucks = useMemo(
//     () => (trucks || []).filter((t: any) => t.status === "available"),
//     [trucks]
//   );

//   const availableDrivers = useMemo(
//     () =>
//       (drivers || []).filter(
//         (d: any) => d.isActive && d.employmentStatus === "active"
//       ),
//     [drivers]
//   );

//   const [form, setForm] = useState<any>(EMPTY_FORM);
//   const [mapMode, setMapMode] = useState<MapMode>(null);

//   // 🔥 Reset everything on dialog open
//   useEffect(() => {
//     if (open) {
//       setForm(EMPTY_FORM);
//       setMapMode(null);
//     }
//   }, [open]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!form.originLocation || !form.destinationLocation) {
//       alert("Please select origin and destination on map");
//       return;
//     }

//     if (!form.originPickupTime || !form.destinationDeliveryTime) {
//       alert("Pickup and delivery times are required");
//       return;
//     }

//     if (
//       new Date(form.originPickupTime) >=
//       new Date(form.destinationDeliveryTime)
//     ) {
//       alert("Delivery time must be after pickup time");
//       return;
//     }

//     const payload = {
//       origin: form.origin,
//       destination: form.destination,

//       originLocation: form.originLocation,
//       destinationLocation: form.destinationLocation,

//       originPickupTime: new Date(
//         form.originPickupTime
//       ).toISOString(),

//       destinationDeliveryTime: new Date(
//         form.destinationDeliveryTime
//       ).toISOString(),

//       driverId: form.driverId,
//       truckId: form.truckId,

//       estimatedHours: Number(form.estimatedHours),
//       weight: Number(form.weight),
//       weightCategory: "standard",
//       cargoDescription: form.cargoDescription,
//     };

//     await mutateAsync(payload);
//     onClose();
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
//         <div className="max-h-[80vh] overflow-y-auto space-y-6 pr-2">
//           <DialogHeader>
//             <DialogTitle>Create New Trip</DialogTitle>
//           </DialogHeader>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* ORIGIN / DESTINATION TEXT */}
//             <div className="grid grid-cols-2 gap-4">
//               <Input
//                 placeholder="Origin (e.g. Alberta)"
//                 value={form.origin}
//                 onChange={(e) =>
//                   setForm({ ...form, origin: e.target.value })
//                 }
//                 required
//               />
//               <Input
//                 placeholder="Destination (e.g. British Columbia)"
//                 value={form.destination}
//                 onChange={(e) =>
//                   setForm({ ...form, destination: e.target.value })
//                 }
//                 required
//               />
//             </div>

//             {/* PICKUP / DELIVERY TIMES */}
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-1">
//                 <label className="text-sm font-medium">
//                   Origin Pickup Time
//                 </label>
//                 <Input
//                   type="datetime-local"
//                   value={form.originPickupTime}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       originPickupTime: e.target.value,
//                     })
//                   }
//                   required
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-sm font-medium">
//                   Destination Delivery Time
//                 </label>
//                 <Input
//                   type="datetime-local"
//                   value={form.destinationDeliveryTime}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       destinationDeliveryTime: e.target.value,
//                     })
//                   }
//                   required
//                 />
//               </div>
//             </div>

//             {/* MAP CONTROLS */}
//             <div className="flex items-center gap-2">
//               <Button
//                 type="button"
//                 variant={mapMode === "origin" ? "default" : "outline"}
//                 onClick={() => setMapMode("origin")}
//               >
//                 Select Origin
//               </Button>

//               <Button
//                 type="button"
//                 variant={mapMode === "destination" ? "default" : "outline"}
//                 onClick={() => setMapMode("destination")}
//               >
//                 Select Destination
//               </Button>

//               {mapMode && (
//                 <Button
//                   type="button"
//                   variant="ghost"
//                   className="gap-1"
//                   onClick={() => setMapMode(null)}
//                 >
//                   <MapPin className="h-4 w-4" /> Close Map
//                 </Button>
//               )}
//             </div>

//             {/* MAP */}
//             {mapMode && (
//               <LargeMapPicker
//                 key={mapMode} // 🔥 force remount on mode change
//                 mode={mapMode}
//                 existingLocations={{
//                   origin: form.originLocation,
//                   destination: form.destinationLocation,
//                 }}
//                 onSelect={(loc) =>
//                   setForm((prev: any) => ({
//                     ...prev,
//                     [`${mapMode}Location`]: loc,
//                   }))
//                 }
//               />
//             )}

//             {/* TRUCK & DRIVER */}
//             <div className="grid grid-cols-2 gap-4">
//               <Select onValueChange={(v) => setForm({ ...form, truckId: v })}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select Truck" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {availableTrucks.map((t: any) => (
//                     <SelectItem key={t._id} value={t._id}>
//                       {t.licensePlate}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>

//               <Select onValueChange={(v) => setForm({ ...form, driverId: v })}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select Driver" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {availableDrivers.map((d: any) => (
//                     <SelectItem key={d._id} value={d._id}>
//                       {d.firstName} {d.lastName}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* LOGISTICS */}
//             <div className="grid grid-cols-2 gap-4">
//               <Input
//                 type="number"
//                 placeholder="Weight (kg)"
//                 value={form.weight}
//                 onChange={(e) =>
//                   setForm({ ...form, weight: e.target.value })
//                 }
//                 required
//               />
//               <Input
//                 type="number"
//                 placeholder="Estimated Hours"
//                 value={form.estimatedHours}
//                 onChange={(e) =>
//                   setForm({ ...form, estimatedHours: e.target.value })
//                 }
//                 required
//               />
//             </div>

//             <Input
//               placeholder="Cargo Description"
//               value={form.cargoDescription}
//               onChange={(e) =>
//                 setForm({ ...form, cargoDescription: e.target.value })
//               }
//               required
//             />

//             <DialogFooter>
//               <Button type="submit" disabled={isPending}>
//                 {isPending ? (
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                 ) : (
//                   "Schedule Trip"
//                 )}
//               </Button>
//             </DialogFooter>
//           </form>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }





// import { useState, useMemo, useEffect } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Loader2, MapPin } from "lucide-react";

// import { useTrucks } from "@/hooks/useTrucks";
// import { useDrivers } from "@/hooks/useDrivers";
// import { useCreateTrip } from "@/hooks/useTrips";
// import { LargeMapPicker } from "./LargeMapPicker";

// type MapMode = "origin" | "destination" | null;

// const EMPTY_FORM = {
//   origin: "",
//   destination: "",

//   originLocation: null,
//   destinationLocation: null,

//   originPickupTime: "",
//   destinationDeliveryTime: "",

//   truckId: "",
//   driverId: "",
//   weight: "",
//   estimatedHours: "",
//   cargoDescription: "",
// };

// export function CreateTripDialog({
//   open,
//   onClose,
// }: {
//   open: boolean;
//   onClose: () => void;
// }) {
//   const { trucks } = useTrucks();
//   const { drivers } = useDrivers();
//   const { mutateAsync, isPending } = useCreateTrip();

//   const [form, setForm] = useState<any>(EMPTY_FORM);
//   const [mapMode, setMapMode] = useState<MapMode>(null);
//   const [driverError, setDriverError] = useState<string | null>(null);

//   // ✅ Only block INACTIVE drivers
//   const availableDrivers = useMemo(
//     () => (drivers || []).filter((d: any) => d.status !== "inactive"),
//     [drivers]
//   );

//   const availableTrucks = useMemo(
//     () => (trucks || []).filter((t: any) => t.status === "available"),
//     [trucks]
//   );

//   // 🔥 Reset state on dialog open
//   useEffect(() => {
//     if (open) {
//       setForm(EMPTY_FORM);
//       setMapMode(null);
//       setDriverError(null);
//     }
//   }, [open]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!form.originLocation || !form.destinationLocation) {
//       alert("Please select origin and destination on map");
//       return;
//     }

//     if (!form.originPickupTime || !form.destinationDeliveryTime) {
//       alert("Pickup and delivery times are required");
//       return;
//     }

//     if (
//       new Date(form.originPickupTime) >=
//       new Date(form.destinationDeliveryTime)
//     ) {
//       alert("Delivery time must be after pickup time");
//       return;
//     }

//     const payload = {
//       origin: form.origin,
//       destination: form.destination,

//       originLocation: form.originLocation,
//       destinationLocation: form.destinationLocation,

//       originPickupTime: new Date(form.originPickupTime).toISOString(),
//       destinationDeliveryTime: new Date(
//         form.destinationDeliveryTime
//       ).toISOString(),

//       driverId: form.driverId,
//       truckId: form.truckId,

//       estimatedHours: Number(form.estimatedHours),
//       weight: Number(form.weight),
//       weightCategory: "standard",
//       cargoDescription: form.cargoDescription,
//     };

//     try {
//       await mutateAsync(payload);
//       onClose();
//     } catch (err: any) {
//       const message =
//         err?.response?.data?.message ||
//         err?.response?.data?.error ||
//         "Driver is not available for the selected time";

//       setDriverError(message);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
//         <div className="max-h-[80vh] overflow-y-auto space-y-6 pr-2">
//           <DialogHeader>
//             <DialogTitle>Create New Trip</DialogTitle>
//           </DialogHeader>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* ORIGIN / DESTINATION */}
//             <div className="grid grid-cols-2 gap-4">
//               <Input
//                 placeholder="Origin"
//                 value={form.origin}
//                 onChange={(e) =>
//                   setForm({ ...form, origin: e.target.value })
//                 }
//                 required
//               />
//               <Input
//                 placeholder="Destination"
//                 value={form.destination}
//                 onChange={(e) =>
//                   setForm({ ...form, destination: e.target.value })
//                 }
//                 required
//               />
//             </div>

//             {/* TIMES */}
//             <div className="grid grid-cols-2 gap-4">
//               <Input
//                 type="datetime-local"
//                 value={form.originPickupTime}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     originPickupTime: e.target.value,
//                   })
//                 }
//                 required
//               />
//               <Input
//                 type="datetime-local"
//                 value={form.destinationDeliveryTime}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     destinationDeliveryTime: e.target.value,
//                   })
//                 }
//                 required
//               />
//             </div>

//             {/* MAP CONTROLS */}
//             <div className="flex gap-2">
//               <Button
//                 type="button"
//                 variant={mapMode === "origin" ? "default" : "outline"}
//                 onClick={() => setMapMode("origin")}
//               >
//                 Select Origin
//               </Button>

//               <Button
//                 type="button"
//                 variant={mapMode === "destination" ? "default" : "outline"}
//                 onClick={() => setMapMode("destination")}
//               >
//                 Select Destination
//               </Button>

//               {mapMode && (
//                 <Button
//                   type="button"
//                   variant="ghost"
//                   onClick={() => setMapMode(null)}
//                 >
//                   <MapPin className="h-4 w-4" /> Close Map
//                 </Button>
//               )}
//             </div>

//             {/* MAP */}
//             {mapMode && (
//               <LargeMapPicker
//                 key={mapMode}
//                 mode={mapMode}
//                 existingLocations={{
//                   origin: form.originLocation,
//                   destination: form.destinationLocation,
//                 }}
//                 onSelect={(loc) =>
//                   setForm((prev: any) => ({
//                     ...prev,
//                     [`${mapMode}Location`]: loc,
//                   }))
//                 }
//               />
//             )}

//             {/* TRUCK */}
//             <Select onValueChange={(v) => setForm({ ...form, truckId: v })}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select Truck" />
//               </SelectTrigger>
//               <SelectContent>
//                 {availableTrucks.map((t: any) => (
//                   <SelectItem key={t._id} value={t._id}>
//                     {t.licensePlate}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             {/* DRIVER ERROR */}
//             {driverError && (
//               <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
//                 {driverError}
//               </div>
//             )}

//             {/* DRIVER */}
//             <Select
//               onValueChange={(v) => {
//                 setForm({ ...form, driverId: v });
//                 setDriverError(null);
//               }}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select Driver" />
//               </SelectTrigger>
//               <SelectContent>
//                 {availableDrivers.map((d: any) => (
//                   <SelectItem key={d._id} value={d._id}>
//                     {d.firstName} {d.lastName}{" "}
//                     <span className="text-muted-foreground">
//                       ({d.status.replace("_", " ")})
//                     </span>
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             {/* LOGISTICS */}
//             <div className="grid grid-cols-2 gap-4">
//               <Input
//                 type="number"
//                 placeholder="Weight (kg)"
//                 value={form.weight}
//                 onChange={(e) =>
//                   setForm({ ...form, weight: e.target.value })
//                 }
//                 required
//               />
//               <Input
//                 type="number"
//                 placeholder="Estimated Hours"
//                 value={form.estimatedHours}
//                 onChange={(e) =>
//                   setForm({ ...form, estimatedHours: e.target.value })
//                 }
//                 required
//               />
//             </div>

//             <Input
//               placeholder="Cargo Description"
//               value={form.cargoDescription}
//               onChange={(e) =>
//                 setForm({ ...form, cargoDescription: e.target.value })
//               }
//               required
//             />

//             <DialogFooter>
//               <Button type="submit" disabled={isPending}>
//                 {isPending ? (
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                 ) : (
//                   "Schedule Trip"
//                 )}
//               </Button>
//             </DialogFooter>
//           </form>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }




import { useState, useMemo, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, MapPin } from "lucide-react";

import { useTrucks } from "@/hooks/useTrucks";
import { useDrivers } from "@/hooks/useDrivers";
import { useCreateTrip } from "@/hooks/useTrips";
import { LargeMapPicker } from "./LargeMapPicker";

type MapMode = "origin" | "destination" | null;

const EMPTY_FORM = {
  origin: "",
  destination: "",

  originLocation: null,
  destinationLocation: null,

  originPickupTime: "",
  destinationDeliveryTime: "",

  truckId: "",
  driverId: "",
  weight: "",
  estimatedHours: "",
  cargoDescription: "",
};

export function CreateTripDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { trucks } = useTrucks();
  const { drivers } = useDrivers();
  const { mutateAsync, isPending } = useCreateTrip();

  const [form, setForm] = useState<any>(EMPTY_FORM);
  const [mapMode, setMapMode] = useState<MapMode>(null);
  const [driverError, setDriverError] = useState<string | null>(null);

  // ✅ allow all except inactive
  const availableDrivers = useMemo(
    () => (drivers || []).filter((d: any) => d.status !== "inactive"),
    [drivers]
  );

  const availableTrucks = useMemo(
    () => (trucks || []).filter((t: any) => t.status === "available"),
    [trucks]
  );

  // Reset on open
  useEffect(() => {
    if (open) {
      setForm(EMPTY_FORM);
      setMapMode(null);
      setDriverError(null);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.originLocation || !form.destinationLocation) {
      alert("Please select origin and destination on map");
      return;
    }

    if (!form.originPickupTime || !form.destinationDeliveryTime) {
      alert("Pickup and delivery times are required");
      return;
    }

    if (
      new Date(form.originPickupTime) >=
      new Date(form.destinationDeliveryTime)
    ) {
      alert("Delivery time must be after pickup time");
      return;
    }

    const payload = {
      origin: form.origin,
      destination: form.destination,

      originLocation: form.originLocation,
      destinationLocation: form.destinationLocation,

      originPickupTime: new Date(form.originPickupTime).toISOString(),
      destinationDeliveryTime: new Date(
        form.destinationDeliveryTime
      ).toISOString(),

      driverId: form.driverId,
      truckId: form.truckId,

      estimatedHours: Number(form.estimatedHours),
      weight: Number(form.weight),
      weightCategory: "standard",
      cargoDescription: form.cargoDescription,
    };

    try {
      await mutateAsync(payload);
      onClose();
    } catch (err: any) {
      setDriverError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Driver is not available for the selected time"
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="max-h-[80vh] overflow-y-auto space-y-6 pr-2">
          <DialogHeader>
            <DialogTitle>Create New Trip</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ORIGIN / DESTINATION */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Origin"
                value={form.origin}
                onChange={(e) =>
                  setForm({ ...form, origin: e.target.value })
                }
                required
              />
              <Input
                placeholder="Destination"
                value={form.destination}
                onChange={(e) =>
                  setForm({ ...form, destination: e.target.value })
                }
                required
              />
            </div>

            {/* TIMES */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="datetime-local"
                value={form.originPickupTime}
                onChange={(e) =>
                  setForm({ ...form, originPickupTime: e.target.value })
                }
                required
              />
              <Input
                type="datetime-local"
                value={form.destinationDeliveryTime}
                onChange={(e) =>
                  setForm({
                    ...form,
                    destinationDeliveryTime: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* MAP CONTROLS */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant={mapMode === "origin" ? "default" : "outline"}
                onClick={() => setMapMode("origin")}
              >
                Select Origin
              </Button>

              <Button
                type="button"
                variant={mapMode === "destination" ? "default" : "outline"}
                onClick={() => setMapMode("destination")}
              >
                Select Destination
              </Button>

              {mapMode && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setMapMode(null)}
                >
                  <MapPin className="h-4 w-4" /> Close Map
                </Button>
              )}
            </div>

            {/* MAP */}
            {mapMode && (
              <LargeMapPicker
                key={mapMode}
                mode={mapMode}
                existingLocations={{
                  origin: form.originLocation,
                  destination: form.destinationLocation,
                }}
                onSelect={(loc) =>
                  setForm((prev: any) => ({
                    ...prev,
                    [`${mapMode}Location`]: loc,
                  }))
                }
              />
            )}

            {/* DRIVER ERROR */}
            {driverError && (
              <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                {driverError}
              </div>
            )}

            {/* TRUCK + DRIVER (SAME ROW) */}
            <div className="grid grid-cols-2 gap-4">
              <Select onValueChange={(v) => setForm({ ...form, truckId: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Truck" />
                </SelectTrigger>
                <SelectContent>
                  {availableTrucks.map((t: any) => (
                    <SelectItem key={t._id} value={t._id}>
                      {t.licensePlate}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                onValueChange={(v) => {
                  setForm({ ...form, driverId: v });
                  setDriverError(null);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Driver" />
                </SelectTrigger>
                <SelectContent>
                  {availableDrivers.map((d: any) => (
                    <SelectItem key={d._id} value={d._id}>
                      {d.firstName} {d.lastName}{" "}
                      <span className="text-muted-foreground">
                        ({d.status.replace("_", " ")})
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* LOGISTICS */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                placeholder="Weight (kg)"
                value={form.weight}
                onChange={(e) =>
                  setForm({ ...form, weight: e.target.value })
                }
                required
              />
              <Input
                type="number"
                placeholder="Estimated Hours"
                value={form.estimatedHours}
                onChange={(e) =>
                  setForm({ ...form, estimatedHours: e.target.value })
                }
                required
              />
            </div>

            {/* EXPANDABLE CARGO DESCRIPTION */}
            <textarea
              placeholder="Cargo Description"
              value={form.cargoDescription}
              onChange={(e) =>
                setForm({ ...form, cargoDescription: e.target.value })
              }
              rows={3}
              className="w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              required
            />

            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Schedule Trip"
                )}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
