import type { QuestModule } from './types';

export const BODY_QUESTS: QuestModule = {
  quests: [
    // 1. 100 squats par jour
    {
      title: '100 squats par jour',
      description: 'Effectue 100 squats chaque jour pendant 30 jours pour renforcer tes cuisses, fessiers et améliorer ta condition physique générale.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 30,
      xp_reward: 450,
      objectives: [
        {
          title: 'Squat quotidien',
          description: 'Réalise 100 squats complets chaque jour, en plusieurs séries si nécessaire.',
          xp_reward: 250,
          stat_impacts: { force: 6, endurance: 4, discipline: 4 },
          tasks: [
            { title: 'Faire 100 squats aujourd\'hui', xp_reward: 15 },
            { title: 'Étirements des jambes après la séance', xp_reward: 10, is_optional: true },
          ],
        },
        {
          title: 'Progression de la technique',
          description: 'Améliore ta forme : dos droit, genoux alignés, descente complète.',
          xp_reward: 200,
          stat_impacts: { force: 4, discipline: 3 },
          tasks: [
            { title: 'Vérifier sa forme devant un miroir ou en vidéo', xp_reward: 20, frequency_days: 7 },
            { title: 'Essayer des variantes (sumo squat, squat sauté)', xp_reward: 30, frequency_days: 7 },
          ],
        },
      ],
    },

    // 2. Gainage progressif
    {
      title: 'Gainage : de zéro à 3 minutes de planche',
      description: 'Progresse chaque jour dans l\'exercice de gainage pour atteindre 3 minutes de planche continue en 21 jours.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 21,
      xp_reward: 380,
      objectives: [
        {
          title: 'Tenir la planche chaque jour',
          description: 'Pratique la planche quotidiennement en augmentant progressivement la durée.',
          xp_reward: 220,
          stat_impacts: { endurance: 5, force: 4, discipline: 5 },
          tasks: [
            { title: 'Séance de gainage du jour (durée progressive)', xp_reward: 20 },
            { title: 'Ajouter 10 secondes par rapport à la veille', xp_reward: 15 },
          ],
        },
        {
          title: 'Atteindre 3 minutes de planche',
          description: 'Réussir à tenir une planche de 3 minutes d\'affilée sans interruption.',
          xp_reward: 160,
          stat_impacts: { endurance: 6, force: 3 },
          tasks: [
            { title: 'Tenter la planche de 3 minutes en fin de programme', xp_reward: 60, frequency_days: 21 },
          ],
        },
      ],
    },

    // 3. Ta première traction
    {
      title: 'Ma première traction',
      description: 'Travaille la force du haut du corps pour réussir ta toute première traction complète en 30 jours.',
      type: 'secondary',
      difficulty: 'hard',
      duration_days: 30,
      xp_reward: 500,
      objectives: [
        {
          title: 'Renforcement du haut du corps',
          description: 'Entraîne les muscles du dos et des bras avec des exercices préparatoires quotidiens.',
          xp_reward: 280,
          stat_impacts: { force: 7, endurance: 3, discipline: 4 },
          tasks: [
            { title: 'Séance de rowing / australian pull-up', xp_reward: 20 },
            { title: 'Tractions négatives (descente lente depuis la barre)', xp_reward: 25 },
          ],
        },
        {
          title: 'Réussir une traction complète',
          description: 'Réaliser une vraie traction : bras tendus au départ, menton au-dessus de la barre.',
          xp_reward: 220,
          stat_impacts: { force: 8, discipline: 4 },
          tasks: [
            { title: 'Tenter une traction complète cette semaine', xp_reward: 40, frequency_days: 7 },
            { title: 'Filmer et analyser sa traction', xp_reward: 15, is_optional: true },
          ],
        },
      ],
    },

    // 4. Couch to 5K
    {
      title: 'Couch to 5K — débuter la course à pied',
      description: 'Passe du canapé à la course en alternant marche et course selon un plan progressif sur 30 jours.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 30,
      xp_reward: 400,
      objectives: [
        {
          title: 'Séances run-marche régulières',
          description: 'Suis le programme Couch to 5K : 3 séances par semaine en alternant marche et course.',
          xp_reward: 250,
          stat_impacts: { cardio: 6, endurance: 5, discipline: 3 },
          tasks: [
            { title: 'Séance Couch to 5K du jour', xp_reward: 30, frequency_days: 2 },
            { title: 'Boire suffisamment d\'eau avant et après', xp_reward: 10 },
          ],
        },
        {
          title: 'Compléter le mois sans sauter de séance',
          description: 'Finir les 4 semaines du programme sans manquer une seule séance prévue.',
          xp_reward: 150,
          stat_impacts: { discipline: 5, endurance: 3 },
          tasks: [
            { title: 'Cocher la séance dans le calendrier', xp_reward: 15, frequency_days: 2 },
          ],
        },
      ],
    },

    // 5. Courir 5 km sans s’arrêter
    {
      title: 'Courir 5 km sans s\'arrêter',
      description: 'Entraîne-toi pour réussir à courir 5 km en continu, à ton rythme, sans marche ni pause.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 30,
      xp_reward: 450,
      objectives: [
        {
          title: 'Sorties de course régulières',
          description: 'Cours 3 fois par semaine en augmentant progressivement la distance.',
          xp_reward: 250,
          stat_impacts: { cardio: 7, endurance: 6, discipline: 3 },
          tasks: [
            { title: 'Sortie course du jour', xp_reward: 30, frequency_days: 2 },
            { title: 'Noter la distance et le temps dans un journal', xp_reward: 10, frequency_days: 2 },
          ],
        },
        {
          title: 'Réussir les 5 km sans s\'arrêter',
          description: 'Accomplir une course de 5 km sans interruption ni marche.',
          xp_reward: 200,
          stat_impacts: { cardio: 6, endurance: 5 },
          tasks: [
            { title: 'Courir 5 km d\'une traite', xp_reward: 60, frequency_days: 30 },
          ],
        },
      ],
    },

    // 6. 100 km à vélo dans le mois
    {
      title: '100 km à vélo en un mois',
      description: 'Accumule 100 km de vélo sur le mois, en sorties libres ou navettes quotidiennes.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 30,
      xp_reward: 420,
      objectives: [
        {
          title: 'Sorties vélo régulières',
          description: 'Pédale au moins 3 fois par semaine pour cumuler les kilomètres.',
          xp_reward: 250,
          stat_impacts: { cardio: 6, endurance: 6, discipline: 3 },
          tasks: [
            { title: 'Sortie vélo du jour (noter les km)', xp_reward: 25, frequency_days: 2 },
            { title: 'Entretenir son vélo (pneus, chaîne)', xp_reward: 15, frequency_days: 14, is_optional: true },
          ],
        },
        {
          title: 'Atteindre les 100 km cumulés',
          description: 'Valider que le compteur total dépasse 100 km à la fin du mois.',
          xp_reward: 170,
          stat_impacts: { cardio: 5, endurance: 4 },
          tasks: [
            { title: 'Mettre à jour son compteur kilométrique', xp_reward: 10 },
          ],
        },
      ],
    },

    // 7. Natation 2 fois par semaine
    {
      title: 'Natation deux fois par semaine',
      description: 'Intègre la natation dans ta routine avec deux séances hebdomadaires pendant 30 jours.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 30,
      xp_reward: 420,
      objectives: [
        {
          title: 'Séances de natation régulières',
          description: 'Nage au moins 2 fois par semaine, minimum 30 minutes par séance.',
          xp_reward: 250,
          stat_impacts: { cardio: 7, endurance: 5, force: 3 },
          tasks: [
            { title: 'Séance de natation (30 min min.)', xp_reward: 35, frequency_days: 3 },
            { title: 'Travailler un nouveau style de nage', xp_reward: 20, frequency_days: 7, is_optional: true },
          ],
        },
        {
          title: 'Consistance sur le mois',
          description: 'Ne rater aucune des 8 séances prévues sur le mois.',
          xp_reward: 170,
          stat_impacts: { discipline: 5, endurance: 3 },
          tasks: [
            { title: 'Cocher la séance dans son agenda', xp_reward: 10, frequency_days: 3 },
          ],
        },
      ],
    },

    // 8. Grand écart — souplesse
    {
      title: 'Vers le grand écart — 30 jours de souplesse',
      description: 'Travaille ta souplesse des hanches et des ischio-jambiers chaque jour pour progresser vers le grand écart.',
      type: 'secondary',
      difficulty: 'hard',
      duration_days: 30,
      xp_reward: 430,
      objectives: [
        {
          title: 'Étirements quotidiens ciblés',
          description: 'Pratique 15 à 20 minutes d\'étirements spécifiques chaque jour.',
          xp_reward: 250,
          stat_impacts: { endurance: 4, discipline: 5, calme: 3 },
          tasks: [
            { title: 'Séance d\'étirements du jour (15-20 min)', xp_reward: 20 },
            { title: 'Tenir chaque posture au moins 60 secondes', xp_reward: 10 },
          ],
        },
        {
          title: 'Mesurer la progression',
          description: 'Prendre des photos hebdomadaires pour mesurer l\'avancée vers le grand écart.',
          xp_reward: 180,
          stat_impacts: { discipline: 4, endurance: 3 },
          tasks: [
            { title: 'Photo de progression souplesse', xp_reward: 20, frequency_days: 7 },
          ],
        },
      ],
    },

    // 9. Perdre 2 kg sainement
    {
      title: 'Perdre 2 kg sainement',
      description: 'Adopte un léger déficit calorique et maintiens une activité physique régulière pour perdre 2 kg en 30 jours.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 30,
      xp_reward: 460,
      objectives: [
        {
          title: 'Alimentation contrôlée',
          description: 'Mange à légère restriction calorique en privilégiant des aliments nutritifs et rassasiants.',
          xp_reward: 240,
          stat_impacts: { discipline: 6, endurance: 3, calme: 2 },
          tasks: [
            { title: 'Planifier ses repas de la journée', xp_reward: 15 },
            { title: 'Éviter les aliments ultra-transformés', xp_reward: 15 },
          ],
        },
        {
          title: 'Activité physique régulière',
          description: 'Maintenir au moins 30 minutes d\'activité physique par jour.',
          xp_reward: 220,
          stat_impacts: { cardio: 5, endurance: 4, discipline: 3 },
          tasks: [
            { title: '30 minutes d\'activité physique aujourd\'hui', xp_reward: 20 },
            { title: 'Se peser chaque semaine (même heure, même conditions)', xp_reward: 15, frequency_days: 7 },
          ],
        },
      ],
    },

    // 10. Prise de masse
    {
      title: 'Prise de masse — surplus et musculation',
      description: 'Combine un surplus calorique propre et des séances de musculation régulières pour gagner du muscle en 30 jours.',
      type: 'secondary',
      difficulty: 'hard',
      duration_days: 30,
      xp_reward: 500,
      objectives: [
        {
          title: 'Séances de musculation structurées',
          description: 'Réalise 3 séances de musculation par semaine en ciblant tous les groupes musculaires.',
          xp_reward: 280,
          stat_impacts: { force: 8, endurance: 4, discipline: 4 },
          tasks: [
            { title: 'Séance de musculation (haut ou bas du corps)', xp_reward: 40, frequency_days: 2 },
            { title: 'Augmenter les charges ou les répétitions par rapport à la semaine précédente', xp_reward: 20, frequency_days: 7 },
          ],
        },
        {
          title: 'Alimentation en surplus calorique',
          description: 'Consommer un surplus de 200 à 300 kcal au-dessus de la maintenance, riche en protéines.',
          xp_reward: 220,
          stat_impacts: { force: 4, discipline: 5 },
          tasks: [
            { title: 'Atteindre son objectif protéines du jour (1,8 g / kg)', xp_reward: 20 },
            { title: 'Préparer un repas riche en protéines', xp_reward: 15 },
          ],
        },
      ],
    },

    // 11. Routine abdos quotidienne
    {
      title: 'Routine abdos quotidienne',
      description: 'Effectue une routine abdominale courte mais efficace chaque jour pendant 30 jours pour renforcer ta sangle abdominale.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 30,
      xp_reward: 380,
      objectives: [
        {
          title: 'Abdos chaque jour',
          description: 'Réalise une routine de 10 à 15 minutes incluant crunchs, relevés de jambes et gainage.',
          xp_reward: 250,
          stat_impacts: { force: 5, endurance: 4, discipline: 5 },
          tasks: [
            { title: 'Routine abdos du jour (10-15 min)', xp_reward: 15 },
            { title: 'Ajouter une série bonus si l\'énergie le permet', xp_reward: 10, is_optional: true },
          ],
        },
        {
          title: 'Aucun jour sauté',
          description: 'Maintenir la régularité sans manquer un seul jour sur 30.',
          xp_reward: 130,
          stat_impacts: { discipline: 6 },
          tasks: [
            { title: 'Cocher le défi du jour dans son suivi', xp_reward: 10 },
          ],
        },
      ],
    },

    // 12. Corriger sa posture
    {
      title: 'Corriger sa posture en 21 jours',
      description: 'Adopte des habitudes quotidiennes et des exercices ciblés pour améliorer durablement ta posture.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 340,
      objectives: [
        {
          title: 'Exercices posturaux quotidiens',
          description: 'Pratique des exercices de renforcement du dos, étirements pectoraux et corrections de posture chaque jour.',
          xp_reward: 200,
          stat_impacts: { force: 3, endurance: 3, discipline: 4 },
          tasks: [
            { title: 'Exercices posturaux du jour (10 min)', xp_reward: 15 },
            { title: 'Vérifier et corriger sa posture au bureau / debout', xp_reward: 10 },
          ],
        },
        {
          title: 'Conscience posturale toute la journée',
          description: 'Installer des rappels pour vérifier sa posture plusieurs fois par jour.',
          xp_reward: 140,
          stat_impacts: { discipline: 4, calme: 2 },
          tasks: [
            { title: 'Configurer 3 rappels posture dans la journée', xp_reward: 20, frequency_days: 7 },
            { title: 'Posture vérifiée au moins 3 fois dans la journée', xp_reward: 10 },
          ],
        },
      ],
    },

    // 13. Mobilité hanches & épaules
    {
      title: 'Mobilité hanches et épaules — 21 jours',
      description: 'Libère tes hanches et tes épaules avec une routine de mobilité quotidienne pour bouger sans douleur.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 320,
      objectives: [
        {
          title: 'Routine de mobilité quotidienne',
          description: 'Effectue 15 minutes de mobilité ciblée hanches + épaules chaque jour.',
          xp_reward: 200,
          stat_impacts: { endurance: 4, calme: 3, discipline: 4 },
          tasks: [
            { title: 'Mobilité hanches (hip circles, fentes, pigeons)', xp_reward: 15 },
            { title: 'Mobilité épaules (rotations, étirements thoraciques)', xp_reward: 15 },
          ],
        },
        {
          title: 'Évaluer la progression',
          description: 'Tester l\'amplitude de mouvement en début et fin de programme.',
          xp_reward: 120,
          stat_impacts: { discipline: 3, endurance: 2 },
          tasks: [
            { title: 'Test d\'amplitude articulaire (noter les résultats)', xp_reward: 30, frequency_days: 7 },
          ],
        },
      ],
    },

    // 14. Marche rapide 30 min
    {
      title: 'Marche rapide 30 minutes par jour',
      description: 'Marche à allure soutenue 30 minutes chaque jour pendant 21 jours pour booster ton cardio et ton bien-être.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 300,
      objectives: [
        {
          title: 'Marche rapide quotidienne',
          description: 'Sortir chaque jour et marcher à un rythme cardiaque légèrement élevé pendant 30 minutes minimum.',
          xp_reward: 200,
          stat_impacts: { cardio: 5, endurance: 4, discipline: 3 },
          tasks: [
            { title: 'Marche rapide de 30 min (chrono)', xp_reward: 20 },
            { title: 'Marcher dans un nouveau lieu ou parc', xp_reward: 10, frequency_days: 7, is_optional: true },
          ],
        },
        {
          title: 'Aucun jour manqué',
          description: 'Maintenir la régularité sur 21 jours consécutifs.',
          xp_reward: 100,
          stat_impacts: { discipline: 4 },
          tasks: [
            { title: 'Marche coché dans le journal', xp_reward: 10 },
          ],
        },
      ],
    },

    // 15. Zéro ascenseur
    {
      title: 'Zéro ascenseur — toujours les escaliers',
      description: 'Interdis-toi l\'ascenseur pendant 21 jours et prends systématiquement les escaliers pour renforcer tes jambes.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 280,
      objectives: [
        {
          title: 'Escaliers à chaque occasion',
          description: 'Ne jamais prendre l\'ascenseur ni l\'escalator sur toute la durée du défi.',
          xp_reward: 180,
          stat_impacts: { endurance: 5, force: 3, discipline: 5 },
          tasks: [
            { title: 'Confirmer : zéro ascenseur aujourd\'hui', xp_reward: 10 },
            { title: 'Compter le nombre d\'étages grimpés dans la journée', xp_reward: 10, is_optional: true },
          ],
        },
        {
          title: 'Tenir 21 jours sans exception',
          description: 'Aller jusqu\'au bout sans dérogation, même fatigué.',
          xp_reward: 100,
          stat_impacts: { discipline: 6 },
          tasks: [
            { title: 'Journée sans ascenseur validée', xp_reward: 10 },
          ],
        },
      ],
    },

    // 16. Hygiène dentaire parfaite
    {
      title: 'Hygiène dentaire parfaite — fil dentaire inclus',
      description: 'Brossage deux fois par jour + fil dentaire quotidien pendant 21 jours pour installer une routine dentaire irréprochable.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 260,
      objectives: [
        {
          title: 'Routine dentaire complète chaque jour',
          description: 'Brossage matin et soir (2 min chacun) et fil dentaire une fois par jour.',
          xp_reward: 170,
          stat_impacts: { discipline: 5, calme: 2 },
          tasks: [
            { title: 'Brossage matin (2 min)', xp_reward: 10 },
            { title: 'Brossage soir (2 min)', xp_reward: 10 },
            { title: 'Fil dentaire le soir', xp_reward: 15 },
          ],
        },
        {
          title: 'Aucun oubli en 21 jours',
          description: 'Ne sauter aucune des trois actions quotidiennes sur toute la durée.',
          xp_reward: 90,
          stat_impacts: { discipline: 4 },
          tasks: [
            { title: 'Routine complète cochée', xp_reward: 10 },
          ],
        },
      ],
    },

    // 17. Routine soin de la peau
    {
      title: 'Routine soin de la peau — 30 jours',
      description: 'Mets en place une routine skincare minimaliste matin et soir pendant 30 jours pour prendre soin de ta peau durablement.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 30,
      xp_reward: 300,
      objectives: [
        {
          title: 'Routine skincare quotidienne',
          description: 'Appliquer nettoyant + hydratant le matin et le soir sans exception.',
          xp_reward: 200,
          stat_impacts: { discipline: 5, calme: 3 },
          tasks: [
            { title: 'Routine matin (nettoyage + hydratation)', xp_reward: 10 },
            { title: 'Routine soir (nettoyage + soin de nuit)', xp_reward: 10 },
          ],
        },
        {
          title: 'Observer et ajuster',
          description: 'Prendre des photos hebdomadaires pour suivre l\'évolution de la peau.',
          xp_reward: 100,
          stat_impacts: { discipline: 3 },
          tasks: [
            { title: 'Photo de suivi peau', xp_reward: 20, frequency_days: 7 },
            { title: 'Ajouter un soin ciblé (sérum, SPF) si besoin', xp_reward: 15, frequency_days: 7, is_optional: true },
          ],
        },
      ],
    },

    // 18. Dormir 8 h chaque nuit
    {
      title: 'Dormir 8 heures chaque nuit',
      description: 'Respecte une fenêtre de sommeil de 8 heures chaque nuit pendant 21 jours pour optimiser ta récupération.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 21,
      xp_reward: 360,
      objectives: [
        {
          title: 'Heure de coucher fixe',
          description: 'Se coucher à la même heure chaque soir pour ancrer le rythme circadien.',
          xp_reward: 200,
          stat_impacts: { endurance: 4, calme: 5, discipline: 5 },
          tasks: [
            { title: 'Éteindre les écrans 30 min avant de dormir', xp_reward: 15 },
            { title: 'Se coucher à l\'heure prévue', xp_reward: 15 },
          ],
        },
        {
          title: '8 heures de sommeil effectives',
          description: 'Viser 8 heures de sommeil réel (pas juste au lit) chaque nuit.',
          xp_reward: 160,
          stat_impacts: { calme: 4, endurance: 3 },
          tasks: [
            { title: 'Noter son heure de lever et la durée de sommeil', xp_reward: 10 },
            { title: 'Se lever à heure fixe, sans snooze', xp_reward: 15 },
          ],
        },
      ],
    },

    // 19. Arrêter de grignoter
    {
      title: 'Zéro grignotage pendant 14 jours',
      description: 'Supprime toutes les prises alimentaires entre les repas pendant 14 jours pour rééduquer ta faim et discipliner ton alimentation.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 14,
      xp_reward: 300,
      objectives: [
        {
          title: 'Repas uniquement aux heures prévues',
          description: 'Ne manger que pendant les 3 repas principaux, sans exception ni écart.',
          xp_reward: 200,
          stat_impacts: { discipline: 7, calme: 3 },
          tasks: [
            { title: 'Journée sans grignotage validée', xp_reward: 20 },
            { title: 'Remplacer l\'envie de grignoter par un verre d\'eau', xp_reward: 10 },
          ],
        },
        {
          title: 'Identifier ses déclencheurs',
          description: 'Repérer les situations ou émotions qui déclenchent l\'envie de grignoter.',
          xp_reward: 100,
          stat_impacts: { discipline: 4, calme: 3 },
          tasks: [
            { title: 'Noter dans un journal les envies ressenties et leur contexte', xp_reward: 15 },
          ],
        },
      ],
    },

    // 20. 5 fruits et légumes par jour
    {
      title: '5 fruits et légumes par jour — 21 jours',
      description: 'Consomme au moins 5 portions de fruits et légumes chaque jour pendant 21 jours pour améliorer ton alimentation.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 280,
      objectives: [
        {
          title: 'Cinq portions chaque jour',
          description: 'Intégrer fruits et légumes à chaque repas pour atteindre les 5 portions recommandées.',
          xp_reward: 180,
          stat_impacts: { endurance: 3, discipline: 4, calme: 2 },
          tasks: [
            { title: 'Atteindre 5 portions fruits / légumes aujourd\'hui', xp_reward: 15 },
            { title: 'Essayer un légume ou fruit inconnu cette semaine', xp_reward: 20, frequency_days: 7, is_optional: true },
          ],
        },
        {
          title: 'Cuisiner avec les légumes',
          description: 'Préparer soi-même au moins un plat à base de légumes par jour.',
          xp_reward: 100,
          stat_impacts: { discipline: 3 },
          tasks: [
            { title: 'Cuisiner un plat maison avec des légumes', xp_reward: 15 },
          ],
        },
      ],
    },

    // 21. Réduire la caféine
    {
      title: 'Réduire la caféine en 14 jours',
      description: 'Diminue progressivement ta consommation de caféine pour retrouver une énergie stable et améliorer ton sommeil.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 14,
      xp_reward: 310,
      objectives: [
        {
          title: 'Réduction progressive de la caféine',
          description: 'Diminuer d\'une tasse par semaine jusqu\'à atteindre au maximum une tasse par jour.',
          xp_reward: 190,
          stat_impacts: { discipline: 6, calme: 4, endurance: 2 },
          tasks: [
            { title: 'Pas de café après 14h aujourd\'hui', xp_reward: 15 },
            { title: 'Remplacer une tasse de café par une tisane', xp_reward: 15 },
          ],
        },
        {
          title: 'Observer l\'impact sur le sommeil et l\'énergie',
          description: 'Tenir un journal de ton énergie et de la qualité du sommeil pendant la période de sevrage.',
          xp_reward: 120,
          stat_impacts: { calme: 3, discipline: 3 },
          tasks: [
            { title: 'Note d\'énergie et sommeil dans le journal (sur 10)', xp_reward: 10 },
            { title: 'Comparer la note de la semaine 2 vs semaine 1', xp_reward: 20, frequency_days: 7 },
          ],
        },
      ],
    },

    // 22. Extra — Corde à sauter
    {
      title: 'Corde à sauter — 10 minutes par jour',
      description: 'Saute à la corde 10 minutes chaque jour pendant 21 jours pour dynamiser ton cardio et améliorer ta coordination.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 320,
      objectives: [
        {
          title: 'Séance de corde à sauter quotidienne',
          description: 'Sauter à la corde 10 minutes sans interruption, en progressant sur la technique.',
          xp_reward: 220,
          stat_impacts: { cardio: 6, endurance: 4, discipline: 4 },
          tasks: [
            { title: 'Corde à sauter — 10 minutes aujourd\'hui', xp_reward: 20 },
            { title: 'Tenter un nouveau saut (croisé, double saut)', xp_reward: 15, frequency_days: 7, is_optional: true },
          ],
        },
        {
          title: 'Régularité sans faille',
          description: 'Ne manquer aucun jour sur les 21 jours du défi.',
          xp_reward: 100,
          stat_impacts: { discipline: 5 },
          tasks: [
            { title: 'Séance cochée dans le suivi', xp_reward: 10 },
          ],
        },
      ],
    },

    // 23. Extra — Burpees défi
    {
      title: 'Défi burpees — 50 par jour',
      description: 'Réalise 50 burpees chaque jour pendant 14 jours pour un entraînement full-body explosif et intensif.',
      type: 'secondary',
      difficulty: 'hard',
      duration_days: 14,
      xp_reward: 420,
      objectives: [
        {
          title: '50 burpees quotidiens',
          description: 'Effectuer 50 burpees complets chaque jour, en autant de séries que nécessaire.',
          xp_reward: 280,
          stat_impacts: { cardio: 7, force: 5, endurance: 6, discipline: 4 },
          tasks: [
            { title: 'Faire 50 burpees aujourd\'hui', xp_reward: 35 },
            { title: 'Chronométrer et noter son temps', xp_reward: 10 },
          ],
        },
        {
          title: 'Tenir 14 jours sans rater une journée',
          description: 'Compléter les 14 jours du défi sans aucune journée manquée.',
          xp_reward: 140,
          stat_impacts: { discipline: 6, endurance: 3 },
          tasks: [
            { title: 'Journée burpees cochée', xp_reward: 10 },
          ],
        },
      ],
    },
  ],

  meta: {
    '100 squats par jour': {
      themes: ['body', 'discipline'],
      context: ['improve', 'challenge'],
      summary: 'Renforce tes jambes et tes fessiers avec 100 squats quotidiens pendant 30 jours.',
    },
    'Gainage : de zéro à 3 minutes de planche': {
      themes: ['body', 'discipline'],
      context: ['improve', 'challenge'],
      summary: 'Progresse chaque jour dans le gainage pour atteindre 3 minutes de planche continue.',
    },
    'Ma première traction': {
      themes: ['body', 'discipline'],
      context: ['challenge'],
      summary: 'Travaille ta force dorsale jusqu\'à réussir ta première traction complète.',
    },
    'Couch to 5K — débuter la course à pied': {
      themes: ['body', 'discipline'],
      context: ['reset', 'improve'],
      summary: 'Passe du canapé à la course en 30 jours grâce à un programme run-marche progressif.',
    },
    'Courir 5 km sans s\'arrêter': {
      themes: ['body', 'discipline'],
      context: ['improve', 'challenge'],
      summary: 'Entraîne-toi pour enchaîner 5 km en continu sans jamais poser le pied à terre.',
    },
    '100 km à vélo en un mois': {
      themes: ['body', 'discipline'],
      context: ['improve', 'challenge'],
      summary: 'Cumule 100 km de vélo sur 30 jours pour booster ton cardio et ta régularité.',
    },
    'Natation deux fois par semaine': {
      themes: ['body', 'discipline'],
      context: ['improve', 'reset'],
      summary: 'Intègre deux séances de natation par semaine pour un cardio complet et doux.',
    },
    'Vers le grand écart — 30 jours de souplesse': {
      themes: ['body', 'discipline'],
      context: ['improve', 'challenge'],
      summary: 'Libère ta souplesse avec des étirements quotidiens ciblés pour progresser vers le grand écart.',
    },
    'Perdre 2 kg sainement': {
      themes: ['body', 'discipline'],
      context: ['reset', 'improve'],
      summary: 'Adopte un léger déficit calorique et une activité régulière pour perdre 2 kg en douceur.',
    },
    'Prise de masse — surplus et musculation': {
      themes: ['body', 'discipline'],
      context: ['improve', 'challenge'],
      summary: 'Combine surplus calorique et musculation intensive pour construire du muscle en 30 jours.',
    },
    'Routine abdos quotidienne': {
      themes: ['body', 'discipline'],
      context: ['improve', 'challenge'],
      summary: 'Renforce ta sangle abdominale avec une routine courte mais efficace chaque jour.',
    },
    'Corriger sa posture en 21 jours': {
      themes: ['body', 'discipline'],
      context: ['reset', 'improve'],
      summary: 'Redresse-toi durablement grâce à des exercices posturaux et une conscience corporelle accrue.',
    },
    'Mobilité hanches et épaules — 21 jours': {
      themes: ['body', 'discipline'],
      context: ['reset', 'improve'],
      summary: 'Libère tes hanches et épaules avec 15 minutes de mobilité quotidienne pendant 21 jours.',
    },
    'Marche rapide 30 minutes par jour': {
      themes: ['body', 'discipline'],
      context: ['reset', 'improve'],
      summary: 'Marche à allure soutenue 30 minutes par jour pour ton cardio et ton bien-être mental.',
    },
    'Zéro ascenseur — toujours les escaliers': {
      themes: ['body', 'discipline'],
      context: ['reset', 'challenge'],
      summary: 'Bannis l\'ascenseur et conquiers chaque escalier pour renforcer tes jambes au quotidien.',
    },
    'Hygiène dentaire parfaite — fil dentaire inclus': {
      themes: ['body', 'discipline'],
      context: ['reset', 'improve'],
      summary: 'Installe une routine dentaire complète en 21 jours : brossage + fil dentaire, zéro oubli.',
    },
    'Routine soin de la peau — 30 jours': {
      themes: ['body', 'discipline'],
      context: ['reset', 'improve'],
      summary: 'Prends soin de ta peau chaque matin et soir avec une routine skincare simple et constante.',
    },
    'Dormir 8 heures chaque nuit': {
      themes: ['body', 'discipline'],
      context: ['reset', 'improve'],
      summary: 'Respecte 8 heures de sommeil chaque nuit pendant 21 jours pour récupérer pleinement.',
    },
    'Zéro grignotage pendant 14 jours': {
      themes: ['body', 'discipline'],
      context: ['reset', 'challenge'],
      summary: 'Supprime toutes les prises entre les repas pendant 14 jours pour reprendre le contrôle.',
    },
    '5 fruits et légumes par jour — 21 jours': {
      themes: ['body', 'discipline'],
      context: ['reset', 'improve'],
      summary: 'Mange 5 portions de fruits et légumes chaque jour pour transformer ton alimentation.',
    },
    'Réduire la caféine en 14 jours': {
      themes: ['body', 'discipline'],
      context: ['reset', 'improve'],
      summary: 'Diminue progressivement ta caféine pour un sommeil meilleur et une énergie plus stable.',
    },
    'Corde à sauter — 10 minutes par jour': {
      themes: ['body', 'discipline'],
      context: ['improve', 'challenge'],
      summary: 'Saute à la corde 10 minutes par jour pour dynamiser ton cardio et ta coordination.',
    },
    'Défi burpees — 50 par jour': {
      themes: ['body', 'discipline'],
      context: ['challenge'],
      summary: 'Affronte 50 burpees quotidiens pendant 14 jours pour un défi full-body intense et transformateur.',
    },
  },
};
