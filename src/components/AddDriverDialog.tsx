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
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  /* ================= FRONTEND VALIDATION ================= */

  const validate = () => {
    const e: Record<string, string> = {};

    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";

    if (!form.email) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Invalid email format";

    if (!form.password || form.password.length < 6)
      e.password = "Password must be at least 6 characters";

    if (!form.phoneNumber) e.phoneNumber = "Phone number is required";
    else if (!/^\d{10}$/.test(form.phoneNumber))
      e.phoneNumber = "Phone number must be exactly 10 digits";

    if (!form.licenseNumber)
      e.licenseNumber = "License number is required";

    if (!form.licenseExpiry)
      e.licenseExpiry = "License expiry date is required";

    if (!urls.licenseUrl)
      e.licenseUrl = "Driver license document is required";

    if (!urls.taxStatusCertificateUrl)
      e.taxStatusCertificateUrl = "Tax certificate is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ================= FILE UPLOAD ================= */

  const handleFileUpload = async (
    file: File,
    type: "license" | "taxStatusCertificate" | "identityCard"
  ) => {
    const key =
      type === "taxStatusCertificate"
        ? "tax"
        : type === "identityCard"
        ? "identity"
        : "license";

    setUploading((p) => ({ ...p, [key]: true }));

    try {
      const fd = new FormData();
      fd.append(type, file);
      const res = await uploadDriverDocuments(fd);

      const urlKey = `${type}Url` as keyof typeof urls;
      setUrls((p) => ({ ...p, [urlKey]: res[type].url }));
      setErrors((e) => ({ ...e, [urlKey]: "" }));
    } finally {
      setUploading((p) => ({ ...p, [key]: false }));
    }
  };

  /* ================= SUBMIT (BACKEND MESSAGE MAPPING) ================= */

  const submit = async () => {
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      await createDriver({ ...form, ...urls });
      onClose();
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Something went wrong";

      const mappedErrors: Record<string, string> = {};
      const msg = message.toLowerCase();

      if (msg.includes("email")) mappedErrors.email = message;
      else if (msg.includes("phone")) mappedErrors.phoneNumber = message;
      else if (msg.includes("password")) mappedErrors.password = message;
      else if (msg.includes("license")) mappedErrors.licenseNumber = message;
      else mappedErrors.general = message;

      setErrors(mappedErrors);
    } finally {
      setLoading(false);
    }
  };

  const update = (key: string, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[95vh] p-0 flex flex-col overflow-hidden">
        {/* HEADER */}
        <DialogHeader className="p-6 pb-2">
          <div className="flex gap-3 items-center">
            <div className="bg-primary/10 p-2 rounded-lg">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                Register New Driver
              </DialogTitle>
              <DialogDescription>
                Driver onboarding & compliance verification
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
            {/* PERSONAL INFO */}
            <section className="space-y-4">
              <SectionTitle icon={<IdCard className="h-4 w-4" />}>
                Personal Information
              </SectionTitle>

              <div className="grid grid-cols-2 gap-4 bg-slate-50/50 p-4 rounded-xl">
                <InputField
                  label="First Name"
                  placeholder="John"
                  value={form.firstName}
                  error={errors.firstName}
                  onChange={(v) => update("firstName", v)}
                />
                <InputField
                  label="Last Name"
                  placeholder="Doe"
                  value={form.lastName}
                  error={errors.lastName}
                  onChange={(v) => update("lastName", v)}
                />
                <InputField
                  label="Email"
                  placeholder="john.doe@email.com"
                  span
                  value={form.email}
                  error={errors.email}
                  onChange={(v) => update("email", v)}
                />
                <InputField
                  label="Password"
                  placeholder="••••••••"
                  type="password"
                  value={form.password}
                  error={errors.password}
                  onChange={(v) => update("password", v)}
                />
                <InputField
                  label="Phone Number"
                  placeholder="03001234567"
                  value={form.phoneNumber}
                  error={errors.phoneNumber}
                  onChange={(v) => update("phoneNumber", v)}
                />
              </div>
            </section>

            {/* LICENSE */}
            <section className="space-y-4">
              <SectionTitle icon={<ShieldCheck className="h-4 w-4" />}>
                Professional Credentials
              </SectionTitle>

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="License Number"
                  placeholder="DL-456789123"
                  value={form.licenseNumber}
                  error={errors.licenseNumber}
                  onChange={(v) => update("licenseNumber", v)}
                />
                <InputField
                  label="License Expiry"
                  type="date"
                  value={form.licenseExpiry}
                  error={errors.licenseExpiry}
                  onChange={(v) => update("licenseExpiry", v)}
                />
              </div>
            </section>

            {/* DOCUMENTS */}
            <section className="space-y-4">
              <SectionTitle icon={<FileText className="h-4 w-4" />}>
                Compliance Documents
              </SectionTitle>

              {(errors.licenseUrl || errors.taxStatusCertificateUrl) && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg">
                  {errors.licenseUrl || errors.taxStatusCertificateUrl}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <DocumentUploadBox
                  label="Driver License"
                  uploading={uploading.license}
                  url={urls.licenseUrl}
                  onUpload={(f) => handleFileUpload(f, "license")}
                />
                <DocumentUploadBox
                  label="Tax Certificate"
                  uploading={uploading.tax}
                  url={urls.taxStatusCertificateUrl}
                  onUpload={(f) =>
                    handleFileUpload(f, "taxStatusCertificate")
                  }
                />
                <DocumentUploadBox
                  label="National ID"
                  uploading={uploading.identity}
                  url={urls.identityCardUrl}
                  onUpload={(f) =>
                    handleFileUpload(f, "identityCard")
                  }
                  span
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
          <Button onClick={submit} disabled={loading}>
            {loading && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            )}
            Create Driver Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ================= HELPERS ================= */

function SectionTitle({ icon, children }: any) {
  return (
    <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
      {icon} {children}
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = "text",
  span,
  error,
  placeholder,
}: any) {
  return (
    <div className={`space-y-1.5 ${span ? "col-span-2" : ""}`}>
      <Label className="text-xs font-semibold">{label}</Label>
      {error && <p className="text-xs text-red-600">{error}</p>}
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`h-9 ${error ? "border-red-500" : ""}`}
      />
    </div>
  );
}

function DocumentUploadBox({
  label,
  uploading,
  url,
  onUpload,
  span,
}: any) {
  return (
    <div
      className={`relative border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center gap-2 bg-white transition-all ${
        span ? "col-span-2" : ""
      }`}
    >
      <Input
        type="file"
        accept="application/pdf"
        className="absolute inset-0 opacity-0 cursor-pointer"
        disabled={uploading}
        onChange={(e) =>
          e.target.files && onUpload(e.target.files[0])
        }
      />

      {uploading ? (
        <Loader2 className="h-6 w-6 animate-spin" />
      ) : url ? (
        <CheckCircle2 className="h-6 w-6 text-emerald-600" />
      ) : (
        <UploadCloud className="h-6 w-6 text-slate-400" />
      )}

      <p className="text-sm font-semibold">{label}</p>
      <p className="text-xs text-slate-500">
        {url ? "PDF uploaded" : "Upload PDF"}
      </p>
    </div>
  );
}
