
import { useState, useEffect } from "react";
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
import { Label } from "@/components/ui/label";
import { 
  Loader2, 
  Truck, 
  FileText, 
  CheckCircle2, 
  UploadCloud, 
  Cpu, 
  Weight 
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { useCreateTruck } from "@/hooks/useTrucks";
import { truckService } from "@/services/truck.service";

interface Props {
  open: boolean;
  onClose: () => void;
}

const EMPTY_FORM = {
  licensePlate: "",
  model: "",
  year: "",
  samsaraDeviceId: "",
  weight_capacity: "",
};

export function AddTruckDialog({ open, onClose }: Props) {
  const { mutateAsync, isPending } = useCreateTruck();

  const [form, setForm] = useState<any>(EMPTY_FORM);
  const [registrationUrl, setRegistrationUrl] = useState("");
  const [insuranceUrl, setInsuranceUrl] = useState("");
  const [uploadingRegistration, setUploadingRegistration] = useState(false);
  const [uploadingInsurance, setUploadingInsurance] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(EMPTY_FORM);
      setRegistrationUrl("");
      setInsuranceUrl("");
      setUploadingRegistration(false);
      setUploadingInsurance(false);
    }
  }, [open]);

  const uploadDocument = async (file: File, type: "registration" | "insurance") => {
    const fd = new FormData();
    fd.append(type, file);

    try {
      type === "registration" ? setUploadingRegistration(true) : setUploadingInsurance(true);
      const res = await truckService.uploadTruckDocuments(fd);
      if (type === "registration") setRegistrationUrl(res.registration?.url || "");
      else setInsuranceUrl(res.insurance?.url || "");
    } catch (err) {
      console.error("Upload failed", err);
      alert("Document upload failed");
    } finally {
      setUploadingRegistration(false);
      setUploadingInsurance(false);
    }
  };

  const handleSubmit = async () => {
    if (!registrationUrl || !insuranceUrl) {
      alert("Registration and Insurance documents are required");
      return;
    }

    await mutateAsync({
      licensePlate: form.licensePlate,
      model: form.model,
      year: Number(form.year),
      samsaraDeviceId: form.samsaraDeviceId,
      weight_capacity: Number(form.weight_capacity),
      registrationUrl,
      insuranceUrl,
    });

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[90vh] p-0 overflow-hidden flex flex-col">

        
        {/* ================= HEADER ================= */}
        <DialogHeader className="p-6 pb-2 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">Add New Fleet Truck</DialogTitle>
              <DialogDescription>
                Register a new vehicle to the fleet and upload compliance documents.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Separator />

        {/* ================= SCROLLABLE BODY ================= */}
        <ScrollArea className="flex-1 overflow-y-auto px-6">

          <div className="space-y-8 py-6">
            
            {/* 1. Vehicle Specifications */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
                <FileText className="h-4 w-4" /> Vehicle Specifications
              </div>
              <div className="grid grid-cols-2 gap-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100 shadow-sm">
                <InputField label="License Plate" placeholder="ABC-1234" value={form.licensePlate} 
                  onChange={(v) => setForm({ ...form, licensePlate: v })} />
                
                <InputField label="Model Name" placeholder="e.g. Freightliner Cascadia" value={form.model} 
                  onChange={(v) => setForm({ ...form, model: v })} />
                
                <InputField label="Model Year" type="number" placeholder="2024" value={form.year} 
                  onChange={(v) => setForm({ ...form, year: v })} />
                
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold flex items-center gap-1.5 text-slate-700">
                    <Weight className="h-3 w-3" /> Weight Capacity (kg)
                  </Label>
                  <Input type="number" placeholder="45000" className="bg-white" value={form.weight_capacity} 
                    onChange={(e) => setForm({ ...form, weight_capacity: e.target.value })} />
                </div>
              </div>
            </section>

            {/* 2. Telematics Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
                <Cpu className="h-4 w-4" /> Hardware & Telematics
              </div>
              <InputField label="Samsara Device ID" placeholder="Enter Serial Number" span value={form.samsaraDeviceId} 
                onChange={(v) => setForm({ ...form, samsaraDeviceId: v })} />
            </section>

            {/* 3. Documentation Section (Grid Boxes) */}
            <section className="space-y-4 pb-4">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
                <CheckCircle2 className="h-4 w-4" /> Compliance Documents
              </div>
              <div className="grid grid-cols-2 gap-4">
                <DocumentUploadBox 
                  label="Vehicle Registration" 
                  uploading={uploadingRegistration} 
                  url={registrationUrl} 
                  onUpload={(f) => uploadDocument(f, "registration")} 
                />
                <DocumentUploadBox 
                  label="Insurance Policy" 
                  uploading={uploadingInsurance} 
                  url={insuranceUrl} 
                  onUpload={(f) => uploadDocument(f, "insurance")} 
                />
              </div>
            </section>
          </div>
        </ScrollArea>

        <Separator />

        {/* ================= FOOTER ================= */}
        <DialogFooter className="p-6 bg-slate-50/50 shrink-0 border-t">
          <Button variant="ghost" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="min-w-[180px] shadow-sm"
            disabled={isPending || uploadingRegistration || uploadingInsurance}
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Creating Truck...
              </>
            ) : (
              "Create Truck"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ================= ENHANCED HELPERS ================= */

function InputField({ label, value, onChange, type = "text", span, placeholder }: any) {
  return (
    <div className={`space-y-1.5 ${span ? "col-span-2" : ""}`}>
      <Label className="text-xs font-semibold text-slate-700">{label}</Label>
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="focus-visible:ring-primary bg-white shadow-sm h-9"
      />
    </div>
  );
}

function DocumentUploadBox({ label, uploading, url, onUpload }: any) {
  return (
    <div className="relative border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center gap-2 transition-all hover:border-primary/50 hover:bg-primary/5 bg-white group">
      <Input 
        type="file" 
        accept="application/pdf" 
        className="absolute inset-0 opacity-0 cursor-pointer z-10" 
        disabled={uploading} 
        onChange={(e) => e.target.files && onUpload(e.target.files[0])} 
      />
      
      <div className={`p-3 rounded-full transition-colors ${url ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400 group-hover:text-primary'}`}>
        {uploading ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : url ? (
          <CheckCircle2 className="h-6 w-6" />
        ) : (
          <UploadCloud className="h-6 w-6" />
        )}
      </div>

      <div className="text-center">
        <p className="text-sm font-bold text-slate-700">{label}</p>
        {url ? (
          <p className="text-[11px] font-medium text-emerald-600 mt-0.5">✓ PDF Ready</p>
        ) : (
          <p className="text-[11px] font-medium text-slate-500 mt-0.5 group-hover:text-primary/80">
            Click to upload PDF
          </p>
        )}
      </div>

      {url && (
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="absolute top-2 right-2 z-20 bg-white/80 p-1 rounded hover:text-primary text-[10px] font-semibold underline"
        >
          View
        </a>
      )}
    </div>
  );
}