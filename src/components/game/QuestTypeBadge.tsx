/**
 * QuestTypeBadge.tsx — Pastille colorée indiquant le type d'une quête
 * (Principale / Secondaire / Personnalisée), icône + libellé.
 *
 * Réutilisable côté serveur comme client (aucune dépendance interactive).
 */
import { questTypeMeta, type QuestType } from '@/lib/quest-type';

interface Props {
  type: QuestType;
  className?: string;
}

export function QuestTypeBadge({ type, className = '' }: Props) {
  const meta = questTypeMeta[type];
  const Icon = meta.Icon;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${className}`}
      style={{
        color: meta.color,
        borderColor: meta.color,
        backgroundColor: `color-mix(in srgb, ${meta.color} 14%, transparent)`,
      }}
    >
      <Icon className="h-3 w-3" />
      {meta.label}
    </span>
  );
}
