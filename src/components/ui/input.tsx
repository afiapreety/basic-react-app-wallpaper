import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

// Simple styled input — spreads all native <input> props through
// Usage: <Input placeholder="Type here..." value={val} onChange={...} />
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-sm text-slate-900",
          "placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400",
          // dark mode: dark background, light text, lighter border
          "dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-slate-500",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
