// modules/ExtraChargesTab.tsx
// Merged Module 8 (Customer Extra Costs) + Module 10 (Additional Trip Costs)
// Presented as two clearly labelled sections within one tab.

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ModuleSection, FormGrid, Field,
} from "@/components/trips/ModuleFormComponents";
import { Trip } from "@/data/mockTripData";
import { DollarSign, Wrench, Receipt } from "lucide-react";

interface ExtraChargesTabProps {
  trip: Trip;
  onUpdate: (d: any) => void;
}

// Merge both modules into a single state shape
function buildInitialState(trip: Trip) {
  return {
    // ── Section 1: Customer Extra Costs (M8) ──
    detentionCharges: (trip.customerExtraCosts as any)?.detentionCharges ?? 0,
    otherExtraCosts: (trip.customerExtraCosts as any)?.otherExtraCosts ?? [],

    // ── Section 2: Operational Additional Costs (M10) ──
    localFreightFee:            (trip.additionalCosts as any)?.localFreightFee ?? 0,
    localFreightLocation:       (trip.additionalCosts as any)?.localFreightLocation ?? "",
    localCarrierName:           (trip.additionalCosts as any)?.localCarrierName ?? "",
    containerHandlingCompany:   (trip.additionalCosts as any)?.containerHandlingCompany ?? "",
    roadServiceCost:            (trip.additionalCosts as any)?.roadServiceCost ?? 0,
    roadServiceCompany:         (trip.additionalCosts as any)?.roadServiceCompany ?? "",
    roadServiceDescription:     (trip.additionalCosts as any)?.roadServiceDescription ?? "",
  };
}

export function ExtraChargesTab({ trip, onUpdate }: ExtraChargesTabProps) {
  const [form, setForm] = useState(buildInitialState(trip));

  // New line item state for "other extra costs"
  const [newLabel, setNewLabel] = useState("");
  const [newAmount, setNewAmount] = useState("");

  const set = (k: string, v: any) => setForm((p) => ({ ...p, [k]: v }));

  const addExtra = () => {
    if (!newLabel.trim()) return;
    setForm((p) => ({
      ...p,
      otherExtraCosts: [
        ...p.otherExtraCosts,
        { description: newLabel.trim(), amount: Number(newAmount) || 0 },
      ],
    }));
    setNewLabel("");
    setNewAmount("");
  };

  const removeExtra = (i: number) =>
    setForm((p) => ({
      ...p,
      otherExtraCosts: p.otherExtraCosts.filter((_: any, j: number) => j !== i),
    }));

  // Totals
  const customerTotal =
    (form.detentionCharges || 0) +
    form.otherExtraCosts.reduce((s: number, e: any) => s + Number(e.amount || 0), 0);

  const operationalTotal =
    (form.localFreightFee || 0) + (form.roadServiceCost || 0);

  const grandTotal = customerTotal + operationalTotal;

  return (
    <div className="space-y-6">

      {/* ── SECTION 1: Customer Extra Costs (M8) ── */}
      <ModuleSection
        title="Section 1 – Customer Extra Costs (M8)"
        icon={<Receipt className="h-4 w-4" />}
      >
        <p className="text-xs text-muted-foreground mb-4">
          Billable charges passed on to the customer — detention fees and any other agreed extra costs.
        </p>

        <FormGrid cols={2}>
          <Field label="Detention Charges (MXN)">
            <Input
              type="number"
              value={form.detentionCharges}
              onChange={(e) => set("detentionCharges", Number(e.target.value))}
            />
          </Field>
        </FormGrid>

        {/* Dynamic other extra costs */}
        <div className="mt-5">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
            Other Extra Costs
          </p>

          <div className="space-y-2 mb-3">
            {form.otherExtraCosts.length === 0 && (
              <p className="text-xs text-muted-foreground italic">No additional charges added yet.</p>
            )}
            {form.otherExtraCosts.map((ec: any, i: number) => (
              <div
                key={i}
                className="flex items-center justify-between bg-muted/20 border rounded-lg px-4 py-2 text-sm"
              >
                <span className="flex-1 font-medium">{ec.description}</span>
                <span className="font-semibold w-28 text-right">
                  ${Number(ec.amount).toLocaleString()} MXN
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-rose-500 h-7 ml-3"
                  onClick={() => removeExtra(i)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>

          {/* Add new line item */}
          <div className="flex gap-2 mt-2">
            <Input
              placeholder="Description (e.g. Extra unloading labor)"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              className="flex-1"
            />
            <Input
              type="number"
              placeholder="Amount MXN"
              className="w-36"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
            />
            <Button variant="outline" onClick={addExtra} type="button">
              + Add
            </Button>
          </div>
        </div>

        {/* Section 1 subtotal */}
        <div className="mt-4 flex justify-between items-center bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-3">
          <p className="text-sm font-semibold text-emerald-700">Total Customer Extra Charges</p>
          <p className="text-lg font-bold text-emerald-700">${customerTotal.toLocaleString()} MXN</p>
        </div>
      </ModuleSection>

      {/* ── SECTION 2: Operational Additional Costs (M10) ── */}
      <ModuleSection
        title="Section 2 – Operational Additional Costs (M10)"
        icon={<Wrench className="h-4 w-4" />}
      >
        <p className="text-xs text-muted-foreground mb-4">
          Internal operational costs not in the original budget — local freight, container handling, road service, etc.
        </p>

        <FormGrid cols={2}>
          <Field label="Local Freight Fee (MXN)">
            <Input
              type="number"
              value={form.localFreightFee}
              onChange={(e) => set("localFreightFee", Number(e.target.value))}
            />
          </Field>
          <Field label="Local Freight Location">
            <Input
              value={form.localFreightLocation}
              onChange={(e) => set("localFreightLocation", e.target.value)}
              placeholder="City / terminal"
            />
          </Field>
          <Field label="Local Carrier Name">
            <Input
              value={form.localCarrierName}
              onChange={(e) => set("localCarrierName", e.target.value)}
              placeholder="Carrier or 3rd party name"
            />
          </Field>
          <Field label="Container Handling Company">
            <Input
              value={form.containerHandlingCompany}
              onChange={(e) => set("containerHandlingCompany", e.target.value)}
              placeholder="Company name"
            />
          </Field>
          <Field label="Road Service Cost (MXN)">
            <Input
              type="number"
              value={form.roadServiceCost}
              onChange={(e) => set("roadServiceCost", Number(e.target.value))}
            />
          </Field>
          <Field label="Road Service Company">
            <Input
              value={form.roadServiceCompany}
              onChange={(e) => set("roadServiceCompany", e.target.value)}
              placeholder="Company name"
            />
          </Field>
          <Field label="Road Service Description" span>
            <Textarea
              value={form.roadServiceDescription}
              onChange={(e) => set("roadServiceDescription", e.target.value)}
              placeholder="Describe the road service performed…"
              rows={3}
            />
          </Field>
        </FormGrid>

        {/* Section 2 subtotal */}
        <div className="mt-4 flex justify-between items-center bg-amber-50 border border-amber-200 rounded-xl px-5 py-3">
          <p className="text-sm font-semibold text-amber-700">Total Operational Extra Costs</p>
          <p className="text-lg font-bold text-amber-700">${operationalTotal.toLocaleString()} MXN</p>
        </div>
      </ModuleSection>

      {/* ── Grand Total ── */}
      <div className="flex justify-between items-center bg-card border rounded-2xl px-6 py-4 shadow-sm">
        <div>
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">Combined Total</p>
          <p className="text-xs text-muted-foreground mt-0.5">Customer charges + Operational costs</p>
        </div>
        <p className="text-2xl font-bold text-foreground">${grandTotal.toLocaleString()} MXN</p>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <Button onClick={() => onUpdate(form)}>Save All Extra Charges</Button>
      </div>
    </div>
  );
}