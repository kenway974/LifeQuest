/**
 * PlayerSearch.tsx — Barre de recherche de joueurs par pseudo.
 *
 * Permet de chercher d'autres joueurs pour voir leur profil public.
 *
 * `.ilike('pseudo', '%query%')` : recherche case-insensitive dans Supabase
 *   - `ilike` = like insensible à la casse (contrairement à `like`)
 *   - Les `%` sont des wildcards SQL (correspondent à n'importe quelle chaîne)
 *   - Résultat : retourne tous les pseudos qui CONTIENNENT le mot cherché
 *
 * `.limit(20)` : on plafonne à 20 résultats pour ne pas surcharger l'UI.
 *
 * C'est un Client Component car il gère un formulaire interactif avec état local.
 * La requête Supabase se fait directement depuis le navigateur (pas de Server Action
 * nécessaire car c'est une lecture publique, pas une écriture).
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Search, User } from 'lucide-react';

// Type des résultats de recherche (sous-ensemble du profil)
interface Result {
  id: string;
  pseudo: string;
  level: number;
  xp: number;
  avatar_url: string | null;
}

export function PlayerSearch() {
  const [query, setQuery] = useState('');           // texte tapé dans la barre de recherche
  const [results, setResults] = useState<Result[]>([]); // résultats de la dernière recherche
  const [loading, setLoading] = useState(false);

  /**
   * Soumettre la recherche.
   * Guard `query.trim().length < 2` : au moins 2 caractères pour éviter
   * des requêtes trop larges (% retournerait TOUS les joueurs).
   */
  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim().length < 2) return;
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from('profiles')
      .select('id, pseudo, level, xp, avatar_url')
      .ilike('pseudo', `%${query.trim()}%`) // recherche partielle insensible à la casse
      .limit(20);
    setResults(data ?? []); // `data ?? []` : si data est null, utiliser un tableau vide
    setLoading(false);
  }

  return (
    <div>
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--color-text-muted)]"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher par pseudo…"
            aria-label="Rechercher un joueur par pseudo"
            className="w-full rounded-md border border-[color:var(--color-border-bright)] bg-[color:var(--color-bg-elevated)] py-2.5 pl-10 pr-4 text-sm focus:border-[color:var(--color-neon-cyan)] focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading || query.trim().length < 2}
          className="btn-neon rounded-md px-5 py-2.5 text-sm disabled:opacity-50"
        >
          {loading ? '…' : 'Chercher'}
        </button>
      </form>

      {results.length > 0 && (
        <ul className="mt-4 space-y-2">
          {results.map((r) => (
            <li key={r.id}>
              <Link
                href={`/game/player/${r.pseudo}`}
                className="card-neon flex items-center gap-3 p-3 transition hover:-translate-y-0.5"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--color-bg-elevated)] text-glow-violet">
                  {r.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={r.avatar_url} alt="" className="h-full w-full rounded-full object-cover" />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-display font-bold">{r.pseudo}</p>
                  <p className="text-xs text-[color:var(--color-text-muted)]">
                    Niveau {r.level} • {r.xp} XP
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
