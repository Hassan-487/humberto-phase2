

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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  Building2,
  UploadCloud,
  CheckCircle2,
  FileText,
  Contact2,
  Truck,
} from "lucide-react";
import { useCompanies } from "@/hooks/useCompany";

/* ================= MAIN COMPONENT ================= */

export function AddCompanyDialog({ open, onClose, initialData }: any) {
  const { createCompany, updateCompany, uploadCompanyDocuments } =
    useCompanies();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [uploading, setUploading] = useState({
    rfc: false,
    permit: false,
    insurance: false,
  });

  const [form, setForm] = useState({
    legalName: "",
    contactPersonName: "",
    whatsappNumber: "",
    contactEmail: "",
    Address: "",
    totalTrucks: "",
    rfc: "",
    status: "active",
    totalPrice: "",
    notes: "",
  });

  const [docs, setDocs] = useState({
    rfcUrl: "",
    permitUrl: "",
    insuranceUrl: "",
  });

  /* ================= RESET ON CLOSE ================= */

  useEffect(() => {
    if (!open) {
      if (!initialData) {
        setForm({
          legalName: "",
          contactPersonName: "",
          whatsappNumber: "",
          contactEmail: "",
          Address: "",
          totalTrucks: "",
          rfc: "",
          status: "active",
          totalPrice: "",
          notes: "",
        });
        setDocs({ rfcUrl: "", permitUrl: "", insuranceUrl: "" });
        setErrors({});
      }
    }
  }, [open, initialData]);

  /* ================= PREFILL ================= */

  useEffect(() => {
    if (initialData) {
      setForm({
        legalName: initialData.legalName || "",
        contactPersonName: initialData.contactPersonName || "",
        whatsappNumber: initialData.whatsappNumber || "",
        contactEmail: initialData.contactEmail || "",
        Address: initialData.Address || "",
        totalTrucks: String(initialData.totalTrucks || ""),
        rfc: initialData.rfc || "",
        status: initialData.status || "active",
        totalPrice: String(initialData.totalPrice || ""),
        notes: initialData.notes || "",
      });

      const d = initialData?.documents || initialData?.CompanyDocuments || {};
      setDocs({
        rfcUrl: d.rfcUrl || "",
        permitUrl: d.specialPermitUrl || "",
        insuranceUrl: d.insurancePolicyUrl || "",
      });
    }
  }, [initialData]);

  /* ================= VALIDATION ================= */

  const validate = () => {
    const e: Record<string, string> = {};

    if (!form.legalName.trim()) e.legalName = "Legal name is required";
    if (!form.contactEmail.trim()) e.contactEmail = "Email is required";
    else if (!form.contactEmail.includes("@")) e.contactEmail = "Invalid email";
    if (!form.rfc.trim()) e.rfc = "RFC is required";
    if (!docs.rfcUrl) e.rfcUrl = "RFC document upload is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ================= UPLOAD ================= */

  const upload = async (file: File, type: "rfc" | "permit" | "insurance") => {
    setUploading((p) => ({ ...p, [type]: true }));

    try {
      const fd = new FormData();

      if (type === "rfc") fd.append("rfc", file);
      if (type === "permit") fd.append("specialPermit", file);
      if (type === "insurance") fd.append("insurancePolicy", file);

      const res = await uploadCompanyDocuments(fd);

      setDocs((prev) => ({
        rfcUrl: res?.rfcUrl ?? prev.rfcUrl,
        permitUrl: res?.specialPermitUrl ?? prev.permitUrl,
        insuranceUrl: res?.insurancePolicyUrl ?? prev.insuranceUrl,
      }));

      // Clear doc error if RFC was just uploaded
      if (type === "rfc") setErrors((e) => ({ ...e, rfcUrl: "" }));
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading((p) => ({ ...p, [type]: false }));
    }
  };

  /* ================= SUBMIT ================= */

  const submit = async () => {
    if (!validate()) return;
    setLoading(true);

    try {
      const payload = {
        ...form,
        totalTrucks: Number(form.totalTrucks || 0),
        totalPrice: Number(form.totalPrice || 0),
        documents: docs,
      };

      if (initialData?._id) {
        await updateCompany({ id: initialData._id, payload });
      } else {
        await createCompany(payload);
      }

      onClose();
    } catch (err: any) {
      setErrors({
        general:
          err?.response?.data?.message || "Failed to save company",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateField = (key: string, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  /* ================= UI ================= */

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[90vh] p-0 flex flex-col overflow-hidden">

        {/* HEADER */}
        <DialogHeader className="p-6 pb-4">
          <div className="flex gap-3 items-center">
            <div className="bg-primary/10 p-2.5 rounded-xl">
              <Building2 className="h-5 w-5 text-primary" />
            </div>

            <div>
              <DialogTitle className="text-xl font-bold">
                {initialData ? "Edit Company" : "Register Company"}
              </DialogTitle>
              <DialogDescription className="text-sm">
                Enter company details and upload compliance documents.
              </DialogDescription>
            </div>
          </div>

          {errors.general && (
            <div className="mt-3 text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-xl">
              {errors.general}
            </div>
          )}
        </DialogHeader>

        <Separator />

        {/* BODY */}
        <ScrollArea className="flex-1 px-6">
          <div className="space-y-8 py-6">

            {/* ── BASIC INFO ── */}
            <section className="space-y-4">
              <SectionTitle icon={<Contact2 className="h-4 w-4" />}>
                Basic Information
              </SectionTitle>

              <div className="grid grid-cols-2 gap-4 bg-slate-50/50 dark:bg-muted/20 p-4 rounded-xl border">
                <InputField
                  label="Legal Name *"
                  value={form.legalName}
                  error={errors.legalName}
                  onChange={(v) => updateField("legalName", v)}
                  span
                />
                <InputField
                  label="RFC *"
                  value={form.rfc}
                  error={errors.rfc}
                  onChange={(v) => updateField("rfc", v)}
                />
                <InputField
                  label="Contact Person"
                  value={form.contactPersonName}
                  onChange={(v) => updateField("contactPersonName", v)}
                />
                <InputField
                  label="WhatsApp Number"
                  value={form.whatsappNumber}
                  onChange={(v) => updateField("whatsappNumber", v)}
                />
                <InputField
                  label="Email *"
                  value={form.contactEmail}
                  error={errors.contactEmail}
                  onChange={(v) => updateField("contactEmail", v)}
                />

                {/* STATUS SELECT */}
                <div>
                  <Label className="text-xs font-semibold mb-1.5 block">Status</Label>
                  <Select value={form.status} onValueChange={(v) => updateField("status", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            {/* ── OPERATIONS ── */}
            <section className="space-y-4">
              <SectionTitle icon={<Truck className="h-4 w-4" />}>
                Operations
              </SectionTitle>

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Total Trucks"
                  value={form.totalTrucks}
                  onChange={(v) => updateField("totalTrucks", v)}
                  type="number"
                />
                <InputField
                  label="Total Price (MXN)"
                  value={form.totalPrice}
                  onChange={(v) => updateField("totalPrice", v)}
                  type="number"
                />
                <InputField
                  label="Address"
                  value={form.Address}
                  onChange={(v) => updateField("Address", v)}
                  span
                />
                <div className="col-span-2">
                  <Label className="text-xs font-semibold mb-1.5 block">Notes</Label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => updateField("notes", e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                    placeholder="Additional notes..."
                  />
                </div>
              </div>
            </section>

            {/* ── DOCUMENTS ── */}
            <section className="space-y-4">
              <SectionTitle icon={<FileText className="h-4 w-4" />}>
                Documents
              </SectionTitle>

              {errors.rfcUrl && (
                <p className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                  ⚠️ {errors.rfcUrl}
                </p>
              )}

              <div className="grid grid-cols-3 gap-4">
                <DocumentUploadBox
                  label="RFC *"
                  uploading={uploading.rfc}
                  url={docs.rfcUrl}
                  onUpload={(f) => upload(f, "rfc")}
                  required
                />
                <DocumentUploadBox
                  label="Special Permit"
                  uploading={uploading.permit}
                  url={docs.permitUrl}
                  onUpload={(f) => upload(f, "permit")}
                />
                <DocumentUploadBox
                  label="Insurance Policy"
                  uploading={uploading.insurance}
                  url={docs.insuranceUrl}
                  onUpload={(f) => upload(f, "insurance")}
                />
              </div>
            </section>

          </div>
        </ScrollArea>

        <Separator />

        {/* FOOTER */}
        <DialogFooter className="p-6 bg-slate-50 dark:bg-muted/10">
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>

          <Button onClick={submit} disabled={loading} className="min-w-[130px]">
            {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
            {initialData ? "Update Company" : "Create Company"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ================= HELPERS ================= */

function SectionTitle({ icon, children }: any) {
  return (
    <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wide">
      {icon} {children}
    </div>
  );
}

function InputField({ label, value, onChange, error, span, type }: any) {
  return (
    <div className={span ? "col-span-2" : ""}>
      <Label className="text-xs font-semibold mb-1.5 block">{label}</Label>
      <Input
        type={type || "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={error ? "border-red-400 focus-visible:ring-red-400" : ""}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function DocumentUploadBox({
  label,
  uploading,
  url,
  onUpload,
  required,
}: {
  label: string;
  uploading: boolean;
  url: string;
  onUpload: (f: File) => void;
  required?: boolean;
}) {
  return (
    <label
      className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer transition-all hover:bg-muted/30 ${
        url
          ? "border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20"
          : "border-muted-foreground/20 hover:border-primary/40"
      }`}
    >
      <input
        type="file"
        className="hidden"
        onChange={(e) => e.target.files && onUpload(e.target.files[0])}
      />

      {uploading ? (
        <Loader2 className="animate-spin h-6 w-6 text-primary" />
      ) : url ? (
        <CheckCircle2 className="h-6 w-6 text-emerald-600" />
      ) : (
        <UploadCloud className="h-6 w-6 text-muted-foreground" />
      )}

      <p className="text-xs font-semibold text-center">
        {url ? "Uploaded ✓" : uploading ? "Uploading..." : `Upload ${label}`}
      </p>

      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-[10px] text-primary hover:underline"
        >
          View file
        </a>
      )}
    </label>
  );
}