

import {
  Phone,
  Activity,
  ShieldCheck,
  Gauge,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

interface DriverProfileSheetProps {
  selectedDriver: any;
  getStatusBadgeClass: (status: string) => string;
}

export function DriverProfileSheet({
  selectedDriver,
  getStatusBadgeClass,
}: DriverProfileSheetProps) {
  if (!selectedDriver) return null;

  /* ================= DOCUMENT HELPERS ================= */

  const getDocumentUrl = (type: string) => {
    return selectedDriver.documents?.find(
      (doc: any) => doc.type === type
    )?.url;
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-none">
      {/* PROFILE HEADER */}
      <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border shadow-sm">
        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
          <span className="text-2xl font-black text-primary">
            {selectedDriver.firstName[0]}
            {selectedDriver.lastName[0]}
          </span>
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-black text-foreground">
            {selectedDriver.firstName} {selectedDriver.lastName}
          </h3>

          <p className="text-xs text-muted-foreground font-medium">
            {selectedDriver.email}
          </p>

          <Badge
            variant="outline"
            className={`mt-1 capitalize ${getStatusBadgeClass(
              selectedDriver.employmentStatus
            )}`}
          >
            {selectedDriver.employmentStatus?.replace("_", " ")}
          </Badge>
        </div>
      </div>

      {/* PERFORMANCE METRICS */}
      <section className="space-y-4">
        <Label className="font-bold flex items-center gap-2 text-primary uppercase text-[10px] tracking-widest">
          <Activity className="h-4 w-4" /> Performance Overview
        </Label>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-card border rounded-xl">
            <p className="text-[9px] uppercase font-bold text-muted-foreground">
              Total Trips
            </p>
            <p className="text-lg font-bold">
              {selectedDriver.performanceMetrics?.totalTrips || 0}
            </p>
          </div>

          <div className="p-3 bg-card border rounded-xl">
            <p className="text-[9px] uppercase font-bold text-emerald-600">
              Successful
            </p>
            <p className="text-lg font-bold text-emerald-600">
              {selectedDriver.performanceMetrics?.successfulTrips || 0}
            </p>
          </div>

          <div className="p-3 bg-card border rounded-xl col-span-2">
            <p className="text-[9px] uppercase font-bold text-amber-600">
              Delayed
            </p>
            <p className="text-lg font-bold text-amber-600">
              {selectedDriver.performanceMetrics?.delayedTrips || 0}
            </p>
          </div>
        </div>
      </section>

      {/* LICENSE INFORMATION */}
      <section className="space-y-4 pt-4 border-t">
        <Label className="font-bold flex items-center gap-2 text-muted-foreground uppercase text-[10px] tracking-widest">
          <ShieldCheck className="h-4 w-4" /> License Information
        </Label>

        <div className="p-4 bg-muted/20 border rounded-xl grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] text-muted-foreground font-bold uppercase">
              License Number
            </p>
            <p className="text-xs font-bold font-mono">
              {selectedDriver.licenseNumber}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[10px] text-muted-foreground font-bold uppercase">
              Expiration
            </p>
            <p className="text-xs font-bold">
              {selectedDriver.licenseExpiry
                ? new Date(
                    selectedDriver.licenseExpiry
                  ).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
      </section>

      {/* DOCUMENTS (FIXED – UI SAME) */}
      <section className="space-y-4 pt-4 border-t">
        <Label className="font-bold uppercase text-[10px] tracking-widest">
          Documents
        </Label>

        <div className="flex flex-col gap-2">
          {getDocumentUrl("license") && (
            <a
              href={getDocumentUrl("license")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-primary underline"
            >
              📄 View License Document
            </a>
          )}

          {getDocumentUrl("tax_status_certificate") && (
            <a
              href={getDocumentUrl("tax_status_certificate")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-primary underline"
            >
              📄 View Tax Status Certificate
            </a>
          )}

          {getDocumentUrl("identity_card") && (
            <a
              href={getDocumentUrl("identity_card")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-primary underline"
            >
              📄 View Identity Card
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
