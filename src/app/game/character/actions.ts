/**
 * character/actions.ts — Server Actions pour la fiche de personnage.
 *
 * Contient deux actions :
 *   1. `submitCharacterQuestionnaireAction` : enregistre les stats initiales du joueur
 *   2. `resetCharacterBaselineAction` : réinitialise les stats (permet de refaire le questionnaire)
 *
 * Pourquoi ces actions sont-elles côté serveur ?
 *   - Sécurité : on ne peut pas faire confiance aux données venant du navigateur.
 *     On re-valide et normalise toutes les valeurs avant d'écrire en DB.
 *   - `stats_initialized: true` : flag qui détermine si le jeu redirige vers le questionnaire
 *     ou affiche la fiche de perso. Il doit être mis à jour atomiquement avec les stats.
 *   - `revalidatePath` : invalide le cache Next.js pour forcer le rechargement des pages
 *     qui lisent ces données (évite d'afficher des données périmées).
 */
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { normalizeStats, STAT_KEYS, type StatValues } from '@/lib/character-stats';

/**
 * Enregistre les réponses du questionnaire initial comme "baseline" (valeurs de référence).
 *
 * `raw: Partial<StatValues>` : on accepte un objet partiel (certaines clés peuvent manquer)
 * car le formulaire côté client pourrait être manipulé.
 *
 * Mesures défensives :
 *   - On ne garde que les clés connues (STAT_KEYS) → rejette toute clé inconnue
 *   - normalizeStats() s'assure que chaque valeur est dans [0, 100]
 *   - redirect('/login') si l'utilisateur n'est pas connecté
 */
export async function submitCharacterQuestionnaireAction(
  raw: Partial<StatValues>,
): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Filtrage défensif : on ignore toute clé qui n'est pas dans STAT_KEYS
  const filtered: Partial<StatValues> = {};
  for (const k of STAT_KEYS) {
    if (typeof raw[k] === 'number') filtered[k] = raw[k];
  }
  // normalizeStats : s'assure que toutes les 9 clés existent et sont dans [0, 100]
  const baseline = normalizeStats(filtered, 50);

  await supabase
    .from('profiles')
    .update({
      baseline_stats: baseline,
      stats_initialized: true, // débloque l'accès au jeu (fin du "onboarding")
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id);

  revalidatePath('/game');
  revalidatePath('/game/character');
  redirect('/game/character'); // redirige vers la fiche de perso maintenant initialisée
}

/**
 * Réinitialise la baseline pour permettre de refaire le questionnaire.
 * L'historique des quêtes et les XP gagnés ne sont pas affectés.
 * Seule la baseline (valeurs de départ) est remise à zéro.
 */
export async function resetCharacterBaselineAction(): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  await supabase
    .from('profiles')
    .update({
      stats_initialized: false,
      baseline_stats: {},
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id);

  revalidatePath('/game/character');
  redirect('/game/character');
}
