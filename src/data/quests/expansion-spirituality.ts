import type { QuestModule } from './types';

export const SPIRITUALITY_QUESTS: QuestModule = {
  quests: [
    // 1. Devenir Wim Hof
    {
      title: 'Devenir Wim Hof',
      description:
        'Adopte le protocole Wim Hof : exercices de respiration rythmique et exposition progressive au froid pour renforcer ton système nerveux et atteindre un calme profond.',
      type: 'secondary',
      difficulty: 'hard',
      duration_days: 30,
      xp_reward: 540,
      objectives: [
        {
          title: 'Respiration Wim Hof quotidienne',
          description:
            'Effectue chaque matin 3 cycles de respiration Wim Hof (30 respirations + rétention) avant de te lever.',
          xp_reward: 270,
          stat_impacts: { calme: 3, focus: 2, endurance: 2, discipline: 2 },
          tasks: [
            {
              title: '3 cycles de respiration Wim Hof au réveil',
              xp_reward: 30,
            },
            {
              title: 'Douche froide de 2 minutes minimum',
              xp_reward: 40,
            },
            {
              title: 'Exposition au froid prolongée (bain froid ou plein air)',
              xp_reward: 50,
              frequency_days: 7,
              is_optional: true,
            },
          ],
        },
        {
          title: 'Progresser dans l\'exposition au froid',
          description:
            'Augmente progressivement la durée et l\'intensité de l\'exposition au froid chaque semaine.',
          xp_reward: 270,
          stat_impacts: { endurance: 3, calme: 2, discipline: 3 },
          tasks: [
            {
              title: 'Journaliser ta tolérance au froid et tes sensations',
              xp_reward: 20,
              frequency_days: 7,
            },
            {
              title: 'Terminer une séance complète sans interrompre la rétention',
              xp_reward: 50,
              frequency_days: 7,
            },
          ],
        },
      ],
    },

    // 2. Cohérence cardiaque matin et soir
    {
      title: 'Cohérence cardiaque matin et soir',
      description:
        'Pratique la cohérence cardiaque deux fois par jour — 5 minutes le matin et 5 minutes le soir — pour réguler ton système nerveux autonome et apaiser ton mental.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 320,
      objectives: [
        {
          title: 'Deux sessions de cohérence cardiaque par jour',
          description:
            'Inspire 5 secondes, expire 5 secondes pendant 5 minutes, deux fois par jour sans exception.',
          xp_reward: 320,
          stat_impacts: { calme: 4, emotion: 3, discipline: 2 },
          tasks: [
            {
              title: 'Session cohérence cardiaque le matin (5 min)',
              xp_reward: 25,
            },
            {
              title: 'Session cohérence cardiaque le soir (5 min)',
              xp_reward: 25,
            },
            {
              title: 'Mesurer ton niveau de stress avant et après (1 à 10)',
              xp_reward: 15,
              is_optional: true,
            },
          ],
        },
      ],
    },

    // 3. Méditation 20 minutes par jour
    {
      title: 'Méditation silencieuse 20 minutes',
      description:
        'Installe une pratique de méditation sérieuse : 20 minutes de méditation assise chaque jour, sans guidage audio, en observant simplement le souffle et les pensées.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 30,
      xp_reward: 480,
      objectives: [
        {
          title: '20 minutes de méditation assise chaque matin',
          description:
            'Médite en silence pendant 20 minutes sans guidage, en position assise stable. Observe les pensées sans t\'y accrocher.',
          xp_reward: 300,
          stat_impacts: { calme: 4, focus: 4, discipline: 3 },
          tasks: [
            {
              title: 'Méditation assise de 20 min sans interruption',
              xp_reward: 40,
            },
            {
              title: 'Installer un espace dédié à la méditation chez toi',
              xp_reward: 30,
              frequency_days: 30,
            },
          ],
        },
        {
          title: 'Ancrage en cours de journée',
          description:
            'Prends 3 micro-pauses de 1 minute en journée pour revenir à ta respiration.',
          xp_reward: 180,
          stat_impacts: { calme: 2, focus: 3, emotion: 2 },
          tasks: [
            {
              title: '3 micro-pauses de respiration consciente dans la journée',
              xp_reward: 20,
            },
            {
              title: 'Journaliser une observation issue de ta méditation',
              xp_reward: 20,
              frequency_days: 7,
              is_optional: true,
            },
          ],
        },
      ],
    },

    // 4. Marche méditative en pleine conscience
    {
      title: 'Marche méditative en pleine conscience',
      description:
        'Chaque jour, effectue une marche de 20 minutes sans téléphone, en portant toute ton attention sur tes sensations corporelles, les sons et l\'environnement autour de toi.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 300,
      objectives: [
        {
          title: 'Marche consciente quotidienne sans distractions',
          description:
            'Sors 20 minutes, téléphone rangé, et observe délibérément chaque pas, chaque sensation, chaque son.',
          xp_reward: 300,
          stat_impacts: { calme: 3, focus: 3, emotion: 2 },
          tasks: [
            {
              title: 'Marche de 20 min sans téléphone ni écouteurs',
              xp_reward: 30,
            },
            {
              title: 'Identifier 5 sons, 5 textures ou 5 couleurs pendant la marche',
              xp_reward: 20,
            },
            {
              title: 'Marche en forêt ou dans la nature (pas en ville)',
              xp_reward: 40,
              frequency_days: 7,
              is_optional: true,
            },
          ],
        },
      ],
    },

    // 5. Une heure de silence par jour
    {
      title: 'Une heure de silence absolu par jour',
      description:
        'Réserve chaque jour une heure de silence total — sans musique, sans podcast, sans écran, sans conversation — pour laisser ton esprit se reposer et se recentrer.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 14,
      xp_reward: 350,
      objectives: [
        {
          title: 'Bloc de silence d\'une heure chaque jour',
          description:
            'Détermine un créneau fixe et protège-le. Pas d\'exceptions, pas d\'excuses.',
          xp_reward: 350,
          stat_impacts: { calme: 5, focus: 3, discipline: 3, emotion: 2 },
          tasks: [
            {
              title: 'Heure de silence respectée (aucun son, aucun écran)',
              xp_reward: 50,
            },
            {
              title: 'Définir ton créneau de silence dans ton agenda',
              xp_reward: 20,
              frequency_days: 30,
            },
            {
              title: 'Écrire ce que le silence t\'a révélé ce jour',
              xp_reward: 20,
              frequency_days: 7,
              is_optional: true,
            },
          ],
        },
      ],
    },

    // 6. Le stoïcien — une maxime appliquée par jour
    {
      title: 'Le stoïcien — une maxime par jour',
      description:
        'Chaque matin, choisis une maxime stoïcienne (Épictète, Marc Aurèle, Sénèque) et applique-la consciemment dans ta journée. Le soir, évalue comment tu t\'en es sorti.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 30,
      xp_reward: 420,
      objectives: [
        {
          title: 'Sélectionner et appliquer une maxime stoïcienne chaque jour',
          description:
            'Le matin : lis une maxime et fixe une intention. Le soir : évalue ton comportement face à elle.',
          xp_reward: 250,
          stat_impacts: { discipline: 4, calme: 3, focus: 2, emotion: 2 },
          tasks: [
            {
              title: 'Lire et noter la maxime du jour le matin',
              xp_reward: 20,
            },
            {
              title: 'Évaluation du soir : ai-je été à la hauteur de la maxime ?',
              xp_reward: 30,
            },
          ],
        },
        {
          title: 'Lire un texte stoïcien chaque semaine',
          description:
            'Consacre du temps chaque semaine à la lecture d\'un passage des Pensées de Marc Aurèle, des Lettres de Sénèque ou du Manuel d\'Épictète.',
          xp_reward: 170,
          stat_impacts: { focus: 2, discipline: 2, calme: 2 },
          tasks: [
            {
              title: 'Lire un passage stoïcien (15 min minimum)',
              xp_reward: 40,
              frequency_days: 7,
            },
            {
              title: 'Souligner ou noter une phrase qui te touche',
              xp_reward: 20,
              frequency_days: 7,
            },
          ],
        },
      ],
    },

    // 7. Contempler la nature chaque jour
    {
      title: 'Contempler la nature chaque jour',
      description:
        'Observe la nature pendant au moins 10 minutes chaque jour — un lever de soleil, un arbre, le ciel, la pluie — sans but autre que la contemplation pure.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 260,
      objectives: [
        {
          title: '10 minutes de contemplation naturelle quotidienne',
          description:
            'Trouve un élément naturel et observe-le attentivement. Pas de téléphone, pas de pensées sur ta liste de tâches.',
          xp_reward: 260,
          stat_impacts: { calme: 4, emotion: 3, focus: 2 },
          tasks: [
            {
              title: '10 min de contemplation d\'un élément naturel',
              xp_reward: 30,
            },
            {
              title: 'Photographier ou dessiner ce que tu as contemplé',
              xp_reward: 15,
              is_optional: true,
            },
            {
              title: 'Sortir dans la nature pendant 1h (forêt, parc, bord de mer)',
              xp_reward: 40,
              frequency_days: 7,
              is_optional: true,
            },
          ],
        },
      ],
    },

    // 8. Body scan du soir
    {
      title: 'Body scan du soir',
      description:
        'Chaque soir avant de dormir, pratique un body scan de 15 minutes : parcours ton corps mentalement de la tête aux pieds pour relâcher chaque tension et t\'endormir pleinement.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 280,
      objectives: [
        {
          title: 'Body scan de 15 minutes chaque soir',
          description:
            'Allongé dans le noir, parcours lentement chaque partie de ton corps en relâchant consciemment chaque tension musculaire.',
          xp_reward: 280,
          stat_impacts: { calme: 4, emotion: 3, discipline: 2 },
          tasks: [
            {
              title: 'Body scan de 15 min avant de dormir',
              xp_reward: 35,
            },
            {
              title: 'Évaluer la qualité de ton sommeil le lendemain matin (1 à 10)',
              xp_reward: 15,
              frequency_days: 7,
              is_optional: true,
            },
          ],
        },
      ],
    },

    // 9. Lire un texte philosophique ou sacré
    {
      title: 'Lire un texte sacré ou philosophique chaque jour',
      description:
        'Consacre 20 minutes par jour à la lecture d\'un texte fondateur — Bible, Bhagavad-Gîtâ, Coran, Tao Te Ching, ou philosophes comme Pascal ou Spinoza — pour nourrir ton esprit en profondeur.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 30,
      xp_reward: 380,
      objectives: [
        {
          title: 'Lecture philosophique ou spirituelle quotidienne (20 min)',
          description:
            'Lis lentement, relis les passages importants. La compréhension prime sur la vitesse.',
          xp_reward: 230,
          stat_impacts: { focus: 3, emotion: 2, calme: 2, discipline: 2 },
          tasks: [
            {
              title: '20 min de lecture d\'un texte sacré ou philosophique',
              xp_reward: 30,
            },
            {
              title: 'Souligner ou noter un passage marquant',
              xp_reward: 20,
            },
          ],
        },
        {
          title: 'Réfléchir sur ce que tu lis chaque semaine',
          description:
            'Prends 15 minutes chaque semaine pour écrire comment le texte résonne avec ta vie.',
          xp_reward: 150,
          stat_impacts: { focus: 2, emotion: 3, calme: 2 },
          tasks: [
            {
              title: 'Écrire une réflexion hebdomadaire sur ta lecture',
              xp_reward: 40,
              frequency_days: 7,
            },
          ],
        },
      ],
    },

    // 10. Pratiquer la visualisation positive
    {
      title: 'Visualisation positive quotidienne',
      description:
        'Chaque matin, passe 10 minutes à visualiser précisément la version de toi que tu veux devenir et une journée idéale se déroulant parfaitement.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 14,
      xp_reward: 240,
      objectives: [
        {
          title: '10 minutes de visualisation positive au réveil',
          description:
            'Ferme les yeux, visualise ta journée idéale et ta meilleure version avec tous les détails sensoriels possibles.',
          xp_reward: 240,
          stat_impacts: { focus: 3, emotion: 3, discipline: 2, calme: 2 },
          tasks: [
            {
              title: 'Visualisation de 10 min au réveil (avant le téléphone)',
              xp_reward: 35,
            },
            {
              title: 'Écrire 3 lignes sur ce que tu as visualisé',
              xp_reward: 20,
            },
            {
              title: 'Créer un vision board numérique ou papier',
              xp_reward: 40,
              frequency_days: 30,
              is_optional: true,
            },
          ],
        },
      ],
    },

    // 11. Memento mori — méditer sur l’impermanence
    {
      title: 'Memento mori — méditer sur l\'impermanence',
      description:
        'Chaque jour, prends 10 minutes pour méditer sur l\'impermanence de la vie. Cette pratique ancestrale ancre dans le présent et libère des futilités.',
      type: 'secondary',
      difficulty: 'hard',
      duration_days: 21,
      xp_reward: 360,
      objectives: [
        {
          title: 'Méditation quotidienne sur l\'impermanence',
          description:
            'Assieds-toi et contemple : tout passe, tout est éphémère. Toi, tes problèmes, tes joies. Qu\'est-ce qui compte vraiment ?',
          xp_reward: 220,
          stat_impacts: { calme: 4, emotion: 4, focus: 2, discipline: 2 },
          tasks: [
            {
              title: '10 min de méditation sur l\'impermanence et la mort',
              xp_reward: 40,
            },
            {
              title: 'Écrire une chose que tu ferais différemment si c\'était ton dernier mois',
              xp_reward: 25,
              frequency_days: 7,
            },
          ],
        },
        {
          title: 'Poser un acte concret issu de cette prise de conscience',
          description:
            'Agis chaque semaine en lien avec ce qui compte vraiment — un appel à un proche, un projet remis, un pardon accordé.',
          xp_reward: 140,
          stat_impacts: { emotion: 3, discipline: 2, calme: 2 },
          tasks: [
            {
              title: 'Poser un acte concret inspiré par ta réflexion sur l\'impermanence',
              xp_reward: 50,
              frequency_days: 7,
            },
          ],
        },
      ],
    },

    // 12. Le détachement matériel
    {
      title: 'Le détachement matériel',
      description:
        'Pratique le non-attachement aux objets et aux possessions : chaque jour, examine ton rapport aux choses et entraîne-toi à te passer de superflu.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 21,
      xp_reward: 340,
      objectives: [
        {
          title: 'Donner ou jeter un objet inutile chaque jour',
          description:
            'Parcours tes affaires avec un regard détaché et libère ce qui ne sert plus. L\'objectif n\'est pas de posséder moins, mais de s\'attacher moins.',
          xp_reward: 200,
          stat_impacts: { calme: 3, discipline: 3, emotion: 2 },
          tasks: [
            {
              title: 'Identifier et mettre de côté au moins 1 objet à donner/jeter',
              xp_reward: 25,
            },
            {
              title: 'Passer une journée sans rien acheter ni commander',
              xp_reward: 30,
            },
          ],
        },
        {
          title: 'Méditation hebdomadaire sur le détachement',
          description:
            'Assieds-toi et demande-toi : de quoi aurais-je besoin si je perdais tout demain ? Qu\'est-ce qui resterait ?',
          xp_reward: 140,
          stat_impacts: { calme: 3, emotion: 2, focus: 2 },
          tasks: [
            {
              title: 'Méditation de 15 min sur le détachement et l\'essentiel',
              xp_reward: 45,
              frequency_days: 7,
            },
          ],
        },
      ],
    },

    // 13. Rituel d’intention / prière quotidienne
    {
      title: 'Rituel d\'intention quotidienne',
      description:
        'Crée et maintiens un rituel matinal d\'intention : une prière, une affirmation spirituelle ou une déclaration d\'intention prononcée à voix haute pour ancrer ta journée dans un sens.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 270,
      objectives: [
        {
          title: 'Rituel d\'intention chaque matin',
          description:
            'Prononce ton rituel à voix haute, debout, avant toute autre activité. Crée ta formule personnelle dès le premier jour.',
          xp_reward: 270,
          stat_impacts: { discipline: 3, calme: 3, focus: 2, emotion: 2 },
          tasks: [
            {
              title: 'Rédiger ton rituel d\'intention personnel',
              xp_reward: 30,
              frequency_days: 30,
            },
            {
              title: 'Prononcer ton rituel d\'intention à voix haute le matin',
              xp_reward: 25,
            },
            {
              title: 'Allumer une bougie ou un encens pendant le rituel',
              xp_reward: 10,
              is_optional: true,
            },
          ],
        },
      ],
    },

    // 14. Un repas par jour en pleine conscience
    {
      title: 'Un repas par jour en pleine conscience',
      description:
        'Choisis un repas par jour et mange-le en pleine conscience : sans écran, sans conversation, en savourant chaque bouchée et en remarquant les saveurs, textures et sensations.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 260,
      objectives: [
        {
          title: 'Un repas quotidien sans écran ni distraction',
          description:
            'Mange lentement, mâche 20 fois chaque bouchée, pose ta fourchette entre chaque. Aucun écran, aucun livre, aucun podcast.',
          xp_reward: 260,
          stat_impacts: { calme: 3, discipline: 3, emotion: 2 },
          tasks: [
            {
              title: 'Repas en pleine conscience (sans écran, assis, lentement)',
              xp_reward: 30,
            },
            {
              title: 'Identifier 3 saveurs ou textures nouvelles pendant le repas',
              xp_reward: 15,
            },
            {
              title: 'Cuisiner toi-même ce repas de pleine conscience',
              xp_reward: 20,
              frequency_days: 7,
              is_optional: true,
            },
          ],
        },
      ],
    },

    // 15. Journée de jeûne numérique hebdomadaire
    {
      title: 'Journée de jeûne numérique hebdomadaire',
      description:
        'Une fois par semaine, passe une journée entière sans réseaux sociaux, sans vidéos, sans scroll : uniquement le réel, les livres et les personnes devant toi.',
      type: 'secondary',
      difficulty: 'hard',
      duration_days: 30,
      xp_reward: 400,
      objectives: [
        {
          title: 'Journée sans réseaux sociaux ni vidéos chaque semaine',
          description:
            'Aucune application sociale, aucun streaming, aucun contenu de divertissement numérique pendant 24 heures.',
          xp_reward: 250,
          stat_impacts: { calme: 4, discipline: 4, focus: 3 },
          tasks: [
            {
              title: 'Journée complète sans réseaux sociaux ni streaming',
              xp_reward: 60,
              frequency_days: 7,
            },
            {
              title: 'Planifier à l\'avance 3 activités pour remplir cette journée',
              xp_reward: 20,
              frequency_days: 7,
            },
          ],
        },
        {
          title: 'Remplacer le numérique par une activité incarnée',
          description:
            'Utilise le temps récupéré pour des activités physiques, sociales ou créatives — rien de numérique.',
          xp_reward: 150,
          stat_impacts: { calme: 2, emotion: 2, creativite: 2, discipline: 2 },
          tasks: [
            {
              title: 'Passer au moins 2h dans la nature ce jour-là',
              xp_reward: 40,
              frequency_days: 7,
            },
            {
              title: 'Écrire un bilan de ta journée déconnectée le soir',
              xp_reward: 25,
              frequency_days: 7,
            },
          ],
        },
      ],
    },

    // 16. Respiration 4-7-8 avant de dormir
    {
      title: 'Respiration 4-7-8 avant de dormir',
      description:
        'Chaque soir avant d\'éteindre la lumière, pratique 8 cycles de respiration 4-7-8 (inspirer 4s, retenir 7s, expirer 8s) pour activer ton système nerveux parasympathique et t\'endormir rapidement.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 14,
      xp_reward: 220,
      objectives: [
        {
          title: '8 cycles de respiration 4-7-8 chaque soir',
          description:
            'Au lit, lumières éteintes : inspire 4 secondes par le nez, retiens 7 secondes, expire 8 secondes par la bouche. Répète 8 fois.',
          xp_reward: 220,
          stat_impacts: { calme: 4, emotion: 3, discipline: 2 },
          tasks: [
            {
              title: '8 cycles de respiration 4-7-8 avant de dormir',
              xp_reward: 30,
            },
            {
              title: 'Évaluer ton temps d\'endormissement chaque matin (en minutes)',
              xp_reward: 15,
              is_optional: true,
            },
          ],
        },
      ],
    },
  ],

  meta: {
    'Devenir Wim Hof': {
      themes: ['spirituality', 'body', 'discipline'],
      context: ['challenge', 'improve'],
      summary: 'Maîtrise ton souffle et ton rapport au froid grâce au protocole Wim Hof pour atteindre un calme et une endurance hors du commun.',
    },
    'Cohérence cardiaque matin et soir': {
      themes: ['spirituality', 'mind', 'emotions'],
      context: ['reset', 'improve'],
      summary: 'Régule ton système nerveux en 5 minutes matin et soir grâce à la cohérence cardiaque.',
    },
    'Méditation silencieuse 20 minutes': {
      themes: ['spirituality', 'mind', 'focus'],
      context: ['improve', 'challenge'],
      summary: 'Installe une méditation profonde de 20 minutes par jour pour développer un calme intérieur durable et un focus exceptionnel.',
    },
    'Marche méditative en pleine conscience': {
      themes: ['spirituality', 'mind', 'body'],
      context: ['reset', 'improve'],
      summary: 'Transforme ta marche quotidienne en pratique de pleine conscience pour ancrer ton esprit dans le présent.',
    },
    'Une heure de silence absolu par jour': {
      themes: ['spirituality', 'mind', 'detox'],
      context: ['reset', 'challenge'],
      summary: 'Protège chaque jour une heure de silence total pour laisser ton esprit se reposer et se recentrer dans un monde saturé de bruit.',
    },
    'Le stoïcien — une maxime par jour': {
      themes: ['spirituality', 'mind', 'discipline'],
      context: ['improve', 'challenge'],
      summary: 'Applique chaque jour une maxime stoïcienne pour forger ton caractère et trouver la sérénité dans l\'adversité.',
    },
    'Contempler la nature chaque jour': {
      themes: ['spirituality', 'mind', 'emotions'],
      context: ['reset', 'improve'],
      summary: 'Reconnecte-toi à l\'essentiel en observant la nature chaque jour avec une attention pure et sans but.',
    },
    'Body scan du soir': {
      themes: ['spirituality', 'mind', 'emotions'],
      context: ['reset', 'improve'],
      summary: 'Relâche chaque tension avant de dormir grâce à un body scan de 15 minutes pour un sommeil profond et réparateur.',
    },
    'Lire un texte sacré ou philosophique chaque jour': {
      themes: ['spirituality', 'mind', 'focus'],
      context: ['improve', 'challenge'],
      summary: 'Nourris ton esprit en profondeur en lisant chaque jour un texte fondateur — sacré ou philosophique — pour élargir ta vision du monde.',
    },
    'Visualisation positive quotidienne': {
      themes: ['spirituality', 'mind', 'focus'],
      context: ['improve', 'reset'],
      summary: 'Programme ton subconscient chaque matin en visualisant précisément ta meilleure version et ta journée idéale.',
    },
    'Memento mori — méditer sur l\'impermanence': {
      themes: ['spirituality', 'mind', 'emotions'],
      context: ['reset', 'challenge'],
      summary: 'Médite chaque jour sur l\'impermanence pour te libérer des futilités et agir en accord avec ce qui compte vraiment.',
    },
    'Le détachement matériel': {
      themes: ['spirituality', 'minimalism', 'mind'],
      context: ['reset', 'improve'],
      summary: 'Entraîne-toi à ne pas t\'attacher aux objets et aux possessions pour trouver la liberté dans la légèreté.',
    },
    'Rituel d\'intention quotidienne': {
      themes: ['spirituality', 'mind', 'discipline'],
      context: ['improve', 'reset'],
      summary: 'Crée un rituel d\'intention personnel prononcé chaque matin pour ancrer ta journée dans un sens profond.',
    },
    'Un repas par jour en pleine conscience': {
      themes: ['spirituality', 'mind', 'body'],
      context: ['reset', 'improve'],
      summary: 'Transforme un repas quotidien en pratique de pleine conscience pour nourrir ton corps et apaiser ton esprit.',
    },
    'Journée de jeûne numérique hebdomadaire': {
      themes: ['spirituality', 'detox', 'discipline'],
      context: ['reset', 'challenge'],
      summary: 'Libère-toi une fois par semaine du flux numérique pour retrouver le réel, la profondeur et le silence.',
    },
    'Respiration 4-7-8 avant de dormir': {
      themes: ['spirituality', 'mind', 'emotions'],
      context: ['reset', 'improve'],
      summary: 'Endors-toi plus vite et plus profondément grâce à 8 cycles de respiration 4-7-8 pratiqués chaque soir.',
    },
  },
};
