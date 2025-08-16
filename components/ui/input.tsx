
import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-xl border border-brand-200 bg-white/80 px-3 py-2 text-sm outline-none ring-0 focus:border-brand-400",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";
export { Input };
