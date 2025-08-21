import * as React from "react";

export type ToastVariant = "default" | "accent" | "outline" | "ghost";

export type ToastItem = {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
};

// --- простейший стор для тостов ---
type Listener = (toasts: ToastItem[]) => void;

const store = {
  toasts: [] as ToastItem[],
  listeners: new Set<Listener>(),
};

function notify() {
  for (const l of store.listeners) l(store.toasts);
}

function add(toast: Omit<ToastItem, "id">) {
  const id = (
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? (crypto as any).randomUUID()
      : Math.random().toString(36).slice(2)
  ) as string;

  const t: ToastItem = { id, ...toast };
  store.toasts = [...store.toasts, t];
  notify();
  // авто-снятие через 3 сек
  setTimeout(() => remove(id), 3000);
  return id;
}

function remove(id: string) {
  store.toasts = store.toasts.filter((t) => t.id !== id);
  notify();
}

export function subscribe(listener: Listener) {
  store.listeners.add(listener);
  listener(store.toasts);
  return () => {
    store.listeners.delete(listener);
  };
}

export function useToast() {
  const toast = React.useCallback(
    (opts: Omit<ToastItem, "id">) => ({ id: add(opts) }),
    []
  );
  const dismiss = React.useCallback((id: string) => remove(id), []);
  return { toast, dismiss };
}

// Для Toaster, чтобы рисовать список
export function useToastList() {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);
  React.useEffect(() => subscribe(setToasts), []);
  const dismiss = React.useCallback((id: string) => remove(id), []);
  return { toasts, dismiss };
}
