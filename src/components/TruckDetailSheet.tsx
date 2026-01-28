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
  FileText,
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

interface Props {
  truck: any;
  isOpen: boolean;
  onClose: () => void;
}

export function TruckDetailsSheet({
  truck,
  isOpen,
  onClose,
}: Props) {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const deleteMutation = useDeleteTruck();

  if (!truck) return null;

  /* ================= DOCUMENTS ================= */
  const documents = truck.documents || [];

  const registrationDoc = documents.find(
    (d: any) => d.type === "registration"
  );
  const insuranceDoc = documents.find(
    (d: any) => d.type === "insurance"
  );

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
          {/* ================= HEADER ================= */}
          <SheetHeader className="p-6 border-b bg-card">
            <SheetTitle className="flex items-center gap-2 font-bold text-xl">
              <TruckIcon className="h-6 w-6 text-primary" />
              Truck Profile: {truck.licensePlate}
            </SheetTitle>
          </SheetHeader>

          {/* ================= BODY ================= */}
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
              <h4 className="text-sm font-bold flex items-center gap-2 border-b pb-1 text-primary">
                <Gauge className="h-4 w-4" /> Vehicle Specifications
              </h4>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-xs text-muted-foreground">Model</Label>
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

            {/* ================= DOCUMENTS ================= */}
            <section className="space-y-4 pt-4 border-t">
              <Label className="text-sm font-bold flex items-center gap-2 border-b pb-1 text-primary">
                <FileText className="h-4 w-4" />
                Truck Documents
              </Label>

              <div className="space-y-2">
                {registrationDoc ? (
                  <a
                    href={registrationDoc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm font-semibold text-primary underline"
                  >
                    📄 View Registration Document
                  </a>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Registration document not uploaded
                  </p>
                )}

                {insuranceDoc ? (
                  <a
                    href={insuranceDoc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm font-semibold text-primary underline"
                  >
                    📄 View Insurance Document
                  </a>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Insurance document not uploaded
                  </p>
                )}
              </div>
            </section>

            {/* LOCATION */}
            <div className="space-y-3 pt-4 border-t">
              <h4 className="text-sm font-bold flex items-center gap-2 border-b pb-1 text-primary">
                <MapPin className="h-4 w-4" /> Current Location
              </h4>

              <div className="p-3 border rounded-lg bg-blue-50/10">
                <p className="font-medium">
                  {truck.lastKnownLocation?.address ||
                    "Address not reported"}
                </p>

                {truck.lastKnownLocation?.updatedAt && (
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-2">
                    <History className="h-3.5 w-3.5" />
                    Last updated:{" "}
                    {new Date(
                      truck.lastKnownLocation.updatedAt
                    ).toLocaleString()}
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
