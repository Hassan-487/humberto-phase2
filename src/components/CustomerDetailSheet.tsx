
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
//   FileText,
//   MapPin
// } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
// import { ScrollArea } from "@/components/ui/scroll-area";

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

//   const getDocumentUrl = (type: string) => {
//     return (
//       customer?.documents?.[`${type}Url`] ||
//       (type === "contract" ? customer?.serviceContractUrl : null) ||
//       (type === "permit" ? customer?.specialPermitUrl : null) ||
//       (type === "rfc" ? customer?.rfcUrl : null)
//     );
//   };

//   return (
//     /* THE FIX: 
//        1. h-full ensures the component matches the Sheet/Drawer height.
//        2. flex-col + min-h-0 allows the ScrollArea to properly calculate space.
//     */
//     <div className="flex flex-col h-full min-h-0 bg-background">
//       <ScrollArea className="flex-1 w-full">
//         {/* INNER CONTAINER: Added larger bottom padding (pb-20) to ensure 
//             mobile users can scroll past the bottom button/safe area */}
//         <div className="p-6 space-y-8 pb-20">
          
//           {/* PROFILE HEADER */}
//           <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border shadow-sm">
//             <div className="h-20 w-20 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center border-2 border-primary/20 shadow-inner">
//               <Users className="h-10 w-10 text-primary" />
//             </div>

//             <div className="space-y-1 flex-1 min-w-0">
//               <h3 className="text-lg font-black text-foreground truncate">
//                 {customer.businessName || customer.legalName}
//               </h3>
//               <p className="text-[10px] text-muted-foreground font-bold flex items-center gap-1 uppercase tracking-tighter truncate">
//                 <Building2 className="h-3 w-3 shrink-0" /> {customer.legalName}
//               </p>

//               <div className="flex flex-wrap items-center gap-2 mt-2">
//                 <Badge
//                   variant="outline"
//                   className={`capitalize px-2 py-0 text-[10px] whitespace-nowrap ${
//                     typeof getStatusBadgeClass === "function" 
//                     ? getStatusBadgeClass(customer.status) 
//                     : ""
//                   }`}
//                 >
//                   {customer.status?.replace("_", " ") || 'Active'}
//                 </Badge>
//                 <span className="text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded border whitespace-nowrap">
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
//               <div className="p-3 bg-card border rounded-xl shadow-sm hover:border-primary/20 transition-colors">
//                 <p className="text-[9px] uppercase font-bold text-muted-foreground">
//                   {t('customers.totalLoads') || "Total Loads"}
//                 </p>
//                 <p className="text-lg font-black">
//                   {customer.totalLoads || 0}
//                 </p>
//               </div>

//               <div className="p-3 bg-card border rounded-xl shadow-sm hover:border-emerald-200 transition-colors">
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
//               <div className="col-span-2 p-4 bg-emerald-50/40 border border-emerald-100 rounded-2xl shadow-sm">
//                 <p className="text-[9px] text-emerald-700 font-bold uppercase tracking-tight">Credit Limit (MXN)</p>
//                 <p className="text-2xl font-black text-emerald-600">
//                   ${Number(customer.creditLimit || 0).toLocaleString()}
//                 </p>
//                 <Separator className="my-3 bg-emerald-100/50" />
//                 <div className="flex justify-between items-center text-[10px] font-bold text-emerald-700">
//                   <div className="flex flex-col">
//                     <span className="opacity-60 text-[8px] uppercase">Terms</span>
//                     <span>{customer.paymentTerms || "30 Days"}</span>
//                   </div>
//                   <div className="flex flex-col text-right">
//                     <span className="opacity-60 text-[8px] uppercase">Method</span>
//                     <span>{customer.paymentMethod || "PPD"}</span>
//                   </div>
//                 </div>
//               </div>
              
//               {/* <InfoCard label="Tax Regime" value={customer.taxRegime || "601"} />
//               <InfoCard label="Billing Email" value={customer.billingEmail} /> */}
//             </div>
//           </section>

//           {/* CONTACT INFORMATION */}
//           <section className="space-y-4 pt-4 border-t">
//             <Label className="font-bold flex items-center gap-2 text-primary uppercase text-[10px] tracking-widest">
//               <Phone className="h-4 w-4" /> {t('common.contactDetails') || "Contact Details"}
//             </Label>
            
//             <div className="grid grid-cols-1 gap-2">
//                <ContactLink icon={<Users className="h-3 w-3" />} label="Contact Person" value={customer.contactPersonName} />
//                <ContactLink icon={<Phone className="h-3 w-3" />} label="Phone" value={customer.whatsappNumber} />
//                <ContactLink icon={<Mail className="h-3 w-3" />} label="Email" value={customer.contactEmail} />
//                {/* {customer.address && (
//                  <ContactLink icon={<MapPin className="h-3 w-3" />} label="Address" value={customer.address} />
//                )}*/}
//             </div> 
//           </section>

//           {/* DOCUMENTS */}
//           <section className="space-y-4 pt-4 border-t">
//             <Label className="font-bold flex items-center gap-2 text-primary uppercase text-[10px] tracking-widest">
//               <FileText className="h-4 w-4" /> {t('drivers.documents')}
//             </Label>

//             <div className="flex flex-col gap-2">
//               {getDocumentUrl("rfc") && (
//                 <DocLink label={t('customers.viewRfc') || "Tax Status (RFC)"} url={getDocumentUrl("rfc")} />
//               )}

//               {getDocumentUrl("contract") && (
//                 <DocLink label={t('customers.viewContract') || "Service Contract"} url={getDocumentUrl("contract")} />
//               )}

//               {getDocumentUrl("permit") && (
//                 <DocLink label={t('customers.viewPermit') || "Special Permit"} url={getDocumentUrl("permit")} />
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
//     <div className="p-3 bg-muted/20 border rounded-xl">
//       <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-tighter">{label}</p>
//       <p className="text-xs font-bold truncate text-foreground">{value || "—"}</p>
//     </div>
//   );
// }

// function ContactLink({ icon, label, value }: any) {
//   return (
//     <div className="flex items-center gap-3 p-3 bg-card border rounded-xl shadow-sm hover:bg-muted/10 transition-colors">
//       <div className="h-8 w-8 shrink-0 rounded-lg bg-muted flex items-center justify-center text-muted-foreground shadow-sm">
//         {icon}
//       </div>
//       <div className="min-w-0">
//         <p className="text-[8px] uppercase font-black text-muted-foreground/60 leading-none mb-1">{label}</p>
//         <p className="text-[11px] font-bold text-foreground truncate leading-tight">{value || "—"}</p>
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
//       className="flex items-center justify-between p-3.5 bg-primary/5 border border-primary/10 rounded-xl hover:bg-primary/10 hover:border-primary/30 transition-all group active:scale-[0.98]"
//     >
//       <div className="flex items-center gap-3">
//         <div className="h-7 w-7 rounded-md bg-white flex items-center justify-center shadow-sm">
//            <FileText className="h-4 w-4 text-primary" />
//         </div>
//         <span className="text-xs font-bold text-primary tracking-tight">{label}</span>
//       </div>
//       <div className="flex items-center gap-1.5">
//         <span className="text-[9px] font-bold uppercase text-primary/40 group-hover:text-primary">View</span>
//         <ExternalLink className="h-3 w-3 text-primary/40 group-hover:text-primary transition-colors" />
//       </div>
//     </a>
//   );
// }
import { useTranslation } from "react-i18next";
import {
  Users,
  Activity,
  CreditCard,
  Building2,
  Mail,
  Phone,
  ExternalLink,
  FileText,
  Pencil,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

import { useCustomers } from "@/hooks/useCustomer";
import { useState } from "react";
import { AddCustomerDialog } from "@/components/AddCustomerDialog";

/* ================= TYPES ================= */

interface CustomerProfileSheetProps {
  customer: any;
  getStatusBadgeClass: (status: string) => string;
}

/* ================= COMPONENT ================= */

export function CustomerProfileSheet({
  customer,
  getStatusBadgeClass,
}: CustomerProfileSheetProps) {
  const { t } = useTranslation();
  const { deleteCustomer } = useCustomers();

  const [editOpen, setEditOpen] = useState(false);

  if (!customer) return null;

  /* ================= HELPERS ================= */

 const getDocumentUrl = (type: string) => {
  const docs =
    customer?.CustomerDocuments ||
    customer?.documents ||
    {};

  if (type === "rfc") {
    return docs.rfcUrl || customer?.rfcUrl || null;
  }

  if (type === "contract") {
    return docs.serviceContractUrl || customer?.serviceContractUrl || null;
  }

  if (type === "permit") {
    return docs.specialPermitUrl || customer?.specialPermitUrl || null;
  }

  return null;
};

  const handleDelete = async () => {
    if (!customer?._id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );
    if (!confirmDelete) return;

    try {
      await deleteCustomer(customer._id);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= UI ================= */

  return (
    // <div className="flex flex-col h-full min-h-0 bg-background">
      <div className="flex flex-col h-[100dvh] max-h-[100dvh]">
      {/* ================= SCROLLABLE CONTENT ================= */}
      {/* <ScrollArea className="flex-1 w-full"> */}
      <ScrollArea className="flex-1 overflow-auto">

        <div className="p-6 space-y-8 pb-24">

          {/* HEADER */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border shadow-sm">
            <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center border-2 border-primary/20">
              <Users className="h-10 w-10 text-primary" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-black truncate">
                {customer.businessName || customer.legalName}
              </h3>

              <p className="text-xs text-muted-foreground flex items-center gap-1 truncate">
                <Building2 className="h-3 w-3" />
                {customer.legalName}
              </p>

              <div className="flex items-center gap-2 mt-2">
                <Badge className={getStatusBadgeClass(customer.status)}>
                  {customer.status || "Active"}
                </Badge>

                <span className="text-xs font-mono bg-muted px-2 py-1 rounded">
                  RFC: {customer.rfc || "_"}
                </span>
              </div>
            </div>
          </div>

          {/* METRICS */}
          <section>
            <Label className="font-bold text-primary text-xs uppercase">
              {t("customers.shippingOverview") || "Shipping Overview"}
            </Label>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <InfoCard label="Total Loads" value={customer.totalLoads || 0} />
              <InfoCard label="Active Trips" value={customer.activeTrips || 0} />
            </div>
          </section>

          {/* FINANCIAL */}
          <section>
            <Label className="font-bold text-primary text-xs uppercase">
              {t("customers.financialTerms") || "Financial"}
            </Label>

            <div className="mt-3 p-4 border rounded-xl">
              <p className="text-xs text-muted-foreground">Credit Limit</p>
              <p className="text-xl font-bold">
                ${Number(customer.creditLimit || 0).toLocaleString()}
              </p>

              <Separator className="my-2" />

              <div className="flex justify-between text-xs">
                <span>{customer.paymentTerms || "30 Days"}</span>
                <span>{customer.paymentMethod || "PPD"}</span>
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section>
            <Label className="font-bold text-primary text-xs uppercase">
              {t("common.contactDetails") || "Contact"}
            </Label>

            <div className="space-y-2 mt-3">
              <ContactRow label="Person" value={customer.contactPersonName} />
              <ContactRow label="Phone" value={customer.whatsappNumber} />
              <ContactRow label="Email" value={customer.contactEmail} />
            </div>
          </section>

          {/* DOCUMENTS */}
          <section>
            <Label className="font-bold text-primary text-xs uppercase">
              Documents
            </Label>

            <div className="space-y-2 mt-3">
              {getDocumentUrl("rfc") && (
                <DocLink label="RFC" url={getDocumentUrl("rfc")} />
              )}
              {getDocumentUrl("contract") && (
                <DocLink label="Contract" url={getDocumentUrl("contract")} />
              )}
              {getDocumentUrl("permit") && (
                <DocLink label="Permit" url={getDocumentUrl("permit")} />
              )}
            </div>
          </section>

        </div>
      </ScrollArea>

      {/* ================= ACTION BUTTONS ================= */}
      <div className="p-4 border-t bg-white sticky bottom-0 z-50 flex gap-3 bg-white">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => setEditOpen(true)}
        >
          <Pencil className="h-4 w-4 mr-2" />
          Edit
        </Button>

        <Button
          variant="destructive"
          className="flex-1"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>

      {/* ================= EDIT POPUP ================= */}
      <AddCustomerDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        initialData={customer}
      />
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

function InfoCard({ label, value }: any) {
  return (
    <div className="p-3 border rounded-xl">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-bold">{value}</p>
    </div>
  );
}

function ContactRow({ label, value }: any) {
  return (
    <div className="flex justify-between text-sm border p-2 rounded">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value || "_"}</span>
    </div>
  );
}

function DocLink({ label, url }: any) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex justify-between border p-2 rounded hover:bg-muted"
    >
      <span>{label}</span>
      <ExternalLink className="h-4 w-4" />
    </a>
  );
}