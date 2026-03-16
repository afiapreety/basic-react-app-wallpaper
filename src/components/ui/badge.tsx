import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "done" | "outline" | "secondary" | "destructive";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

// Usage: <Badge variant="done">Done</Badge>
export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants: Record<BadgeVariant, string> = {
    default: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200",
    done: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    secondary: "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-300",
    outline: "border border-slate-200 text-slate-900 dark:border-slate-700 dark:text-slate-100",
    destructive: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  };
  return (
    <span
      className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", variants[variant], className)}
      {...props}
    />
  );
}
