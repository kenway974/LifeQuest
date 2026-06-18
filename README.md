# LifeQuest

> Application web gamifiée de développement personnel.
> Transforme tes objectifs réels en quêtes RPG : XP, niveaux, trophées, séries, caractéristiques.

![Stack](https://img.shields.io/badge/Next.js-16.2-black) ![React](https://img.shields.io/badge/React-19.2-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-4.0-cyan) ![Supabase](https://img.shields.io/badge/Supabase-Postgres-green) ![License](https://img.shields.io/badge/license-MIT-purple)

---

## 🎮 Concept

LifeQuest transforme ton développement personnel en aventure immersive façon jeu vidéo :

- **Quêtes principales** (30-90 jours) : des _packages_ au titre abstrait et directionnel (« Devenir un chien de la casse », « Devenir entrepreneur », « La maîtrise du corps »…) regroupant plusieurs objectifs et tâches qui tirent dans la même direction pour franchir une étape de vie
- **Quêtes secondaires** (3-30 jours) : des défis directs et monolithiques, un objectif clair et autonome (« Immunisé au rejet », « Devenir Wim Hof », « Composer une musique », « Lire un livre »…)
- **Quêtes personnalisées** (premium 2€ à vie) pour créer tes propres défis
- **Système XP & niveaux** : chaque tâche validée fait progresser
- **9 caractéristiques RPG** : Force, Cardio, Endurance, Focus, Discipline, Calme, Émotion, Créativité, Social — évoluent selon les quêtes complétées
- **Trophées** avec rareté Fortnite (Facile → Légendaire) à débloquer
- **Tâches facultatives** récompensées en étoiles pour aller au-delà
- **Statistiques temps réel** : streaks, taux de complétion, historique
- **Recommandations de quêtes** selon ton profil et contexte
- **Notifications push** avec cron quotidien pour des rappels personnalisés
- **Multi-thèmes** : fond d'écran, thème adaptatif, couleur d'accent au choix

---

## 🏗 Stack technique

- **Framework** : [Next.js 16.2](https://nextjs.org) (App Router, Server Components, Server Actions)
- **Langage** : TypeScript en mode strict
- **UI** : React 19.2 + [Tailwind CSS 4.0](https://tailwindcss.com) + [lucide-react](https://lucide.dev) + [Framer Motion](https://www.framer.com/motion)
- **État global** : [Zustand](https://zustand-demo.pmnd.rs)
- **Data fetching** : [TanStack Query](https://tanstack.com/query)
- **Auth + DB + Storage** : [Supabase](https://supabase.com) (PostgreSQL + Row Level Security)
- **Notifications** : Web Push (VAPID) + Service Worker + cron Vercel
- **Tests** : [Vitest](https://vitest.dev)
- **Hébergement** : [Vercel](https://vercel.com) (recommandé)

---

## 🚀 Démarrage rapide

### Prérequis

- **Node.js** ≥ 22 (voir `.nvmrc`)
- **npm** ≥ 10 (ou pnpm/yarn)
- Un compte **Supabase** (gratuit) → [supabase.com](https://supabase.com)

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configurer Supabase

1. Crée un nouveau projet sur [supabase.com/dashboard](https://supabase.com/dashboard).
2. Va dans **SQL Editor** et exécute **dans l'ordre** toutes les migrations du dossier `supabase/migrations/` :
   - `0001_init.sql` — Schéma complet + RLS + triggers
   - `0002_storage_user_backgrounds.sql` — Bucket Storage pour les fonds
   - `0003_user_settings_theme.sql` — Colonnes thème/accent
   - `0004_tasks_frequency.sql` — Fréquence des tâches
   - `0005_character_stats.sql` — 9 caractéristiques RPG
   - `0006_stats_visibility.sql` — Profil public / privé
   - `0007_optional_tasks_stars.sql` — Tâches facultatives + étoiles
   - `0008_objective_daily_completions.sql` — Historique journalier
   - `0009_streak_freezes.sql` — Gels de série
   - `0010_free_custom_quests.sql` — Quêtes personnalisées gratuites pour tous
3. Récupère depuis **Settings → API** :
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ secret)
4. **Optionnel — Google OAuth** : Dans **Authentication → Providers**, active Google et suis les instructions.

### 3. Générer les clés VAPID (notifications push)

```bash
npx web-push generate-vapid-keys
```

Reporte les deux clés dans `.env.local` (`NEXT_PUBLIC_VAPID_PUBLIC_KEY` et `VAPID_PRIVATE_KEY`).

### 4. Créer `.env.local`

```bash
cp .env.example .env.local
```

Puis remplis toutes les variables comme indiqué ci-dessus.

### 5. Lancer le seed (peuple la DB avec les quêtes et trophées)

```bash
npm run db:seed
```

Cela ajoute ~37 quêtes principales, ~190 quêtes secondaires (couvrant corps, esprit, émotions, spiritualité, discipline, finance, social, créativité, détox, minimalisme, aventure…) et 50+ trophées au catalogue. Les quêtes d’extension vivent dans `src/data/quests/expansion-*.ts` (chaque module co-localise ses quêtes, ses impacts de stats et ses métadonnées de découverte).

> Pour ajouter du contenu **sans écraser** les données existantes (utile en prod) :
> ```bash
> npm run db:seed:add
> ```

### 6. Démarrer le serveur de développement

```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000) — 🎮 GG !

---

## 📜 Scripts disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de dev (hot reload) |
| `npm run build` | Build de production |
| `npm start` | Lance le serveur en mode production |
| `npm run lint` | Lint avec ESLint |
| `npm run typecheck` | Vérifie le typage TypeScript |
| `npm run format` | Formate tout le code avec Prettier |
| `npm run db:types` | Régénère les types TypeScript depuis Supabase |
| `npm run db:seed` | Seed destructif — réinitialise le catalogue |
| `npm run db:seed:add` | Seed additif — ajoute uniquement le contenu manquant |
| `npm test` | Lance les tests unitaires (Vitest) |
| `npm run test:watch` | Tests en mode watch |

---

## 🗂 Structure du projet

```
lifequest/
├── public/                         # Assets statiques (favicon, sw.js, manifest)
├── scripts/
│   ├── seed.ts                     # Seed destructif (reset catalogue)
│   └── seed-additive.ts            # Seed non-destructif (préserve la prod)
├── src/
│   ├── app/                        # Routes Next.js App Router
│   │   ├── (public)/               # Landing, login, signup, légal
│   │   ├── game/                   # App protégée (auth requise)
│   │   │   ├── page.tsx            # Menu principal (navigation XMB)
│   │   │   ├── character/          # Feuille de personnage + questionnaire baseline
│   │   │   ├── quests/             # Catalogue & démarrage des quêtes
│   │   │   ├── quest/[id]/         # Tracking quête active
│   │   │   ├── stats/              # Statistiques utilisateur
│   │   │   ├── trophies/           # Salle des trophées
│   │   │   ├── player/[pseudo]/    # Profil public d'un autre joueur
│   │   │   ├── profile/            # Mon profil + recherche joueur
│   │   │   ├── customize/          # Personnalisation fond + thème
│   │   │   └── settings/           # Paramètres + notifications push
│   │   └── api/
│   │       ├── push/               # Inscription notifications
│   │       └── cron/               # Cron Vercel — envoi push quotidien
│   ├── components/
│   │   ├── character/              # RadarChart des 9 stats RPG
│   │   ├── game/                   # Composants UI du jeu (XMBMenu, QuestCard…)
│   │   └── ui/                     # Composants génériques (Toast…)
│   ├── lib/
│   │   ├── character-stats.ts      # Définition des 9 stats (clés, labels, couleurs)
│   │   ├── character-stats-meta.ts # Impacts stats par objectif du catalogue
│   │   ├── quests-discover.ts      # Moteur de recommandation de quêtes
│   │   ├── quests.ts               # Logique quêtes (occurrences, tâches du jour)
│   │   ├── env.ts                  # Variables d'env typées (Zod)
│   │   ├── theme/                  # Extraction couleur d'accent depuis fond d'écran
│   │   └── supabase/               # Clients (browser/server/admin)
│   ├── styles/
│   │   └── globals.css             # Design system néon
│   └── types/
│       └── database.ts             # Types DB Supabase
├── supabase/
│   └── migrations/                 # 8 migrations SQL (0001 → 0008)
├── middleware.ts                   # Refresh session + protection /game
└── next.config.mjs                 # Security headers + CSP
```

---

## ⚔️ Caractéristiques RPG

À la première connexion, l'utilisateur remplit un **questionnaire baseline** (10 questions) qui initialise ses 9 stats de départ. Chaque quête complétée (ou ratée) fait évoluer ces statistiques, affichées sur un **RadarChart** dans la feuille de personnage (`/game/character`).

| Stat | Description |
|---|---|
| Force | Puissance physique |
| Cardio | Endurance cardiovasculaire |
| Endurance | Effort dans la durée |
| Focus | Concentration et clarté mentale |
| Discipline | Constance et rigueur |
| Calme | Gestion du stress |
| Émotion | Intelligence émotionnelle |
| Créativité | Expression et imagination |
| Social | Aisance relationnelle |

Les stats sont plafonnées à **110** (le sur-cap est atteignable via les tâches facultatives). Les objectifs du catalogue contribuent à des stats précises définies dans `lib/character-stats-meta.ts`.

---

## 🌍 Déploiement en production

### Option 1 — Vercel + Supabase (recommandé)

C'est le combo le plus rapide et le moins cher (gratuit jusqu'à plusieurs milliers d'utilisateurs).

1. Pousse le repo sur GitHub.
2. Importe le projet sur [vercel.com/new](https://vercel.com/new).
3. Vercel détecte automatiquement Next.js. Configure les **environment variables** (toutes celles du `.env.example`).
4. Pour `NEXT_PUBLIC_SITE_URL`, mets l'URL de production (ex: `https://lifequest.app`).
5. Dans Supabase → **Authentication → URL Configuration** : ajoute ton domaine prod dans les redirect URLs.
6. Le cron de notifications (`/api/cron/notify-tasks`) est déclenché une fois par jour via `vercel.json` — aucune config supplémentaire nécessaire.

### Option 2 — Alternative auto-hébergement

Le projet fonctionne aussi sur :
- **Railway** (Next.js + Postgres unifié)
- **Fly.io** (Docker)
- **Render** (Web Service + Postgres add-on)
- **VPS classique** avec PM2 + Nginx reverse proxy

Dans ces cas, garde Supabase pour l'auth/DB ou migre vers Postgres + NextAuth (le code est compatible). Le cron devra être planifié manuellement (crontab, GitHub Actions…).

---

## 🔒 Sécurité

Quelques points importants déjà gérés par le projet :

- ✅ **Row Level Security** activée sur toutes les tables (chaque user ne voit que ses données)
- ✅ **Headers de sécurité** : CSP, HSTS, X-Frame-Options, Referrer-Policy
- ✅ **Validation côté serveur** : tous les formulaires passent par Zod
- ✅ **Service role key** : utilisée uniquement côté serveur (seeds, cron)
- ✅ **Pas de secrets** dans le code ou les commits (`.env.local` ignoré)
- ✅ **Profil public/privé** : les stats ne sont visibles par d'autres joueurs que si `stats_public = true`

À ajouter avant la prod :
- ⚠️ Rate limiting sur les routes API publiques (Upstash Ratelimit recommandé)
- ⚠️ Captcha sur signup pour éviter le spam (hCaptcha ou Turnstile)
- ⚠️ Monitoring d'erreurs (Sentry, Highlight…)

---

## 📋 Roadmap & TODO

### Fonctionnalités livrées
- [x] Authentification (email/password + Google OAuth)
- [x] Schéma DB complet avec RLS (8 migrations)
- [x] Quêtes principales / secondaires / personnalisées
- [x] Système XP + niveaux + progression
- [x] 30 trophées avec rareté
- [x] Statistiques + streak
- [x] 9 caractéristiques RPG avec RadarChart
- [x] Tâches facultatives récompensées en étoiles
- [x] Système de recommandation de quêtes
- [x] Notifications push (VAPID) + cron quotidien
- [x] Quêtes personnalisées gratuites pour tous
- [x] Multi-thèmes (adaptatif + couleur d'accent)
- [x] Personnalisation fond d'écran
- [x] Profil public joueur (`/game/player/[pseudo]`)
- [x] Mode hors-ligne basique (Service Worker)

### Améliorations recommandées (TODO dans le code)
- [ ] Upload de médias vers Supabase Storage (form Customize)
- [ ] Détection des streaks 7/30/60/100 jours (trophées)
- [ ] Page admin pour gérer le catalogue de quêtes
- [ ] Animations Framer Motion sur les transitions/level-ups
- [ ] Édition complète des quêtes custom (ajouter objectifs/tâches après création)

### Vision long terme (v2)
- [ ] Application mobile native (React Native)
- [ ] Système d'amis + guildes
- [ ] Défis communautaires
- [ ] Événements temporaires saisonniers
- [ ] i18n (anglais en priorité)

---

## 🛠 Dépannage

**"Invalid environment variables"** au démarrage → vérifie que tu as bien copié `.env.example` en `.env.local` et rempli toutes les variables marquées requises.

**"PGRST116" / RLS errors** → assure-toi d'avoir exécuté **toutes** les migrations (0001 à 0010) dans Supabase. Vérifie aussi que le trigger `on_auth_user_created` est bien créé.

**Les notifications push ne marchent pas** → vérifie que `NEXT_PUBLIC_VAPID_PUBLIC_KEY` et `VAPID_PRIVATE_KEY` sont bien définies, et que le navigateur supporte les push (Safari iOS < 16.4 ne supporte pas).

**La feuille de personnage redirige en boucle** → l'utilisateur est redirigé vers `/game/character` tant que `stats_initialized = false` dans `profiles`. Lance le questionnaire baseline pour initialiser les stats.

---

## 📄 Licence

MIT — voir [LICENSE](./LICENSE).

---

Made with ⚡ and ✨ for adventurers who refuse the default difficulty.
