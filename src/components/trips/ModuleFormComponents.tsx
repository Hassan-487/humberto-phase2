// // ModuleFormComponents.tsx  –  Shared UI primitives for module forms
// import { ReactNode } from "react";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";

// /** Section card wrapper */
// export function ModuleSection({ title, icon, children }: { title: string; icon?: ReactNode; children: ReactNode }) {
//   return (
//     <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm mb-6">
//       <div className="px-6 py-4 border-b bg-muted/20 flex items-center gap-2">
//         {icon && <span className="text-primary">{icon}</span>}
//         <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">{title}</h3>
//       </div>
//       <div className="p-6">{children}</div>
//     </div>
//   );
// }

// /** Responsive grid for form fields */
// export function FormGrid({ cols = 2, children }: { cols?: 2 | 3 | 4; children: ReactNode }) {
//   const colClass = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[cols];
//   return <div className={`grid grid-cols-1 ${colClass} gap-5`}>{children}</div>;
// }

// /** Labelled field */
// export function Field({ label, children, span }: { label: string; children: ReactNode; span?: boolean }) {
//   return (
//     <div className={span ? "col-span-full" : ""}>
//       <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">{label}</Label>
//       {children}
//     </div>
//   );
// }

// /** Read-only display value */
// export function ReadonlyField({ label, value, span }: { label: string; value: string | number | ReactNode; span?: boolean }) {
//   return (
//     <div className={span ? "col-span-full" : ""}>
//       <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">{label}</Label>
//       <div className="rounded-lg border bg-muted/30 px-3 py-2 text-sm font-medium text-foreground min-h-[38px] flex items-center">
//         {value ?? <span className="text-muted-foreground/50 italic">—</span>}
//       </div>
//     </div>
//   );
// }

// /** Metric card */
// export function MetricCard({
//   label, value, sub, color = "default",
// }: { label: string; value: string | number; sub?: string; color?: "default" | "green" | "red" | "blue" | "amber" }) {
//   const colors = {
//     default: "bg-card border-border",
//     green: "bg-emerald-50 border-emerald-200 text-emerald-800",
//     red: "bg-rose-50 border-rose-200 text-rose-800",
//     blue: "bg-blue-50 border-blue-200 text-blue-800",
//     amber: "bg-amber-50 border-amber-200 text-amber-800",
//   };
//   return (
//     <div className={`rounded-xl border p-4 ${colors[color]}`}>
//       <p className="text-xs font-semibold uppercase tracking-wide opacity-70 mb-1">{label}</p>
//       <p className="text-2xl font-bold">{value}</p>
//       {sub && <p className="text-xs opacity-60 mt-1">{sub}</p>}
//     </div>
//   );
// }

// /** Status timeline step */
// export function TimelineEvent({ time, message, level = "info" }: { time: string; message: string; level?: "info" | "warning" | "error" }) {
//   const dotColor = { info: "bg-blue-400", warning: "bg-amber-400", error: "bg-rose-400" }[level];
//   return (
//     <div className="flex gap-3 group">
//       <div className="flex flex-col items-center">
//         <div className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${dotColor}`} />
//         <div className="w-px flex-1 bg-border/60 group-last:hidden mt-1" />
//       </div>
//       <div className="pb-4">
//         <p className="text-xs text-muted-foreground font-medium mb-0.5">{new Date(time).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}</p>
//         <p className="text-sm text-foreground">{message}</p>
//       </div>
//     </div>
//   );
// }

// /** Cost row for expense tables */
// export function CostRow({ label, estimated, actual }: { label: string; estimated?: number; actual?: number }) {
//   return (
//     <tr className="border-b last:border-0 hover:bg-muted/20 transition-colors">
//       <td className="py-3 px-4 text-sm font-medium text-foreground">{label}</td>
//       {estimated !== undefined && (
//         <td className="py-3 px-4 text-sm text-right text-muted-foreground">
//           {estimated > 0 ? `$${estimated.toLocaleString()}` : "—"}
//         </td>
//       )}
//       {actual !== undefined && (
//         <td className="py-3 px-4 text-sm text-right font-semibold text-foreground">
//           {actual > 0 ? `$${actual.toLocaleString()}` : "—"}
//         </td>
//       )}
//     </tr>
//   );
// }

// /** Alert badge */
// export function AlertRow({ level, message, time }: { level: string; message: string; time: string }) {
//   const styles = level === "warning"
//     ? "bg-amber-50 border-amber-200 text-amber-800"
//     : "bg-rose-50 border-rose-200 text-rose-800";
//   return (
//     <div className={`rounded-lg border px-4 py-3 text-sm ${styles}`}>
//       <p className="font-semibold capitalize">{level}</p>
//       <p>{message}</p>
//       <p className="text-xs opacity-70 mt-1">{new Date(time).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}</p>
//     </div>
//   );
// }

// ModuleFormComponents.tsx  –  Shared UI primitives for module forms
import { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

/** Section card wrapper */
export function ModuleSection({ title, icon, children }: { title: string; icon?: ReactNode; children: ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm mb-6">
      <div className="px-6 py-4 border-b bg-muted/20 flex items-center gap-2">
        {icon && <span className="text-primary">{icon}</span>}
        <h3 className="font-bold text-sm uppercase tracking-widest text-blue-500">{title}</h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

/** Responsive grid for form fields */
export function FormGrid({ cols = 2, children }: { cols?: 2 | 3 | 4; children: ReactNode }) {
  const colClass = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[cols];
  return <div className={`grid grid-cols-1 ${colClass} gap-5`}>{children}</div>;
}

/** Labelled field wrapper */
export function Field({ label, children, span }: { label: string; children: ReactNode; span?: boolean }) {
  return (
    <div className={span ? "col-span-full" : ""}>
      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">{label}</Label>
      {children}
    </div>
  );
}

/** Standard Text Input Field */
export function InputField({ label, span, ...props }: { label: string; span?: boolean } & React.ComponentProps<typeof Input>) {
  return (
    <Field label={label} span={span}>
      <Input {...props} />
    </Field>
  );
}

/** Textarea Field for multi-line text */
export function TextAreaField({ label, span, ...props }: { label: string; span?: boolean } & React.ComponentProps<typeof Textarea>) {
  return (
    <Field label={label} span={span}>
      <Textarea {...props} />
    </Field>
  );
}

/** Select Field with options array */
export function SelectField({
  label,
  span,
  placeholder = "Select an option...",
  options,
  value,
  onValueChange,
  disabled
}: {
  label: string;
  span?: boolean;
  placeholder?: string;
  options: { label: string; value: string }[];
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <Field label={label} span={span}>
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
}

/** Read-only display value */
export function ReadonlyField({ label, value, span }: { label: string; value: string | number | ReactNode; span?: boolean }) {
  return (
    <div className={span ? "col-span-full" : ""}>
      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">{label}</Label>
      <div className="rounded-lg border bg-muted/30 px-3 py-2 text-sm font-medium text-foreground min-h-[38px] flex items-center">
        {value ?? <span className="text-muted-foreground/50 italic">—</span>}
      </div>
    </div>
  );
}

/** Metric card */
export function MetricCard({
  label, value, sub, color = "default",
}: { label: string; value: string | number; sub?: string; color?: "default" | "green" | "red" | "blue" | "amber" }) {
  const colors = {
    default: "bg-card border-border",
    green: "bg-emerald-50 border-emerald-200 text-emerald-800",
    red: "bg-rose-50 border-rose-200 text-rose-800",
    blue: "bg-blue-50 border-blue-200 text-blue-800",
    amber: "bg-amber-50 border-amber-200 text-amber-800",
  };
  return (
    <div className={`rounded-xl border p-4 ${colors[color]}`}>
      <p className="text-xs font-semibold uppercase tracking-wide opacity-70 mb-1">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
      {sub && <p className="text-xs opacity-60 mt-1">{sub}</p>}
    </div>
  );
}

/** Status timeline step */
export function TimelineEvent({ time, message, level = "info" }: { time: string; message: string; level?: "info" | "warning" | "error" }) {
  const dotColor = { info: "bg-blue-400", warning: "bg-amber-400", error: "bg-rose-400" }[level];
  return (
    <div className="flex gap-3 group">
      <div className="flex flex-col items-center">
        <div className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${dotColor}`} />
        <div className="w-px flex-1 bg-border/60 group-last:hidden mt-1" />
      </div>
      <div className="pb-4">
        <p className="text-xs text-muted-foreground font-medium mb-0.5">{new Date(time).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}</p>
        <p className="text-sm text-foreground">{message}</p>
      </div>
    </div>
  );
}

/** Cost row for expense tables */
export function CostRow({ label, estimated, actual }: { label: string; estimated?: number; actual?: number }) {
  return (
    <tr className="border-b last:border-0 hover:bg-muted/20 transition-colors">
      <td className="py-3 px-4 text-sm font-medium text-foreground">{label}</td>
      {estimated !== undefined && (
        <td className="py-3 px-4 text-sm text-right text-muted-foreground">
          {estimated > 0 ? `$${estimated.toLocaleString()}` : "—"}
        </td>
      )}
      {actual !== undefined && (
        <td className="py-3 px-4 text-sm text-right font-semibold text-foreground">
          {actual > 0 ? `$${actual.toLocaleString()}` : "—"}
        </td>
      )}
    </tr>
  );
}

/** Alert badge */
export function AlertRow({ level, message, time }: { level: string; message: string; time: string }) {
  const styles = level === "warning"
    ? "bg-amber-50 border-amber-200 text-amber-800"
    : "bg-rose-50 border-rose-200 text-rose-800";
  return (
    <div className={`rounded-lg border px-4 py-3 text-sm ${styles}`}>
      <p className="font-semibold capitalize">{level}</p>
      <p>{message}</p>
      <p className="text-xs opacity-70 mt-1">{new Date(time).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}</p>
    </div>
  );
}