'use client';

import { useState, useTransition } from 'react';
import { STAT_DEFS, type StatKey, type StatValues } from '@/lib/character-stats';
import { submitCharacterQuestionnaireAction } from './actions';

export function CharacterQuestionnaire() {
  const [values, setValues] = useState<StatValues>(() => {
    const init: Partial<StatValues> = {};
    for (const s of STAT_DEFS) init[s.key] = 50;
    return init as StatValues;
  });
  const [pending, startTransition] = useTransition();

  function setStat(key: StatKey, v: number) {
    setValues((cur) => ({ ...cur, [key]: v }));
  }

  function submit() {
    startTransition(async () => {
      await submitCharacterQuestionnaireAction(values);
    });
  }

  return (
    <div className="space-y-6">
      <div className="card-neon p-6">
        <h2 className="mb-2 font-display text-xl font-bold">Note-toi sans filtre</h2>
        <p className="text-sm text-[color:var(--color-text-secondary)]">
          De 0 à 100, où es-tu vraiment <em>aujourd&rsquo;hui</em> sur chaque stat ? C&rsquo;est ta baseline,
          elle ne sera jamais modifiée — tes stats actuelles évolueront en fonction de tes accomplissements
          et de tes tâches ratées.
        </p>
      </div>

      <div className="card-neon space-y-5 p-6">
        {STAT_DEFS.map((s) => {
          const Icon = s.icon;
          const v = values[s.key];
          return (
            <div key={s.key}>
              <div className="mb-1 flex items-center gap-3">
                <span
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md"
                  style={{ background: `${s.color}1f`, color: s.color }}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-bold">{s.label}</p>
                  <p className="text-xs text-[color:var(--color-text-muted)]">{s.hint}</p>
                </div>
                <span
                  className="font-mono text-lg font-bold"
                  style={{ color: s.color }}
                >
                  {v}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={v}
                onChange={(e) => setStat(s.key, Number(e.target.value))}
                className="w-full"
                style={{ accentColor: s.color }}
                aria-label={`Note ${s.label} sur 100`}
              />
            </div>
          );
        })}

        <button
          type="button"
          onClick={submit}
          disabled={pending}
          className="btn-neon mt-2 w-full rounded-md py-3 text-sm disabled:opacity-60"
        >
          {pending ? 'Enregistrement…' : 'Valider ma baseline'}
        </button>
      </div>
    </div>
  );
}
