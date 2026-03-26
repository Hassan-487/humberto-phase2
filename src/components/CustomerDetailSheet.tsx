// import { useTranslation } from "react-i18next";
// import {
//   Users,
//   Activity,
//   ShieldCheck,
//   CreditCard,
//   Building2,
//   Mail,
//   Phone,
//   ExternalLink,
//   FileText
// } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
// import { ScrollArea } from "@/components/ui/scroll-area"; // Ensure this is imported

// /* ================= TYPES ================= */

// interface CustomerProfileSheetProps {
//   customer: any;
//   getStatusBadgeClass: (status: string) => string;
// }

// export function CustomerProfileSheet({
//   customer,
//   getStatusBadgeClass,
// }: CustomerProfileSheetProps) {
//   const { t } = useTranslation();

//   if (!customer) return null;

//   /* ================= DOCUMENT HELPERS ================= */

//  const getDocumentUrl = (type: string) => {
//   return (
//     customer?.documents?.[`${type}Url`] ||
//     (type === "contract" ? customer?.serviceContractUrl : null) ||
//     (type === "permit" ? customer?.specialPermitUrl : null) ||
//     (type === "rfc" ? customer?.rfcUrl : null)
//   );
// };

//   return (
//     /* Using h-full and flex-col to ensure the container 
//        takes up the space of the Sheet/Drawer 
//     */
//     <div className="flex flex-col h-full bg-white">
//       <ScrollArea className="flex-1">
//         <div className="p-6 space-y-8 pb-10">
          
//           {/* PROFILE HEADER */}
//           <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border shadow-sm">
//             <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center border-2 border-primary/20 shadow-inner">
//               <Users className="h-10 w-10 text-primary" />
//             </div>

//             <div className="space-y-1 flex-1">
//               <h3 className="text-lg font-black text-foreground truncate max-w-[220px]">
//                 {customer.businessName || customer.legalName}
//               </h3>
//               <p className="text-[10px] text-muted-foreground font-bold flex items-center gap-1 uppercase tracking-tighter">
//                 <Building2 className="h-3 w-3" /> {customer.legalName}
//               </p>

//               <div className="flex items-center gap-2 mt-2">
//                 <Badge
//                   variant="outline"
//                   className={`capitalize px-2 py-0 text-[10px] ${
//                     typeof getStatusBadgeClass === "function" 
//                     ? getStatusBadgeClass(customer.status) 
//                     : ""
//                   }`}
//                 >
//                   {customer.status?.replace("_", " ") || 'Active'}
//                 </Badge>
//                 <span className="text-[10px] font-mono bg-muted px-1.5 rounded border">
//                   RFC: {customer.rfc}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* PERFORMANCE METRICS */}
//           <section className="space-y-4">
//             <Label className="font-bold flex items-center gap-2 text-primary uppercase text-[10px] tracking-widest">
//               <Activity className="h-4 w-4" /> {t('customers.shippingOverview') || "Shipping Overview"}
//             </Label>

//             <div className="grid grid-cols-2 gap-3">
//               <div className="p-3 bg-card border rounded-xl shadow-sm">
//                 <p className="text-[9px] uppercase font-bold text-muted-foreground">
//                   {t('customers.totalLoads') || "Total Loads"}
//                 </p>
//                 <p className="text-lg font-black">
//                   {customer.totalLoads || 0}
//                 </p>
//               </div>

//               <div className="p-3 bg-card border rounded-xl shadow-sm">
//                 <p className="text-[9px] uppercase font-bold text-emerald-600">
//                   {t('customers.activeTrips') || "Active Trips"}
//                 </p>
//                 <p className="text-lg font-black text-emerald-600">
//                   {customer.activeTrips || 0}
//                 </p>
//               </div>
//             </div>
//           </section>

//           {/* FINANCIAL & TAX COMPLIANCE */}
//           <section className="space-y-4 pt-4 border-t">
//             <Label className="font-bold flex items-center gap-2 text-primary uppercase text-[10px] tracking-widest">
//               <CreditCard className="h-4 w-4" /> {t('customers.financialTerms') || "Financial Terms"}
//             </Label>

//             <div className="grid grid-cols-2 gap-3">
//               <div className="col-span-2 p-4 bg-emerald-50/30 border border-emerald-100 rounded-xl">
//                 <p className="text-[9px] text-emerald-700 font-bold uppercase tracking-tight">Credit Limit (MXN)</p>
//                 <p className="text-xl font-black text-emerald-600">
//                   ${Number(customer.creditLimit || 0).toLocaleString()}
//                 </p>
//                 <Separator className="my-2 bg-emerald-100" />
//                 <div className="flex justify-between text-[10px] font-bold text-emerald-700">
//                   <span>{customer.paymentTerms || "30 Days"}</span>
//                   <span className="uppercase">{customer.paymentMethod || "PPD"}</span>
//                 </div>
//               </div>
              
//               <InfoCard label="Tax Regime" value={customer.taxRegime || "601"} />
//               <InfoCard label="Billing Email" value={customer.billingEmail} />
//             </div>
//           </section>

//           {/* CONTACT INFORMATION */}
//           <section className="space-y-4 pt-4 border-t">
//             <Label className="font-bold flex items-center gap-2 text-primary uppercase text-[10px] tracking-widest">
//               <Phone className="h-4 w-4" /> {t('common.contactDetails') || "Contact Details"}
//             </Label>
            
//             <div className="space-y-2">
//                <ContactLink icon={<Users className="h-3 w-3" />} label="Contact Person" value={customer.contactPerson} />
//                <ContactLink icon={<Phone className="h-3 w-3" />} label="Phone" value={customer.contactNumber} />
//                <ContactLink icon={<Mail className="h-3 w-3" />} label="Email" value={customer.email} />
//             </div>
//           </section>

//           {/* DOCUMENTS */}
//           <section className="space-y-4 pt-4 border-t">
//             <Label className="font-bold flex items-center gap-2 text-primary uppercase text-[10px] tracking-widest">
//               <FileText className="h-4 w-4" /> {t('drivers.documents')}
//             </Label>

//             <div className="flex flex-col gap-3">
//               {getDocumentUrl("rfc") && (
//                 <DocLink label={t('customers.viewRfc') || "View RFC Certificate"} url={getDocumentUrl("rfc")} />
//               )}

//               {getDocumentUrl("contract") && (
//                 <DocLink label={t('customers.viewContract') || "View Service Contract"} url={getDocumentUrl("contract")} />
//               )}

//               {getDocumentUrl("permit") && (
//                 <DocLink label={t('customers.viewPermit') || "View Special Permit"} url={getDocumentUrl("permit")} />
//               )}
//             </div>
//           </section>

//         </div>
//       </ScrollArea>
//     </div>
//   );
// }

// /* ================= MINI COMPONENTS ================= */

// function InfoCard({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="p-3 bg-muted/10 border rounded-xl">
//       <p className="text-[9px] text-muted-foreground font-bold uppercase">{label}</p>
//       <p className="text-xs font-bold truncate">{value || "—"}</p>
//     </div>
//   );
// }

// function ContactLink({ icon, label, value }: any) {
//   return (
//     <div className="flex items-center gap-3 p-2.5 bg-card border rounded-xl shadow-sm">
//       <div className="h-7 w-7 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
//         {icon}
//       </div>
//       <div>
//         <p className="text-[8px] uppercase font-black text-muted-foreground/60 leading-none mb-0.5">{label}</p>
//         <p className="text-[11px] font-bold text-foreground">{value || "—"}</p>
//       </div>
//     </div>
//   );
// }

// function DocLink({ label, url }: { label: string; url: string }) {
//   return (
//     <a
//       href={url}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="flex items-center justify-between p-3 bg-primary/5 border border-primary/10 rounded-xl hover:bg-primary/10 transition-colors group"
//     >
//       <div className="flex items-center gap-2">
//         <FileText className="h-4 w-4 text-primary" />
//         <span className="text-xs font-bold text-primary">{label}</span>
//       </div>
//       <ExternalLink className="h-3 w-3 text-primary/40 group-hover:text-primary transition-colors" />
//     </a>
//   );
// }

import { useTranslation } from "react-i18next";
import {
  Users,
  Activity,
  ShieldCheck,
  CreditCard,
  Building2,
  Mail,
  Phone,
  ExternalLink,
  FileText,
  MapPin
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CustomerProfileSheetProps {
  customer: any;
  getStatusBadgeClass: (status: string) => string;
}

export function CustomerProfileSheet({
  customer,
  getStatusBadgeClass,
}: CustomerProfileSheetProps) {
  const { t } = useTranslation();

  if (!customer) return null;

  const getDocumentUrl = (type: string) => {
    return (
      customer?.documents?.[`${type}Url`] ||
      (type === "contract" ? customer?.serviceContractUrl : null) ||
      (type === "permit" ? customer?.specialPermitUrl : null) ||
      (type === "rfc" ? customer?.rfcUrl : null)
    );
  };

  return (
    /* THE FIX: 
       1. h-full ensures the component matches the Sheet/Drawer height.
       2. flex-col + min-h-0 allows the ScrollArea to properly calculate space.
    */
    <div className="flex flex-col h-full min-h-0 bg-background">
      <ScrollArea className="flex-1 w-full">
        {/* INNER CONTAINER: Added larger bottom padding (pb-20) to ensure 
            mobile users can scroll past the bottom button/safe area */}
        <div className="p-6 space-y-8 pb-20">
          
          {/* PROFILE HEADER */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border shadow-sm">
            <div className="h-20 w-20 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center border-2 border-primary/20 shadow-inner">
              <Users className="h-10 w-10 text-primary" />
            </div>

            <div className="space-y-1 flex-1 min-w-0">
              <h3 className="text-lg font-black text-foreground truncate">
                {customer.businessName || customer.legalName}
              </h3>
              <p className="text-[10px] text-muted-foreground font-bold flex items-center gap-1 uppercase tracking-tighter truncate">
                <Building2 className="h-3 w-3 shrink-0" /> {customer.legalName}
              </p>

              <div className="flex flex-wrap items-center gap-2 mt-2">
                <Badge
                  variant="outline"
                  className={`capitalize px-2 py-0 text-[10px] whitespace-nowrap ${
                    typeof getStatusBadgeClass === "function" 
                    ? getStatusBadgeClass(customer.status) 
                    : ""
                  }`}
                >
                  {customer.status?.replace("_", " ") || 'Active'}
                </Badge>
                <span className="text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded border whitespace-nowrap">
                  RFC: {customer.rfc}
                </span>
              </div>
            </div>
          </div>

          {/* PERFORMANCE METRICS */}
          <section className="space-y-4">
            <Label className="font-bold flex items-center gap-2 text-primary uppercase text-[10px] tracking-widest">
              <Activity className="h-4 w-4" /> {t('customers.shippingOverview') || "Shipping Overview"}
            </Label>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-card border rounded-xl shadow-sm hover:border-primary/20 transition-colors">
                <p className="text-[9px] uppercase font-bold text-muted-foreground">
                  {t('customers.totalLoads') || "Total Loads"}
                </p>
                <p className="text-lg font-black">
                  {customer.totalLoads || 0}
                </p>
              </div>

              <div className="p-3 bg-card border rounded-xl shadow-sm hover:border-emerald-200 transition-colors">
                <p className="text-[9px] uppercase font-bold text-emerald-600">
                  {t('customers.activeTrips') || "Active Trips"}
                </p>
                <p className="text-lg font-black text-emerald-600">
                  {customer.activeTrips || 0}
                </p>
              </div>
            </div>
          </section>

          {/* FINANCIAL & TAX COMPLIANCE */}
          <section className="space-y-4 pt-4 border-t">
            <Label className="font-bold flex items-center gap-2 text-primary uppercase text-[10px] tracking-widest">
              <CreditCard className="h-4 w-4" /> {t('customers.financialTerms') || "Financial Terms"}
            </Label>

            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 p-4 bg-emerald-50/40 border border-emerald-100 rounded-2xl shadow-sm">
                <p className="text-[9px] text-emerald-700 font-bold uppercase tracking-tight">Credit Limit (MXN)</p>
                <p className="text-2xl font-black text-emerald-600">
                  ${Number(customer.creditLimit || 0).toLocaleString()}
                </p>
                <Separator className="my-3 bg-emerald-100/50" />
                <div className="flex justify-between items-center text-[10px] font-bold text-emerald-700">
                  <div className="flex flex-col">
                    <span className="opacity-60 text-[8px] uppercase">Terms</span>
                    <span>{customer.paymentTerms || "30 Days"}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="opacity-60 text-[8px] uppercase">Method</span>
                    <span>{customer.paymentMethod || "PPD"}</span>
                  </div>
                </div>
              </div>
              
              {/* <InfoCard label="Tax Regime" value={customer.taxRegime || "601"} />
              <InfoCard label="Billing Email" value={customer.billingEmail} /> */}
            </div>
          </section>

          {/* CONTACT INFORMATION */}
          <section className="space-y-4 pt-4 border-t">
            <Label className="font-bold flex items-center gap-2 text-primary uppercase text-[10px] tracking-widest">
              <Phone className="h-4 w-4" /> {t('common.contactDetails') || "Contact Details"}
            </Label>
            
            <div className="grid grid-cols-1 gap-2">
               <ContactLink icon={<Users className="h-3 w-3" />} label="Contact Person" value={customer.contactPersonName} />
               <ContactLink icon={<Phone className="h-3 w-3" />} label="Phone" value={customer.whatsappNumber} />
               <ContactLink icon={<Mail className="h-3 w-3" />} label="Email" value={customer.contactEmail} />
               {/* {customer.address && (
                 <ContactLink icon={<MapPin className="h-3 w-3" />} label="Address" value={customer.address} />
               )}*/}
            </div> 
          </section>

          {/* DOCUMENTS */}
          <section className="space-y-4 pt-4 border-t">
            <Label className="font-bold flex items-center gap-2 text-primary uppercase text-[10px] tracking-widest">
              <FileText className="h-4 w-4" /> {t('drivers.documents')}
            </Label>

            <div className="flex flex-col gap-2">
              {getDocumentUrl("rfc") && (
                <DocLink label={t('customers.viewRfc') || "Tax Status (RFC)"} url={getDocumentUrl("rfc")} />
              )}

              {getDocumentUrl("contract") && (
                <DocLink label={t('customers.viewContract') || "Service Contract"} url={getDocumentUrl("contract")} />
              )}

              {getDocumentUrl("permit") && (
                <DocLink label={t('customers.viewPermit') || "Special Permit"} url={getDocumentUrl("permit")} />
              )}
            </div>
          </section>
        </div>
      </ScrollArea>
    </div>
  );
}

/* ================= MINI COMPONENTS ================= */

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 bg-muted/20 border rounded-xl">
      <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-tighter">{label}</p>
      <p className="text-xs font-bold truncate text-foreground">{value || "—"}</p>
    </div>
  );
}

function ContactLink({ icon, label, value }: any) {
  return (
    <div className="flex items-center gap-3 p-3 bg-card border rounded-xl shadow-sm hover:bg-muted/10 transition-colors">
      <div className="h-8 w-8 shrink-0 rounded-lg bg-muted flex items-center justify-center text-muted-foreground shadow-sm">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[8px] uppercase font-black text-muted-foreground/60 leading-none mb-1">{label}</p>
        <p className="text-[11px] font-bold text-foreground truncate leading-tight">{value || "—"}</p>
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
      className="flex items-center justify-between p-3.5 bg-primary/5 border border-primary/10 rounded-xl hover:bg-primary/10 hover:border-primary/30 transition-all group active:scale-[0.98]"
    >
      <div className="flex items-center gap-3">
        <div className="h-7 w-7 rounded-md bg-white flex items-center justify-center shadow-sm">
           <FileText className="h-4 w-4 text-primary" />
        </div>
        <span className="text-xs font-bold text-primary tracking-tight">{label}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[9px] font-bold uppercase text-primary/40 group-hover:text-primary">View</span>
        <ExternalLink className="h-3 w-3 text-primary/40 group-hover:text-primary transition-colors" />
      </div>
    </a>
  );
}