import type { QuestModule } from './types';

export const DISCIPLINE_QUESTS: QuestModule = {
  quests: [
    // 1. Devenir un lève-tôt — 5h chaque matin
    {
      title: 'Devenir un lève-tôt — 5h chaque matin',
      description:
        'Repousse l’heure de ton réveil jusqu’à 5h du matin et tiens-la pendant 30 jours consécutifs. Ce défi restructure ton horloge biologique et te donne deux heures de silence absolu avant que le monde ne s’éveille.',
      type: 'secondary',
      difficulty: 'hard',
      duration_days: 30,
      xp_reward: 600,
      objectives: [
        {
          title: 'Se lever à 5h pendant 30 jours',
          description:
            'Pose ton réveil à 5h00 et sors du lit immédiatement sans retourner te coucher. Documente chaque lever réussi.',
          xp_reward: 350,
          stat_impacts: { discipline: 5, focus: 3, endurance: 2 },
          tasks: [
            {
              title: 'Poser son réveil à 5h et se lever dès la première sonnerie',
              xp_reward: 10,
              frequency_days: 1,
            },
            {
              title: 'Aller au lit avant 22h30 pour garantir 6h de sommeil',
              xp_reward: 10,
              frequency_days: 1,
            },
            {
              title: 'Noter l’heure de lever réelle dans un carnet ou une app',
              xp_reward: 10,
              frequency_days: 1,
            },
          ],
        },
        {
          title: 'Utiliser les matins gagnés',
          description:
            'Ces heures tôt ne doivent pas être gâchées : emploie-les pour une activité à haute valeur (lecture, sport, méditation, projet personnel).',
          xp_reward: 250,
          stat_impacts: { discipline: 3, focus: 4 },
          tasks: [
            {
              title: 'Pratiquer une activité intentionnelle entre 5h et 7h',
              xp_reward: 20,
              frequency_days: 1,
            },
            {
              title: 'Préparer la veille ce que tu feras le lendemain matin',
              xp_reward: 15,
              frequency_days: 1,
            },
          ],
        },
      ],
    },

    // 2. Routine matinale en 5 étapes
    {
      title: 'Routine matinale en 5 étapes',
      description:
        'Construit une routine du matin structurée en 5 piliers enchaînés dans le bon ordre. Après 30 jours, ce bloc de démarrage devient automatique et booste ton énergie pour toute la journée.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 30,
      xp_reward: 500,
      objectives: [
        {
          title: 'Exécuter les 5 étapes chaque matin',
          description:
            'Chaque matin : hydratation, mouvement, lecture/apprentissage, plan du jour, petit-déjeuner sans écran. Respecte l’ordre et la durée minimale de chaque étape.',
          xp_reward: 300,
          stat_impacts: { discipline: 4, focus: 3, calme: 2 },
          tasks: [
            {
              title: 'Boire un grand verre d’eau dès le lever (étape 1)',
              xp_reward: 10,
              frequency_days: 1,
            },
            {
              title: 'Faire 10 minutes de mouvement : yoga, gainage ou marche (étape 2)',
              xp_reward: 15,
              frequency_days: 1,
            },
            {
              title: 'Lire ou écouter quelque chose d’utile pendant 10 minutes (étape 3)',
              xp_reward: 10,
              frequency_days: 1,
            },
            {
              title: 'Écrire les 3 priorités de la journée (étape 4)',
              xp_reward: 10,
              frequency_days: 1,
            },
            {
              title: 'Petit-déjeuner sans téléphone ni écran (étape 5)',
              xp_reward: 10,
              frequency_days: 1,
            },
          ],
        },
        {
          title: 'Tenir un journal de progression',
          description:
            'Chaque semaine, évalue ton niveau d’énergie et ta productivité pour mesurer l’impact de la routine.',
          xp_reward: 200,
          stat_impacts: { discipline: 2, focus: 2 },
          tasks: [
            {
              title: 'Remplir un bilan hebdomadaire (énergie, humeur, productivité)',
              xp_reward: 30,
              frequency_days: 7,
            },
          ],
        },
      ],
    },

    // 3. Routine du soir apaisante
    {
      title: 'Routine du soir apaisante',
      description:
        'Instaure un protocole de fin de journée qui prépare ton cerveau au sommeil : coupure des écrans, bilan, préparation du lendemain. Vingt et un jours pour ancrer cette habitude réparatrice.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 350,
      objectives: [
        {
          title: 'Appliquer la routine du soir chaque soir',
          description:
            'À partir de 21h30 : arrêt des écrans, bilan de la journée en 3 points, préparation des affaires du lendemain, lecture papier ou relaxation.',
          xp_reward: 350,
          stat_impacts: { discipline: 3, calme: 4, emotion: 2 },
          tasks: [
            {
              title: 'Éteindre tous les écrans à 21h30 au plus tard',
              xp_reward: 15,
              frequency_days: 1,
            },
            {
              title: 'Écrire 3 choses accomplies et 1 chose à améliorer (bilan du jour)',
              xp_reward: 15,
              frequency_days: 1,
            },
            {
              title: 'Préparer les affaires et la tenue du lendemain',
              xp_reward: 10,
              frequency_days: 1,
            },
            {
              title: 'Lire un livre papier ou pratiquer la respiration calme pendant 15 min',
              xp_reward: 15,
              frequency_days: 1,
            },
          ],
        },
      ],
    },

    // 4. Faire son lit chaque matin
    {
      title: 'Faire son lit chaque matin sans exception',
      description:
        'La plus petite victoire de la journée : faire son lit dès le lever, chaque matin pendant 21 jours. Ce micro-rituel enclenche une dynamique d’ordre et d’autodiscipline pour le reste de la journée.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 250,
      objectives: [
        {
          title: 'Faire son lit chaque matin dans les 10 minutes après le lever',
          description:
            'Sans exception, avant de toucher à ton téléphone ou de prendre ton café, fais ton lit correctement — oreillers replacés, couverture lissée.',
          xp_reward: 250,
          stat_impacts: { discipline: 4, focus: 2 },
          tasks: [
            {
              title: 'Faire son lit dans les 10 premières minutes après le lever',
              xp_reward: 10,
              frequency_days: 1,
            },
            {
              title: 'Prendre une photo du lit fait pour ancrer la victoire',
              xp_reward: 10,
              frequency_days: 1,
              is_optional: true,
            },
          ],
        },
      ],
    },

    // 5. Zéro snooze
    {
      title: 'Zéro snooze — lever du premier coup',
      description:
        'Supprime le bouton snooze de ta vie pendant 21 jours. Un seul réveil, une seule chance : tu te lèves. Ce défi renforce la volonté dès les premières secondes de la journée.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 21,
      xp_reward: 350,
      objectives: [
        {
          title: 'Se lever à la première sonnerie pendant 21 jours',
          description:
            'Pose ton réveil à l’heure souhaitée. Quand il sonne, tu te lèves — aucun report, aucune deuxième alarme. En cas d’échec, la série recommence à zéro.',
          xp_reward: 350,
          stat_impacts: { discipline: 5, focus: 2, endurance: 1 },
          tasks: [
            {
              title: 'Désactiver la fonction snooze sur son réveil ou son téléphone',
              xp_reward: 20,
              frequency_days: 365,
            },
            {
              title: 'Se lever immédiatement à la première sonnerie sans reporter',
              xp_reward: 15,
              frequency_days: 1,
            },
            {
              title: 'Poser son téléphone hors de portée du lit la veille au soir',
              xp_reward: 10,
              frequency_days: 1,
            },
          ],
        },
      ],
    },

    // 6. Manger la grenouille — tâche la plus dure en premier
    {
      title: 'Manger la grenouille — la tâche difficile en premier',
      description:
        'Chaque matin, identifie la tâche la plus dure ou la plus redoutée de ta liste, et accomplis-la avant tout le reste. 21 jours pour faire de cette stratégie une seconde nature.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 21,
      xp_reward: 400,
      objectives: [
        {
          title: 'Identifier et exécuter la grenouille chaque jour',
          description:
            'La veille ou le matin, désigne la tâche que tu as le plus envie d’éviter. C’est ta grenouille. Accomplis-la en premier, avant les emails, les réseaux, les tâches faciles.',
          xp_reward: 400,
          stat_impacts: { discipline: 5, focus: 4, emotion: 2 },
          tasks: [
            {
              title: 'Identifier la grenouille du lendemain la veille au soir',
              xp_reward: 10,
              frequency_days: 1,
            },
            {
              title: 'Accomplir la grenouille avant 10h sans vérifier les messages',
              xp_reward: 30,
              frequency_days: 1,
            },
            {
              title: 'Noter ce que tu as ressenti après avoir mangé la grenouille',
              xp_reward: 15,
              frequency_days: 1,
              is_optional: true,
            },
          ],
        },
      ],
    },

    // 7. Deux heures de deep work par jour
    {
      title: 'Deux heures de deep work quotidien',
      description:
        'Bloque chaque jour deux heures de travail profond ininterrompu — téléphone en mode avion, notifications coupées, environnement fermé. 21 jours pour en faire un réflexe de performance.',
      type: 'secondary',
      difficulty: 'hard',
      duration_days: 21,
      xp_reward: 550,
      objectives: [
        {
          title: 'Effectuer 2 heures de deep work chaque jour',
          description:
            'Réserve un créneau fixe (idéalement le matin) pour un travail cognitif intensif sur une seule tâche complexe. Aucune interruption tolérée.',
          xp_reward: 350,
          stat_impacts: { focus: 6, discipline: 4 },
          tasks: [
            {
              title: 'Définir le créneau de deep work et le bloquer dans l’agenda',
              xp_reward: 20,
              frequency_days: 365,
            },
            {
              title: 'Activer le mode avion et couper toutes les notifications pendant le créneau',
              xp_reward: 15,
              frequency_days: 1,
            },
            {
              title: 'Travailler 2h sans interruption sur la tâche désignée',
              xp_reward: 40,
              frequency_days: 1,
            },
          ],
        },
        {
          title: 'Protéger l’environnement de travail',
          description:
            'Aménage ton espace pour minimiser les distractions et entrer en concentration maximale.',
          xp_reward: 200,
          stat_impacts: { focus: 3, discipline: 2 },
          tasks: [
            {
              title: 'Préparer l’espace de travail (bureau rangé, eau, casque) avant le créneau',
              xp_reward: 10,
              frequency_days: 1,
            },
            {
              title: 'Faire un bilan hebdomadaire : combien d’heures de vrai deep work cette semaine ?',
              xp_reward: 30,
              frequency_days: 7,
            },
          ],
        },
      ],
    },

    // 8. La technique Pomodoro
    {
      title: 'Maîtriser la technique Pomodoro',
      description:
        'Adopte le cycle Pomodoro classique — 25 minutes de travail, 5 minutes de pause — pendant 21 jours. Apprends à respecter les intervalles et à mesurer ta productivité en tomates.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 350,
      objectives: [
        {
          title: 'Compléter au moins 4 Pomodoros par jour de travail',
          description:
            'Utilise un minuteur (app ou physique). 25 min de travail strict, puis 5 min de vraie coupure. Après 4 cycles, prends une pause longue de 20-30 minutes.',
          xp_reward: 350,
          stat_impacts: { focus: 5, discipline: 3 },
          tasks: [
            {
              title: 'Configurer un minuteur Pomodoro (app Focusmate, Forest ou minuteur physique)',
              xp_reward: 20,
              frequency_days: 365,
            },
            {
              title: 'Compléter 4 Pomodoros de 25 min sur les tâches prioritaires',
              xp_reward: 30,
              frequency_days: 1,
            },
            {
              title: 'Respecter les pauses de 5 minutes sans toucher au travail',
              xp_reward: 10,
              frequency_days: 1,
            },
            {
              title: 'Compter et noter le nombre de Pomodoros complétés dans la journée',
              xp_reward: 10,
              frequency_days: 1,
              is_optional: true,
            },
          ],
        },
      ],
    },

    // 9. Inbox zero
    {
      title: 'Inbox Zéro — boîte mail vide chaque soir',
      description:
        'Atteins l’inbox zéro chaque soir pendant 14 jours : chaque email lu est traité, archivé, délégué ou supprimé le jour même. Fin du chaos mental causé par une boîte qui déborde.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 14,
      xp_reward: 350,
      objectives: [
        {
          title: 'Vider et traiter sa boîte mail chaque jour',
          description:
            'Deux sessions mail par jour maximum. Chaque email reçoit une action immédiate : répondre (< 2 min), déléguer, planifier ou supprimer. La boîte de réception doit être vide en fin de journée.',
          xp_reward: 250,
          stat_impacts: { discipline: 4, focus: 3 },
          tasks: [
            {
              title: 'Traiter tous les emails en attente pour atteindre l’inbox zéro (session d’initialisation)',
              xp_reward: 40,
              frequency_days: 365,
            },
            {
              title: 'Traiter tous les emails entrants en deux sessions (matin et après-midi)',
              xp_reward: 25,
              frequency_days: 1,
            },
            {
              title: 'Se désabonner de 3 newsletters inutiles',
              xp_reward: 15,
              frequency_days: 7,
              is_optional: true,
            },
          ],
        },
        {
          title: 'Mettre en place un système de classement durable',
          description:
            'Structure des dossiers ou des étiquettes pour que l’inbox reste propre après la quête.',
          xp_reward: 100,
          stat_impacts: { discipline: 2, focus: 2 },
          tasks: [
            {
              title: 'Créer un système de dossiers / étiquettes et l’appliquer à tous les emails',
              xp_reward: 30,
              frequency_days: 365,
            },
          ],
        },
      ],
    },

    // 10. Planifier sa journée chaque matin
    {
      title: 'Planifier sa journée chaque matin en 10 minutes',
      description:
        'Chaque matin, avant de commencer à travailler, prends 10 minutes pour planifier ta journée : priorités, créneaux, énergie disponible. 21 jours pour ne plus jamais subir ta journée.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 300,
      objectives: [
        {
          title: 'Rédiger son plan journalier chaque matin',
          description:
            'Avant d’ouvrir les emails ou les réseaux sociaux, identifie tes 3 priorités absolues, estime leur durée et assigne-les à un créneau. Écris-les sur papier ou dans ton outil de gestion des tâches.',
          xp_reward: 300,
          stat_impacts: { discipline: 4, focus: 4 },
          tasks: [
            {
              title: 'Lister les 3 tâches prioritaires de la journée par ordre d’importance',
              xp_reward: 15,
              frequency_days: 1,
            },
            {
              title: 'Estimer la durée de chaque tâche et la placer dans un créneau',
              xp_reward: 15,
              frequency_days: 1,
            },
            {
              title: 'Cocher les tâches accomplies en fin de journée et reporter ce qui reste',
              xp_reward: 15,
              frequency_days: 1,
            },
          ],
        },
      ],
    },

    // 11. La revue hebdomadaire
    {
      title: 'La revue hebdomadaire — bilan et plan chaque dimanche',
      description:
        'Chaque dimanche, réserve 45 minutes pour faire le bilan de la semaine écoulée et planifier la semaine suivante. 30 jours (4 revues) pour en faire un pilier de ton organisation.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 30,
      xp_reward: 450,
      objectives: [
        {
          title: 'Effectuer 4 revues hebdomadaires complètes',
          description:
            'La revue comprend : bilan des objectifs de la semaine passée, traitement de tous les inboxes (notes, emails, tâches en vrac), planification des priorités de la semaine à venir.',
          xp_reward: 300,
          stat_impacts: { discipline: 4, focus: 3 },
          tasks: [
            {
              title: 'Faire le bilan de la semaine : objectifs atteints ou non, apprentissages',
              xp_reward: 30,
              frequency_days: 7,
            },
            {
              title: 'Traiter et vider toutes les inboxes (notes, tâches en vrac, emails)',
              xp_reward: 25,
              frequency_days: 7,
            },
            {
              title: 'Définir les 3 priorités majeures de la semaine à venir',
              xp_reward: 30,
              frequency_days: 7,
            },
          ],
        },
        {
          title: 'Affiner le système sur la durée',
          description:
            'Après 4 revues, améliore ton template et identifie ce qui fonctionne vraiment pour toi.',
          xp_reward: 150,
          stat_impacts: { discipline: 2, focus: 2 },
          tasks: [
            {
              title: 'Créer ou adapter un template de revue hebdomadaire personnalisé',
              xp_reward: 40,
              frequency_days: 365,
            },
            {
              title: 'Bloquer le créneau de revue dans l’agenda de façon récurrente',
              xp_reward: 20,
              frequency_days: 365,
            },
          ],
        },
      ],
    },

    // 12. Ranger 15 minutes par jour
    {
      title: 'Ranger 15 minutes par jour — espace clair, esprit clair',
      description:
        'Passe 15 minutes chaque jour à ranger, trier ou désencombrer un espace de ta maison ou de ton bureau. Après 21 jours, ton environnement sera transformé et ton cerveau respirera mieux.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 300,
      objectives: [
        {
          title: 'Ranger ou désencombrer 15 minutes chaque jour',
          description:
            'Fixe un minuteur à 15 minutes. Commence par un seul tiroir, un seul coin, une seule zone. Ne t’arrête pas avant la fin, mais arrête-toi à 15 minutes pour ne pas te décourager.',
          xp_reward: 300,
          stat_impacts: { discipline: 3, calme: 3, focus: 2 },
          tasks: [
            {
              title: 'Activer un minuteur et ranger sans interruption pendant 15 minutes',
              xp_reward: 15,
              frequency_days: 1,
            },
            {
              title: 'Désigner la zone à ranger avant de commencer (ne pas improviser)',
              xp_reward: 10,
              frequency_days: 1,
            },
            {
              title: 'Sortir un sac de choses à donner ou jeter chaque semaine',
              xp_reward: 25,
              frequency_days: 7,
              is_optional: true,
            },
          ],
        },
      ],
    },

    // 13. Zéro procrastination
    {
      title: 'Zéro procrastination — agir sans délai',
      description:
        'Pendant 21 jours, tu t’engages à ne jamais repousser une tâche que tu peux commencer maintenant. Identifie les déclencheurs de ta procrastination et coupe-les à la racine.',
      type: 'secondary',
      difficulty: 'hard',
      duration_days: 21,
      xp_reward: 500,
      objectives: [
        {
          title: 'Détecter et désamorcer la procrastination en temps réel',
          description:
            'Dès que tu prends conscience que tu procrastines (tu ouvres les réseaux, tu retardes un démarrage), note la tâche, l’heure et la raison. Puis commence la tâche dans les 2 minutes.',
          xp_reward: 300,
          stat_impacts: { discipline: 5, focus: 4, emotion: 2 },
          tasks: [
            {
              title: 'Tenir un journal de procrastination : noter chaque épisode (tâche, raison, durée)',
              xp_reward: 15,
              frequency_days: 1,
            },
            {
              title: 'Appliquer la règle : commencer toute tâche dans les 2 minutes suivant la décision',
              xp_reward: 20,
              frequency_days: 1,
            },
            {
              title: 'Identifier les 3 principaux déclencheurs de procrastination en fin de semaine',
              xp_reward: 30,
              frequency_days: 7,
            },
          ],
        },
        {
          title: 'Construire une résistance mentale durable',
          description:
            'Comprendre ses résistances pour les anticiper et les neutraliser avant qu’elles ne s’installent.',
          xp_reward: 200,
          stat_impacts: { discipline: 3, emotion: 2 },
          tasks: [
            {
              title: 'Lire ou écouter une ressource sur la psychologie de la procrastination',
              xp_reward: 30,
              frequency_days: 365,
              is_optional: true,
            },
            {
              title: 'Définir une stratégie personnelle anti-procrastination et l’appliquer',
              xp_reward: 40,
              frequency_days: 365,
            },
          ],
        },
      ],
    },

    // 14. Pas de téléphone la première heure
    {
      title: 'Pas de téléphone pendant la première heure',
      description:
        'Pendant 21 jours, tu ne touches pas à ton téléphone pendant la première heure après le réveil. Tu reprogrammes ton cerveau pour commencer la journée en mode acteur, pas en mode réactif.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 21,
      xp_reward: 400,
      objectives: [
        {
          title: 'Ne pas toucher au téléphone pendant l’heure qui suit le lever',
          description:
            'Le téléphone reste en mode avion ou dans une autre pièce jusqu’à une heure après ton réveil. Aucune exception : pas de SMS, pas de notifications, pas de réseaux sociaux, pas d’actualités.',
          xp_reward: 400,
          stat_impacts: { discipline: 5, focus: 4, calme: 3 },
          tasks: [
            {
              title: 'Placer le téléphone hors de la chambre (ou en mode avion toute la nuit)',
              xp_reward: 15,
              frequency_days: 1,
            },
            {
              title: 'Tenir 60 minutes sans consulter le téléphone après le lever',
              xp_reward: 25,
              frequency_days: 1,
            },
            {
              title: 'Remplacer la première consultation par une activité intentionnelle (lecture, sport, méditation)',
              xp_reward: 15,
              frequency_days: 1,
            },
          ],
        },
      ],
    },

    // 15. Time blocking — bloquer son agenda
    {
      title: 'Time blocking — maîtriser son agenda',
      description:
        'Bloque chaque créneau de ta journée dans ton agenda avant de commencer à travailler. Pendant 21 jours, tu ne travailles que sur ce qui est planifié — les imprévus ont leur propre créneau tampon.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 21,
      xp_reward: 450,
      objectives: [
        {
          title: 'Planifier chaque journée en blocs horaires la veille',
          description:
            'Avant 21h chaque soir, remplis ton agenda du lendemain avec des blocs nommés : travail profond, emails, réunions, sport, pause, temps tampon. Aucune case vide non intentionnelle.',
          xp_reward: 300,
          stat_impacts: { discipline: 4, focus: 5 },
          tasks: [
            {
              title: 'Remplir l’agenda du lendemain en blocs nommés avant 21h',
              xp_reward: 20,
              frequency_days: 1,
            },
            {
              title: 'Inclure un bloc tampon de 30 min pour les imprévus',
              xp_reward: 10,
              frequency_days: 1,
            },
            {
              title: 'Suivre les blocs planifiés et noter les écarts en fin de journée',
              xp_reward: 15,
              frequency_days: 1,
            },
          ],
        },
        {
          title: 'Évaluer et ajuster le système chaque semaine',
          description:
            'Analyse où les blocs dérapent le plus souvent et ajuste les durées estimées.',
          xp_reward: 150,
          stat_impacts: { discipline: 2, focus: 2 },
          tasks: [
            {
              title: 'Analyser les écarts planning/réalité et ajuster les estimations de durée',
              xp_reward: 35,
              frequency_days: 7,
            },
          ],
        },
      ],
    },

    // 16. Préparer ses affaires la veille
    {
      title: 'Préparer ses affaires la veille chaque soir',
      description:
        'Chaque soir, prépare tout ce dont tu auras besoin le lendemain matin : vêtements, sac, repas, matériel. 14 jours pour éliminer le stress du matin et gagner 15 minutes chaque jour.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 14,
      xp_reward: 250,
      objectives: [
        {
          title: 'Préparer ses affaires du lendemain chaque soir',
          description:
            'Avant d’aller dormir : vêtements sortis et posés, sac ou cartable préparé, repas du lendemain planifié ou préparé, liste de tâches rédigée.',
          xp_reward: 250,
          stat_impacts: { discipline: 4, calme: 2 },
          tasks: [
            {
              title: 'Sortir et préparer la tenue du lendemain',
              xp_reward: 10,
              frequency_days: 1,
            },
            {
              title: 'Préparer le sac et le matériel nécessaire au lendemain',
              xp_reward: 10,
              frequency_days: 1,
            },
            {
              title: 'Planifier ou préparer le repas du lendemain (midi au minimum)',
              xp_reward: 15,
              frequency_days: 1,
            },
          ],
        },
      ],
    },

    // 17. Terminer une tâche à 100%
    {
      title: 'Terminer une tâche à 100% chaque jour',
      description:
        'Chaque jour pendant 21 jours, tu dois choisir une tâche et la mener à 100% d’achèvement avant de passer à autre chose. Pas de «presque fini», pas de «j’y reviendrai».',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 21,
      xp_reward: 400,
      objectives: [
        {
          title: 'Compléter une tâche à 100% chaque jour',
          description:
            'Le matin, désigne une tâche qui sera entièrement terminée aujourd’hui. Engage-toi à ne pas la quitter tant qu’elle n’est pas achevée. Documente ton résultat.',
          xp_reward: 400,
          stat_impacts: { discipline: 5, focus: 4, emotion: 2 },
          tasks: [
            {
              title: 'Choisir le matin la tâche qui sera terminée à 100% aujourd’hui',
              xp_reward: 15,
              frequency_days: 1,
            },
            {
              title: 'Compléter la tâche choisie entièrement avant de passer à la suivante',
              xp_reward: 35,
              frequency_days: 1,
            },
            {
              title: 'Marquer la tâche comme «terminée» et noter ce que ça fait de finir',
              xp_reward: 10,
              frequency_days: 1,
              is_optional: true,
            },
          ],
        },
      ],
    },

    // 18. La règle des 2 minutes
    {
      title: 'La règle des 2 minutes — agir immédiatement',
      description:
        'Si une tâche prend moins de 2 minutes, tu la fais immédiatement. Pendant 21 jours, applique cette règle systématiquement pour vider ton backlog mental et arrêter d’accumuler les petites choses non faites.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 300,
      objectives: [
        {
          title: 'Appliquer la règle des 2 minutes à chaque micro-tâche',
          description:
            'Dès qu’une action te prend moins de 2 minutes (répondre à un message, remplir un formulaire, ranger un objet, envoyer un email court), tu la fais tout de suite. Aucune liste d’attente pour ces micro-tâches.',
          xp_reward: 300,
          stat_impacts: { discipline: 4, focus: 3 },
          tasks: [
            {
              title: 'Appliquer la règle des 2 minutes à chaque micro-tâche identifiée dans la journée',
              xp_reward: 15,
              frequency_days: 1,
            },
            {
              title: 'Compter le nombre de micro-tâches traitées immédiatement dans la journée',
              xp_reward: 10,
              frequency_days: 1,
              is_optional: true,
            },
            {
              title: 'En fin de semaine, dresser la liste des micro-tâches qui «traînaient» avant cette quête',
              xp_reward: 25,
              frequency_days: 7,
            },
          ],
        },
      ],
    },
  ],

  meta: {
    'Devenir un lève-tôt — 5h chaque matin': {
      themes: ['discipline', 'mind'],
      context: ['challenge', 'improve'],
      summary:
        'Repousse ton réveil à 5h du matin et tiens-le 30 jours pour gagner deux heures de silence et de puissance créative avant que le monde ne s’éveille.',
    },
    'Routine matinale en 5 étapes': {
      themes: ['discipline', 'mind', 'body'],
      context: ['reset', 'improve'],
      summary:
        'Construit une routine du matin en 5 piliers enchaînés — hydratation, mouvement, lecture, planification, repas sans écran — pour démarrer chaque journée en pleine puissance.',
    },
    'Routine du soir apaisante': {
      themes: ['discipline', 'emotions', 'mind'],
      context: ['reset', 'improve'],
      summary:
        'Instaure un protocole de fin de journée (coupure des écrans, bilan, préparation du lendemain) pour préparer ton cerveau au sommeil et réduire l’anxiété nocturne.',
    },
    'Faire son lit chaque matin sans exception': {
      themes: ['discipline', 'minimalism'],
      context: ['reset', 'improve'],
      summary:
        'La plus petite victoire de la journée : faire son lit dès le lever enclenche une dynamique d’ordre et d’autodiscipline pour tout le reste.',
    },
    'Zéro snooze — lever du premier coup': {
      themes: ['discipline', 'mind'],
      context: ['challenge', 'improve'],
      summary:
        'Supprime le snooze de ta vie pendant 21 jours et entraîne ta volonté dès les premières secondes du matin pour forger un mental de fer.',
    },
    'Manger la grenouille — la tâche difficile en premier': {
      themes: ['discipline', 'focus'],
      context: ['improve', 'challenge'],
      summary:
        'Identifie et accomplis ta tâche la plus redoutée en tout premier chaque matin — et regarde le reste de ta journée devenir plus léger.',
    },
    'Deux heures de deep work quotidien': {
      themes: ['focus', 'discipline'],
      context: ['improve', 'challenge'],
      summary:
        'Bloque chaque jour deux heures de travail profond ininterrompu pour produire ton meilleur travail et arrêter de te disperser.',
    },
    'Maîtriser la technique Pomodoro': {
      themes: ['focus', 'discipline'],
      context: ['reset', 'improve'],
      summary:
        'Adopte le cycle Pomodoro (25 min de travail / 5 min de pause) pour maintenir une concentration maximale et éviter l’épuisement cognitif.',
    },
    'Inbox Zéro — boîte mail vide chaque soir': {
      themes: ['discipline', 'focus', 'minimalism'],
      context: ['reset', 'improve'],
      summary:
        'Atteins l’inbox zéro chaque soir pendant 14 jours et libère ton cerveau du poids des emails non traités qui encombrent ton espace mental.',
    },
    'Planifier sa journée chaque matin en 10 minutes': {
      themes: ['discipline', 'focus'],
      context: ['reset', 'improve'],
      summary:
        'Prends 10 minutes chaque matin pour planifier tes priorités et ne plus jamais subir ta journée : tu décides, tu agis.',
    },
    'La revue hebdomadaire — bilan et plan chaque dimanche': {
      themes: ['discipline', 'focus', 'mind'],
      context: ['improve', 'challenge'],
      summary:
        'Chaque dimanche, fais le bilan de la semaine et planifie la suivante — 4 revues pour transformer ton organisation personnelle en profondeur.',
    },
    'Ranger 15 minutes par jour — espace clair, esprit clair': {
      themes: ['discipline', 'minimalism'],
      context: ['reset', 'improve'],
      summary:
        'Passe 15 minutes par jour à désencombrer ton espace pour alléger ton environnement et libérer ton attention.',
    },
    'Zéro procrastination — agir sans délai': {
      themes: ['discipline', 'focus', 'emotions'],
      context: ['reset', 'challenge'],
      summary:
        'Identifie tes déclencheurs de procrastination et engage-toi à commencer chaque tâche dans les 2 minutes — 21 jours pour briser le cycle de l’évitement.',
    },
    'Pas de téléphone pendant la première heure': {
      themes: ['discipline', 'detox', 'focus'],
      context: ['reset', 'improve'],
      summary:
        'Garde le téléphone éteint pendant la première heure de ta journée pour reprendre le contrôle de ton attention dès le matin.',
    },
    'Time blocking — maîtriser son agenda': {
      themes: ['discipline', 'focus'],
      context: ['improve', 'challenge'],
      summary:
        'Planifie chaque journée en blocs horaires nommés la veille pour ne plus subir ton agenda et travailler sur ce qui compte vraiment.',
    },
    'Préparer ses affaires la veille chaque soir': {
      themes: ['discipline', 'minimalism'],
      context: ['reset', 'improve'],
      summary:
        'Prépare tout la veille — vêtements, sac, repas — pour éliminer le stress du matin et démarrer chaque journée sans friction.',
    },
    'Terminer une tâche à 100% chaque jour': {
      themes: ['discipline', 'focus'],
      context: ['improve', 'challenge'],
      summary:
        'Chaque jour, choisis une tâche et refuse de la quitter tant qu’elle n’est pas entièrement terminée — 21 jours pour cultiver l’art du travail achevé.',
    },
    'La règle des 2 minutes — agir immédiatement': {
      themes: ['discipline', 'focus', 'minimalism'],
      context: ['reset', 'improve'],
      summary:
        'Si ça prend moins de 2 minutes, tu le fais maintenant — applique cette règle pendant 21 jours pour vider ton backlog mental et arrêter d’accumuler les petits retards.',
    },
  },
};
