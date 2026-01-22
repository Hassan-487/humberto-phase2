
// import { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
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

// import { useCreateTruck } from "@/hooks/useTrucks";

// interface Props {
//   open: boolean;
//   onClose: () => void;
// }

// export function AddTruckDialog({ open, onClose }: Props) {
//   const { mutateAsync, isPending } = useCreateTruck();

//   const [form, setForm] = useState({
//     licensePlate: "",
//     make: "",
//     model: "",
//     year: "",
//     samsaraDeviceId: "",
//     fuelType: "diesel",
//     weight_capacity: "",
//     odometer: "",
//     fuelLevel: "",
//     color: "",
//   });

//   const handleChange = (key: string, value: string) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleSubmit = async () => {
//     await mutateAsync({
//       licensePlate: form.licensePlate,
//       make: form.make,
//       model: form.model,
//       year: Number(form.year),
//       samsaraDeviceId: form.samsaraDeviceId,
//       fuelType: form.fuelType,
//       weight_capacity: Number(form.weight_capacity),
//       odometer: Number(form.odometer),
//       fuelLevel: Number(form.fuelLevel),
//       color: form.color || undefined,
//     });

//     onClose();
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="max-w-xl">
//         <DialogHeader>
//           <DialogTitle>Add New Truck</DialogTitle>
//         </DialogHeader>

//         <div className="grid grid-cols-2 gap-4 mt-4">
//           <Input
//             placeholder="License Plate"
//             value={form.licensePlate}
//             onChange={(e) => handleChange("licensePlate", e.target.value)}
//           />

//           <Input
//             placeholder="Make"
//             value={form.make}
//             onChange={(e) => handleChange("make", e.target.value)}
//           />

//           <Input
//             placeholder="Model"
//             value={form.model}
//             onChange={(e) => handleChange("model", e.target.value)}
//           />

//           <Input
//             placeholder="Year"
//             type="number"
//             value={form.year}
//             onChange={(e) => handleChange("year", e.target.value)}
//           />

//           <Input
//             placeholder="Samsara Device ID"
//             value={form.samsaraDeviceId}
//             onChange={(e) =>
//               handleChange("samsaraDeviceId", e.target.value)
//             }
//           />

//           <Select
//             value={form.fuelType}
//             onValueChange={(v) => handleChange("fuelType", v)}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Fuel Type" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="diesel">Diesel</SelectItem>
//               <SelectItem value="petrol">Petrol</SelectItem>
//               <SelectItem value="electric">Electric</SelectItem>
//               <SelectItem value="hybrid">Hybrid</SelectItem>
//             </SelectContent>
//           </Select>

//           <Input
//             placeholder="Weight Capacity (kg)"
//             type="number"
//             value={form.weight_capacity}
//             onChange={(e) => handleChange("weight_capacity", e.target.value)}
//           />

//           <Input
//             placeholder="Odometer"
//             type="number"
//             value={form.odometer}
//             onChange={(e) => handleChange("odometer", e.target.value)}
//           />

//           <Input
//             placeholder="Fuel Level"
//             type="number"
//             value={form.fuelLevel}
//             onChange={(e) => handleChange("fuelLevel", e.target.value)}
//           />

//           <Input
//             placeholder="Color (optional)"
//             value={form.color}
//             onChange={(e) => handleChange("color", e.target.value)}
//           />
//         </div>

//         <div className="flex justify-end gap-3 mt-6">
//           <Button variant="outline" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} disabled={isPending}>
//             {isPending ? "Creating..." : "Create Truck"}
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }



import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateTruck } from "@/hooks/useTrucks";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function AddTruckDialog({ open, onClose }: Props) {
  const { mutateAsync, isPending } = useCreateTruck();

  const [form, setForm] = useState({
    licensePlate: "",
    model: "",
    year: "",
    samsaraDeviceId: "",
    weight_capacity: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    await mutateAsync({
      licensePlate: form.licensePlate,
      model: form.model,
      year: Number(form.year),
      samsaraDeviceId: form.samsaraDeviceId,
      weight_capacity: Number(form.weight_capacity),
    });

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Truck</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-1">
            <Label>License Plate</Label>
            <Input
              value={form.licensePlate}
              onChange={(e) =>
                handleChange("licensePlate", e.target.value)
              }
            />
          </div>

          <div className="space-y-1">
            <Label>Model</Label>
            <Input
              value={form.model}
              onChange={(e) => handleChange("model", e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label>Model Year</Label>
            <Input
              type="number"
              value={form.year}
              onChange={(e) => handleChange("year", e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label>Samsara Device ID</Label>
            <Input
              value={form.samsaraDeviceId}
              onChange={(e) =>
                handleChange("samsaraDeviceId", e.target.value)
              }
            />
          </div>

          <div className="space-y-1 col-span-2">
            <Label>Weight Capacity (kg)</Label>
            <Input
              type="number"
              value={form.weight_capacity}
              onChange={(e) =>
                handleChange("weight_capacity", e.target.value)
              }
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? "Creating..." : "Create Truck"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
