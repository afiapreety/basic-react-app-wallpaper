import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// cva = "class variance authority" — generates different class sets per variant
// This is the shadcn pattern: one component, many looks via props
const buttonVariants = cva(
  // Base classes applied to every button
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:     "bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300",
        outline:     "border border-slate-300 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800",
        ghost:       "hover:bg-slate-100 dark:hover:bg-slate-800",
        destructive: "bg-red-500 text-white hover:bg-red-600",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm:      "h-8 px-3 text-xs",
        icon:    "h-9 w-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

// Usage: <Button variant="outline" size="sm">Click me</Button>
export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
