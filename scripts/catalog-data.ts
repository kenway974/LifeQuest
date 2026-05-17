/**
 * Shared catalog data for the seed scripts.
 *
 * Imported by:
 *  - scripts/seed.ts (destructive — wipes catalog then re-inserts)
 *  - scripts/seed-additive.ts (non-destructive — only inserts what's missing)
 *
 * To add new quests / objectives / tasks / trophies:
 *  1. Edit the arrays below
 *  2. Run `npm run db:seed:add` to push the new content without touching
 *     existing rows or user progression
 */
import type { Database } from '../src/types/database';

type Difficulty = Database['public']['Enums']['difficulty'];

// ============================================================
// TYPES
// ============================================================

export interface TaskSeed {
  title: string;
  xp_reward: number;
  /** Frequency in days. 1 = daily, 7 = weekly, 30 = monthly, 365 = once. Defaults to 1. */
  frequency_days?: number;
  /** Bonus task: XP × 1.5, doesn't block objective completion, all of them must be done to earn a star. */
  is_optional?: boolean;
}

export interface ObjectiveSeed {
  title: string;
  description: string;
  xp_reward: number;
  tasks: TaskSeed[];
}

export interface QuestSeed {
  title: string;
  description: string;
  type: 'main' | 'secondary';
  difficulty: Difficulty;
  duration_days: number;
  xp_reward: number;
  objectives: ObjectiveSeed[];
}

// ============================================================
// MAIN QUESTS — 15 quests, 3-5 objectives each, varied frequencies
// ============================================================

export const MAIN_QUESTS: QuestSeed[] = [
  {
    title: 'Reprendre le contrôle de sa vie',
    description: 'Un parcours de 60 jours pour reprendre les rênes — vision, discipline, focus.',
    type: 'main',
    difficulty: 'hard',
    duration_days: 60,
    xp_reward: 2000,
    objectives: [
      {
        title: 'Clarifier ta vision',
        description: 'Sache où tu veux aller avant d’y aller.',
        xp_reward: 300,
        tasks: [
          { title: 'Écrire 3 objectifs majeurs à 1 an', xp_reward: 60, frequency_days: 365 },
          { title: 'Identifier 3 valeurs fondamentales', xp_reward: 40, frequency_days: 365 },
          { title: 'Définir ta routine matinale idéale', xp_reward: 30, frequency_days: 365 },
          { title: 'Revue hebdomadaire de tes objectifs', xp_reward: 40, frequency_days: 7 },
          { title: 'Visualiser ton "toi" idéal 5 min', xp_reward: 15, is_optional: true },
        ],
      },
      {
        title: 'Installer une discipline quotidienne',
        description: 'Petits pas, grands résultats.',
        xp_reward: 350,
        tasks: [
          { title: 'Se lever à heure fixe', xp_reward: 15 },
          { title: '20 minutes de mouvement', xp_reward: 20 },
          { title: 'Pas d’écrans la première heure', xp_reward: 25 },
          { title: 'Préparer la veille les 3 priorités du lendemain', xp_reward: 20 },
        ],
      },
      {
        title: 'Éliminer les distractions',
        description: 'Reprends ton temps et ton attention.',
        xp_reward: 300,
        tasks: [
          { title: 'Désinstaller 1 app qui te vole du temps', xp_reward: 80, frequency_days: 365 },
          { title: 'Mode avion pendant le travail profond', xp_reward: 20 },
          { title: 'Bilan : où est passé mon temps cette semaine ?', xp_reward: 50, frequency_days: 7 },
        ],
      },
      {
        title: 'Ancrage long-terme',
        description: 'Mesure le chemin parcouru chaque mois.',
        xp_reward: 250,
        tasks: [
          { title: 'Revue mensuelle : victoires, échecs, ajustements', xp_reward: 100, frequency_days: 30 },
          { title: 'Lire 1 page de développement personnel', xp_reward: 15, is_optional: true },
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
        xp_reward: 500,
        tasks: [
          { title: 'Réveil avant 6h30', xp_reward: 30 },
          { title: 'Douche froide', xp_reward: 25 },
          { title: '10 min de lecture au lever', xp_reward: 20 },
          { title: 'Faire son lit immédiatement', xp_reward: 10 },
          { title: 'Habillé et prêt avant 7h', xp_reward: 15, is_optional: true },
        ],
      },
      {
        title: 'Forge mentale',
        description: 'Le mental s’entraîne comme un muscle.',
        xp_reward: 450,
        tasks: [
          { title: 'Méditation 15 min', xp_reward: 25 },
          { title: 'Journal du soir : 3 victoires', xp_reward: 20 },
          { title: 'Lecture 30 min', xp_reward: 25 },
          { title: 'Identifier 1 pensée limitante du jour', xp_reward: 20, frequency_days: 2 },
          { title: 'Écouter 1 podcast inspirant 20 min', xp_reward: 20, is_optional: true, frequency_days: 2 },
        ],
      },
      {
        title: 'Constance dans l’effort',
        description: 'Faire ce qui est dur, surtout quand tu n’as pas envie.',
        xp_reward: 500,
        tasks: [
          { title: 'Faire la tâche la plus difficile en premier', xp_reward: 40 },
          { title: '1h de travail profond ininterrompu', xp_reward: 50 },
          { title: 'Sport intense même si pas envie', xp_reward: 35 },
        ],
      },
      {
        title: 'Maîtrise du temps',
        description: 'Le temps est ta ressource la plus précieuse.',
        xp_reward: 350,
        tasks: [
          { title: 'Planifier sa semaine le dimanche', xp_reward: 60, frequency_days: 7 },
          { title: 'Time-blocker ses 3 priorités du jour', xp_reward: 20 },
          { title: 'Bilan mensuel : où est passée mon énergie ?', xp_reward: 100, frequency_days: 30 },
          { title: 'Tracker son temps d’écran de la journée', xp_reward: 15, is_optional: true },
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
        xp_reward: 350,
        tasks: [
          { title: '2L d’eau dans la journée', xp_reward: 15 },
          { title: '1 fruit ou légume à chaque repas', xp_reward: 20 },
          { title: 'Pas de sucre raffiné', xp_reward: 30 },
          { title: 'Cuisiner soi-même au moins 1 repas', xp_reward: 25 },
        ],
      },
      {
        title: 'Bouger tous les jours',
        description: 'Le corps a besoin de mouvement.',
        xp_reward: 400,
        tasks: [
          { title: '30 min d’activité physique', xp_reward: 30 },
          { title: '10 000 pas dans la journée', xp_reward: 25 },
          { title: 'Stretching ou mobilité 10 min', xp_reward: 20, frequency_days: 2 },
          { title: 'S’exposer au soleil 15 min', xp_reward: 15, is_optional: true },
          { title: 'Marcher pieds nus 10 min', xp_reward: 10, is_optional: true, frequency_days: 2 },
        ],
      },
      {
        title: 'Sommeil réparateur',
        description: 'Le sommeil, c’est 50% de la performance.',
        xp_reward: 300,
        tasks: [
          { title: 'Couché avant 23h', xp_reward: 25 },
          { title: '7-8h de sommeil', xp_reward: 30 },
          { title: 'Pas d’écran 30 min avant le coucher', xp_reward: 20 },
          { title: 'Pas de grignotage entre repas', xp_reward: 15, is_optional: true },
        ],
      },
      {
        title: 'Mesurer la progression',
        description: 'Ce qui se mesure s’améliore.',
        xp_reward: 200,
        tasks: [
          { title: 'Peser & noter sensations', xp_reward: 25, frequency_days: 7 },
          { title: 'Photo de progrès', xp_reward: 30, frequency_days: 14 },
          { title: 'Mesurer tour de taille', xp_reward: 20, is_optional: true, frequency_days: 14 },
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
        xp_reward: 250,
        tasks: [
          { title: 'Nommer une émotion ressentie', xp_reward: 15 },
          { title: 'Méditation 10 min', xp_reward: 20 },
          { title: 'Scan corporel 5 min', xp_reward: 15, frequency_days: 2 },
          { title: 'Tenir un mood-tracker visuel', xp_reward: 15, is_optional: true },
        ],
      },
      {
        title: 'Exprimer sainement',
        description: 'Écrire pour mieux comprendre.',
        xp_reward: 300,
        tasks: [
          { title: 'Journal des émotions du jour', xp_reward: 25 },
          { title: 'Pratiquer la respiration carrée', xp_reward: 15 },
          { title: 'Verbaliser un ressenti à quelqu’un', xp_reward: 30, frequency_days: 3 },
        ],
      },
      {
        title: 'Réguler dans l’instant',
        description: 'Reprendre la main quand ça déborde.',
        xp_reward: 250,
        tasks: [
          { title: 'Pause de 3 respirations avant de réagir', xp_reward: 20 },
          { title: 'Identifier le déclencheur d’une réaction forte', xp_reward: 30, frequency_days: 2 },
          { title: 'Noter 1 moment où tu as bien réagi', xp_reward: 15, is_optional: true },
        ],
      },
      {
        title: 'Bilan & ajustement',
        description: 'Voir l’évolution sur la durée.',
        xp_reward: 200,
        tasks: [
          { title: 'Revue hebdo des émotions dominantes', xp_reward: 50, frequency_days: 7 },
        ],
      },
    ],
  },

  {
    title: 'Reset social media',
    description: '30 jours pour récupérer ton attention et ton temps.',
    type: 'main',
    difficulty: 'medium',
    duration_days: 30,
    xp_reward: 1200,
    objectives: [
      {
        title: 'Couper le cordon',
        description: 'Réduire drastiquement l’exposition.',
        xp_reward: 350,
        tasks: [
          { title: 'Pas de réseaux sociaux aujourd’hui', xp_reward: 40 },
          { title: 'Téléphone hors de la chambre la nuit', xp_reward: 20 },
          { title: 'Désinstaller au moins 1 app sociale', xp_reward: 80, frequency_days: 365 },
        ],
      },
      {
        title: 'Remplacer le scroll',
        description: 'Nature a horreur du vide.',
        xp_reward: 300,
        tasks: [
          { title: '30 min de lecture (livre, pas écran)', xp_reward: 25 },
          { title: 'Activité créative ou manuelle 20 min', xp_reward: 25 },
          { title: 'Sortie / promenade sans téléphone', xp_reward: 40, frequency_days: 3 },
          { title: 'Saluer un voisin ou un inconnu', xp_reward: 15, is_optional: true, frequency_days: 3 },
        ],
      },
      {
        title: 'Observer le manque',
        description: 'Comprendre l’addiction pour s’en libérer.',
        xp_reward: 250,
        tasks: [
          { title: 'Noter le nombre de fois où tu as voulu ouvrir l’app', xp_reward: 15 },
          { title: 'Bilan hebdo : ce que tu as gagné / perdu', xp_reward: 60, frequency_days: 7 },
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
        xp_reward: 300,
        tasks: [
          { title: 'Dire NON à une demande non essentielle', xp_reward: 30, frequency_days: 3 },
          { title: 'Exprimer un avis honnêtement', xp_reward: 25, frequency_days: 2 },
          { title: 'Prendre la parole en réunion / en groupe', xp_reward: 35, frequency_days: 3 },
        ],
      },
      {
        title: 'Sortir de ta zone de confort',
        description: 'C’est là que tu grandis.',
        xp_reward: 350,
        tasks: [
          { title: 'Faire une chose qui te fait peur', xp_reward: 60, frequency_days: 7 },
          { title: 'Engager une conversation avec un inconnu', xp_reward: 40, frequency_days: 3 },
          { title: 'Demander quelque chose que tu n’oserais pas', xp_reward: 50, frequency_days: 7 },
        ],
      },
      {
        title: 'Posture & présence',
        description: 'Le corps parle avant les mots.',
        xp_reward: 250,
        tasks: [
          { title: 'Posture droite + épaules en arrière toute la journée', xp_reward: 20 },
          { title: '5 min de power-pose le matin', xp_reward: 15 },
          { title: 'Garder le contact visuel dans une conversation', xp_reward: 15, is_optional: true },
        ],
      },
      {
        title: 'Capitaliser sur tes wins',
        description: 'Ce que tu reconnais grandit.',
        xp_reward: 250,
        tasks: [
          { title: 'Noter 1 chose que tu as bien faite aujourd’hui', xp_reward: 20 },
          { title: 'Revue hebdo : 3 preuves de ta progression', xp_reward: 60, frequency_days: 7 },
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
        xp_reward: 400,
        tasks: [
          { title: '90 min de travail profond', xp_reward: 40 },
          { title: 'Téléphone en mode ne pas déranger', xp_reward: 20 },
          { title: 'Single-tasking : 1 chose à la fois', xp_reward: 25 },
          { title: 'Faire 1 tâche sans aucun stimulus (ni musique, ni notif)', xp_reward: 20, is_optional: true },
        ],
      },
      {
        title: 'Éliminer les interruptions',
        description: 'Reprendre la main sur ton environnement.',
        xp_reward: 300,
        tasks: [
          { title: 'Notifications désactivées sauf urgences', xp_reward: 30 },
          { title: 'Bureau rangé avant de commencer', xp_reward: 15 },
          { title: 'Bloquer 1 site distrayant supplémentaire', xp_reward: 40, frequency_days: 7 },
        ],
      },
      {
        title: 'Entraîner l’attention',
        description: 'Le focus est un muscle.',
        xp_reward: 250,
        tasks: [
          { title: 'Méditation 10 min sur la respiration', xp_reward: 20 },
          { title: 'Lire 20 pages sans toucher au téléphone', xp_reward: 25, frequency_days: 2 },
          { title: 'Faire un puzzle ou jeu de logique 15 min', xp_reward: 15, is_optional: true, frequency_days: 2 },
          { title: 'Pause attention : 5 min à ne rien faire (vraiment)', xp_reward: 10, is_optional: true },
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
        xp_reward: 400,
        tasks: [
          { title: 'Noter chaque dépense du jour', xp_reward: 20 },
          { title: 'Faire le point mensuel : entrées / sorties / reste', xp_reward: 150, frequency_days: 30 },
        ],
      },
      {
        title: 'Réduire les fuites',
        description: 'Élimine les dépenses inutiles.',
        xp_reward: 450,
        tasks: [
          { title: 'Annuler 1 abonnement inutile', xp_reward: 80, frequency_days: 365 },
          { title: 'Préparer ses repas à la maison', xp_reward: 25 },
          { title: 'Revue hebdo des achats impulsifs', xp_reward: 50, frequency_days: 7 },
          { title: 'Comparer 1 prix avant un achat', xp_reward: 15, is_optional: true, frequency_days: 3 },
        ],
      },
      {
        title: 'Augmenter tes revenus',
        description: 'L’économie a un plancher, les revenus n’ont pas de plafond.',
        xp_reward: 400,
        tasks: [
          { title: 'Identifier 1 piste de revenu supplémentaire', xp_reward: 80, frequency_days: 30 },
          { title: 'Investir 30 min dans une compétence monétisable', xp_reward: 30, frequency_days: 2 },
        ],
      },
      {
        title: 'Constituer un coussin',
        description: 'La sécurité avant l’investissement.',
        xp_reward: 350,
        tasks: [
          { title: 'Virer un % fixe vers un compte épargne', xp_reward: 100, frequency_days: 30 },
          { title: 'Bilan trimestriel de l’épargne', xp_reward: 200, frequency_days: 90 },
          { title: 'Comparer ses tarifs (assurance, banque, abonnements)', xp_reward: 50, is_optional: true, frequency_days: 90 },
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
        xp_reward: 250,
        tasks: [
          { title: 'Lire 20 minutes', xp_reward: 25 },
          { title: 'Lire avant de toucher au téléphone le matin', xp_reward: 20 },
        ],
      },
      {
        title: 'Mémoriser ce que tu lis',
        description: 'Lire passivement = oublier.',
        xp_reward: 200,
        tasks: [
          { title: 'Noter 1 idée marquante du jour', xp_reward: 15 },
          { title: 'Surligner 1 phrase qui te parle', xp_reward: 10 },
          { title: 'Discuter de ta lecture avec quelqu’un', xp_reward: 30, is_optional: true, frequency_days: 7 },
        ],
      },
      {
        title: 'Mettre en pratique',
        description: 'La lecture sans action est du divertissement.',
        xp_reward: 200,
        tasks: [
          { title: 'Appliquer 1 idée lue cette semaine', xp_reward: 80, frequency_days: 7 },
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
        xp_reward: 450,
        tasks: [
          { title: '30 min de pratique focalisée', xp_reward: 35 },
          { title: 'Réviser ce que tu as appris hier', xp_reward: 20 },
        ],
      },
      {
        title: 'Théorie & fondamentaux',
        description: 'Combler les lacunes structurelles.',
        xp_reward: 300,
        tasks: [
          { title: '15 min de théorie / cours', xp_reward: 20, frequency_days: 2 },
          { title: 'Faire 1 exercice de fond complet', xp_reward: 50, frequency_days: 7 },
        ],
      },
      {
        title: 'Production / création',
        description: 'Appliquer pour vraiment apprendre.',
        xp_reward: 400,
        tasks: [
          { title: 'Créer / produire quelque chose avec la compétence', xp_reward: 80, frequency_days: 7 },
          { title: 'Documenter ta progression (vidéo, photo, écrit)', xp_reward: 40, frequency_days: 7 },
          { title: 'Filmer ta pratique du jour', xp_reward: 30, is_optional: true, frequency_days: 7 },
        ],
      },
      {
        title: 'Communauté & retour',
        description: 'Tu apprends 10x plus en échangeant.',
        xp_reward: 250,
        tasks: [
          { title: 'Demander un feedback à quelqu’un', xp_reward: 60, frequency_days: 14 },
          { title: 'Aider un débutant', xp_reward: 50, frequency_days: 14 },
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
        title: 'Assise quotidienne',
        description: 'Le rituel non négociable.',
        xp_reward: 400,
        tasks: [
          { title: 'Méditation 20 min', xp_reward: 30 },
          { title: 'Même heure, même endroit', xp_reward: 10 },
        ],
      },
      {
        title: 'Méditations en mouvement',
        description: 'La pleine conscience hors du coussin.',
        xp_reward: 300,
        tasks: [
          { title: 'Marche consciente 15 min', xp_reward: 20 },
          { title: 'Un repas en pleine conscience', xp_reward: 25, frequency_days: 2 },
          { title: 'Méditer en pleine nature', xp_reward: 40, is_optional: true, frequency_days: 7 },
        ],
      },
      {
        title: 'Approfondir',
        description: 'Élargir la pratique.',
        xp_reward: 300,
        tasks: [
          { title: 'Session longue 45 min', xp_reward: 100, frequency_days: 7 },
          { title: 'Lecture de 10 pages d’un texte méditatif', xp_reward: 25, frequency_days: 3 },
        ],
      },
      {
        title: 'Intégrer dans la vie',
        description: 'Pas seulement sur le coussin.',
        xp_reward: 250,
        tasks: [
          { title: '3 pauses respiration de 1 min dans la journée', xp_reward: 15 },
          { title: 'Bilan hebdo des progrès intérieurs', xp_reward: 60, frequency_days: 7 },
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
        title: 'Réparer ce qui doit l’être',
        description: 'Pardonner, s’excuser, clarifier.',
        xp_reward: 350,
        tasks: [
          { title: 'Envoyer un message à une personne avec qui c’est tendu', xp_reward: 100, frequency_days: 14 },
          { title: 'Présenter des excuses sincères si nécessaire', xp_reward: 150, frequency_days: 365 },
        ],
      },
      {
        title: 'Nourrir les liens',
        description: 'Les vraies amitiés s’entretiennent.',
        xp_reward: 300,
        tasks: [
          { title: 'Appeler un proche', xp_reward: 30, frequency_days: 7 },
          { title: 'Envoyer un message gratuit à un ami', xp_reward: 15, frequency_days: 2 },
          { title: 'Organiser un moment ensemble', xp_reward: 80, frequency_days: 14 },
          { title: 'Faire un geste gratuit pour quelqu’un', xp_reward: 25, is_optional: true, frequency_days: 7 },
        ],
      },
      {
        title: 'Présence pleine',
        description: 'Être vraiment là quand tu es là.',
        xp_reward: 250,
        tasks: [
          { title: 'Pas de téléphone pendant les repas en famille', xp_reward: 20 },
          { title: 'Écouter sans interrompre dans une conversation', xp_reward: 25 },
          { title: 'Poser 1 question profonde à un proche', xp_reward: 20, is_optional: true, frequency_days: 3 },
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
        xp_reward: 500,
        tasks: [
          { title: 'Publier une création (texte/image/code/vidéo)', xp_reward: 50 },
          { title: 'Documenter le processus, pas que le résultat', xp_reward: 25, frequency_days: 2 },
        ],
      },
      {
        title: 'Apprendre des autres',
        description: 'L’input nourrit l’output.',
        xp_reward: 350,
        tasks: [
          { title: 'Étudier 1 création qui t’inspire', xp_reward: 20 },
          { title: 'Lire un long-form (article, essai) 30 min', xp_reward: 25, frequency_days: 2 },
          { title: 'Constituer un swipe-file d’idées', xp_reward: 15, is_optional: true, frequency_days: 3 },
        ],
      },
      {
        title: 'Engager la communauté',
        description: 'Créer, c’est dialoguer.',
        xp_reward: 400,
        tasks: [
          { title: 'Répondre à 3 commentaires sincèrement', xp_reward: 20 },
          { title: 'Engager 1 conversation publique', xp_reward: 30, frequency_days: 3 },
          { title: 'Commenter le travail de 2 autres créateurs', xp_reward: 25 },
        ],
      },
      {
        title: 'Itérer et progresser',
        description: 'Mesurer et ajuster.',
        xp_reward: 350,
        tasks: [
          { title: 'Bilan hebdo : ce qui a marché / pas marché', xp_reward: 80, frequency_days: 7 },
          { title: 'Refondre 1 ancienne création avec ton nouveau niveau', xp_reward: 150, frequency_days: 30 },
          { title: 'Demander un retour public à 1 création', xp_reward: 40, is_optional: true, frequency_days: 14 },
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
        xp_reward: 300,
        tasks: [
          { title: 'Donner ou jeter 3 objets inutiles', xp_reward: 25 },
          { title: 'Vider 1 catégorie complète (vêtements, livres, etc.)', xp_reward: 80, frequency_days: 7 },
          { title: 'Photographier 1 espace réorganisé', xp_reward: 20, is_optional: true, frequency_days: 7 },
        ],
      },
      {
        title: 'Ne plus accumuler',
        description: 'Le robinet avant le bocal.',
        xp_reward: 250,
        tasks: [
          { title: 'Pause de 24h avant tout achat non essentiel', xp_reward: 30 },
          { title: 'Liste des choses non achetées cette semaine', xp_reward: 50, frequency_days: 7 },
        ],
      },
      {
        title: 'Routine simplifiée',
        description: 'Moins de décisions, plus d’énergie.',
        xp_reward: 200,
        tasks: [
          { title: 'Préparer ses vêtements la veille', xp_reward: 15 },
          { title: 'Manger la même chose plusieurs jours d’affilée', xp_reward: 20, frequency_days: 3 },
          { title: 'Une seule app par usage (1 task list, 1 notes…)', xp_reward: 25, is_optional: true, frequency_days: 7 },
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
        title: 'Corps de guerrier',
        description: 'Force, endurance, énergie.',
        xp_reward: 1000,
        tasks: [
          { title: 'Sport intense 1h', xp_reward: 50 },
          { title: '10 000 pas dans la journée', xp_reward: 25 },
          { title: 'Stretching / mobilité 15 min', xp_reward: 20, frequency_days: 2 },
          { title: 'Préparer tous ses repas (pas de fast-food)', xp_reward: 30 },
        ],
      },
      {
        title: 'Mental d’acier',
        description: 'Focus, discipline mentale, résilience.',
        xp_reward: 1000,
        tasks: [
          { title: 'Travail profond 2h sans interruption', xp_reward: 60 },
          { title: 'Lecture 1h', xp_reward: 50 },
          { title: 'Pas de réseaux sociaux aujourd’hui', xp_reward: 40 },
          { title: 'Journal des décisions du jour', xp_reward: 25 },
        ],
      },
      {
        title: 'Esprit zen',
        description: 'Calme intérieur et présence.',
        xp_reward: 800,
        tasks: [
          { title: 'Méditation 30 min', xp_reward: 40 },
          { title: 'Marche consciente sans téléphone 20 min', xp_reward: 25 },
          { title: '3 gratitudes écrites le soir', xp_reward: 20 },
        ],
      },
      {
        title: 'Vie alignée',
        description: 'Direction long-terme, mesurée.',
        xp_reward: 700,
        tasks: [
          { title: 'Définir l’intention de la semaine', xp_reward: 50, frequency_days: 7 },
          { title: 'Revue hebdo : ce qui a marché / pas marché', xp_reward: 60, frequency_days: 7 },
          { title: 'Revue mensuelle : ajuster les objectifs', xp_reward: 150, frequency_days: 30 },
          { title: 'Noter 1 leçon apprise aujourd’hui', xp_reward: 20, is_optional: true },
          { title: 'Aider quelqu’un anonymement', xp_reward: 40, is_optional: true, frequency_days: 7 },
        ],
      },
    ],
  },
];

// ============================================================
// SECONDARY QUESTS — 20 quests, 2-3 objectives each, 1-3 tasks each
// ============================================================

export const SECONDARY_QUESTS: QuestSeed[] = [
  {
    title: '7 jours sans plainte',
    description: 'Une semaine entière sans se plaindre de rien.',
    type: 'secondary',
    difficulty: 'medium',
    duration_days: 7,
    xp_reward: 400,
    objectives: [
      {
        title: 'Conscience verbale',
        description: 'Surveille ton langage.',
        xp_reward: 150,
        tasks: [
          { title: 'Aucune plainte aujourd’hui', xp_reward: 40 },
          { title: 'Noter chaque envie de se plaindre', xp_reward: 15 },
        ],
      },
      {
        title: 'Reformuler',
        description: 'Plainte → demande ou gratitude.',
        xp_reward: 100,
        tasks: [
          { title: 'Transformer 1 plainte en demande/gratitude', xp_reward: 25 },
          { title: 'Remercier 1 personne explicitement', xp_reward: 15, is_optional: true },
        ],
      },
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
      {
        title: 'Bouger',
        description: 'Un pas après l’autre.',
        xp_reward: 200,
        tasks: [
          { title: '10 000 pas', xp_reward: 25 },
          { title: 'Marche d’au moins 20 min en une fois', xp_reward: 15 },
        ],
      },
      {
        title: 'Présence dans le mouvement',
        description: 'Marcher consciemment.',
        xp_reward: 100,
        tasks: [
          { title: '1 marche sans téléphone', xp_reward: 20, frequency_days: 2 },
        ],
      },
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
      {
        title: 'Couvre-feu numérique',
        description: 'Récupère ton sommeil.',
        xp_reward: 150,
        tasks: [
          { title: 'Téléphone éteint dès 21h', xp_reward: 30 },
          { title: 'Téléphone hors de la chambre', xp_reward: 15 },
          { title: 'Lampe tamisée 1h avant coucher', xp_reward: 15, is_optional: true },
        ],
      },
      {
        title: 'Remplacer la dose',
        description: 'Combler le vide.',
        xp_reward: 100,
        tasks: [
          { title: '15 min de lecture le soir', xp_reward: 20 },
        ],
      },
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
      {
        title: 'Cuisinier amateur',
        description: 'Reprends ton alimentation en main.',
        xp_reward: 200,
        tasks: [
          { title: 'Cuisiner 2 repas', xp_reward: 40 },
          { title: 'Aucun plat préparé / livraison', xp_reward: 30 },
          { title: 'Tester 1 nouvelle recette', xp_reward: 30, is_optional: true, frequency_days: 3 },
        ],
      },
      {
        title: 'Planifier',
        description: 'Pas de surprise = pas de craquage.',
        xp_reward: 100,
        tasks: [
          { title: 'Faire les courses pour la semaine', xp_reward: 80, frequency_days: 7 },
        ],
      },
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
      {
        title: 'Acquisition',
        description: 'Engranger.',
        xp_reward: 200,
        tasks: [
          { title: 'Apprendre 4 nouveaux mots', xp_reward: 25 },
        ],
      },
      {
        title: 'Révision active',
        description: 'Sans révision, oubli.',
        xp_reward: 150,
        tasks: [
          { title: 'Réviser les mots des jours précédents', xp_reward: 15 },
          { title: 'Faire 5 phrases avec les nouveaux mots', xp_reward: 25, frequency_days: 2 },
        ],
      },
      {
        title: 'Mise en situation',
        description: 'Sortir de la liste.',
        xp_reward: 100,
        tasks: [
          { title: 'Écouter / lire 10 min dans la langue', xp_reward: 30, frequency_days: 2 },
        ],
      },
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
      {
        title: 'Choc thermique',
        description: 'Force mentale et physique.',
        xp_reward: 250,
        tasks: [
          { title: 'Douche froide 2 min minimum', xp_reward: 35 },
          { title: 'Respiration Wim Hof 5 min', xp_reward: 25, is_optional: true, frequency_days: 2 },
        ],
      },
      {
        title: 'Progression',
        description: 'Augmenter la difficulté.',
        xp_reward: 150,
        tasks: [
          { title: 'Douche entièrement froide (pas que la fin)', xp_reward: 50, frequency_days: 3 },
        ],
      },
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
      {
        title: 'Pratique de la gratitude',
        description: 'Reprogramme ton cerveau.',
        xp_reward: 150,
        tasks: [
          { title: '3 gratitudes écrites', xp_reward: 20 },
          { title: 'Identifier 1 personne à remercier', xp_reward: 15, frequency_days: 2 },
        ],
      },
      {
        title: 'Concrétiser',
        description: 'La gratitude qui sort de toi.',
        xp_reward: 100,
        tasks: [
          { title: 'Envoyer un message de gratitude à quelqu’un', xp_reward: 60, frequency_days: 7 },
        ],
      },
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
      {
        title: 'Détox sucre',
        description: 'Reset ton goût.',
        xp_reward: 200,
        tasks: [
          { title: 'Aucun sucre ajouté aujourd’hui', xp_reward: 60 },
          { title: 'Lire les étiquettes avant d’acheter', xp_reward: 20 },
          { title: 'Boire 1 grand verre d’eau au lever', xp_reward: 10, is_optional: true },
        ],
      },
      {
        title: 'Remplacer',
        description: 'Trouver d’autres plaisirs.',
        xp_reward: 100,
        tasks: [
          { title: 'Manger 1 fruit frais à la place du sucré', xp_reward: 20 },
        ],
      },
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
      {
        title: 'Routine matinale',
        description: 'Gagner du temps sur soi.',
        xp_reward: 250,
        tasks: [
          { title: 'Levé avant 6h05', xp_reward: 40 },
          { title: 'Pas de snooze', xp_reward: 15 },
        ],
      },
      {
        title: 'Préparer la veille',
        description: 'Le matin réussi se prépare la veille.',
        xp_reward: 150,
        tasks: [
          { title: 'Couché avant 22h30', xp_reward: 25 },
        ],
      },
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
      {
        title: 'Sobriété',
        description: 'Reset complet.',
        xp_reward: 300,
        tasks: [
          { title: 'Pas une goutte aujourd’hui', xp_reward: 25 },
        ],
      },
      {
        title: 'Affronter les déclencheurs',
        description: 'La sobriété sociale.',
        xp_reward: 200,
        tasks: [
          { title: 'Identifier ce qui t’a donné envie aujourd’hui', xp_reward: 20, frequency_days: 2 },
          { title: 'Sortie sociale sans alcool', xp_reward: 80, frequency_days: 7 },
        ],
      },
      {
        title: 'Constater les bénéfices',
        description: 'Voir le changement.',
        xp_reward: 150,
        tasks: [
          { title: 'Noter 1 bénéfice ressenti cette semaine', xp_reward: 50, frequency_days: 7 },
        ],
      },
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
      {
        title: 'Volume',
        description: 'Construis ton tronc.',
        xp_reward: 200,
        tasks: [
          { title: '50 pompes (1 ou plusieurs séries)', xp_reward: 25 },
          { title: 'Gainage 1 minute', xp_reward: 15, is_optional: true },
        ],
      },
      {
        title: 'Forme',
        description: 'La technique avant les reps.',
        xp_reward: 100,
        tasks: [
          { title: 'Au moins 1 série stricte (forme parfaite)', xp_reward: 15 },
        ],
      },
      {
        title: 'Progression',
        description: 'Tester ses limites.',
        xp_reward: 100,
        tasks: [
          { title: 'Test : max de pompes en 1 série', xp_reward: 80, frequency_days: 7 },
        ],
      },
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
      {
        title: 'Lecture suivie',
        description: 'Pages après pages.',
        xp_reward: 200,
        tasks: [
          { title: 'Lire au moins 20 pages', xp_reward: 25 },
        ],
      },
      {
        title: 'Réflexion',
        description: 'Pas juste passer les yeux.',
        xp_reward: 150,
        tasks: [
          { title: 'Noter 1 idée marquante', xp_reward: 15 },
          { title: 'Résumer le chapitre lu en 3 phrases', xp_reward: 30, frequency_days: 2 },
        ],
      },
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
      {
        title: 'Hydratation',
        description: 'Base oubliée.',
        xp_reward: 200,
        tasks: [
          { title: '2L d’eau dans la journée', xp_reward: 20 },
          { title: '1 verre au réveil', xp_reward: 10 },
          { title: 'Ajouter citron ou menthe à 1 verre', xp_reward: 10, is_optional: true },
        ],
      },
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
      {
        title: 'Souplesse',
        description: 'Démarre la journée détendu.',
        xp_reward: 200,
        tasks: [
          { title: '15 min de stretching/yoga', xp_reward: 25 },
        ],
      },
      {
        title: 'Aller plus loin',
        description: 'Tester de nouvelles postures.',
        xp_reward: 100,
        tasks: [
          { title: 'Suivre un cours vidéo complet 30 min', xp_reward: 50, frequency_days: 3 },
        ],
      },
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
      {
        title: 'Introspection',
        description: 'Clarifier ses idées.',
        xp_reward: 200,
        tasks: [
          { title: '5 lignes minimum', xp_reward: 20 },
          { title: 'Identifier l’émotion dominante du jour', xp_reward: 10 },
        ],
      },
      {
        title: 'Recul',
        description: 'Voir le motif sur la durée.',
        xp_reward: 100,
        tasks: [
          { title: 'Relire et synthétiser la semaine', xp_reward: 50, frequency_days: 7 },
        ],
      },
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
      {
        title: 'Générosité sociale',
        description: 'Donne avant de recevoir.',
        xp_reward: 150,
        tasks: [
          { title: '1 compliment sincère', xp_reward: 20 },
        ],
      },
      {
        title: 'Spécifique et profond',
        description: 'Pas du flagornage générique.',
        xp_reward: 100,
        tasks: [
          { title: 'Complimenter sur 1 qualité (pas le physique)', xp_reward: 25, frequency_days: 2 },
        ],
      },
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
      {
        title: 'Pratique',
        description: 'La constance bat le talent.',
        xp_reward: 250,
        tasks: [
          { title: '30 min de code', xp_reward: 30 },
        ],
      },
      {
        title: 'Progression mesurable',
        description: 'Ne pas juste cliquer.',
        xp_reward: 200,
        tasks: [
          { title: 'Commiter au moins 1 changement', xp_reward: 20 },
          { title: 'Apprendre 1 nouvelle notion / pattern', xp_reward: 40, frequency_days: 2 },
        ],
      },
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
      {
        title: 'Pleine conscience',
        description: 'Commence petit.',
        xp_reward: 150,
        tasks: [
          { title: '5 min de méditation', xp_reward: 20 },
          { title: 'Même heure tous les jours', xp_reward: 10 },
          { title: 'Respiration 4-7-8 avant de dormir', xp_reward: 10, is_optional: true },
        ],
      },
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
      {
        title: 'Détox écran',
        description: 'Reprends tes soirées.',
        xp_reward: 200,
        tasks: [
          { title: 'Aucun streaming aujourd’hui', xp_reward: 30 },
        ],
      },
      {
        title: 'Remplir le temps libéré',
        description: 'Faire autre chose, pas scroller.',
        xp_reward: 150,
        tasks: [
          { title: '1 activité non-écran de 1h', xp_reward: 30 },
          { title: 'Sortie sociale ou créative', xp_reward: 60, frequency_days: 3 },
        ],
      },
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
      {
        title: 'Endurance',
        description: 'Un peu chaque jour.',
        xp_reward: 350,
        tasks: [
          { title: '3-4 km parcourus', xp_reward: 30 },
        ],
      },
      {
        title: 'Sortie longue',
        description: 'Une fois par semaine, plus loin.',
        xp_reward: 200,
        tasks: [
          { title: 'Sortie de 10 km minimum', xp_reward: 100, frequency_days: 7 },
        ],
      },
      {
        title: 'Récupération',
        description: 'Le corps se construit au repos.',
        xp_reward: 100,
        tasks: [
          { title: 'Stretching post-effort 10 min', xp_reward: 15, frequency_days: 2 },
        ],
      },
    ],
  },
];

// ============================================================
// TROPHIES
// ============================================================
export const TROPHIES = [
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

  // ===== NEW : étoiles, jours parfaits, bonus, maîtrise, custom =====
  // Easy
  { code: 'character_initialized', title: 'Connais-toi toi-même', description: 'Tu as rempli ta baseline de caractéristiques.', rarity: 'easy' as Difficulty, xp_reward: 30 },
  { code: 'first_optional', title: 'Petit plus', description: 'Tu as validé ta première tâche bonus.', rarity: 'easy' as Difficulty, xp_reward: 25 },
  { code: 'first_perfect_day', title: 'Premier jour parfait', description: 'Tu as bouclé toutes les tâches d’un objectif sur une journée.', rarity: 'easy' as Difficulty, xp_reward: 50 },
  { code: 'first_mastered', title: 'Maîtrise initiale', description: 'Tu as maîtrisé ton premier objectif (mandatory + bonus, zéro raté).', rarity: 'easy' as Difficulty, xp_reward: 75 },

  // Medium
  { code: 'first_star', title: 'Étoile filante', description: 'Tu as décroché ta première étoile (quête parfaite).', rarity: 'medium' as Difficulty, xp_reward: 200 },
  { code: 'ten_perfect_days', title: '10 jours parfaits', description: 'Tu as bouclé 10 jours parfaits sur tes objectifs.', rarity: 'medium' as Difficulty, xp_reward: 200 },
  { code: 'thirty_optional', title: 'Sur-performance', description: '30 tâches bonus validées.', rarity: 'medium' as Difficulty, xp_reward: 250 },
  { code: 'first_custom_done', title: 'Architecte accompli', description: 'Tu as terminé une quête personnalisée.', rarity: 'medium' as Difficulty, xp_reward: 200 },
  { code: 'ten_mastered', title: 'Dix objectifs maîtrisés', description: 'Tu as maîtrisé 10 objectifs.', rarity: 'medium' as Difficulty, xp_reward: 300 },

  // Hard
  { code: 'five_stars', title: 'Pluie d’étoiles', description: '5 étoiles à ton compteur.', rarity: 'hard' as Difficulty, xp_reward: 500 },
  { code: 'thirty_perfect_days', title: '30 jours parfaits', description: 'Tu as enchaîné 30 jours parfaits sur tes objectifs.', rarity: 'hard' as Difficulty, xp_reward: 600 },
  { code: 'hundred_optional', title: 'Au-delà du devoir', description: '100 tâches bonus validées.', rarity: 'hard' as Difficulty, xp_reward: 700 },

  // Expert
  { code: 'ten_stars', title: 'Constellation', description: '10 étoiles cumulées.', rarity: 'expert' as Difficulty, xp_reward: 1200 },
  { code: 'hundred_perfect_days', title: '100 jours parfaits', description: 'Centurion du jour parfait.', rarity: 'expert' as Difficulty, xp_reward: 1500 },

  // Legendary
  { code: 'twenty_five_stars', title: 'Galaxie', description: '25 étoiles. Mythique.', rarity: 'legendary' as Difficulty, xp_reward: 3000 },
  { code: 'fifty_stars', title: 'Maître des étoiles', description: '50 étoiles. Tu réécris les règles.', rarity: 'legendary' as Difficulty, xp_reward: 5000 },
];
