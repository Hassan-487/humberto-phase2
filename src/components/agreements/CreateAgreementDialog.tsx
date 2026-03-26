

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
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";
// import { LargeMapPicker } from "@/components/LargeMapPicker";
// import { useCustomers } from "@/hooks/useCustomer";
// import { AddCustomerDialog } from "@/components/AddCustomerDialog";
// import { useAgreements } from "@/hooks/useAgreement";
// import { 
//   MapPin, 
//   Loader2, 
//   FileSignature, 
//   Plus, 
//   Navigation2, 
//   Truck, 
//   DollarSign, 
//   ArrowRightLeft 
// } from "lucide-react";

// export function CreateAgreementDialog({ open, onClose }: any) {
//   const { customers } = useCustomers();
//   const { createAgreement } = useAgreements();

//   const [loading, setLoading] = useState(false);
//   const [openAddCustomer, setOpenAddCustomer] = useState(false);
//   const [mapMode, setMapMode] = useState<"origin" | "destination" | null>(null);

//   const [form, setForm] = useState({
//     customerId: "",
//     originAddress: "",
//     originLocation: null as any,
//     destinationAddress: "",
//     destinationLocation: null as any,
//     tripType: "one_way",
//     trailerMode: "single",
//     trailerType: "container",
//     tripDistance: "",
//     tripPrice: "",
//   });

//   const setF = (k: string, v: any) => setForm((p) => ({ ...p, [k]: v }));

//   const submit = async () => {
//     setLoading(true);
//     try {
//       const payload = {
//         customer: form.customerId,
//         originAddress: form.originAddress,
//         originLocation: form.originLocation,
//         destinationAddress: form.destinationAddress,
//         destinationLocation: form.destinationLocation,
//         tripType: form.tripType.toUpperCase(),
//         trailerMode: form.trailerMode.toUpperCase(),
//         trailerType: form.trailerType.toUpperCase(),
//         tripDistanceKm: Number(form.tripDistance),
//         tripPrice: Number(form.tripPrice),
//       };
//       await createAgreement(payload);
//       onClose();
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Dialog open={open} onOpenChange={onClose}>
//         <DialogContent className="max-w-2xl h-[90vh] p-0 flex flex-col overflow-hidden">
//           {/* HEADER */}
//           <DialogHeader className="p-6 pb-4">
//             <div className="flex gap-4 items-center">
//               <div className="bg-primary/10 p-2.5 rounded-xl">
//                 <FileSignature className="h-6 w-6 text-primary" />
//               </div>
//               <div>
//                 <DialogTitle className="text-xl font-bold">New Service Agreement</DialogTitle>
//                 <DialogDescription>Define routes, equipment, and pricing for this customer.</DialogDescription>
//               </div>
//             </div>
//           </DialogHeader>

//           <Separator />

//           {/* BODY */}
//           <ScrollArea className="flex-1 px-6">
//             <div className="space-y-8 py-6">
              
//               {/* CUSTOMER SELECTION */}
//               <section className="space-y-4">
//                 <SectionTitle icon={<Plus className="h-4 w-4" />}>Client Assignment</SectionTitle>
//                 <div className="flex gap-3 items-end bg-slate-50 p-4 rounded-xl border border-slate-100">
//                   <div className="flex-1 space-y-2">
//                     <Label className="text-[11px] font-bold uppercase text-slate-500">Select Customer</Label>
//                     <Select value={form.customerId} onValueChange={(v) => setF("customerId", v)}>
//                       <SelectTrigger className="bg-white">
//                         <SelectValue placeholder="Choose a registered company" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {customers?.map((c: any) => (
//                           <SelectItem key={c._id} value={c._id}>
//                             {c.legalName}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <Button 
//                     variant="outline" 
//                     className="bg-white border-dashed border-2 hover:border-primary hover:text-primary transition-all"
//                     onClick={() => setOpenAddCustomer(true)}
//                   >
//                     New Client
//                   </Button>
//                 </div>
//               </section>

//               {/* ROUTE CONFIGURATION */}
//               <section className="space-y-4">
//                 <SectionTitle icon={<Navigation2 className="h-4 w-4" />}>Route Details</SectionTitle>
//                 <div className="space-y-4">
//                   {/* Origin */}
//                   <div className="relative pl-6 border-l-2 border-dashed border-slate-200 ml-3 space-y-3">
//                     <div className="absolute -left-[9px] top-0 bg-emerald-500 h-4 w-4 rounded-full border-4 border-white shadow-sm" />
//                     <InputField
//                       label="Origin Address"
//                       placeholder="Loading Point"
//                       value={form.originAddress}
//                       onChange={(v) => setF("originAddress", v)}
//                     />
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="text-[10px] h-7 text-primary hover:bg-primary/5 uppercase font-bold"
//                       onClick={() => setMapMode("origin")}
//                     >
//                       <MapPin className="h-3 w-3 mr-1" /> Pin on Map
//                     </Button>
//                   </div>

//                   {/* Destination */}
//                   <div className="relative pl-6 ml-3 space-y-3">
//                     <div className="absolute -left-[9px] top-0 bg-red-500 h-4 w-4 rounded-full border-4 border-white shadow-sm" />
//                     <InputField
//                       label="Destination Address"
//                       placeholder="Unloading Point"
//                       value={form.destinationAddress}
//                       onChange={(v) => setF("destinationAddress", v)}
//                     />
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="text-[10px] h-7 text-primary hover:bg-primary/5 uppercase font-bold"
//                       onClick={() => setMapMode("destination")}
//                     >
//                       <MapPin className="h-3 w-3 mr-1" /> Pin on Map
//                     </Button>
//                   </div>
//                 </div>
//               </section>

//               {/* EQUIPMENT & MODE */}
//               <section className="space-y-4">
//                 <SectionTitle icon={<Truck className="h-4 w-4" />}>Equipment Configuration</SectionTitle>
//                 <div className="grid grid-cols-3 gap-4 bg-slate-50/50 p-4 rounded-xl border">
//                   <SelectGroup 
//                     label="Trip Type" 
//                     value={form.tripType} 
//                     onValueChange={(v) => setF("tripType", v)}
//                     options={[
//                       { label: "One Way", value: "one_way" },
//                       { label: "Round Trip", value: "round_trip" }
//                     ]}
//                   />
//                   <SelectGroup 
//                     label="Mode" 
//                     value={form.trailerMode} 
//                     onValueChange={(v) => setF("trailerMode", v)}
//                     options={[
//                       { label: "Sencillo (Single)", value: "single" },
//                       { label: "Full (Double)", value: "double" }
//                     ]}
//                   />
//                   <SelectGroup 
//                     label="Trailer" 
//                     value={form.trailerType} 
//                     onValueChange={(v) => setF("trailerType", v)}
//                     options={[
//                       { label: "Container", value: "container" },
//                       { label: "Platform", value: "platform" },
//                       { label: "Dry Box", value: "dry_box" }
//                     ]}
//                   />
//                 </div>
//               </section>

//               {/* FINANCIALS */}
//               <section className="space-y-4 pb-4">
//                 <SectionTitle icon={<DollarSign className="h-4 w-4" />}>Rates & Distance</SectionTitle>
//                 <div className="grid grid-cols-2 gap-6">
//                   <div className="space-y-2">
//                     <Label className="text-[11px] font-bold uppercase">Estimated Distance (KM)</Label>
//                     <div className="relative">
//                       <Input 
//                         type="number" 
//                         className="pl-9" 
//                         value={form.tripDistance}
//                         onChange={(e) => setF("tripDistance", e.target.value)}
//                       />
//                       <ArrowRightLeft className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <Label className="text-[11px] font-bold uppercase text-primary">Agreed Price (MXN)</Label>
//                     <div className="relative">
//                       <Input 
//                         type="number" 
//                         className="pl-9 border-primary/30 focus-visible:ring-primary/20 bg-primary/[0.02]" 
//                         value={form.tripPrice}
//                         onChange={(e) => setF("tripPrice", e.target.value)}
//                       />
//                       <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-primary" />
//                     </div>
//                   </div>
//                 </div>
//               </section>
//             </div>
//           </ScrollArea>

//           <Separator />

//           {/* FOOTER */}
//           <DialogFooter className="p-6 bg-slate-50">
//             <Button variant="ghost" onClick={onClose}>Cancel</Button>
//             <Button onClick={submit} disabled={loading} className="min-w-[150px]">
//               {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Authorize Agreement"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Map Modal */}
//       {mapMode && (
//         <LargeMapPicker
//           mode={mapMode}
//           existingLocations={{
//             origin: form.originLocation,
//             destination: form.destinationLocation
//           }}
//           onSelect={(loc) => {
//             if (mapMode === "origin") {
//               setF("originLocation", loc);
//               setF("originAddress", loc.address);
//             } else {
//               setF("destinationLocation", loc);
//               setF("destinationAddress", loc.address);
//             }
//             setMapMode(null);
//           }}
//         />
//       )}

//       {/* Reused Add Customer Dialog */}
//       <AddCustomerDialog
//         open={openAddCustomer}
//         onClose={() => setOpenAddCustomer(false)}
//       />
//     </>
//   );
// }

// /* ================= HELPERS ================= */

// function SectionTitle({ icon, children }: any) {
//   return (
//     <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest">
//       {icon} {children}
//     </div>
//   );
// }

// function InputField({ label, value, onChange, placeholder }: any) {
//   return (
//     <div className="space-y-1.5">
//       <Label className="text-[11px] font-bold text-slate-600 uppercase">{label}</Label>
//       <Input
//         value={value}
//         placeholder={placeholder}
//         onChange={(e) => onChange(e.target.value)}
//         className="h-10 bg-white"
//       />
//     </div>
//   );
// }

// function SelectGroup({ label, value, onValueChange, options }: any) {
//   return (
//     <div className="space-y-1.5">
//       <Label className="text-[11px] font-bold text-slate-600 uppercase">{label}</Label>
//       <Select value={value} onValueChange={onValueChange}>
//         <SelectTrigger className="bg-white h-9 text-xs">
//           <SelectValue />
//         </SelectTrigger>
//         <SelectContent>
//           {options.map((opt: any) => (
//             <SelectItem key={opt.value} value={opt.value} className="text-xs">
//               {opt.label}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { LargeMapPicker } from "@/components/LargeMapPicker";
import { useCustomers } from "@/hooks/useCustomer";
import { AddCustomerDialog } from "@/components/AddCustomerDialog";
import { useAgreements } from "@/hooks/useAgreement";
import {
  MapPin,
  Loader2,
  FileSignature,
  Plus,
  Navigation2,
  Truck,
  DollarSign,
  ArrowRightLeft,
} from "lucide-react";

export function CreateAgreementDialog({ open, onClose }: any) {
  const { customers } = useCustomers();
  const { createAgreement } = useAgreements();

  const [loading, setLoading] = useState(false);
  const [openAddCustomer, setOpenAddCustomer] = useState(false);

  // ✅ INLINE MAP STATES
  const [showOriginMap, setShowOriginMap] = useState(false);
  const [showDestinationMap, setShowDestinationMap] = useState(false);

  const [form, setForm] = useState({
    customerId: "",
    originAddress: "",
    originLocation: null as any,
    destinationAddress: "",
    destinationLocation: null as any,
    tripType: "one_way",
    trailerMode: "single",
    trailerType: "container",
    tripDistance: "",
    tripPrice: "",
  });

  const setF = (k: string, v: any) =>
    setForm((p) => ({ ...p, [k]: v }));

  const submit = async () => {
    setLoading(true);
    try {
      const payload = {
        customer: form.customerId,
        originAddress: form.originAddress,
        originLocation: form.originLocation,
        destinationAddress: form.destinationAddress,
        destinationLocation: form.destinationLocation,
        tripType: form.tripType.toUpperCase(),
        trailerMode: form.trailerMode.toUpperCase(),
        trailerType: form.trailerType.toUpperCase(),
        tripDistanceKm: Number(form.tripDistance),
        tripPrice: Number(form.tripPrice),
      };

      await createAgreement(payload);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl h-[90vh] p-0 flex flex-col overflow-hidden">
          
          {/* HEADER */}
          <DialogHeader className="p-6 pb-4">
            <div className="flex gap-4 items-center">
              <div className="bg-primary/10 p-2.5 rounded-xl">
                <FileSignature className="h-6 w-6 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold">
                  New Service Agreement
                </DialogTitle>
                <DialogDescription>
                  Define routes, equipment, and pricing for this customer.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <Separator />

          {/* BODY */}
          <ScrollArea className="flex-1 px-6">
            <div className="space-y-8 py-6">

              {/* CUSTOMER */}
              <section className="space-y-4">
                <SectionTitle icon={<Plus className="h-4 w-4" />}>
                  Client Assignment
                </SectionTitle>

                <div className="flex gap-3 items-end bg-slate-50 p-4 rounded-xl border">
                  <div className="flex-1 space-y-2">
                    <Label className="text-[11px] font-bold uppercase">
                      Select Customer
                    </Label>

                    <Select
                      value={form.customerId}
                      onValueChange={(v) => setF("customerId", v)}
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Choose customer" />
                      </SelectTrigger>

                      <SelectContent>
                        {customers?.map((c: any) => (
                          <SelectItem key={c._id} value={c._id}>
                            {c.legalName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setOpenAddCustomer(true)}
                  >
                    New Client
                  </Button>
                </div>
              </section>

              {/* ROUTE */}
              <section className="space-y-4">
                <SectionTitle icon={<Navigation2 className="h-4 w-4" />}>
                  Route Details
                </SectionTitle>

                {/* ORIGIN */}
                <div className="pl-6 border-l-2 border-dashed ml-3 space-y-3">
                  <InputField
                    label="Origin Address"
                    value={form.originAddress}
                    onChange={(v) => setF("originAddress", v)}
                  />

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setShowOriginMap((prev) => !prev)
                    }
                  >
                    <MapPin className="h-3 w-3 mr-1" />
                    {showOriginMap ? "Hide Map" : "Pin on Map"}
                  </Button>

                  {showOriginMap && (
                    <div className="h-[300px] border rounded-xl overflow-hidden">
                      <LargeMapPicker
                        mode="origin"
                        existingLocations={{
                          origin: form.originLocation,
                          destination: form.destinationLocation,
                        }}
                        onSelect={(loc) => {
                          setF("originLocation", loc);
                          setF("originAddress", loc.address);
                          setShowOriginMap(false);
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* DESTINATION */}
                <div className="pl-6 ml-3 space-y-3">
                  <InputField
                    label="Destination Address"
                    value={form.destinationAddress}
                    onChange={(v) => setF("destinationAddress", v)}
                  />

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setShowDestinationMap((prev) => !prev)
                    }
                  >
                    <MapPin className="h-3 w-3 mr-1" />
                    {showDestinationMap ? "Hide Map" : "Pin on Map"}
                  </Button>

                  {showDestinationMap && (
                    <div className="h-[300px] border rounded-xl overflow-hidden">
                      <LargeMapPicker
                        mode="destination"
                        existingLocations={{
                          origin: form.originLocation,
                          destination: form.destinationLocation,
                        }}
                        onSelect={(loc) => {
                          setF("destinationLocation", loc);
                          setF("destinationAddress", loc.address);
                          setShowDestinationMap(false);
                        }}
                      />
                    </div>
                  )}
                </div>
              </section>

              {/* CONFIG */}
              <section className="space-y-4">
                <SectionTitle icon={<Truck className="h-4 w-4" />}>
                  Equipment
                </SectionTitle>

                <div className="grid grid-cols-3 gap-4">
                  <SelectGroup
                    label="Trip Type"
                    value={form.tripType}
                    onValueChange={(v) => setF("tripType", v)}
                    options={[
                      { label: "One Way", value: "one_way" },
                      { label: "Round Trip", value: "round_trip" },
                    ]}
                  />

                  <SelectGroup
                    label="Mode"
                    value={form.trailerMode}
                    onValueChange={(v) => setF("trailerMode", v)}
                    options={[
                      { label: "Single", value: "single" },
                      { label: "Double", value: "double" },
                    ]}
                  />

                  <SelectGroup
                    label="Trailer"
                    value={form.trailerType}
                    onValueChange={(v) => setF("trailerType", v)}
                    options={[
                      { label: "Container", value: "container" },
                      { label: "Platform", value: "platform" },
                      { label: "Dry Box", value: "dry_box" },
                    ]}
                  />
                </div>
              </section>

              {/* FINANCIAL */}
              <section className="space-y-4 pb-4">
                <SectionTitle icon={<DollarSign className="h-4 w-4" />}>
                  Pricing
                </SectionTitle>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="number"
                    placeholder="Distance KM"
                    value={form.tripDistance}
                    onChange={(e) =>
                      setF("tripDistance", e.target.value)
                    }
                  />

                  <Input
                    type="number"
                    placeholder="Price"
                    value={form.tripPrice}
                    onChange={(e) =>
                      setF("tripPrice", e.target.value)
                    }
                  />
                </div>
              </section>

            </div>
          </ScrollArea>

          <Separator />

          {/* FOOTER */}
          <DialogFooter className="p-6">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={submit} disabled={loading}>
              {loading ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                "Create Agreement"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AddCustomerDialog
        open={openAddCustomer}
        onClose={() => setOpenAddCustomer(false)}
      />
    </>
  );
}

/* HELPERS */

function SectionTitle({ icon, children }: any) {
  return (
    <div className="flex items-center gap-2 font-bold text-xs uppercase text-primary">
      {icon} {children}
    </div>
  );
}

function InputField({ label, value, onChange }: any) {
  return (
    <div className="space-y-1">
      <Label className="text-xs font-bold uppercase">{label}</Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function SelectGroup({ label, value, onValueChange, options }: any) {
  return (
    <div className="space-y-1">
      <Label className="text-xs font-bold uppercase">{label}</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o: any) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}