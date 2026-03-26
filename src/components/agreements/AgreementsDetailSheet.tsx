import {
  MapPin,
  Building2,
  Navigation2,
  DollarSign,
  Route,
  ChevronLeft
} from "lucide-react";

import {
  Sheet,
  SheetContent
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface AgreementDetailSheetProps {
  agreement: any;
  isOpen: boolean;
  onClose: () => void;
}

export function AgreementDetailSheet({
  agreement,
  isOpen,
  onClose
}: AgreementDetailSheetProps) {
  if (!agreement) return null;

  const customerName =
    typeof agreement.customer === "object"
      ? agreement.customer?.legalName
      : agreement.customer;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="p-0 sm:max-w-[450px] border-l shadow-2xl">

        <div className="flex flex-col h-full bg-white">

          {/* HEADER */}
          <div className="p-4 border-b flex items-center gap-2 bg-white sticky top-0 z-10">
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Agreement Details
            </span>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-6 space-y-8 pb-10">

              {/* HEADER CARD */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border shadow-sm">
                <div className="h-20 w-20 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center border-2 border-primary/20 shadow-inner">
                  <Route className="h-10 w-10 text-primary" />
                </div>

                <div className="space-y-1 flex-1 min-w-0">
                  <h3 className="text-lg font-black text-foreground truncate">
                    {agreement._id?.slice(-6).toUpperCase()}
                  </h3>

                  <p className="text-[10px] text-muted-foreground font-bold flex items-center gap-1 uppercase tracking-tighter truncate">
                    <Building2 className="h-3 w-3" />
                    {customerName}
                  </p>

                  <div className="pt-2">
                    <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-none text-[10px] font-bold px-2 py-0">
                      ACTIVE
                    </Badge>
                  </div>
                </div>
              </div>

              {/* ROUTE */}
              <section className="space-y-4">
                <Label className="font-bold flex items-center gap-2 text-primary uppercase text-[10px] tracking-widest">
                  <MapPin className="h-4 w-4" /> Route
                </Label>

                <div className="grid grid-cols-1 gap-3">
                  <InfoCard label="Origin" value={agreement.originAddress} />
                  <InfoCard label="Destination" value={agreement.destinationAddress} />
                  <InfoCard label="Trip End" value={agreement.tripEndAddress} />
                </div>
              </section>

              {/* CONFIG */}
              <section className="space-y-4 pt-4 border-t">
                <Label className="font-bold flex items-center gap-2 text-primary uppercase text-[10px] tracking-widest">
                  <Navigation2 className="h-4 w-4" /> Trip Configuration
                </Label>

                <div className="grid grid-cols-2 gap-3">
                  <InfoCard label="Trip Type" value={agreement.tripType} />
                  <InfoCard label="Trailer Mode" value={agreement.trailerMode} />
                  <InfoCard label="Trailer Type" value={agreement.trailerType} />
                  <InfoCard
                    label="Distance"
                    value={`${agreement.tripDistanceKm || 0} km`}
                  />
                </div>
              </section>

              {/* PRICE */}
              <section className="space-y-4 pt-4 border-t">
                <Label className="font-bold flex items-center gap-2 text-primary uppercase text-[10px] tracking-widest">
                  <DollarSign className="h-4 w-4" /> Pricing
                </Label>

                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                  <p className="text-[9px] text-emerald-700 font-bold uppercase tracking-tight">
                    Trip Price (MXN)
                  </p>

                  <p className="text-2xl font-black text-emerald-600">
                    ${Number(agreement.tripPrice || 0).toLocaleString()}
                  </p>
                </div>
              </section>

            </div>
          </ScrollArea>
        </div>

      </SheetContent>
    </Sheet>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 bg-muted/10 border rounded-xl">
      <p className="text-[9px] text-muted-foreground font-bold uppercase mb-0.5">
        {label}
      </p>
      <p className="text-xs font-bold text-foreground truncate">
        {value || "—"}
      </p>
    </div>
  );
}