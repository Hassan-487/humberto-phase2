

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  ModuleSection, FormGrid, Field, ReadonlyField, MetricCard,
  TimelineEvent, CostRow, AlertRow,
} from "@/components/trips/ModuleFormComponents";
import { Trip } from "@/data/mockTripData";
import {
  Truck, User, DollarSign, Clock, Package, Radio, CameraIcon,
  FileText, Layers, Wrench, Calculator, ReceiptText, BadgeDollarSign,
  Phone, Info, Upload, Eye,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// M2 – Load Assignment
// ─────────────────────────────────────────────────────────────────────────────
export function LoadAssignmentTab({ trip, onUpdate }: { trip: Trip; onUpdate: (d: any) => void }) {
  const [form, setForm] = useState(trip.loadAssignment);
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="space-y-6">
      <ModuleSection title=" Load Assignment" icon={<Truck className="h-4 w-4" />}>
        <FormGrid cols={2}>
          <Field label="Business Unit">
            <Input value={form.businessUnit} onChange={(e) => set("businessUnit", e.target.value)} />
          </Field>
          <Field label="Carrier Type">
            <Select value={form.carrier} onValueChange={(v) => set("carrier", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Internal">Internal</SelectItem>
                <SelectItem value="External">External</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Truck Number">
            <Input value={form.truckNumber} onChange={(e) => set("truckNumber", e.target.value)} />
          </Field>
          <Field label="Driver">
            <Input value={form.driver} onChange={(e) => set("driver", e.target.value)} />
          </Field>
          <Field label="Trip Price (MXN)">
            <Input type="number" value={form.tripPriceMXN} onChange={(e) => set("tripPriceMXN", e.target.value)} />
          </Field>
          <Field label="Internal Trip Number">
            <Input value={form.internalTripNumber} onChange={(e) => set("internalTripNumber", e.target.value)} />
          </Field>
          <Field label="Invoice Number">
            <Input value={form.invoiceNumber} onChange={(e) => set("invoiceNumber", e.target.value)} />
          </Field>
          <Field label="Date of Assignment">
            <Input type="date" value={form.dateOfAssignment} onChange={(e) => set("dateOfAssignment", e.target.value)} />
          </Field>
        </FormGrid>
        {form.carrier === "External" && (
          <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800">
            ⚠️ This trip will be marked as <strong>OUTSOURCED</strong>. Tracking is available only if the carrier uses Samsara.
          </div>
        )}
        <div className="flex justify-end mt-6">
          <Button onClick={() => onUpdate(form)} className="gap-2">Save Load Assignment</Button>
        </div>
      </ModuleSection>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// M3 – Expense Pre-Assignment
// ─────────────────────────────────────────────────────────────────────────────
export function ExpensePreAssignmentTab({ trip, onUpdate }: { trip: Trip; onUpdate: (d: any) => void }) {

  const [form, setForm] = useState({
    ...trip.expensePreAssignment,
    otherExpenses: trip.expensePreAssignment.otherExpenses || []
  });

  const set = (k: string, v: string) =>
    setForm((p) => ({ ...p, [k]: Number(v) }));


  // Add new extra charge
  const addExpense = () => {
    setForm((prev) => ({
      ...prev,
      otherExpenses: [
        ...prev.otherExpenses,
        { description: "", amount: 0 }
      ]
    }));
  };


  // Update expense row
  const updateExpense = (index: number, key: string, value: string) => {
    const updated = [...form.otherExpenses];

    updated[index] = {
      ...updated[index],
      [key]: key === "amount" ? Number(value) : value
    };

    setForm((prev) => ({
      ...prev,
      otherExpenses: updated
    }));
  };


  // Remove expense
  const removeExpense = (index: number) => {
    setForm((prev) => ({
      ...prev,
      otherExpenses: prev.otherExpenses.filter((_: any, i: number) => i !== index)
    }));
  };


  const distance = trip.planning.tripDistance;
  const autoDiesel = (distance / 1.8).toFixed(0);

  const otherTotal = form.otherExpenses.reduce(
    (sum: number, e: any) => sum + (e.amount || 0),
    0
  );

  const total =
    (form.estimatedDiesel || 0) +
    (form.estimatedDEF || 0) +
    (form.cashTolls || 0) +
    (form.driverFood || 0) +
    otherTotal;


  return (
    <div className="space-y-6">

      <ModuleSection title="Estimated Trip Costs" icon={<DollarSign className="h-4 w-4" />}>

        <div className="mb-4 text-xs text-muted-foreground">
          Trip distance: <strong>{distance} km</strong>.
          Diesel auto-estimated at distance ÷ 1.8 =
          <strong> {autoDiesel} L</strong>.
        </div>

        <FormGrid cols={2}>

          <Field label="Diesel (liters)">
            <Input
              type="number"
              value={form.estimatedDiesel}
              onChange={(e) => set("estimatedDiesel", e.target.value)}
            />
          </Field>

          <Field label="DEF (MXN)">
            <Input
              type="number"
              value={form.estimatedDEF}
              onChange={(e) => set("estimatedDEF", e.target.value)}
            />
          </Field>

          <Field label="Cash Tolls (MXN)">
            <Input
              type="number"
              value={form.cashTolls}
              onChange={(e) => set("cashTolls", e.target.value)}
            />
          </Field>

          <Field label="Driver Food (MXN)">
            <Input
              type="number"
              value={form.driverFood}
              onChange={(e) => set("driverFood", e.target.value)}
            />
          </Field>

        </FormGrid>


        {/* OTHER EXPENSES */}
        <div className="mt-6">

          <div className="flex justify-between items-center mb-3">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Other Expected Expenses
            </p>

            <Button size="sm" variant="outline" onClick={addExpense}>
              Add Charge
            </Button>
          </div>


          <div className="space-y-3">

            {form.otherExpenses.map((expense: any, index: number) => (

              <div key={index} className="grid grid-cols-12 gap-2">

                <Input
                  className="col-span-7"
                  placeholder="Description"
                  value={expense.description}
                  onChange={(e) =>
                    updateExpense(index, "description", e.target.value)
                  }
                />

                <Input
                  type="number"
                  className="col-span-3"
                  placeholder="Amount"
                  value={expense.amount}
                  onChange={(e) =>
                    updateExpense(index, "amount", e.target.value)
                  }
                />

                <Button
                  variant="ghost"
                  size="sm"
                  className="col-span-2 text-red-500"
                  onClick={() => removeExpense(index)}
                >
                  Remove
                </Button>

              </div>

            ))}

          </div>

        </div>


        {/* TOTAL */}
        <div className="mt-4 flex justify-between items-center bg-muted/30 border rounded-xl px-5 py-4">
          <p className="text-sm font-semibold text-muted-foreground">
            Total Estimated Cost
          </p>

          <p className="text-xl font-bold text-foreground">
            ${total.toLocaleString()} MXN
          </p>
        </div>


        <div className="flex justify-end mt-4">
          <Button onClick={() => onUpdate(form)}>
            Save Estimated Costs
          </Button>
        </div>

      </ModuleSection>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// M4 – Driver Acceptance & Trip Start
// isAdminView=true  → all fields read-only; admin can upload images as fallback
// isAdminView=false → driver fills all fields (used in driver portal)
// ─────────────────────────────────────────────────────────────────────────────
export function DriverAcceptanceTab({
  trip,
  onUpdate,
  isAdminView = false,
}: {
  trip: Trip;
  onUpdate: (d: any) => void;
  isAdminView?: boolean;
}) {
  const [form, setForm] = useState(trip.driverAcceptance);
  const set = (k: string, v: any) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="space-y-6">
      {/* Admin-view banner */}
      {isAdminView && (
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-800">
          <Eye className="h-4 w-4 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold">Admin View – Read Only</p>
            <p className="text-xs mt-0.5">
              This module is filled by the driver from the Driver Portal. You can view the submitted data below.
              If the driver's phone is unavailable, you may upload supporting documents on their behalf.
            </p>
          </div>
        </div>
      )}

      <ModuleSection title="Driver Acceptance & Trip Start" icon={<User className="h-4 w-4" />}>
        <FormGrid cols={2}>
          <ReadonlyField label="Load Acceptance Date" value={form.loadAcceptanceDate || "—"} />
          <ReadonlyField label="Load Acceptance Hour" value={form.loadAcceptanceHour || "—"} />
          <ReadonlyField label="Trip Start Date" value={form.tripStartDate || "—"} />
          <ReadonlyField label="Trip Start Hour" value={form.tripStartHour || "—"} />
        </FormGrid>

        {/* Driver editable fields — hidden for admin */}
        {!isAdminView && (
          <>
            <div className="mt-4 border-t pt-4">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Update Details</p>
              <FormGrid cols={2}>
                <Field label="Load Acceptance Date">
                  <Input type="date" value={form.loadAcceptanceDate} onChange={(e) => set("loadAcceptanceDate", e.target.value)} />
                </Field>
                <Field label="Load Acceptance Hour">
                  <Input type="time" value={form.loadAcceptanceHour} onChange={(e) => set("loadAcceptanceHour", e.target.value)} />
                </Field>
                <Field label="Trip Start Date">
                  <Input type="date" value={form.tripStartDate} onChange={(e) => set("tripStartDate", e.target.value)} />
                </Field>
                <Field label="Trip Start Hour">
                  <Input type="time" value={form.tripStartHour} onChange={(e) => set("tripStartHour", e.target.value)} />
                </Field>
              </FormGrid>
              <div className="flex justify-end mt-4">
                <Button onClick={() => onUpdate(form)}>Save Driver Acceptance</Button>
              </div>
            </div>
          </>
        )}
      </ModuleSection>

      {/* Admin fallback image upload */}
      {isAdminView && (
        <ModuleSection title="Admin – Document Upload (Fallback)" icon={<Upload className="h-4 w-4" />}>
          <p className="text-xs text-muted-foreground mb-4">
            Use this section to upload acceptance documents on behalf of the driver if their device is unavailable.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AdminUploadCard label="Load Acceptance Document" accept="image/*,application/pdf" />
            <AdminUploadCard label="Trip Start Photo" accept="image/*" />
          </div>
        </ModuleSection>
      )}

      {/* Sleep & Break log — visible to both */}
      <ModuleSection title="Driver Sleep & Break Log" icon={<Clock className="h-4 w-4" />}>
        <div className="text-sm text-muted-foreground mb-4">
          Regulation: For every <strong>16 hours driving</strong>, the driver must rest at least <strong>10 hours</strong>.
        </div>
        {!form.sleepBreakLog?.length ? (
          <p className="text-sm text-muted-foreground italic">No log entries yet.</p>
        ) : (
          <div className="space-y-2">
            {form.sleepBreakLog.map((entry: any, i: number) => (
              <div
                key={i}
                className={`flex items-center justify-between rounded-lg border px-4 py-3 text-sm ${
                  entry.type === "sleep"
                    ? "bg-indigo-50 border-indigo-200"
                    : "bg-emerald-50 border-emerald-200"
                }`}
              >
                <span className="font-semibold capitalize text-foreground">{entry.type}</span>
                <span className="text-muted-foreground">{entry.start} – {entry.end}</span>
                <span className="font-bold">{entry.hours}h</span>
              </div>
            ))}
          </div>
        )}
      </ModuleSection>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// M5 – Driver Input During Loading
// isAdminView=true  → all fields read-only; admin can upload images as fallback
// isAdminView=false → driver fills all fields
// ─────────────────────────────────────────────────────────────────────────────
export function LoadingDataTab({
  trip,
  onUpdate,
  isAdminView = false,
}: {
  trip: Trip;
  onUpdate: (d: any) => void;
  isAdminView?: boolean;
}) {
  const [form, setForm] = useState(trip.loadingData);
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));
  const setContainer = (i: number, k: string, v: string) => {
    setForm((p) => {
      const containers = [...p.containers];
      containers[i] = { ...containers[i], [k]: v };
      return { ...p, containers };
    });
  };

  return (
    <div className="space-y-6">
      {/* Admin-view banner */}
      {isAdminView && (
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-800">
          <Eye className="h-4 w-4 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold">Admin View – Read Only</p>
            <p className="text-xs mt-0.5">
              This module is filled by the driver from the Driver Portal. You can view submitted data and container photos below.
              If the driver's phone is unavailable, use the fallback upload section to add images on their behalf.
            </p>
          </div>
        </div>
      )}

      <ModuleSection title="Loading Arrival Data" icon={<Package className="h-4 w-4" />}>
        <FormGrid cols={2}>
          <ReadonlyField label="Arrival Date" value={form.arrivalDate || "—"} />
          <ReadonlyField label="Arrival Hour" value={form.arrivalHour || "—"} />
        </FormGrid>

        {!isAdminView && (
          <div className="mt-4 border-t pt-4">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Update Arrival</p>
            <FormGrid cols={2}>
              <Field label="Arrival Date">
                <Input type="date" value={form.arrivalDate} onChange={(e) => set("arrivalDate", e.target.value)} />
              </Field>
              <Field label="Arrival Hour">
                <Input type="time" value={form.arrivalHour} onChange={(e) => set("arrivalHour", e.target.value)} />
              </Field>
            </FormGrid>
            <div className="flex justify-end mt-4">
              <Button onClick={() => onUpdate(form)}>Save Arrival</Button>
            </div>
          </div>
        )}
      </ModuleSection>

      <ModuleSection title="Container Details" icon={<Layers className="h-4 w-4" />}>
        <div className="space-y-5">
          {form.containers.map((container: any, i: number) => (
            <div key={i} className="border rounded-xl p-5 bg-muted/10 space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Container {i + 1}
                {container.customer && (
                  <span className="ml-2 normal-case font-normal text-muted-foreground">
                    — {container.customer}
                  </span>
                )}
              </p>

              {/* Always show these read-only */}
              <FormGrid cols={3}>
                <ReadonlyField label="Container Number" value={container.containerNumber || "—"} />
                <ReadonlyField label="Seal Number" value={container.sealNumber || "—"} />
                <ReadonlyField label="Customer" value={container.customer || "—"} />
              </FormGrid>

              {/* Driver editable fields */}
              {!isAdminView && (
                <FormGrid cols={3}>
                  <Field label="Container Number">
                    <Input value={container.containerNumber} onChange={(e) => setContainer(i, "containerNumber", e.target.value)} />
                  </Field>
                  <Field label="Seal Number">
                    <Input value={container.sealNumber} onChange={(e) => setContainer(i, "sealNumber", e.target.value)} />
                  </Field>
                  <Field label="Customer">
                    <Input value={container.customer} onChange={(e) => setContainer(i, "customer", e.target.value)} />
                  </Field>
                </FormGrid>
              )}

              {/* Photos — view existing */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Photos</p>
                {container.photos?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {container.photos.map((photo: string, j: number) => (
                      <div key={j} className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center text-xs text-muted-foreground border">
                        {photo}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground italic">No photos uploaded yet.</p>
                )}

                {/* Driver can upload normally; admin has fallback upload */}
                {!isAdminView && (
                  <div className="flex items-center gap-3">
                    <CameraIcon className="h-4 w-4 text-muted-foreground" />
                    <Button variant="outline" size="sm">Upload Photos</Button>
                  </div>
                )}
              </div>

              {/* Admin fallback photo upload per container */}
              {isAdminView && (
                <div className="border-t pt-3">
                  <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-2">
                    📷 Fallback: Upload container photos on behalf of driver if phone is unavailable.
                  </p>
                  <AdminUploadCard
                    label={`Container ${i + 1} Photos (Fallback)`}
                    accept="image/*"
                    multiple
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        {!isAdminView && (
          <div className="flex justify-end mt-4">
            <Button onClick={() => onUpdate(form)}>Save Container Data</Button>
          </div>
        )}
      </ModuleSection>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// M6 – Monitoring In Transit
// ─────────────────────────────────────────────────────────────────────────────
export function MonitoringTab({ trip }: { trip: Trip }) {
  const mon = trip.monitoring;
  return (
    <div className="space-y-6">
      <ModuleSection title="In-Transit Monitoring" icon={<Radio className="h-4 w-4" />}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <MetricCard label="Speed" value={`${trip.aiCurrentSpeed ?? 0} km/h`} color="blue" />
          <MetricCard label="Distance Left" value={`${trip.aiDistanceRemaining?.toFixed(0) ?? "—"} km`} color="amber" />
          <MetricCard label="ETA" value={trip.aiEstimatedArrivalHuman || "—"} color="green" />
          <MetricCard
            label="Vehicle Status"
            value={trip.aiMovementDetected ? "Moving" : "Stationary"}
            color={trip.aiMovementDetected ? "green" : "red"}
          />
        </div>
        <div className="mt-4 text-xs text-muted-foreground">
          Last updated: {mon.lastStatusUpdate ? new Date(mon.lastStatusUpdate).toLocaleString() : "—"} ·
          Status updates sent every 2 hours via <strong>Email & WhatsApp</strong>.
        </div>
      </ModuleSection>

      <ModuleSection title="Status Update Timeline" icon={<Clock className="h-4 w-4" />}>
        {!mon.statusUpdates?.length ? (
          <p className="text-sm text-muted-foreground italic">No status updates yet.</p>
        ) : (
          mon.statusUpdates.map((upd: any, i: number) => (
            <TimelineEvent key={i} time={upd.time} message={upd.message} />
          ))
        )}
      </ModuleSection>

      <ModuleSection title="Active Alerts" icon={<Radio className="h-4 w-4" />}>
        {!mon.alerts?.length ? (
          <p className="text-sm text-muted-foreground italic">No active alerts.</p>
        ) : (
          <div className="space-y-3">
            {mon.alerts.map((a: any, i: number) => (
              <AlertRow key={i} level={a.level} message={a.message} time={a.time} />
            ))}
          </div>
        )}
      </ModuleSection>

      <ModuleSection title="Retell AI – Driver Calls" icon={<Phone className="h-4 w-4" />}>
        <div className="text-xs text-muted-foreground mb-3">
          AI calls the driver when stopped 1+ hour, ETA is affected, or for routine check-ins.
          Collects: reason for stop, driver wellbeing, mechanical issues, dangers, ETA reminders.
        </div>
        {!mon.retellAiCalls?.length ? (
          <p className="text-sm text-muted-foreground italic">No AI calls made yet.</p>
        ) : (
          <div className="space-y-3">
            {mon.retellAiCalls.map((call: any, i: number) => (
              <div key={i} className="bg-violet-50 border border-violet-200 rounded-xl px-4 py-3 text-sm">
                <p className="text-xs text-violet-500 font-semibold mb-1">
                  {new Date(call.time).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
                </p>
                <p className="text-foreground">{call.summary}</p>
              </div>
            ))}
          </div>
        )}
      </ModuleSection>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// M7 – Unloading & POD Capture
// ─────────────────────────────────────────────────────────────────────────────
export function UnloadingTab({ trip, onUpdate }: { trip: Trip; onUpdate: (d: any) => void }) {
  const [form, setForm] = useState(trip.unloading);
  const set = (k: string, v: any) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="space-y-6">
      <ModuleSection title="Unloading & Proof of Delivery" icon={<FileText className="h-4 w-4" />}>
        <FormGrid cols={2}>
          <Field label="Delivery End Date">
            <Input type="date" value={form.deliveryEndDate} onChange={(e) => set("deliveryEndDate", e.target.value)} />
          </Field>
          <Field label="Delivery End Hour">
            <Input type="time" value={form.deliveryEndHour} onChange={(e) => set("deliveryEndHour", e.target.value)} />
          </Field>
        </FormGrid>

        <div className="mt-4 flex items-center gap-3 text-sm">
          <CameraIcon className="h-4 w-4 text-muted-foreground" />
          <span>POD Photos: {form.podPhotos?.length || 0} uploaded</span>
          <Button variant="outline" size="sm">Upload POD Photos</Button>
        </div>

        <div className="mt-4">
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Delivery Notes</Label>
          <Textarea
            placeholder="Any delivery notes…"
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
          />
        </div>

        <div className="flex justify-end mt-4">
          <Button onClick={() => onUpdate(form)}>Save POD Data</Button>
        </div>
      </ModuleSection>

      <ModuleSection title="Driver Trip End" icon={<User className="h-4 w-4" />}>
        <div className="text-sm text-muted-foreground mb-4">
          The driver can end their portion of the trip (e.g., unable to deliver empty container at port).
          The container lifecycle continues — additional transport may be arranged via local truck or 3rd party,
          with costs recorded in Extra Charges (M8+10).
        </div>
        <div className="flex items-center gap-3 mb-4">
          <Switch checked={form.tripEndedByDriver} onCheckedChange={(v) => set("tripEndedByDriver", v)} />
          <Label className="font-medium">Driver has ended their trip</Label>
        </div>
        {form.tripEndedByDriver && (
          <FormGrid cols={2}>
            <Field label="Driver Trip End Date">
              <Input type="date" value={form.driverTripEndDate} onChange={(e) => set("driverTripEndDate", e.target.value)} />
            </Field>
            <Field label="Driver Trip End Hour">
              <Input type="time" value={form.driverTripEndHour} onChange={(e) => set("driverTripEndHour", e.target.value)} />
            </Field>
          </FormGrid>
        )}
        <div className="flex justify-end mt-4">
          <Button onClick={() => onUpdate(form)}>Save Driver End</Button>
        </div>
      </ModuleSection>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// M9 – Empty/Loaded Container Delivery
// ─────────────────────────────────────────────────────────────────────────────
export function ContainerDeliveryTab({ trip, onUpdate }: { trip: Trip; onUpdate: (d: any) => void }) {
  const [form, setForm] = useState(trip.containerDelivery);
  const set = (k: string, v: any) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="space-y-6">
      <ModuleSection title="Container Return / Final Delivery" icon={<Package className="h-4 w-4" />}>
        <div className="flex items-center gap-3 mb-4">
          <Switch checked={form.deadFreight} onCheckedChange={(v) => set("deadFreight", v)} />
          <Label className="font-medium">Dead Freight (empty return with no load)</Label>
        </div>
        <FormGrid cols={2}>
          <Field label="Last Free Day (LFD)">
            <Input type="date" value={form.lastFreeDay} onChange={(e) => set("lastFreeDay", e.target.value)} />
          </Field>
          <Field label="Container Delivery Date">
            <Input type="date" value={form.containerDeliveryDate} onChange={(e) => set("containerDeliveryDate", e.target.value)} />
          </Field>
          <Field label="Container Delivery Hour">
            <Input type="time" value={form.containerDeliveryHour} onChange={(e) => set("containerDeliveryHour", e.target.value)} />
          </Field>
          <Field label="Port Terminal / Deposit Name">
            <Input value={form.portTerminalName} onChange={(e) => set("portTerminalName", e.target.value)} />
          </Field>
          <Field label="Port Terminal Location">
            <Input value={form.portTerminalLocation} onChange={(e) => set("portTerminalLocation", e.target.value)} />
          </Field>
          <Field label="Carrier">
            <Select value={form.carrier} onValueChange={(v) => set("carrier", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Internal">Internal</SelectItem>
                <SelectItem value="External">External (3rd Party)</SelectItem>
                <SelectItem value="Local">Local Truck</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Truck Number">
            <Input value={form.truckNumber} onChange={(e) => set("truckNumber", e.target.value)} />
          </Field>
          <Field label="Company Trip End Date">
            <Input type="date" value={form.tripEndDate} onChange={(e) => set("tripEndDate", e.target.value)} />
          </Field>
          <Field label="Company Trip End Hour">
            <Input type="time" value={form.tripEndHour} onChange={(e) => set("tripEndHour", e.target.value)} />
          </Field>
        </FormGrid>
        <div className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
          ✅ Once this module is saved and the company trip ends, status will update to <strong>CLOSED</strong>.
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={() => onUpdate(form)}>Save & Close Trip</Button>
        </div>
      </ModuleSection>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// M11 – Trip Expense Reconciliation
// ─────────────────────────────────────────────────────────────────────────────
export function TripExpenseTab({ trip, onUpdate }: { trip: Trip; onUpdate: (d: any) => void }) {
  const [form, setForm] = useState(trip.tripExpense);
  const est = trip.expensePreAssignment;
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: Number(v) }));

  const actualTotal = Object.values(form).reduce((s: number, v: any) => s + Number(v || 0), 0);
  const otherExpensesTotal =
  est.otherExpenses?.reduce(
    (sum: number, e: any) => sum + Number(e.amount || 0),
    0
  ) || 0;

const estimatedTotal =
  (est.estimatedDiesel || 0) +
  (est.estimatedDEF || 0) +
  (est.cashTolls || 0) +
  (est.driverFood || 0) +
  otherExpensesTotal;
  const variance = actualTotal - estimatedTotal;

  return (
    <div className="space-y-6">
      <ModuleSection title="Trip Expense Reconciliation" icon={<ReceiptText className="h-4 w-4" />}>
        <div className="overflow-hidden rounded-xl border mb-4">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 border-b">
              <tr>
                <th className="py-3 px-4 text-left font-semibold text-muted-foreground">Item</th>
                <th className="py-3 px-4 text-right font-semibold text-muted-foreground">Estimated</th>
                <th className="py-3 px-4 text-right font-semibold text-muted-foreground">Actual</th>
              </tr>
            </thead>
            <tbody>
              <CostRow label="Diesel (L)" estimated={est.estimatedDiesel} actual={form.diesel} />
              <CostRow label="DEF" estimated={est.estimatedDEF} actual={form.def} />
              <CostRow label="Tolls" estimated={est.cashTolls} actual={form.tolls} />
              <CostRow label="Driver Food" estimated={est.driverFood} actual={form.food} />
            <CostRow
  label="Additional Driver Expenses"
  estimated={otherExpensesTotal}
  actual={form.additionalDriverExpenses}
/>
            </tbody>
          </table>
        </div>

        <FormGrid cols={2}>
          <Field label="Actual Diesel (MXN)">
            <Input type="number" value={form.diesel} onChange={(e) => set("diesel", e.target.value)} />
          </Field>
          <Field label="Actual DEF (MXN)">
            <Input type="number" value={form.def} onChange={(e) => set("def", e.target.value)} />
          </Field>
          <Field label="Actual Tolls (MXN)">
            <Input type="number" value={form.tolls} onChange={(e) => set("tolls", e.target.value)} />
          </Field>
          <Field label="Actual Food (MXN)">
            <Input type="number" value={form.food} onChange={(e) => set("food", e.target.value)} />
          </Field>
          <Field label="Additional Driver Expenses (MXN)" span>
            <Input type="number" value={form.additionalDriverExpenses} onChange={(e) => set("additionalDriverExpenses", e.target.value)} />
          </Field>
        </FormGrid>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <MetricCard label="Estimated Total" value={`$${estimatedTotal.toLocaleString()}`} />
          <MetricCard label="Actual Total" value={`$${actualTotal.toLocaleString()}`} color="blue" />
          <MetricCard
            label="Variance"
            value={`${variance >= 0 ? "+" : ""}$${variance.toLocaleString()}`}
            color={variance > 0 ? "red" : "green"}
            sub={variance > 0 ? "Over budget" : "Under budget"}
          />
        </div>

        <div className="mt-3 text-xs text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg px-4 py-3">
          ✅ Saving this module will update the status to <strong>INVOICED</strong>.
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={() => onUpdate(form)}>Save Trip Expenses</Button>
        </div>
      </ModuleSection>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// M12 – Driver Wages
// ─────────────────────────────────────────────────────────────────────────────
export function DriverWagesTab({ trip, onUpdate }: { trip: Trip; onUpdate: (d: any) => void }) {
  const [form, setForm] = useState(trip.driverWages);
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: Number(v) }));

  const salePrice = trip.planning.tripPrice;
  const finalWage = (form.baseWage || 0) - (form.imss || 0) - (form.infonavit || 0) - (form.taxes || 0) - (form.driverExtraExpenses || 0);

  return (
    <div className="space-y-6">
      <ModuleSection title="Driver Wages" icon={<BadgeDollarSign className="h-4 w-4" />}>
        <div className="text-sm text-muted-foreground mb-4">
          Base wage ≈ 9% of sale price. Trip price: <strong>${salePrice.toLocaleString()} MXN</strong> → Suggested: <strong>${Math.round(salePrice * 0.09).toLocaleString()} MXN</strong>.
        </div>
        <FormGrid cols={2}>
          <Field label="Base Wage (MXN)">
            <Input type="number" value={form.baseWage} onChange={(e) => set("baseWage", e.target.value)} />
          </Field>
          <Field label="IMSS – Social Security (MXN)">
            <Input type="number" value={form.imss} onChange={(e) => set("imss", e.target.value)} />
          </Field>
          <Field label="Infonavit – Housing Credit (MXN)">
            <Input type="number" value={form.infonavit} onChange={(e) => set("infonavit", e.target.value)} />
          </Field>
          <Field label="Income Taxes (MXN)">
            <Input type="number" value={form.taxes} onChange={(e) => set("taxes", e.target.value)} />
          </Field>
          <Field label="Driver Extra Expenses (MXN)" span>
            <Input type="number" value={form.driverExtraExpenses} onChange={(e) => set("driverExtraExpenses", e.target.value)} />
          </Field>
        </FormGrid>

        <div className="mt-4 grid grid-cols-3 gap-4">
          <MetricCard label="Base Wage" value={`$${(form.baseWage || 0).toLocaleString()}`} />
          <MetricCard label="Deductions" value={`-$${((form.imss || 0) + (form.infonavit || 0) + (form.taxes || 0) + (form.driverExtraExpenses || 0)).toLocaleString()}`} color="red" />
          <MetricCard label="Final Net Wage" value={`$${finalWage.toLocaleString()}`} color="green" />
        </div>

        <div className="text-xs text-muted-foreground mt-3 bg-muted/20 border rounded-lg px-4 py-3">
          <strong>Formula:</strong> Final Wage = Base Wage – IMSS – Infonavit – Taxes – Driver Extra Expenses
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={() => onUpdate({ ...form, finalWage })}>Save Driver Wages</Button>
        </div>
      </ModuleSection>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// M13 – Trip Settlement & Invoicing
// ─────────────────────────────────────────────────────────────────────────────
export function SettlementTab({ trip, onUpdate }: { trip: Trip; onUpdate: (d: any) => void }) {
  const [form, setForm] = useState(trip.settlement);
  const set = (k: string, v: any) => setForm((p) => ({ ...p, [k]: v }));

  const exp = trip.tripExpense;
  const wages = trip.driverWages;
  const extraCharges = (trip as any).extraCharges ?? {};
  const addCosts = trip.additionalCosts;

  const totalTripCosts =
    (exp.diesel || 0) + (exp.def || 0) + (exp.tolls || 0) + (exp.food || 0) +
    (exp.additionalDriverExpenses || 0) + (addCosts?.roadServiceCost || 0) + (addCosts?.localFreightFee || 0);
  const totalDriverCosts = wages.finalWage || 0;
  const extraRevenue =
    (extraCharges.detentionCharges || 0) +
    (extraCharges.otherExtraCosts?.reduce((s: number, e: any) => s + Number(e.amount), 0) || 0);
  const netProfit = trip.planning.tripPrice + extraRevenue - totalTripCosts - totalDriverCosts;

  return (
    <div className="space-y-6">
      <ModuleSection title="Trip Settlement" icon={<Calculator className="h-4 w-4" />}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <MetricCard label="Trip Price" value={`$${trip.planning.tripPrice.toLocaleString()}`} color="blue" />
          <MetricCard label="Extra Revenue" value={`+$${extraRevenue.toLocaleString()}`} color="green" />
          <MetricCard label="Total Costs" value={`-$${(totalTripCosts + totalDriverCosts).toLocaleString()}`} color="red" />
          <MetricCard label="Net Profit" value={`$${netProfit.toLocaleString()}`} color={netProfit >= 0 ? "green" : "red"} />
        </div>

        <div className="overflow-hidden rounded-xl border mb-4">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 border-b">
              <tr>
                <th className="py-3 px-4 text-left text-muted-foreground font-semibold">Item</th>
                <th className="py-3 px-4 text-right text-muted-foreground font-semibold">Amount (MXN)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b bg-emerald-50/50">
                <td className="py-3 px-4 font-medium text-emerald-700">Trip Price</td>
                <td className="py-3 px-4 text-right text-emerald-700 font-bold">${trip.planning.tripPrice.toLocaleString()}</td>
              </tr>
              <tr className="border-b bg-emerald-50/30">
                <td className="py-3 px-4 font-medium text-emerald-600">Customer Extra Charges</td>
                <td className="py-3 px-4 text-right text-emerald-600 font-bold">+${extraRevenue.toLocaleString()}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 text-rose-700">Trip Operating Costs</td>
                <td className="py-3 px-4 text-right text-rose-700 font-bold">-${totalTripCosts.toLocaleString()}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 text-rose-600">Driver Net Wage</td>
                <td className="py-3 px-4 text-right text-rose-600 font-bold">-${totalDriverCosts.toLocaleString()}</td>
              </tr>
              <tr className="bg-muted/30 font-bold">
                <td className="py-3 px-4">Net Profit</td>
                <td className={`py-3 px-4 text-right ${netProfit >= 0 ? "text-emerald-700" : "text-rose-700"}`}>
                  ${netProfit.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ModuleSection>

      <ModuleSection title="Invoicing" icon={<ReceiptText className="h-4 w-4" />}>
        <FormGrid cols={2}>
          <Field label="Tax Rate (%)">
            <Input type="number" value={form.taxApplied} onChange={(e) => set("taxApplied", e.target.value)} />
          </Field>
          <Field label="Credit Terms (days)">
            <Input type="number" value={form.creditTermsDays} onChange={(e) => set("creditTermsDays", e.target.value)} />
          </Field>
          <Field label="Due Date">
            <Input type="date" value={form.dueDate} onChange={(e) => set("dueDate", e.target.value)} />
          </Field>
          <ReadonlyField label="Payment Reminders Sent" value={form.paymentRemindersSent} />
        </FormGrid>

        <div className="flex gap-4 mt-4 flex-wrap">
          <div className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm ${form.invoiceGenerated ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-muted/20"}`}>
            {form.invoiceGenerated ? "✅" : "⏳"} Invoice Generated
          </div>
          <div className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm ${form.adminApproved ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-amber-50 border-amber-200 text-amber-700"}`}>
            {form.adminApproved ? "✅" : "⏳"} Admin Approved
          </div>
        </div>

        <div className="flex gap-3 flex-wrap justify-end mt-4">
          <Button variant="outline" onClick={() => set("invoiceGenerated", true)}>Generate Invoice</Button>
          <Button variant="outline" onClick={() => set("adminApproved", true)}>Admin Approve</Button>
          <Button onClick={() => onUpdate({ ...form, netProfit, totalTripCosts, totalDriverCosts })}>Save Settlement</Button>
        </div>
      </ModuleSection>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared: Admin Fallback Upload Card
// ─────────────────────────────────────────────────────────────────────────────
function AdminUploadCard({
  label,
  accept,
  multiple = false,
}: {
  label: string;
  accept: string;
  multiple?: boolean;
}) {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="border-2 border-dashed border-blue-200 rounded-xl p-4 bg-blue-50/30">
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        id={`admin-upload-${label}`}
        onChange={(e) => {
          const selected = Array.from(e.target.files || []);
          setFiles((prev) => [...prev, ...selected]);
        }}
      />
      <label htmlFor={`admin-upload-${label}`} className="flex items-center gap-3 cursor-pointer">
        <Upload className="h-5 w-5 text-blue-500 shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-blue-700">{label}</p>
          {files.length > 0 ? (
            <p className="text-xs text-blue-500">{files.map((f) => f.name).join(", ")}</p>
          ) : (
            <p className="text-xs text-blue-400">Click to upload</p>
          )}
        </div>
      </label>
    </div>
  );
}