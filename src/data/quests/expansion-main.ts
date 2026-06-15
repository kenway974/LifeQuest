import type { QuestModule } from './types';

/**
 * MAIN quest expansion — abstract, directional "packages".
 *
 * Each quest groups several objectives + tasks that all pull in the same
 * direction and mark a concrete life stage. Evocative titles, longer durations.
 */
export const MAIN_EXPANSION: QuestModule = {
  quests: [
    {
      title: 'Devenir un chien de la casse',
      description: 'Briser toutes tes barrières intérieures. 45 jours pour ne plus jamais te laisser arrêter par la peur, le regard des autres ou le confort.',
      type: 'main',
      difficulty: 'hard',
      duration_days: 45,
      xp_reward: 2200,
      objectives: [
        {
          title: 'Démolir la peur du regard des autres',
          description: 'Le jugement des autres n’est qu’une prison que tu construis toi-même.',
          xp_reward: 400,
          stat_impacts: { emotion: 5, social: 4, discipline: 3 },
          tasks: [
            { title: 'Faire une chose un peu gênante en public', xp_reward: 40, frequency_days: 2 },
            { title: 'Donner ton avis sans le filtrer', xp_reward: 25 },
            { title: 'Noter 1 barrière mentale franchie aujourd’hui', xp_reward: 20 },
            { title: 'Faire un truc seul que tu n’oses jamais faire seul', xp_reward: 40, is_optional: true, frequency_days: 7 },
          ],
        },
        {
          title: 'Agir malgré la peur',
          description: 'Le courage, ce n’est pas l’absence de peur, c’est agir avec.',
          xp_reward: 450,
          stat_impacts: { discipline: 6, emotion: 4 },
          tasks: [
            { title: 'Faire 1 chose qui te fait vraiment peur', xp_reward: 60, frequency_days: 3 },
            { title: 'Dire oui à une opportunité qui t’intimide', xp_reward: 50, frequency_days: 7 },
            { title: 'Avancer sur ce que tu repousses depuis des semaines', xp_reward: 30, frequency_days: 2 },
          ],
        },
        {
          title: 'Forger un mental de fer',
          description: 'Te prouver chaque jour que tu tiens ta parole envers toi-même.',
          xp_reward: 400,
          stat_impacts: { discipline: 6, force: 2, endurance: 2 },
          tasks: [
            { title: 'Faire l’effort dur du jour même sans motivation', xp_reward: 35 },
            { title: 'Tenir une promesse faite à toi-même', xp_reward: 30 },
            { title: 'Sortir de ta zone de confort physique', xp_reward: 25, frequency_days: 2 },
          ],
        },
        {
          title: 'Devenir inarrêtable',
          description: 'Capitaliser sur ta nouvelle audace.',
          xp_reward: 300,
          stat_impacts: { discipline: 4, emotion: 3 },
          tasks: [
            { title: 'Bilan hebdo : 3 barrières tombées', xp_reward: 60, frequency_days: 7 },
            { title: 'Fixer un défi plus grand pour la semaine suivante', xp_reward: 40, frequency_days: 7 },
          ],
        },
      ],
    },

    {
      title: 'Devenir entrepreneur',
      description: '90 jours pour passer de l’idée au premier client. Mentalité, exécution, vente — tout le package pour lancer ton projet.',
      type: 'main',
      difficulty: 'expert',
      duration_days: 90,
      xp_reward: 3800,
      objectives: [
        {
          title: 'Trouver et valider une idée',
          description: 'Une idée ne vaut rien tant qu’un client n’a pas payé pour.',
          xp_reward: 500,
          stat_impacts: { creativite: 5, focus: 4 },
          tasks: [
            { title: 'Noter 3 problèmes réels à résoudre', xp_reward: 30, frequency_days: 3 },
            { title: 'Parler à 1 client potentiel', xp_reward: 60, frequency_days: 3 },
            { title: 'Rédiger ta proposition de valeur en 1 phrase', xp_reward: 50, frequency_days: 30 },
          ],
        },
        {
          title: 'Construire la mentalité du fondateur',
          description: 'Discipline, résilience, action imparfaite.',
          xp_reward: 450,
          stat_impacts: { discipline: 6, emotion: 3 },
          tasks: [
            { title: '1h de travail profond sur ton projet', xp_reward: 50 },
            { title: 'Lire / écouter 20 min sur l’entrepreneuriat', xp_reward: 20 },
            { title: 'Accepter 1 échec ou refus sans abandonner', xp_reward: 40, frequency_days: 7 },
          ],
        },
        {
          title: 'Construire le produit minimum',
          description: 'Sortir quelque chose, même imparfait.',
          xp_reward: 550,
          stat_impacts: { creativite: 5, discipline: 4 },
          tasks: [
            { title: 'Avancer concrètement sur ton MVP', xp_reward: 50 },
            { title: 'Montrer ton avancement à quelqu’un', xp_reward: 40, frequency_days: 7 },
            { title: 'Documenter ton build en public', xp_reward: 30, is_optional: true, frequency_days: 3 },
          ],
        },
        {
          title: 'Vendre et trouver ton premier client',
          description: 'Rien ne se passe tant que rien n’est vendu.',
          xp_reward: 600,
          stat_impacts: { social: 5, discipline: 4, creativite: 2 },
          tasks: [
            { title: 'Contacter 3 prospects', xp_reward: 50 },
            { title: 'Faire 1 démonstration ou pitch', xp_reward: 60, frequency_days: 3 },
            { title: 'Demander un retour franc sur ton offre', xp_reward: 40, frequency_days: 7 },
          ],
        },
      ],
    },

    {
      title: 'La maîtrise du corps',
      description: '90 jours pour apprendre à maîtriser ton corps de bout en bout : force, souplesse, énergie, récupération. Le devenir le pilote.',
      type: 'main',
      difficulty: 'expert',
      duration_days: 90,
      xp_reward: 3200,
      objectives: [
        {
          title: 'Bâtir la force',
          description: 'Un corps fort change tout le reste.',
          xp_reward: 500,
          stat_impacts: { force: 7, discipline: 3 },
          tasks: [
            { title: 'Séance de renforcement musculaire', xp_reward: 45, frequency_days: 2 },
            { title: 'Progresser sur 1 exercice clé (reps ou charge)', xp_reward: 40, frequency_days: 7 },
            { title: 'Gainage du jour', xp_reward: 15 },
          ],
        },
        {
          title: 'Gagner en mobilité et souplesse',
          description: 'Un corps maîtrisé est un corps qui bouge librement.',
          xp_reward: 400,
          stat_impacts: { endurance: 3, calme: 3, force: 2 },
          tasks: [
            { title: '15 min de mobilité / stretching', xp_reward: 25 },
            { title: 'Travailler 1 posture difficile', xp_reward: 20, frequency_days: 2 },
          ],
        },
        {
          title: 'Alimenter la machine',
          description: 'Carburant de qualité, performances de qualité.',
          xp_reward: 400,
          stat_impacts: { endurance: 4, discipline: 4 },
          tasks: [
            { title: 'Repas riches en protéines et légumes', xp_reward: 25 },
            { title: '2,5 L d’eau dans la journée', xp_reward: 15 },
            { title: 'Aucun aliment ultra-transformé', xp_reward: 25, frequency_days: 2 },
          ],
        },
        {
          title: 'Maîtriser la récupération',
          description: 'On ne progresse pas à l’entraînement, mais au repos.',
          xp_reward: 350,
          stat_impacts: { calme: 4, endurance: 3 },
          tasks: [
            { title: '7-8h de sommeil', xp_reward: 30 },
            { title: 'Séance de récupération active ou étirements', xp_reward: 25, frequency_days: 3 },
            { title: 'Mesurer ses progrès (photo, perf, sensations)', xp_reward: 40, frequency_days: 7 },
          ],
        },
      ],
    },

    {
      title: 'Devenir magnétique',
      description: '45 jours pour développer un charisme authentique : présence, communication, écoute. Devenir quelqu’un qu’on remarque et qu’on retient.',
      type: 'main',
      difficulty: 'hard',
      duration_days: 45,
      xp_reward: 2000,
      objectives: [
        {
          title: 'Rayonner une présence forte',
          description: 'Le charisme commence par le corps.',
          xp_reward: 400,
          stat_impacts: { social: 5, calme: 3 },
          tasks: [
            { title: 'Posture droite et ouverte toute la journée', xp_reward: 20 },
            { title: 'Parler plus lentement et plus posément', xp_reward: 25 },
            { title: 'Soutenir le contact visuel dans tes échanges', xp_reward: 25 },
          ],
        },
        {
          title: 'Maîtriser l’art de la conversation',
          description: 'Les gens se souviennent de comment tu les fais se sentir.',
          xp_reward: 450,
          stat_impacts: { social: 6, emotion: 3 },
          tasks: [
            { title: 'Engager une vraie conversation', xp_reward: 30 },
            { title: 'Poser une question qui fait parler l’autre de lui', xp_reward: 25 },
            { title: 'Retenir et réutiliser le prénom de quelqu’un', xp_reward: 20, is_optional: true },
          ],
        },
        {
          title: 'Écouter pour captiver',
          description: 'Le plus charismatique est souvent celui qui écoute le mieux.',
          xp_reward: 350,
          stat_impacts: { social: 5, emotion: 4 },
          tasks: [
            { title: 'Écouter sans interrompre ni penser à ta réponse', xp_reward: 25 },
            { title: 'Reformuler ce que l’autre ressent', xp_reward: 25, frequency_days: 2 },
          ],
        },
      ],
    },

    {
      title: 'Forger un mental inébranlable',
      description: '60 jours pour construire une résilience à toute épreuve. Affronter l’inconfort, gérer la pression, ne plus reculer.',
      type: 'main',
      difficulty: 'expert',
      duration_days: 60,
      xp_reward: 2600,
      objectives: [
        {
          title: 'Apprivoiser l’inconfort',
          description: 'Choisir volontairement la difficulté pour devenir dur à cuire.',
          xp_reward: 500,
          stat_impacts: { discipline: 6, calme: 3, endurance: 2 },
          tasks: [
            { title: 'Faire une chose inconfortable volontairement', xp_reward: 40 },
            { title: 'Tenir bon 1 min de plus quand tu veux abandonner', xp_reward: 25 },
            { title: 'Exposition au froid (douche ou bain froid)', xp_reward: 30, frequency_days: 2 },
          ],
        },
        {
          title: 'Maîtriser ses pensées',
          description: 'Tu n’es pas tes pensées. Tu es celui qui les observe.',
          xp_reward: 450,
          stat_impacts: { calme: 5, focus: 4 },
          tasks: [
            { title: 'Méditation 15 min', xp_reward: 30 },
            { title: 'Recadrer 1 pensée négative en opportunité', xp_reward: 25 },
            { title: 'Journal du soir : ce que tu as surmonté', xp_reward: 20 },
          ],
        },
        {
          title: 'Tenir sous pression',
          description: 'Rester calme et lucide quand ça chauffe.',
          xp_reward: 400,
          stat_impacts: { calme: 5, emotion: 4 },
          tasks: [
            { title: '3 respirations profondes avant de réagir', xp_reward: 20 },
            { title: 'Affronter une situation stressante au lieu de la fuir', xp_reward: 50, frequency_days: 3 },
          ],
        },
      ],
    },

    {
      title: 'Devenir un leader',
      description: '60 jours pour développer ton leadership : prendre des décisions, inspirer, assumer. Que tu diriges une équipe ou ta propre vie.',
      type: 'main',
      difficulty: 'hard',
      duration_days: 60,
      xp_reward: 2400,
      objectives: [
        {
          title: 'Prendre des décisions',
          description: 'Un leader décide, même dans l’incertitude.',
          xp_reward: 450,
          stat_impacts: { discipline: 5, focus: 4 },
          tasks: [
            { title: 'Prendre 1 décision que tu repoussais', xp_reward: 40, frequency_days: 2 },
            { title: 'Assumer une décision sans la justifier à l’excès', xp_reward: 30 },
            { title: 'Trancher rapidement sur les petites choses', xp_reward: 20 },
          ],
        },
        {
          title: 'Inspirer et fédérer',
          description: 'On suit ceux qui donnent l’exemple, pas des ordres.',
          xp_reward: 450,
          stat_impacts: { social: 6, emotion: 3 },
          tasks: [
            { title: 'Encourager ou valoriser quelqu’un sincèrement', xp_reward: 30 },
            { title: 'Prendre la parole pour défendre une idée', xp_reward: 40, frequency_days: 3 },
            { title: 'Aider un membre de ton entourage à progresser', xp_reward: 40, frequency_days: 7 },
          ],
        },
        {
          title: 'Assumer ses responsabilités',
          description: 'Le leader prend le blâme et partage le mérite.',
          xp_reward: 400,
          stat_impacts: { discipline: 5, emotion: 3 },
          tasks: [
            { title: 'Reconnaître une erreur sans te chercher d’excuse', xp_reward: 35, frequency_days: 3 },
            { title: 'Tenir tous tes engagements du jour', xp_reward: 30 },
          ],
        },
      ],
    },

    {
      title: 'L’âme d’artiste',
      description: '60 jours pour réveiller le créateur en toi. Produire, exposer, persévérer — faire de la création une part de ta vie.',
      type: 'main',
      difficulty: 'hard',
      duration_days: 60,
      xp_reward: 2300,
      objectives: [
        {
          title: 'Créer tous les jours',
          description: 'L’inspiration vient en créant, pas en attendant.',
          xp_reward: 500,
          stat_impacts: { creativite: 7, discipline: 3 },
          tasks: [
            { title: 'Créer quelque chose, même minuscule', xp_reward: 40 },
            { title: 'Consacrer 30 min à ton art', xp_reward: 30 },
          ],
        },
        {
          title: 'Nourrir ton univers',
          description: 'Un artiste se remplit autant qu’il se vide.',
          xp_reward: 400,
          stat_impacts: { creativite: 5, focus: 3 },
          tasks: [
            { title: 'Étudier une œuvre qui t’inspire', xp_reward: 25 },
            { title: 'Collecter 1 idée dans un carnet', xp_reward: 15 },
            { title: 'Essayer une technique ou un style nouveau', xp_reward: 35, frequency_days: 7 },
          ],
        },
        {
          title: 'Oser montrer',
          description: 'Une œuvre cachée ne touche personne.',
          xp_reward: 400,
          stat_impacts: { creativite: 4, social: 3, emotion: 2 },
          tasks: [
            { title: 'Partager une création', xp_reward: 50, frequency_days: 7 },
            { title: 'Demander un retour honnête', xp_reward: 30, frequency_days: 7 },
            { title: 'Publier sans tout retoucher 10 fois', xp_reward: 30, is_optional: true, frequency_days: 7 },
          ],
        },
      ],
    },

    {
      title: 'Renaître de ses cendres',
      description: '60 jours pour te reconstruire après une épreuve, un burnout ou une rupture. Reprendre pied, doucement mais sûrement.',
      type: 'main',
      difficulty: 'medium',
      duration_days: 60,
      xp_reward: 1900,
      objectives: [
        {
          title: 'Stabiliser les fondations',
          description: 'Avant de reconstruire, retrouver un socle.',
          xp_reward: 350,
          stat_impacts: { calme: 5, discipline: 3 },
          tasks: [
            { title: 'Une micro-routine matinale tenue', xp_reward: 25 },
            { title: 'Bouger le corps 15 min', xp_reward: 20 },
            { title: 'Un repas correct et un vrai verre d’eau', xp_reward: 15 },
          ],
        },
        {
          title: 'Panser les blessures',
          description: 'Accueillir ce qui fait mal pour mieux avancer.',
          xp_reward: 400,
          stat_impacts: { emotion: 6, calme: 3 },
          tasks: [
            { title: 'Écrire ce que tu ressens sans filtre', xp_reward: 25 },
            { title: 'Parler de ce que tu traverses à quelqu’un', xp_reward: 40, frequency_days: 7 },
            { title: 'T’accorder 1 moment de douceur', xp_reward: 15 },
          ],
        },
        {
          title: 'Se reprojeter',
          description: 'Doucement, redessiner un futur désirable.',
          xp_reward: 350,
          stat_impacts: { emotion: 4, focus: 3, discipline: 2 },
          tasks: [
            { title: 'Noter 1 petite chose qui t’a fait du bien', xp_reward: 20 },
            { title: 'Avancer d’un pas vers un nouveau projet', xp_reward: 35, frequency_days: 3 },
            { title: 'Bilan hebdo : le chemin parcouru', xp_reward: 50, frequency_days: 7 },
          ],
        },
      ],
    },

    {
      title: 'L’être de parole',
      description: '45 jours pour devenir quelqu’un dont la parole vaut de l’or. Faire ce que tu dis, dire ce que tu fais.',
      type: 'main',
      difficulty: 'medium',
      duration_days: 45,
      xp_reward: 1700,
      objectives: [
        {
          title: 'Tenir tes engagements',
          description: 'Chaque promesse tenue renforce ta colonne vertébrale.',
          xp_reward: 450,
          stat_impacts: { discipline: 7, emotion: 2 },
          tasks: [
            { title: 'Tenir 100% de tes engagements du jour', xp_reward: 35 },
            { title: 'Honorer une promesse faite à toi-même', xp_reward: 30 },
          ],
        },
        {
          title: 'Parler vrai',
          description: 'L’intégrité, c’est aligner tes mots et tes actes.',
          xp_reward: 400,
          stat_impacts: { social: 4, emotion: 4 },
          tasks: [
            { title: 'Dire la vérité même quand c’est inconfortable', xp_reward: 35, frequency_days: 2 },
            { title: 'Ne rien promettre que tu ne peux tenir', xp_reward: 25 },
          ],
        },
        {
          title: 'Réparer les écarts',
          description: 'Quand tu déroges, tu assumes et tu corriges.',
          xp_reward: 300,
          stat_impacts: { emotion: 3, discipline: 3 },
          tasks: [
            { title: 'Reconnaître un engagement non tenu', xp_reward: 30, frequency_days: 3 },
            { title: 'Bilan hebdo : ma parole valait-elle quelque chose ?', xp_reward: 50, frequency_days: 7 },
          ],
        },
      ],
    },

    {
      title: 'La grande transformation physique',
      description: '90 jours pour transformer ton corps en profondeur : entraînement structuré, nutrition stricte, suivi. Le vrai changement.',
      type: 'main',
      difficulty: 'expert',
      duration_days: 90,
      xp_reward: 3500,
      objectives: [
        {
          title: 'S’entraîner avec constance',
          description: 'La régularité bat l’intensité ponctuelle.',
          xp_reward: 600,
          stat_impacts: { force: 5, cardio: 4, endurance: 3 },
          tasks: [
            { title: 'Séance d’entraînement', xp_reward: 45, frequency_days: 2 },
            { title: 'Cardio ou marche rapide', xp_reward: 25 },
            { title: '10 000 pas', xp_reward: 20 },
          ],
        },
        {
          title: 'Manger pour ses objectifs',
          description: 'Les abdos se font dans la cuisine.',
          xp_reward: 550,
          stat_impacts: { discipline: 6, endurance: 3 },
          tasks: [
            { title: 'Respecter ton plan alimentaire', xp_reward: 35 },
            { title: 'Atteindre ton apport en protéines', xp_reward: 25 },
            { title: 'Aucun écart non prévu', xp_reward: 25 },
          ],
        },
        {
          title: 'Suivre et ajuster',
          description: 'Ce qui se mesure s’améliore.',
          xp_reward: 400,
          stat_impacts: { discipline: 4, focus: 3 },
          tasks: [
            { title: 'Peser et noter ses sensations', xp_reward: 30, frequency_days: 7 },
            { title: 'Photo de progression', xp_reward: 35, frequency_days: 14 },
            { title: 'Bilan mensuel et ajustement du plan', xp_reward: 100, frequency_days: 30 },
          ],
        },
      ],
    },

    {
      title: 'Maîtriser une langue étrangère',
      description: '90 jours d’immersion structurée pour passer un vrai cap dans une langue : comprendre, parler, penser dedans.',
      type: 'main',
      difficulty: 'hard',
      duration_days: 90,
      xp_reward: 2800,
      objectives: [
        {
          title: 'Construire le vocabulaire',
          description: 'Les mots sont les briques de la langue.',
          xp_reward: 500,
          stat_impacts: { focus: 5, discipline: 4 },
          tasks: [
            { title: 'Apprendre 5 nouveaux mots', xp_reward: 25 },
            { title: 'Réviser le vocabulaire (flashcards)', xp_reward: 20 },
          ],
        },
        {
          title: 'S’immerger dans la langue',
          description: 'Baigner ses oreilles et ses yeux.',
          xp_reward: 450,
          stat_impacts: { focus: 4, creativite: 3 },
          tasks: [
            { title: '20 min de contenu (série, podcast, lecture)', xp_reward: 30 },
            { title: 'Penser ta journée dans la langue cible', xp_reward: 15, is_optional: true },
          ],
        },
        {
          title: 'Oser parler',
          description: 'On apprend à parler en parlant.',
          xp_reward: 500,
          stat_impacts: { social: 5, emotion: 3, discipline: 2 },
          tasks: [
            { title: 'Parler à voix haute 10 min', xp_reward: 25 },
            { title: 'Avoir un échange réel avec un natif/partenaire', xp_reward: 60, frequency_days: 7 },
            { title: 'Écrire 5 phrases sur ta journée', xp_reward: 20, frequency_days: 2 },
          ],
        },
      ],
    },

    {
      title: 'Bâtir ta liberté financière',
      description: '90 jours pour poser les bases de l’indépendance financière : revenus multiples, investissement, mentalité d’abondance.',
      type: 'main',
      difficulty: 'expert',
      duration_days: 90,
      xp_reward: 3300,
      objectives: [
        {
          title: 'Augmenter ses revenus',
          description: 'Les économies ont un plancher, les revenus pas de plafond.',
          xp_reward: 550,
          stat_impacts: { creativite: 4, discipline: 4, social: 2 },
          tasks: [
            { title: 'Travailler sur une source de revenu complémentaire', xp_reward: 45 },
            { title: 'Développer une compétence qui se monétise', xp_reward: 30 },
            { title: 'Proposer une offre / candidater quelque part', xp_reward: 60, frequency_days: 7 },
          ],
        },
        {
          title: 'Investir intelligemment',
          description: 'Faire travailler l’argent à ta place.',
          xp_reward: 500,
          stat_impacts: { discipline: 5, focus: 4 },
          tasks: [
            { title: 'Se former 20 min à l’investissement', xp_reward: 25 },
            { title: 'Automatiser un virement vers l’épargne/investissement', xp_reward: 100, frequency_days: 30 },
            { title: 'Suivre ses placements sans paniquer', xp_reward: 20, frequency_days: 7 },
          ],
        },
        {
          title: 'Adopter une mentalité d’abondance',
          description: 'La liberté est d’abord un état d’esprit.',
          xp_reward: 400,
          stat_impacts: { calme: 4, focus: 3 },
          tasks: [
            { title: 'Définir ce que "assez" signifie pour toi', xp_reward: 50, frequency_days: 30 },
            { title: 'Bilan financier hebdomadaire', xp_reward: 50, frequency_days: 7 },
          ],
        },
      ],
    },

    {
      title: 'La voie du stoïcien',
      description: '60 jours pour vivre selon la sagesse stoïcienne : maîtriser ce qui dépend de toi, accepter le reste, agir avec vertu.',
      type: 'main',
      difficulty: 'hard',
      duration_days: 60,
      xp_reward: 2200,
      objectives: [
        {
          title: 'Distinguer ce qui dépend de toi',
          description: 'La sérénité naît de cette frontière.',
          xp_reward: 450,
          stat_impacts: { calme: 6, focus: 3 },
          tasks: [
            { title: 'Trier une contrariété : sous contrôle vs pas', xp_reward: 30 },
            { title: 'Lâcher consciemment 1 chose hors de ton contrôle', xp_reward: 25 },
          ],
        },
        {
          title: 'Pratiquer la discipline du jugement',
          description: 'Ce ne sont pas les choses qui troublent, mais nos opinions.',
          xp_reward: 450,
          stat_impacts: { calme: 5, emotion: 4 },
          tasks: [
            { title: 'Lire une maxime stoïcienne et l’appliquer', xp_reward: 25 },
            { title: 'Reformuler un événement négatif avec recul', xp_reward: 25 },
            { title: 'Méditation / pause de présence 10 min', xp_reward: 20 },
          ],
        },
        {
          title: 'Agir avec vertu',
          description: 'Le seul vrai bien est d’agir avec justesse.',
          xp_reward: 350,
          stat_impacts: { discipline: 4, social: 3, emotion: 2 },
          tasks: [
            { title: 'Faire le bon choix plutôt que le choix facile', xp_reward: 30, frequency_days: 2 },
            { title: 'Memento mori : réfléchir à l’essentiel 5 min', xp_reward: 20, is_optional: true },
            { title: 'Bilan du soir : ai-je agi selon mes valeurs ?', xp_reward: 25 },
          ],
        },
      ],
    },

    {
      title: 'Vivre centenaire',
      description: '60 jours pour adopter le mode de vie de la longévité : alimentation, mouvement, sommeil, lien social et sens.',
      type: 'main',
      difficulty: 'medium',
      duration_days: 60,
      xp_reward: 2000,
      objectives: [
        {
          title: 'Manger comme les zones bleues',
          description: 'Beaucoup de végétal, peu de transformé, jamais à satiété pleine.',
          xp_reward: 400,
          stat_impacts: { endurance: 4, discipline: 3 },
          tasks: [
            { title: 'Un repas majoritairement végétal', xp_reward: 25 },
            { title: 'S’arrêter de manger à 80% de satiété', xp_reward: 20 },
            { title: 'Aucun aliment ultra-transformé', xp_reward: 20, frequency_days: 2 },
          ],
        },
        {
          title: 'Bouger naturellement',
          description: 'Le mouvement doux et constant, pas l’effort extrême.',
          xp_reward: 400,
          stat_impacts: { cardio: 4, endurance: 4 },
          tasks: [
            { title: 'Marche d’au moins 30 min', xp_reward: 25 },
            { title: 'Activité physique douce (vélo, jardin, nage)', xp_reward: 20, frequency_days: 2 },
          ],
        },
        {
          title: 'Cultiver le calme et le lien',
          description: 'Sommeil, stress maîtrisé et relations nourrissent la longévité.',
          xp_reward: 400,
          stat_impacts: { calme: 4, social: 4 },
          tasks: [
            { title: '7-8h de sommeil', xp_reward: 25 },
            { title: 'Moment de détente sans écran', xp_reward: 20 },
            { title: 'Contact chaleureux avec un proche', xp_reward: 25, frequency_days: 2 },
          ],
        },
      ],
    },

    {
      title: 'Bâtir ton audience',
      description: '90 jours pour construire une présence en ligne authentique : créer régulièrement, engager, faire grandir une communauté.',
      type: 'main',
      difficulty: 'expert',
      duration_days: 90,
      xp_reward: 3000,
      objectives: [
        {
          title: 'Publier régulièrement',
          description: 'La constance bat le coup d’éclat.',
          xp_reward: 550,
          stat_impacts: { creativite: 6, discipline: 4 },
          tasks: [
            { title: 'Publier un contenu', xp_reward: 45 },
            { title: 'Préparer 1 contenu à l’avance', xp_reward: 25, frequency_days: 2 },
          ],
        },
        {
          title: 'Engager sa communauté',
          description: 'Une audience, c’est une conversation, pas un public.',
          xp_reward: 500,
          stat_impacts: { social: 6, creativite: 2 },
          tasks: [
            { title: 'Répondre à tous les commentaires/messages', xp_reward: 30 },
            { title: 'Commenter sincèrement chez 2 autres créateurs', xp_reward: 25 },
            { title: 'Poser une question à ton audience', xp_reward: 20, frequency_days: 3 },
          ],
        },
        {
          title: 'Apprendre et itérer',
          description: 'Mesurer ce qui marche, doubler la mise.',
          xp_reward: 400,
          stat_impacts: { focus: 4, discipline: 3 },
          tasks: [
            { title: 'Analyser ton contenu le plus performant', xp_reward: 40, frequency_days: 7 },
            { title: 'Tester un nouveau format', xp_reward: 50, frequency_days: 14 },
          ],
        },
      ],
    },

    {
      title: 'Vaincre toutes tes peurs',
      description: '45 jours pour affronter méthodiquement ce qui te terrifie. Une peur à la fois, jusqu’à la liberté.',
      type: 'main',
      difficulty: 'hard',
      duration_days: 45,
      xp_reward: 2100,
      objectives: [
        {
          title: 'Cartographier tes peurs',
          description: 'On ne combat bien que ce qu’on a nommé.',
          xp_reward: 350,
          stat_impacts: { emotion: 5, focus: 3 },
          tasks: [
            { title: 'Lister une peur précise à affronter', xp_reward: 30, frequency_days: 3 },
            { title: 'Décomposer une peur en petits pas', xp_reward: 35, frequency_days: 7 },
          ],
        },
        {
          title: 'S’exposer progressivement',
          description: 'La peur fond quand on s’en approche.',
          xp_reward: 500,
          stat_impacts: { discipline: 5, emotion: 5 },
          tasks: [
            { title: 'Faire un pas vers une peur identifiée', xp_reward: 50 },
            { title: 'Rester dans l’inconfort sans fuir 2 min', xp_reward: 30, frequency_days: 2 },
          ],
        },
        {
          title: 'Capitaliser sur le courage',
          description: 'Chaque peur vaincue nourrit la suivante.',
          xp_reward: 350,
          stat_impacts: { emotion: 4, discipline: 3 },
          tasks: [
            { title: 'Noter ce que tu as ressenti après l’exposition', xp_reward: 20 },
            { title: 'Bilan hebdo : peurs affrontées et gains', xp_reward: 55, frequency_days: 7 },
          ],
        },
      ],
    },

    {
      title: 'Trouver sa voie',
      description: '45 jours d’exploration pour clarifier ce qui te fait vibrer, ce dans quoi tu es bon, et la direction à prendre.',
      type: 'main',
      difficulty: 'medium',
      duration_days: 45,
      xp_reward: 1700,
      objectives: [
        {
          title: 'Explorer tes passions',
          description: 'Suivre les indices de ce qui t’anime.',
          xp_reward: 350,
          stat_impacts: { creativite: 4, emotion: 3 },
          tasks: [
            { title: 'Noter 1 moment où tu as perdu la notion du temps', xp_reward: 25 },
            { title: 'Tester une activité qui t’intrigue', xp_reward: 40, frequency_days: 7 },
          ],
        },
        {
          title: 'Identifier tes forces',
          description: 'Là où talent et plaisir se rencontrent.',
          xp_reward: 350,
          stat_impacts: { focus: 4, emotion: 2 },
          tasks: [
            { title: 'Demander à un proche ce dans quoi il te trouve bon', xp_reward: 40, frequency_days: 7 },
            { title: 'Noter une chose que tu fais mieux que la moyenne', xp_reward: 25, frequency_days: 3 },
          ],
        },
        {
          title: 'Tracer une direction',
          description: 'Pas un plan figé, mais un cap.',
          xp_reward: 350,
          stat_impacts: { focus: 4, discipline: 3 },
          tasks: [
            { title: 'Écrire la vie qui te ferait vibrer dans 5 ans', xp_reward: 50, frequency_days: 14 },
            { title: 'Définir 1 prochaine étape concrète', xp_reward: 40, frequency_days: 7 },
            { title: 'Bilan hebdo : qu’ai-je appris sur moi ?', xp_reward: 40, frequency_days: 7 },
          ],
        },
      ],
    },

    {
      title: 'Renaissance totale',
      description: 'Le grand œuvre : 90 jours pour reconstruire chaque pilier de ta vie en même temps. Corps, esprit, relations, sens. Pour ceux qui veulent tout changer.',
      type: 'main',
      difficulty: 'legendary',
      duration_days: 90,
      xp_reward: 5000,
      objectives: [
        {
          title: 'Le corps réveillé',
          description: 'Énergie, force, vitalité.',
          xp_reward: 1000,
          stat_impacts: { force: 5, cardio: 4, endurance: 4 },
          tasks: [
            { title: 'Activité physique du jour', xp_reward: 40 },
            { title: 'Alimentation propre', xp_reward: 30 },
            { title: '7-8h de sommeil', xp_reward: 25 },
          ],
        },
        {
          title: 'L’esprit affûté',
          description: 'Focus, apprentissage, discipline.',
          xp_reward: 1000,
          stat_impacts: { focus: 6, discipline: 5 },
          tasks: [
            { title: '1h de travail profond ou d’apprentissage', xp_reward: 50 },
            { title: 'Lecture 20 min', xp_reward: 25 },
            { title: 'Aucune distraction numérique inutile', xp_reward: 30 },
          ],
        },
        {
          title: 'Le cœur ouvert',
          description: 'Calme intérieur et relations vraies.',
          xp_reward: 900,
          stat_impacts: { calme: 5, emotion: 4, social: 3 },
          tasks: [
            { title: 'Méditation 15 min', xp_reward: 30 },
            { title: 'Geste de connexion avec un proche', xp_reward: 30 },
            { title: '3 gratitudes écrites', xp_reward: 20 },
          ],
        },
        {
          title: 'La vie alignée',
          description: 'Direction, sens, cohérence.',
          xp_reward: 800,
          stat_impacts: { discipline: 5, focus: 4 },
          tasks: [
            { title: 'Intention de la semaine', xp_reward: 50, frequency_days: 7 },
            { title: 'Revue hebdo : corps, esprit, cœur, sens', xp_reward: 70, frequency_days: 7 },
            { title: 'Revue mensuelle et grands ajustements', xp_reward: 150, frequency_days: 30 },
          ],
        },
      ],
    },
  ],

  meta: {
    'Devenir un chien de la casse': {
      themes: ['mind', 'emotions', 'discipline'],
      context: ['challenge'],
      summary: 'Briser toutes tes barrières intérieures. Pour ne plus jamais te laisser arrêter.',
    },
    'Devenir entrepreneur': {
      themes: ['finance', 'discipline', 'creative'],
      context: ['challenge', 'improve'],
      summary: 'De l’idée au premier client en 90 jours. Mentalité, exécution, vente.',
    },
    'La maîtrise du corps': {
      themes: ['body', 'discipline'],
      context: ['improve', 'challenge'],
      summary: 'Force, souplesse, énergie, récupération. Devenir le pilote de ton corps.',
    },
    'Devenir magnétique': {
      themes: ['social', 'emotions', 'mind'],
      context: ['improve'],
      summary: 'Présence, conversation, écoute. Un charisme authentique qui se remarque.',
    },
    'Forger un mental inébranlable': {
      themes: ['mind', 'discipline', 'emotions'],
      context: ['challenge'],
      summary: 'Affronter l’inconfort, gérer la pression, ne plus reculer.',
    },
    'Devenir un leader': {
      themes: ['social', 'discipline', 'mind'],
      context: ['improve', 'challenge'],
      summary: 'Décider, inspirer, assumer. Diriger une équipe ou ta propre vie.',
    },
    'L’âme d’artiste': {
      themes: ['creative', 'discipline'],
      context: ['improve', 'challenge'],
      summary: 'Réveiller le créateur en toi : produire, exposer, persévérer.',
    },
    'Renaître de ses cendres': {
      themes: ['emotions', 'mind', 'spirituality'],
      context: ['reset'],
      summary: 'Te reconstruire après une épreuve, un burnout ou une rupture. Pas à pas.',
    },
    'L’être de parole': {
      themes: ['discipline', 'mind', 'social'],
      context: ['improve'],
      summary: 'Faire ce que tu dis, dire ce que tu fais. Une parole qui vaut de l’or.',
    },
    'La grande transformation physique': {
      themes: ['body', 'discipline'],
      context: ['challenge'],
      summary: 'Entraînement structuré, nutrition stricte, suivi. Le vrai changement en 90 jours.',
    },
    'Maîtriser une langue étrangère': {
      themes: ['mind', 'discipline', 'social'],
      context: ['improve', 'challenge'],
      summary: 'Immersion structurée pour comprendre, parler et penser dans une langue.',
    },
    'Bâtir ta liberté financière': {
      themes: ['finance', 'discipline', 'mind'],
      context: ['improve', 'challenge'],
      summary: 'Revenus multiples, investissement, mentalité d’abondance.',
    },
    'La voie du stoïcien': {
      themes: ['spirituality', 'mind', 'emotions'],
      context: ['improve'],
      summary: 'Maîtriser ce qui dépend de toi, accepter le reste, agir avec vertu.',
    },
    'Vivre centenaire': {
      themes: ['body', 'spirituality', 'social'],
      context: ['improve'],
      summary: 'Le mode de vie de la longévité : alimentation, mouvement, sommeil, lien et sens.',
    },
    'Bâtir ton audience': {
      themes: ['creative', 'social', 'discipline'],
      context: ['challenge'],
      summary: 'Construire une présence en ligne authentique et une vraie communauté.',
    },
    'Vaincre toutes tes peurs': {
      themes: ['emotions', 'mind', 'discipline'],
      context: ['challenge', 'reset'],
      summary: 'Affronter méthodiquement ce qui te terrifie. Une peur à la fois.',
    },
    'Trouver sa voie': {
      themes: ['mind', 'emotions', 'creative'],
      context: ['reset', 'improve'],
      summary: 'Clarifier ce qui te fait vibrer, ce dans quoi tu es bon, et ta direction.',
    },
    'Renaissance totale': {
      themes: ['discipline', 'body', 'mind', 'spirituality'],
      context: ['challenge', 'reset'],
      summary: 'Reconstruire chaque pilier de ta vie en même temps. Pour qui veut tout changer.',
    },
  },
};
