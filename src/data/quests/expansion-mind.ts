import type { QuestModule } from './types';

export const MIND_QUESTS: QuestModule = {
  quests: [
    {
      title: 'Dévorer 4 livres en un mois',
      description: 'Lire quatre livres complets en trente jours pour ancrer l’habitude de lecture intensive et nourrir ton intellect.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 30,
      xp_reward: 500,
      objectives: [
        {
          title: 'Lire quatre livres jusqu’au bout',
          description: 'Terminer un livre par semaine, quel que soit le genre, et noter les idées clés de chacun.',
          xp_reward: 300,
          stat_impacts: { focus: 6, discipline: 5, creativite: 3 },
          tasks: [
            { title: 'Lire au moins 30 pages aujourd’hui', xp_reward: 20 },
            { title: 'Terminer un livre cette semaine', xp_reward: 50, frequency_days: 7 },
            { title: 'Écrire 3 idées retenues par livre', xp_reward: 30, frequency_days: 7 },
          ],
        },
        {
          title: 'Créer un environnement de lecture',
          description: 'Aménager un espace dédié et éliminer les distractions pendant les sessions de lecture.',
          xp_reward: 200,
          stat_impacts: { discipline: 4, calme: 4 },
          tasks: [
            { title: 'Définir un créneau quotidien de lecture (30 min minimum)', xp_reward: 15 },
            { title: 'Lire sans téléphone pendant toute la session', xp_reward: 20 },
            { title: 'Rédiger une synthèse des 4 livres', xp_reward: 40, frequency_days: 30, is_optional: true },
          ],
        },
      ],
    },
    {
      title: '15 minutes de langue étrangère chaque jour',
      description: 'Pratiquer une langue étrangère pendant 15 minutes par jour pour bâtir un vocabulaire solide et une oreille affûtée.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 30,
      xp_reward: 400,
      objectives: [
        {
          title: 'Pratiquer la langue quotidiennement',
          description: 'Enchaîner 30 jours consécutifs de pratique de la langue cible sans briser la chaîne.',
          xp_reward: 250,
          stat_impacts: { focus: 5, discipline: 6 },
          tasks: [
            { title: 'Faire une session de 15 min (application ou méthode)', xp_reward: 20 },
            { title: 'Écouter un audio natif de 5 min dans la langue cible', xp_reward: 15 },
          ],
        },
        {
          title: 'Consolider le vocabulaire acquis',
          description: 'Réviser régulièrement les mots appris pour les ancrer en mémoire à long terme.',
          xp_reward: 150,
          stat_impacts: { focus: 4, discipline: 3 },
          tasks: [
            { title: 'Réviser les mots de la semaine avec des flashcards', xp_reward: 25, frequency_days: 7 },
            { title: 'Écrire 5 phrases originales avec les nouveaux mots', xp_reward: 20, frequency_days: 7, is_optional: true },
          ],
        },
      ],
    },
    {
      title: 'Mémoriser un poème par cœur',
      description: 'Apprendre un poème d’au moins 20 vers mot pour mot, et le réciter sans faute à la fin des 14 jours.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 14,
      xp_reward: 280,
      objectives: [
        {
          title: 'Mémoriser le poème strophe par strophe',
          description: 'Découper le poème en blocs et mémoriser chaque bloc avant de passer au suivant.',
          xp_reward: 180,
          stat_impacts: { focus: 6, discipline: 4, calme: 3 },
          tasks: [
            { title: 'Lire le poème à voix haute trois fois', xp_reward: 10 },
            { title: 'Mémoriser une strophe sans aide', xp_reward: 25 },
            { title: 'Réciter le poème entier de mémoire', xp_reward: 50, frequency_days: 14 },
          ],
        },
        {
          title: 'Comprendre le sens et le rythme',
          description: 'Analyser les images et le rythme du poème pour faciliter la mémorisation.',
          xp_reward: 100,
          stat_impacts: { focus: 3, creativite: 4 },
          tasks: [
            { title: 'Réécrire le poème de mémoire sur papier', xp_reward: 30, frequency_days: 7 },
          ],
        },
      ],
    },
    {
      title: 'Maîtriser le calcul mental',
      description: 'Entraîner ton cerveau à calculer rapidement sans calculatrice grâce à des exercices quotidiens progressifs.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 21,
      xp_reward: 380,
      objectives: [
        {
          title: 'Pratiquer le calcul mental chaque jour',
          description: 'Effectuer des exercices de calcul mental couvrant addition, soustraction, multiplication et division.',
          xp_reward: 250,
          stat_impacts: { focus: 7, discipline: 5 },
          tasks: [
            { title: 'Faire 20 opérations de calcul mental chronométrées', xp_reward: 25 },
            { title: 'Résoudre 5 calculs complexes à 3 chiffres', xp_reward: 30 },
          ],
        },
        {
          title: 'Appliquer dans la vie réelle',
          description: 'Utiliser le calcul mental dans des situations du quotidien pour ancrer la compétence.',
          xp_reward: 130,
          stat_impacts: { focus: 4, discipline: 3 },
          tasks: [
            { title: 'Calculer mentalement au supermarché ou au restaurant', xp_reward: 20 },
            { title: 'Faire un test de vitesse et battre son record de la semaine', xp_reward: 35, frequency_days: 7, is_optional: true },
          ],
        },
      ],
    },
    {
      title: 'Taper sans regarder le clavier',
      description: 'Apprendre la dactylographie aveugle pour écrire plus vite et libérer ton attention de l’écran.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 21,
      xp_reward: 350,
      objectives: [
        {
          title: 'S’entraîner à la frappe aveugle quotidiennement',
          description: 'Utiliser un logiciel de dactylographie et progresser de la position de base vers des textes complets.',
          xp_reward: 220,
          stat_impacts: { focus: 5, discipline: 6 },
          tasks: [
            { title: 'Faire 15 min d’exercices sur un logiciel de typing', xp_reward: 20 },
            { title: 'Taper un texte de 100 mots sans regarder le clavier', xp_reward: 30 },
          ],
        },
        {
          title: 'Mesurer et améliorer sa vitesse',
          description: 'Suivre sa progression en mots par minute et viser une amélioration constante.',
          xp_reward: 130,
          stat_impacts: { focus: 4, discipline: 4 },
          tasks: [
            { title: 'Faire un test de vitesse et noter le score hebdomadaire', xp_reward: 25, frequency_days: 7 },
            { title: 'Rédiger un message professionnel complet sans regarder le clavier', xp_reward: 20, frequency_days: 7 },
          ],
        },
      ],
    },
    {
      title: 'Un article de culture générale par jour',
      description: 'Lire un article de fond sur un sujet de culture générale chaque jour pendant 21 jours pour élargir ton horizon.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 300,
      objectives: [
        {
          title: 'Lire et retenir un article chaque jour',
          description: 'Choisir des sujets variés (science, histoire, géographie, philosophie) et noter l’essentiel.',
          xp_reward: 200,
          stat_impacts: { focus: 5, discipline: 4, creativite: 3 },
          tasks: [
            { title: 'Lire un article de qualité (Wikipedia, Cairn, presse sérieuse)', xp_reward: 20 },
            { title: 'Résumer l’article en 3 phrases dans un carnet', xp_reward: 15 },
          ],
        },
        {
          title: 'Consolider les savoirs acquis',
          description: 'Relier les nouvelles connaissances à ce que tu sais déjà pour former un réseau de savoir solide.',
          xp_reward: 100,
          stat_impacts: { focus: 4, creativite: 3 },
          tasks: [
            { title: 'Relier 3 articles de la semaine dans une note commune', xp_reward: 30, frequency_days: 7, is_optional: true },
          ],
        },
      ],
    },
    {
      title: 'Un podcast éducatif chaque jour',
      description: 'Écouter un épisode de podcast éducatif par jour pendant 21 jours pour apprendre en mobilité.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 280,
      objectives: [
        {
          title: 'Écouter un épisode éducatif quotidiennement',
          description: 'Sélectionner des podcasts de qualité et écouter un épisode complet chaque jour.',
          xp_reward: 180,
          stat_impacts: { focus: 5, discipline: 3 },
          tasks: [
            { title: 'Écouter un épisode de podcast éducatif (20 min minimum)', xp_reward: 20 },
            { title: 'Noter 2 idées clés retenues de l’épisode', xp_reward: 15 },
          ],
        },
        {
          title: 'Approfondir les sujets marquants',
          description: 'Choisir un sujet de la semaine et le creuser davantage avec une source complémentaire.',
          xp_reward: 100,
          stat_impacts: { focus: 4, creativite: 3 },
          tasks: [
            { title: 'Approfondir le sujet le plus intéressant de la semaine', xp_reward: 30, frequency_days: 7 },
          ],
        },
      ],
    },
    {
      title: 'Apprendre à jouer aux échecs',
      description: 'Maîtriser les règles, les ouvertures classiques et les tactiques de base pour jouer une partie décente aux échecs.',
      type: 'secondary',
      difficulty: 'hard',
      duration_days: 30,
      xp_reward: 500,
      objectives: [
        {
          title: 'Apprendre les règles et les fondamentaux',
          description: 'Maîtriser les mouvements de chaque pièce, les règles spéciales et les fins de partie classiques.',
          xp_reward: 200,
          stat_impacts: { focus: 7, discipline: 4 },
          tasks: [
            { title: 'Étudier les mouvements et règles de base (30 min)', xp_reward: 20 },
            { title: 'Résoudre 5 puzzles tactiques du jour', xp_reward: 25 },
          ],
        },
        {
          title: 'Jouer et progresser en pratique',
          description: 'Disputer des parties régulières et analyser ses erreurs pour progresser concrètement.',
          xp_reward: 300,
          stat_impacts: { focus: 6, discipline: 5, calme: 4 },
          tasks: [
            { title: 'Jouer une partie complète (en ligne ou en présentiel)', xp_reward: 30 },
            { title: 'Analyser ses erreurs après chaque partie', xp_reward: 20 },
            { title: 'Étudier une ouverture classique cette semaine', xp_reward: 40, frequency_days: 7, is_optional: true },
          ],
        },
      ],
    },
    {
      title: 'Terminer un cours en ligne (MOOC)',
      description: 'Compléter un cours en ligne sur une plateforme éducative (Coursera, edX, OpenClassrooms…) jusqu’à la dernière leçon.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 30,
      xp_reward: 480,
      objectives: [
        {
          title: 'Suivre le cours de façon régulière',
          description: 'Avancer d’au moins deux modules par semaine et ne pas laisser le cours en suspens.',
          xp_reward: 300,
          stat_impacts: { focus: 6, discipline: 7 },
          tasks: [
            { title: 'Regarder au moins un module aujourd’hui', xp_reward: 20 },
            { title: 'Prendre des notes structurées pendant chaque module', xp_reward: 15 },
            { title: 'Compléter tous les quiz et exercices de la semaine', xp_reward: 35, frequency_days: 7 },
          ],
        },
        {
          title: 'Valider et consolider les acquis',
          description: 'Obtenir le certificat ou réaliser le projet final pour confirmer la maîtrise du sujet.',
          xp_reward: 180,
          stat_impacts: { focus: 4, discipline: 5, creativite: 3 },
          tasks: [
            { title: 'Remettre le projet ou l’examen final du cours', xp_reward: 60, frequency_days: 30 },
          ],
        },
      ],
    },
    {
      title: 'S’initier à la calligraphie',
      description: 'Apprendre les bases de la calligraphie latine ou asiatique en pratiquant chaque jour pendant 21 jours.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 310,
      objectives: [
        {
          title: 'Pratiquer la calligraphie quotidiennement',
          description: 'Reproduire des lettres et des mots avec soin en respectant les proportions et les angles.',
          xp_reward: 200,
          stat_impacts: { focus: 6, calme: 5, creativite: 4 },
          tasks: [
            { title: 'S’exercer 20 min avec plume ou pinceau', xp_reward: 20 },
            { title: 'Travailler une lettre difficile jusqu’à la maîtriser', xp_reward: 25 },
          ],
        },
        {
          title: 'Créer une œuvre calligraphique complète',
          description: 'Réaliser une citation ou un texte court en calligraphie soignée à offrir ou encadrer.',
          xp_reward: 110,
          stat_impacts: { creativite: 5, calme: 4 },
          tasks: [
            { title: 'Calligraphier une citation complète en version finale', xp_reward: 50, frequency_days: 21 },
          ],
        },
      ],
    },
    {
      title: 'Apprendre l’alphabet morse',
      description: 'Mémoriser les 26 lettres et 10 chiffres en morse et être capable de décoder un message simple.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 14,
      xp_reward: 260,
      objectives: [
        {
          title: 'Mémoriser l’alphabet morse lettre par lettre',
          description: 'Apprendre par blocs de 5 lettres par jour en utilisant des mnémotechniques et la répétition.',
          xp_reward: 160,
          stat_impacts: { focus: 6, discipline: 5 },
          tasks: [
            { title: 'Apprendre 5 nouveaux caractères morse aujourd’hui', xp_reward: 20 },
            { title: 'Réviser tous les caractères vus jusqu’ici', xp_reward: 15 },
          ],
        },
        {
          title: 'Décoder et encoder des messages',
          description: 'S’entraîner à lire et écrire de vrais messages en morse pour valider la maîtrise.',
          xp_reward: 100,
          stat_impacts: { focus: 5, discipline: 3 },
          tasks: [
            { title: 'Décoder un message morse de 10 mots sans aide', xp_reward: 40, frequency_days: 7 },
            { title: 'Encoder un court message en morse de mémoire', xp_reward: 30, frequency_days: 14 },
          ],
        },
      ],
    },
    {
      title: 'Maîtriser le mind mapping',
      description: 'Apprendre à créer des cartes mentales efficaces pour organiser ses idées, mémoriser et planifier.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 14,
      xp_reward: 270,
      objectives: [
        {
          title: 'Créer une carte mentale chaque jour',
          description: 'Réaliser une mind map sur un sujet différent chaque jour en appliquant les règles visuelles fondamentales.',
          xp_reward: 170,
          stat_impacts: { focus: 5, creativite: 6, discipline: 3 },
          tasks: [
            { title: 'Créer une mind map sur un sujet du jour (papier ou logiciel)', xp_reward: 25 },
            { title: 'Utiliser couleurs, icônes et branches hiérarchisées', xp_reward: 15 },
          ],
        },
        {
          title: 'Appliquer le mind mapping à un projet réel',
          description: 'Utiliser une carte mentale pour structurer un projet personnel ou professionnel concret.',
          xp_reward: 100,
          stat_impacts: { focus: 5, creativite: 4 },
          tasks: [
            { title: 'Cartographier un projet ou objectif personnel en détail', xp_reward: 40, frequency_days: 14 },
          ],
        },
      ],
    },
    {
      title: 'S’initier à la lecture rapide',
      description: 'Apprendre les techniques de lecture rapide (balayage, chunking) pour doubler sa vitesse de lecture en 14 jours.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 14,
      xp_reward: 290,
      objectives: [
        {
          title: 'Pratiquer les techniques de lecture rapide',
          description: 'S’exercer quotidiennement sur des textes variés en appliquant balayage, RSVP et suppression de subvocalisation.',
          xp_reward: 180,
          stat_impacts: { focus: 7, discipline: 5 },
          tasks: [
            { title: 'Faire 15 min d’entraînement à la lecture rapide', xp_reward: 25 },
            { title: 'Lire un article en appliquant la méthode et mesurer le temps', xp_reward: 20 },
          ],
        },
        {
          title: 'Mesurer sa progression en vitesse et compréhension',
          description: 'Évaluer sa vitesse de lecture (mots/min) et son taux de compréhension en début et fin de quête.',
          xp_reward: 110,
          stat_impacts: { focus: 5, discipline: 4 },
          tasks: [
            { title: 'Faire un test de vitesse + compréhension et noter le score', xp_reward: 30, frequency_days: 7 },
            { title: 'Comparer score final vs score initial', xp_reward: 40, frequency_days: 14, is_optional: true },
          ],
        },
      ],
    },
    {
      title: 'Apprendre les capitales du monde',
      description: 'Mémoriser les capitales des 195 pays du monde grâce à des révisions régulières et des techniques mnémotechniques.',
      type: 'secondary',
      difficulty: 'hard',
      duration_days: 21,
      xp_reward: 420,
      objectives: [
        {
          title: 'Mémoriser les capitales par continent',
          description: 'Travailler continent par continent, 10 à 15 capitales par jour, en révisant les précédentes.',
          xp_reward: 270,
          stat_impacts: { focus: 7, discipline: 6 },
          tasks: [
            { title: 'Apprendre 10 nouvelles capitales aujourd’hui', xp_reward: 20 },
            { title: 'Réviser toutes les capitales du continent en cours', xp_reward: 20 },
            { title: 'Faire un quiz complet sur un continent terminé', xp_reward: 30, frequency_days: 7 },
          ],
        },
        {
          title: 'Valider la mémorisation globale',
          description: 'Réussir un quiz complet de 50 capitales tirées au hasard dans le monde entier.',
          xp_reward: 150,
          stat_impacts: { focus: 5, discipline: 4 },
          tasks: [
            { title: 'Réussir un quiz de 50 capitales aléatoires (80 % minimum)', xp_reward: 60, frequency_days: 21 },
          ],
        },
      ],
    },
    {
      title: 'Un documentaire par semaine',
      description: 'Regarder un documentaire sérieux chaque semaine pendant un mois pour cultiver sa curiosité et approfondir des sujets de fond.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 30,
      xp_reward: 280,
      objectives: [
        {
          title: 'Regarder et analyser un documentaire par semaine',
          description: 'Choisir des documentaires sur des thèmes variés et en tirer des réflexions personnelles.',
          xp_reward: 180,
          stat_impacts: { focus: 4, creativite: 4, calme: 3 },
          tasks: [
            { title: 'Regarder un documentaire (60 min minimum) cette semaine', xp_reward: 30, frequency_days: 7 },
            { title: 'Écrire 5 lignes de réflexion après le visionnage', xp_reward: 20, frequency_days: 7 },
          ],
        },
        {
          title: 'Approfondir un sujet découvert',
          description: 'Choisir le documentaire le plus marquant du mois et lire un article ou livre complémentaire.',
          xp_reward: 100,
          stat_impacts: { focus: 4, discipline: 3 },
          tasks: [
            { title: 'Lire un article ou chapitre approfondi sur le sujet du mois', xp_reward: 40, frequency_days: 30, is_optional: true },
          ],
        },
      ],
    },
    {
      title: 'Un mot rare par jour — enrichir son vocabulaire',
      description: 'Apprendre un mot rare ou précis chaque jour et l’employer activement dans la semaine pour enrichir ton français.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 270,
      objectives: [
        {
          title: 'Découvrir et mémoriser un mot rare chaque jour',
          description: 'Chercher la définition, l’étymologie et des exemples d’emploi de chaque mot du jour.',
          xp_reward: 170,
          stat_impacts: { focus: 5, discipline: 4, creativite: 3 },
          tasks: [
            { title: 'Trouver et noter un mot rare avec définition et exemple', xp_reward: 15 },
            { title: 'Employer le mot du jour à l’écrit ou à l’oral', xp_reward: 15 },
          ],
        },
        {
          title: 'Consolider le glossaire personnel',
          description: 'Réviser l’ensemble des mots appris et les intégrer dans un glossaire personnel organisé.',
          xp_reward: 100,
          stat_impacts: { focus: 4, discipline: 4 },
          tasks: [
            { title: 'Réviser les 7 mots de la semaine sans consulter le carnet', xp_reward: 25, frequency_days: 7 },
            { title: 'Écrire un court paragraphe en utilisant 5 mots du glossaire', xp_reward: 35, frequency_days: 7 },
          ],
        },
      ],
    },
    {
      title: 'Apprendre l’histoire de son pays',
      description: 'Explorer l’histoire nationale de façon structurée — des origines à aujourd’hui — en 30 jours de lectures et de réflexions.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 30,
      xp_reward: 430,
      objectives: [
        {
          title: 'Étudier l’histoire par grandes périodes',
          description: 'Couvrir une période historique majeure par semaine à travers des lectures, podcasts ou vidéos de qualité.',
          xp_reward: 280,
          stat_impacts: { focus: 6, discipline: 5 },
          tasks: [
            { title: 'Lire ou écouter 20 min d’histoire aujourd’hui', xp_reward: 20 },
            { title: 'Faire une fiche récapitulative de la période de la semaine', xp_reward: 40, frequency_days: 7 },
          ],
        },
        {
          title: 'Ancrer les repères chronologiques',
          description: 'Mémoriser les dates clés et les événements fondateurs pour avoir un fil conducteur clair.',
          xp_reward: 150,
          stat_impacts: { focus: 5, discipline: 4 },
          tasks: [
            { title: 'Construire une frise chronologique des événements étudiés', xp_reward: 35, frequency_days: 7 },
            { title: 'Répondre à 10 questions sur la période de la semaine de mémoire', xp_reward: 25, frequency_days: 7 },
          ],
        },
      ],
    },
    {
      title: 'La méthode Feynman — enseigner pour apprendre',
      description: 'Appliquer la méthode Feynman sur 5 sujets différents en les expliquant comme à un enfant pour identifier et combler tes lacunes.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 21,
      xp_reward: 370,
      objectives: [
        {
          title: 'Expliquer un concept complexe simplement',
          description: 'Choisir un sujet, l’étudier, puis l’expliquer à voix haute sans jargon — comme à un enfant de 10 ans.',
          xp_reward: 240,
          stat_impacts: { focus: 6, creativite: 5, discipline: 4 },
          tasks: [
            { title: 'Choisir un concept et l’étudier sérieusement (30 min)', xp_reward: 20 },
            { title: 'L’expliquer à voix haute ou par écrit en langage simple', xp_reward: 30 },
            { title: 'Identifier les lacunes et retourner à la source', xp_reward: 20 },
          ],
        },
        {
          title: 'Compléter 5 cycles Feynman',
          description: 'Appliquer la méthode sur cinq sujets différents sur la durée de la quête.',
          xp_reward: 130,
          stat_impacts: { focus: 5, discipline: 5 },
          tasks: [
            { title: 'Valider un cycle Feynman complet sur un nouveau sujet', xp_reward: 40, frequency_days: 4 },
          ],
        },
      ],
    },
    {
      title: 'Réviser avec des flashcards Anki chaque jour',
      description: 'Utiliser Anki (répétition espacée) chaque jour pendant 30 jours pour mémoriser durablement un sujet de ton choix.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 30,
      xp_reward: 400,
      objectives: [
        {
          title: 'Créer et réviser des flashcards quotidiennement',
          description: 'Créer des cartes sur le sujet choisi et effectuer ses révisions Anki chaque jour sans exception.',
          xp_reward: 260,
          stat_impacts: { focus: 6, discipline: 7 },
          tasks: [
            { title: 'Réviser toutes les cartes Anki du jour', xp_reward: 20 },
            { title: 'Créer 5 nouvelles cartes sur les notions du jour', xp_reward: 20 },
          ],
        },
        {
          title: 'Construire un deck solide et durable',
          description: 'Atteindre un deck d’au moins 150 cartes et maintenir un taux de rétention supérieur à 80 %.',
          xp_reward: 140,
          stat_impacts: { focus: 5, discipline: 5 },
          tasks: [
            { title: 'Réviser les cartes difficiles de la semaine en mode test', xp_reward: 25, frequency_days: 7 },
            { title: 'Réorganiser et nettoyer le deck une fois par semaine', xp_reward: 20, frequency_days: 7, is_optional: true },
          ],
        },
      ],
    },
    {
      title: 'Tenir un journal d’apprentissage',
      description: 'Écrire chaque jour ce que tu as appris pour consolider tes acquis, identifier tes progrès et cultiver la curiosité.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 290,
      objectives: [
        {
          title: 'Écrire une entrée de journal chaque jour',
          description: 'Consigner chaque jour au moins une chose apprise, avec une réflexion personnelle sur son utilité.',
          xp_reward: 190,
          stat_impacts: { focus: 5, discipline: 5, creativite: 3 },
          tasks: [
            { title: 'Écrire l’entrée du journal d’apprentissage du jour (10 min minimum)', xp_reward: 20 },
            { title: 'Mentionner la source, le concept et une application concrète', xp_reward: 15 },
          ],
        },
        {
          title: 'Faire le bilan hebdomadaire des apprentissages',
          description: 'Relire la semaine et identifier les 3 apprentissages les plus précieux pour orienter la suite.',
          xp_reward: 100,
          stat_impacts: { focus: 4, discipline: 4 },
          tasks: [
            { title: 'Écrire un bilan hebdomadaire de 3 apprentissages clés', xp_reward: 35, frequency_days: 7 },
          ],
        },
      ],
    },
  ],

  meta: {
    'Dévorer 4 livres en un mois': {
      themes: ['mind', 'focus', 'discipline'],
      context: ['improve', 'challenge'],
      summary: 'Lis quatre livres en trente jours et fais de la lecture une habitude puissante et durable.',
    },
    '15 minutes de langue étrangère chaque jour': {
      themes: ['mind', 'focus', 'discipline'],
      context: ['improve', 'challenge'],
      summary: 'Quinze minutes par jour suffisent pour construire une vraie compétence en langue étrangère.',
    },
    'Mémoriser un poème par cœur': {
      themes: ['mind', 'focus'],
      context: ['improve', 'challenge'],
      summary: 'Grave un poème dans ta mémoire et redécouvre la puissance des mots appris par cœur.',
    },
    'Maîtriser le calcul mental': {
      themes: ['mind', 'focus', 'discipline'],
      context: ['improve', 'challenge'],
      summary: 'Entraîne ton cerveau à calculer vite et bien sans jamais toucher une calculatrice.',
    },
    'Taper sans regarder le clavier': {
      themes: ['mind', 'focus', 'discipline'],
      context: ['improve'],
      summary: 'Libère ton regard de l’écran et double ta productivité à l’ordinateur grâce à la frappe aveugle.',
    },
    'Un article de culture générale par jour': {
      themes: ['mind', 'focus'],
      context: ['improve'],
      summary: 'Un article par jour, et en trois semaines tu seras plus cultivé que jamais.',
    },
    'Un podcast éducatif chaque jour': {
      themes: ['mind', 'focus'],
      context: ['improve'],
      summary: 'Transforme tes déplacements et activités en séances d’apprentissage grâce aux podcasts.',
    },
    'Apprendre à jouer aux échecs': {
      themes: ['mind', 'focus', 'discipline'],
      context: ['improve', 'challenge'],
      summary: 'Maîtrise les bases des échecs et développe pensée stratégique et concentration.',
    },
    'Terminer un cours en ligne (MOOC)': {
      themes: ['mind', 'focus', 'discipline'],
      context: ['improve', 'challenge'],
      summary: 'Finis enfin ce MOOC et certifie une compétence concrète en trente jours.',
    },
    'S’initier à la calligraphie': {
      themes: ['mind', 'creative', 'focus'],
      context: ['reset', 'improve'],
      summary: 'Apprends à donner vie aux lettres et cultive patience, beauté et concentration.',
    },
    'Apprendre l’alphabet morse': {
      themes: ['mind', 'focus', 'discipline'],
      context: ['improve', 'challenge'],
      summary: 'Mémorise le morse en deux semaines et maîtrise un code de communication universel.',
    },
    'Maîtriser le mind mapping': {
      themes: ['mind', 'focus', 'creative'],
      context: ['improve'],
      summary: 'Structure tes idées et booste ta mémorisation grâce aux cartes mentales.',
    },
    'S’initier à la lecture rapide': {
      themes: ['mind', 'focus', 'discipline'],
      context: ['improve', 'challenge'],
      summary: 'Double ta vitesse de lecture en deux semaines sans sacrifier la compréhension.',
    },
    'Apprendre les capitales du monde': {
      themes: ['mind', 'focus', 'discipline'],
      context: ['improve', 'challenge'],
      summary: 'Mémorise les 195 capitales du monde et impressionne tout le monde en soirée.',
    },
    'Un documentaire par semaine': {
      themes: ['mind', 'focus'],
      context: ['reset', 'improve'],
      summary: 'Quatre documentaires de qualité pour ouvrir les yeux sur le monde qui t’entoure.',
    },
    'Un mot rare par jour — enrichir son vocabulaire': {
      themes: ['mind', 'focus', 'creative'],
      context: ['improve'],
      summary: 'Un mot rare chaque jour pour affûter ton expression et tomber amoureux de la langue.',
    },
    'Apprendre l’histoire de son pays': {
      themes: ['mind', 'focus', 'discipline'],
      context: ['improve'],
      summary: 'Explore l’histoire nationale de façon structurée et comprends enfin le monde dans lequel tu vis.',
    },
    'La méthode Feynman — enseigner pour apprendre': {
      themes: ['mind', 'focus', 'creative'],
      context: ['improve', 'challenge'],
      summary: 'Explique ce que tu sais à un enfant imaginaire et découvre ce que tu ne comprends pas vraiment.',
    },
    'Réviser avec des flashcards Anki chaque jour': {
      themes: ['mind', 'focus', 'discipline'],
      context: ['improve', 'challenge'],
      summary: 'La répétition espacée avec Anki est le secret pour ne plus jamais oublier ce que tu apprends.',
    },
    'Tenir un journal d’apprentissage': {
      themes: ['mind', 'focus', 'discipline'],
      context: ['reset', 'improve'],
      summary: 'Écris ce que tu apprends chaque jour et transforme la curiosité en progrès mesurable.',
    },
  },
};
