


import { useTranslation } from "react-i18next";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Truck,
  FileText,
  ShieldCheck,
  ExternalLink,
  Pencil,
  Trash2,
  DollarSign,
  Hash,
  User,
  CalendarDays,
  StickyNote,
  Activity,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface CompanyProfileSheetProps {
  company: any;
  getStatusBadgeClass?: (status: string) => string;
  onEdit?: (company: any) => void;
  onDelete?: (id: string) => void;
}

export function CompanyProfileSheet({
  company,
  getStatusBadgeClass,
  onEdit,
  onDelete,
}: CompanyProfileSheetProps) {
  const { t } = useTranslation();

  if (!company) return null;

  const docs = company?.documents || company?.CompanyDocuments || {};

  const statusClass =
    company.status === "active"
      ? "bg-emerald-500/10 text-emerald-600 border-emerald-200"
      : company.status === "suspended"
      ? "bg-amber-500/10 text-amber-600 border-amber-200"
      : "bg-red-500/10 text-red-600 border-red-200";

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (val?: number) => {
    if (val == null) return "—";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "MXN",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="h-full flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/20">
      <div className="p-6 space-y-6 pb-20">

        {/* ── HEADER CARD ── */}
        <div className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br from-primary/5 via-primary/3 to-transparent border border-primary/10 shadow-sm">
          <div className="h-16 w-16 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center border-2 border-primary/20">
            <Building2 className="h-8 w-8 text-primary" />
          </div>

          <div className="space-y-1.5 overflow-hidden flex-1 min-w-0">
            <h3 className="text-base font-black truncate leading-tight">
              {company.legalName}
            </h3>

            <p className="text-[11px] font-mono text-muted-foreground bg-muted/50 px-2 py-0.5 rounded inline-block">
              RFC: {company.rfc || "—"}
            </p>

            <div className="flex items-center gap-2 flex-wrap pt-0.5">
              <Badge
                variant="outline"
                className={`capitalize text-[11px] ${
                  getStatusBadgeClass
                    ? getStatusBadgeClass(company.status)
                    : statusClass
                }`}
              >
                <Activity className="h-2.5 w-2.5 mr-1" />
                {company.status?.replace("_", " ") || "active"}
              </Badge>

              <Badge
                variant="outline"
                className={`text-[11px] ${
                  company.isActive
                    ? "bg-blue-500/10 text-blue-600 border-blue-200"
                    : "bg-gray-500/10 text-gray-500 border-gray-200"
                }`}
              >
                {company.isActive ? (
                  <CheckCircle2 className="h-2.5 w-2.5 mr-1" />
                ) : (
                  <XCircle className="h-2.5 w-2.5 mr-1" />
                )}
                {company.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
        </div>

        {/* ── CONTACT INFO ── */}
        <SectionBlock
          icon={<User className="h-3.5 w-3.5" />}
          title="Contact Information"
        >
          <InfoRow icon={<User className="h-3.5 w-3.5 text-muted-foreground" />} label="Contact Person" value={company.contactPersonName} />
          <InfoRow icon={<Phone className="h-3.5 w-3.5 text-muted-foreground" />} label="WhatsApp" value={company.whatsappNumber} mono />
          <InfoRow icon={<Mail className="h-3.5 w-3.5 text-muted-foreground" />} label="Email" value={company.contactEmail} />
          <InfoRow icon={<MapPin className="h-3.5 w-3.5 text-muted-foreground" />} label="Address" value={company.Address} />
        </SectionBlock>

        {/* ── OPERATIONS ── */}
        <SectionBlock
          icon={<Truck className="h-3.5 w-3.5" />}
          title="Operations"
        >
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              icon={<Truck className="h-4 w-4 text-blue-500" />}
              label="Total Trucks"
              value={company.totalTrucks != null ? String(company.totalTrucks) : "—"}
              bg="bg-blue-50 dark:bg-blue-950/20"
            />
            <StatCard
              icon={<DollarSign className="h-4 w-4 text-emerald-500" />}
              label="Total Price"
              value={formatCurrency(company.totalPrice)}
              bg="bg-emerald-50 dark:bg-emerald-950/20"
            />
          </div>
        </SectionBlock>

        {/* ── NOTES ── */}
        {company.notes && (
          <SectionBlock
            icon={<StickyNote className="h-3.5 w-3.5" />}
            title="Notes"
          >
            <p className="text-sm text-muted-foreground bg-muted/30 rounded-xl p-3 border border-dashed leading-relaxed">
              {company.notes}
            </p>
          </SectionBlock>
        )}

        {/* ── DOCUMENTS ── */}
        <SectionBlock
          icon={<ShieldCheck className="h-3.5 w-3.5" />}
          title="Legal Documents"
        >
          <div className="grid grid-cols-1 gap-2">
            {docs?.rfcUrl && (
              <DocLink label="RFC (Tax ID)" url={docs.rfcUrl} uploadedAt={docs.rfcUploadedAt} />
            )}
            {docs?.specialPermitUrl && (
              <DocLink label="Special Permit" url={docs.specialPermitUrl} uploadedAt={docs.specialPermitUploadedAt} />
            )}
            {docs?.insurancePolicyUrl && (
              <DocLink label="Insurance Policy" url={docs.insurancePolicyUrl} uploadedAt={docs.insurancePolicyUploadedAt} />
            )}
            {!docs?.rfcUrl && !docs?.specialPermitUrl && !docs?.insurancePolicyUrl && (
              <div className="p-4 border border-dashed rounded-xl text-center">
                <p className="text-xs text-muted-foreground italic">No documents available</p>
              </div>
            )}
          </div>
        </SectionBlock>

        {/* ── METADATA ── */}
        <SectionBlock
          icon={<CalendarDays className="h-3.5 w-3.5" />}
          title="Record Info"
        >
          <div className="grid grid-cols-2 gap-2 text-xs">
            <MetaItem label="Created" value={formatDate(company.createdAt)} />
            <MetaItem label="Updated" value={formatDate(company.updatedAt)} />
            <MetaItem label="Company ID" value={company._id?.slice(-8)} mono />
          </div>
        </SectionBlock>

        {/* ── ACTIONS ── */}
        <div className="pt-2 flex gap-3">
          <button
            onClick={() => onEdit?.(company)}
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors"
          >
            <Pencil className="h-4 w-4" />
            Edit Company
          </button>

          <button
            onClick={() => onDelete?.(company._id)}
            className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-red-600 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── SUB-COMPONENTS ── */

function SectionBlock({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
        {icon} {title}
      </div>
      <div className="space-y-1.5">{children}</div>
    </section>
  );
}

function InfoRow({ icon, label, value, mono }: { icon: React.ReactNode; label: string; value?: string; mono?: boolean }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors">
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] text-muted-foreground uppercase font-medium">{label}</p>
        <p className={`text-sm font-semibold truncate ${mono ? "font-mono" : ""}`}>{value}</p>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, bg }: { icon: React.ReactNode; label: string; value: string; bg: string }) {
  return (
    <div className={`${bg} rounded-xl p-3 border flex flex-col gap-1`}>
      <div className="flex items-center gap-1.5">{icon}<span className="text-[10px] text-muted-foreground uppercase font-medium">{label}</span></div>
      <p className="text-base font-black">{value}</p>
    </div>
  );
}

function MetaItem({ label, value, mono }: { label: string; value?: string; mono?: boolean }) {
  return (
    <div className="bg-muted/20 rounded-lg p-2.5">
      <p className="text-[10px] text-muted-foreground uppercase font-medium">{label}</p>
      <p className={`text-xs font-semibold mt-0.5 ${mono ? "font-mono" : ""}`}>{value || "—"}</p>
    </div>
  );
}

function DocLink({ label, url, uploadedAt }: { label: string; url: string; uploadedAt?: string }) {
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3 rounded-xl border bg-card hover:bg-accent transition-all group"
    >
      <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
        <FileText className="h-4 w-4 text-primary" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold group-hover:text-primary transition-colors">{label}</p>
        {formatDate(uploadedAt) && (
          <p className="text-[10px] text-muted-foreground">Uploaded {formatDate(uploadedAt)}</p>
        )}
      </div>

      <ExternalLink className="h-3.5 w-3.5 opacity-40 group-hover:opacity-100 group-hover:text-primary transition-all shrink-0" />
    </a>
  );
}