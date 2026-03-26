
import { useState } from "react";
import {
  ChevronLeft, ChevronRight, MapPin, Building2, Package,
  Check, Navigation2, Plus, Trash2, Users, User, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useCreateTrip,usePreExpenses, useAssignTrip} from "@/hooks/useTrips";
import { useCustomers } from "@/hooks/useCustomer";
import { LargeMapPicker } from "@/components/LargeMapPicker";
import { AddCompanyDialog } from "@/components/AddCompanyDialog";
import { useAgreements } from "@/hooks/useAgreement";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type Location = { latitude: number; longitude: number; address?: string } | null;

type MapTarget =
  | { scope: "route"; field: "origin" | "destination" | "end" }
  | { scope: "container"; index: number; field: "pickup" | "delivery" }
  | null;

type CustomerMode = "single" | "multiple" | null;
type ContainerLocationMode = "same" | "different" | null;

type Container = {
  customerId: string;
  pickupAddress: string;
  pickupLocation: Location;
  pickupDate: string;
  pickupHour: string;
  deliveryAddress: string;
  deliveryLocation: Location;
  deliveryDate: string;
  deliveryHour: string;
  containerNumber: string;
  sealNumber: string;
};

type RouteForm = {
  originAddress: string;
  originLocation: Location;
  destinationAddress: string;
  destinationLocation: Location;
  tripEndAddress: string;
  tripEndLocation: Location;
  tripType: string;
  trailerMode: string;
  trailerType: string;
  pickupDate: string;
  pickupHour: string;
  deliveryDate: string;
  deliveryHour: string;
  tripDistance: string;
  tripPrice: string;
};

const EMPTY_ROUTE: RouteForm = {
  originAddress: "", originLocation: null,
  destinationAddress: "", destinationLocation: null,
  tripEndAddress: "", tripEndLocation: null,
  tripType: "one_way",
  trailerMode: "single",
  trailerType: "container",
  pickupDate: "", pickupHour: "",
  deliveryDate: "", deliveryHour: "",
  tripDistance: "", tripPrice: "",
};

const EMPTY_CONTAINER = (): Container => ({
  customerId: "",
  pickupAddress: "", pickupLocation: null, pickupDate: "", pickupHour: "",
  deliveryAddress: "", deliveryLocation: null, deliveryDate: "", deliveryHour: "",
  containerNumber: "", sealNumber: "",
});

const STEPS = [
  { id: 1, label: "Customer Mode", icon: Users },
  { id: 2, label: "Customer", icon: Building2 },
  { id: 3, label: "Agreement", icon: Check },
  { id: 4, label: "Route", icon: MapPin },
  { id: 5, label: "Containers", icon: Package },
  { id: 6, label: "Review", icon: Check },
];

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function CreateTripPage({
  onBack,
  onCreated,
}: {
  onBack: () => void;
  onCreated: () => void;
}) {
  const { customers } = useCustomers();
  const { mutateAsync, isPending } = useCreateTrip();
const {agreements}=useAgreements();
const [agreementOne, setAgreementOne] = useState("");
const [agreementTwo, setAgreementTwo] = useState("");

  const [step, setStep] = useState(1);
  const [mapTarget, setMapTarget] = useState<MapTarget>(null);
  const [openAddCompany, setOpenAddCompany] = useState(false);

  // Step 1
  const [route, setRoute] = useState<RouteForm>(EMPTY_ROUTE);
  const setR = (k: keyof RouteForm, v: any) => setRoute((p) => ({ ...p, [k]: v }));

  // Step 2
  const [customerMode, setCustomerMode] = useState<CustomerMode>(null);
  const [singleCustomerId, setSingleCustomerId] = useState("");
  const [containerLocationMode, setContainerLocationMode] = useState<ContainerLocationMode>(null);

  const [sharedPickup, setSharedPickup] = useState({
    address: "", location: null as Location, date: "", hour: "",
  });
  const [sharedDelivery, setSharedDelivery] = useState({
    address: "", location: null as Location, date: "", hour: "",
  });
  const [sharedPickupMapOpen, setSharedPickupMapOpen] = useState(false);
  const [sharedDeliveryMapOpen, setSharedDeliveryMapOpen] = useState(false);

  // Step 3
  const [containers, setContainers] = useState<Container[]>([EMPTY_CONTAINER()]);

  const setContainer = (i: number, k: keyof Container, v: any) => {
    setContainers((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], [k]: v };
      return next;
    });
  };

  ///new updates 
const { mutateAsync: assignTripApi } = useAssignTrip();
const { mutateAsync: preExpenseApi } = usePreExpenses();

const assignTrip = async (tripId: string) => {
  await assignTripApi({
    id: tripId,
    payload: {
      carrierType: "INTERNAL",
      businessUnit: "Mexico Operations",
      truckId: "6994ebb075f24ca44a3a5caa",
      driverId: "6994eacd75f24ca44a3a5c82",
      internalTripNumber: "AUTO-001",
      assignmentInvoice: "AUTO-INV",
      tripPrice: Number(route.tripPrice),
    },
  });

  await preExpenseApi({
    id: tripId,
    payload: {
      estimatedDiesel: 200,
      estimatedDef: 50,
      estimatedCashTolls: 300,
      estimatedDriverFood: 150,
      estimatedOther: 100,
      notes: "Auto estimated",
    },
  });
};


  const addContainer = () => setContainers((p) => [...p, EMPTY_CONTAINER()]);
  const removeContainer = (i: number) =>
    setContainers((p) => p.filter((_, j) => j !== i));

  // Map open/close helpers
  const openRouteMap = (field: "origin" | "destination" | "end") => {
    setMapTarget({ scope: "route", field });
  };
  const openContainerMap = (index: number, field: "pickup" | "delivery") => {
    setMapTarget({ scope: "container", index, field });
  };
  const closeMap = () => setMapTarget(null);

  const handleMapSelect = (loc: Location) => {
    if (!mapTarget) return;
    if (mapTarget.scope === "route") {
      const fieldMap = {
        origin: ["originLocation", "originAddress"],
        destination: ["destinationLocation", "destinationAddress"],
        end: ["tripEndLocation", "tripEndAddress"],
      } as const;
      const [locKey, addrKey] = fieldMap[mapTarget.field];
      setR(locKey as keyof RouteForm, loc);
      if (loc?.address) setR(addrKey as keyof RouteForm, loc.address);
    } else {
      const { index, field } = mapTarget;
      if (field === "pickup") {
        setContainer(index, "pickupLocation", loc);
        if (loc?.address) setContainer(index, "pickupAddress", loc.address);
      } else {
        setContainer(index, "deliveryLocation", loc);
        if (loc?.address) setContainer(index, "deliveryAddress", loc.address);
      }
    }
    closeMap();
  };

const handleSubmit = async () => {
  try {
    // ✅ VALIDATION
    if (!route.originAddress || !route.destinationAddress) {
      alert("Origin & Destination required");
      return;
    }

    if (!route.tripDistance) {
      alert("Trip distance required");
      return;
    }

    if (customerMode === "single" && !singleCustomerId) {
      alert("Select customer");
      return;
    }

    if (!agreementOne) {
  alert("Agreement 1 required");
  return;
}

if (customerMode === "multiple" && !agreementTwo) {
  alert("Agreement 2 required");
  return;
}

    for (let i = 0; i < containers.length; i++) {
      const c = containers[i];

      const customerId =
        customerMode === "single" ? singleCustomerId : c.customerId;

      if (!customerId) {
        alert(`Container ${i + 1}: Customer required`);
        return;
      }

      const pickupAddress =
        containerLocationMode === "same"
          ? sharedPickup.address
          : c.pickupAddress;

      const deliveryAddress =
        containerLocationMode === "same"
          ? sharedDelivery.address
          : c.deliveryAddress;

      if (!pickupAddress || !deliveryAddress) {
        alert(`Container ${i + 1}: Pickup & Delivery required`);
        return;
      }

      if (!c.containerNumber) {
        alert(`Container ${i + 1}: Container number required`);
        return;
      }
    }

    // ✅ PAYLOAD BUILD
    const payload = {
      tripType: route.tripType.toUpperCase(),
      trailerMode: route.trailerMode.toUpperCase(),
      trailerType: route.trailerType.toUpperCase(),

      origin: route.originAddress,
      destination: route.destinationAddress,
      tripDistanceKm: Number(route.tripDistance),

      // ✅ MULTI AGREEMENT SUPPORT
     agreementCustomerOne: agreementOne,
agreementCustomerTwo:
  customerMode === "multiple" ? agreementTwo : undefined,

      containers: containers.map((c) => {
        const customerId =
          customerMode === "single" ? singleCustomerId : c.customerId;

        return {
          customer: customerId,
          customerName: customerName(customerId),

          pickupCity:
            containerLocationMode === "same"
              ? sharedPickup.address
              : c.pickupAddress,

          pickupAddress:
            containerLocationMode === "same"
              ? sharedPickup.address
              : c.pickupAddress,

          pickupDate:
            containerLocationMode === "same"
              ? sharedPickup.date
              : c.pickupDate,

          pickupHour:
            containerLocationMode === "same"
              ? sharedPickup.hour
              : c.pickupHour,

          deliveryCity:
            containerLocationMode === "same"
              ? sharedDelivery.address
              : c.deliveryAddress,

          deliveryAddress:
            containerLocationMode === "same"
              ? sharedDelivery.address
              : c.deliveryAddress,

          deliveryDate:
            containerLocationMode === "same"
              ? sharedDelivery.date
              : c.deliveryDate,

          deliveryHour:
            containerLocationMode === "same"
              ? sharedDelivery.hour
              : c.deliveryHour,

          containerNumber: c.containerNumber,
          ContainerPrice: 0,
        };
      }),

      notes: "Trip created from UI",
    };

    console.log("FINAL PAYLOAD:", payload);

    const trip = await mutateAsync(payload);

    await assignTrip(trip._id);

    onCreated();

  } catch (err) {
    console.error(err);
    alert("Failed to create trip");
  }
};

  const activeRouteMap = mapTarget?.scope === "route" ? mapTarget.field : null;

  const customerName = (id: string) =>
    customers?.find((c: any) => c._id === id)?.legalName ?? id;

  return (
    <div className="flex flex-col min-h-screen bg-background">

      {/* ── Sticky top bar ── */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b shadow-sm">
        <div className="flex items-center gap-4 px-6 py-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full shrink-0">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Navigation2 className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold tracking-tight">Create New Trip</h2>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex px-6 pb-3 gap-0">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const done = step > s.id;
            const active = step === s.id;
            return (
              <div key={s.id} className="flex items-center gap-0 flex-1">
                <button
                  className={[
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all",
                    active ? "bg-primary text-primary-foreground shadow" : "",
                    done ? "text-emerald-600 cursor-pointer hover:bg-emerald-50" : "",
                    !active && !done ? "text-muted-foreground" : "",
                  ].join(" ")}
                  onClick={() => done && setStep(s.id)}
                >
                  {done ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Icon className="h-3.5 w-3.5" />
                  )}
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-px mx-1 ${done ? "bg-emerald-300" : "bg-border"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">

{step === 1 && (
  <div className="space-y-8">
    <StepHeader
      icon={<Users className="h-5 w-5" />}
      title="Step 1 – Customer Mode"
      subtitle="Select whether this trip has one or multiple customers."
    />

    <div className="grid grid-cols-2 gap-4">
      <ModeCard
        icon={<User className="h-8 w-8" />}
        title="Single Customer"
        description="All containers belong to one customer."
        selected={customerMode === "single"}
        onClick={() => {
          setCustomerMode("single");
          setContainerLocationMode(null);
        }}
      />

      <ModeCard
        icon={<Users className="h-8 w-8" />}
        title="Multiple Customers"
        description="Different customers per container."
        selected={customerMode === "multiple"}
        onClick={() => {
          setCustomerMode("multiple");
          setContainerLocationMode(null);
        }}
      />
    </div>
  </div>
)}
         
  
          {/* STEP 2 – CUSTOMER MODE */}
          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <StepHeader
                icon={<Building2 className="h-5 w-5" />}
                title="Step 2 – Select Customer"
                subtitle="Choose customer(s) for this trip."
              />

              {/* <div className="grid grid-cols-2 gap-4">
                <ModeCard
                  icon={<User className="h-8 w-8" />}
                  title="Single Customer"
                  description="All containers belong to one customer."
                  selected={customerMode === "single"}
                  onClick={() => { setCustomerMode("single"); setContainerLocationMode(null); }}
                />
                <ModeCard
                  icon={<Users className="h-8 w-8" />}
                  title="Multiple Customers"
                  description="Containers belong to different customers with individual pickup & delivery."
                  selected={customerMode === "multiple"}
                  onClick={() => { setCustomerMode("multiple"); setContainerLocationMode(null); }}
                />
              </div> */}

              {customerMode === "single" && (
                <SectionCard title="Select Customer">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Customer">
                      <Select value={singleCustomerId} onValueChange={setSingleCustomerId}>
                        <SelectTrigger><SelectValue placeholder="Select customer" /></SelectTrigger>
                        <SelectContent>
                          {customers?.map((c: any) => (
                            <SelectItem key={c._id} value={c._id}>{c.legalName}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormField>
                    <div className="flex items-end">
                      <Button type="button" variant="outline" className="w-full" onClick={() => setOpenAddCompany(true)}>
                        + Add New Customer
                      </Button>
                    </div>
                  </div>

                  {singleCustomerId && (
                    <div className="mt-6">
                      <p className="text-sm font-semibold mb-3">Container Location Setup</p>
                      <div className="grid grid-cols-2 gap-4">
                        <ModeCard
                          icon={<MapPin className="h-6 w-6" />}
                          title="Same Pickup & Delivery"
                          description="All containers share the same pickup and delivery locations."
                          selected={containerLocationMode === "same"}
                          compact
                          onClick={() => setContainerLocationMode("same")}
                        />
                        <ModeCard
                          icon={<Navigation2 className="h-6 w-6" />}
                          title="Different Locations"
                          description="Each container has its own pickup and delivery address."
                          selected={containerLocationMode === "different"}
                          compact
                          onClick={() => setContainerLocationMode("different")}
                        />
                      </div>
                    </div>
                  )}

                  {containerLocationMode === "same" && (
                    <div className="mt-6 space-y-5 border-t pt-5">
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Shared Pickup & Delivery
                      </p>

                      <div className="space-y-3">
                        <Label>Pickup Address</Label>
                        <Input
                          placeholder="Pickup Address"
                          value={sharedPickup.address}
                          onChange={(e) => setSharedPickup((p) => ({ ...p, address: e.target.value }))}
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant={sharedPickupMapOpen ? "default" : "outline"}
                          className="w-full text-xs"
                          onClick={() => { setSharedPickupMapOpen((p) => !p); setSharedDeliveryMapOpen(false); }}
                        >
                          {sharedPickup.location ? "Pickup Pinned ✓" : "Pin Pickup on Map"}
                        </Button>
                        {sharedPickupMapOpen && (
                          <MapPickerInline
                            title="Select Shared Pickup"
                            mode="origin"
                            existingLocations={{ origin: sharedPickup.location, destination: null, end: null }}
                            onSelect={(loc) => {
                              setSharedPickup((p) => ({ ...p, location: loc, address: loc?.address ?? p.address }));
                              setSharedPickupMapOpen(false);
                            }}
                            onClose={() => setSharedPickupMapOpen(false)}
                          />
                        )}
                        <div className="grid grid-cols-2 gap-3 mt-1">
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Pickup Date</Label>
                            <Input type="date" value={sharedPickup.date} onChange={(e) => setSharedPickup((p) => ({ ...p, date: e.target.value }))} />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Pickup Hour</Label>
                            <Input type="time" value={sharedPickup.hour} onChange={(e) => setSharedPickup((p) => ({ ...p, hour: e.target.value }))} />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 pt-2">
                        <Label>Delivery Address</Label>
                        <Input
                          placeholder="Delivery Address"
                          value={sharedDelivery.address}
                          onChange={(e) => setSharedDelivery((p) => ({ ...p, address: e.target.value }))}
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant={sharedDeliveryMapOpen ? "default" : "outline"}
                          className="w-full text-xs"
                          onClick={() => { setSharedDeliveryMapOpen((p) => !p); setSharedPickupMapOpen(false); }}
                        >
                          {sharedDelivery.location ? "Delivery Pinned ✓" : "Pin Delivery on Map"}
                        </Button>
                        {sharedDeliveryMapOpen && (
                          <MapPickerInline
                            title="Select Shared Delivery"
                            mode="destination"
                            existingLocations={{ origin: null, destination: sharedDelivery.location, end: null }}
                            onSelect={(loc) => {
                              setSharedDelivery((p) => ({ ...p, location: loc, address: loc?.address ?? p.address }));
                              setSharedDeliveryMapOpen(false);
                            }}
                            onClose={() => setSharedDeliveryMapOpen(false)}
                          />
                        )}
                        <div className="grid grid-cols-2 gap-3 mt-1">
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Delivery Date</Label>
                            <Input type="date" value={sharedDelivery.date} onChange={(e) => setSharedDelivery((p) => ({ ...p, date: e.target.value }))} />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Delivery Hour</Label>
                            <Input type="time" value={sharedDelivery.hour} onChange={(e) => setSharedDelivery((p) => ({ ...p, hour: e.target.value }))} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </SectionCard>
              )}

              {customerMode === "multiple" && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 text-sm text-blue-800">
                  <p className="font-semibold mb-1">Each container will have its own customer, pickup and delivery.</p>
                  <p className="text-xs">You'll fill these details in the next step — one section per container.</p>
                </div>
              )}
            </div>
          )}
      


      {step === 3 && (
  <SectionCard title="Select Agreement(s)">

    <FormField label="Agreement 1">
      <Select
        value={agreementOne}
        onValueChange={(id) => {
          setAgreementOne(id);

         // const ag = agreements.find((a: any) => a.id === id);
           const ag = agreements.find((a: any) => a._id === id)
          if (!ag) return;

          setRoute((prev) => ({
            ...prev,
            originAddress: ag.originAddress,
            destinationAddress: ag.destinationAddress,
            tripType: ag.tripType,
            trailerMode: ag.trailerMode,
            trailerType: ag.trailerType,
            tripDistance: String(ag.tripDistanceKm || ""),
            tripPrice: String(ag.tripPrice || ""),
          }));
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Agreement" />
        </SelectTrigger>

        <SelectContent>
          {agreements.map((a: any) => (
            // <SelectItem key={a.id} value={a.id}>
            <SelectItem key={a._id} value={a._id}>
              {a.customerName} — {a.originAddress} → {a.destinationAddress}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormField>

    {customerMode === "multiple" && (
      <FormField label="Agreement 2">
        <Select value={agreementTwo} onValueChange={(id) => {
  setAgreementTwo(id);

  const ag = agreements.find((a: any) => a._id === id);
  if (!ag) return;

  // optional: only update if route empty
  setRoute((prev) => ({
    ...prev,
    originAddress: prev.originAddress || ag.originAddress,
    destinationAddress: prev.destinationAddress || ag.destinationAddress,
  }));
}}>
          <SelectTrigger>
            <SelectValue placeholder="Select Agreement" />
          </SelectTrigger>

          <SelectContent>
            {agreements.map((a: any) => (
              <SelectItem key={a._id} value={a._id}> 
                {a.customerName} — {a.originAddress} → {a.destinationAddress}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>
    )}
  </SectionCard>
)}
     {/* STEP 4 – ROUTE */}
        {step === 4 && (
<div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-200">

<StepHeader
icon={<MapPin className="h-5 w-5" />}
title="Step 4 – Route & Trip Details"
subtitle="Define the route, schedule and financial details for this trip."
/>



{/* ORIGINAL ADDRESS CARD */}
<SectionCard title="Addresses">
<div className="space-y-6">

{/* Origin */}
<div className="space-y-3">
<AddressBlock
label="Origin Address"
addressValue={route.originAddress}
onAddressChange={(v) => setR("originAddress", v)}
pinned={!!route.originLocation}
mapActive={activeRouteMap === "origin"}
onPinClick={() => openRouteMap("origin")}
/>

{activeRouteMap === "origin" && (
<MapPickerInline
title="Select Origin"
mode="origin"
existingLocations={{
origin: route.originLocation,
destination: route.destinationLocation,
end: route.tripEndLocation
}}
onSelect={handleMapSelect}
onClose={closeMap}
/>
)}
</div>

{/* Destination */}
<div className="space-y-3">
<AddressBlock
label="Destination Address"
addressValue={route.destinationAddress}
onAddressChange={(v) => setR("destinationAddress", v)}
pinned={!!route.destinationLocation}
mapActive={activeRouteMap === "destination"}
onPinClick={() => openRouteMap("destination")}
/>

{activeRouteMap === "destination" && (
<MapPickerInline
title="Select Destination"
mode="destination"
existingLocations={{
origin: route.originLocation,
destination: route.destinationLocation,
end: route.tripEndLocation
}}
onSelect={handleMapSelect}
onClose={closeMap}
/>
)}
</div>

{/* Trip End */}
<div className="space-y-3">
<AddressBlock
label="Trip End Address"
addressValue={route.tripEndAddress}
onAddressChange={(v) => setR("tripEndAddress", v)}
pinned={!!route.tripEndLocation}
mapActive={activeRouteMap === "end"}
onPinClick={() => openRouteMap("end")}
/>

{activeRouteMap === "end" && (
<MapPickerInline
title="Select Trip End"
mode="origin"
existingLocations={{
origin: route.originLocation,
destination: route.destinationLocation,
end: route.tripEndLocation
}}
onSelect={handleMapSelect}
onClose={closeMap}
/>
)}
</div>

</div>
</SectionCard>

{/* Remaining cards unchanged */}

</div>
)}


          {/* STEP 5 – CONTAINERS */}
          {step === 5 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="flex items-start justify-between">
                <StepHeader
                  icon={<Package className="h-5 w-5" />}
                  title="Step 5 – Containers"
                  subtitle={
                    customerMode === "single" && containerLocationMode === "same"
                      ? "Add container numbers and seals. Pickup & delivery are shared."
                      : "Add each container with its own details."
                  }
                />
              
              </div>

              <div className="space-y-6">
                {containers.map((container, i) => (
                  <SectionCard
                    key={i}
                    title={`Container ${i + 1}`}
                    action={
                      containers.length > 1 ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-7 text-rose-500 hover:text-rose-600 hover:bg-rose-50 text-xs gap-1"
                          onClick={() => removeContainer(i)}
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Remove
                        </Button>
                      ) : undefined
                    }
                  >
                    <div className="space-y-5">
                      {customerMode === "multiple" && (
                        <div className="grid grid-cols-2 gap-4">
                          <FormField label="Customer">
                            <Select
                              value={container.customerId}
                              onValueChange={(v) => setContainer(i, "customerId", v)}
                            >
                              <SelectTrigger><SelectValue placeholder="Select customer" /></SelectTrigger>
                              <SelectContent>
                                {customers?.map((c: any) => (
                                  <SelectItem key={c._id} value={c._id}>{c.legalName}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormField>
                          <div className="flex items-end">
                            <Button type="button" variant="outline" className="w-full text-sm" onClick={() => setOpenAddCompany(true)}>
                              + Add Customer
                            </Button>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4">
                        <FormField label="Container Number">
                          <Input
                            placeholder="e.g. MSKU1234567"
                            value={container.containerNumber}
                            onChange={(e) => setContainer(i, "containerNumber", e.target.value)}
                          />
                        </FormField>
                        <FormField label="Seal Number">
                          <Input
                            placeholder="e.g. SL-98765"
                            value={container.sealNumber}
                            onChange={(e) => setContainer(i, "sealNumber", e.target.value)}
                          />
                        </FormField>
                      </div>

                      {!(customerMode === "single" && containerLocationMode === "same") && (
                        <>
                          <div className="space-y-3">
                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Pickup</p>
                            <AddressBlock
                              label="Pickup Address"
                              addressValue={container.pickupAddress}
                              onAddressChange={(v) => setContainer(i, "pickupAddress", v)}
                              pinned={!!container.pickupLocation}
                              mapActive={mapTarget?.scope === "container" && mapTarget.index === i && mapTarget.field === "pickup"}
                              onPinClick={() => openContainerMap(i, "pickup")}
                            />
                            {mapTarget?.scope === "container" && mapTarget.index === i && mapTarget.field === "pickup" && (
                              <MapPickerInline
                                title={`Container ${i + 1} – Pickup`}
                                mode="origin"
                                existingLocations={{ origin: container.pickupLocation, destination: null, end: null }}
                                onSelect={handleMapSelect}
                                onClose={closeMap}
                              />
                            )}
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">Pickup Date</Label>
                                <Input type="date" value={container.pickupDate} onChange={(e) => setContainer(i, "pickupDate", e.target.value)} />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">Pickup Hour</Label>
                                <Input type="time" value={container.pickupHour} onChange={(e) => setContainer(i, "pickupHour", e.target.value)} />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Delivery</p>
                            <AddressBlock
                              label="Delivery Address"
                              addressValue={container.deliveryAddress}
                              onAddressChange={(v) => setContainer(i, "deliveryAddress", v)}
                              pinned={!!container.deliveryLocation}
                              mapActive={mapTarget?.scope === "container" && mapTarget.index === i && mapTarget.field === "delivery"}
                              onPinClick={() => openContainerMap(i, "delivery")}
                            />
                            {mapTarget?.scope === "container" && mapTarget.index === i && mapTarget.field === "delivery" && (
                              <MapPickerInline
                                title={`Container ${i + 1} – Delivery`}
                                mode="destination"
                                existingLocations={{ origin: null, destination: container.deliveryLocation, end: null }}
                                onSelect={handleMapSelect}
                                onClose={closeMap}
                              />
                            )}
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">Delivery Date</Label>
                                <Input type="date" value={container.deliveryDate} onChange={(e) => setContainer(i, "deliveryDate", e.target.value)} />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">Delivery Hour</Label>
                                <Input type="time" value={container.deliveryHour} onChange={(e) => setContainer(i, "deliveryHour", e.target.value)} />
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {customerMode === "single" && containerLocationMode === "same" && (
                        <div className="grid grid-cols-2 gap-4 bg-muted/20 border rounded-lg p-3 text-xs text-muted-foreground">
                          <div>
                            <p className="font-semibold mb-0.5 text-foreground">Pickup</p>
                            <p>{sharedPickup.address || "—"}</p>
                            <p>{sharedPickup.date} {sharedPickup.hour}</p>
                          </div>
                          <div>
                            <p className="font-semibold mb-0.5 text-foreground">Delivery</p>
                            <p>{sharedDelivery.address || "—"}</p>
                            <p>{sharedDelivery.date} {sharedDelivery.hour}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </SectionCard>
                ))}
              </div>
               <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-xs shrink-0"
                  onClick={addContainer}
                >
                  <Plus className="h-3.5 w-3.5" /> Add Container
                </Button>
            </div>
          )}

          {/* STEP 6 – REVIEW */}
          {step === 6 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <StepHeader
                icon={<Check className="h-5 w-5" />}
                title="Step 6 – Review & Create"
                subtitle="Review everything before creating the trip."
              />

              <SectionCard title="Route">
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  <ReviewRow label="Origin" value={route.originAddress || "—"} />
                  <ReviewRow label="Destination" value={route.destinationAddress || "—"} />
                  <ReviewRow label="Trip End" value={route.tripEndAddress || "—"} />
                  <ReviewRow label="Trip Type" value={route.tripType === "round_trip" ? "Round Trip" : "One Way"} />
                  <ReviewRow label="Trailer Mode" value={route.trailerMode} />
                  <ReviewRow label="Trailer Type" value={route.trailerType} />
                  <ReviewRow label="Pickup" value={`${route.pickupDate} ${route.pickupHour}`} />
                  <ReviewRow label="Delivery" value={`${route.deliveryDate} ${route.deliveryHour}`} />
                  <ReviewRow label="Distance" value={route.tripDistance ? `${route.tripDistance} km` : "—"} />
                  <ReviewRow label="Price" value={route.tripPrice ? `$${Number(route.tripPrice).toLocaleString()} MXN` : "—"} />
                </div>
              </SectionCard>

              <SectionCard title="Customer">
                <div className="text-sm space-y-1">
                  <ReviewRow label="Mode" value={customerMode === "single" ? "Single Customer" : "Multiple Customers"} />
                  {customerMode === "single" && (
                    <>
                      <ReviewRow label="Customer" value={customerName(singleCustomerId) || "—"} />
                      <ReviewRow label="Container Locations" value={containerLocationMode === "same" ? "Shared (same for all)" : "Individual per container"} />
                      {containerLocationMode === "same" && (
                        <>
                          <ReviewRow label="Shared Pickup" value={sharedPickup.address || "—"} />
                          <ReviewRow label="Shared Delivery" value={sharedDelivery.address || "—"} />
                        </>
                      )}
                    </>
                  )}
                </div>
              </SectionCard>

              <SectionCard title={`Containers (${containers.length})`}>
                <div className="space-y-3">
                  {containers.map((c, i) => (
                    <div key={i} className="bg-muted/20 border rounded-xl p-4 text-sm space-y-2">
                      <p className="font-bold text-xs uppercase tracking-widest text-muted-foreground">
                        Container {i + 1}
                      </p>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                        {customerMode === "multiple" && (
                          <ReviewRow label="Customer" value={customerName(c.customerId) || "—"} />
                        )}
                        <ReviewRow label="Container #" value={c.containerNumber || "—"} />
                        <ReviewRow label="Seal #" value={c.sealNumber || "—"} />
                        {!(customerMode === "single" && containerLocationMode === "same") && (
                          <>
                            <ReviewRow label="Pickup" value={c.pickupAddress || "—"} />
                            <ReviewRow label="Delivery" value={c.deliveryAddress || "—"} />
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          )}

        </div>
      </div>

      {/* ── Bottom navigation bar ── */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur border-t px-6 py-4 flex items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={() => step === 1 ? onBack() : setStep((s) => s - 1)}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          {step === 1 ? "Cancel" : "Back"}
        </Button>

        <div className="flex items-center gap-2">
          {STEPS.map((s) => (
            <div
              key={s.id}
              className={`h-2 rounded-full transition-all ${
                s.id === step ? "w-6 bg-primary" : s.id < step ? "w-2 bg-emerald-400" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>

        {step < 6 ? (
          <Button
            onClick={() => setStep((s) => s + 1)}
            className="gap-2"
          disabled={
  (step === 1 && !customerMode) ||
  (step === 2 && customerMode === "single" && !singleCustomerId) ||
  (step === 3 && !agreementOne) ||
  (step === 3 && customerMode === "multiple" && !agreementTwo)
}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            <Check className="h-4 w-4" />
            Create Trip
          </Button>
        )}
      </div>

      <AddCompanyDialog open={openAddCompany} onClose={() => setOpenAddCompany(false)} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function StepHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="bg-primary/10 p-2.5 rounded-xl text-primary shrink-0">{icon}</div>
      <div>
        <h3 className="text-xl font-bold tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

function SectionCard({
  title, children, action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
      <div className="px-5 py-3.5 border-b bg-muted/20 flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{title}</p>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</Label>
      {children}
    </div>
  );
}

function AddressBlock({
  label, addressValue, onAddressChange, pinned, mapActive, onPinClick,
}: {
  label: string;
  addressValue: string;
  onAddressChange: (v: string) => void;
  pinned: boolean;
  mapActive: boolean;
  onPinClick: () => void;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</Label>
      <Input
        placeholder={label}
        value={addressValue}
        onChange={(e) => onAddressChange(e.target.value)}
      />
      <Button
        type="button"
        size="sm"
        variant={mapActive ? "default" : "outline"}
        className="w-full text-xs gap-1.5"
        onClick={onPinClick}
      >
        <MapPin className="h-3.5 w-3.5" />
        {pinned ? `${label.split(" ")[0]} Pinned ✓` : `Pin ${label.split(" ")[0]} on Map`}
      </Button>
    </div>
  );
}

function MapPickerInline({
  title, mode, existingLocations, onSelect, onClose,
}: {
  title: string;
  mode: string;
  existingLocations: any;
  onSelect: (loc: any) => void;
  onClose: () => void;
}) {
  return (
    <div className="border rounded-xl overflow-hidden animate-in fade-in zoom-in duration-200 my-2">
      <div className="bg-slate-900 text-white px-4 py-2 flex justify-between items-center">
        <span className="text-xs font-semibold uppercase">{title}</span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 text-white hover:bg-white/20 text-xs"
          onClick={onClose}
        >
          Close Map
        </Button>
      </div>
      <LargeMapPicker
        mode={mode as any}
        existingLocations={existingLocations}
        onSelect={onSelect}
      />
    </div>
  );
}

function ModeCard({
  icon, title, description, selected, onClick, compact = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex flex-col items-start gap-3 rounded-2xl border-2 text-left transition-all w-full",
        compact ? "p-4" : "p-5",
        selected
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-border bg-card hover:border-primary/40 hover:bg-muted/20",
      ].join(" ")}
    >
      <div className={`${selected ? "text-primary" : "text-muted-foreground"} transition-colors`}>
        {icon}
      </div>
      <div>
        <p className={`font-bold ${compact ? "text-sm" : "text-base"} ${selected ? "text-primary" : "text-foreground"}`}>
          {title}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{description}</p>
      </div>
      {selected && (
        <div className="ml-auto mt-auto">
          <Badge className="bg-primary text-primary-foreground text-xs">Selected</Badge>
        </div>
      )}
    </button>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="text-muted-foreground shrink-0 w-32">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}