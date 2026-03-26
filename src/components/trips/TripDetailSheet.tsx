
import { useState } from "react";
import { ChevronLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  STATUS_BADGE_STYLES,
  STATUS_LABELS,
  NEXT_STATUS,
} from "@/lib/tripStatusUtils";
import { Trip } from "@/data/mockTripData";

import { TripOverviewTab } from "./modules/TripOverviewTab";
 import {  LoadAssignmentTab, ExpensePreAssignmentTab, DriverAcceptanceTab, LoadingDataTab, MonitoringTab, UnloadingTab, ContainerDeliveryTab, TripExpenseTab, DriverWagesTab, SettlementTab } from "./modules/AllModule";  
import { ExtraChargesTab } from "./modules/ExtraChargesTab";
interface TripDetailPageProps {
  trip: Trip;
  onBack: () => void;
  onStatusUpdate: (tripId: string, newStatus: string) => void;
}

const NAV_MODULES = [
  { key: "overview",             label: "Overview",              short: "Overview"   },
  { key: "loadAssignment",       label: "Load Assignment",  short: "Assignment" },
  { key: "expensePreAssignment", label: "Cost Estimate",    short: "Est. Costs" },
  { key: "driverAcceptance",     label: "Driver Start",     short: "Driver"     },
  { key: "loadingData",          label: "Loading",          short: "Loading"    },
  { key: "monitoring",           label: "Monitoring",       short: "Monitor"    },
  { key: "unloading",            label: "Unloading & POD",  short: "POD"        },
  { key: "extraCharges",         label: "Extra Charges", short: "Extras"     },
  { key: "containerDelivery",    label: "Container Return", short: "Container"  },
  { key: "tripExpense",          label: "Trip Expense",    short: "Expense"    },
  { key: "driverWages",          label: "Driver Wages",    short: "Wages"      },
  { key: "settlement",           label: "Settlement",      short: "Settlement" },
];
export function TripDetailPage({ trip, onBack, onStatusUpdate }: TripDetailPageProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [localTrip, setLocalTrip] = useState<Trip>(trip);

  const handleFieldUpdate = (module: keyof Trip, data: any) => {
    setLocalTrip((prev) => ({ ...prev, [module]: { ...(prev[module] as any), ...data } }));
  };

  const handleAdvanceStatus = () => {
    const next = NEXT_STATUS[localTrip.status];
    if (!next) return;
    setLocalTrip((prev) => ({ ...prev, status: next }));
    onStatusUpdate(localTrip.id, next);
  };

  const nextStatus = NEXT_STATUS[localTrip.status];
  const currentStatus = localTrip.status;

  const renderTab = () => {
    switch (activeTab) {
      case "overview":
        return <TripOverviewTab trip={localTrip} />;
      case "loadAssignment":
        return <LoadAssignmentTab trip={localTrip} onUpdate={(d) => handleFieldUpdate("loadAssignment", d)} />;
      case "expensePreAssignment":
        return <ExpensePreAssignmentTab trip={localTrip} onUpdate={(d) => handleFieldUpdate("expensePreAssignment", d)} />;
      // M4: admin sees read-only data filled by driver; can upload images as fallback
      case "driverAcceptance":
        return <DriverAcceptanceTab trip={localTrip} isAdminView onUpdate={(d) => handleFieldUpdate("driverAcceptance", d)} />;
      // M5: admin sees read-only data filled by driver; can upload images as fallback
      case "loadingData":
        return <LoadingDataTab trip={localTrip} isAdminView onUpdate={(d) => handleFieldUpdate("loadingData", d)} />;
      case "monitoring":
        return <MonitoringTab trip={localTrip} />;
      case "unloading":
        return <UnloadingTab trip={localTrip} onUpdate={(d) => handleFieldUpdate("unloading", d)} />;
      // M8 + M10 merged
      case "extraCharges":
        return <ExtraChargesTab trip={localTrip} onUpdate={(d) => handleFieldUpdate("extraCharges", d)} />;
      case "containerDelivery":
        return <ContainerDeliveryTab trip={localTrip} onUpdate={(d) => handleFieldUpdate("containerDelivery", d)} />;
      case "tripExpense":
        return <TripExpenseTab trip={localTrip} onUpdate={(d) => handleFieldUpdate("tripExpense", d)} />;
      case "driverWages":
        return <DriverWagesTab trip={localTrip} onUpdate={(d) => handleFieldUpdate("driverWages", d)} />;
      case "settlement":
        return <SettlementTab trip={localTrip} onUpdate={(d) => handleFieldUpdate("settlement", d)} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full min-h-screen bg-background">
      {/* ── Top bar ── */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b shadow-sm">
        <div className="flex items-center gap-4 px-6 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full shrink-0"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-lg font-bold tracking-tight text-foreground truncate">
                {localTrip.tripId}
              </h2>
              <Badge
                variant="outline"
                className={`text-xs rounded-full capitalize ${STATUS_BADGE_STYLES[currentStatus] ?? ""}`}
              >
                {STATUS_LABELS[currentStatus] ?? currentStatus}
              </Badge>
              <span className="text-xs text-muted-foreground hidden sm:inline">
                {localTrip.driver} · {localTrip.truck} · {localTrip.origin} → {localTrip.destination}
              </span>
            </div>
          </div>

          {nextStatus && (
            <Button
              size="sm"
              className="gap-2 shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white shadow"
              onClick={handleAdvanceStatus}
            >
              <CheckCircle2 className="h-4 w-4" />
              Mark as {STATUS_LABELS[nextStatus]}
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
          {!nextStatus && currentStatus === "paid" && (
            <Badge className="bg-green-600/10 text-green-700 border-green-200 border gap-1">
              <CheckCircle2 className="h-3 w-3" /> Completed
            </Badge>
          )}
        </div>

        {/* ── Module Navbar — all tabs always clickable ── */}
        <div className="flex overflow-x-auto border-t bg-muted/20 px-2 gap-0 scrollbar-hide">
          {NAV_MODULES.map((mod) => {
            const isActive = activeTab === mod.key;
            return (
              <button
                key={mod.key}
                onClick={() => setActiveTab(mod.key)}
                className={[
                  "flex items-center whitespace-nowrap px-4 py-3 text-xs font-semibold border-b-2 transition-all shrink-0",
                  isActive
                    ? "border-primary text-primary bg-background"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-background/60",
                ].join(" ")}
              >
                <span className="hidden lg:inline">{mod.label}</span>
                <span className="lg:hidden">{mod.short}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Tab content ── */}
      <div className="flex-1 overflow-y-auto p-6">
        <div
          className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-200"
          key={activeTab}
        >
          {renderTab()}
        </div>
      </div>
    </div>
  );
}