
import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full rounded-xl border border-brand-200 bg-white/80 px-3 py-2 text-sm outline-none ring-0 focus:border-brand-400",
        className
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";
export { Textarea };
