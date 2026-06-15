import type { QuestModule } from './types';

export const CREATIVE_QUESTS: QuestModule = {
  quests: [
    // 1. Composer une musique
    {
      title: 'Composer une musique',
      description:
        'Crée une composition musicale originale de A à Z en 30 jours — mélodie, harmonie, arrangement — et enregistre-la pour la partager.',
      type: 'secondary',
      difficulty: 'hard',
      duration_days: 30,
      xp_reward: 500,
      objectives: [
        {
          title: 'Développer la structure musicale',
          description:
            'Construis la mélodie principale et l’harmonie de ta composition, en travaillant chaque jour sur un élément précis.',
          xp_reward: 250,
          stat_impacts: { creativite: 5, focus: 3, discipline: 2 },
          tasks: [
            { title: 'Écrire ou enregistrer une idée mélodique du jour', xp_reward: 30 },
            { title: 'Définir les accords et la progression harmonique', xp_reward: 40, frequency_days: 7 },
            { title: 'Enregistrer une démo de la composition complète', xp_reward: 50, frequency_days: 30 },
          ],
        },
        {
          title: 'Finaliser et partager la composition',
          description:
            'Arrange, mixe et publie ta création pour la rendre accessible à d’autres auditeurs.',
          xp_reward: 250,
          stat_impacts: { creativite: 4, discipline: 3, social: 2 },
          tasks: [
            { title: 'Peaufiner l’arrangement (instruments, dynamique)', xp_reward: 40, frequency_days: 7 },
            { title: 'Réaliser un mixage basique de la piste', xp_reward: 50, frequency_days: 30 },
            { title: 'Partager la composition sur une plateforme en ligne', xp_reward: 30, frequency_days: 30, is_optional: true },
          ],
        },
      ],
    },

    // 2. Apprendre les premiers accords de guitare
    {
      title: 'Premiers accords de guitare',
      description:
        'Maîtrise les accords de base à la guitare en 30 jours pour pouvoir accompagner tes premières chansons.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 30,
      xp_reward: 400,
      objectives: [
        {
          title: 'Apprendre et enchaîner les accords fondamentaux',
          description:
            'Pratique chaque jour les accords Do, Sol, La mineur, Ré et Mi pour les intégrer naturellement.',
          xp_reward: 200,
          stat_impacts: { creativite: 4, discipline: 3, focus: 2 },
          tasks: [
            { title: 'S’exercer sur un accord du programme pendant 10 min', xp_reward: 20 },
            { title: 'Enchaîner deux accords différents sans s’arrêter', xp_reward: 30, frequency_days: 3 },
          ],
        },
        {
          title: 'Jouer une chanson complète avec les accords appris',
          description:
            'Mets en pratique tes accords en jouant une chanson entière de bout en bout.',
          xp_reward: 200,
          stat_impacts: { creativite: 3, discipline: 4, focus: 2 },
          tasks: [
            { title: 'Choisir et apprendre une chanson adaptée aux débutants', xp_reward: 30, frequency_days: 7 },
            { title: 'Jouer la chanson en continu sans pause', xp_reward: 50, frequency_days: 30 },
            { title: 'Enregistrer une vidéo de ta performance', xp_reward: 20, frequency_days: 30, is_optional: true },
          ],
        },
      ],
    },

    // 3. S’initier au piano
    {
      title: 'S’initier au piano',
      description:
        'Découvre le piano en 30 jours : position des mains, lecture de notes et premières mélodies simples.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 30,
      xp_reward: 400,
      objectives: [
        {
          title: 'Maîtriser les bases techniques du piano',
          description:
            'Apprends la posture, les notes de base et les premières gammes pour construire une fondation solide.',
          xp_reward: 200,
          stat_impacts: { creativite: 4, focus: 4, discipline: 3 },
          tasks: [
            { title: 'Pratiquer les gammes Do majeur et La mineur', xp_reward: 20 },
            { title: 'Identifier les notes sur le clavier sans regarder', xp_reward: 30, frequency_days: 3 },
          ],
        },
        {
          title: 'Jouer une mélodie simple de mémoire',
          description:
            'Apprends et mémorise une courte mélodie à deux mains pour valider ta progression.',
          xp_reward: 200,
          stat_impacts: { creativite: 3, discipline: 3, focus: 3 },
          tasks: [
            { title: 'Travailler la mélodie une main à la fois', xp_reward: 25, frequency_days: 2 },
            { title: 'Jouer la mélodie à deux mains sans partition', xp_reward: 60, frequency_days: 30 },
          ],
        },
      ],
    },

    // 4. Dessiner chaque jour
    {
      title: 'Dessiner chaque jour',
      description:
        'Prends le crayon chaque jour pendant 30 jours pour développer ton regard artistique et ta régularité créative.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 30,
      xp_reward: 350,
      objectives: [
        {
          title: 'Maintenir une pratique quotidienne du dessin',
          description:
            'Remplis une page de carnet chaque jour, quel que soit le sujet ou le niveau de finition.',
          xp_reward: 200,
          stat_impacts: { creativite: 5, discipline: 4, focus: 2 },
          tasks: [
            { title: 'Réaliser un dessin ou croquis dans ton carnet', xp_reward: 20 },
            { title: 'Reproduire un objet du quotidien en observation directe', xp_reward: 30, frequency_days: 7 },
            { title: 'Partager un dessin de la semaine sur les réseaux', xp_reward: 15, frequency_days: 7, is_optional: true },
          ],
        },
      ],
    },

    // 5. Une photo par jour
    {
      title: 'Une photo par jour',
      description:
        'Capture une photographie intentionnelle chaque jour pendant 30 jours pour aiguiser ton regard et ta sensibilité visuelle.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 30,
      xp_reward: 300,
      objectives: [
        {
          title: 'Photographier avec intention chaque jour',
          description:
            'Prends chaque jour une photo avec un propos (lumière, émotion, composition) et note ce que tu as voulu exprimer.',
          xp_reward: 180,
          stat_impacts: { creativite: 5, focus: 3, calme: 2 },
          tasks: [
            { title: 'Prendre et sélectionner la photo du jour', xp_reward: 15 },
            { title: 'Rédiger une légende décrivant l’intention artistique', xp_reward: 20, frequency_days: 3 },
          ],
        },
        {
          title: 'Constituer et partager un portfolio du mois',
          description:
            'Sélectionne tes 10 meilleures photos et publie-les sous forme de galerie ou de post.',
          xp_reward: 120,
          stat_impacts: { creativite: 3, social: 2, discipline: 2 },
          tasks: [
            { title: 'Choisir et retoucher les 10 meilleures photos', xp_reward: 40, frequency_days: 30 },
            { title: 'Publier le portfolio en ligne', xp_reward: 30, frequency_days: 30 },
          ],
        },
      ],
    },

    // 6. Écrire une nouvelle
    {
      title: 'Écrire une nouvelle',
      description:
        'Rédige une nouvelle de fiction complète en 30 jours : de l’idée initiale jusqu’à la version finale corrigée.',
      type: 'secondary',
      difficulty: 'hard',
      duration_days: 30,
      xp_reward: 500,
      objectives: [
        {
          title: 'Rédiger le premier jet de la nouvelle',
          description:
            'Écris chaque jour sans censure pour atteindre un premier draft complet avec début, milieu et fin.',
          xp_reward: 280,
          stat_impacts: { creativite: 5, discipline: 4, focus: 3 },
          tasks: [
            { title: 'Écrire au moins 300 mots de fiction', xp_reward: 25 },
            { title: 'Faire un point sur la structure narrative (actes, tension)', xp_reward: 30, frequency_days: 7 },
          ],
        },
        {
          title: 'Réviser et finaliser la nouvelle',
          description:
            'Relis, corrige et peaufine ton texte pour en faire une version publiable ou partageable.',
          xp_reward: 220,
          stat_impacts: { creativite: 3, focus: 4, discipline: 3 },
          tasks: [
            { title: 'Relire un chapitre et annoter les passages à améliorer', xp_reward: 30, frequency_days: 3 },
            { title: 'Effectuer une passe de correction complète du texte', xp_reward: 60, frequency_days: 30 },
            { title: 'Faire lire la nouvelle à une personne de confiance', xp_reward: 20, frequency_days: 30, is_optional: true },
          ],
        },
      ],
    },

    // 7. Écrire 500 mots par jour
    {
      title: 'Écrire 500 mots par jour',
      description:
        'Développe l’habitude d’écrire 500 mots chaque jour pendant 30 jours pour libérer ta plume et construire une discipline d’auteur.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 30,
      xp_reward: 380,
      objectives: [
        {
          title: 'Tenir l’objectif quotidien des 500 mots',
          description:
            'Remplis ton quota journalier sans exception, sur n’importe quel sujet : fiction, essai, journal intime.',
          xp_reward: 220,
          stat_impacts: { creativite: 5, discipline: 5, focus: 3 },
          tasks: [
            { title: 'Écrire 500 mots ou plus dans ta session du jour', xp_reward: 25 },
            { title: 'Lire 10 minutes d’un auteur pour nourrir l’inspiration', xp_reward: 15, frequency_days: 3, is_optional: true },
          ],
        },
        {
          title: 'Refléchir sur ta progression d’écrivain',
          description:
            'Analyse tes thèmes récurrents et identifie les axes d’amélioration de ton style.',
          xp_reward: 160,
          stat_impacts: { creativite: 3, focus: 3, discipline: 2 },
          tasks: [
            { title: 'Relire les écrits de la semaine et noter les tendances', xp_reward: 30, frequency_days: 7 },
            { title: 'Rédiger un bilan de ta pratique sur le mois', xp_reward: 40, frequency_days: 30 },
          ],
        },
      ],
    },

    // 8. Lancer une newsletter ou un blog
    {
      title: 'Lancer une newsletter ou un blog',
      description:
        'Crée et lance ta propre newsletter ou ton blog en 30 jours : de la création de l’espace à la publication de tes premières éditions.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 30,
      xp_reward: 450,
      objectives: [
        {
          title: 'Créer et configurer la plateforme de publication',
          description:
            'Choisis ton outil, configure ton espace et définis ta ligne éditoriale avant la première publication.',
          xp_reward: 150,
          stat_impacts: { creativite: 3, discipline: 3, focus: 2 },
          tasks: [
            { title: 'Choisir la plateforme et créer le compte (Substack, Ghost…)', xp_reward: 30, frequency_days: 30 },
            { title: 'Rédiger la page "À propos" et définir l’angle éditorial', xp_reward: 40, frequency_days: 7 },
          ],
        },
        {
          title: 'Publier régulièrement et fidéliser une audience',
          description:
            'Publie au moins une édition par semaine et engage ton audience avec un contenu de qualité.',
          xp_reward: 300,
          stat_impacts: { creativite: 4, social: 3, discipline: 4 },
          tasks: [
            { title: 'Rédiger et publier une édition complète', xp_reward: 50, frequency_days: 7 },
            { title: 'Partager l’édition sur au moins un réseau social', xp_reward: 20, frequency_days: 7 },
            { title: 'Répondre aux commentaires ou retours des lecteurs', xp_reward: 20, frequency_days: 7, is_optional: true },
          ],
        },
      ],
    },

    // 9. Apprendre à chanter juste
    {
      title: 'Apprendre à chanter juste',
      description:
        'Travaille ton oreille et ta voix pendant 21 jours pour chanter en justesse sur des mélodies simples.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 21,
      xp_reward: 380,
      objectives: [
        {
          title: 'Développer l’oreille musicale et la justesse vocale',
          description:
            'Pratique des exercices de solfège et de vocalises quotidiens pour affiner ta perception et ta voix.',
          xp_reward: 200,
          stat_impacts: { creativite: 4, focus: 4, discipline: 3 },
          tasks: [
            { title: 'Faire 15 min de vocalises et d’exercices de justesse', xp_reward: 25 },
            { title: 'Utiliser une application de détection de justesse vocale', xp_reward: 20, frequency_days: 2 },
          ],
        },
        {
          title: 'Interpréter une chanson juste de bout en bout',
          description:
            'Choisis une chanson adaptée à ta tessiture et travaille-la jusqu’à pouvoir la chanter avec justesse.',
          xp_reward: 180,
          stat_impacts: { creativite: 3, discipline: 3, emotion: 2 },
          tasks: [
            { title: 'Répéter la chanson phrase par phrase', xp_reward: 25, frequency_days: 2 },
            { title: 'Enregistrer une interprétation complète pour s’évaluer', xp_reward: 50, frequency_days: 21 },
          ],
        },
      ],
    },

    // 10. Apprendre une chorégraphie
    {
      title: 'Apprendre une chorégraphie',
      description:
        'Mémorise et perfectionne une chorégraphie complète en 21 jours, en travaillant coordination et fluidité.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 21,
      xp_reward: 380,
      objectives: [
        {
          title: 'Décomposer et mémoriser chaque séquence de la chorégraphie',
          description:
            'Apprends la chorégraphie section par section jusqu’à pouvoir l’enchaîner sans hésiter.',
          xp_reward: 220,
          stat_impacts: { creativite: 4, focus: 3, discipline: 3, endurance: 2 },
          tasks: [
            { title: 'Travailler une nouvelle séquence de 30 sec aujourd’hui', xp_reward: 30 },
            { title: 'Enchaîner toutes les séquences apprises jusqu’à présent', xp_reward: 25, frequency_days: 3 },
          ],
        },
        {
          title: 'Interpréter la chorégraphie en entier',
          description:
            'Perfectionne le style et l’expression, puis filme une interprétation complète.',
          xp_reward: 160,
          stat_impacts: { creativite: 3, emotion: 3, discipline: 2 },
          tasks: [
            { title: 'Travailler l’expression et la fluidité des mouvements', xp_reward: 30, frequency_days: 3 },
            { title: 'Filmer la chorégraphie complète sans interruption', xp_reward: 50, frequency_days: 21 },
          ],
        },
      ],
    },

    // 11. S’initier à l’aquarelle
    {
      title: 'S’initier à l’aquarelle',
      description:
        'Découvre les techniques fondamentales de l’aquarelle en 21 jours : lavis, glacis, mouillé sur mouillé.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 21,
      xp_reward: 360,
      objectives: [
        {
          title: 'Maîtriser les techniques de base de l’aquarelle',
          description:
            'Pratique chaque jour les techniques essentielles sur des petits formats pour en comprendre les spécificités.',
          xp_reward: 200,
          stat_impacts: { creativite: 5, focus: 3, calme: 3 },
          tasks: [
            { title: 'Réaliser un exercice de technique ciblé (lavis, dégradé…)', xp_reward: 25 },
            { title: 'Peindre un sujet libre en appliquant la technique de la semaine', xp_reward: 35, frequency_days: 7 },
          ],
        },
        {
          title: 'Créer une aquarelle finalisée',
          description:
            'Réalise une peinture complète en aquarelle en mobilisant toutes les techniques apprises.',
          xp_reward: 160,
          stat_impacts: { creativite: 4, focus: 3, calme: 2 },
          tasks: [
            { title: 'Esquisser la composition au crayon', xp_reward: 20, frequency_days: 21 },
            { title: 'Peindre l’aquarelle finale en plusieurs sessions', xp_reward: 50, frequency_days: 7 },
            { title: 'Photographier et partager l’œuvre terminée', xp_reward: 15, frequency_days: 21, is_optional: true },
          ],
        },
      ],
    },

    // 12. S’initier à la poterie
    {
      title: 'S’initier à la poterie',
      description:
        'Explore la poterie pendant 21 jours : centrage de l’argile, montage à la main et cuisson de tes premières pièces.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 21,
      xp_reward: 360,
      objectives: [
        {
          title: 'Apprendre les gestes fondamentaux du potier',
          description:
            'Pratique le centrage, l’ouverture et le montage en atelier pour apprivoiser l’argile.',
          xp_reward: 200,
          stat_impacts: { creativite: 4, focus: 4, calme: 3 },
          tasks: [
            { title: 'Assister à une session d’atelier ou pratiquer chez soi', xp_reward: 35, frequency_days: 7 },
            { title: 'Réaliser un bol ou une tasse montés à la main', xp_reward: 40, frequency_days: 7 },
          ],
        },
        {
          title: 'Finaliser et cuire une pièce en argile',
          description:
            'Termine, décore et fais cuire une pièce pour obtenir un résultat concret et durable.',
          xp_reward: 160,
          stat_impacts: { creativite: 4, discipline: 2, calme: 2 },
          tasks: [
            { title: 'Laisser sécher et poncer la pièce sèche', xp_reward: 20, frequency_days: 21 },
            { title: 'Décorer ou vernir la pièce avant cuisson', xp_reward: 30, frequency_days: 21 },
            { title: 'Récupérer la pièce cuite et évaluer le résultat', xp_reward: 30, frequency_days: 21 },
          ],
        },
      ],
    },

    // 13. Réaliser une vidéo de A à Z
    {
      title: 'Réaliser une vidéo de A à Z',
      description:
        'Conçois, tourne et monte une vidéo complète en 21 jours, du scénario à la publication finale.',
      type: 'secondary',
      difficulty: 'hard',
      duration_days: 21,
      xp_reward: 450,
      objectives: [
        {
          title: 'Préparer et tourner la vidéo',
          description:
            'Écris le scénario, planifie le tournage et filme tous les plans nécessaires.',
          xp_reward: 230,
          stat_impacts: { creativite: 5, focus: 3, discipline: 3 },
          tasks: [
            { title: 'Rédiger le synopsis et le découpage technique', xp_reward: 40, frequency_days: 7 },
            { title: 'Tourner les scènes selon le plan de tournage', xp_reward: 50, frequency_days: 7 },
          ],
        },
        {
          title: 'Monter et publier la vidéo',
          description:
            'Assemble les plans, ajoute la musique et les sous-titres, puis mets en ligne la vidéo finalisée.',
          xp_reward: 220,
          stat_impacts: { creativite: 4, focus: 4, social: 2 },
          tasks: [
            { title: 'Assembler les plans et effectuer la coupe primaire', xp_reward: 40, frequency_days: 7 },
            { title: 'Ajouter musique, effets et sous-titres', xp_reward: 40, frequency_days: 7 },
            { title: 'Exporter et publier la vidéo sur YouTube ou Vimeo', xp_reward: 50, frequency_days: 21 },
          ],
        },
      ],
    },

    // 14. Une nouvelle recette créative par semaine
    {
      title: 'Une recette créative par semaine',
      description:
        'Invente ou revisite une recette originale chaque semaine pendant 30 jours pour explorer ta créativité culinaire.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 30,
      xp_reward: 300,
      objectives: [
        {
          title: 'Créer et tester une nouvelle recette chaque semaine',
          description:
            'Imagine une recette inédite ou réinterprète un classique avec une touche personnelle, puis cuisine-la.',
          xp_reward: 180,
          stat_impacts: { creativite: 4, discipline: 2, calme: 2 },
          tasks: [
            { title: 'Choisir le concept et rédiger la recette du week-end', xp_reward: 20, frequency_days: 7 },
            { title: 'Cuisiner la recette et goûter le résultat', xp_reward: 30, frequency_days: 7 },
          ],
        },
        {
          title: 'Documenter et partager tes créations culinaires',
          description:
            'Photographie chaque plat et rédige une fiche recette pour constituer un recueil personnel.',
          xp_reward: 120,
          stat_impacts: { creativite: 3, social: 2, discipline: 2 },
          tasks: [
            { title: 'Photographier le plat et noter les ajustements', xp_reward: 20, frequency_days: 7 },
            { title: 'Partager la recette sur un blog ou les réseaux sociaux', xp_reward: 20, frequency_days: 7, is_optional: true },
          ],
        },
      ],
    },

    // 15. S’initier à la couture
    {
      title: 'S’initier à la couture',
      description:
        'Apprends les bases de la couture en 21 jours et réalise ta première pièce cousue à la main ou à la machine.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 21,
      xp_reward: 360,
      objectives: [
        {
          title: 'Acquérir les techniques fondamentales de couture',
          description:
            'Maîtrise les points de base, la lecture d’un patron simple et l’utilisation du matériel.',
          xp_reward: 180,
          stat_impacts: { creativite: 4, focus: 4, discipline: 3 },
          tasks: [
            { title: 'Pratiquer les points de couture de base sur une chute de tissu', xp_reward: 25, frequency_days: 3 },
            { title: 'Lire et comprendre un patron couture simplifié', xp_reward: 30, frequency_days: 7 },
          ],
        },
        {
          title: 'Confectionner ta première pièce terminée',
          description:
            'Coupe, assemble et finisse un projet simple (pochette, tote bag ou accessoire) de A à Z.',
          xp_reward: 180,
          stat_impacts: { creativite: 4, discipline: 3, focus: 2 },
          tasks: [
            { title: 'Couper le tissu selon le patron choisi', xp_reward: 20, frequency_days: 21 },
            { title: 'Assembler les pièces et coudre les coutures', xp_reward: 40, frequency_days: 7 },
            { title: 'Finir et repasser la pièce pour un rendu propre', xp_reward: 30, frequency_days: 21 },
          ],
        },
      ],
    },

    // 16. Maîtriser l’origami
    {
      title: 'Maîtriser l’origami',
      description:
        'Apprends les plis fondamentaux et réalise des figures d’origami de complexité croissante en 14 jours.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 14,
      xp_reward: 280,
      objectives: [
        {
          title: 'Maîtriser les plis de base et les figures classiques',
          description:
            'Pratique chaque jour une nouvelle figure en suivant les conventions de notation origami.',
          xp_reward: 160,
          stat_impacts: { creativite: 4, focus: 5, calme: 3 },
          tasks: [
            { title: 'Réaliser la figure du jour en suivant un tutoriel', xp_reward: 20 },
            { title: 'Répéter la figure de la veille de mémoire', xp_reward: 15, frequency_days: 2 },
          ],
        },
        {
          title: 'Créer une composition originale en origami',
          description:
            'Assemble plusieurs figures ou adapte un modèle existant pour créer une composition personnelle.',
          xp_reward: 120,
          stat_impacts: { creativite: 5, focus: 3 },
          tasks: [
            { title: 'Plier une figure de difficulté intermédiaire sans aide', xp_reward: 35, frequency_days: 7 },
            { title: 'Assembler une composition de 3 figures ou plus', xp_reward: 40, frequency_days: 14 },
          ],
        },
      ],
    },

    // 17. Un poème par jour
    {
      title: 'Un poème par jour',
      description:
        'Écris un poème chaque jour pendant 14 jours pour libérer ton expression poétique et explorer différentes formes.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 14,
      xp_reward: 270,
      objectives: [
        {
          title: 'Écrire un poème quotidien sans censure',
          description:
            'Produis chaque jour un poème quel que soit sa longueur ou sa forme, en explorant des styles variés.',
          xp_reward: 160,
          stat_impacts: { creativite: 5, emotion: 4, focus: 2 },
          tasks: [
            { title: 'Écrire un poème dans le registre ou la forme du jour', xp_reward: 20 },
            { title: 'Tester une contrainte formelle (haïku, sonnet, acrostiche…)', xp_reward: 25, frequency_days: 3 },
          ],
        },
        {
          title: 'Sélectionner et partager tes meilleurs poèmes',
          description:
            'Choisis tes cinq poèmes favoris et partage-les avec une personne ou sur une plateforme.',
          xp_reward: 110,
          stat_impacts: { creativite: 3, emotion: 3, social: 2 },
          tasks: [
            { title: 'Relire et sélectionner les 5 poèmes les plus aboutis', xp_reward: 30, frequency_days: 14 },
            { title: 'Partager un poème en lecture publique ou en ligne', xp_reward: 30, frequency_days: 14, is_optional: true },
          ],
        },
      ],
    },

    // 18. Publier une création par semaine
    {
      title: 'Publier une création par semaine',
      description:
        'Partage une création originale chaque semaine pendant 30 jours pour bâtir l’habitude de rendre ton travail visible.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 30,
      xp_reward: 420,
      objectives: [
        {
          title: 'Produire et publier une création chaque semaine',
          description:
            'Quel que soit le médium (texte, image, son, vidéo), crée et publie une œuvre complète hebdomadairement.',
          xp_reward: 250,
          stat_impacts: { creativite: 5, discipline: 4, social: 3 },
          tasks: [
            { title: 'Travailler sur la création en cours pendant au moins 30 min', xp_reward: 20 },
            { title: 'Finaliser et publier la création de la semaine', xp_reward: 40, frequency_days: 7 },
          ],
        },
        {
          title: 'Analyser l’impact et l’évolution de tes publications',
          description:
            'Observe les retours reçus et évalue ta progression créative semaine après semaine.',
          xp_reward: 170,
          stat_impacts: { creativite: 3, focus: 3, social: 2, discipline: 2 },
          tasks: [
            { title: 'Lire les retours et noter les réactions à ta création', xp_reward: 20, frequency_days: 7 },
            { title: 'Rédiger un bilan créatif du mois sur ta pratique', xp_reward: 50, frequency_days: 30 },
          ],
        },
      ],
    },
  ],

  meta: {
    'Composer une musique': {
      themes: ['creative', 'discipline'],
      context: ['challenge', 'improve'],
      summary: 'Crée ta première composition musicale originale et enregistre-la en 30 jours.',
    },
    'Premiers accords de guitare': {
      themes: ['creative', 'discipline'],
      context: ['reset', 'improve'],
      summary: 'Apprends les accords fondamentaux à la guitare pour jouer tes premières chansons en 30 jours.',
    },
    'S’initier au piano': {
      themes: ['creative', 'focus'],
      context: ['reset', 'improve'],
      summary: 'Découvre le piano et joue ta première mélodie à deux mains en 30 jours.',
    },
    'Dessiner chaque jour': {
      themes: ['creative', 'discipline'],
      context: ['reset', 'improve'],
      summary: 'Remplis un carnet de croquis chaque jour pendant 30 jours pour développer ton regard artistique.',
    },
    'Une photo par jour': {
      themes: ['creative', 'focus'],
      context: ['reset', 'improve'],
      summary: 'Photographie chaque jour avec intention et constitue un portfolio d’un mois en 30 jours.',
    },
    'Écrire une nouvelle': {
      themes: ['creative', 'discipline'],
      context: ['challenge', 'improve'],
      summary: 'Rédige et finalise une nouvelle de fiction complète en 30 jours.',
    },
    'Écrire 500 mots par jour': {
      themes: ['creative', 'discipline'],
      context: ['reset', 'improve'],
      summary: 'Libère ta plume en écrivant 500 mots chaque jour pendant 30 jours.',
    },
    'Lancer une newsletter ou un blog': {
      themes: ['creative', 'social'],
      context: ['improve', 'challenge'],
      summary: 'Lance ta newsletter ou ton blog et publie tes premières éditions en 30 jours.',
    },
    'Apprendre à chanter juste': {
      themes: ['creative', 'discipline'],
      context: ['reset', 'improve'],
      summary: 'Affine ton oreille et ta voix pour chanter en justesse en 21 jours.',
    },
    'Apprendre une chorégraphie': {
      themes: ['creative', 'discipline'],
      context: ['reset', 'improve'],
      summary: 'Mémorise et perfectionne une chorégraphie complète en 21 jours.',
    },
    'S’initier à l’aquarelle': {
      themes: ['creative', 'focus'],
      context: ['reset', 'improve'],
      summary: 'Maîtrise les techniques de base de l’aquarelle et réalise ta première peinture en 21 jours.',
    },
    'S’initier à la poterie': {
      themes: ['creative', 'focus'],
      context: ['reset', 'improve'],
      summary: 'Explore la poterie et fais cuire ta première pièce en argile en 21 jours.',
    },
    'Réaliser une vidéo de A à Z': {
      themes: ['creative', 'discipline'],
      context: ['challenge', 'improve'],
      summary: 'Conçois, tourne et monte une vidéo complète jusqu’à la publication en 21 jours.',
    },
    'Une recette créative par semaine': {
      themes: ['creative', 'discipline'],
      context: ['reset', 'improve'],
      summary: 'Invente et cuisine une recette originale chaque semaine pendant 30 jours.',
    },
    'S’initier à la couture': {
      themes: ['creative', 'focus'],
      context: ['reset', 'improve'],
      summary: 'Apprends les bases de la couture et confectionne ta première pièce en 21 jours.',
    },
    'Maîtriser l’origami': {
      themes: ['creative', 'focus'],
      context: ['reset', 'improve'],
      summary: 'Apprends les plis fondamentaux de l’origami et crée ta propre composition en 14 jours.',
    },
    'Un poème par jour': {
      themes: ['creative', 'emotions'],
      context: ['reset', 'improve'],
      summary: 'Écris un poème chaque jour pendant 14 jours et partage tes meilleures créations.',
    },
    'Publier une création par semaine': {
      themes: ['creative', 'social'],
      context: ['improve', 'challenge'],
      summary: 'Partage une création originale chaque semaine pendant 30 jours pour rendre ton travail visible.',
    },
  },
};
