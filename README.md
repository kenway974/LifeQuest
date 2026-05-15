# LifeQuest

> Application web gamifiée de développement personnel.
> Transforme tes objectifs réels en quêtes RPG : XP, niveaux, trophées, séries.

![Stack](https://img.shields.io/badge/Next.js-16.2-black) ![React](https://img.shields.io/badge/React-19.2-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-4.0-cyan) ![Supabase](https://img.shields.io/badge/Supabase-Postgres-green) ![License](https://img.shields.io/badge/license-MIT-purple)

---

## 🎮 Concept

LifeQuest transforme ton développement personnel en aventure immersive façon jeu vidéo :

- **Quêtes principales** (30-90 jours) pour les grandes transformations de vie
- **Quêtes secondaires** (7-30 jours) en parallèle pour rester flexible
- **Quêtes personnalisées** (premium 2€ à vie) pour créer tes propres défis
- **Système XP & niveaux** : chaque tâche validée fait progresser
- **Trophées** avec rareté Fortnite (Facile → Légendaire) à débloquer
- **Statistiques temps réel** : streaks, taux de complétion, historique
- **Notifications push** pour des rappels personnalisés
- **Personnalisation** : fond d'écran, ambiance

---

## 🏗 Stack technique

- **Framework** : [Next.js 16.2](https://nextjs.org) (App Router, Server Components, Server Actions)
- **Langage** : TypeScript en mode strict
- **UI** : React 19.2 + [Tailwind CSS 4.0](https://tailwindcss.com) + [lucide-react](https://lucide.dev) + [Framer Motion](https://www.framer.com/motion)
- **Auth + DB + Storage** : [Supabase](https://supabase.com) (PostgreSQL + Row Level Security)
- **Paiements** : [Stripe Checkout](https://stripe.com) (paiement unique 2€)
- **Notifications** : Web Push (VAPID) + Service Worker
- **Hébergement** : [Vercel](https://vercel.com) (recommandé)

---

## 🚀 Démarrage rapide

### Prérequis

- **Node.js** ≥ 22 (voir `.nvmrc`)
- **npm** ≥ 10 (ou pnpm/yarn)
- Un compte **Supabase** (gratuit) → [supabase.com](https://supabase.com)
- Un compte **Stripe** (gratuit) si tu veux activer les paiements → [stripe.com](https://stripe.com)

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configurer Supabase

1. Crée un nouveau projet sur [supabase.com/dashboard](https://supabase.com/dashboard).
2. Va dans **SQL Editor** et exécute le contenu de `supabase/migrations/0001_init.sql`.
3. Récupère depuis **Settings → API** :
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ secret)
4. **Optionnel — Google OAuth** : Dans **Authentication → Providers**, active Google et suis les instructions.

### 3. Configurer Stripe (optionnel pour le MVP local)

1. Sur [dashboard.stripe.com](https://dashboard.stripe.com), récupère tes clés en mode **Test**.
2. Crée un **Produit** → "Custom Quests Unlock" avec un prix unique de **2,00 €** (paiement unique, pas un abonnement).
3. Copie le `price_id` (format `price_xxx`) dans `.env.local`.
4. Pour les webhooks en local : utilise [Stripe CLI](https://stripe.com/docs/stripe-cli) :
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
   La commande affichera le `STRIPE_WEBHOOK_SECRET` (commence par `whsec_`).

### 4. Générer les clés VAPID (notifications push)

```bash
npx web-push generate-vapid-keys
```

Reporte les deux clés dans `.env.local` (`NEXT_PUBLIC_VAPID_PUBLIC_KEY` et `VAPID_PRIVATE_KEY`).

### 5. Créer `.env.local`

```bash
cp .env.example .env.local
```

Puis remplis toutes les variables comme indiqué ci-dessus.

### 6. Lancer le seed (peuple la DB avec les quêtes et trophées)

```bash
npm run db:seed
```

Cela ajoute ~15 quêtes principales, ~20 quêtes secondaires et 30 trophées au catalogue.

### 7. Démarrer le serveur de développement

```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000) — 🎮 GG !

---

## 📜 Scripts disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de dev (Turbopack, hot reload) |
| `npm run build` | Build de production |
| `npm start` | Lance le serveur en mode production |
| `npm run lint` | Lint avec ESLint |
| `npm run typecheck` | Vérifie le typage TypeScript |
| `npm run format` | Formate tout le code avec Prettier |
| `npm run db:types` | Régénère les types TypeScript depuis Supabase |
| `npm run db:seed` | Peuple la DB avec le contenu de départ |

---

## 🗂 Structure du projet

```
lifequest/
├── public/                       # Assets statiques (favicon, sw.js, manifest)
├── scripts/
│   └── seed.ts                   # Script de peuplement de la DB
├── src/
│   ├── app/                      # Routes Next.js App Router
│   │   ├── (public)              # Landing, login, signup, légal
│   │   ├── game/                 # App protégée (auth requise)
│   │   │   ├── page.tsx          # Menu principal RPG
│   │   │   ├── quests/           # Liste & démarrage des quêtes
│   │   │   ├── quest/[id]/       # Tracking quête active
│   │   │   ├── stats/            # Statistiques utilisateur
│   │   │   ├── trophies/         # Salle des trophées
│   │   │   ├── profile/          # Profil + recherche joueur
│   │   │   ├── customize/        # Personnalisation fond
│   │   │   └── settings/         # Paramètres + push
│   │   └── api/
│   │       ├── stripe/           # Checkout + webhook
│   │       └── push/             # Inscription notifications
│   ├── components/
│   │   └── game/                 # Composants spécifiques au jeu
│   ├── lib/
│   │   ├── env.ts                # Variables d'env typées (Zod)
│   │   ├── supabase/             # Clients (browser/server/admin)
│   │   └── utils.ts              # XP/level/difficulty helpers
│   ├── styles/
│   │   └── globals.css           # Design system néon
│   └── types/
│       └── database.ts           # Types DB Supabase
├── supabase/
│   └── migrations/0001_init.sql  # Schéma DB complet + RLS
├── middleware.ts                 # Refresh session + protection /game
└── next.config.mjs               # Security headers + CSP
```

---

## 🌍 Déploiement en production

### Option 1 — Vercel + Supabase (recommandé)

C'est le combo le plus rapide et le moins cher (gratuit jusqu'à plusieurs milliers d'utilisateurs).

1. Pousse le repo sur GitHub.
2. Importe le projet sur [vercel.com/new](https://vercel.com/new).
3. Vercel détecte automatiquement Next.js. Configure les **environment variables** (toutes celles du `.env.example`).
4. Pour `NEXT_PUBLIC_SITE_URL`, mets l'URL de production (ex: `https://lifequest.app`).
5. Configure les webhooks Stripe en production :
   - Dashboard Stripe → Webhooks → "Add endpoint"
   - URL : `https://ton-domaine.com/api/stripe/webhook`
   - Évents : `checkout.session.completed`
   - Copie le `Signing secret` dans Vercel → `STRIPE_WEBHOOK_SECRET`
6. Dans Supabase → **Authentication → URL Configuration** : ajoute ton domaine prod dans les redirect URLs.

### Option 2 — Alternative auto-hébergement

Le projet fonctionne aussi sur :
- **Railway** (Next.js + Postgres unifié)
- **Fly.io** (Docker)
- **Render** (Web Service + Postgres add-on)
- **VPS classique** avec PM2 + Nginx reverse proxy

Dans ces cas, garde Supabase pour l'auth/DB ou migre vers Postgres + NextAuth (le code est compatible).

---

## 🔒 Sécurité

Quelques points importants déjà gérés par le projet :

- ✅ **Row Level Security** activée sur toutes les tables (chaque user ne voit que ses données)
- ✅ **Headers de sécurité** : CSP, HSTS, X-Frame-Options, Referrer-Policy
- ✅ **Validation côté serveur** : tous les formulaires passent par Zod
- ✅ **Webhooks Stripe** : signature vérifiée côté serveur
- ✅ **Service role key** : utilisée uniquement côté serveur (webhooks, seeds)
- ✅ **Pas de secrets** dans le code ou les commits (`.env.local` ignoré)

À ajouter avant la prod :
- ⚠️ Rate limiting sur les routes API publiques (Upstash Ratelimit recommandé)
- ⚠️ Captcha sur signup pour éviter le spam (hCaptcha ou Turnstile)
- ⚠️ Monitoring d'erreurs (Sentry, Highlight…)

---

## 📋 Roadmap & TODO

### MVP livré
- [x] Authentification (email/password + Google OAuth)
- [x] Schéma DB complet avec RLS
- [x] Quêtes principales / secondaires / personnalisées
- [x] Système XP + niveaux + progression
- [x] 30 trophées avec rareté
- [x] Statistiques + streak
- [x] Notifications push (VAPID)
- [x] Paiement Stripe 2€ à vie
- [x] Personnalisation fond d'écran
- [x] Recherche joueur par pseudo
- [x] Mode hors-ligne basique (Service Worker)

### Améliorations recommandées (TODO dans le code)
- [ ] Upload de médias vers Supabase Storage (form Customize)
- [ ] Cron job pour envoyer les push notifs à l'heure définie
- [ ] Détection des streaks 7/30/60/100 jours (trophées)
- [ ] Page admin pour gérer le catalogue de quêtes
- [ ] Animations Framer Motion sur les transitions/level-ups
- [ ] Édition complète des quêtes custom (ajouter objectifs/tâches après création)

### Vision long terme (v2)
- [ ] Application mobile native (React Native)
- [ ] Système d'amis + guildes
- [ ] Défis communautaires
- [ ] Boutique de cosmétiques
- [ ] IA pour recommander des quêtes personnalisées
- [ ] Événements temporaires saisonniers
- [ ] i18n (anglais en priorité)

---

## 🛠 Dépannage

**"Invalid environment variables"** au démarrage → vérifie que tu as bien copié `.env.example` en `.env.local` et rempli toutes les variables marquées requises.

**"PGRST116" / RLS errors** → assure-toi d'avoir bien exécuté `0001_init.sql` dans Supabase. Vérifie aussi que le trigger `on_auth_user_created` est bien créé.

**Le webhook Stripe ne se déclenche pas en local** → utilise `stripe listen --forward-to localhost:3000/api/stripe/webhook`. En prod, vérifie que l'endpoint est bien configuré dans le dashboard Stripe.

**Les notifications push ne marchent pas** → vérifie que `NEXT_PUBLIC_VAPID_PUBLIC_KEY` et `VAPID_PRIVATE_KEY` sont bien définies, et que le navigateur supporte les push (Safari iOS < 16.4 ne supporte pas).

---

## 📄 Licence

MIT — voir [LICENSE](./LICENSE).

---

Made with ⚡ and ✨ for adventurers who refuse the default difficulty.
#   L i f e Q u e s t  
 