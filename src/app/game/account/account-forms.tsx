/**
 * account-forms.tsx — 3 sous-formulaires indépendants pour modifier le compte.
 *
 * Chacun a son propre state local + son message de succès/erreur pour que
 * l'utilisateur sache exactement quelle action a réussi ou échoué.
 *
 * - Pseudo : update direct sur la table `profiles` (RLS limite à soi-même).
 *   La contrainte UNIQUE de la colonne déclenche une erreur 23505 si pris.
 *
 * - Email : `supabase.auth.updateUser({ email })` envoie un mail de confirmation
 *   AU NOUVEAU email avant de l'appliquer. Tant que l'utilisateur n'a pas cliqué
 *   sur le lien, son email reste l'ancien.
 *
 * - Mot de passe : `updateUser({ password })` applique immédiatement (la session
 *   active suffit comme preuve). Pas de check du mot de passe actuel pour v1.
 */
'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle } from 'lucide-react';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/client';
import { deleteAccountAction } from './actions';

const PseudoSchema = z
  .string()
  .min(3, 'Pseudo : 3 caractères minimum')
  .max(24, 'Pseudo : 24 caractères maximum')
  .regex(/^[a-zA-Z0-9_-]+$/, 'Lettres, chiffres, - et _ uniquement');

const EmailSchema = z.string().email('Email invalide');

const PasswordSchema = z.string().min(8, 'Mot de passe : 8 caractères minimum');

interface Props {
  initialPseudo: string;
  initialEmail: string;
}

export function AccountForms({ initialPseudo, initialEmail }: Props) {
  return (
    <div className="space-y-6">
      <PseudoForm initialPseudo={initialPseudo} />
      <EmailForm initialEmail={initialEmail} />
      <PasswordForm />
      <DangerZone pseudo={initialPseudo} />
    </div>
  );
}

/* -------------------- Zone de danger : suppression de compte -------------------- */

/**
 * Pattern "type-to-confirm" (à la GitHub).
 * Le bouton n'est activé que si l'utilisateur a tapé son pseudo EXACT.
 * Ça force un geste conscient et empêche les clics accidentels.
 */
function DangerZone({ pseudo }: { pseudo: string }) {
  const [confirm, setConfirm] = useState('');
  const [opened, setOpened] = useState(false);
  const [pending, startTransition] = useTransition();
  const canDelete = confirm === pseudo;

  function handleDelete() {
    if (!canDelete) return;
    startTransition(async () => {
      // L'action redirige toujours (vers / si succès, vers /game/account?error=
      // si problème). On ne reçoit jamais de retour ici en cas de succès.
      await deleteAccountAction(confirm);
    });
  }

  if (!opened) {
    return (
      <section className="rounded-lg border border-red-500/30 bg-red-950/15 p-6">
        <h2 className="mb-1 flex items-center gap-2 font-display text-lg font-bold text-red-300">
          <AlertTriangle className="h-5 w-5" />
          Zone de danger
        </h2>
        <p className="mb-4 text-xs text-[color:var(--color-text-muted)]">
          Supprimer définitivement ton compte et toutes tes données : quêtes,
          stats, étoiles, trophées, achats. Cette action est{' '}
          <strong className="text-red-200">irréversible</strong>.
        </p>
        <button
          type="button"
          onClick={() => setOpened(true)}
          className="rounded-md border border-red-500/50 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/10"
        >
          Supprimer mon compte…
        </button>
      </section>
    );
  }

  return (
    <section className="rounded-lg border-2 border-red-500/60 bg-red-950/20 p-6">
      <h2 className="mb-1 flex items-center gap-2 font-display text-lg font-bold text-red-300">
        <AlertTriangle className="h-5 w-5" />
        Confirmer la suppression
      </h2>
      <p className="mb-3 text-sm text-red-200">
        Tu vas perdre <strong>définitivement</strong> :
      </p>
      <ul className="mb-4 space-y-1 pl-5 text-xs text-[color:var(--color-text-secondary)]">
        <li className="list-disc">Ton historique de quêtes et ta progression</li>
        <li className="list-disc">Tes étoiles, trophées et XP accumulés</li>
        <li className="list-disc">Ta fiche perso et tes caractéristiques</li>
        <li className="list-disc">Tes quêtes personnalisées créées</li>
        <li className="list-disc">Tes achats (aucun remboursement automatique)</li>
      </ul>

      <label className="mb-1.5 block text-xs font-medium text-[color:var(--color-text-secondary)]">
        Pour confirmer, tape ton pseudo : <strong className="text-red-200">{pseudo}</strong>
      </label>
      <input
        type="text"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        autoComplete="off"
        className="mb-4 w-full rounded-md border border-red-500/40 bg-red-950/30 px-4 py-2.5 text-sm text-red-100 focus:border-red-400 focus:outline-none"
        placeholder={pseudo}
      />

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleDelete}
          disabled={!canDelete || pending}
          className="rounded-md bg-red-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-red-600"
        >
          {pending ? 'Suppression…' : 'Supprimer définitivement'}
        </button>
        <button
          type="button"
          onClick={() => {
            setOpened(false);
            setConfirm('');
          }}
          disabled={pending}
          className="rounded-md border border-[color:var(--color-border-bright)] px-5 py-2 text-sm transition hover:bg-[color:var(--color-bg-card-hover)] disabled:opacity-50"
        >
          Annuler
        </button>
      </div>
    </section>
  );
}

/* -------------------- Pseudo -------------------- */

function PseudoForm({ initialPseudo }: { initialPseudo: string }) {
  const router = useRouter();
  const [pseudo, setPseudo] = useState(initialPseudo);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ tone: 'ok' | 'err'; text: string } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);

    const parsed = PseudoSchema.safeParse(pseudo.trim());
    if (!parsed.success) {
      setMsg({ tone: 'err', text: parsed.error.issues[0]?.message ?? 'Invalide' });
      setBusy(false);
      return;
    }
    if (parsed.data === initialPseudo) {
      setBusy(false);
      return;
    }

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setMsg({ tone: 'err', text: 'Session expirée' });
      setBusy(false);
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .update({ pseudo: parsed.data, updated_at: new Date().toISOString() })
      .eq('id', user.id);

    setBusy(false);
    if (error) {
      // Code 23505 = unique violation (pseudo déjà pris par quelqu'un d'autre)
      setMsg({
        tone: 'err',
        text:
          error.code === '23505'
            ? 'Ce pseudo est déjà pris'
            : 'Impossible de modifier le pseudo',
      });
      return;
    }
    setMsg({ tone: 'ok', text: 'Pseudo mis à jour' });
    router.refresh();
  }

  return (
    <section className="card-neon p-6">
      <h2 className="mb-1 font-display text-lg font-bold">Pseudo</h2>
      <p className="mb-4 text-xs text-[color:var(--color-text-muted)]">
        Visible publiquement sur ton profil et dans les recherches.
      </p>
      <form onSubmit={submit} className="space-y-3" noValidate>
        <input
          type="text"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          required
          minLength={3}
          maxLength={24}
          pattern="[a-zA-Z0-9_-]+"
          className="w-full rounded-md border border-[color:var(--color-border-bright)] bg-[color:var(--color-bg-elevated)] px-4 py-2.5 text-sm focus:border-[color:var(--color-neon-cyan)] focus:outline-none"
        />
        <FormFooter
          busy={busy}
          msg={msg}
          buttonLabel="Mettre à jour"
          disabled={pseudo.trim() === initialPseudo}
        />
      </form>
    </section>
  );
}

/* -------------------- Email -------------------- */

function EmailForm({ initialEmail }: { initialEmail: string }) {
  const [email, setEmail] = useState(initialEmail);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ tone: 'ok' | 'err'; text: string } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);

    const parsed = EmailSchema.safeParse(email.trim());
    if (!parsed.success) {
      setMsg({ tone: 'err', text: parsed.error.issues[0]?.message ?? 'Invalide' });
      setBusy(false);
      return;
    }
    if (parsed.data === initialEmail) {
      setBusy(false);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ email: parsed.data });

    setBusy(false);
    if (error) {
      setMsg({ tone: 'err', text: error.message });
      return;
    }
    setMsg({
      tone: 'ok',
      text: 'Email de confirmation envoyé. Clique sur le lien pour valider le changement.',
    });
  }

  return (
    <section className="card-neon p-6">
      <h2 className="mb-1 font-display text-lg font-bold">Email</h2>
      <p className="mb-4 text-xs text-[color:var(--color-text-muted)]">
        Tu recevras un lien de confirmation à la nouvelle adresse avant que le
        changement soit effectif.
      </p>
      <form onSubmit={submit} className="space-y-3" noValidate>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
          className="w-full rounded-md border border-[color:var(--color-border-bright)] bg-[color:var(--color-bg-elevated)] px-4 py-2.5 text-sm focus:border-[color:var(--color-neon-cyan)] focus:outline-none"
        />
        <FormFooter
          busy={busy}
          msg={msg}
          buttonLabel="Modifier l'email"
          disabled={email.trim() === initialEmail}
        />
      </form>
    </section>
  );
}

/* -------------------- Mot de passe -------------------- */

function PasswordForm() {
  const [pwd, setPwd] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ tone: 'ok' | 'err'; text: string } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);

    const parsed = PasswordSchema.safeParse(pwd);
    if (!parsed.success) {
      setMsg({ tone: 'err', text: parsed.error.issues[0]?.message ?? 'Invalide' });
      setBusy(false);
      return;
    }
    if (pwd !== confirm) {
      setMsg({ tone: 'err', text: 'Les mots de passe ne correspondent pas' });
      setBusy(false);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: parsed.data });

    setBusy(false);
    if (error) {
      setMsg({ tone: 'err', text: 'Impossible de modifier le mot de passe' });
      return;
    }
    setMsg({ tone: 'ok', text: 'Mot de passe mis à jour' });
    setPwd('');
    setConfirm('');
  }

  return (
    <section className="card-neon p-6">
      <h2 className="mb-1 font-display text-lg font-bold">Mot de passe</h2>
      <p className="mb-4 text-xs text-[color:var(--color-text-muted)]">
        Au moins 8 caractères. Tu restes connecté après le changement.
      </p>
      <form onSubmit={submit} className="space-y-3" noValidate>
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          autoComplete="new-password"
          required
          minLength={8}
          className="w-full rounded-md border border-[color:var(--color-border-bright)] bg-[color:var(--color-bg-elevated)] px-4 py-2.5 text-sm focus:border-[color:var(--color-neon-cyan)] focus:outline-none"
        />
        <input
          type="password"
          placeholder="Confirme le mot de passe"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          autoComplete="new-password"
          required
          minLength={8}
          className="w-full rounded-md border border-[color:var(--color-border-bright)] bg-[color:var(--color-bg-elevated)] px-4 py-2.5 text-sm focus:border-[color:var(--color-neon-cyan)] focus:outline-none"
        />
        <FormFooter
          busy={busy}
          msg={msg}
          buttonLabel="Modifier le mot de passe"
          disabled={!pwd || !confirm}
        />
      </form>
    </section>
  );
}

/* -------------------- Footer commun -------------------- */

function FormFooter({
  busy,
  msg,
  buttonLabel,
  disabled,
}: {
  busy: boolean;
  msg: { tone: 'ok' | 'err'; text: string } | null;
  buttonLabel: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <button
        type="submit"
        disabled={busy || disabled}
        className="btn-neon rounded-md px-5 py-2 text-sm disabled:opacity-50"
      >
        {busy ? 'Enregistrement…' : buttonLabel}
      </button>
      {msg && (
        <p
          role={msg.tone === 'ok' ? 'status' : 'alert'}
          className={`text-xs ${
            msg.tone === 'ok'
              ? 'text-[color:var(--color-difficulty-easy)]'
              : 'text-red-300'
          }`}
        >
          {msg.text}
        </p>
      )}
    </div>
  );
}
