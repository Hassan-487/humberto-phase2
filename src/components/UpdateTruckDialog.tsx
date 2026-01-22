
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useUpdateTruck } from "@/hooks/useTrucks";

// export function UpdateTruckDialog({ open, onClose, truck }: any) {
//   const updateMutation = useUpdateTruck();

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     const fd = new FormData(e.currentTarget);

//     await updateMutation.mutateAsync({
//       id: truck._id,
//       payload: {
//         licensePlate: fd.get("licensePlate"),
//         make: fd.get("make"),
//         model: fd.get("model"),
//         year: Number(fd.get("year")),
//         weight_capacity: Number(fd.get("weight_capacity")),
//         fuelLevel: Number(fd.get("fuelLevel")),
//         odometer: Number(fd.get("odometer")),
//         color: fd.get("color"),
//       },
//     });

//     onClose();
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Update Truck</DialogTitle>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <Input name="licensePlate" defaultValue={truck.licensePlate} />
//           <Input name="make" defaultValue={truck.make} />
//           <Input name="model" defaultValue={truck.model} />
//           <Input name="year" type="number" defaultValue={truck.year} />
//           <Input name="weight_capacity" type="number" defaultValue={truck.weight_capacity} />
//           <Input name="fuelLevel" type="number" defaultValue={truck.fuelLevel} />
//           <Input name="odometer" type="number" defaultValue={truck.odometer} />
//           <Input name="color" defaultValue={truck.color} />

//           <Button type="submit" className="w-full">
//             Update Truck
//           </Button>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }



import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateTruck } from "@/hooks/useTrucks";

export function UpdateTruckDialog({ open, onClose, truck }: any) {
  const updateMutation = useUpdateTruck();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    await updateMutation.mutateAsync({
      id: truck._id,
      payload: {
        licensePlate: fd.get("licensePlate"),
        model: fd.get("model"),
        year: Number(fd.get("year")),
        samsaraDeviceId: fd.get("samsaraDeviceId"),
        weight_capacity: Number(fd.get("weight_capacity")),
      },
    });

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Truck</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-1">
            <Label>License Plate</Label>
            <Input
              name="licensePlate"
              defaultValue={truck.licensePlate}
            />
          </div>

          <div className="space-y-1">
            <Label>Model</Label>
            <Input name="model" defaultValue={truck.model} />
          </div>

          <div className="space-y-1">
            <Label>Model Year</Label>
            <Input
              name="year"
              type="number"
              defaultValue={truck.year}
            />
          </div>

          <div className="space-y-1">
            <Label>Samsara Device ID</Label>
            <Input
              name="samsaraDeviceId"
              defaultValue={truck.samsaraDeviceId}
            />
          </div>

          <div className="space-y-1 col-span-2">
            <Label>Weight Capacity (kg)</Label>
            <Input
              name="weight_capacity"
              type="number"
              defaultValue={truck.weight_capacity}
            />
          </div>

          <div className="col-span-2 pt-4">
            <Button type="submit" className="w-full">
              Update Truck
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
