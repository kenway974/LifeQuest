import type { QuestModule } from './types';

export const FINANCE_QUESTS: QuestModule = {
  quests: [
    // 1. Suivre chaque dépense pendant 30 jours
    {
      title: 'Traquer chaque centime',
      description:
        'Pendant 30 jours, consigne chaque dépense — café, transport, impulsion nocturne. La conscience de tes flux d’argent est le premier pas vers la maîtrise financière.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 30,
      xp_reward: 480,
      objectives: [
        {
          title: 'Tenir un journal de dépenses complet',
          description:
            'Enregistre chaque transaction, aussi minime soit-elle, dans une application ou un carnet dédié.',
          xp_reward: 280,
          stat_impacts: { discipline: 4, focus: 3 },
          tasks: [
            {
              title: 'Enregistrer toutes les dépenses du jour',
              xp_reward: 15,
              frequency_days: 1,
            },
            {
              title: 'Faire un bilan hebdomadaire par catégorie',
              xp_reward: 30,
              frequency_days: 7,
            },
            {
              title: 'Analyser les 3 postes de dépenses les plus élevés',
              xp_reward: 40,
              frequency_days: 30,
              is_optional: true,
            },
          ],
        },
        {
          title: 'Identifier les fuites financières',
          description:
            'À partir de tes données, repère les achats récurrents inutiles et formule un plan d’action.',
          xp_reward: 200,
          stat_impacts: { discipline: 3, focus: 2 },
          tasks: [
            {
              title: 'Lister les achats impulsifs de la semaine',
              xp_reward: 20,
              frequency_days: 7,
            },
            {
              title: 'Rédiger un rapport de fin de mois avec 3 actions correctives',
              xp_reward: 50,
              frequency_days: 30,
            },
          ],
        },
      ],
    },

    // 2. Bâtir son premier budget mensuel
    {
      title: 'Poser les fondations de son budget',
      description:
        'Construis un budget mensuel réaliste en allouant chaque euro à un rôle précis. La méthode 50/30/20 ou la tienne — l’essentiel est d’avoir un plan.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 30,
      xp_reward: 420,
      objectives: [
        {
          title: 'Créer et appliquer un budget mensuel',
          description:
            'Définis les grandes enveloppes (besoins, envies, épargne) et respecte les plafonds jusqu’à la fin du mois.',
          xp_reward: 420,
          stat_impacts: { discipline: 5, focus: 3 },
          tasks: [
            {
              title: 'Calculer ses revenus nets mensuels',
              xp_reward: 20,
              frequency_days: 30,
            },
            {
              title: 'Répartir les dépenses en catégories et fixer les plafonds',
              xp_reward: 40,
              frequency_days: 30,
            },
            {
              title: 'Vérifier l’adéquation budget vs réel chaque semaine',
              xp_reward: 25,
              frequency_days: 7,
            },
            {
              title: 'Ajuster le budget après le premier mois',
              xp_reward: 40,
              frequency_days: 30,
              is_optional: true,
            },
          ],
        },
      ],
    },

    // 3. No-spend challenge
    {
      title: 'No-spend : 14 jours sans superflu',
      description:
        'Pendant deux semaines, interdit toute dépense non essentielle. Aucun restaurant, aucun achat en ligne, aucune gâterie. Un reset mental autant que financier.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 14,
      xp_reward: 380,
      objectives: [
        {
          title: 'Tenir le no-spend challenge sans faillir',
          description:
            'Planifie tes repas, évite les situations de tentation et documente chaque jour sans dépense superflue.',
          xp_reward: 380,
          stat_impacts: { discipline: 6, calme: 2, focus: 2 },
          tasks: [
            {
              title: 'Préparer les repas de la semaine à l’avance',
              xp_reward: 30,
              frequency_days: 7,
            },
            {
              title: 'Confirmer chaque soir : zéro dépense superflue aujourd’hui',
              xp_reward: 15,
              frequency_days: 1,
            },
            {
              title: 'Écrire ce que tu as appris sur tes envies vs besoins',
              xp_reward: 40,
              frequency_days: 14,
            },
          ],
        },
      ],
    },

    // 4. Épargner 10% de ses revenus
    {
      title: 'La règle des 10% — paye-toi en premier',
      description:
        'Dès réception de ton salaire, vire automatiquement 10% sur un compte épargne distinct. Trente jours pour ancrer cette habitude fondamentale.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 30,
      xp_reward: 400,
      objectives: [
        {
          title: 'Automatiser et valider l’épargne des 10%',
          description:
            'Configure un virement automatique et ne touche pas au compte épargne pendant toute la durée de la quête.',
          xp_reward: 400,
          stat_impacts: { discipline: 6, focus: 3 },
          tasks: [
            {
              title: 'Ouvrir ou identifier le compte épargne dédié',
              xp_reward: 20,
              frequency_days: 30,
            },
            {
              title: 'Mettre en place le virement automatique de 10%',
              xp_reward: 40,
              frequency_days: 30,
            },
            {
              title: 'Vérifier le solde épargne chaque semaine sans y toucher',
              xp_reward: 20,
              frequency_days: 7,
            },
            {
              title: 'Calculer la projection annuelle si tu maintiens ce rythme',
              xp_reward: 30,
              frequency_days: 30,
              is_optional: true,
            },
          ],
        },
      ],
    },

    // 5. Résilier les abonnements inutiles
    {
      title: 'Chasse aux abonnements fantômes',
      description:
        'Passe en revue chaque prélèvement récurrent et résilie tout ce que tu n’utilises plus activement. Chaque euro récupéré est un euro libre.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 14,
      xp_reward: 260,
      objectives: [
        {
          title: 'Auditer et résilier les abonnements inutilisés',
          description:
            'Liste tous les prélèvements récurrents, évalue l’usage réel de chacun, résilie les superflus.',
          xp_reward: 260,
          stat_impacts: { discipline: 4, focus: 2 },
          tasks: [
            {
              title: 'Lister l’ensemble des abonnements actifs (apps, streaming, etc.)',
              xp_reward: 30,
              frequency_days: 14,
            },
            {
              title: 'Résilier au moins 2 abonnements non utilisés',
              xp_reward: 40,
              frequency_days: 14,
            },
            {
              title: 'Calculer l’économie annuelle réalisée',
              xp_reward: 20,
              frequency_days: 14,
            },
          ],
        },
      ],
    },

    // 6. S’initier à la bourse et à l’investissement
    {
      title: 'Premier pas en bourse',
      description:
        'Comprends les bases de l’investissement boursier : ETF, PEA, diversification, gestion du risque. Conclus en réalisant un premier investissement symbolique.',
      type: 'secondary',
      difficulty: 'hard',
      duration_days: 30,
      xp_reward: 560,
      objectives: [
        {
          title: 'Maîtriser les concepts fondamentaux de l’investissement',
          description:
            'Étudie les notions clés et applique-les en simulant ou en réalisant un premier achat d’ETF.',
          xp_reward: 320,
          stat_impacts: { focus: 5, discipline: 3, creativite: 2 },
          tasks: [
            {
              title: 'Lire un article ou regarder une vidéo sur les ETF',
              xp_reward: 20,
              frequency_days: 3,
            },
            {
              title: 'Ouvrir un compte PEA ou courtier en ligne',
              xp_reward: 50,
              frequency_days: 30,
            },
            {
              title: 'Réaliser un premier achat d’ETF (même pour 10€)',
              xp_reward: 60,
              frequency_days: 30,
            },
          ],
        },
        {
          title: 'Définir sa stratégie d’investissement personnelle',
          description:
            'Formule par écrit ton horizon de placement, ton tolérance au risque et l’allocation choisie.',
          xp_reward: 240,
          stat_impacts: { focus: 4, discipline: 3 },
          tasks: [
            {
              title: 'Rédiger sa stratégie d’investissement en une page',
              xp_reward: 50,
              frequency_days: 30,
            },
            {
              title: 'Fixer un montant mensuel à investir à l’avenir',
              xp_reward: 30,
              frequency_days: 30,
            },
          ],
        },
      ],
    },

    // 7. Vendre 10 objets inutilisés
    {
      title: 'Désencombrer pour monétiser',
      description:
        'Repère et vends 10 objets qui prennent de la place sans valeur d’usage. Libère de l’espace, libère de l’argent.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 30,
      xp_reward: 340,
      objectives: [
        {
          title: 'Vendre 10 objets sur une plateforme de seconde main',
          description:
            'Photographie, publie et conclue 10 ventes sur Vinted, Leboncoin ou équivalent.',
          xp_reward: 340,
          stat_impacts: { discipline: 3, creativite: 2, social: 2 },
          tasks: [
            {
              title: 'Identifier et sélectionner les objets à vendre',
              xp_reward: 20,
              frequency_days: 30,
            },
            {
              title: 'Publier une annonce (photo + description soignées)',
              xp_reward: 15,
              frequency_days: 3,
            },
            {
              title: 'Conclure et expédier une vente',
              xp_reward: 20,
              frequency_days: 3,
            },
          ],
        },
      ],
    },

    // 8. Lancer une source de revenu complémentaire
    {
      title: 'Créer son premier revenu annexe',
      description:
        'Identifie une compétence ou un actif que tu peux monétiser, définis une offre simple et génère tes premiers euros en dehors de ton emploi principal.',
      type: 'secondary',
      difficulty: 'hard',
      duration_days: 30,
      xp_reward: 620,
      objectives: [
        {
          title: 'Valider l’idée et préparer l’offre',
          description:
            'Choisis un créneau réaliste, formule une proposition de valeur et identifie tes premiers clients potentiels.',
          xp_reward: 280,
          stat_impacts: { creativite: 5, focus: 4, discipline: 3 },
          tasks: [
            {
              title: 'Lister 5 compétences ou ressources monétisables',
              xp_reward: 30,
              frequency_days: 30,
            },
            {
              title: 'Rédiger la description de son offre en 3 phrases',
              xp_reward: 40,
              frequency_days: 30,
            },
            {
              title: 'Identifier 3 clients ou plateformes potentiels',
              xp_reward: 30,
              frequency_days: 30,
            },
          ],
        },
        {
          title: 'Effectuer la première transaction',
          description:
            'Propose ton offre à un premier client et encaisse ta première rémunération complémentaire.',
          xp_reward: 340,
          stat_impacts: { social: 4, discipline: 4, creativite: 3 },
          tasks: [
            {
              title: 'Envoyer une proposition à 3 personnes ou plateformes',
              xp_reward: 50,
              frequency_days: 30,
            },
            {
              title: 'Conclure au moins une mission ou une vente',
              xp_reward: 80,
              frequency_days: 30,
            },
          ],
        },
      ],
    },

    // 9. Refaire son CV et son LinkedIn
    {
      title: 'Vitrine pro : CV et LinkedIn au top',
      description:
        'Mets à jour et optimise ton CV et ton profil LinkedIn pour refléter qui tu es aujourd’hui et attirer les opportunités que tu mérites.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 14,
      xp_reward: 360,
      objectives: [
        {
          title: 'Refondre son CV et optimiser son profil LinkedIn',
          description:
            'Rédige un CV impactant et un profil LinkedIn complet avec photo professionnelle, résumé accrocheur et expériences actualisées.',
          xp_reward: 360,
          stat_impacts: { social: 4, focus: 3, creativite: 3 },
          tasks: [
            {
              title: 'Actualiser toutes les expériences et compétences du CV',
              xp_reward: 40,
              frequency_days: 14,
            },
            {
              title: 'Compléter à 100% le profil LinkedIn (photo, résumé, expériences)',
              xp_reward: 50,
              frequency_days: 14,
            },
            {
              title: 'Faire relire le CV par une personne de confiance',
              xp_reward: 30,
              frequency_days: 14,
            },
            {
              title: 'Publier un post LinkedIn sur une réalisation récente',
              xp_reward: 40,
              frequency_days: 14,
              is_optional: true,
            },
          ],
        },
      ],
    },

    // 10. Un nouveau contact pro par semaine
    {
      title: 'Étendre son réseau pro chaque semaine',
      description:
        'Pendant 30 jours, prends l’initiative de contacter une nouvelle personne dans ton domaine chaque semaine. Le réseau est un multiplicateur de chance.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 30,
      xp_reward: 400,
      objectives: [
        {
          title: 'Nouer 4 nouveaux contacts professionnels en un mois',
          description:
            'Envoie un message personnalisé, propose un échange ou un café à un inconnu pertinent chaque semaine.',
          xp_reward: 400,
          stat_impacts: { social: 6, discipline: 3, focus: 2 },
          tasks: [
            {
              title: 'Identifier et contacter un nouveau profil pro de façon personnalisée',
              xp_reward: 50,
              frequency_days: 7,
            },
            {
              title: 'Avoir un échange réel (appel, café, message approfondi)',
              xp_reward: 30,
              frequency_days: 7,
            },
          ],
        },
      ],
    },

    // 11. Apprendre une compétence monétisable
    {
      title: 'Maîtriser une compétence qui rapporte',
      description:
        'Choisis une compétence à forte valeur marchande (copywriting, Excel avancé, design, code, etc.) et consacre 30 jours à l’apprendre sérieusement.',
      type: 'secondary',
      difficulty: 'hard',
      duration_days: 30,
      xp_reward: 560,
      objectives: [
        {
          title: 'Atteindre le niveau débutant-avancé dans la compétence choisie',
          description:
            'Suis une formation structurée, produis un livrable concret et évalue tes progrès en fin de mois.',
          xp_reward: 560,
          stat_impacts: { focus: 6, discipline: 5, creativite: 3 },
          tasks: [
            {
              title: 'Choisir la compétence cible et trouver une formation sérieuse',
              xp_reward: 20,
              frequency_days: 30,
            },
            {
              title: 'Pratiquer la compétence au moins 30 minutes',
              xp_reward: 20,
              frequency_days: 1,
            },
            {
              title: 'Produire un livrable concret démontrant la compétence',
              xp_reward: 60,
              frequency_days: 30,
            },
          ],
        },
      ],
    },

    // 12. Préparer une négociation de salaire
    {
      title: 'Négocier son salaire avec méthode',
      description:
        'Prépare une demande d’augmentation ou de revalorisation salariale : benchmarks, argumentation, entraînement. La préparation est la clé de la confiance.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 21,
      xp_reward: 460,
      objectives: [
        {
          title: 'Construire un dossier de négociation solide',
          description:
            'Rassemble les données du marché, liste tes contributions clés et formule une demande chiffrée et argumentée.',
          xp_reward: 260,
          stat_impacts: { focus: 5, discipline: 3, social: 2 },
          tasks: [
            {
              title: 'Benchmarker les salaires de son poste sur 3 sources',
              xp_reward: 30,
              frequency_days: 21,
            },
            {
              title: 'Lister 5 réalisations concrètes à valoriser',
              xp_reward: 30,
              frequency_days: 21,
            },
            {
              title: 'Rédiger le pitch de négociation en moins de 2 minutes',
              xp_reward: 40,
              frequency_days: 21,
            },
          ],
        },
        {
          title: 'S’entraîner et passer à l’action',
          description:
            'Répète la négociation à voix haute, identifie les objections probables et fixe un rendez-vous avec ton manager.',
          xp_reward: 200,
          stat_impacts: { social: 5, discipline: 3, calme: 2 },
          tasks: [
            {
              title: 'Simuler la négociation avec un proche ou devant un miroir',
              xp_reward: 40,
              frequency_days: 21,
            },
            {
              title: 'Planifier ou mener l’entretien de négociation',
              xp_reward: 60,
              frequency_days: 21,
            },
          ],
        },
      ],
    },

    // 13. Étudier un entrepreneur à succès
    {
      title: 'Décortiquer un entrepreneur qui inspire',
      description:
        'Plonge dans la biographie, les interviews et la méthode d’un entrepreneur que tu admires. Extrais des leçons actionnables et applique-en au moins une.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 360,
      objectives: [
        {
          title: 'Étudier en profondeur le parcours de l’entrepreneur choisi',
          description:
            'Lis, écoute ou regarde plusieurs sources sur cette personne, puis synthétise ses principes clés.',
          xp_reward: 200,
          stat_impacts: { focus: 4, creativite: 3, discipline: 2 },
          tasks: [
            {
              title: 'Lire un chapitre de sa biographie ou regarder une interview',
              xp_reward: 20,
              frequency_days: 3,
            },
            {
              title: 'Rédiger une synthèse de 5 leçons tirées de son parcours',
              xp_reward: 40,
              frequency_days: 21,
            },
          ],
        },
        {
          title: 'Appliquer une leçon concrète à sa propre vie',
          description:
            'Choisis une habitude, une méthode ou une décision inspirée de cet entrepreneur et mets-la en œuvre.',
          xp_reward: 160,
          stat_impacts: { discipline: 4, creativite: 2 },
          tasks: [
            {
              title: 'Identifier la leçon la plus applicable à sa situation',
              xp_reward: 20,
              frequency_days: 21,
            },
            {
              title: 'Mettre en pratique cette leçon durant au moins 7 jours',
              xp_reward: 30,
              frequency_days: 7,
            },
          ],
        },
      ],
    },

    // 14. Constituer un fonds d’urgence
    {
      title: 'Bâtir son matelas de sécurité',
      description:
        'Vise 3 mois de dépenses essentielles en réserve. Définis le montant cible, ouvre un livret dédié et alimente-le méthodiquement pendant 30 jours.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 30,
      xp_reward: 440,
      objectives: [
        {
          title: 'Définir et amorcer son fonds d’urgence',
          description:
            'Calcule la cible (3 mois de charges fixes), ouvre un livret séparé et y verse le premier montant.',
          xp_reward: 440,
          stat_impacts: { discipline: 6, focus: 4 },
          tasks: [
            {
              title: 'Calculer ses dépenses essentielles mensuelles et fixer l’objectif',
              xp_reward: 30,
              frequency_days: 30,
            },
            {
              title: 'Ouvrir un livret dédié au fonds d’urgence',
              xp_reward: 30,
              frequency_days: 30,
            },
            {
              title: 'Effectuer un virement sur le fonds d’urgence cette semaine',
              xp_reward: 35,
              frequency_days: 7,
            },
            {
              title: 'Visualiser la progression vers l’objectif cible',
              xp_reward: 15,
              frequency_days: 7,
            },
          ],
        },
      ],
    },

    // 15. Comparer et réduire ses factures
    {
      title: 'Auditer et réduire ses factures fixes',
      description:
        'Passe en revue tes factures récurrentes (énergie, téléphone, internet, assurances) et renégocie ou change de fournisseur pour chaque poste optimisable.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 14,
      xp_reward: 280,
      objectives: [
        {
          title: 'Réduire au moins 2 factures fixes grâce à la comparaison',
          description:
            'Compare les offres du marché et contacte les fournisseurs actuels pour renégocier ou migrer vers une offre moins chère.',
          xp_reward: 280,
          stat_impacts: { discipline: 4, focus: 3 },
          tasks: [
            {
              title: 'Lister toutes les factures fixes et leurs montants actuels',
              xp_reward: 20,
              frequency_days: 14,
            },
            {
              title: 'Comparer les offres concurrentes pour chaque poste',
              xp_reward: 30,
              frequency_days: 14,
            },
            {
              title: 'Contacter le fournisseur ou changer d’offre pour au moins 2 postes',
              xp_reward: 50,
              frequency_days: 14,
            },
          ],
        },
      ],
    },

    // 16. Mettre son administratif perso à jour
    {
      title: 'Remettre son administratif en ordre',
      description:
        'Classe tes documents importants, vérifie tes contrats et assurances, et règle les démarches en attente. Un dossier en ordre évite les mauvaises surprises.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 14,
      xp_reward: 300,
      objectives: [
        {
          title: 'Classer et mettre à jour tous les documents administratifs clés',
          description:
            'Rassemble, numérise et organise tes papiers essentiels (identité, assurances, contrats, fiscal).',
          xp_reward: 180,
          stat_impacts: { discipline: 5, focus: 2 },
          tasks: [
            {
              title: 'Trier et classer les documents papier ou numériques par catégorie',
              xp_reward: 30,
              frequency_days: 14,
            },
            {
              title: 'Numériser et sauvegarder les documents importants en sécurité',
              xp_reward: 30,
              frequency_days: 14,
            },
            {
              title: 'Vérifier les dates d’expiration (carte d’identité, passeport, assurance)',
              xp_reward: 20,
              frequency_days: 14,
            },
          ],
        },
        {
          title: 'Solder les démarches administratives en attente',
          description:
            'Identifie chaque tâche administrative repoussée et règle-la avant la fin de la quête.',
          xp_reward: 120,
          stat_impacts: { discipline: 3, focus: 2 },
          tasks: [
            {
              title: 'Lister toutes les démarches en attente',
              xp_reward: 20,
              frequency_days: 14,
            },
            {
              title: 'Traiter au moins 3 démarches en suspens',
              xp_reward: 40,
              frequency_days: 14,
            },
          ],
        },
      ],
    },

    // 17. Lire les actualités économiques chaque jour
    {
      title: 'S’informer sur l’économie chaque matin',
      description:
        'Pendant 21 jours, consacre 10 minutes à la lecture des actualités économiques. Comprendre le monde financier, c’est mieux naviguer dedans.',
      type: 'secondary',
      difficulty: 'easy',
      duration_days: 21,
      xp_reward: 340,
      objectives: [
        {
          title: 'Lire les actualités économiques 21 jours de suite',
          description:
            'Sélectionne une ou deux sources fiables et fais-en une habitude matinale régulière.',
          xp_reward: 340,
          stat_impacts: { focus: 5, discipline: 4 },
          tasks: [
            {
              title: 'Lire ou écouter 10 minutes d’actualités économiques',
              xp_reward: 15,
              frequency_days: 1,
            },
            {
              title: 'Noter chaque semaine l’info économique qui t’a le plus marqué',
              xp_reward: 30,
              frequency_days: 7,
            },
            {
              title: 'Rédiger une réflexion personnelle sur un sujet économique',
              xp_reward: 40,
              frequency_days: 21,
              is_optional: true,
            },
          ],
        },
      ],
    },

    // 18. Définir ses objectifs de carrière à 3 ans
    {
      title: 'Tracer sa feuille de route carrière à 3 ans',
      description:
        'Prends le recul nécessaire pour définir où tu veux être professionnellement dans 3 ans, puis traduis cette vision en étapes concrètes et actionnables.',
      type: 'secondary',
      difficulty: 'medium',
      duration_days: 14,
      xp_reward: 420,
      objectives: [
        {
          title: 'Clarifier sa vision de carrière à 3 ans',
          description:
            'Explore tes motivations profondes, identifie le poste ou le statut visé, et formule une vision claire et motivante.',
          xp_reward: 220,
          stat_impacts: { focus: 5, creativite: 3, discipline: 2 },
          tasks: [
            {
              title: 'Répondre à 5 questions clés sur ses aspirations professionnelles',
              xp_reward: 30,
              frequency_days: 14,
            },
            {
              title: 'Rédiger sa vision de carrière à 3 ans en un paragraphe',
              xp_reward: 40,
              frequency_days: 14,
            },
          ],
        },
        {
          title: 'Convertir la vision en plan d’action',
          description:
            'Décompose la vision en jalons annuels et en actions concrètes pour les 90 prochains jours.',
          xp_reward: 200,
          stat_impacts: { discipline: 5, focus: 3 },
          tasks: [
            {
              title: 'Identifier les 3 compétences à développer en priorité',
              xp_reward: 30,
              frequency_days: 14,
            },
            {
              title: 'Rédiger un plan d’action à 90 jours avec des étapes mesurables',
              xp_reward: 50,
              frequency_days: 14,
            },
          ],
        },
      ],
    },
  ],

  meta: {
    'Traquer chaque centime': {
      themes: ['finance', 'discipline'],
      context: ['reset', 'improve'],
      summary:
        'Reprends le contrôle total de ton argent en consignant chaque dépense pendant 30 jours.',
    },
    'Poser les fondations de son budget': {
      themes: ['finance', 'discipline'],
      context: ['reset', 'improve'],
      summary:
        'Construis ton premier budget mensuel et alloue chaque euro à un rôle précis.',
    },
    'No-spend : 14 jours sans superflu': {
      themes: ['finance', 'discipline', 'minimalism'],
      context: ['reset', 'challenge'],
      summary:
        'Tiens le défi de zéro dépense superflue pendant deux semaines pour resetter tes habitudes financières.',
    },
    'La règle des 10% — paye-toi en premier': {
      themes: ['finance', 'discipline'],
      context: ['improve', 'challenge'],
      summary:
        'Installe l’habitude fondamentale d’épargner 10% de tes revenus dès leur réception.',
    },
    'Chasse aux abonnements fantômes': {
      themes: ['finance', 'minimalism'],
      context: ['reset', 'improve'],
      summary:
        'Traque et résilie tous les abonnements qui prélèvent sans te servir.',
    },
    'Premier pas en bourse': {
      themes: ['finance', 'focus'],
      context: ['improve', 'challenge'],
      summary:
        'Apprends les bases de l’investissement et réalise ton premier achat d’ETF.',
    },
    'Désencombrer pour monétiser': {
      themes: ['finance', 'minimalism'],
      context: ['reset', 'improve'],
      summary:
        'Transforme tes objets inutilisés en argent en vendant 10 articles en un mois.',
    },
    'Créer son premier revenu annexe': {
      themes: ['finance', 'creative'],
      context: ['improve', 'challenge'],
      summary:
        'Lance une première source de revenus complémentaires en partant de tes compétences existantes.',
    },
    'Vitrine pro : CV et LinkedIn au top': {
      themes: ['finance', 'social'],
      context: ['reset', 'improve'],
      summary:
        'Refais ton CV et LinkedIn pour incarner qui tu es aujourd’hui et attirer de meilleures opportunités.',
    },
    'Étendre son réseau pro chaque semaine': {
      themes: ['finance', 'social'],
      context: ['improve', 'challenge'],
      summary:
        'Développe activement ton réseau en ajoutant un nouveau contact professionnel chaque semaine.',
    },
    'Maîtriser une compétence qui rapporte': {
      themes: ['finance', 'focus'],
      context: ['improve', 'challenge'],
      summary:
        'Consacre 30 jours à apprendre une compétence à haute valeur marchande et produis un premier livrable.',
    },
    'Négocier son salaire avec méthode': {
      themes: ['finance', 'social'],
      context: ['improve', 'challenge'],
      summary:
        'Prépare et mène une négociation salariale solide grâce à des données et un entraînement ciblé.',
    },
    'Décortiquer un entrepreneur qui inspire': {
      themes: ['finance', 'mind'],
      context: ['improve', 'challenge'],
      summary:
        'Étudie le parcours d’un entrepreneur à succès et applique une de ses leçons à ta propre vie.',
    },
    'Bâtir son matelas de sécurité': {
      themes: ['finance', 'discipline'],
      context: ['reset', 'improve'],
      summary:
        'Lance ton fonds d’urgence et vise 3 mois de dépenses essentielles en réserve.',
    },
    'Auditer et réduire ses factures fixes': {
      themes: ['finance', 'minimalism'],
      context: ['reset', 'improve'],
      summary:
        'Compare et renégocie tes abonnements fixes pour libérer des euros chaque mois.',
    },
    'Remettre son administratif en ordre': {
      themes: ['finance', 'discipline'],
      context: ['reset'],
      summary:
        'Mets à jour tes documents, règle les démarches en attente et gagne en sérénité administrative.',
    },
    'S’informer sur l’économie chaque matin': {
      themes: ['finance', 'focus'],
      context: ['improve'],
      summary:
        'Cultive une veille économique quotidienne pour mieux comprendre le monde dans lequel ton argent évolue.',
    },
    'Tracer sa feuille de route carrière à 3 ans': {
      themes: ['finance', 'focus'],
      context: ['reset', 'improve', 'challenge'],
      summary:
        'Clarifie ta vision professionnelle à 3 ans et trace un plan d’action concret pour les 90 prochains jours.',
    },
  },
};
