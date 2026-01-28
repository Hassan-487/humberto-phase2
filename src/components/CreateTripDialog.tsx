
import { useState, useMemo, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
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
import { 
  Loader2, 
  MapPin, 
  Truck, 
  User as UserIcon, 
  Calendar, 
  Package, 
  FileCheck,
  Navigation2
} from "lucide-react";

import { useTrucks } from "@/hooks/useTrucks";
import { useDrivers } from "@/hooks/useDrivers";
import { useCreateTrip } from "@/hooks/useTrips";
import { uploadTripDocuments } from "@/services/trip.service";
import { LargeMapPicker } from "./LargeMapPicker";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

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

export function CreateTripDialog({ open, onClose }: { open: boolean; onClose: () => void; }) {
  const { trucks } = useTrucks();
  const { drivers } = useDrivers();
  const { mutateAsync, isPending } = useCreateTrip();

  const [form, setForm] = useState<any>(EMPTY_FORM);
  const [mapMode, setMapMode] = useState<MapMode>(null);
  const [driverError, setDriverError] = useState<string | null>(null);

  const [invoice1Url, setInvoice1Url] = useState<string>("");
  const [invoice2Url, setInvoice2Url] = useState<string>("");
  const [uploadingInvoice1, setUploadingInvoice1] = useState(false);
  const [uploadingInvoice2, setUploadingInvoice2] = useState(false);

  const availableDrivers = useMemo(() => (drivers || []).filter((d: any) => d.status !== "inactive"), [drivers]);
  const availableTrucks = useMemo(() => (trucks || []).filter((t: any) => t.status === "available"), [trucks]);

  useEffect(() => {
    if (open) {
      setForm(EMPTY_FORM);
      setMapMode(null);
      setDriverError(null);
      setInvoice1Url("");
      setInvoice2Url("");
    }
  }, [open]);

  const uploadInvoice = async (file: File, type: "invoice1" | "invoice2") => {
    const fd = new FormData();
    fd.append(type, file);
    try {
      type === "invoice1" ? setUploadingInvoice1(true) : setUploadingInvoice2(true);
      const res = await uploadTripDocuments(fd);
      if (type === "invoice1") setInvoice1Url(res.invoice1?.url);
      else setInvoice2Url(res.invoice2?.url);
    } catch (err) {
      console.error("Invoice upload failed", err);
    } finally {
      setUploadingInvoice1(false);
      setUploadingInvoice2(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.originLocation || !form.destinationLocation) return alert("Select locations on map");
    if (!form.originPickupTime || !form.destinationDeliveryTime) return alert("Times required");

    const payload = {
      ...form,
      originPickupTime: new Date(form.originPickupTime).toISOString(),
      destinationDeliveryTime: new Date(form.destinationDeliveryTime).toISOString(),
      estimatedHours: Number(form.estimatedHours),
      weight: Number(form.weight),
      weightCategory: "standard",
      invoice1: invoice1Url || undefined,
      invoice2: invoice2Url || undefined,
    };

    try {
      await mutateAsync(payload);
      onClose();
    } catch (err: any) {
      setDriverError(err?.response?.data?.message || "Failed to create trip");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[95vh] p-0 overflow-hidden flex flex-col">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Navigation2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl">Create New Logistics Trip</DialogTitle>
              <DialogDescription>Schedule routes, assign assets, and upload cargo documentation.</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Separator />

        <ScrollArea className="flex-1 overflow-y-auto px-6">
          <form id="trip-form" onSubmit={handleSubmit} className="py-6 space-y-8">
            
            {/* 1. ROUTE & MAP SECTION */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
                <MapPin className="h-4 w-4" /> Route Information
              </div>
              <div className="grid grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="space-y-2">
                  <Label>Origin Address</Label>
                  <Input placeholder="Loading dock / Warehouse" value={form.origin} onChange={(e) => setForm({ ...form, origin: e.target.value })} required />
                  <Button type="button" size="sm" variant={mapMode === "origin" ? "default" : "outline"} className="w-full text-xs" onClick={() => setMapMode("origin")}>
                    {form.originLocation ? "✓ Origin Pinned" : "Pin Origin on Map"}
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Destination Address</Label>
                  <Input placeholder="Delivery point" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} required />
                  <Button type="button" size="sm" variant={mapMode === "destination" ? "default" : "outline"} className="w-full text-xs" onClick={() => setMapMode("destination")}>
                    {form.destinationLocation ? "✓ Destination Pinned" : "Pin Destination on Map"}
                  </Button>
                </div>
              </div>

              {mapMode && (
                <div className="border rounded-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                  <div className="bg-slate-900 text-white p-2 flex justify-between items-center px-4">
                    <span className="text-xs font-medium uppercase">Selecting {mapMode}...</span>
                    <Button type="button" variant="ghost" size="sm" className="h-7 text-white hover:bg-white/20" onClick={() => setMapMode(null)}>Close Map</Button>
                  </div>
                  <LargeMapPicker mode={mapMode} existingLocations={{ origin: form.originLocation, destination: form.destinationLocation }} 
                    onSelect={(loc) => setForm((prev: any) => ({ ...prev, [`${mapMode}Location`]: loc }))} />
                </div>
              )}
            </section>

            {/* 2. SCHEDULE & LOGISTICS */}
            <section className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
                  <Calendar className="h-4 w-4" /> Schedule
                </div>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Pickup Time</Label>
                    <Input type="datetime-local" value={form.originPickupTime} onChange={(e) => setForm({ ...form, originPickupTime: e.target.value })} required />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Estimated Delivery</Label>
                    <Input type="datetime-local" value={form.destinationDeliveryTime} onChange={(e) => setForm({ ...form, destinationDeliveryTime: e.target.value })} required />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
                  <Package className="h-4 w-4" /> Cargo Details
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Weight (kg)</Label>
                    <Input type="number" placeholder="0.00" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} required />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Est. Hours</Label>
                    <Input type="number" placeholder="Duration" value={form.estimatedHours} onChange={(e) => setForm({ ...form, estimatedHours: e.target.value })} required />
                  </div>
                </div>
                <div className="space-y-1.5">
                    <Label className="text-xs">Description</Label>
                    <textarea placeholder="Specify cargo type..." value={form.cargoDescription} onChange={(e) => setForm({ ...form, cargoDescription: e.target.value })} 
                      className="w-full text-sm rounded-md border border-input p-2 h-[82px] focus-visible:ring-1 focus-visible:ring-ring outline-none" required />
                </div>
              </div>
            </section>

            {/* 3. ASSET ASSIGNMENT */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
                <Truck className="h-4 w-4" /> Asset Assignment
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Assigned Truck</Label>
                  <Select onValueChange={(v) => setForm({ ...form, truckId: v })}>
                    <SelectTrigger className="bg-white"><SelectValue placeholder="Search available trucks..." /></SelectTrigger>
                    <SelectContent>
                      {availableTrucks.map((t: any) => (<SelectItem key={t._id} value={t._id}>{t.licensePlate} ({t.model})</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Assigned Driver</Label>
                  <Select onValueChange={(v) => { setForm({ ...form, driverId: v }); setDriverError(null); }}>
                    <SelectTrigger className="bg-white"><SelectValue placeholder="Search active drivers..." /></SelectTrigger>
                    <SelectContent>
                      {availableDrivers.map((d: any) => (<SelectItem key={d._id} value={d._id}>{d.firstName} {d.lastName}</SelectItem>))}
                    </SelectContent>
                  </Select>
                  {driverError && <p className="text-[10px] text-destructive font-medium">{driverError}</p>}
                </div>
              </div>
            </section>

            {/* 4. DOCUMENTATION */}
            <section className="space-y-4 pb-4">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
                <FileCheck className="h-4 w-4" /> Documentation
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <InvoiceUploadBox label="Primary Invoice" uploading={uploadingInvoice1} url={invoice1Url} onUpload={(f) => uploadInvoice(f, "invoice1")} />
                 <InvoiceUploadBox label="Secondary Invoice" uploading={uploadingInvoice2} url={invoice2Url} onUpload={(f) => uploadInvoice(f, "invoice2")} />
              </div>
            </section>
          </form>
        </ScrollArea>

        <Separator />

        <DialogFooter className="p-6 bg-slate-50/50 border-t">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isPending}>Cancel</Button>
          <Button form="trip-form" type="submit" className="min-w-[150px]" disabled={isPending}>
            {isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Schedule Trip
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function InvoiceUploadBox({ label, uploading, url, onUpload }: any) {
  return (
    <div className="relative border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-colors hover:border-primary/50 bg-white">
      <Input type="file" accept="application/pdf" className="absolute inset-0 opacity-0 cursor-pointer" disabled={uploading} onChange={(e) => e.target.files && onUpload(e.target.files[0])} />
      {uploading ? <Loader2 className="h-5 w-5 animate-spin text-primary" /> : <FileCheck className={`h-5 w-5 ${url ? 'text-emerald-500' : 'text-slate-400'}`} />}
      <div className="text-center">
        <p className="text-xs font-semibold">{label}</p>
        <p className="text-[10px] text-muted-foreground">{url ? "✓ Uploaded" : "Click to upload PDF"}</p>
      </div>
    </div>
  );
}