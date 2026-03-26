// import { Badge } from "@/components/ui/badge";
// import { Label } from "@/components/ui/label";
// import { Building2, Phone, Truck, FileText } from "lucide-react";

// export function CompanyProfileSheet({ company }: any) {
//   if (!company) return null;

//   const docs = company.CompanyDocuments || {};

//   return (
//     <div className="p-6 space-y-8">
//       <div className="flex items-center gap-4 p-4 bg-muted/30 border rounded-2xl">
//         <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center">
//           <Building2 className="h-8 w-8 text-primary" />
//         </div>

//         <div>
//           <h3 className="text-lg font-bold">{company.legalName}</h3>
//           <p className="text-xs text-muted-foreground">{company.rfc}</p>

//           <Badge variant="outline" className="mt-2 capitalize">
//             {company.status}
//           </Badge>
//         </div>
//       </div>

//       <section className="space-y-3">
//         <Label className="uppercase text-[10px] font-bold">Company Info</Label>

//         <Info label="Contact" value={company.whatsappNumber} />
//         <Info label="Address" value={company.Address} />
//       </section>

//       <section className="space-y-3 pt-4 border-t">
//         <Label className="uppercase text-[10px] font-bold">Fleet</Label>

//         <Info label="Total Trucks" value={company.totalTrucks} />
//       </section>

//       <section className="space-y-3 pt-4 border-t">
//         <Label className="uppercase text-[10px] font-bold">Documents</Label>

//         {docs.rfcUrl && <DocLink label="RFC" url={docs.rfcUrl} />}
//         {docs.specialPermitUrl && <DocLink label="Permit" url={docs.specialPermitUrl} />}
//         {docs.insurancePolicyUrl && <DocLink label="Insurance" url={docs.insurancePolicyUrl} />}
//       </section>
//     </div>
//   );
// }
// function Info({ label, value }: any) {
//   return (
//     <div className="p-3 bg-card border rounded-xl">
//       <p className="text-[10px] uppercase text-muted-foreground font-bold">
//         {label}
//       </p>
//       <p className="text-sm font-semibold">{value || "—"}</p>
//     </div>
//   );
// }

// function DocLink({ label, url }: any) {
//   return (
//     <a
//       href={url}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="text-sm font-semibold text-primary underline"
//     >
//       📄 {label}
//     </a>
//   );
// }

import { useTranslation } from "react-i18next";
import { 
  Building2, 
  MapPin, 
  Phone, 
  Truck, 
  FileText, 
  ShieldCheck, 
  Info as InfoIcon,
  ExternalLink
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

interface CompanyProfileSheetProps {
  company: any;
  getStatusBadgeClass?: (status: string) => string;
}

export function CompanyProfileSheet({ 
  company, 
  getStatusBadgeClass 
}: CompanyProfileSheetProps) {
  const { t } = useTranslation();

  if (!company) return null;

  const docs = company.CompanyDocuments || {};

  return (
    /* SCROLLABLE WRAPPER 
       'h-full' ensures it takes up the sheet height, 
       'overflow-y-auto' enables scrolling,
       'scrollbar-none' hides the bar if you prefer the clean look of your sample
    */
    <div className="h-full flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/20">
      <div className="p-6 space-y-8 pb-12"> {/* Added bottom padding for better scroll ending */}
        
        {/* PROFILE HEADER */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border shadow-sm">
          <div className="h-20 w-20 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center border-2 border-primary/20">
            <Building2 className="h-10 w-10 text-primary" />
          </div>

          <div className="space-y-1 overflow-hidden">
            <h3 className="text-lg font-black text-foreground leading-tight truncate">
              {company.legalName}
            </h3>
            <p className="text-xs font-mono text-muted-foreground">
              {company.rfc}
            </p>
            <Badge
              variant="outline"
              className={`mt-1 capitalize ${
                getStatusBadgeClass ? getStatusBadgeClass(company.status) : ""
              }`}
            >
              {company.status?.replace("_", " ")}
            </Badge>
          </div>
        </div>

        {/* COMPANY INFO SECTION */}
        <section className="space-y-4">
          <Label className="font-bold flex items-center gap-2 text-primary uppercase text-[10px] tracking-widest">
            <InfoIcon className="h-4 w-4" /> {t('company.generalInfo')}
          </Label>

          <div className="grid grid-cols-1 gap-3">
            <div className="p-3 bg-card border rounded-xl flex items-start gap-3 shadow-sm">
              <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-[9px] uppercase font-bold text-muted-foreground">
                  {t('company.contact')}
                </p>
                <p className="text-sm font-bold">{company.whatsappNumber || "—"}</p>
              </div>
            </div>

            <div className="p-3 bg-card border rounded-xl flex items-start gap-3 shadow-sm">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-[9px] uppercase font-bold text-muted-foreground">
                  {t('company.address')}
                </p>
                <p className="text-sm font-semibold leading-relaxed">
                  {company.Address || "—"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FLEET METRICS */}
        <section className="space-y-4 pt-4 border-t">
          <Label className="font-bold flex items-center gap-2 text-blue uppercase text-[10px] tracking-widest">
            <Truck className="h-4 w-4" /> {t('company.fleetOverview')}
          </Label>

          <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-[10px] text-muted-foreground font-bold uppercase">
                {t('company.totalTrucks')}
              </p>
              <p className="text-2xl font-black text-primary">
                {company.totalTrucks || 0}
              </p>
            </div>
            <Truck className="h-8 w-8 text-primary/20" />
          </div>
        </section>

        {/* DOCUMENTS SECTION */}
        <section className="space-y-4 pt-4 border-t">
          <Label className="font-bold flex items-center gap-2 text-muted-foreground uppercase text-[10px] tracking-widest">
            <ShieldCheck className="h-4 w-4" /> {t('company.legalDocuments')}
          </Label>

          <div className="grid grid-cols-1 gap-2">
            {docs.rfcUrl && <DocLink label="RFC (Tax ID)" url={docs.rfcUrl} />}
            {docs.specialPermitUrl && <DocLink label="Special Permit" url={docs.specialPermitUrl} />}
            {docs.insurancePolicyUrl && <DocLink label="Insurance Policy" url={docs.insurancePolicyUrl} />}
            
            {!docs.rfcUrl && !docs.specialPermitUrl && !docs.insurancePolicyUrl && (
               <div className="p-4 border border-dashed rounded-xl text-center">
                 <p className="text-xs text-muted-foreground italic">No documents available</p>
               </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function DocLink({ label, url }: { label: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3 rounded-xl border bg-card hover:bg-accent transition-all group active:scale-[0.98]"
    >
      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
        <FileText className="h-4 w-4 text-primary" />
      </div>
      <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
        {label}
      </span>
      <ExternalLink className="ml-auto h-3 w-3 text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}