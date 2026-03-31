

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
  Loader2,
  Users,
  UploadCloud,
  CheckCircle2,
  FileText,
  Contact2,
  CreditCard,
  Building2,
} from "lucide-react";
import { useCustomers } from "@/hooks/useCustomer";

export function AddCustomerDialog({ open, onClose, initialData }: any) {
  const { createCustomer, updateCustomer, uploadCustomerDocuments } = useCustomers();

  const isEdit = !!initialData?._id;
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState<any>({
    legalName: "",
    businessName: "",
    rfc: "",
    contactPerson: "",
    contactNumber: "",
    email: "",
    paymentTerms: "30",
    currency: "MXN",
  });

  const [docs, setDocs] = useState<any>({
    rfcUrl: "",
    contractUrl: "",
    permitUrl: "",
  });

  const [uploading, setUploading] = useState({
    rfc: false,
    contract: false,
    permit: false,
  });

  /* ================= PREFILL ================= */
  useEffect(() => {
    if (!initialData) {
      // Reset form if closing/opening fresh
      setForm({
        legalName: "",
        businessName: "",
        rfc: "",
        contactPerson: "",
        contactNumber: "",
        email: "",
        paymentTerms: "30",
        currency: "MXN",
      });
      setDocs({ rfcUrl: "", contractUrl: "", permitUrl: "" });
      return;
    }

    setForm({
      legalName: initialData.legalName || "",
      businessName: initialData.businessName || "",
      rfc: initialData.rfc || "",
      contactPerson: initialData.contactPersonName || "",
      contactNumber: initialData.whatsappNumber || "",
      email: initialData.contactEmail || "",
      paymentTerms: initialData.paymentTermsDays?.toString() || "30",
      currency: initialData.currency || "MXN",
    });

    setDocs({
      rfcUrl: initialData?.documents?.rfcUrl || "",
      contractUrl: initialData?.documents?.serviceContractUrl || "",
      permitUrl: initialData?.documents?.specialPermitUrl || "",
    });
  }, [initialData, open]);

  const updateField = (key: string, value: string) => {
    setForm((f: any) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  /* ================= FILE UPLOAD ================= */
  const handleUpload = async (file: File, type: string) => {
    const key = type as keyof typeof uploading;
    setUploading((p) => ({ ...p, [key]: true }));

    try {
      const fd = new FormData();
      if (type === "rfc") fd.append("rfc", file);
      if (type === "contract") fd.append("serviceContract", file);
      if (type === "permit") fd.append("specialPermit", file);

      const res = await uploadCustomerDocuments(fd);

      setDocs((p: any) => ({
        ...p,
        rfcUrl: res.rfc?.url || p.rfcUrl,
        contractUrl: res.serviceContract?.url || p.contractUrl,
        permitUrl: res.specialPermit?.url || p.permitUrl,
      }));
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading((p) => ({ ...p, [key]: false }));
    }
  };

  /* ================= SUBMIT ================= */
  const submit = async () => {
    setLoading(true);
    try {
      const payload = { ...form, documents: docs };
      if (isEdit) {
        await updateCustomer({ id: initialData._id, data: payload });
      } else {
        await createCustomer(payload);
      }
      onClose();
    } catch (err: any) {
      setErrors({ general: err?.response?.data?.message || "Operation failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[90vh] p-0 flex flex-col overflow-hidden">
        {/* HEADER */}
        <DialogHeader className="p-6 pb-2">
          <div className="flex gap-3 items-center">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                {isEdit ? "Edit Customer" : "Register Customer"}
              </DialogTitle>
              <DialogDescription>
                {isEdit 
                  ? "Update the customer's legal information and documentation." 
                  : "Enter the official details and compliance documents for the new customer."}
              </DialogDescription>
            </div>
          </div>
          {errors.general && (
            <div className="mt-3 text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg">
              {errors.general}
            </div>
          )}
        </DialogHeader>

        <Separator />

        {/* BODY */}
        <ScrollArea className="flex-1 px-6">
          <div className="space-y-8 py-6">
            
            {/* LEGAL INFO */}
            <section className="space-y-4">
              <SectionTitle icon={<Building2 className="h-4 w-4" />}>
                Legal Information
              </SectionTitle>
              <div className="grid grid-cols-2 gap-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                <InputField
                  label="Legal Name"
                  placeholder="Company Legal Name SA de CV"
                  value={form.legalName}
                  onChange={(v: string) => updateField("legalName", v)}
                  span
                />
                <InputField
                  label="Business Name (Commercial)"
                  placeholder="Trading As..."
                  value={form.businessName}
                  onChange={(v: string) => updateField("businessName", v)}
                />
                <InputField
                  label="RFC Number"
                  placeholder="RFC123456789"
                  value={form.rfc}
                  onChange={(v: string) => updateField("rfc", v)}
                />
              </div>
            </section>

            {/* CONTACT INFO */}
            <section className="space-y-4">
              <SectionTitle icon={<Contact2 className="h-4 w-4" />}>
                Contact Details
              </SectionTitle>
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Contact Person"
                  placeholder="Full Name"
                  value={form.contactPerson}
                  onChange={(v: string) => updateField("contactPerson", v)}
                />
                <InputField
                  label="Whatsapp Number"
                  placeholder="+52..."
                  value={form.contactNumber}
                  onChange={(v: string) => updateField("contactNumber", v)}
                />
                <InputField
                  label="Email Address"
                  type="email"
                  placeholder="billing@customer.com"
                  value={form.email}
                  onChange={(v: string) => updateField("email", v)}
                  span
                />
              </div>
            </section>

            {/* BILLING INFO */}
            <section className="space-y-4">
              <SectionTitle icon={<CreditCard className="h-4 w-4" />}>
                Billing & Terms
              </SectionTitle>
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Payment Terms (Days)"
                  type="number"
                  value={form.paymentTerms}
                  onChange={(v: string) => updateField("paymentTerms", v)}
                />
                <InputField
                  label="Currency"
                  value={form.currency}
                  onChange={(v: string) => updateField("currency", v)}
                />
              </div>
            </section>

            {/* DOCUMENTS */}
            <section className="space-y-4">
              <SectionTitle icon={<FileText className="h-4 w-4" />}>
                Compliance Documents
              </SectionTitle>
              <div className="grid grid-cols-3 gap-4">
                <DocumentUploadBox
                  label="RFC Tax ID"
                  uploading={uploading.rfc}
                  url={docs.rfcUrl}
                  onUpload={(f: File) => handleUpload(f, "rfc")}
                />
                <DocumentUploadBox
                  label="Service Contract"
                  uploading={uploading.contract}
                  url={docs.contractUrl}
                  onUpload={(f: File) => handleUpload(f, "contract")}
                />
                <DocumentUploadBox
                  label="Special Permit"
                  uploading={uploading.permit}
                  url={docs.permitUrl}
                  onUpload={(f: File) => handleUpload(f, "permit")}
                />
              </div>
            </section>
          </div>
        </ScrollArea>

        <Separator />

        {/* FOOTER */}
        <DialogFooter className="p-6 bg-slate-50">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={submit} disabled={loading} className="min-w-[140px]">
            {loading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : isEdit ? (
              "Update Customer"
            ) : (
              "Create Customer"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ================= COMPONENT HELPERS ================= */

function SectionTitle({ icon, children }: any) {
  return (
    <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-widest">
      {icon} {children}
    </div>
  );
}

function InputField({ label, value, onChange, type = "text", span, error, placeholder }: any) {
  return (
    <div className={`space-y-1.5 ${span ? "col-span-2" : ""}`}>
      <Label className="text-xs font-bold text-slate-700">{label}</Label>
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`h-10 bg-white ${error ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-primary"}`}
      />
      {error && <p className="text-[10px] text-red-600 font-medium">{error}</p>}
    </div>
  );
}

function DocumentUploadBox({ label, uploading, url, onUpload }: any) {
  return (
    <label className="group relative border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:border-primary hover:bg-primary/5 bg-white">
      <input
        type="file"
        accept="application/pdf"
        className="hidden"
        disabled={uploading}
        onChange={(e) => e.target.files && onUpload(e.target.files[0])}
      />

      <div className="p-2 rounded-full bg-slate-50 group-hover:bg-primary/10 transition-colors">
        {uploading ? (
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        ) : url ? (
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
        ) : (
          <UploadCloud className="h-5 w-5 text-slate-400 group-hover:text-primary" />
        )}
      </div>

      <div className="text-center">
        <p className="text-[11px] font-bold text-slate-700 leading-tight">{label}</p>
        <p className="text-[9px] text-slate-500 mt-1">
          {url ? "PDF Uploaded" : "Tap to upload PDF"}
        </p>
      </div>
    </label>
  );
}