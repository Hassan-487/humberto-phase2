import { useState } from "react";
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
  Users, 
  UploadCloud, 
  CheckCircle2, 
  Building2, 
  Contact2, 
  WalletCards, 
  FileCheck 
} from "lucide-react";
import { useCustomers } from "@/hooks/useCustomer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

/* ================= MEXICAN SAT CATALOGS ================= */

// const TAX_REGIMES = [
//   { code: "601", label: "601 - General de Ley Personas Morales" },
//   { code: "626", label: "626 - Régimen Simplificado de Confianza (RESICO)" },
//   { code: "603", label: "603 - Personas Morales con Fines no Lucrativos" },
//   { code: "605", label: "605 - Sueldos y Salarios" },
//   { code: "606", label: "606 - Arrendamiento" },
// ];

// const PAYMENT_METHODS = [
//   { code: "PPD", label: "PPD - Pago en parcialidades o diferido (Credit)" },
//   { code: "PUE", label: "PUE - Pago en una sola exhibición (Immediate)" },
// ];

// const PAYMENT_FORMS = [
//   { code: "03", label: "03 - Transferencia Electrónica" },
//   { code: "01", label: "01 - Efectivo" },
//   { code: "02", label: "02 - Cheque nominativo" },
//   { code: "99", label: "99 - Por definir" },
// ];

export function AddCustomerDialog({ open, onClose }: any) {
  const { createCustomer, uploadCustomerDocuments } = useCustomers();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [uploading, setUploading] = useState({
    rfc: false,
    contract: false,
    permit: false,
  });

  const [form, setForm] = useState<any>({
    customerType: "business",
    legalName: "",
    businessName: "",
    rfc: "",
    contactPerson: "",
    contactNumber: "",
    email: "",
    billingEmail: "",
    paymentMethod: "PPD",
    paymentForm: "99",
    paymentTerms: "30 Days",
    currency: "MXN",
    taxRegime: "601",
    creditLimit: "",
    status: "active",
  });

  const [docs, setDocs] = useState<any>({
    rfcUrl: "",
    contractUrl: "",
    permitUrl: "",
  });

  /* ================= VALIDATION ================= */

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.legalName.trim()) e.legalName = "Legal name is required";
    if (!form.rfc.trim()) e.rfc = "RFC is required";
    if (form.rfc && (form.rfc.length < 12 || form.rfc.length > 13)) {
        e.rfc = "RFC must be 12 (Company) or 13 (Individual) characters";
    }
    if (!form.email.trim()) e.email = "Email is required";
    if (!docs.rfcUrl) e.rfcUrl = "RFC Tax Certificate (Constancia) is mandatory";
    if (!docs.contractUrl)
  e.contractUrl = "Service Contract is required";

if (!docs.permitUrl)
  e.permitUrl = "Special Permit is required";
    
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ================= HANDLERS ================= */

const handleFileUpload = async (file: File, type: string) => {
  setUploading((p) => ({ ...p, [type]: true }));

  try {
    const fd = new FormData();

    // ✅ MATCH BACKEND KEYS
    if (type === "rfc") {
      fd.append("rfc", file);
    } else if (type === "contract") {
      fd.append("serviceContract", file);
    } else if (type === "permit") {
      fd.append("specialPermit", file);
    }

    const res = await uploadCustomerDocuments(fd);

    // ✅ SAFE RESPONSE HANDLING
    setDocs((p: any) => ({
      ...p,
      rfcUrl: res.rfc?.url || p.rfcUrl,
      contractUrl: res.serviceContract?.url || p.contractUrl,
      permitUrl: res.specialPermit?.url || p.permitUrl,
    }));
  } finally {
    setUploading((p) => ({ ...p, [type]: false }));
  }
};
  const update = (key: string, value: string) => {
    setForm((f: any) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const submit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await createCustomer({ ...form, documents: docs });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[95vh] p-0 flex flex-col overflow-hidden">
        {/* HEADER */}
        <DialogHeader className="p-6 pb-2">
          <div className="flex gap-3 items-center">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">Register New Customer</DialogTitle>
              <DialogDescription>Add a load owner and configure Mexican tax compliance.</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Separator />

        {/* BODY */}
        <ScrollArea className="flex-1 px-6">
          <div className="space-y-8 py-6">
            
            {/* LEGAL & TAX */}
            <section className="space-y-4">
              <SectionTitle icon={<Building2 className="h-4 w-4" />}>Legal & Tax Information</SectionTitle>
              <div className="grid grid-cols-2 gap-4 bg-slate-50/50 p-4 rounded-xl border">
                <InputField 
                  label="Legal Name (Razón Social)" 
                  value={form.legalName} 
                  error={errors.legalName}
                  onChange={(v: string) => update("legalName", v)} 
                />
                <InputField 
                  label="RFC" 
                  placeholder="12 or 13 characters"
                  value={form.rfc} 
                  error={errors.rfc}
                  onChange={(v: string) => update("rfc", v)} 
                />
                <div className="col-span-2 space-y-1.5">
                 
                </div>
                <InputField 
                  label="Business Name (DBA)" 
                  span
                  value={form.businessName} 
                  onChange={(v: string) => update("businessName", v)} 
                />
              </div>
            </section>

            {/* CONTACT INFO */}
            <section className="space-y-4">
              <SectionTitle icon={<Contact2 className="h-4 w-4" />}>Contact Details</SectionTitle>
              <div className="grid grid-cols-2 gap-4">
                <InputField 
                  label="Contact Person" 
                  value={form.contactPerson} 
                  onChange={(v: string) => update("contactPerson", v)} 
                />
                <InputField 
                  label="Watsapp Phone Number" 
                  value={form.contactNumber} 
                  onChange={(v: string) => update("contactNumber", v)} 
                />
                <InputField 
                  label=" Email" 
                  span
                  value={form.email} 
                  error={errors.email}
                  onChange={(v: string) => update("email", v)} 
                />
               
              </div>
            </section>

            {/* FINANCIAL TERMS */}
            <section className="space-y-4">
              <SectionTitle icon={<WalletCards className="h-4 w-4" />}>Financial Terms</SectionTitle>
              <div className="grid grid-cols-2 gap-4 bg-slate-50/50 p-4 rounded-xl border">
               

                <InputField 
                  label="Payment Terms" 
                  placeholder="e.g., 30 Days"
                  value={form.paymentTerms} 
                  onChange={(v: string) => update("paymentTerms", v)} 
                />
                <InputField 
                  label="Credit Limit (MXN)" 
                  type="number"
                  placeholder="0.00"
                  value={form.creditLimit} 
                  onChange={(v: string) => update("creditLimit", v)} 
                />
              </div>
            </section>

            {/* COMPLIANCE DOCUMENTS */}
            <section className="space-y-4">
              <SectionTitle icon={<FileCheck className="h-4 w-4" />}>Compliance Documents</SectionTitle>
              <div className="grid grid-cols-3 gap-4">
                <DocumentUploadBox
                  label="RFC Certificate"
                  uploading={uploading.rfc}
                  url={docs.rfcUrl}
                  onUpload={(f: File) => handleFileUpload(f, "rfc")}
                />
                <DocumentUploadBox
                  label="Service Contract"
                  uploading={uploading.contract}
                  url={docs.contractUrl}
                  onUpload={(f: File) => handleFileUpload(f, "contract")}
                />
                <DocumentUploadBox
                  label="Special Permit"
                  uploading={uploading.permit}
                  url={docs.permitUrl}
                  onUpload={(f: File) => handleFileUpload(f, "permit")}
                />
              </div>
              {errors.rfcUrl && <p className="text-[11px] text-red-500 font-medium text-center">{errors.rfcUrl}</p>}
            </section>
          </div>
        </ScrollArea>

        <Separator />

        {/* FOOTER */}
        <DialogFooter className="p-6 bg-slate-50">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={submit} disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Create Customer Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ================= REUSABLE HELPERS ================= */

function SectionTitle({ icon, children }: any) {
  return (
    <div className="flex items-center gap-2 text-primary font-semibold text-[11px] uppercase tracking-wider">
      {icon} {children}
    </div>
  );
}

function InputField({ label, value, onChange, type = "text", span, error, placeholder }: any) {
  return (
    <div className={`space-y-1.5 ${span ? "col-span-2" : ""}`}>
      <Label className="text-xs font-semibold">{label}</Label>
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`h-9 shadow-sm ${error ? "border-red-500 focus-visible:ring-red-500" : ""}`}
      />
      {error && <p className="text-[10px] text-red-600 font-medium">{error}</p>}
    </div>
  );
}

function DocumentUploadBox({ label, uploading, url, onUpload }: any) {
  return (
    <label className="relative border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center gap-2 bg-white hover:border-primary hover:bg-primary/5 transition-all cursor-pointer min-h-[110px] shadow-sm">
      <input
        type="file"
        accept="application/pdf"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={uploading}
        onChange={(e) => e.target.files && onUpload(e.target.files[0])}
      />
      {uploading ? (
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      ) : url ? (
        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
      ) : (
        <UploadCloud className="h-5 w-5 text-slate-400" />
      )}
      <p className="text-[11px] font-bold text-center leading-tight">{label}</p>
      <p className="text-[10px] text-slate-400 uppercase tracking-tighter">
        {url ? "PDF Uploaded" : "Upload PDF"}
      </p>
    </label>
  );
}