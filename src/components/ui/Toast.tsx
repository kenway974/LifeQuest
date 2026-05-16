'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle2, X } from 'lucide-react';

export type ToastTone = 'error' | 'success' | 'info';

export interface ToastMessage {
  id: number;
  tone: ToastTone;
  title?: string;
  body: string;
}

/**
 * Headless toast hook: returns a list of active toasts + helpers to push/dismiss.
 * Auto-dismiss after `duration` ms (default 6s).
 */
export function useToasts(duration = 6000) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  function push(input: Omit<ToastMessage, 'id'>) {
    const id = Date.now() + Math.random();
    setToasts((cur) => [...cur, { ...input, id }]);
    if (duration > 0) {
      setTimeout(() => dismiss(id), duration);
    }
  }

  function dismiss(id: number) {
    setToasts((cur) => cur.filter((t) => t.id !== id));
  }

  return {
    toasts,
    pushError: (body: string, title?: string) => push({ tone: 'error', body, title }),
    pushSuccess: (body: string, title?: string) => push({ tone: 'success', body, title }),
    pushInfo: (body: string, title?: string) => push({ tone: 'info', body, title }),
    dismiss,
  };
}

export function ToastHost({
  toasts,
  onDismiss,
}: {
  toasts: ToastMessage[];
  onDismiss: (id: number) => void;
}) {
  return (
    <div
      aria-live="assertive"
      aria-atomic="true"
      className="pointer-events-none fixed inset-x-0 top-4 z-50 flex flex-col items-center gap-2 px-4 sm:items-end sm:px-6"
    >
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function Toast({ toast, onDismiss }: { toast: ToastMessage; onDismiss: (id: number) => void }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  const palette =
    toast.tone === 'error'
      ? 'border-red-500/50 bg-red-950/80 text-red-100'
      : toast.tone === 'success'
        ? 'border-[color:var(--color-neon-cyan)]/50 bg-cyan-950/80 text-cyan-100'
        : 'border-[color:var(--color-border-bright)] bg-[color:var(--color-bg-card)]/90 text-[color:var(--color-text-primary)]';

  const Icon = toast.tone === 'error' ? AlertTriangle : CheckCircle2;
  const role = toast.tone === 'error' ? 'alert' : 'status';

  return (
    <div
      role={role}
      className={`pointer-events-auto flex max-w-md items-start gap-3 rounded-lg border px-4 py-3 shadow-2xl backdrop-blur-md transition-all duration-200 ${palette} ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
      }`}
    >
      <Icon className="mt-0.5 h-5 w-5 flex-shrink-0" />
      <div className="min-w-0 flex-1">
        {toast.title && <p className="font-semibold">{toast.title}</p>}
        <p className="whitespace-pre-line text-sm leading-relaxed">{toast.body}</p>
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="flex-shrink-0 rounded p-0.5 opacity-70 transition hover:opacity-100"
        aria-label="Fermer"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
