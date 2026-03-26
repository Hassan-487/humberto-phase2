// import { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Loader2, Building2, UploadCloud, CheckCircle2 } from "lucide-react";
// import { useCompanies } from "@/hooks/useCompany";

// export function AddCompanyDialog({ open, onClose }: any) {
//   const { createCompany, uploadCompanyDocuments } = useCompanies();

//   const [loading, setLoading] = useState(false);

//   const [uploading, setUploading] = useState({
//     rfc: false,
//     permit: false,
//     insurance: false,
//   });

//   const [form, setForm] = useState({
//     legalName: "",
//     contactPersonName: "",
//     whatsappNumber: "",
//     contactEmail: "",
//     Address: "",
//     totalTrucks: "",
//     rfc: "",
//     status: "active",
//     totalPrice: "",
//     notes: "",
//   });

//   const [docs, setDocs] = useState<any>({
//     rfcUrl: "",
//     permitUrl: "",
//     insuranceUrl: "",
//   });

//   /* ✅ UPLOAD FUNCTION (IMPORTANT) */
//   const upload = async (file: File, type: string) => {
//     setUploading((p) => ({ ...p, [type]: true }));

//     try {
//       const fd = new FormData();
//       fd.append(type, file);

//       const res = await uploadCompanyDocuments(fd);

//       setDocs((p: any) => ({
//         ...p,
//         [`${type}Url`]: res[type].url, // ✅ store URL not file
//       }));
//     } finally {
//       setUploading((p) => ({ ...p, [type]: false }));
//     }
//   };

//   const submit = async () => {
//     setLoading(true);
//     try {
//       console.log("FINAL PAYLOAD:", { ...form, documents: docs }); // 🔍 debug

//       await createCompany({
//         ...form,
//         documents: docs,
//       });

//       onClose();
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="max-w-2xl">
//         <DialogHeader>
//           <DialogTitle className="flex gap-2 items-center">
//             <Building2 className="h-5 w-5 text-primary" />
//             Register Company
//           </DialogTitle>
//         </DialogHeader>

//         {/* FORM */}
//         <div className="grid grid-cols-2 gap-4 py-4">
//           <Field label="Legal Name" onChange={(v) => setForm({ ...form, legalName: v })} />
//           <Field label="Contact Person" onChange={(v) => setForm({ ...form, contactPersonName: v })} />
//           <Field label="Whatsapp Number" onChange={(v) => setForm({ ...form, whatsappNumber: v })} />
//           <Field label="Contact Email" onChange={(v) => setForm({ ...form, contactEmail: v })} />
//           <Field label="Total Trucks" onChange={(v) => setForm({ ...form, totalTrucks: v })} />
//           <Field label="RFC" onChange={(v) => setForm({ ...form, rfc: v })} />
//           <Field label="Total Price" onChange={(v) => setForm({ ...form, totalPrice: v })} />
//           <Field label="Address" span onChange={(v) => setForm({ ...form, Address: v })} />
//         </div>

//         {/* DOCUMENT UPLOAD */}
//         <div className="grid grid-cols-3 gap-4">
//           <UploadBox
//             label="RFC Certificate"
//             uploading={uploading.rfc}
//             uploaded={docs.rfcUrl}
//             onUpload={(f: File) => upload(f, "rfc")}
//           />

//           <UploadBox
//             label="SCT Permit"
//             uploading={uploading.permit}
//             uploaded={docs.permitUrl}
//             onUpload={(f: File) => upload(f, "permit")}
//           />

//           <UploadBox
//             label="Insurance Policy"
//             uploading={uploading.insurance}
//             uploaded={docs.insuranceUrl}
//             onUpload={(f: File) => upload(f, "insurance")}
//           />
//         </div>

//         {/* FOOTER */}
//         <DialogFooter className="mt-4">
//           <Button variant="ghost" onClick={onClose}>
//             Cancel
//           </Button>

//           <Button onClick={submit} disabled={loading}>
//             {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
//             Create Company
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

// /* ================= COMPONENTS ================= */

// function Field({ label, onChange, span }: any) {
//   return (
//     <div className={`space-y-1 ${span ? "col-span-2" : ""}`}>
//       <Label className="text-xs font-semibold">{label}</Label>
//       <Input onChange={(e) => onChange(e.target.value)} />
//     </div>
//   );
// }

// function UploadBox({ label, uploading, uploaded, onUpload }: any) {
//   return (
//     <label className="border-2 border-dashed rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer">
//       <input
//         type="file"
//         accept="application/pdf"
//         className="hidden"
//         onChange={(e) => e.target.files && onUpload(e.target.files[0])}
//       />

//       {uploading ? (
//         <Loader2 className="h-5 w-5 animate-spin text-primary" />
//       ) : uploaded ? (
//         <CheckCircle2 className="h-5 w-5 text-emerald-600" />
//       ) : (
//         <UploadCloud className="h-5 w-5 text-muted-foreground" />
//       )}

//       <p className="text-xs font-semibold text-center">{label}</p>
//     </label>
//   );
// }





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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Loader2, 
  Building2, 
  UploadCloud, 
  CheckCircle2, 
  MapPin, 
  FileText, 
  Contact2, 
  Truck 
} from "lucide-react";
import { useCompanies } from "@/hooks/useCompany";

export function AddCompanyDialog({ open, onClose }: any) {
  const { createCompany, uploadCompanyDocuments } = useCompanies();

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

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.legalName.trim()) e.legalName = "Legal name is required";
    if (!form.contactEmail.includes("@")) e.contactEmail = "Invalid email";
    if (!form.rfc.trim()) e.rfc = "RFC is required";
    if (!docs.rfcUrl) e.rfcUrl = "RFC document is required";
    
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const upload = async (file: File, type: string) => {
    const key = type as keyof typeof uploading;
    setUploading((p) => ({ ...p, [key]: true }));

    try {
      const fd = new FormData();
      fd.append(type, file);
      const res = await uploadCompanyDocuments(fd);

      const urlKey = `${type}Url` as keyof typeof docs;
      setDocs((p) => ({ ...p, [urlKey]: res[type].url }));
      setErrors((e) => ({ ...e, [urlKey]: "" }));
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading((p) => ({ ...p, [key]: false }));
    }
  };

  const submit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await createCompany({
        ...form,
        documents: docs,
      });
      onClose();
    } catch (err: any) {
      setErrors({ general: err?.response?.data?.message || "Failed to create company" });
    } finally {
      setLoading(false);
    }
  };

  const updateField = (key: string, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[90vh] p-0 flex flex-col overflow-hidden">
        {/* HEADER */}
        <DialogHeader className="p-6 pb-2">
          <div className="flex gap-3 items-center">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">Register Company</DialogTitle>
              <DialogDescription>
                Enter the official details and compliance documents for the new company.
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
            
            {/* BASIC INFO */}
            <section className="space-y-4">
              <SectionTitle icon={<Contact2 className="h-4 w-4" />}>
                Basic Information
              </SectionTitle>
              <div className="grid grid-cols-2 gap-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                <InputField
                  label="Legal Name"
                  placeholder="Company LLC"
                  value={form.legalName}
                  error={errors.legalName}
                  onChange={(v) => updateField("legalName", v)}
                  span
                />
                <InputField
                  label="Contact Person"
                  placeholder="Full Name"
                  value={form.contactPersonName}
                  onChange={(v) => updateField("contactPersonName", v)}
                />
                <InputField
                  label="Whatsapp Number"
                  placeholder="+52..."
                  value={form.whatsappNumber}
                  onChange={(v) => updateField("whatsappNumber", v)}
                />
                <InputField
                  label="Contact Email"
                  type="email"
                  placeholder="admin@company.com"
                  value={form.contactEmail}
                  error={errors.contactEmail}
                  onChange={(v) => updateField("contactEmail", v)}
                />
                <InputField
                  label="RFC Number"
                  placeholder="RFC123456789"
                  value={form.rfc}
                  error={errors.rfc}
                  onChange={(v) => updateField("rfc", v)}
                />
              </div>
            </section>

            {/* LOGISTICS & PRICING */}
            <section className="space-y-4">
              <SectionTitle icon={<Truck className="h-4 w-4" />}>
                Operations & Logistics
              </SectionTitle>
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Total Trucks"
                  type="number"
                  placeholder="0"
                  value={form.totalTrucks}
                  onChange={(v) => updateField("totalTrucks", v)}
                />
                <InputField
                  label="Agreed Total Price"
                  type="number"
                  placeholder="$ 0.00"
                  value={form.totalPrice}
                  onChange={(v) => updateField("totalPrice", v)}
                />
                <InputField
                  label="Full Address"
                  placeholder="Street, City, Zip Code"
                  value={form.Address}
                  onChange={(v) => updateField("Address", v)}
                  span
                />
              </div>
            </section>

            {/* DOCUMENTS */}
            <section className="space-y-4">
              <SectionTitle icon={<FileText className="h-4 w-4" />}>
                Compliance Documents
              </SectionTitle>
              {errors.rfcUrl && (
                <p className="text-xs text-red-600 bg-red-50 p-2 rounded">{errors.rfcUrl}</p>
              )}
              <div className="grid grid-cols-3 gap-4">
                <DocumentUploadBox
                  label="RFC Certificate"
                  uploading={uploading.rfc}
                  url={docs.rfcUrl}
                  onUpload={(f) => upload(f, "rfc")}
                />
                <DocumentUploadBox
                  label="SCT Permit"
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
        <DialogFooter className="p-6 bg-slate-50">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={submit} disabled={loading} className="min-w-[140px]">
            {loading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              "Create Company"
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