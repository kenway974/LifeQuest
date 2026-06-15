import type { QuestModule } from './types';

export const LIFE_QUESTS: QuestModule = {
  quests: [
    // ─── DÉTOX / HABITUDES NÉFASTES ───────────────────────────────────────────

    {
      title: 'Détox dopamine — weekend sans stimulation',
      description:
        'Deux semaines pour te sevrer des stimulations artificielles : téléphone, écrans, sucre, bruit constant. Redécouvre l’ennui, la lenteur et ta capacité naturelle à te concentrer.',
      type: 'secondary',
      difficulty: 'hard',
      duration_days: 14,
      xp_reward: 550,
      objectives: [
        {
          title: 'Supprimer les stimulations numériques et alimentaires',
          description:
            'Pendant 14 jours, supprime les réseaux sociaux, la télévision, le sucre raffiné et les contenus passifs. Remplace-les par la lecture, la marche et la conversation.',
          xp_reward: 300,
          stat_impacts: { discipline: 4, calme: 3, focus: 3 },
          tasks: [
            { title: 'Passer une journée sans écran récréatif', xp_reward: 30 },
            { title: 'Sortir marcher 30 min sans téléphone', xp_reward: 20 },
            {
              title: 'Tenir un journal de ses envies de stimulation',
              xp_reward: 15,
            },
          ],
        },
        {
          title: 'Un weekend complet en mode basse stimulation',
          description:
            'Choisir un weekend et vivre 48 h sans internet, sans musique de fond et sans divertissement actif. Observer ce qui émerge.',
          xp_reward: 250,
          stat_impacts: { calme: 4, discipline: 3, focus: 2 },
          tasks: [
            {
              title: 'Planifier et préparer son weekend détox',
              xp_reward: 15,
              frequency_days: 365,
            },
            {
              title: 'Tenir le weekend sans retomber dans les stimulations',
              xp_reward: 50,
              frequency_days: 365,
            },
            {
              title: 'Écrire un bilan de l’expérience',
              xp_reward: 20,
              frequency_days: 365,
            },
          ],
        },
      ],
    },

    {
      title: 'NoFap — 30 jours sans pornographie',
      description:
        'Couper complètement avec le porno pendant 30 jours pour restaurer ta sensibilité dopaminergique, ta motivation et ta confiance en toi.',
      type: 'secondary',
      difficulty: 'expert',
      duration_days: 30,
      xp_reward: 700,
      objectives: [
        {
          title: 'Maintenir l’abstinence totale chaque jour',
          description:
            'Chaque jour sans rechute est une victoire. Utilise des techniques de redirection mentale, de l’exercice physique et un suivi quotidien pour tenir.',
          xp_reward: 500,
          stat_impacts: { discipline: 5, focus: 4, calme: 2 },
          tasks: [
            {
              title: 'Cocher sa journée sans rechute',
              xp_reward: 20,
            },
            {
              title: 'Faire 10 min d’exercice physique en cas d’envie',
              xp_reward: 15,
            },
            {
              title: 'Lire un témoignage de motivation (NoFap/forum)',
              xp_reward: 10,
              is_optional: true,
            },
          ],
        },
        {
          title: 'Remplacer l’habitude par une activité positive',
          description:
            'Identifier les déclencheurs et les remplacer systématiquement par une habitude constructive.',
          xp_reward: 200,
          stat_impacts: { discipline: 3, focus: 2 },
          tasks: [
            {
              title: 'Lister ses 3 principaux déclencheurs',
              xp_reward: 20,
              frequency_days: 365,
            },
            {
              title: 'Pratiquer une activité de remplacement lors d’une envie',
              xp_reward: 25,
            },
          ],
        },
      ],
    },

    {
      title: '30 jours sans jeux vidéo',
      description:
        'Un mois entier sans lancer de jeu vidéo. L’objectif est de mesurer l’emprise que cette habitude a sur ton temps et ton énergie, puis d’investir ces heures ailleurs.',
      type: 'secondary',
      difficulty: 'hard',
      duration_days: 30,
      xp_reward: 620,
      objectives: [
        {
          title: 'Tenir 30 jours sans session de jeu',
          description:
            'Pas un seul jeu vidéo, y compris mobile, pendant 30 jours. Cocher chaque journée tenue.',
          xp_reward: 400,
          stat_impacts: { discipline: 5, focus: 3, calme: 2 },
          tasks: [
            { title: 'Journée sans jeu vidéo validée', xp_reward: 15 },
            {
              title: 'Faire quelque chose de créatif ou physique à la place',
              xp_reward: 15,
            },
          ],
        },
        {
          title: 'Réinvestir le temps libéré',
          description:
            'Chaque semaine, identifier combien d’heures ont été libérées et les consacrer à un projet personnel.',
          xp_reward: 220,
          stat_impacts: { discipline: 3, focus: 2, creativite: 2 },
          tasks: [
            {
              title: 'Calculer les heures récupérées dans la semaine',
              xp_reward: 20,
              frequency_days: 7,
            },
            {
              title: 'Avancer sur un projet personnel avec ces heures',
              xp_reward: 30,
              frequency_days: 7,
            },
          ],
        },
      ],
    },

    {
      title: 'Arrêter de fumer — 30 jours sans cigarette',
      description:
        'Trente jours pour briser la dépendance à la cigarette, gérer les envies et bâtir une identité de non-fumeur durable.',
      type: 'secondary',
      difficulty: 'expert',
      duration_days: 30,
      xp_reward: 750,
      objectives: [
        {
          title: 'Zéro cigarette chaque jour',
          description:
            'Ne pas fumer une seule cigarette, même en situation sociale. Utiliser des techniques de respiration et des stratégies de substitution pour passer les envies.',
          xp_reward: 500,
          stat_impacts: { discipline: 5, calme: 3, endurance: 3 },
          tasks: [
            { title: 'Journée sans tabac validée', xp_reward: 20 },
            {
              title: 'Pratiquer 3 respirations profondes lors d’une envie',
              xp_reward: 10,
            },
            {
              title: 'Appeler ou écrire à un proche de soutien lors d’une crise',
              xp_reward: 15,
              is_optional: true,
            },
          ],
        },
        {
          title: 'Documenter les bénéfices ressentis',
          description:
            'Chaque semaine, noter les améliorations physiques : souffle, odorat, énergie, argent économisé.',
          xp_reward: 250,
          stat_impacts: { discipline: 2, calme: 2 },
          tasks: [
            {
              title: 'Écrire son bilan hebdomadaire de bénéfices',
              xp_reward: 40,
              frequency_days: 7,
            },
            {
              title: 'Calculer l’argent économisé depuis l’arrêt',
              xp_reward: 20,
              frequency_days: 7,
            },
          ],
        },
      ],
    },

    {
      title: 'Stop au shopping impulsif — 21 jours',
      description:
        'Trois semaines sans aucun achat non planifié. Reprends le contrôle de tes dépenses émotionnelles et de ton rapport à la possession.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 21,
      xp_reward: 480,
      objectives: [
        {
          title: 'Aucun achat impulsif pendant 21 jours',
          description:
            'Avant chaque achat, attendre 48 h et se demander si le besoin est réel. Tenir un journal de toutes les envies d’achats.',
          xp_reward: 350,
          stat_impacts: { discipline: 4, calme: 3, focus: 2 },
          tasks: [
            { title: 'Journée sans achat impulsif validée', xp_reward: 15 },
            {
              title: 'Inscrire dans son journal une envie d’achat refusée',
              xp_reward: 10,
            },
            {
              title: 'Appliquer la règle des 48 h pour un achat potentiel',
              xp_reward: 20,
            },
          ],
        },
        {
          title: 'Identifier ses déclencheurs d’achat émotionnel',
          description:
            'Analyser à quels moments et dans quels états émotionnels les envies d’achats surviennent.',
          xp_reward: 130,
          stat_impacts: { calme: 2, discipline: 2 },
          tasks: [
            {
              title: 'Lister ses 3 situations déclencheuses d’achat',
              xp_reward: 30,
              frequency_days: 365,
            },
            {
              title: 'Écrire une stratégie de remplacement pour chaque déclencheur',
              xp_reward: 30,
              frequency_days: 365,
            },
          ],
        },
      ],
    },

    {
      title: 'Réduire son temps d’écran de moitié',
      description:
        'En 21 jours, divise par deux ton temps quotidien sur écran récréatif. Installe les limites, mesure les résultats, reconquiers du temps pour toi.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 21,
      xp_reward: 460,
      objectives: [
        {
          title: 'Mesurer et couper la moitié du temps d’écran',
          description:
            'Utilise l’application de suivi de ton téléphone pour connaître ton temps de départ, puis configure des limites pour atteindre la moitié.',
          xp_reward: 320,
          stat_impacts: { discipline: 4, focus: 3, calme: 2 },
          tasks: [
            {
              title: 'Relever son temps d’écran quotidien',
              xp_reward: 10,
            },
            {
              title: 'Respecter la limite fixée aujourd’hui',
              xp_reward: 20,
            },
            {
              title: 'Faire une activité hors écran en fin de journée',
              xp_reward: 15,
            },
          ],
        },
        {
          title: 'Créer des zones et plages sans écran',
          description:
            'Définir des moments de la journée (repas, réveil, coucher) où l’écran est interdit.',
          xp_reward: 140,
          stat_impacts: { discipline: 3, calme: 2 },
          tasks: [
            {
              title: 'Tenir une plage de 2 h sans écran dans la journée',
              xp_reward: 25,
            },
            {
              title: 'Repas pris sans téléphone posé sur la table',
              xp_reward: 15,
            },
          ],
        },
      ],
    },

    {
      title: 'Zéro fast-food — 30 jours',
      description:
        'Un mois sans fast-food ni plats ultra-transformés. Apprends à manger proprement même quand tu manques de temps, et redécouvre le goût du fait-maison.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 30,
      xp_reward: 520,
      objectives: [
        {
          title: 'Aucun repas fast-food ou ultra-transformé',
          description:
            'Pas de fast-food, pas de plats industriels réchauffés, pas de kebab/pizza livrée. Cuisiner ou choisir du frais à chaque repas.',
          xp_reward: 370,
          stat_impacts: { discipline: 4, calme: 2, endurance: 2 },
          tasks: [
            { title: 'Journée sans fast-food validée', xp_reward: 15 },
            {
              title: 'Préparer son repas du lendemain la veille',
              xp_reward: 20,
            },
            {
              title: 'Planifier ses repas de la semaine le dimanche',
              xp_reward: 25,
              frequency_days: 7,
            },
          ],
        },
        {
          title: 'Découvrir des alternatives rapides et saines',
          description:
            'Constituer un répertoire de 5 recettes faciles et rapides à cuisiner en moins de 20 minutes.',
          xp_reward: 150,
          stat_impacts: { discipline: 2, creativite: 2 },
          tasks: [
            {
              title: 'Tester une nouvelle recette rapide cette semaine',
              xp_reward: 30,
              frequency_days: 7,
            },
            {
              title: 'Ajouter la recette à son répertoire personnel',
              xp_reward: 15,
              frequency_days: 7,
            },
          ],
        },
      ],
    },

    {
      title: 'Couper les notifications — 14 jours de silence',
      description:
        'Désactive toutes les notifications non essentielles pendant deux semaines. Reprends la main sur ton attention et arrête de réagir en permanence aux sollicitations extérieures.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 14,
      xp_reward: 360,
      objectives: [
        {
          title: 'Désactiver toutes les notifications non urgentes',
          description:
            'Couper les notifications des réseaux sociaux, des applications de news, de shopping et de jeux. Ne garder que les appels et SMS.',
          xp_reward: 220,
          stat_impacts: { focus: 4, calme: 3, discipline: 2 },
          tasks: [
            {
              title: 'Auditer et désactiver les notifications parasites',
              xp_reward: 30,
              frequency_days: 365,
            },
            {
              title: 'Consulter ses messages à des heures fixes uniquement',
              xp_reward: 20,
            },
            {
              title: 'Journée sans interruption numérique involontaire',
              xp_reward: 15,
            },
          ],
        },
        {
          title: 'Mesurer l’impact sur sa concentration',
          description:
            'Chaque soir, noter son niveau de concentration perçu sur 10 et les moments où l’absence de notifications a été bénéfique.',
          xp_reward: 140,
          stat_impacts: { focus: 3, calme: 2 },
          tasks: [
            {
              title: 'Remplir son journal de concentration du soir',
              xp_reward: 15,
            },
            {
              title: 'Identifier une tâche accomplie sans interruption',
              xp_reward: 20,
            },
          ],
        },
      ],
    },

    // ─── MINIMALISME / ENVIRONNEMENT ──────────────────────────────────────────

    {
      title: 'Désencombrer une zone par jour',
      description:
        'Trente jours pour passer ton espace en revue, zone par zone. Chaque jour, un tiroir, une étagère, un coin à vider. À la fin, ton espace respire.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 30,
      xp_reward: 500,
      objectives: [
        {
          title: 'Désencombrer une zone chaque jour',
          description:
            'Choisir une petite zone (tiroir, étagère, placard, boîte) et la vider complètement. Trier en trois piles : garder, donner, jeter.',
          xp_reward: 350,
          stat_impacts: { calme: 4, discipline: 3 },
          tasks: [
            {
              title: 'Désencombrer la zone du jour',
              xp_reward: 15,
            },
            {
              title: 'Sortir immédiatement les objets à donner ou jeter',
              xp_reward: 10,
            },
            {
              title: 'Photographier la zone avant/après',
              xp_reward: 10,
              is_optional: true,
            },
          ],
        },
        {
          title: 'Organiser les dons et la logistique',
          description:
            'Regrouper les objets à donner et les déposer en association ou en brocante avant la fin du mois.',
          xp_reward: 150,
          stat_impacts: { calme: 2, discipline: 2 },
          tasks: [
            {
              title: 'Déposer un sac de dons cette semaine',
              xp_reward: 40,
              frequency_days: 7,
            },
          ],
        },
      ],
    },

    {
      title: 'Le défi des 30 objets — un objet par jour',
      description:
        'Chaque jour pendant 30 jours, retire un objet de ta vie : donne-le, vends-le ou jette-le. Au bout d’un mois, tu auras libéré 30 objets inutiles.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 30,
      xp_reward: 400,
      objectives: [
        {
          title: 'Un objet sorti de chez soi chaque jour',
          description:
            'Chaque matin, identifier un objet que tu n’utilises pas depuis 6 mois ou plus, et décider de son sort : don, vente, poubelle.',
          xp_reward: 280,
          stat_impacts: { calme: 3, discipline: 3 },
          tasks: [
            {
              title: 'Identifier et retirer l’objet du jour',
              xp_reward: 15,
            },
            {
              title: 'Consigner l’objet dans son journal minimaliste',
              xp_reward: 10,
              is_optional: true,
            },
          ],
        },
        {
          title: 'Clôturer avec un bilan et une règle d’achat',
          description:
            'À la fin du défi, dresser un bilan et écrire une règle personnelle pour éviter l’accumulation future.',
          xp_reward: 120,
          stat_impacts: { calme: 2, discipline: 2 },
          tasks: [
            {
              title: 'Écrire son bilan de 30 jours et sa nouvelle règle d’achat',
              xp_reward: 60,
              frequency_days: 365,
            },
          ],
        },
      ],
    },

    {
      title: 'La garde-robe capsule',
      description:
        'En 14 jours, ramène ta garde-robe à l’essentiel : une collection restreinte de vêtements que tu adores et qui se combinent tous. Fini le "j’ai rien à me mettre".',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 14,
      xp_reward: 420,
      objectives: [
        {
          title: 'Trier et réduire sa garde-robe',
          description:
            'Sortir tous ses vêtements, tester chaque pièce selon le critère "est-ce que je l’adorerais si je l’achetais aujourd’hui ?", et conserver maximum 40 pièces.',
          xp_reward: 250,
          stat_impacts: { calme: 4, discipline: 3 },
          tasks: [
            {
              title: 'Vider entièrement son placard et tout étaler',
              xp_reward: 20,
              frequency_days: 365,
            },
            {
              title: 'Trier chaque vêtement en garder/donner/jeter',
              xp_reward: 30,
              frequency_days: 365,
            },
            {
              title: 'Emballer les vêtements à donner et les sortir de chez soi',
              xp_reward: 20,
              frequency_days: 365,
            },
          ],
        },
        {
          title: 'Créer ses tenues capsule et s’y tenir',
          description:
            'Planifier ses tenues de la semaine à l’avance et s’habiller uniquement avec les pièces conservées.',
          xp_reward: 170,
          stat_impacts: { calme: 2, discipline: 2 },
          tasks: [
            {
              title: 'Planifier ses tenues de la semaine',
              xp_reward: 25,
              frequency_days: 7,
            },
            {
              title: 'Journée habillée uniquement avec sa capsule',
              xp_reward: 15,
            },
          ],
        },
      ],
    },

    {
      title: 'Vers le zéro déchet — 21 jours de transition',
      description:
        'Adopter les gestes zéro déchet un par un pendant 21 jours. Pas besoin d’être parfait : chaque geste compte et s’inscrit dans la durée.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 21,
      xp_reward: 460,
      objectives: [
        {
          title: 'Intégrer un geste zéro déchet par jour',
          description:
            'Chaque jour, adopter ou consolider un geste : sac réutilisable, gourde, vrac, compost, shampoing solide, etc.',
          xp_reward: 300,
          stat_impacts: { discipline: 3, calme: 3 },
          tasks: [
            {
              title: 'Pratiquer le geste zéro déchet du jour',
              xp_reward: 15,
            },
            {
              title: 'Analyser ses déchets de la semaine et identifier une réduction possible',
              xp_reward: 30,
              frequency_days: 7,
            },
          ],
        },
        {
          title: 'Mesurer sa progression sur les poubelles',
          description:
            'Comparer le volume de déchets produit en début et en fin de défi pour quantifier l’impact réel.',
          xp_reward: 160,
          stat_impacts: { calme: 2, discipline: 2 },
          tasks: [
            {
              title: 'Peser ou estimer le volume de ses poubelles en début de défi',
              xp_reward: 25,
              frequency_days: 365,
            },
            {
              title: 'Peser ou estimer le volume de ses poubelles en fin de défi',
              xp_reward: 25,
              frequency_days: 365,
            },
            {
              title: 'Écrire son bilan de réduction des déchets',
              xp_reward: 40,
              frequency_days: 365,
            },
          ],
        },
      ],
    },

    {
      title: 'Réparer au lieu de jeter — 30 jours',
      description:
        'Pendant un mois, résiste à l’impulsion de remplacer ce qui est cassé. Apprends à réparer vêtements, électronique, meubles et objets du quotidien.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 30,
      xp_reward: 510,
      objectives: [
        {
          title: 'Réparer au moins un objet par semaine',
          description:
            'Identifier les objets cassés ou abîmés à la maison et les réparer soi-même, ou les apporter en repair café.',
          xp_reward: 330,
          stat_impacts: { discipline: 3, calme: 2, creativite: 3 },
          tasks: [
            {
              title: 'Lister les objets à réparer chez soi',
              xp_reward: 20,
              frequency_days: 365,
            },
            {
              title: 'Réparer ou faire réparer un objet cette semaine',
              xp_reward: 50,
              frequency_days: 7,
            },
            {
              title: 'Regarder un tutoriel de réparation pour un objet spécifique',
              xp_reward: 15,
              is_optional: true,
            },
          ],
        },
        {
          title: 'Faire le bilan de ses économies et de son impact',
          description:
            'Calculer ce que la réparation t’a évité de dépenser et ce que tu n’as pas jeté.',
          xp_reward: 180,
          stat_impacts: { discipline: 2, calme: 2 },
          tasks: [
            {
              title: 'Calculer les économies réalisées grâce à la réparation',
              xp_reward: 40,
              frequency_days: 365,
            },
            {
              title: 'Écrire ce que cette habitude change dans son rapport aux objets',
              xp_reward: 40,
              frequency_days: 365,
            },
          ],
        },
      ],
    },

    {
      title: 'Désencombrement numérique — emails & fichiers',
      description:
        'En 14 jours, remets de l’ordre dans ton monde numérique : boîte mail, fichiers, photos, applications, onglets ouverts. Un espace digital propre libère l’esprit.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 14,
      xp_reward: 370,
      objectives: [
        {
          title: 'Vider et organiser sa boîte mail',
          description:
            'Atteindre l’inbox zéro en archivant, supprimant et désabonnant. Puis créer un système de dossiers simple.',
          xp_reward: 200,
          stat_impacts: { focus: 3, calme: 3, discipline: 2 },
          tasks: [
            {
              title: 'Supprimer ou archiver tous les mails de plus de 3 mois',
              xp_reward: 30,
              frequency_days: 365,
            },
            {
              title: 'Se désabonner de 10 newsletters non lues',
              xp_reward: 20,
              frequency_days: 365,
            },
            {
              title: 'Atteindre l’inbox zéro',
              xp_reward: 40,
              frequency_days: 365,
            },
          ],
        },
        {
          title: 'Nettoyer et structurer ses fichiers et photos',
          description:
            'Trier les téléchargements, supprimer les doublons de photos, organiser ses documents en dossiers clairs.',
          xp_reward: 170,
          stat_impacts: { focus: 3, calme: 2 },
          tasks: [
            {
              title: 'Vider le dossier Téléchargements',
              xp_reward: 20,
              frequency_days: 365,
            },
            {
              title: 'Supprimer les doublons et mauvaises photos de son téléphone',
              xp_reward: 25,
              frequency_days: 365,
            },
            {
              title: 'Désinstaller les applications non utilisées depuis 3 mois',
              xp_reward: 20,
              frequency_days: 365,
            },
          ],
        },
      ],
    },

    // ─── AVENTURE / COMPÉTENCES DE VIE ────────────────────────────────────────

    {
      title: 'Une nouveauté par semaine — sortir de sa zone',
      description:
        'Pendant 30 jours, essaie quelque chose de nouveau chaque semaine : une activité inconnue, un endroit inexploré, une rencontre imprévue. Élargis ton périmètre.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 30,
      xp_reward: 500,
      objectives: [
        {
          title: 'Vivre une nouvelle expérience chaque semaine',
          description:
            'Chaque semaine, planifier et réaliser une expérience que tu n’as jamais faite. Petite ou grande, l’important c’est d’être sorti de ta routine.',
          xp_reward: 350,
          stat_impacts: { creativite: 3, social: 3, endurance: 2 },
          tasks: [
            {
              title: 'Planifier sa nouvelle expérience de la semaine',
              xp_reward: 20,
              frequency_days: 7,
            },
            {
              title: 'Réaliser l’expérience choisie',
              xp_reward: 50,
              frequency_days: 7,
            },
            {
              title: 'Écrire 3 phrases sur ce que cette expérience t’a apporté',
              xp_reward: 20,
              frequency_days: 7,
            },
          ],
        },
        {
          title: 'Dresser une liste d’expériences à tester',
          description:
            'En début de mois, lister 10 expériences nouvelles possibles pour s’engager concrètement.',
          xp_reward: 150,
          stat_impacts: { creativite: 2, discipline: 2 },
          tasks: [
            {
              title: 'Écrire sa liste de 10 nouvelles expériences',
              xp_reward: 30,
              frequency_days: 365,
            },
            {
              title: 'Partager cette liste avec quelqu’un pour s’engager',
              xp_reward: 20,
              frequency_days: 365,
              is_optional: true,
            },
          ],
        },
      ],
    },

    {
      title: 'Microaventures — explorer sa région',
      description:
        'En 30 jours, pars à la découverte de ta région : un lieu inconnu, une balade inédite, une nuit dehors. L’aventure commence à ta porte.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 30,
      xp_reward: 530,
      objectives: [
        {
          title: 'Réaliser au moins deux microaventures dans le mois',
          description:
            'Une microaventure peut être une nuit en bivouac, une journée dans un village inconnu, une balade à vélo vers nulle part. Deux minimum sur le mois.',
          xp_reward: 350,
          stat_impacts: { endurance: 4, creativite: 3, calme: 2 },
          tasks: [
            {
              title: 'Identifier et planifier sa première microaventure',
              xp_reward: 20,
              frequency_days: 365,
            },
            {
              title: 'Réaliser une microaventure dans la région',
              xp_reward: 80,
              frequency_days: 14,
            },
            {
              title: 'Prendre des photos ou tenir un journal de l’aventure',
              xp_reward: 15,
              frequency_days: 14,
              is_optional: true,
            },
          ],
        },
        {
          title: 'Créer une carte de sa région explorée',
          description:
            'Tenir une carte (physique ou numérique) et y épingler chaque lieu visité pendant le mois.',
          xp_reward: 180,
          stat_impacts: { creativite: 2, social: 2 },
          tasks: [
            {
              title: 'Créer sa carte de la région',
              xp_reward: 25,
              frequency_days: 365,
            },
            {
              title: 'Ajouter un lieu découvert sur sa carte',
              xp_reward: 20,
              frequency_days: 7,
            },
          ],
        },
      ],
    },

    {
      title: 'La randonnée du week-end',
      description:
        'Chaque weekend pendant 30 jours, chausse tes boots et pars randonner. Que ce soit 5 km ou 25 km, l’engagement est de sortir dehors chaque semaine.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 30,
      xp_reward: 540,
      objectives: [
        {
          title: 'Randonner chaque weekend du mois',
          description:
            'Planifier et réaliser une randonnée chaque samedi ou dimanche. Varier les itinéraires pour découvrir de nouveaux paysages.',
          xp_reward: 380,
          stat_impacts: { endurance: 5, calme: 3, discipline: 2 },
          tasks: [
            {
              title: 'Choisir et préparer sa randonnée de la semaine',
              xp_reward: 20,
              frequency_days: 7,
            },
            {
              title: 'Réaliser la randonnée prévue',
              xp_reward: 60,
              frequency_days: 7,
            },
            {
              title: 'Inviter quelqu’un à randonner avec soi',
              xp_reward: 20,
              frequency_days: 7,
              is_optional: true,
            },
          ],
        },
        {
          title: 'Monter en distance ou en dénivelé',
          description:
            'Chaque semaine, essayer d’augmenter légèrement la difficulté de la randonnée : distance, durée ou dénivelé.',
          xp_reward: 160,
          stat_impacts: { endurance: 3, discipline: 2 },
          tasks: [
            {
              title: 'Comparer sa randonnée de cette semaine à celle de la précédente',
              xp_reward: 20,
              frequency_days: 7,
            },
            {
              title: 'Noter ses performances dans un carnet de randonnée',
              xp_reward: 15,
              frequency_days: 7,
            },
          ],
        },
      ],
    },

    {
      title: 'Cocher un rêve de sa bucket list',
      description:
        'Choisis un rêve concret de ta liste de vie et accomplis-le en 30 jours. Pas de report, pas d’excuse : planifie, prépare et fais-le.',
      type: 'secondary',
      difficulty: 'hard',
      duration_days: 30,
      xp_reward: 650,
      objectives: [
        {
          title: 'Choisir, planifier et réaliser son rêve',
          description:
            'Identifier un item réalisable de ta bucket list (saut en parachute, concert à l’étranger, traversée à vélo…), le planifier en détail et l’accomplir avant la fin du mois.',
          xp_reward: 450,
          stat_impacts: { endurance: 3, creativite: 3, social: 2, discipline: 3 },
          tasks: [
            {
              title: 'Choisir son rêve de bucket list et l’écrire',
              xp_reward: 20,
              frequency_days: 365,
            },
            {
              title: 'Dresser la liste des étapes concrètes pour le réaliser',
              xp_reward: 30,
              frequency_days: 365,
            },
            {
              title: 'Accomplir l’expérience',
              xp_reward: 100,
              frequency_days: 365,
            },
          ],
        },
        {
          title: 'Documenter et partager l’expérience',
          description:
            'Écrire un récit ou créer un souvenir durable de cette expérience et la partager avec ses proches.',
          xp_reward: 200,
          stat_impacts: { social: 3, creativite: 2 },
          tasks: [
            {
              title: 'Écrire un récit détaillé de l’expérience',
              xp_reward: 50,
              frequency_days: 365,
            },
            {
              title: 'Partager cette expérience avec au moins une personne',
              xp_reward: 30,
              frequency_days: 365,
            },
            {
              title: 'Mettre à jour sa bucket list avec un nouvel item',
              xp_reward: 20,
              frequency_days: 365,
              is_optional: true,
            },
          ],
        },
      ],
    },

    {
      title: 'Apprendre les gestes de premiers secours',
      description:
        'En 14 jours, maîtrise les gestes qui sauvent : RCP, position latérale de sécurité, gestion des hémorragies. Des compétences de vie essentielles que tout adulte devrait posséder.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 14,
      xp_reward: 400,
      objectives: [
        {
          title: 'Apprendre et pratiquer les gestes de premiers secours',
          description:
            'Suivre une formation PSC1 ou PSE1 et s’entraîner sur mannequin. En parallèle, réviser les gestes clés chaque jour.',
          xp_reward: 280,
          stat_impacts: { discipline: 3, social: 3, endurance: 2 },
          tasks: [
            {
              title: 'S’inscrire à une formation premiers secours (PSC1 ou équivalent)',
              xp_reward: 30,
              frequency_days: 365,
            },
            {
              title: 'Visionner et réviser un geste de secours',
              xp_reward: 15,
            },
            {
              title: 'Pratiquer la RCP sur mannequin ou coussin',
              xp_reward: 25,
              frequency_days: 365,
            },
          ],
        },
        {
          title: 'Valider ses connaissances et équiper son domicile',
          description:
            'Passer son examen PSC1 et assembler une trousse de premiers secours complète chez soi.',
          xp_reward: 120,
          stat_impacts: { discipline: 2, social: 2 },
          tasks: [
            {
              title: 'Réussir la formation ou passer le quiz de validation',
              xp_reward: 50,
              frequency_days: 365,
            },
            {
              title: 'Constituer une trousse de secours complète à la maison',
              xp_reward: 30,
              frequency_days: 365,
            },
          ],
        },
      ],
    },

    {
      title: 'Maîtriser 10 plats de base',
      description:
        'En 30 jours, cuisine 10 plats fondamentaux que tout adulte devrait savoir faire : œufs brouillés, pâtes maison, poulet rôti, soupe, vinaigrette… Deviens autonome en cuisine.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 30,
      xp_reward: 450,
      objectives: [
        {
          title: 'Cuisiner un plat de base tous les 3 jours',
          description:
            'Choisir 10 recettes de base, les cuisiner une par une et les réussir sans regarder la recette à la fin.',
          xp_reward: 300,
          stat_impacts: { discipline: 3, creativite: 3, endurance: 2 },
          tasks: [
            {
              title: 'Cuisiner le plat de base de la séquence',
              xp_reward: 30,
              frequency_days: 3,
            },
            {
              title: 'Evaluer son résultat et noter les points d’amélioration',
              xp_reward: 15,
              frequency_days: 3,
            },
          ],
        },
        {
          title: 'Refaire chaque plat de mémoire',
          description:
            'À la fin du mois, refaire les 10 plats sans recette pour valider l’acquisition.',
          xp_reward: 150,
          stat_impacts: { discipline: 2, creativite: 2 },
          tasks: [
            {
              title: 'Refaire un plat de mémoire sans consulter la recette',
              xp_reward: 30,
              frequency_days: 3,
            },
          ],
        },
      ],
    },

    {
      title: 'Faire pousser quelque chose — initiation au jardinage',
      description:
        'Plant-le, arrose-le, regarde-le pousser. En 30 jours, cultive une plante, un légume ou une herbe aromatique depuis la graine jusqu’à la récolte ou la floraison.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 30,
      xp_reward: 380,
      objectives: [
        {
          title: 'Planter et entretenir sa culture chaque jour',
          description:
            'Choisir ce qu’on plante (basilic, radis, tomates…), préparer le sol ou le pot, semer et prendre soin de la plante quotidiennement.',
          xp_reward: 260,
          stat_impacts: { calme: 4, discipline: 3 },
          tasks: [
            {
              title: 'Choisir sa plante ou graine et préparer le pot ou le carré',
              xp_reward: 20,
              frequency_days: 365,
            },
            {
              title: 'Arroser et observer sa plante aujourd’hui',
              xp_reward: 10,
            },
            {
              title: 'Prendre une photo de l’évolution hebdomadaire',
              xp_reward: 10,
              frequency_days: 7,
              is_optional: true,
            },
          ],
        },
        {
          title: 'Documenter la croissance et récolter',
          description:
            'Tenir un journal de croissance et récolter (ou noter la floraison) en fin de mois.',
          xp_reward: 120,
          stat_impacts: { calme: 2, creativite: 2 },
          tasks: [
            {
              title: 'Écrire une entrée dans son journal de jardin cette semaine',
              xp_reward: 15,
              frequency_days: 7,
            },
            {
              title: 'Récolter sa première production ou documenter la floraison',
              xp_reward: 40,
              frequency_days: 365,
            },
          ],
        },
      ],
    },

    {
      title: 'S’initier au bricolage — réparer & construire',
      description:
        'En 21 jours, acquiers les bases du bricolage : réparer une fuite, monter un meuble, accrocher correctement, peindre un mur. Arrête de dépendre de tout le monde.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 21,
      xp_reward: 490,
      objectives: [
        {
          title: 'Réaliser trois projets de bricolage concrets',
          description:
            'Sur 21 jours, accomplir au moins trois tâches de bricolage différentes : une réparation, une installation et une création ou montage.',
          xp_reward: 330,
          stat_impacts: { discipline: 3, creativite: 4, endurance: 2 },
          tasks: [
            {
              title: 'Identifier trois projets de bricolage à réaliser chez soi',
              xp_reward: 20,
              frequency_days: 365,
            },
            {
              title: 'Se procurer les outils et fournitures nécessaires',
              xp_reward: 20,
              frequency_days: 365,
            },
            {
              title: 'Réaliser un projet de bricolage cette semaine',
              xp_reward: 60,
              frequency_days: 7,
            },
          ],
        },
        {
          title: 'Constituer sa boîte à outils de base',
          description:
            'Assembler une boîte à outils complète et fonctionnelle pour être autonome pour les petits travaux.',
          xp_reward: 160,
          stat_impacts: { discipline: 2, creativite: 2 },
          tasks: [
            {
              title: 'Lister les outils essentiels à posséder',
              xp_reward: 20,
              frequency_days: 365,
            },
            {
              title: 'Acheter ou récupérer les outils manquants',
              xp_reward: 30,
              frequency_days: 365,
            },
            {
              title: 'Ranger et organiser sa boîte à outils',
              xp_reward: 20,
              frequency_days: 365,
            },
          ],
        },
      ],
    },
  ],

  meta: {
    'Détox dopamine — weekend sans stimulation': {
      themes: ['detox', 'mind', 'discipline'],
      context: ['reset', 'challenge'],
      summary:
        'Deux semaines pour couper les stimulations artificielles et retrouver ta capacité naturelle à te concentrer.',
    },
    'NoFap — 30 jours sans pornographie': {
      themes: ['detox', 'discipline', 'mind'],
      context: ['reset', 'challenge'],
      summary:
        'Trente jours d’abstinence totale pour restaurer ta motivation, ta sensibilité et ta confiance en toi.',
    },
    '30 jours sans jeux vidéo': {
      themes: ['detox', 'discipline', 'focus'],
      context: ['reset', 'improve'],
      summary:
        'Un mois sans jeux vidéo pour mesurer leur emprise sur ta vie et réinvestir ces heures dans des projets qui comptent.',
    },
    'Arrêter de fumer — 30 jours sans cigarette': {
      themes: ['detox', 'discipline', 'body'],
      context: ['reset', 'challenge'],
      summary:
        'Trente jours pour briser la dépendance au tabac et bâtir une identité de non-fumeur durable.',
    },
    'Stop au shopping impulsif — 21 jours': {
      themes: ['detox', 'discipline', 'finance'],
      context: ['reset', 'improve'],
      summary:
        'Vingt et un jours sans achat impulsif pour reprendre le contrôle de tes dépenses émotionnelles.',
    },
    'Réduire son temps d’écran de moitié': {
      themes: ['detox', 'focus', 'discipline'],
      context: ['improve', 'reset'],
      summary:
        'En 21 jours, divise par deux ton temps d’écran récréatif et reconquiers des heures pour ce qui te tient vraiment à cœur.',
    },
    'Zéro fast-food — 30 jours': {
      themes: ['detox', 'discipline', 'body'],
      context: ['improve', 'challenge'],
      summary:
        'Un mois sans fast-food pour retrouver le goût du fait-maison et nourrir ton corps correctement.',
    },
    'Couper les notifications — 14 jours de silence': {
      themes: ['detox', 'focus', 'mind'],
      context: ['reset', 'improve'],
      summary:
        'Quatorze jours sans notifications parasites pour arrêter de vivre en mode réactif et retrouver le fil de ta pensée.',
    },
    'Désencombrer une zone par jour': {
      themes: ['minimalism', 'discipline'],
      context: ['reset', 'improve'],
      summary:
        'Trente jours pour passer ton espace en revue zone par zone et laisser ton environnement respirer enfin.',
    },
    'Le défi des 30 objets — un objet par jour': {
      themes: ['minimalism', 'discipline'],
      context: ['reset', 'challenge'],
      summary:
        'Un objet sorti de ta vie chaque jour pendant 30 jours — simple, concret, et libérateur.',
    },
    'La garde-robe capsule': {
      themes: ['minimalism', 'discipline'],
      context: ['reset', 'improve'],
      summary:
        'Réduis ta garde-robe à l’essentiel en 14 jours et ne plus jamais te dire que tu n’as rien à te mettre.',
    },
    'Vers le zéro déchet — 21 jours de transition': {
      themes: ['minimalism', 'discipline'],
      context: ['improve', 'challenge'],
      summary:
        'Adopte les gestes zéro déchet un par un sur 21 jours pour réduire ton impact et simplifier ta consommation.',
    },
    'Réparer au lieu de jeter — 30 jours': {
      themes: ['minimalism', 'discipline', 'creative'],
      context: ['improve', 'challenge'],
      summary:
        'Un mois pour apprendre à réparer ce qui est cassé, économiser de l’argent et changer ton rapport aux objets.',
    },
    'Désencombrement numérique — emails & fichiers': {
      themes: ['minimalism', 'focus', 'discipline'],
      context: ['reset', 'improve'],
      summary:
        'Quatorze jours pour vider ta boîte mail, organiser tes fichiers et libérer ton espace mental numérique.',
    },
    'Une nouveauté par semaine — sortir de sa zone': {
      themes: ['creative', 'social', 'discipline'],
      context: ['improve', 'challenge'],
      summary:
        'Chaque semaine pendant 30 jours, vis une expérience que tu n’as jamais faite et élargis ton périmètre de vie.',
    },
    'Microaventures — explorer sa région': {
      themes: ['body', 'creative', 'social'],
      context: ['improve', 'challenge'],
      summary:
        'Pars à la découverte de ta région avec de vraies microaventures — l’aventure commence à ta porte.',
    },
    'La randonnée du week-end': {
      themes: ['body', 'discipline', 'mind'],
      context: ['improve', 'challenge'],
      summary:
        'Chaque weekend pendant 30 jours, chausse tes boots et pars randonner pour te reconnecter à la nature et à ton corps.',
    },
    'Cocher un rêve de sa bucket list': {
      themes: ['creative', 'social', 'discipline'],
      context: ['challenge', 'improve'],
      summary:
        'Choisis un rêve concret de ta liste de vie et réalise-le en 30 jours — pas de report, pas d’excuse.',
    },
    'Apprendre les gestes de premiers secours': {
      themes: ['body', 'social', 'discipline'],
      context: ['improve', 'challenge'],
      summary:
        'En 14 jours, maîtrise les gestes qui sauvent et deviens quelqu’un sur qui les autres peuvent compter.',
    },
    'Maîtriser 10 plats de base': {
      themes: ['creative', 'discipline', 'body'],
      context: ['improve', 'challenge'],
      summary:
        'En 30 jours, cuisine 10 plats fondamentaux et deviens autonome en cuisine pour de bon.',
    },
    'Faire pousser quelque chose — initiation au jardinage': {
      themes: ['creative', 'mind', 'discipline'],
      context: ['improve', 'challenge'],
      summary:
        'Plante, arrose, observe : en 30 jours, vis l’expérience de cultiver quelque chose de la graine à la récolte.',
    },
    'S’initier au bricolage — réparer & construire': {
      themes: ['creative', 'discipline', 'body'],
      context: ['improve', 'challenge'],
      summary:
        'En 21 jours, acquiers les bases du bricolage et arrête de dépendre des autres pour les petits travaux du quotidien.',
    },
  },
};
