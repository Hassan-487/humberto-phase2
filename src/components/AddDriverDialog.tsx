
// import { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useDrivers } from "@/hooks/useDrivers";
// import {
//   Loader2,
//   User,
//   FileText,
//   CheckCircle2,
//   UploadCloud,
// } from "lucide-react";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";

// export function AddDriverDialog({ open, onClose }: any) {
//   const { createDriver, uploadDriverDocuments } = useDrivers();

//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState({
//     license: false,
//     tax: false,
//     identity: false,
//   });

//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     phoneNumber: "",
//     licenseNumber: "",
//     licenseExpiry: "",
//   });

//   const [urls, setUrls] = useState({
//     licenseUrl: "",
//     taxStatusCertificateUrl: "",
//     identityCardUrl: "",
//   });

//   const handleFileUpload = async (
//     file: File,
//     type: "license" | "taxStatusCertificate" | "identityCard"
//   ) => {
//     const loadingKey =
//       type === "taxStatusCertificate"
//         ? "tax"
//         : type === "identityCard"
//         ? "identity"
//         : "license";

//     setUploading((prev) => ({ ...prev, [loadingKey]: true }));

//     try {
//       const fd = new FormData();
//       fd.append(type, file);

//       const res = await uploadDriverDocuments(fd);

//       const urlKey = `${type}Url` as keyof typeof urls;
//       setUrls((prev) => ({ ...prev, [urlKey]: res[type].url }));
//     } finally {
//       setUploading((prev) => ({ ...prev, [loadingKey]: false }));
//     }
//   };

//   const submit = async () => {
//     setLoading(true);
//     try {
//       await createDriver({ ...form, ...urls });
//       onClose();
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="max-w-2xl h-[90vh] p-0 overflow-hidden flex flex-col">
//         {/* ================= HEADER ================= */}
//         <DialogHeader className="p-6 pb-2 shrink-0">
//           <DialogTitle className="text-2xl font-bold flex items-center gap-2">
//             <User className="h-6 w-6 text-primary" />
//             Register New Driver
//           </DialogTitle>
//           <DialogDescription>
//             Fill in the driver's professional details and upload required
//             documents.
//           </DialogDescription>
//         </DialogHeader>

//         <Separator />

//         {/* ================= SCROLLABLE BODY ================= */}
//         <ScrollArea className="flex-1 overflow-y-auto px-6">
//           <div className="space-y-8 py-6">
//             {/* Personal Info */}
//             <section className="space-y-4">
//               <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
//                 Personal Information
//               </h3>

//               <div className="grid grid-cols-2 gap-4">
//                 <InputField
//                   label="First Name"
//                   value={form.firstName}
//                   onChange={(v) =>
//                     setForm({ ...form, firstName: v })
//                   }
//                 />
//                 <InputField
//                   label="Last Name"
//                   value={form.lastName}
//                   onChange={(v) =>
//                     setForm({ ...form, lastName: v })
//                   }
//                 />
//                 <InputField
//                   label="Email Address"
//                   type="email"
//                   span
//                   value={form.email}
//                   onChange={(v) =>
//                     setForm({ ...form, email: v })
//                   }
//                 />
//                 <InputField
//                   label="Temporary Password"
//                   type="password"
//                   value={form.password}
//                   onChange={(v) =>
//                     setForm({ ...form, password: v })
//                   }
//                 />
//                 <InputField
//                   label="Phone Number"
//                   value={form.phoneNumber}
//                   onChange={(v) =>
//                     setForm({ ...form, phoneNumber: v })
//                   }
//                 />
//               </div>
//             </section>

//             <Separator />

//             {/* License */}
//             <section className="space-y-4">
//               <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
//                 License Details
//               </h3>

//               <div className="grid grid-cols-2 gap-4">
//                 <InputField
//                   label="License Number"
//                   value={form.licenseNumber}
//                   onChange={(v) =>
//                     setForm({ ...form, licenseNumber: v })
//                   }
//                 />
//                 <InputField
//                   label="License Expiry"
//                   type="date"
//                   value={form.licenseExpiry}
//                   onChange={(v) =>
//                     setForm({ ...form, licenseExpiry: v })
//                   }
//                 />
//               </div>
//             </section>

//             <Separator />

//             {/* Documents */}
//             <section className="space-y-4 pb-4">
//               <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
//                 Required Documents (PDF)
//               </h3>

//               <div className="grid gap-4">
//                 <UploadField
//                   label="Driver License"
//                   uploading={uploading.license}
//                   uploaded={!!urls.licenseUrl}
//                   onSelect={(file) =>
//                     handleFileUpload(file, "license")
//                   }
//                 />
//                 <UploadField
//                   label="Tax Status Certificate"
//                   uploading={uploading.tax}
//                   uploaded={!!urls.taxStatusCertificateUrl}
//                   onSelect={(file) =>
//                     handleFileUpload(file, "taxStatusCertificate")
//                   }
//                 />
//                 <UploadField
//                   label="Identity Card"
//                   uploading={uploading.identity}
//                   uploaded={!!urls.identityCardUrl}
//                   onSelect={(file) =>
//                     handleFileUpload(file, "identityCard")
//                   }
//                 />
//               </div>
//             </section>
//           </div>
//         </ScrollArea>

//         <Separator />

//         {/* ================= FOOTER ================= */}
//         <DialogFooter className="p-6 bg-slate-50/50 shrink-0">
//           <Button variant="ghost" onClick={onClose} disabled={loading}>
//             Cancel
//           </Button>

//           <Button
//             onClick={submit}
//             className="min-w-[160px]"
//             disabled={
//               loading ||
//               !urls.licenseUrl ||
//               !urls.taxStatusCertificateUrl
//             }
//           >
//             {loading ? (
//               <Loader2 className="h-4 w-4 animate-spin mr-2" />
//             ) : (
//               "Create Driver Account"
//             )}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

// /* ================= HELPERS ================= */

// function InputField({
//   label,
//   value,
//   onChange,
//   type = "text",
//   span,
// }: any) {
//   return (
//     <div className={`space-y-1.5 ${span ? "col-span-2" : ""}`}>
//       <Label className="text-xs font-medium">{label}</Label>
//       <Input
//         type={type}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="focus-visible:ring-primary"
//       />
//     </div>
//   );
// }

// function UploadField({
//   label,
//   uploading,
//   uploaded,
//   onSelect,
// }: any) {
//   return (
//     <div className="flex items-center justify-between p-3 border rounded-lg bg-card shadow-sm">
//       <div className="flex items-center gap-3">
//         <div
//           className={`p-2 rounded-full ${
//             uploaded ? "bg-emerald-100" : "bg-slate-100"
//           }`}
//         >
//           {uploaded ? (
//             <CheckCircle2 className="h-5 w-5 text-emerald-600" />
//           ) : (
//             <FileText className="h-5 w-5 text-slate-500" />
//           )}
//         </div>

//         <div>
//           <p className="text-sm font-medium">{label}</p>
//           <p className="text-xs text-muted-foreground">
//             {uploaded ? "Document uploaded" : "No file selected"}
//           </p>
//         </div>
//       </div>

//       <div>
//         <Input
//           type="file"
//           accept="application/pdf"
//           id={label}
//           className="hidden"
//           disabled={uploading}
//           onChange={(e) =>
//             e.target.files && onSelect(e.target.files[0])
//           }
//         />

//         <Button
//           variant="outline"
//           size="sm"
//           asChild
//           disabled={uploading}
//         >
//           <label htmlFor={label} className="cursor-pointer">
//             {uploading ? (
//               <Loader2 className="h-4 w-4 animate-spin" />
//             ) : (
//               <>
//                 <UploadCloud className="h-4 w-4 mr-2" />
//                 {uploaded ? "Change" : "Upload"}
//               </>
//             )}
//           </label>
//         </Button>
//       </div>
//     </div>
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
import { useDrivers } from "@/hooks/useDrivers";
import {
  Loader2,
  User,
  FileText,
  CheckCircle2,
  UploadCloud,
  ShieldCheck,
  IdCard,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function AddDriverDialog({ open, onClose }: any) {
  const { createDriver, uploadDriverDocuments } = useDrivers();

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState({
    license: false,
    tax: false,
    identity: false,
  });

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    licenseNumber: "",
    licenseExpiry: "",
  });

  const [urls, setUrls] = useState({
    licenseUrl: "",
    taxStatusCertificateUrl: "",
    identityCardUrl: "",
  });

  const handleFileUpload = async (
    file: File,
    type: "license" | "taxStatusCertificate" | "identityCard"
  ) => {
    const loadingKey =
      type === "taxStatusCertificate"
        ? "tax"
        : type === "identityCard"
        ? "identity"
        : "license";

    setUploading((prev) => ({ ...prev, [loadingKey]: true }));

    try {
      const fd = new FormData();
      fd.append(type, file);
      const res = await uploadDriverDocuments(fd);
      const urlKey = `${type}Url` as keyof typeof urls;
      setUrls((prev) => ({ ...prev, [urlKey]: res[type].url }));
    } finally {
      setUploading((prev) => ({ ...prev, [loadingKey]: false }));
    }
  };

  const submit = async () => {
    setLoading(true);
    try {
      await createDriver({ ...form, ...urls });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[95vh] p-0 overflow-hidden flex flex-col">

        {/* ================= HEADER ================= */}
        <DialogHeader className="p-6 pb-2 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">Register New Driver</DialogTitle>
              <DialogDescription>
                Create a professional driver profile and manage legal compliance.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Separator />

        {/* ================= SCROLLABLE BODY ================= */}
       <ScrollArea className="flex-1 overflow-y-auto px-6">

          <div className="space-y-8 py-6">
            
            {/* 1. Personal Info Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
                <IdCard className="h-4 w-4" /> Personal Information
              </div>
              <div className="grid grid-cols-2 gap-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100 shadow-sm">
                <InputField label="First Name" value={form.firstName} 
                  onChange={(v) => setForm({ ...form, firstName: v })} />
                <InputField label="Last Name" value={form.lastName} 
                  onChange={(v) => setForm({ ...form, lastName: v })} />
                <InputField label="Email Address" type="email" span value={form.email} 
                  onChange={(v) => setForm({ ...form, email: v })} />
                <InputField label="Temporary Password" type="password" value={form.password} 
                  onChange={(v) => setForm({ ...form, password: v })} />
                <InputField label="Phone Number" value={form.phoneNumber} 
                  onChange={(v) => setForm({ ...form, phoneNumber: v })} />
              </div>
            </section>

            {/* 2. License Details Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
                <ShieldCheck className="h-4 w-4" /> Professional Credentials
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InputField label="License Number" value={form.licenseNumber} 
                  onChange={(v) => setForm({ ...form, licenseNumber: v })} />
                <InputField label="License Expiry" type="date" value={form.licenseExpiry} 
                  onChange={(v) => setForm({ ...form, licenseExpiry: v })} />
              </div>
            </section>

            {/* 3. Documentation Section (Grid Boxes) */}
            <section className="space-y-4 pb-4">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
                <FileText className="h-4 w-4" /> Compliance Documents
              </div>
              <div className="grid grid-cols-2 gap-4">
                <DocumentUploadBox 
                  label="Driver's License" 
                  uploading={uploading.license} 
                  url={urls.licenseUrl} 
                  onUpload={(f) => handleFileUpload(f, "license")} 
                />
                <DocumentUploadBox 
                  label="Tax Status Certificate" 
                  uploading={uploading.tax} 
                  url={urls.taxStatusCertificateUrl} 
                  onUpload={(f) => handleFileUpload(f, "taxStatusCertificate")} 
                />
                <DocumentUploadBox 
                  label="National Identity Card" 
                  uploading={uploading.identity} 
                  url={urls.identityCardUrl} 
                  onUpload={(f) => handleFileUpload(f, "identityCard")} 
                  span
                />
              </div>
            </section>
          </div>
        </ScrollArea>

        <Separator />

        {/* ================= FOOTER ================= */}
        <DialogFooter className="p-6 bg-slate-50/50 shrink-0 border-t">
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={submit}
            className="min-w-[180px] shadow-sm"
            disabled={
              loading ||
              !urls.licenseUrl ||
              !urls.taxStatusCertificateUrl
            }
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              "Create Driver Account"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ================= ENHANCED HELPERS ================= */

function InputField({ label, value, onChange, type = "text", span }: any) {
  return (
    <div className={`space-y-1.5 ${span ? "col-span-2" : ""}`}>
      <Label className="text-xs font-semibold text-slate-700">{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="focus-visible:ring-primary bg-white shadow-sm h-9"
      />
    </div>
  );
}

function DocumentUploadBox({ label, uploading, url, onUpload, span }: any) {
  return (
    <div className={`relative border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center gap-2 transition-all hover:border-primary/50 hover:bg-primary/5 bg-white group ${span ? "col-span-2" : ""}`}>
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
        <p className={`text-[11px] font-medium mt-0.5 ${url ? 'text-emerald-600' : 'text-slate-500'}`}>
          {url ? "✓ PDF Document Uploaded" : "Tap to upload or drag PDF"}
        </p>
      </div>

      {url && (
        <div className="absolute top-2 right-2 z-20">
            <span className="bg-emerald-500 h-2 w-2 rounded-full block animate-pulse" />
        </div>
      )}
    </div>
  );
}