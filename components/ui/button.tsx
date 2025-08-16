
import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const base = "inline-flex items-center justify-center rounded-2xl font-medium transition shadow-sm";
    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-2.5 text-base"
    }[size];
    const variants = {
      default: "bg-brand-600 text-white hover:bg-brand-700",
      outline: "border border-brand-300 text-brand-700 hover:bg-brand-50",
      ghost: "hover:bg-brand-50"
    }[variant];
    return (
      <button ref={ref} className={cn(base, sizes, variants, className)} {...props} />
    );
  }
);
Button.displayName = "Button";
