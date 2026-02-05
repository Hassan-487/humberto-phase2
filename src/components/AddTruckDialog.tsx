


import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
  Weight,
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
  const { t } = useTranslation();
  const { mutateAsync, isPending } = useCreateTruck();

  const [form, setForm] = useState<any>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [registrationUrl, setRegistrationUrl] = useState("");
  const [insuranceUrl, setInsuranceUrl] = useState("");

  const [uploading, setUploading] = useState({
    registration: false,
    insurance: false,
  });

  useEffect(() => {
    if (open) {
      setForm(EMPTY_FORM);
      setErrors({});
      setRegistrationUrl("");
      setInsuranceUrl("");
      setUploading({ registration: false, insurance: false });
    }
  }, [open]);

  /* ================= FILE UPLOAD ================= */

  const uploadDocument = async (
    file: File,
    type: "registration" | "insurance"
  ) => {
    setUploading((p) => ({ ...p, [type]: true }));

    try {
      const fd = new FormData();
      fd.append(type, file);
      const res = await truckService.uploadTruckDocuments(fd);

      if (type === "registration")
        setRegistrationUrl(res.registration?.url || "");
      else setInsuranceUrl(res.insurance?.url || "");

      setErrors((e) => ({ ...e, [`${type}Url`]: "" }));
    } finally {
      setUploading((p) => ({ ...p, [type]: false }));
    }
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    setErrors({});

    const e: Record<string, string> = {};

    if (!form.licensePlate) e.licensePlate = t('validation.required');
    if (!form.model) e.model = t('validation.required');
    if (!form.year) e.year = t('validation.required');
    if (!form.weight_capacity)
      e.weight_capacity = t('validation.required');

    if (!registrationUrl)
      e.registrationUrl = t('validation.documentRequired');

    if (!insuranceUrl)
      e.insuranceUrl = t('validation.documentRequired');

    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    try {
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
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Something went wrong";

      const mapped: Record<string, string> = {};
      const msg = message.toLowerCase();

      if (msg.includes("license")) mapped.licensePlate = message;
      else if (msg.includes("year")) mapped.year = message;
      else mapped.general = message;

      setErrors(mapped);
    }
  };

  const update = (key: string, value: string) => {
    setForm((f: any) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[90vh] p-0 flex flex-col overflow-hidden">
        {/* HEADER */}
        <DialogHeader className="p-6 pb-2">
          <div className="flex gap-3 items-center">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                {t('trucks.addNewFleet')}
              </DialogTitle>
              <DialogDescription>
                {t('trucks.vehicleRegistration')}
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
            {/* VEHICLE INFO */}
            <section className="space-y-4">
              <SectionTitle icon={<FileText className="h-4 w-4" />}>
                {t('trucks.vehicleSpecs')}
              </SectionTitle>

              <div className="grid grid-cols-2 gap-4 bg-slate-50/50 p-4 rounded-xl">
                <InputField
                  label={t('trucks.licensePlate')}
                  value={form.licensePlate}
                  error={errors.licensePlate}
                  onChange={(v) => update("licensePlate", v)}
                />

                <InputField
                  label={t('trucks.modelName')}
                  value={form.model}
                  error={errors.model}
                  onChange={(v) => update("model", v)}
                />

                <InputField
                  label={t('trucks.modelYear')}
                  type="number"
                  value={form.year}
                  error={errors.year}
                  onChange={(v) => update("year", v)}
                />

                <InputField
                  label={t('trucks.weightCapacity')}
                  type="number"
                  value={form.weight_capacity}
                  error={errors.weight_capacity}
                  onChange={(v) => update("weight_capacity", v)}
                />
              </div>
            </section>

            {/* TELEMATICS */}
            <section className="space-y-4">
              <SectionTitle icon={<Cpu className="h-4 w-4" />}>
                {t('trucks.hardwareTelematics')}
              </SectionTitle>

              <InputField
                label={t('trucks.samsaraDevice')}
                span
                value={form.samsaraDeviceId}
                error={errors.samsaraDeviceId}
                onChange={(v) => update("samsaraDeviceId", v)}
              />
            </section>

            {/* DOCUMENTS */}
            <section className="space-y-4">
              <SectionTitle icon={<CheckCircle2 className="h-4 w-4" />}>
                {t('trucks.complianceDocuments')}
              </SectionTitle>

              {(errors.registrationUrl || errors.insuranceUrl) && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg">
                  {errors.registrationUrl || errors.insuranceUrl}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <DocumentUploadBox
                  label={t('trucks.vehicleRegistrationDoc')}
                  uploading={uploading.registration}
                  url={registrationUrl}
                  onUpload={(f) => uploadDocument(f, "registration")}
                  uploadText={t('trucks.uploadPdf')}
                  uploadedText={t('trucks.pdfUploaded')}
                />
                <DocumentUploadBox
                  label={t('trucks.insurancePolicy')}
                  uploading={uploading.insurance}
                  url={insuranceUrl}
                  onUpload={(f) => uploadDocument(f, "insurance")}
                  uploadText={t('trucks.uploadPdf')}
                  uploadedText={t('trucks.pdfUploaded')}
                />
              </div>
            </section>
          </div>
        </ScrollArea>

        <Separator />

        {/* FOOTER */}
        <DialogFooter className="p-6 bg-slate-50">
          <Button variant="ghost" onClick={onClose} disabled={isPending}>
            {t('common.cancel')}
          </Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            )}
            {t('trucks.createTruck')}
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
}: any) {
  return (
    <div className={`space-y-1.5 ${span ? "col-span-2" : ""}`}>
      <Label className="text-xs font-semibold">{label}</Label>

      {error && (
        <p className="text-xs text-red-600 font-medium">
          {error}
        </p>
      )}

      <Input
        type={type}
        value={value}
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
  uploadText,
  uploadedText,
}: any) {
  return (
    <div className="relative border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center gap-2 bg-white">
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
        {url ? uploadedText : uploadText}
      </p>
    </div>
  );
}