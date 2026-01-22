import { cn } from "@/lib/utils";

type TripStatus = "scheduled" | "in_progress" | "delivered" | "delayed_delivered" | "pending" | "completed" | "ongoing";

interface StatusBadgeProps {
  status: TripStatus;
  className?: string;
}

const statusConfig: Record<TripStatus, { label: string; className: string }> = {
  scheduled: {
    label: "Scheduled",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  pending: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-700 border-yellow-200",
  },
  in_progress: {
    label: "In Progress",
    className: "bg-purple-100 text-purple-700 border-purple-200",
  },
  ongoing: {
    label: "Ongoing",
    className: "bg-purple-100 text-purple-700 border-purple-200",
  },
  delivered: {
    label: "Delivered",
    className: "bg-green-100 text-green-700 border-green-200",
  },
  completed: {
    label: "Completed",
    className: "bg-green-100 text-green-700 border-green-200",
  },
  delayed_delivered: {
    label: "Delayed",
    className: "bg-red-100 text-red-700 border-red-200",
  },
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
};