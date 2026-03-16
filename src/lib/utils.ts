import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// shadcn helper: merges Tailwind classes without conflicts
// e.g. cn("px-2 px-4") → "px-4"  (last one wins, no duplicates)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
