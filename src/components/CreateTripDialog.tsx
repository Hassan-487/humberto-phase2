// import { useState, useMemo } from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useTrucks } from "@/hooks/useTrucks";
// import { useDrivers } from "@/hooks/useDrivers";
// import { useCreateTrip } from "@/hooks/useTrips";

// export function CreateTripDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
//   const { trucks } = useTrucks();
//   const { drivers } = useDrivers();
//   const { mutateAsync, isPending } = useCreateTrip();

//   const availableTrucks = useMemo(() => trucks.filter((t: any) => t.status === "available"), [trucks]);
//   const availableDrivers = useMemo(() => drivers.filter((d: any) => d.isActive && d.employmentStatus === "active"), [drivers]);

//   const [form, setForm] = useState({
//     origin: "", destination: "", truckId: "", driverId: "",
//     weight: "", estimatedHours: "", cargoDescription: ""
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const payload = {
//       driverId: form.driverId, // Match tripController.createTrip
//       truckId: form.truckId,   // Match tripController.createTrip
//       origin: form.origin,
//       destination: form.destination,
//       weight: Number(form.weight),
//       estimatedHours: Number(form.estimatedHours),
//       cargoDescription: form.cargoDescription
//     };

//     try {
//       await mutateAsync(payload);
//       onClose();
//       setForm({ origin: "", destination: "", truckId: "", driverId: "", weight: "", estimatedHours: "", cargoDescription: "" });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="max-w-xl">
//         <DialogHeader><DialogTitle>Create New Trip</DialogTitle></DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-4 pt-2">
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-1"><Label>Origin</Label><Input value={form.origin} onChange={e => setForm({...form, origin: e.target.value})} required /></div>
//             <div className="space-y-1"><Label>Destination</Label><Input value={form.destination} onChange={e => setForm({...form, destination: e.target.value})} required /></div>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-1">
//               <Label>Truck</Label>
//               <Select onValueChange={v => setForm({...form, truckId: v})} required>
//                 <SelectTrigger><SelectValue placeholder="Select Truck" /></SelectTrigger>
//                 <SelectContent>{availableTrucks.map((t:any) => <SelectItem key={t._id} value={t._id}>{t.licensePlate}</SelectItem>)}</SelectContent>
//               </Select>
//             </div>
//             <div className="space-y-1">
//               <Label>Driver</Label>
//               <Select onValueChange={v => setForm({...form, driverId: v})} required>
//                 <SelectTrigger><SelectValue placeholder="Select Driver" /></SelectTrigger>
//                 <SelectContent>{availableDrivers.map((d:any) => <SelectItem key={d._id} value={d._id}>{d.firstName} {d.lastName}</SelectItem>)}</SelectContent>
//               </Select>
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-1"><Label>Weight (kg)</Label><Input type="number" value={form.weight} onChange={e => setForm({...form, weight: e.target.value})} required /></div>
//             <div className="space-y-1"><Label>Duration (Hours)</Label><Input type="number" value={form.estimatedHours} onChange={e => setForm({...form, estimatedHours: e.target.value})} required /></div>
//           </div>
//           <div className="space-y-1">
//     <Label>Cargo Description</Label>
//     <Input 
//       placeholder="e.g. Frozen poultry, Industrial parts" 
//       value={form.cargoDescription} 
//       onChange={e => setForm({...form, cargoDescription: e.target.value})} 
//       required 
//     />
//   </div>
//           <DialogFooter className="pt-4"><Button type="submit" disabled={isPending}>{isPending ? "Creating..." : "Schedule Trip"}</Button></DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }










// import { useState, useMemo } from "react";
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
// import { Loader2 } from "lucide-react";

// import { useTrucks } from "@/hooks/useTrucks";
// import { useDrivers } from "@/hooks/useDrivers";
// import { useCreateTrip } from "@/hooks/useTrips";

// import { LocationInput } from "./LocationInput";
// import { MapLocationPicker } from "./MapLocationPicker";

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

//   const [useMap, setUseMap] = useState(false);

//   // ✅ SINGLE SOURCE OF TRUTH
//   const [form, setForm] = useState<any>({
//     truckId: "",
//     driverId: "",
//     weight: "",
//     estimatedHours: "",
//     cargoDescription: "",
//     originData: null,
//     destData: null,
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!form.originData || !form.destData) {
//       alert("Origin and Destination are required");
//       return;
//     }

//     const payload = {
//       driverId: form.driverId,
//       truckId: form.truckId,

//       // ✅ ALWAYS SAFE
//       origin: String(form.originData.address),
//       destination: String(form.destData.address),

//       originLocation: {
//         locationName: form.originData.address,
//         address: form.originData.address,
//         latitude: form.originData.latitude,
//         longitude: form.originData.longitude,
//         notes: "Origin selected from UI",
//       },

//       pickupLocation: {
//         locationName: form.originData.address,
//         address: form.originData.address,
//         latitude: form.originData.latitude,
//         longitude: form.originData.longitude,
//         notes: "Pickup location",
//       },

//       destinationLocation: {
//         locationName: form.destData.address,
//         address: form.destData.address,
//         latitude: form.destData.latitude,
//         longitude: form.destData.longitude,
//       },

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
//       <DialogContent className="max-w-xl">
//         <DialogHeader>
//           <DialogTitle>Create New Trip</DialogTitle>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div className="flex gap-2">
//             <Button
//               type="button"
//               variant={!useMap ? "default" : "outline"}
//               onClick={() => setUseMap(false)}
//             >
//               Search Address
//             </Button>
//             <Button
//               type="button"
//               variant={useMap ? "default" : "outline"}
//               onClick={() => setUseMap(true)}
//             >
//               Select From Map
//             </Button>
//           </div>

//           {!useMap && (
//             <div className="grid grid-cols-2 gap-4">
//               <LocationInput
//                 placeholder="Origin"
//                 onLocationSelect={(loc) =>
//                   setForm((prev: any) => ({
//                     ...prev,
//                     originData: loc,
//                   }))
//                 }
//               />
//               <LocationInput
//                 placeholder="Destination"
//                 onLocationSelect={(loc) =>
//                   setForm((prev: any) => ({
//                     ...prev,
//                     destData: loc,
//                   }))
//                 }
//               />
//             </div>
//           )}

//           {useMap && (
//             <div className="space-y-6">
//               <MapLocationPicker
//                 label="origin"
//                 onSelect={(loc) =>
//                   setForm((prev: any) => ({
//                     ...prev,
//                     originData: loc,
//                   }))
//                 }
//               />
//               <MapLocationPicker
//                 label="destination"
//                 onSelect={(loc) =>
//                   setForm((prev: any) => ({
//                     ...prev,
//                     destData: loc,
//                   }))
//                 }
//               />
//             </div>
//           )}

//           <div className="grid grid-cols-2 gap-4">
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

//             <Select onValueChange={(v) => setForm({ ...form, driverId: v })}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select Driver" />
//               </SelectTrigger>
//               <SelectContent>
//                 {availableDrivers.map((d: any) => (
//                   <SelectItem key={d._id} value={d._id}>
//                     {d.firstName} {d.lastName}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <Input
//               type="number"
//               placeholder="Weight (kg)"
//               value={form.weight}
//               onChange={(e) =>
//                 setForm({ ...form, weight: e.target.value })
//               }
//               required
//             />
//             <Input
//               type="number"
//               placeholder="Estimated Hours"
//               value={form.estimatedHours}
//               onChange={(e) =>
//                 setForm({ ...form, estimatedHours: e.target.value })
//               }
//               required
//             />
//           </div>

//           <Input
//             placeholder="Cargo Description"
//             value={form.cargoDescription}
//             onChange={(e) =>
//               setForm({ ...form, cargoDescription: e.target.value })
//             }
//             required
//           />

//           <DialogFooter>
//             <Button type="submit" disabled={isPending}>
//               {isPending ? (
//                 <Loader2 className="h-4 w-4 animate-spin" />
//               ) : (
//                 "Schedule Trip"
//               )}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }










import { useState, useMemo } from "react";
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
import { Loader2 } from "lucide-react";

import { useTrucks } from "@/hooks/useTrucks";
import { useDrivers } from "@/hooks/useDrivers";
import { useCreateTrip } from "@/hooks/useTrips";

import { LargeMapPicker } from "./LargeMapPicker";

type MapMode = "origin" | "pickup" | "destination";

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

  const availableTrucks = useMemo(
    () => (trucks || []).filter((t: any) => t.status === "available"),
    [trucks]
  );

  const availableDrivers = useMemo(
    () =>
      (drivers || []).filter(
        (d: any) => d.isActive && d.employmentStatus === "active"
      ),
    [drivers]
  );

  const [mapMode, setMapMode] = useState<MapMode>("origin");

  const [form, setForm] = useState<any>({
    origin: "",
    destination: "",

    originLocation: null,
    pickupLocation: null,
    destinationLocation: null,

    truckId: "",
    driverId: "",
    weight: "",
    estimatedHours: "",
    cargoDescription: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.origin ||
      !form.destination ||
      !form.originLocation ||
      !form.pickupLocation ||
      !form.destinationLocation
    ) {
      alert("Please complete route and map selections");
      return;
    }

    const payload = {
      origin: form.origin,
      destination: form.destination,

      originLocation: form.originLocation,
      pickupLocation: form.pickupLocation,
      destinationLocation: form.destinationLocation,

      driverId: form.driverId,
      truckId: form.truckId,
      estimatedHours: Number(form.estimatedHours),
      weight: Number(form.weight),
      weightCategory: "standard",
      cargoDescription: form.cargoDescription,
    };

    await mutateAsync(payload);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
     <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
       <div className="overflow-y-auto pr-2 max-h-[75vh] space-y-6">

        <DialogHeader>
          <DialogTitle>Create New Trip</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* TEXT ROUTE */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Origin (e.g. Winnipeg)"
              value={form.origin}
              onChange={(e) =>
                setForm({ ...form, origin: e.target.value })
              }
              required
            />
            <Input
              placeholder="Destination (e.g. Toronto Port)"
              value={form.destination}
              onChange={(e) =>
                setForm({ ...form, destination: e.target.value })
              }
              required
            />
          </div>

          {/* MAP MODE SWITCH */}
        
<div className="flex gap-2">
  <Button
    type="button"
    variant={mapMode === "origin" ? "default" : "outline"}
    onClick={() => setMapMode("origin")}
    className={form.originLocation ? "border-green-500" : ""}
  >
    Origin {form.originLocation && "✓"}
  </Button>
  
  <Button
    type="button"
    variant={mapMode === "pickup" ? "default" : "outline"}
    onClick={() => setMapMode("pickup")}
    className={form.pickupLocation ? "border-green-500" : ""}
  >
    Pickup {form.pickupLocation && "✓"}
  </Button>
  
  <Button
    type="button"
    variant={mapMode === "destination" ? "default" : "outline"}
    onClick={() => setMapMode("destination")}
    className={form.destinationLocation ? "border-green-500" : ""}
  >
    Destination {form.destinationLocation && "✓"}
  </Button>
</div>
          {/* LARGE MAP */}
    <LargeMapPicker
  mode={mapMode}
  locations={{
    originLocation: form.originLocation,
    pickupLocation: form.pickupLocation,
    destinationLocation: form.destinationLocation,
  }}
  onSelect={(loc) => {
    // This function is recreated when mapMode changes.
    // The Ref in LargeMapPicker ensures the map always calls the NEWEST version.
    setForm((prev: any) => ({
      ...prev,
      [`${mapMode}Location`]: {
        ...loc,
        notes: mapMode === "pickup" ? "Pickup location" : "Selected from map",
      },
    }));
  }}
/>


          {/* TRUCK & DRIVER */}
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

            <Select onValueChange={(v) => setForm({ ...form, driverId: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Select Driver" />
              </SelectTrigger>
              <SelectContent>
                {availableDrivers.map((d: any) => (
                  <SelectItem key={d._id} value={d._id}>
                    {d.firstName} {d.lastName}
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

          <Input
            placeholder="Cargo Description"
            value={form.cargoDescription}
            onChange={(e) =>
              setForm({ ...form, cargoDescription: e.target.value })
            }
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
