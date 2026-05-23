/**
 * Toast.tsx — Système de notifications temporaires (toasts).
 *
 * Un "toast" est un message qui apparaît brièvement en haut de l'écran
 * puis disparaît automatiquement (comme une notification mobile).
 *
 * Architecture en deux parties :
 *
 * 1. `useToasts()` — le "hook headless" (logique sans UI)
 *    Gère la liste des toasts actifs + les fonctions pour en ajouter/supprimer.
 *    "Headless" = logique pure, sans JSX. Le composant peut utiliser ce hook
 *    et l'UI qu'il veut.
 *
 * 2. `ToastHost` — le conteneur de toasts (UI)
 *    Positionnement fixe en haut de l'écran, affiche la liste de toasts.
 *
 * 3. `Toast` — le composant individuel (UI)
 *    Un seul toast avec son animation d'apparition et son bouton de fermeture.
 *
 * Astuce de l'ID unique : `Date.now() + Math.random()` génère un nombre quasi-unique
 * sans avoir besoin d'un compteur global ou d'une bibliothèque UUID.
 *
 * Pattern "optimistic dismiss" :
 *   Le setTimeout dans push() programme la disparition automatique.
 *   Si l'utilisateur ferme manuellement avant, dismiss() retire le toast du tableau
 *   mais le setTimeout s'exécutera quand même → l'appel `dismiss(id)` sur un toast
 *   déjà retiré est inoffensif (filter() ne trouve rien à retirer).
 */
'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle2, X } from 'lucide-react';

// Les 3 types de toasts (chacun a une couleur et une icône différentes)
export type ToastTone = 'error' | 'success' | 'info';

export interface ToastMessage {
  id: number;      // identifiant unique pour la key React et le dismiss
  tone: ToastTone;
  title?: string;  // titre optionnel en gras au-dessus du body
  body: string;    // message principal
}

/**
 * Hook personnalisé qui gère la liste des toasts actifs.
 *
 * `Omit<ToastMessage, 'id'>` : TypeScript retire le champ 'id' du type
 *   (l'id est généré automatiquement, l'appelant n'a pas à le fournir).
 *
 * `duration = 6000` : paramètre optionnel avec valeur par défaut (6 secondes).
 *
 * Retourne des helpers nommés (pushError, pushSuccess, pushInfo) pour éviter
 * d'avoir à passer `tone` à chaque appel.
 */
export function useToasts(duration = 6000) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  function push(input: Omit<ToastMessage, 'id'>) {
    // ID unique : timestamp + nombre aléatoire (évite les collisions si deux toasts
    // sont créés dans la même milliseconde)
    const id = Date.now() + Math.random();
    setToasts((cur) => [...cur, { ...input, id }]);
    // Auto-dismiss après `duration` ms
    if (duration > 0) {
      setTimeout(() => dismiss(id), duration);
    }
  }

  function dismiss(id: number) {
    // filter() crée un nouveau tableau sans le toast avec cet id
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
