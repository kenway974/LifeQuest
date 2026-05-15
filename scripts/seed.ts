/**
 * LifeQuest — Database seed script
 *
 * Populates the catalog with ~15 main quests, ~20 secondary quests, and 30 trophies.
 *
 * Run with:
 *   npm run db:seed
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY in your .env.local (bypasses RLS to insert
 * catalog rows that don't belong to a specific user).
 */
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import type { Database, Difficulty } from '../src/types/database';

config({ path: '.env.local' });

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } },
);

// ============================================================
// QUEST DEFINITIONS
// ============================================================

interface QuestSeed {
  title: string;
  description: string;
  type: 'main' | 'secondary';
  difficulty: Difficulty;
  duration_days: number;
  xp_reward: number;
  objectives: {
    title: string;
    description: string;
    xp_reward: number;
    tasks: { title: string; xp_reward: number }[];
  }[];
}

const MAIN_QUESTS: QuestSeed[] = [
  {
    title: 'Reprendre le contrôle de sa vie',
    description: 'Un parcours de 60 jours pour reprendre les rênes — discipline, focus, vision claire.',
    type: 'main',
    difficulty: 'hard',
    duration_days: 60,
    xp_reward: 2000,
    objectives: [
      {
        title: 'Clarifier ta vision',
        description: 'Sache où tu veux aller avant d’y aller.',
        xp_reward: 200,
        tasks: [
          { title: 'Écrire 3 objectifs majeurs à 1 an', xp_reward: 30 },
          { title: 'Identifier 1 valeur fondamentale', xp_reward: 20 },
          { title: 'Définir ta routine matinale idéale', xp_reward: 30 },
        ],
      },
      {
        title: 'Installer une discipline quotidienne',
        description: 'Petits pas, grands résultats.',
        xp_reward: 300,
        tasks: [
          { title: 'Se lever à heure fixe', xp_reward: 15 },
          { title: '20 minutes de mouvement', xp_reward: 20 },
          { title: 'Pas d’écrans la première heure', xp_reward: 25 },
        ],
      },
      {
        title: 'Éliminer les distractions',
        description: 'Reprends ton temps et ton attention.',
        xp_reward: 250,
        tasks: [
          { title: 'Désinstaller 1 app qui te vole du temps', xp_reward: 40 },
          { title: 'Mode avion pendant le travail profond', xp_reward: 20 },
        ],
      },
    ],
  },
  {
    title: 'Devenir une machine de discipline',
    description: '90 jours pour transformer ta volonté en système. Plus de procrastination.',
    type: 'main',
    difficulty: 'expert',
    duration_days: 90,
    xp_reward: 3500,
    objectives: [
      {
        title: 'Routine guerrière',
        description: 'Une matinée non-négociable.',
        xp_reward: 400,
        tasks: [
          { title: 'Réveil avant 6h30', xp_reward: 30 },
          { title: 'Douche froide', xp_reward: 25 },
          { title: '10 min de lecture', xp_reward: 20 },
        ],
      },
      {
        title: 'Forge mentale',
        description: 'Le mental s’entraîne comme un muscle.',
        xp_reward: 350,
        tasks: [
          { title: 'Méditation 15 min', xp_reward: 25 },
          { title: 'Journal du soir : 3 victoires', xp_reward: 20 },
          { title: 'Lecture 30 min', xp_reward: 25 },
        ],
      },
    ],
  },
  {
    title: 'Reconquérir ton corps',
    description: 'Santé physique : énergie, force, endurance. 60 jours pour devenir une version solide de toi.',
    type: 'main',
    difficulty: 'hard',
    duration_days: 60,
    xp_reward: 2200,
    objectives: [
      {
        title: 'Nutrition saine',
        description: 'Ce que tu manges devient ce que tu es.',
        xp_reward: 300,
        tasks: [
          { title: '2L d’eau dans la journée', xp_reward: 15 },
          { title: '1 fruit ou légume à chaque repas', xp_reward: 20 },
          { title: 'Pas de sucre raffiné', xp_reward: 30 },
        ],
      },
      {
        title: 'Bouger tous les jours',
        description: 'Le corps a besoin de mouvement.',
        xp_reward: 350,
        tasks: [
          { title: '30 min d’activité physique', xp_reward: 30 },
          { title: '10 000 pas dans la journée', xp_reward: 25 },
        ],
      },
      {
        title: 'Sommeil réparateur',
        description: 'Le sommeil, c’est 50% de la performance.',
        xp_reward: 250,
        tasks: [
          { title: 'Couché avant 23h', xp_reward: 25 },
          { title: '7-8h de sommeil', xp_reward: 30 },
        ],
      },
    ],
  },
  {
    title: 'Maîtriser tes émotions',
    description: '45 jours pour comprendre, accueillir et réguler tes émotions.',
    type: 'main',
    difficulty: 'medium',
    duration_days: 45,
    xp_reward: 1500,
    objectives: [
      {
        title: 'Observer sans juger',
        description: 'Prendre conscience avant d’agir.',
        xp_reward: 200,
        tasks: [
          { title: 'Nommer une émotion ressentie', xp_reward: 15 },
          { title: 'Méditation 10 min', xp_reward: 20 },
        ],
      },
      {
        title: 'Exprimer sainement',
        description: 'Écrire pour mieux comprendre.',
        xp_reward: 250,
        tasks: [
          { title: 'Journal des émotions du jour', xp_reward: 25 },
          { title: 'Pratiquer la respiration carrée', xp_reward: 15 },
        ],
      },
    ],
  },
  {
    title: 'Reset social media',
    description: '30 jours sans réseaux sociaux pour récupérer ton attention.',
    type: 'main',
    difficulty: 'medium',
    duration_days: 30,
    xp_reward: 1200,
    objectives: [
      {
        title: 'Détoxification numérique',
        description: 'Reprends le contrôle de ton temps.',
        xp_reward: 250,
        tasks: [
          { title: 'Pas de réseaux sociaux aujourd’hui', xp_reward: 40 },
          { title: 'Téléphone hors de la chambre la nuit', xp_reward: 20 },
        ],
      },
    ],
  },
  {
    title: 'Construire ta confiance',
    description: '60 jours pour bâtir une confiance solide en toi.',
    type: 'main',
    difficulty: 'medium',
    duration_days: 60,
    xp_reward: 1800,
    objectives: [
      {
        title: 'Affirmer ta voix',
        description: 'Parler pour exister.',
        xp_reward: 250,
        tasks: [
          { title: 'Dire NON à une demande non essentielle', xp_reward: 30 },
          { title: 'Exprimer un avis honnêtement', xp_reward: 25 },
        ],
      },
      {
        title: 'Sortir de ta zone de confort',
        description: 'C’est là que tu grandis.',
        xp_reward: 300,
        tasks: [
          { title: 'Faire une chose qui te fait peur', xp_reward: 50 },
          { title: 'Engager une conversation avec un inconnu', xp_reward: 40 },
        ],
      },
    ],
  },
  {
    title: 'Maître du focus',
    description: '30 jours pour devenir une bête de concentration.',
    type: 'main',
    difficulty: 'hard',
    duration_days: 30,
    xp_reward: 1500,
    objectives: [
      {
        title: 'Travail profond quotidien',
        description: 'Sessions de focus sans interruption.',
        xp_reward: 350,
        tasks: [
          { title: '90 min de travail profond', xp_reward: 40 },
          { title: 'Téléphone en mode ne pas déranger', xp_reward: 20 },
        ],
      },
    ],
  },
  {
    title: 'Renaissance financière',
    description: '90 jours pour reprendre le contrôle de ton argent.',
    type: 'main',
    difficulty: 'expert',
    duration_days: 90,
    xp_reward: 3000,
    objectives: [
      {
        title: 'Comprendre tes flux',
        description: 'Ce que tu mesures, tu peux le changer.',
        xp_reward: 300,
        tasks: [
          { title: 'Noter chaque dépense', xp_reward: 20 },
          { title: 'Faire le point mensuel', xp_reward: 50 },
        ],
      },
      {
        title: 'Réduire les fuites',
        description: 'Élimine les dépenses inutiles.',
        xp_reward: 400,
        tasks: [
          { title: 'Annuler 1 abonnement inutile', xp_reward: 60 },
          { title: 'Préparer ses repas à la maison', xp_reward: 25 },
        ],
      },
    ],
  },
  {
    title: 'Lecture quotidienne',
    description: '30 jours pour installer l’habitude de lire.',
    type: 'main',
    difficulty: 'easy',
    duration_days: 30,
    xp_reward: 900,
    objectives: [
      {
        title: 'Habituer ton cerveau',
        description: 'Lire, c’est nourrir.',
        xp_reward: 200,
        tasks: [
          { title: 'Lire 20 minutes', xp_reward: 25 },
          { title: 'Noter 1 idée marquante', xp_reward: 15 },
        ],
      },
    ],
  },
  {
    title: 'Apprendre une nouvelle compétence',
    description: '60 jours pour acquérir une vraie skill (langue, code, instrument, sport).',
    type: 'main',
    difficulty: 'hard',
    duration_days: 60,
    xp_reward: 2200,
    objectives: [
      {
        title: 'Pratique délibérée',
        description: 'Tous les jours, sans exception.',
        xp_reward: 400,
        tasks: [
          { title: '30 min de pratique focalisée', xp_reward: 35 },
          { title: 'Réviser ce que tu as appris hier', xp_reward: 20 },
        ],
      },
    ],
  },
  {
    title: 'Méditation : devenir un moine',
    description: '60 jours de pratique méditative quotidienne.',
    type: 'main',
    difficulty: 'medium',
    duration_days: 60,
    xp_reward: 1700,
    objectives: [
      {
        title: 'Pratique régulière',
        description: 'Le calme se cultive.',
        xp_reward: 300,
        tasks: [
          { title: 'Méditation 20 min', xp_reward: 30 },
          { title: 'Marche consciente 15 min', xp_reward: 20 },
        ],
      },
    ],
  },
  {
    title: 'Reset relationnel',
    description: '45 jours pour réparer et nourrir tes relations importantes.',
    type: 'main',
    difficulty: 'medium',
    duration_days: 45,
    xp_reward: 1400,
    objectives: [
      {
        title: 'Nourrir les liens',
        description: 'Les vraies amitiés s’entretiennent.',
        xp_reward: 250,
        tasks: [
          { title: 'Appeler un proche', xp_reward: 30 },
          { title: 'Envoyer un message gratuit à un ami', xp_reward: 15 },
        ],
      },
    ],
  },
  {
    title: 'Créateur quotidien',
    description: '60 jours pour publier quelque chose chaque jour.',
    type: 'main',
    difficulty: 'expert',
    duration_days: 60,
    xp_reward: 2500,
    objectives: [
      {
        title: 'Publier sans peur',
        description: 'Mieux publié qu’oublié.',
        xp_reward: 400,
        tasks: [
          { title: 'Publier une création (texte/image/code)', xp_reward: 50 },
          { title: 'Engager 1 conversation publique', xp_reward: 20 },
        ],
      },
    ],
  },
  {
    title: 'Le défi minimaliste',
    description: '30 jours pour alléger ta vie de tout le superflu.',
    type: 'main',
    difficulty: 'easy',
    duration_days: 30,
    xp_reward: 1000,
    objectives: [
      {
        title: 'Désencombrer',
        description: 'Moins de choses, plus de paix.',
        xp_reward: 250,
        tasks: [
          { title: 'Donner ou jeter 3 objets inutiles', xp_reward: 25 },
          { title: 'Vider 1 catégorie complète', xp_reward: 40 },
        ],
      },
    ],
  },
  {
    title: 'Devenir une légende',
    description: 'Le défi ultime : 90 jours, toutes les disciplines en même temps. Pour les fous.',
    type: 'main',
    difficulty: 'legendary',
    duration_days: 90,
    xp_reward: 5000,
    objectives: [
      {
        title: 'Excellence totale',
        description: 'Corps, mental, esprit. Aucune négociation.',
        xp_reward: 800,
        tasks: [
          { title: 'Sport 1h', xp_reward: 50 },
          { title: 'Lecture 1h', xp_reward: 50 },
          { title: 'Méditation 30 min', xp_reward: 40 },
          { title: 'Travail profond 2h', xp_reward: 60 },
        ],
      },
    ],
  },
];

const SECONDARY_QUESTS: QuestSeed[] = [
  {
    title: '7 jours sans plainte',
    description: 'Une semaine entière sans se plaindre de rien.',
    type: 'secondary',
    difficulty: 'medium',
    duration_days: 7,
    xp_reward: 400,
    objectives: [
      { title: 'Conscience verbale', description: 'Surveille ton langage.', xp_reward: 100, tasks: [{ title: 'Aucune plainte aujourd’hui', xp_reward: 40 }] },
    ],
  },
  {
    title: 'Marche quotidienne 10k pas',
    description: '14 jours à marcher 10 000 pas par jour.',
    type: 'secondary',
    difficulty: 'easy',
    duration_days: 14,
    xp_reward: 350,
    objectives: [
      { title: 'Bouger', description: 'Un pas après l’autre.', xp_reward: 80, tasks: [{ title: '10 000 pas', xp_reward: 25 }] },
    ],
  },
  {
    title: 'Pas de réseaux après 21h',
    description: '10 jours à couper les réseaux le soir.',
    type: 'secondary',
    difficulty: 'easy',
    duration_days: 10,
    xp_reward: 300,
    objectives: [
      { title: 'Couvre-feu numérique', description: 'Récupère ton sommeil.', xp_reward: 100, tasks: [{ title: 'Téléphone éteint dès 21h', xp_reward: 30 }] },
    ],
  },
  {
    title: 'Cuisiner soi-même',
    description: '7 jours sans aucun plat préparé ni livraison.',
    type: 'secondary',
    difficulty: 'medium',
    duration_days: 7,
    xp_reward: 400,
    objectives: [
      { title: 'Cuisinier amateur', description: 'Reprends ton alimentation en main.', xp_reward: 100, tasks: [{ title: 'Cuisiner 2 repas', xp_reward: 40 }] },
    ],
  },
  {
    title: 'Apprendre 50 mots',
    description: '14 jours pour apprendre 50 mots d’une langue étrangère.',
    type: 'secondary',
    difficulty: 'medium',
    duration_days: 14,
    xp_reward: 500,
    objectives: [
      { title: 'Vocabulaire', description: 'Petit à petit.', xp_reward: 120, tasks: [{ title: 'Apprendre 4 nouveaux mots', xp_reward: 25 }] },
    ],
  },
  {
    title: 'Douche froide',
    description: '21 jours de douche froide quotidienne.',
    type: 'secondary',
    difficulty: 'hard',
    duration_days: 21,
    xp_reward: 700,
    objectives: [
      { title: 'Choc thermique', description: 'Force mentale et physique.', xp_reward: 150, tasks: [{ title: 'Douche froide 2 min minimum', xp_reward: 35 }] },
    ],
  },
  {
    title: 'Mémoire du jour',
    description: '14 jours à écrire 3 gratitudes chaque soir.',
    type: 'secondary',
    difficulty: 'easy',
    duration_days: 14,
    xp_reward: 350,
    objectives: [
      { title: 'Pratique de la gratitude', description: 'Reprogramme ton cerveau.', xp_reward: 80, tasks: [{ title: '3 gratitudes écrites', xp_reward: 20 }] },
    ],
  },
  {
    title: 'Zéro sucre',
    description: '7 jours sans aucun sucre ajouté.',
    type: 'secondary',
    difficulty: 'hard',
    duration_days: 7,
    xp_reward: 500,
    objectives: [
      { title: 'Détox sucre', description: 'Reset ton goût.', xp_reward: 120, tasks: [{ title: 'Aucun sucre ajouté aujourd’hui', xp_reward: 60 }] },
    ],
  },
  {
    title: 'Lever à 6h',
    description: '14 jours à se lever à 6h pile.',
    type: 'secondary',
    difficulty: 'hard',
    duration_days: 14,
    xp_reward: 600,
    objectives: [
      { title: 'Routine matinale', description: 'Gagner du temps sur soi.', xp_reward: 150, tasks: [{ title: 'Levé avant 6h05', xp_reward: 40 }] },
    ],
  },
  {
    title: 'Pas d’alcool',
    description: '30 jours sans alcool.',
    type: 'secondary',
    difficulty: 'medium',
    duration_days: 30,
    xp_reward: 900,
    objectives: [
      { title: 'Sobriété', description: 'Reset complet.', xp_reward: 200, tasks: [{ title: 'Pas une goutte aujourd’hui', xp_reward: 25 }] },
    ],
  },
  {
    title: '50 pompes par jour',
    description: '21 jours, 50 pompes quotidiennes.',
    type: 'secondary',
    difficulty: 'medium',
    duration_days: 21,
    xp_reward: 550,
    objectives: [
      { title: 'Force', description: 'Construis ton tronc.', xp_reward: 120, tasks: [{ title: '50 pompes (1 ou plusieurs séries)', xp_reward: 25 }] },
    ],
  },
  {
    title: 'Lire un livre',
    description: 'Finir un livre en 14 jours.',
    type: 'secondary',
    difficulty: 'medium',
    duration_days: 14,
    xp_reward: 450,
    objectives: [
      { title: 'Lecture suivie', description: 'Pages après pages.', xp_reward: 100, tasks: [{ title: 'Lire au moins 20 pages', xp_reward: 25 }] },
    ],
  },
  {
    title: 'Boire 2L d’eau',
    description: '21 jours à boire 2L d’eau par jour.',
    type: 'secondary',
    difficulty: 'easy',
    duration_days: 21,
    xp_reward: 400,
    objectives: [
      { title: 'Hydratation', description: 'Base oubliée.', xp_reward: 100, tasks: [{ title: '2L d’eau dans la journée', xp_reward: 20 }] },
    ],
  },
  {
    title: 'Yoga / Stretching matinal',
    description: '14 jours, 15 minutes de yoga ou stretching le matin.',
    type: 'secondary',
    difficulty: 'easy',
    duration_days: 14,
    xp_reward: 400,
    objectives: [
      { title: 'Souplesse', description: 'Démarre la journée détendu.', xp_reward: 100, tasks: [{ title: '15 min de stretching/yoga', xp_reward: 25 }] },
    ],
  },
  {
    title: 'Journal du soir',
    description: '21 jours à écrire ses pensées chaque soir.',
    type: 'secondary',
    difficulty: 'easy',
    duration_days: 21,
    xp_reward: 450,
    objectives: [
      { title: 'Introspection', description: 'Clarifier ses idées.', xp_reward: 100, tasks: [{ title: '5 lignes minimum', xp_reward: 20 }] },
    ],
  },
  {
    title: 'Faire un compliment par jour',
    description: '14 jours à offrir un compliment sincère.',
    type: 'secondary',
    difficulty: 'easy',
    duration_days: 14,
    xp_reward: 350,
    objectives: [
      { title: 'Générosité sociale', description: 'Donne avant de recevoir.', xp_reward: 80, tasks: [{ title: '1 compliment sincère', xp_reward: 20 }] },
    ],
  },
  {
    title: 'Code 30 min par jour',
    description: '21 jours à coder 30 minutes par jour.',
    type: 'secondary',
    difficulty: 'medium',
    duration_days: 21,
    xp_reward: 600,
    objectives: [
      { title: 'Pratique', description: 'La constance bat le talent.', xp_reward: 150, tasks: [{ title: '30 min de code', xp_reward: 30 }] },
    ],
  },
  {
    title: 'Méditation flash 5 min',
    description: '14 jours, 5 minutes de méditation par jour.',
    type: 'secondary',
    difficulty: 'easy',
    duration_days: 14,
    xp_reward: 300,
    objectives: [
      { title: 'Pleine conscience', description: 'Commence petit.', xp_reward: 80, tasks: [{ title: '5 min de méditation', xp_reward: 20 }] },
    ],
  },
  {
    title: 'Pas de Netflix',
    description: '14 jours sans aucune série/film en streaming.',
    type: 'secondary',
    difficulty: 'medium',
    duration_days: 14,
    xp_reward: 500,
    objectives: [
      { title: 'Détox écran', description: 'Reprends tes soirées.', xp_reward: 120, tasks: [{ title: 'Aucun streaming aujourd’hui', xp_reward: 30 }] },
    ],
  },
  {
    title: 'Le défi 100km',
    description: 'Courir/marcher 100km en 30 jours.',
    type: 'secondary',
    difficulty: 'hard',
    duration_days: 30,
    xp_reward: 1000,
    objectives: [
      { title: 'Endurance', description: 'Un peu chaque jour.', xp_reward: 200, tasks: [{ title: '3-4 km parcourus', xp_reward: 30 }] },
    ],
  },
];

// ============================================================
// TROPHIES
// ============================================================
const TROPHIES = [
  // Easy / starter
  { code: 'first_task', title: 'Premier pas', description: 'Tu as validé ta toute première tâche.', rarity: 'easy' as Difficulty, xp_reward: 25 },
  { code: 'first_quest', title: 'Première quête terminée', description: 'Tu as fini une quête. Bienvenue dans le club.', rarity: 'easy' as Difficulty, xp_reward: 100 },
  { code: 'streak_3', title: 'Trois jours d’affilée', description: 'Trois jours consécutifs d’activité.', rarity: 'easy' as Difficulty, xp_reward: 50 },
  { code: 'level_5', title: 'Apprenti', description: 'Tu as atteint le niveau 5.', rarity: 'easy' as Difficulty, xp_reward: 50 },
  { code: 'first_custom', title: 'Architecte', description: 'Tu as créé ta première quête personnalisée.', rarity: 'easy' as Difficulty, xp_reward: 75 },

  // Medium
  { code: 'streak_7', title: 'Une semaine entière', description: '7 jours consécutifs d’activité.', rarity: 'medium' as Difficulty, xp_reward: 150 },
  { code: 'ten_tasks', title: 'Dix tâches', description: 'Tu as validé 10 tâches.', rarity: 'medium' as Difficulty, xp_reward: 100 },
  { code: 'level_10', title: 'Aventurier confirmé', description: 'Tu as atteint le niveau 10.', rarity: 'medium' as Difficulty, xp_reward: 200 },
  { code: 'three_quests', title: 'Triple vainqueur', description: 'Tu as terminé 3 quêtes.', rarity: 'medium' as Difficulty, xp_reward: 250 },
  { code: 'main_quest_done', title: 'Mission accomplie', description: 'Tu as terminé une quête principale.', rarity: 'medium' as Difficulty, xp_reward: 300 },
  { code: 'early_bird', title: 'Lève-tôt', description: 'Tâche validée avant 7h du matin.', rarity: 'medium' as Difficulty, xp_reward: 100 },
  { code: 'night_owl', title: 'Travail tardif', description: 'Tâche validée après 23h.', rarity: 'medium' as Difficulty, xp_reward: 75 },

  // Hard
  { code: 'streak_30', title: 'Mois complet', description: '30 jours consécutifs d’activité.', rarity: 'hard' as Difficulty, xp_reward: 500 },
  { code: 'hundred_tasks', title: '100 tâches validées', description: 'Centurion de la discipline.', rarity: 'hard' as Difficulty, xp_reward: 400 },
  { code: 'level_25', title: 'Vétéran', description: 'Tu as atteint le niveau 25.', rarity: 'hard' as Difficulty, xp_reward: 500 },
  { code: 'ten_quests', title: 'Décuple', description: 'Tu as terminé 10 quêtes.', rarity: 'hard' as Difficulty, xp_reward: 600 },
  { code: 'expert_quest', title: 'Maître expert', description: 'Tu as terminé une quête de difficulté Expert.', rarity: 'hard' as Difficulty, xp_reward: 700 },
  { code: 'three_quests_active', title: 'Multitâche', description: '3 quêtes secondaires actives en même temps.', rarity: 'hard' as Difficulty, xp_reward: 250 },

  // Expert
  { code: 'streak_60', title: 'Deux mois sans rater', description: '60 jours d’affilée.', rarity: 'expert' as Difficulty, xp_reward: 1000 },
  { code: 'level_50', title: 'Légende vivante', description: 'Tu as atteint le niveau 50.', rarity: 'expert' as Difficulty, xp_reward: 1500 },
  { code: 'five_hundred_tasks', title: '500 tâches', description: 'Tu as franchi les 500 tâches.', rarity: 'expert' as Difficulty, xp_reward: 1200 },
  { code: 'twenty_quests', title: 'Vingt quêtes', description: '20 quêtes terminées.', rarity: 'expert' as Difficulty, xp_reward: 1200 },
  { code: 'all_difficulties', title: 'Tout-terrain', description: 'Tu as terminé une quête de chaque difficulté.', rarity: 'expert' as Difficulty, xp_reward: 1500 },
  { code: 'perfect_week', title: 'Semaine parfaite', description: '7 jours sans rater une seule tâche.', rarity: 'expert' as Difficulty, xp_reward: 800 },

  // Legendary
  { code: 'streak_100', title: '100 jours consécutifs', description: 'Tu fais partie de l’élite.', rarity: 'legendary' as Difficulty, xp_reward: 3000 },
  { code: 'level_100', title: 'Le centième', description: 'Tu as atteint le niveau 100. Inimaginable.', rarity: 'legendary' as Difficulty, xp_reward: 5000 },
  { code: 'thousand_tasks', title: '1000 tâches', description: 'Tu as validé 1000 tâches. Tu es un autre humain maintenant.', rarity: 'legendary' as Difficulty, xp_reward: 4000 },
  { code: 'legendary_quest', title: 'Briseur de légende', description: 'Tu as terminé une quête Légendaire.', rarity: 'legendary' as Difficulty, xp_reward: 5000 },
  { code: 'one_year', title: 'Un an d’aventure', description: 'Tu utilises LifeQuest depuis 365 jours.', rarity: 'legendary' as Difficulty, xp_reward: 5000 },
  { code: 'fifty_quests', title: 'Cinquante quêtes terminées', description: 'Personne ne fait ça sauf toi.', rarity: 'legendary' as Difficulty, xp_reward: 4000 },
];

// ============================================================
// SEED RUNNER
// ============================================================
async function seed() {
  console.log('🌱 Starting seed…');

  // ---- Quests ----
  for (const q of [...MAIN_QUESTS, ...SECONDARY_QUESTS]) {
    const { data: quest, error: qErr } = await supabase
      .from('quests')
      .insert({
        title: q.title,
        description: q.description,
        type: q.type,
        difficulty: q.difficulty,
        duration_days: q.duration_days,
        xp_reward: q.xp_reward,
        is_published: true,
      })
      .select('id')
      .single();

    if (qErr || !quest) {
      console.error(`Failed to insert quest "${q.title}":`, qErr);
      continue;
    }

    for (let i = 0; i < q.objectives.length; i++) {
      const obj = q.objectives[i];
      const { data: objRow, error: oErr } = await supabase
        .from('objectives')
        .insert({
          quest_id: quest.id,
          title: obj.title,
          description: obj.description,
          xp_reward: obj.xp_reward,
          order_index: i,
        })
        .select('id')
        .single();

      if (oErr || !objRow) continue;

      for (let j = 0; j < obj.tasks.length; j++) {
        await supabase.from('tasks').insert({
          objective_id: objRow.id,
          title: obj.tasks[j].title,
          xp_reward: obj.tasks[j].xp_reward,
          is_recurring: true,
          order_index: j,
        });
      }
    }
    console.log(`  ✓ ${q.type === 'main' ? '⚔️' : '🧭'} ${q.title}`);
  }

  // ---- Trophies ----
  for (const t of TROPHIES) {
    const { error } = await supabase.from('trophies').upsert(
      {
        code: t.code,
        title: t.title,
        description: t.description,
        rarity: t.rarity,
        xp_reward: t.xp_reward,
        icon: 'trophy',
      },
      { onConflict: 'code' },
    );
    if (error) console.error(`Trophy "${t.code}" failed:`, error);
    else console.log(`  🏆 ${t.title}`);
  }

  console.log('✅ Seed complete!');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
