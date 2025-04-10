import { cn } from "@/lib/utils"
import { getStatusColor } from "./utils"

interface AttendanceStatusBadgeProps {
  status: "present" | "absent" | "excused" | "late" | "attended" | "missed" | "upcoming"
  className?: string
}

export function AttendanceStatusBadge({ status, className }: AttendanceStatusBadgeProps) {
  const statusText = status.charAt(0).toUpperCase() + status.slice(1)
  const colorClasses = getStatusColor(status)

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        colorClasses,
        className,
      )}
    >
      {statusText}
    </span>
  )
}

