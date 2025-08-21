import { X } from "lucide-react";
import { useToastList } from "./use-toast";

export function Toaster() {
  const { toasts, dismiss } = useToastList();

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col gap-2">
      {toasts.map((t) => {
        const variant = t.variant ?? "default"; 

        const variantClasses =
          variant === "accent"
            ? "border-violet-200 bg-violet-50/90"
            : variant === "outline"
            ? "border-slate-300 bg-white/90"
            : variant === "ghost"
            ? "border-transparent bg-white/70"
            : "border-slate-200 bg-white/90";

        return (
          <div
            key={t.id}
            className={`min-w-[280px] max-w-[360px] rounded-xl border shadow-lg backdrop-blur px-4 py-3 ${variantClasses}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-1">
                {t.title && (
                  <p className="font-semibold leading-tight">{t.title}</p>
                )}
                {t.description && (
                  <p className="text-sm text-slate-600 mt-0.5">
                    {t.description}
                  </p>
                )}
              </div>
              <button
                aria-label="Close"
                className="shrink-0 rounded-md p-1 hover:bg-black/5"
                onClick={() => dismiss(t.id)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
