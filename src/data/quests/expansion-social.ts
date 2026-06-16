import type { QuestModule } from './types';

export const SOCIAL_QUESTS: QuestModule = {
  quests: [
    // 1. Apprendre la vie auprès des anciens
    {
      title: 'Apprendre la vie auprès des anciens',
      description:
        'Consacre du temps à écouter un aîné — grands-parents, voisin âgé, ancien collègue — et recueille la sagesse que seules les années peuvent offrir.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 30,
      xp_reward: 420,
      objectives: [
        {
          title: 'Écouter et retenir',
          description:
            'Rends visite ou appelle un aîné au moins une fois par semaine et note une leçon de vie glanée à chaque échange.',
          xp_reward: 240,
          stat_impacts: { social: 4, emotion: 3, calme: 2 },
          tasks: [
            {
              title: 'Contacter ou rendre visite à un aîné',
              xp_reward: 40,
              frequency_days: 7,
            },
            {
              title: 'Écrire dans ton journal une leçon de vie retenue',
              xp_reward: 20,
              frequency_days: 7,
            },
            {
              title: 'Partager cette leçon avec quelqu’un d’autre',
              xp_reward: 30,
              frequency_days: 7,
              is_optional: true,
            },
          ],
        },
        {
          title: 'Approfondir la relation',
          description:
            'Organise un moment privilégié — repas, promenade — pour prolonger l’échange au-delà d’un simple coup de fil.',
          xp_reward: 180,
          stat_impacts: { social: 3, emotion: 2 },
          tasks: [
            {
              title: 'Planifier un moment en face à face avec l’aîné',
              xp_reward: 30,
              frequency_days: 14,
            },
            {
              title: 'Préparer deux questions ouvertes avant chaque rencontre',
              xp_reward: 20,
              frequency_days: 14,
            },
          ],
        },
      ],
    },

    // 2. Appeler un proche chaque semaine
    {
      title: 'Garder le lien — un appel par semaine',
      description:
        'Dans un monde de messages instantanés, un simple appel vocal entretient des liens plus profonds. Choisis chaque semaine un proche et prends de ses nouvelles.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 30,
      xp_reward: 280,
      objectives: [
        {
          title: 'Appeler chaque semaine sans exception',
          description:
            'Sélectionne un ami ou membre de ta famille différent chaque semaine et appelle-le pour une vraie conversation.',
          xp_reward: 280,
          stat_impacts: { social: 5, emotion: 2 },
          tasks: [
            {
              title: 'Choisir la personne à appeler cette semaine',
              xp_reward: 10,
              frequency_days: 7,
            },
            {
              title: 'Passer un appel d’au moins 15 minutes',
              xp_reward: 40,
              frequency_days: 7,
            },
            {
              title: 'Envoyer un message de suivi après l’appel',
              xp_reward: 15,
              frequency_days: 7,
              is_optional: true,
            },
          ],
        },
      ],
    },

    // 3. Renouer avec un ami perdu de vue
    {
      title: 'Renouer avec un ami perdu de vue',
      description:
        'La vie éloigne les gens — boulot, déménagements, silences qui s’allongent. Prends l’initiative de recontacter quelqu’un qui comptait pour toi.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 14,
      xp_reward: 320,
      objectives: [
        {
          title: 'Reprendre contact',
          description:
            'Identifie l’ami perdu de vue et envoie un premier message sincère pour briser la glace.',
          xp_reward: 120,
          stat_impacts: { social: 3, emotion: 3 },
          tasks: [
            {
              title: 'Identifier la personne et retrouver ses coordonnées',
              xp_reward: 20,
              frequency_days: 365,
            },
            {
              title: 'Envoyer un message d’accroche sincère et personnel',
              xp_reward: 40,
              frequency_days: 365,
            },
            {
              title: 'Proposer un appel ou une rencontre',
              xp_reward: 30,
              frequency_days: 365,
            },
          ],
        },
        {
          title: 'Consolider la reconnexion',
          description:
            'Transforme le premier contact en véritable échange en organisant un moment partagé.',
          xp_reward: 200,
          stat_impacts: { social: 4, emotion: 2 },
          tasks: [
            {
              title: 'Passer un appel ou se retrouver en personne',
              xp_reward: 60,
              frequency_days: 365,
            },
            {
              title: 'Planifier une prochaine occasion pour rester en contact',
              xp_reward: 30,
              frequency_days: 365,
            },
          ],
        },
      ],
    },

    // 4. Dire "je t’aime" à ses proches
    {
      title: 'Exprimer son amour à ses proches',
      description:
        'Beaucoup de personnes quittent ce monde sans avoir dit ce qu’elles ressentaient vraiment. Entraîne-toi à verbaliser ton affection chaque jour.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 14,
      xp_reward: 240,
      objectives: [
        {
          title: 'Verbaliser son affection quotidiennement',
          description:
            'Dis ou écris "je t’aime" (ou son équivalent sincère) à au moins un proche chaque jour.',
          xp_reward: 240,
          stat_impacts: { social: 3, emotion: 5 },
          tasks: [
            {
              title: 'Exprimer ton affection à un proche aujourd’hui',
              xp_reward: 25,
              frequency_days: 1,
            },
            {
              title: 'Note comment tu te sens après l’avoir dit',
              xp_reward: 15,
              frequency_days: 1,
              is_optional: true,
            },
          ],
        },
      ],
    },

    // 5. Pratiquer l’écoute active
    {
      title: 'Maîtriser l’écoute active',
      description:
        'L’écoute active — présence totale, reformulation, sans jugement — transforme toutes tes relations. Pratique-la délibérément chaque jour pendant trois semaines.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 21,
      xp_reward: 360,
      objectives: [
        {
          title: 'Apprendre les fondamentaux',
          description:
            'Étudie les techniques de base : contact visuel, reformulation, questions ouvertes, silence.',
          xp_reward: 120,
          stat_impacts: { social: 3, focus: 2, calme: 2 },
          tasks: [
            {
              title: 'Lire ou visionner une ressource sur l’écoute active',
              xp_reward: 30,
              frequency_days: 7,
            },
            {
              title: 'Reformuler ce qu’a dit ton interlocuteur dans une conversation',
              xp_reward: 20,
              frequency_days: 1,
            },
          ],
        },
        {
          title: 'Pratiquer au quotidien',
          description:
            'Applique l’écoute active dans une conversation chaque jour et note les effets sur tes échanges.',
          xp_reward: 240,
          stat_impacts: { social: 4, emotion: 3, calme: 2 },
          tasks: [
            {
              title: 'Avoir une conversation en pleine présence (téléphone rangé)',
              xp_reward: 30,
              frequency_days: 1,
            },
            {
              title: 'Poser au moins une question ouverte par conversation',
              xp_reward: 20,
              frequency_days: 1,
            },
            {
              title: 'Écrire une observation sur la qualité de l’échange',
              xp_reward: 15,
              frequency_days: 1,
              is_optional: true,
            },
          ],
        },
      ],
    },

    // 6. Un vrai moment de couple chaque semaine
    {
      title: 'Cultiver la flamme — un moment de couple par semaine',
      description:
        'Les relations s’étiolent par négligence, pas par malveillance. Protège chaque semaine un moment sacré, juste pour vous deux, sans distractions.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 30,
      xp_reward: 300,
      objectives: [
        {
          title: 'Planifier et vivre le rendez-vous de couple',
          description:
            'Organise chaque semaine une activité à deux pensée et préparée à l’avance.',
          xp_reward: 300,
          stat_impacts: { social: 4, emotion: 4 },
          tasks: [
            {
              title: 'Planifier le moment de couple de la semaine',
              xp_reward: 20,
              frequency_days: 7,
            },
            {
              title: 'Vivre le moment sans téléphone ni distraction',
              xp_reward: 50,
              frequency_days: 7,
            },
            {
              title: 'Exprimer quelque chose d’apprécié chez ton partenaire',
              xp_reward: 20,
              frequency_days: 7,
              is_optional: true,
            },
          ],
        },
      ],
    },

    // 7. Aller à trois rendez-vous (dating)
    {
      title: 'Oser le premier pas — trois rendez-vous en un mois',
      description:
        'Rencontrer quelqu’un de nouveau demande du courage et de la pratique. Fixe-toi l’objectif concret de trois rendez-vous sur trente jours.',
      type: 'secondary',
      difficulty: 'hard',
      duration_days: 30,
      xp_reward: 440,
      objectives: [
        {
          title: 'Se préparer mentalement et logistiquement',
          description:
            'Crée ou mets à jour ton profil de rencontre et prépare des sujets de conversation.',
          xp_reward: 140,
          stat_impacts: { social: 2, emotion: 2, calme: 1 },
          tasks: [
            {
              title: 'Mettre à jour ou créer un profil de rencontre attractif',
              xp_reward: 40,
              frequency_days: 365,
            },
            {
              title: 'Préparer cinq questions ouvertes pour briser la glace',
              xp_reward: 20,
              frequency_days: 365,
            },
            {
              title: 'Initier une conversation avec quelqu’un de nouveau',
              xp_reward: 30,
              frequency_days: 7,
            },
          ],
        },
        {
          title: 'Honorer les trois rendez-vous',
          description:
            'Aller au bout de trois rencontres réelles, même si l’anxiété est là.',
          xp_reward: 300,
          stat_impacts: { social: 5, emotion: 3 },
          tasks: [
            {
              title: 'Fixer la date d’un rendez-vous',
              xp_reward: 30,
              frequency_days: 365,
            },
            {
              title: 'Se rendre au rendez-vous',
              xp_reward: 60,
              frequency_days: 365,
            },
            {
              title: 'Débriefer honnêtement comment s’est passée la rencontre',
              xp_reward: 20,
              frequency_days: 365,
              is_optional: true,
            },
          ],
        },
      ],
    },

    // 8. S’engager dans le bénévolat
    {
      title: 'S’engager dans une cause — le bénévolat',
      description:
        'Donner de son temps à une cause plus grande que soi construit l’empathie, le sens et des liens sociaux forts. Rejoins une organisation et engage-toi régulièrement.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 30,
      xp_reward: 400,
      objectives: [
        {
          title: 'Trouver l’organisation et s’y inscrire',
          description:
            'Identifie une cause qui te tient à cœur, trouve l’association locale correspondante et inscris-toi.',
          xp_reward: 140,
          stat_impacts: { social: 3, emotion: 2 },
          tasks: [
            {
              title: 'Rechercher trois associations proches de tes valeurs',
              xp_reward: 20,
              frequency_days: 365,
            },
            {
              title: 'Contacter l’organisation choisie et t’inscrire',
              xp_reward: 40,
              frequency_days: 365,
            },
            {
              title: 'Assister à une réunion d’accueil ou de présentation',
              xp_reward: 40,
              frequency_days: 365,
            },
          ],
        },
        {
          title: 'Participer activement chaque semaine',
          description:
            'Consacre au moins deux heures par semaine à des actions bénévoles concrètes.',
          xp_reward: 260,
          stat_impacts: { social: 5, emotion: 3, discipline: 2 },
          tasks: [
            {
              title: 'Participer à une session bénévole cette semaine',
              xp_reward: 50,
              frequency_days: 7,
            },
            {
              title: 'Discuter avec au moins un bénéficiaire ou un autre bénévole',
              xp_reward: 20,
              frequency_days: 7,
            },
          ],
        },
      ],
    },

    // 9. Une bonne action par jour
    {
      title: 'Une bonne action chaque jour',
      description:
        'Les petits gestes changent les journées — les tiennes et celles des autres. Pendant vingt et un jours, fais au moins une bonne action intentionnelle chaque jour.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 300,
      objectives: [
        {
          title: 'Accomplir une bonne action quotidienne',
          description:
            'Chaque jour, accomplis au moins un acte bienveillant concret envers quelqu’un d’autre.',
          xp_reward: 300,
          stat_impacts: { social: 4, emotion: 3 },
          tasks: [
            {
              title: 'Accomplir la bonne action du jour',
              xp_reward: 25,
              frequency_days: 1,
            },
            {
              title: 'Noter la bonne action réalisée et la réaction observée',
              xp_reward: 15,
              frequency_days: 1,
              is_optional: true,
            },
          ],
        },
      ],
    },

    // 10. Organiser un dîner entre amis
    {
      title: 'Organiser un dîner entre amis',
      description:
        'Rassembler des gens autour d’une table est un des actes sociaux les plus puissants. Organise et anime un dîner qui réunit plusieurs amis.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 14,
      xp_reward: 340,
      objectives: [
        {
          title: 'Planifier le dîner',
          description:
            'Choisis les invités, fixe la date, prépare le menu et envoie les invitations.',
          xp_reward: 140,
          stat_impacts: { social: 3, discipline: 1 },
          tasks: [
            {
              title: 'Établir la liste des invités et fixer la date',
              xp_reward: 20,
              frequency_days: 365,
            },
            {
              title: 'Envoyer les invitations et confirmer la présence de chacun',
              xp_reward: 20,
              frequency_days: 365,
            },
            {
              title: 'Préparer le menu et faire les courses',
              xp_reward: 30,
              frequency_days: 365,
            },
          ],
        },
        {
          title: 'Organiser le dîner',
          description:
            'Accueille tes invités, prépare les plats et crée une atmosphère chaleureuse propice aux échanges.',
          xp_reward: 200,
          stat_impacts: { social: 5, emotion: 2, creativite: 1 },
          tasks: [
            {
              title: 'Cuisiner et accueillir les invités',
              xp_reward: 60,
              frequency_days: 365,
            },
            {
              title: 'Proposer un jeu ou une activité pour briser la glace',
              xp_reward: 30,
              frequency_days: 365,
              is_optional: true,
            },
            {
              title: 'Envoyer un message de remerciement à chaque invité le lendemain',
              xp_reward: 20,
              frequency_days: 365,
            },
          ],
        },
      ],
    },

    // 11. Repas en famille sans téléphone
    {
      title: 'Repas en famille sans écran',
      description:
        'Les repas de famille sont devenus des rendez-vous de cohabitation silencieuse. Pendant trois semaines, protège chaque repas familial des téléphones et des écrans.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 260,
      objectives: [
        {
          title: 'Instaurer la règle du repas sans téléphone',
          description:
            'Pose les règles avec la famille et respecte-les à chaque repas partagé.',
          xp_reward: 260,
          stat_impacts: { social: 4, emotion: 3, calme: 2 },
          tasks: [
            {
              title: 'Annoncer la règle à la famille et poser les téléphones hors de table',
              xp_reward: 30,
              frequency_days: 1,
            },
            {
              title: 'Poser une question à chacun pendant le repas',
              xp_reward: 20,
              frequency_days: 1,
            },
          ],
        },
      ],
    },

    // 12. Rejoindre un club ou une association
    {
      title: 'Rejoindre un club ou une association',
      description:
        'Les amitiés durables naissent d’activités partagées régulières. Rejoins un club ou une association et participe activement pendant un mois.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 30,
      xp_reward: 380,
      objectives: [
        {
          title: 'Trouver et rejoindre le groupe',
          description:
            'Identifie une activité ou une cause qui t’intéresse, trouve le club correspondant et assiste à ta première séance.',
          xp_reward: 140,
          stat_impacts: { social: 3, emotion: 2 },
          tasks: [
            {
              title: 'Rechercher les clubs ou associations disponibles dans ta zone',
              xp_reward: 20,
              frequency_days: 365,
            },
            {
              title: 'Assister à une première séance ou réunion d’essai',
              xp_reward: 50,
              frequency_days: 365,
            },
            {
              title: 'Engager la conversation avec au moins deux membres',
              xp_reward: 30,
              frequency_days: 365,
            },
          ],
        },
        {
          title: 'Participer régulièrement',
          description:
            'Reviens chaque semaine et implique-toi progressivement dans la vie du groupe.',
          xp_reward: 240,
          stat_impacts: { social: 5, discipline: 2 },
          tasks: [
            {
              title: 'Assister à la session hebdomadaire',
              xp_reward: 50,
              frequency_days: 7,
            },
            {
              title: 'Apporter une contribution ou une initiative au groupe',
              xp_reward: 30,
              frequency_days: 14,
              is_optional: true,
            },
          ],
        },
      ],
    },

    // 13. Rendre service à un voisin
    {
      title: 'Rendre service à un voisin',
      description:
        'Les voisins sont les étrangers les plus proches. Pendant quinze jours, cherche activement à rendre un service concret à ceux qui habitent près de toi.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 14,
      xp_reward: 220,
      objectives: [
        {
          title: 'Identifier les besoins et passer à l’action',
          description:
            'Parle à tes voisins pour découvrir comment tu peux aider et réalise au moins deux services concrets.',
          xp_reward: 220,
          stat_impacts: { social: 4, emotion: 2 },
          tasks: [
            {
              title: 'Engager une conversation avec un voisin et demander comment tu peux aider',
              xp_reward: 30,
              frequency_days: 365,
            },
            {
              title: 'Rendre un service concret à un voisin cette semaine',
              xp_reward: 50,
              frequency_days: 7,
            },
            {
              title: 'Laisser un petit mot ou message de bonne journée à un voisin',
              xp_reward: 20,
              frequency_days: 7,
              is_optional: true,
            },
          ],
        },
      ],
    },

    // 14. Oser demander de l’aide
    {
      title: 'Oser demander de l’aide',
      description:
        'Demander de l’aide n’est pas une faiblesse — c’est une compétence sociale. Pendant deux semaines, entraîne-toi à exprimer tes besoins et à accepter le soutien des autres.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 14,
      xp_reward: 280,
      objectives: [
        {
          title: 'Identifier et formuler ses besoins',
          description:
            'Chaque jour, identifie un domaine où tu as besoin d’aide et formule explicitement ta demande.',
          xp_reward: 160,
          stat_impacts: { social: 3, emotion: 3, calme: 1 },
          tasks: [
            {
              title: 'Identifier un besoin pour lequel tu pourrais demander de l’aide',
              xp_reward: 20,
              frequency_days: 1,
            },
            {
              title: 'Exprimer ta demande clairement à quelqu’un',
              xp_reward: 40,
              frequency_days: 1,
            },
          ],
        },
        {
          title: 'Accepter l’aide et en tirer des leçons',
          description:
            'Accueille l’aide reçue avec gratitude et observe comment cela renforce le lien.',
          xp_reward: 120,
          stat_impacts: { social: 2, emotion: 2 },
          tasks: [
            {
              title: 'Accepter l’aide proposée sans refuser par principe',
              xp_reward: 30,
              frequency_days: 1,
            },
            {
              title: 'Exprimer ta reconnaissance à la personne qui t’a aidé',
              xp_reward: 20,
              frequency_days: 1,
            },
          ],
        },
      ],
    },

    // 15. Poser une question profonde chaque jour
    {
      title: 'La question du jour — aller au fond des choses',
      description:
        'Les conversations de surface laissent les gens seuls ensemble. Pose chaque jour une vraie question à quelqu’un — une question qui invite à la réflexion et au partage.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 260,
      objectives: [
        {
          title: 'Poser une question profonde chaque jour',
          description:
            'Prépare et pose quotidiennement une question ouverte et sincère à une personne de ton entourage.',
          xp_reward: 260,
          stat_impacts: { social: 4, emotion: 2, focus: 2 },
          tasks: [
            {
              title: 'Préparer une question profonde pour aujourd’hui',
              xp_reward: 15,
              frequency_days: 1,
            },
            {
              title: 'Poser la question et écouter vraiment la réponse',
              xp_reward: 30,
              frequency_days: 1,
            },
            {
              title: 'Noter ce que cette réponse t’a appris ou touché',
              xp_reward: 15,
              frequency_days: 1,
              is_optional: true,
            },
          ],
        },
      ],
    },

    // 16. Aider un débutant (mentorat)
    {
      title: 'Devenir mentor — accompagner un débutant',
      description:
        'Transmettre ses connaissances à quelqu’un qui commence est l’une des formes d’aide les plus enrichissantes pour les deux parties. Identifie un débutant et accompagne-le pendant un mois.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 30,
      xp_reward: 400,
      objectives: [
        {
          title: 'Trouver et accueillir le mentoré',
          description:
            'Identifie un débutant dans un domaine où tu es compétent et établis la relation de mentorat.',
          xp_reward: 140,
          stat_impacts: { social: 3, emotion: 2 },
          tasks: [
            {
              title: 'Identifier un débutant à qui tu pourrais apporter quelque chose',
              xp_reward: 20,
              frequency_days: 365,
            },
            {
              title: 'Proposer ton aide et fixer une première session',
              xp_reward: 40,
              frequency_days: 365,
            },
            {
              title: 'Préparer le contenu ou les thèmes de la première session',
              xp_reward: 30,
              frequency_days: 365,
            },
          ],
        },
        {
          title: 'Accompagner régulièrement',
          description:
            'Anime une session de mentorat chaque semaine et ajuste ton approche aux besoins du mentoré.',
          xp_reward: 260,
          stat_impacts: { social: 4, emotion: 2, discipline: 2 },
          tasks: [
            {
              title: 'Animer une session de mentorat cette semaine',
              xp_reward: 50,
              frequency_days: 7,
            },
            {
              title: 'Recueillir un retour du mentoré sur ce qui l’a aidé',
              xp_reward: 25,
              frequency_days: 7,
            },
          ],
        },
      ],
    },

    // 17. Envoyer un message de remerciement par jour
    {
      title: 'Un message de gratitude chaque jour',
      description:
        'La gratitude exprimée renforce les liens et le bien-être des deux côtés. Pendant deux semaines, envoie chaque jour un message de remerciement sincère à quelqu’un.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 14,
      xp_reward: 220,
      objectives: [
        {
          title: 'Envoyer un remerciement sincère chaque jour',
          description:
            'Pense à quelqu’un pour qui tu es reconnaissant et envoie-lui un message personnalisé.',
          xp_reward: 220,
          stat_impacts: { social: 3, emotion: 4 },
          tasks: [
            {
              title: 'Identifier la personne à qui tu veux exprimer ta gratitude',
              xp_reward: 10,
              frequency_days: 1,
            },
            {
              title: 'Rédiger et envoyer un message sincère et spécifique',
              xp_reward: 30,
              frequency_days: 1,
            },
          ],
        },
      ],
    },

    // 18. Garder le contact — répondre à ses messages
    {
      title: 'Ne laisser aucun message sans réponse',
      description:
        'Les silences non voulus envoient un message clair — tu ne comptes pas. Pendant vingt et un jours, prends l’habitude de répondre à tous tes messages dans les 24 heures.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 240,
      objectives: [
        {
          title: 'Répondre à tous ses messages dans la journée',
          description:
            'Chaque soir, passe en revue tes messages non répondus et réponds à chacun de façon intentionnelle.',
          xp_reward: 240,
          stat_impacts: { social: 4, discipline: 2, emotion: 2 },
          tasks: [
            {
              title: 'Faire le tour de tes conversations en attente chaque soir',
              xp_reward: 15,
              frequency_days: 1,
            },
            {
              title: 'Répondre à chaque message non répondu de la journée',
              xp_reward: 25,
              frequency_days: 1,
            },
            {
              title: 'Envoyer un message proactif à quelqu’un dont tu n’as pas de nouvelles',
              xp_reward: 20,
              frequency_days: 7,
              is_optional: true,
            },
          ],
        },
      ],
    },
  ],

  meta: {
    'Apprendre la vie auprès des anciens': {
      themes: ['social', 'emotions', 'spirituality'],
      context: ['improve', 'challenge'],
      summary:
        'Connecte-toi à la sagesse des aînés en leur rendant visite chaque semaine et en recueillant leurs leçons de vie.',
    },
    'Garder le lien — un appel par semaine': {
      themes: ['social', 'emotions'],
      context: ['reset', 'improve'],
      summary:
        'Entretiens tes amitiés et liens familiaux en passant un appel vocal sincère chaque semaine.',
    },
    'Renouer avec un ami perdu de vue': {
      themes: ['social', 'emotions'],
      context: ['reset', 'improve'],
      summary:
        'Prends l’initiative de recontacter quelqu’un qui comptait pour toi et reconstruis le lien.',
    },
    'Exprimer son amour à ses proches': {
      themes: ['social', 'emotions'],
      context: ['improve', 'challenge'],
      summary:
        'Entraîne-toi à verbaliser ton affection chaque jour pour renforcer tes relations les plus précieuses.',
    },
    'Maîtriser l’écoute active': {
      themes: ['social', 'emotions', 'mind'],
      context: ['improve', 'challenge'],
      summary:
        'Transforme tes conversations en apprenant à écouter vraiment — présence totale, reformulation, sans jugement.',
    },
    'Cultiver la flamme — un moment de couple par semaine': {
      themes: ['social', 'emotions'],
      context: ['reset', 'improve'],
      summary:
        'Protège chaque semaine un moment sacré à deux pour entretenir la complicité et la connexion avec ton partenaire.',
    },
    'Oser le premier pas — trois rendez-vous en un mois': {
      themes: ['social', 'emotions'],
      context: ['reset', 'challenge'],
      summary:
        'Surmonte la peur du rejet et développe ta confiance sociale en honorant trois rendez-vous amoureux.',
    },
    'S’engager dans une cause — le bénévolat': {
      themes: ['social', 'emotions', 'discipline'],
      context: ['improve', 'challenge'],
      summary:
        'Rejoins une association et donne de ton temps chaque semaine à une cause qui dépasse ton quotidien.',
    },
    'Une bonne action chaque jour': {
      themes: ['social', 'emotions'],
      context: ['improve', 'challenge'],
      summary:
        'Développe ta bienveillance en accomplissant intentionnellement un geste généreux chaque jour pendant trois semaines.',
    },
    'Organiser un dîner entre amis': {
      themes: ['social', 'emotions', 'creative'],
      context: ['improve', 'reset'],
      summary:
        'Rassemble tes amis autour d’une table pour créer un moment de connexion authentique et mémorable.',
    },
    'Repas en famille sans écran': {
      themes: ['social', 'emotions', 'detox'],
      context: ['reset', 'improve'],
      summary:
        'Réinstaure de vraies conversations familiales en bannissant les téléphones pendant les repas pendant trois semaines.',
    },
    'Rejoindre un club ou une association': {
      themes: ['social', 'discipline'],
      context: ['reset', 'improve'],
      summary:
        'Tisse des amitiés durables en rejoignant un groupe d’activité ou une association et en y participant chaque semaine.',
    },
    'Rendre service à un voisin': {
      themes: ['social', 'emotions'],
      context: ['improve', 'reset'],
      summary:
        'Transforme tes voisins en alliés en cherchant activement à leur rendre des services concrets.',
    },
    'Oser demander de l’aide': {
      themes: ['social', 'emotions'],
      context: ['reset', 'improve'],
      summary:
        'Apprends à formuler tes besoins et à accepter le soutien des autres — une compétence sociale sous-estimée.',
    },
    'La question du jour — aller au fond des choses': {
      themes: ['social', 'emotions', 'mind'],
      context: ['improve', 'challenge'],
      summary:
        'Approfondis tes relations en posant chaque jour une question sincère qui invite au partage et à la réflexion.',
    },
    'Devenir mentor — accompagner un débutant': {
      themes: ['social', 'emotions', 'discipline'],
      context: ['improve', 'challenge'],
      summary:
        'Transmets tes connaissances à un débutant et découvre la richesse d’une relation de mentorat sur un mois.',
    },
    'Un message de gratitude chaque jour': {
      themes: ['social', 'emotions'],
      context: ['improve', 'reset'],
      summary:
        'Renforce tes liens et ton bien-être en exprimant chaque jour ta gratitude à une personne différente.',
    },
    'Ne laisser aucun message sans réponse': {
      themes: ['social', 'discipline'],
      context: ['reset', 'improve'],
      summary:
        'Prends l’habitude de répondre à tous tes messages dans les 24 heures pour montrer que les autres comptent pour toi.',
    },
  },
};
