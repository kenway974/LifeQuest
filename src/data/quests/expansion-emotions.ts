import type { QuestModule } from './types';

export const EMOTIONS_QUESTS: QuestModule = {
  quests: [
    {
      title: 'Immunisé au rejet',
      description:
        'Chaque jour, fais une demande que tu n’oses pas faire et accepte sereinement un refus. La rejection therapy transforme la peur du non en simple information.',
      type: 'secondary',
      difficulty: 'hard',
      duration_days: 30,
      xp_reward: 620,
      objectives: [
        {
          title: 'Essuyer un refus chaque jour',
          description:
            'Formule une demande susceptible d’être refusée — réduction en magasin, service inattendu, invitation spontanée — et note ta réaction émotionnelle après le non.',
          xp_reward: 320,
          stat_impacts: { emotion: 7, calme: 6, social: 5 },
          tasks: [
            {
              title: 'Faire une demande audacieuse',
              xp_reward: 30,
              frequency_days: 1,
            },
            {
              title: 'Écrire comment tu as vécu le refus (3 lignes)',
              xp_reward: 20,
              frequency_days: 1,
            },
            {
              title: 'Relire tes notes de la semaine et identifier une progression',
              xp_reward: 40,
              frequency_days: 7,
              is_optional: true,
            },
          ],
        },
        {
          title: 'Désensibilisation progressive',
          description:
            'Commence par des demandes à faible enjeu (demander l’heure à un passant) et monte graduellement vers des demandes inconfortables (négocier un prix, inviter un inconnu à parler).',
          xp_reward: 300,
          stat_impacts: { emotion: 6, discipline: 5, calme: 4 },
          tasks: [
            {
              title: 'Classer ta demande du jour sur une échelle de peur de 1 à 10',
              xp_reward: 15,
              frequency_days: 1,
            },
            {
              title: 'Tenter une demande d’un niveau au-dessus de ta zone de confort',
              xp_reward: 45,
              frequency_days: 3,
            },
          ],
        },
      ],
    },

    {
      title: 'Un inconnu, une conversation',
      description:
        'Parle à un inconnu chaque jour pendant 21 jours. Petits échanges ou vraies conversations, l’objectif est de sortir de l’anonymat urbain et de renforcer ta confiance sociale.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 21,
      xp_reward: 460,
      objectives: [
        {
          title: 'Engager la conversation avec un inconnu',
          description:
            'Adresse-toi à un inconnu — commerçant, voisin, passager — avec au moins une vraie phrase au-delà du bonjour. Note le contexte et ce que tu as ressenti.',
          xp_reward: 460,
          stat_impacts: { social: 8, emotion: 5, calme: 4 },
          tasks: [
            {
              title: 'Parler à un inconnu (plus d’une phrase)',
              xp_reward: 40,
              frequency_days: 1,
            },
            {
              title: 'Noter le lieu, le sujet et ton ressenti',
              xp_reward: 15,
              frequency_days: 1,
            },
            {
              title: 'Tenter une conversation de plus de 5 minutes',
              xp_reward: 50,
              frequency_days: 7,
              is_optional: true,
            },
          ],
        },
      ],
    },

    {
      title: 'L’art de demander et négocier',
      description:
        'Pendant 14 jours, entraîne-toi à demander des faveurs ou à négocier un tarif. La plupart des gens n’obtiennent pas ce qu’ils veulent simplement parce qu’ils ne demandent pas.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 14,
      xp_reward: 380,
      objectives: [
        {
          title: 'Demander ou négocier une fois par jour',
          description:
            'Demande une faveur à un collègue, négocie un prix, sollicite une prolongation de délai. L’issue importe moins que l’acte de demander.',
          xp_reward: 250,
          stat_impacts: { social: 6, emotion: 5, discipline: 4 },
          tasks: [
            {
              title: 'Formuler et faire une demande concrète',
              xp_reward: 35,
              frequency_days: 1,
            },
            {
              title: 'Préparer ta demande à l’avance (script de 2 phrases)',
              xp_reward: 20,
              frequency_days: 2,
            },
          ],
        },
        {
          title: 'Analyser ses succès et ses blocages',
          description:
            'En fin de semaine, identifie ce qui a fonctionné et ce qui t’a bloqué. Adapte ton approche pour la semaine suivante.',
          xp_reward: 130,
          stat_impacts: { emotion: 4, discipline: 5 },
          tasks: [
            {
              title: 'Bilan hebdomadaire : 3 demandes réussies, 1 leçon tirée',
              xp_reward: 60,
              frequency_days: 7,
            },
          ],
        },
      ],
    },

    {
      title: 'Exprimer ses besoins sans détour',
      description:
        'Pendant 21 jours, pratique la communication directe de tes besoins réels. Ni manipulation, ni passivité : des phrases claires à la première personne.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 21,
      xp_reward: 470,
      objectives: [
        {
          title: 'Formuler un besoin clairement chaque jour',
          description:
            'Identifie un besoin non exprimé et dis-le avec une phrase en "Je" — "J’ai besoin de silence pour me concentrer", "J’ai besoin de soutien ce soir".',
          xp_reward: 280,
          stat_impacts: { emotion: 7, social: 6, calme: 4 },
          tasks: [
            {
              title: 'Identifier un besoin non dit et l’exprimer à voix haute',
              xp_reward: 35,
              frequency_days: 1,
            },
            {
              title: 'Vérifier que ton interlocuteur a bien compris (reformulation)',
              xp_reward: 20,
              frequency_days: 1,
            },
          ],
        },
        {
          title: 'Renforcer la communication assertive',
          description:
            'Revois tes échanges de la semaine : as-tu cédé quand tu ne le voulais pas ? As-tu minimisé ton besoin ? Ajuste ton discours intérieur.',
          xp_reward: 190,
          stat_impacts: { discipline: 5, emotion: 5 },
          tasks: [
            {
              title: 'Auto-évaluation hebdomadaire de ton assertivité (note /10)',
              xp_reward: 50,
              frequency_days: 7,
            },
            {
              title: 'Rejouer mentalement une situation où tu aurais pu mieux t’exprimer',
              xp_reward: 30,
              frequency_days: 3,
              is_optional: true,
            },
          ],
        },
      ],
    },

    {
      title: 'Le pouvoir du non',
      description:
        'Apprendre à dire non sans culpabilité pendant 14 jours. Un refus posé et respectueux est une marque de respect envers toi-même et envers l’autre.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 14,
      xp_reward: 340,
      objectives: [
        {
          title: 'Dire non à au moins une demande par jour',
          description:
            'Chaque jour, identifie une demande — service rendu par obligation, invitation non désirée, tâche imposée — et refuse-la poliment mais fermement.',
          xp_reward: 220,
          stat_impacts: { emotion: 6, discipline: 6, calme: 4 },
          tasks: [
            {
              title: 'Refuser une demande avec une phrase courte et sans excuse excessive',
              xp_reward: 30,
              frequency_days: 1,
            },
            {
              title: 'Observer ta culpabilité après le refus (note de 0 à 10)',
              xp_reward: 15,
              frequency_days: 1,
            },
          ],
        },
        {
          title: 'Consolider la limite sans se justifier',
          description:
            'Entraîne-toi à maintenir ton refus si l’autre insiste, sans rentrer dans une longue justification.',
          xp_reward: 120,
          stat_impacts: { discipline: 5, emotion: 4 },
          tasks: [
            {
              title: 'Tenir ferme face à une deuxième tentative de persuasion',
              xp_reward: 45,
              frequency_days: 3,
            },
          ],
        },
      ],
    },

    {
      title: 'Cultiver l’auto-compassion',
      description:
        'Pendant 21 jours, remplace ton critique intérieur par une voix bienveillante. L’auto-compassion n’est pas de la faiblesse : c’est la base de la résilience durable.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 420,
      objectives: [
        {
          title: 'Parler à soi-même comme à un ami',
          description:
            'Chaque fois que tu te juges sévèrement, reformule la pensée comme si tu parlais à un ami en difficulté. Note la différence de ton et d’impact émotionnel.',
          xp_reward: 260,
          stat_impacts: { emotion: 8, calme: 6 },
          tasks: [
            {
              title: 'Identifier une autocritique de la journée et la reformuler avec douceur',
              xp_reward: 25,
              frequency_days: 1,
            },
            {
              title: 'Écrire trois choses que tu t’es bien gérées cette semaine',
              xp_reward: 35,
              frequency_days: 7,
            },
          ],
        },
        {
          title: 'Pratiquer la phrase de compassion',
          description:
            'En moment de détresse, utilise la formule en trois temps : reconnaître la souffrance, se rappeler que tout le monde souffre, s’offrir de la bienveillance.',
          xp_reward: 160,
          stat_impacts: { calme: 5, emotion: 5 },
          tasks: [
            {
              title: 'Prononcer la phrase de compassion lors d’un moment difficile',
              xp_reward: 40,
              frequency_days: 2,
            },
            {
              title: 'Méditation de 5 min sur l’auto-compassion (guided ou libre)',
              xp_reward: 30,
              frequency_days: 3,
              is_optional: true,
            },
          ],
        },
      ],
    },

    {
      title: 'Apprivoiser sa colère',
      description:
        'La colère est une émotion utile mal canalisée. Pendant 21 jours, apprends à reconnaître ses signaux précoces et à choisir ta réponse plutôt que de réagir.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 21,
      xp_reward: 450,
      objectives: [
        {
          title: 'Détecter la colère avant l’explosion',
          description:
            'Note chaque jour les tensions physiques (mâchoire, épaules, rythme cardiaque) qui annoncent la colère. Plus tu les repères tôt, plus tu as de marge pour choisir ta réaction.',
          xp_reward: 270,
          stat_impacts: { emotion: 8, calme: 7 },
          tasks: [
            {
              title: 'Décrire un signal physique de colère ressenti dans la journée',
              xp_reward: 20,
              frequency_days: 1,
            },
            {
              title: 'Pratiquer 3 respirations profondes dès la détection du signal',
              xp_reward: 25,
              frequency_days: 1,
            },
          ],
        },
        {
          title: 'Choisir sa réponse consciente',
          description:
            'Face à une situation irritante, prends 90 secondes avant de répondre. Note ensuite si ta réaction était choisie ou automatique.',
          xp_reward: 180,
          stat_impacts: { calme: 6, discipline: 5 },
          tasks: [
            {
              title: 'Appliquer la pause de 90 secondes lors d’un moment de tension',
              xp_reward: 45,
              frequency_days: 2,
            },
            {
              title: 'Analyse hebdomadaire : colères maîtrisées vs réactions automatiques',
              xp_reward: 40,
              frequency_days: 7,
            },
          ],
        },
      ],
    },

    {
      title: 'L’art du lâcher-prise',
      description:
        'Pendant 21 jours, identifie ce qui est hors de ton contrôle et pratique l’acceptation active. Lâcher prise n’est pas abandonner — c’est concentrer son énergie là où elle compte.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 21,
      xp_reward: 430,
      objectives: [
        {
          title: 'Distinguer ce qui dépend de toi et ce qui n’en dépend pas',
          description:
            'Chaque soir, note une situation de la journée en deux colonnes : ce que tu pouvais contrôler, ce que tu ne pouvais pas. Libère-toi mentalement de la seconde colonne.',
          xp_reward: 270,
          stat_impacts: { calme: 8, emotion: 6 },
          tasks: [
            {
              title: 'Exercice des deux colonnes (contrôlable / non contrôlable)',
              xp_reward: 25,
              frequency_days: 1,
            },
            {
              title: 'Prononcer mentalement "Je lâche prise sur X" pour chaque élément hors contrôle',
              xp_reward: 15,
              frequency_days: 1,
            },
          ],
        },
        {
          title: 'Cultiver l’acceptation active',
          description:
            'Choisir un domaine de vie où tu résistes encore à une réalité immuable et travailler à l’accepter sans la nier ni la subir passivement.',
          xp_reward: 160,
          stat_impacts: { calme: 5, emotion: 5, discipline: 3 },
          tasks: [
            {
              title: 'Journaling de 10 min sur un sujet de résistance intérieure',
              xp_reward: 40,
              frequency_days: 7,
            },
            {
              title: 'Méditation de pleine conscience de 10 min',
              xp_reward: 35,
              frequency_days: 3,
              is_optional: true,
            },
          ],
        },
      ],
    },

    {
      title: 'Une peur par jour',
      description:
        'Pendant 21 jours, affronte délibérément une peur — petite ou grande. La bravoure n’est pas l’absence de peur, c’est agir malgré elle.',
      type: 'secondary',
      difficulty: 'hard',
      duration_days: 21,
      xp_reward: 530,
      objectives: [
        {
          title: 'Planifier et affronter sa peur du jour',
          description:
            'Chaque matin, identifie une peur concrète à affronter dans la journée. Elle doit être réelle et inconfortable — pas symbolique. Fais-le, puis note ce qui s’est passé.',
          xp_reward: 340,
          stat_impacts: { emotion: 8, discipline: 7, calme: 5 },
          tasks: [
            {
              title: 'Nommer ta peur du jour et prévoir comment l’affronter',
              xp_reward: 15,
              frequency_days: 1,
            },
            {
              title: 'Affronter la peur identifiée',
              xp_reward: 45,
              frequency_days: 1,
            },
            {
              title: 'Écrire ce que tu as ressenti avant, pendant et après',
              xp_reward: 20,
              frequency_days: 1,
            },
          ],
        },
        {
          title: 'Dresser la carte de ses peurs',
          description:
            'En fin de parcours, liste tes 10 peurs principales et note lesquelles tu as déjà affrontées. Visualise le territoire qu’il te reste à explorer.',
          xp_reward: 190,
          stat_impacts: { emotion: 5, discipline: 4 },
          tasks: [
            {
              title: 'Cartographier ses 10 peurs principales avec un niveau d’intensité',
              xp_reward: 60,
              frequency_days: 365,
            },
          ],
        },
      ],
    },

    {
      title: 'Corps confiant, esprit confiant',
      description:
        'Pendant 14 jours, adopte consciemment un langage corporel de confiance : posture haute, gestuelle ouverte, voix posée. Le corps modifie l’état intérieur.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 14,
      xp_reward: 320,
      objectives: [
        {
          title: 'Adopter la posture de puissance au quotidien',
          description:
            'Dos droit, épaules en arrière, tête haute : intègre ces ajustements posturaux dans tes situations sociales. Commence par 2 minutes de power pose chaque matin.',
          xp_reward: 200,
          stat_impacts: { emotion: 6, calme: 5, social: 4 },
          tasks: [
            {
              title: '2 minutes de power pose avant une situation sociale',
              xp_reward: 20,
              frequency_days: 1,
            },
            {
              title: 'Vérifier et corriger ta posture 5 fois dans la journée',
              xp_reward: 20,
              frequency_days: 1,
            },
          ],
        },
        {
          title: 'Ancrer la gestuelle confiante',
          description:
            'Lors de chaque conversation, veille à ne pas croiser les bras, à occuper l’espace et à ralentir tes gestes. Note si les autres te perçoivent différemment.',
          xp_reward: 120,
          stat_impacts: { social: 5, emotion: 4 },
          tasks: [
            {
              title: 'Observer ton langage corporel lors d’un échange important',
              xp_reward: 30,
              frequency_days: 2,
            },
            {
              title: 'Demander un retour à un proche sur ta présence physique',
              xp_reward: 40,
              frequency_days: 7,
              is_optional: true,
            },
          ],
        },
      ],
    },

    {
      title: 'Contact visuel soutenu',
      description:
        'Le regard est le premier vecteur de confiance et de présence. Pendant 14 jours, entraîne-toi à maintenir un contact visuel naturel et ancré dans tes conversations.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 14,
      xp_reward: 300,
      objectives: [
        {
          title: 'Maintenir le regard sans détourner les yeux par réflexe',
          description:
            'Lors de chaque échange, vise 70 % de contact visuel. Ni regard fuyant, ni fixation — un regard calme et attentif qui dit "je suis là".',
          xp_reward: 300,
          stat_impacts: { social: 7, emotion: 5, calme: 4 },
          tasks: [
            {
              title: 'Compter le nombre de fois où tu détournes le regard par réflexe',
              xp_reward: 15,
              frequency_days: 1,
            },
            {
              title: 'Mener une conversation de 5 min avec un contact visuel conscient',
              xp_reward: 35,
              frequency_days: 1,
            },
            {
              title: 'Pratiquer le regard dans le miroir pendant 2 minutes',
              xp_reward: 20,
              frequency_days: 3,
              is_optional: true,
            },
          ],
        },
      ],
    },

    {
      title: 'Recevoir un compliment sans l’esquiver',
      description:
        'Pendant 14 jours, entraîne-toi à accueillir les compliments avec un simple merci sincère — sans te dévaloriser, sans renvoyer la balle, sans minimiser.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 14,
      xp_reward: 290,
      objectives: [
        {
          title: 'Accueillir chaque compliment avec grâce',
          description:
            'À chaque compliment reçu, réponds uniquement par "Merci, ça me touche" ou une formule sincère similaire. Note ta réaction intérieure : malaise, plaisir, soulagement.',
          xp_reward: 190,
          stat_impacts: { emotion: 7, calme: 5, social: 3 },
          tasks: [
            {
              title: 'Recevoir un compliment et répondre par un merci simple',
              xp_reward: 30,
              frequency_days: 1,
            },
            {
              title: 'Journaliser ta réaction émotionnelle après un compliment',
              xp_reward: 15,
              frequency_days: 2,
            },
          ],
        },
        {
          title: 'Créer des opportunités de recevoir',
          description:
            'Si tu ne reçois pas naturellement de compliments, partage un travail ou un acte dont tu es fier pour en provoquer un.',
          xp_reward: 100,
          stat_impacts: { social: 4, emotion: 4 },
          tasks: [
            {
              title: 'Partager quelque chose dont tu es fier pour recevoir un retour',
              xp_reward: 40,
              frequency_days: 5,
            },
          ],
        },
      ],
    },

    {
      title: 'Arrêter de se mesurer aux autres',
      description:
        'Pendant 21 jours, repère et interromps chaque comparaison sociale. Remplace le "il est mieux que moi" par une mesure de ta propre progression.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 21,
      xp_reward: 440,
      objectives: [
        {
          title: 'Intercepter la comparaison en temps réel',
          description:
            'Chaque fois que tu te compares à quelqu’un — en vrai ou sur les réseaux — note-le et remplace immédiatement par : "Quel progrès ai-je fait moi-même récemment ?"',
          xp_reward: 280,
          stat_impacts: { emotion: 8, calme: 6, discipline: 4 },
          tasks: [
            {
              title: 'Compter et noter les comparaisons de la journée',
              xp_reward: 20,
              frequency_days: 1,
            },
            {
              title: 'Remplacer chaque comparaison par une preuve de ta propre évolution',
              xp_reward: 25,
              frequency_days: 1,
            },
          ],
        },
        {
          title: 'Réduire les déclencheurs de comparaison',
          description:
            'Identifie les contextes qui amplifient la comparaison — réseaux sociaux, cercles de paires — et limite ton exposition volontairement.',
          xp_reward: 160,
          stat_impacts: { calme: 5, discipline: 5 },
          tasks: [
            {
              title: 'Réduire le temps sur les réseaux sociaux de 30 min ce jour',
              xp_reward: 30,
              frequency_days: 1,
            },
            {
              title: 'Bilan hebdomadaire : nombre de comparaisons en baisse ou en hausse',
              xp_reward: 40,
              frequency_days: 7,
            },
          ],
        },
      ],
    },

    {
      title: 'Lettre de pardon — libérer le poids du passé',
      description:
        'Pendant 14 jours, travaille à écrire une lettre de pardon sincère — à quelqu’un qui t’a blessé ou à toi-même. Le pardon est un cadeau que tu te fais avant tout.',
      type: 'secondary',
      difficulty: 'hard',
      duration_days: 14,
      xp_reward: 410,
      objectives: [
        {
          title: 'Explorer la blessure et identifier ce qu’on libère',
          description:
            'Avant d’écrire, prends le temps de comprendre exactement ce qui a été blessant, quels besoins n’ont pas été respectés, et ce que le pardon te rendrait.',
          xp_reward: 200,
          stat_impacts: { emotion: 8, calme: 5 },
          tasks: [
            {
              title: 'Journaling de 15 min sur la blessure sans censure',
              xp_reward: 40,
              frequency_days: 2,
            },
            {
              title: 'Nommer les besoins non respectés dans la situation',
              xp_reward: 30,
              frequency_days: 3,
            },
          ],
        },
        {
          title: 'Rédiger et conclure la lettre de pardon',
          description:
            'Écris une lettre complète : ce qui s’est passé, l’impact ressenti, ta décision de pardonner. Tu n’as pas à l’envoyer. Brûle-la, garde-la, ou envoie-la — tu choisis.',
          xp_reward: 210,
          stat_impacts: { emotion: 7, calme: 6 },
          tasks: [
            {
              title: 'Rédiger le premier jet de la lettre',
              xp_reward: 60,
              frequency_days: 365,
            },
            {
              title: 'Relire et finaliser la lettre trois jours après',
              xp_reward: 50,
              frequency_days: 365,
            },
            {
              title: 'Décider ce que tu fais de la lettre (envoyer, garder, brûler)',
              xp_reward: 40,
              frequency_days: 365,
            },
          ],
        },
      ],
    },

    {
      title: 'Cohérence cardiaque anti-stress',
      description:
        'Pendant 21 jours, pratique la cohérence cardiaque trois fois par jour. Six respirations par minute pendant cinq minutes : une technique validée scientifiquement pour réguler le système nerveux.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 390,
      objectives: [
        {
          title: 'Trois sessions de cohérence cardiaque par jour',
          description:
            'Matin, midi et soir : 5 minutes de respiration rythmée à 6 cycles/minute (5 sec inspire, 5 sec expire). Utilise une app ou un minuteur.',
          xp_reward: 260,
          stat_impacts: { calme: 8, emotion: 6 },
          tasks: [
            {
              title: 'Session du matin (5 min, 6 cycles/min)',
              xp_reward: 20,
              frequency_days: 1,
            },
            {
              title: 'Session de midi (5 min, 6 cycles/min)',
              xp_reward: 20,
              frequency_days: 1,
            },
            {
              title: 'Session du soir (5 min, 6 cycles/min)',
              xp_reward: 20,
              frequency_days: 1,
            },
          ],
        },
        {
          title: 'Observer l’effet sur le stress quotidien',
          description:
            'Note ton niveau de stress chaque soir sur 10. Compare avec la baseline de la première semaine pour mesurer l’impact de la pratique.',
          xp_reward: 130,
          stat_impacts: { calme: 5, emotion: 3 },
          tasks: [
            {
              title: 'Noter son niveau de stress du soir (0-10)',
              xp_reward: 10,
              frequency_days: 1,
            },
            {
              title: 'Graphique hebdomadaire de l’évolution du stress',
              xp_reward: 40,
              frequency_days: 7,
              is_optional: true,
            },
          ],
        },
      ],
    },

    {
      title: 'Célébrer chaque victoire, même petite',
      description:
        'Pendant 21 jours, identifie et célèbre chaque victoire quotidienne. Le cerveau apprend à chercher le succès là où il est programmé à chercher l’échec.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 380,
      objectives: [
        {
          title: 'Recenser et célébrer ses victoires du jour',
          description:
            'Chaque soir, note au moins 3 victoires — aussi petites soient-elles. "J’ai fait ma session de sport", "J’ai dit non une fois", "Je n’ai pas procrastiné". Fais-les exister.',
          xp_reward: 240,
          stat_impacts: { emotion: 7, discipline: 5, calme: 4 },
          tasks: [
            {
              title: 'Lister 3 victoires de la journée avant de dormir',
              xp_reward: 25,
              frequency_days: 1,
            },
            {
              title: 'Célébrer une victoire de façon concrète (appel à un proche, récompense symbolique)',
              xp_reward: 20,
              frequency_days: 2,
            },
          ],
        },
        {
          title: 'Construire un registre de ses réussites',
          description:
            'En fin de semaine, relis tes victoires de la semaine et identifie un pattern — dans quel domaine es-tu le plus régulier ?',
          xp_reward: 140,
          stat_impacts: { emotion: 4, discipline: 4 },
          tasks: [
            {
              title: 'Bilan hebdomadaire : quelle est ta plus belle victoire de la semaine ?',
              xp_reward: 50,
              frequency_days: 7,
            },
          ],
        },
      ],
    },

    {
      title: 'Le sourire comme première arme sociale',
      description:
        'Pendant 14 jours, souris intentionnellement à chaque personne que tu croises. Le sourire sincère désarme, connecte et modifie l’état émotionnel — le tien et celui de l’autre.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 14,
      xp_reward: 280,
      objectives: [
        {
          title: 'Sourire à chaque personne croisée dans la journée',
          description:
            'Dès qu’un regard est établi — dans la rue, au bureau, en caisse — offre un sourire franc. Observe les réactions et ton propre état après une journée de cette pratique.',
          xp_reward: 200,
          stat_impacts: { social: 7, emotion: 5, calme: 3 },
          tasks: [
            {
              title: 'Sourire à au moins 10 personnes dans la journée',
              xp_reward: 25,
              frequency_days: 1,
            },
            {
              title: 'Noter la réaction la plus mémorable de la journée',
              xp_reward: 15,
              frequency_days: 1,
            },
          ],
        },
        {
          title: 'Sourire sincère vs sourire poli',
          description:
            'Apprends à distinguer ton sourire de façade de ton sourire authentique (sourire de Duchenne : yeux plissés). Pratique devant un miroir.',
          xp_reward: 80,
          stat_impacts: { emotion: 3, social: 3 },
          tasks: [
            {
              title: 'Entraîner le sourire de Duchenne 2 min devant le miroir',
              xp_reward: 20,
              frequency_days: 3,
              is_optional: true,
            },
          ],
        },
      ],
    },

    {
      title: 'Nommer ses émotions à voix haute',
      description:
        'Pendant 21 jours, pratique le "name it to tame it" : nommer précisément l’émotion ressentie pour en diminuer l’intensité et reprendre le pouvoir sur elle.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 410,
      objectives: [
        {
          title: 'Étiqueter chaque émotion significative de la journée',
          description:
            'Dès qu’une émotion notable apparaît — anxiété avant une réunion, joie inattendue, irritation — nomme-la précisément. "Je ressens de la frustration" vaut mieux que "je me sens mal".',
          xp_reward: 260,
          stat_impacts: { emotion: 8, calme: 7 },
          tasks: [
            {
              title: 'Nommer 3 émotions ressenties dans la journée avec précision',
              xp_reward: 25,
              frequency_days: 1,
            },
            {
              title: 'Utiliser la roue des émotions pour affiner le vocabulaire',
              xp_reward: 15,
              frequency_days: 2,
            },
          ],
        },
        {
          title: 'Accueillir l’émotion sans la fuir ni s’y noyer',
          description:
            'Après avoir nommé l’émotion, reste 60 secondes avec elle — sans agir, sans fuir, sans te distraire. Observe où elle se loge dans ton corps et comment elle évolue.',
          xp_reward: 150,
          stat_impacts: { calme: 6, emotion: 5 },
          tasks: [
            {
              title: 'Pratiquer la présence à l’émotion pendant 60 secondes',
              xp_reward: 35,
              frequency_days: 1,
            },
            {
              title: 'Journaling de fin de semaine : quelle émotion dominait, qu’en fais-tu ?',
              xp_reward: 45,
              frequency_days: 7,
            },
          ],
        },
      ],
    },
  ],

  meta: {
    'Immunisé au rejet': {
      themes: ['emotions', 'social', 'discipline'],
      context: ['challenge', 'improve'],
      summary:
        'Fais une demande audacieuse chaque jour pendant 30 jours pour transformer la peur du rejet en simple information.',
    },
    'Un inconnu, une conversation': {
      themes: ['social', 'emotions'],
      context: ['improve', 'challenge'],
      summary:
        'Parle à un inconnu chaque jour pour briser l’anonymat du quotidien et muscler ta confiance sociale.',
    },
    'L’art de demander et négocier': {
      themes: ['social', 'emotions', 'discipline'],
      context: ['improve', 'challenge'],
      summary:
        'Entraîne-toi à demander des faveurs et à négocier pour obtenir davantage de ce que tu veux dans la vie.',
    },
    'Exprimer ses besoins sans détour': {
      themes: ['emotions', 'social'],
      context: ['improve', 'reset'],
      summary:
        'Communique tes besoins réels avec des phrases claires à la première personne pendant 21 jours.',
    },
    'Le pouvoir du non': {
      themes: ['emotions', 'discipline'],
      context: ['reset', 'improve'],
      summary:
        'Apprends à refuser ce qui ne te convient pas sans culpabilité — un non posé est une marque de respect envers toi-même.',
    },
    'Cultiver l’auto-compassion': {
      themes: ['emotions', 'mind'],
      context: ['reset', 'improve'],
      summary:
        'Remplace ton critique intérieur par une voix bienveillante pour bâtir une résilience durable.',
    },
    'Apprivoiser sa colère': {
      themes: ['emotions', 'mind', 'discipline'],
      context: ['reset', 'improve'],
      summary:
        'Détecte les signaux de colère avant l’explosion et apprends à choisir ta réponse plutôt que de réagir.',
    },
    'L’art du lâcher-prise': {
      themes: ['emotions', 'mind', 'spirituality'],
      context: ['reset', 'improve'],
      summary:
        'Concentre ton énergie sur ce que tu contrôles et libère-toi mentalement du reste pendant 21 jours.',
    },
    'Une peur par jour': {
      themes: ['emotions', 'discipline', 'mind'],
      context: ['challenge', 'improve'],
      summary:
        'Affronte une peur concrète chaque jour pendant 21 jours pour agrandir progressivement ta zone de confort.',
    },
    'Corps confiant, esprit confiant': {
      themes: ['emotions', 'social', 'body'],
      context: ['improve', 'challenge'],
      summary:
        'Adopte consciemment une posture et une gestuelle de confiance pour transformer ton état mental de l’extérieur vers l’intérieur.',
    },
    'Contact visuel soutenu': {
      themes: ['social', 'emotions'],
      context: ['improve', 'challenge'],
      summary:
        'Maintiens un regard calme et présent dans chaque conversation pendant 14 jours pour projeter confiance et attention.',
    },
    'Recevoir un compliment sans l’esquiver': {
      themes: ['emotions', 'social'],
      context: ['reset', 'improve'],
      summary:
        'Accueille chaque compliment avec un merci sincère sans te dévaloriser ni esquiver — l’estime de soi commence là.',
    },
    'Arrêter de se mesurer aux autres': {
      themes: ['emotions', 'mind', 'discipline'],
      context: ['reset', 'improve'],
      summary:
        'Repère et interromps chaque comparaison sociale pour recentrer ton énergie sur ta propre progression.',
    },
    'Lettre de pardon — libérer le poids du passé': {
      themes: ['emotions', 'spirituality', 'mind'],
      context: ['reset'],
      summary:
        'Rédige une lettre de pardon pour te libérer d’une blessure passée — envoie-la ou non, la libération est dans l’écriture.',
    },
    'Cohérence cardiaque anti-stress': {
      themes: ['emotions', 'mind', 'body'],
      context: ['reset', 'improve'],
      summary:
        'Pratique la cohérence cardiaque trois fois par jour pendant 21 jours pour réguler ton système nerveux et réduire le stress.',
    },
    'Célébrer chaque victoire, même petite': {
      themes: ['emotions', 'discipline', 'mind'],
      context: ['reset', 'improve'],
      summary:
        'Recense et célèbre tes victoires quotidiennes pour reprogrammer ton cerveau à chercher le succès.',
    },
    'Le sourire comme première arme sociale': {
      themes: ['social', 'emotions'],
      context: ['improve', 'reset'],
      summary:
        'Souris intentionnellement à chaque personne croisée pendant 14 jours pour créer connexion et bonne humeur contagieuse.',
    },
    'Nommer ses émotions à voix haute': {
      themes: ['emotions', 'mind'],
      context: ['reset', 'improve'],
      summary:
        'Nomme précisément chaque émotion ressentie pour en diminuer l’intensité et reprendre le pouvoir sur ta vie intérieure.',
    },
  },
};
