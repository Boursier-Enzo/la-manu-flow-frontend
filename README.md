# LaManuFlow — Front

Interface web de LaManuFlow, pour le suivi de l'alternance et de la vie scolaire.

## Stack

- Next.js App Router
- React et TypeScript strict
- Tailwind CSS
- API Symfony (intégration en cours)

Le projet n'utilise actuellement ni TanStack Query ni un store global. Ajoutez une bibliothèque seulement lorsqu'un besoin concret le justifie.

## Prérequis

- Node.js 22 ou supérieur
- npm
- API Symfony pour utiliser les fonctionnalités qui la consomment

## Démarrer

```bash
npm ci
npm run dev
```

Le front démarre sur http://localhost:3000. Les appels de la feature `candidatures` ciblent `/api/backend/candidatures`. La route Next qui relaie ces appels vers Symfony reste à implémenter ; la page affichera donc une erreur tant que cette intégration n'est pas ajoutée.

## Commandes

| Commande | Description |
| --- | --- |
| `npm run dev` | Démarre le serveur de développement |
| `npm run build` | Vérifie les types et crée le build de production |
| `npm run start` | Démarre le build de production |
| `npm run lint` | Lance ESLint |
| `npm run format` | Formate les fichiers de `src/` |

## Architecture

```text
src/
├── app/                              # Routing et composition Next.js
│   ├── (app)/                        # Groupe de routes de l'application
│   │   └── candidatures/
│   │       └── page.tsx              # Adaptateur URL → feature
│   ├── globals.css
│   └── layout.tsx
├── core/                             # Socle technique commun
│   ├── config/                       # Configuration de l'application
│   ├── http/                         # Client et erreurs HTTP communs
│   └── session/                      # Accès central à la session
├── features/
│   └── candidatures/                 # Exemple de feature métier
│       ├── api/
│       │   └── candidatures.api.ts
│       ├── components/
│       │   └── CandidatureCard.tsx
│       ├── hooks/
│       │   └── use-candidatures.ts
│       ├── pages/
│       │   └── CandidaturesPage.tsx
│       ├── types/
│       │   └── candidature.types.ts
│       └── index.ts                  # API publique de la feature
└── shared/                           # Code réutilisé entre features
    ├── components/                   # Composants UI génériques
    ├── hooks/                        # Hooks React génériques
    ├── pages/                        # Compositions de page génériques
    └── types/                        # Types réellement communs
```

### Responsabilités et dépendances

- `app/` connaît Next.js : routes, layouts, métadonnées et Route Handlers.
- `features/` contient le code lié à un domaine métier.
- `core/config/` regroupe la configuration centrale. Les secrets et variables privées ne doivent être lus que côté serveur.
- `core/http/` regroupe les primitives HTTP utilisées par plusieurs features : client partagé, erreurs et options communes. Les endpoints propres à un domaine restent dans `features/<domaine>/api/`.
- `core/session/` regroupe les mécanismes techniques de lecture et gestion de session. Les pages, formulaires et règles métier d'authentification restent dans `features/auth/`.
- `shared/components/` accueille les composants d'interface sans logique métier, réutilisés par plusieurs features (bouton, modal, état vide).
- `shared/hooks/` accueille les hooks React génériques réutilisés par plusieurs features. En React, le terme usuel est « hook » plutôt que « composable ».
- `shared/pages/` accueille uniquement les compositions de page génériques réutilisées par plusieurs routes. Les routes Next.js restent dans `app/` et les pages liées à un domaine restent dans `features/<domaine>/pages/`.
- `shared/types/` contient les types utilisés par plusieurs features. Les types propres à un domaine restent dans `features/<domaine>/types/`.
- Créez `providers/` uniquement si un contexte React doit être fourni globalement.

Les dépendances vont dans un seul sens :

```text
app → features
app, features → core
app, features → shared
```

`core/` et `shared/` ne dépendent ni de `app/` ni de `features/`. Une feature ne dépend pas d'une autre feature. Gardez la logique métier dans sa feature et n'ajoutez du code à `core/` ou `shared/` que s'il est réellement transversal.

### Composants, vues et hooks

- Un composant propre à une feature reste dans `features/<domaine>/components/`.
- Une vue qui compose les éléments d'une feature reste dans `features/<domaine>/pages/`. `app/` ne contient que la route Next.js qui l'affiche.
- Une composition réutilisable entre plusieurs routes peut aller dans `shared/pages/`. N'y placez pas une page liée à une feature.
- Un hook métier reste dans `features/<domaine>/hooks/`. Un hook générique utilisé par plusieurs features va dans `shared/hooks/`.

### Ajouter une feature

Ne créez que les dossiers nécessaires à la fonctionnalité. Une feature simple peut commencer ainsi :

```text
features/mon-domaine/
├── components/
├── types/
└── index.ts
```

Ajoutez `api/`, `hooks/`, `pages/` ou `schemas/` seulement quand la feature en a besoin. Évitez les fichiers et dossiers vides précréés « au cas où ».

Dans une route Next.js, gardez `page.tsx` mince :

```tsx
import { MonDomainePage } from "@/features/mon-domaine";

export default function Page() {
  return <MonDomainePage />;
}
```

Depuis `app/` ou une autre feature, importez via l'API publique :

```tsx
import { CandidaturesPage } from "@/features/candidatures";
```

À l'intérieur de `features/candidatures/`, les fichiers peuvent s'importer directement entre eux. Cela évite de faire passer les imports internes par le barrel `index.ts`.

### App Router et authentification

Les dossiers entre parenthèses, comme `(app)`, sont des groupes de routes Next.js : ils n'apparaissent pas dans l'URL et ne sécurisent pas les pages. Par exemple, `app/(app)/candidatures/page.tsx` correspond à `/candidatures`.

L'authentification n'est pas encore implémentée dans ce dépôt. Lorsqu'elle sera ajoutée, protégez les routes côté serveur (par exemple dans le layout du groupe privé) et vérifiez toujours les autorisations côté Symfony. Masquer un lien ou utiliser un groupe de routes ne constitue pas un contrôle d'accès.

### Client, serveur et API

- Préférez les Server Components. Ajoutez `'use client'` uniquement aux composants qui ont besoin d'état, d'effets ou d'API navigateur.
- Le code serveur et les secrets restent côté serveur, dans les Route Handlers ou `shared/server/`.
- Le navigateur ne doit pas recevoir de secret Symfony. La feature `candidatures` appelle `/api/backend/candidatures` ; le Route Handler Next qui relaie cet appel vers Symfony reste à implémenter.
- N'ajoutez pas de logique métier dans `shared/` : elle appartient à sa feature.

## Conventions

- TypeScript strict ; pas de `any`.
- Utilisez l'alias `@/` pour les imports depuis `src/`.
- N'ajoutez une dépendance ou une abstraction partagée que si elle répond à un besoin réel.
- Les noms de routes et d'URL sont en minuscules ; les composants React en PascalCase.

## Git et revue

- Branches : `main` (stable), `develop` (intégration), `feature/<module>-<sujet>`.
- Messages de commit au format Conventional Commits : `<type>(<scope>): <description>`.
- Types usuels : `feat`, `fix`, `docs`, `refactor`, `test`, `build`, `ci`, `chore`.
- Exemples : `feat(candidatures): add empty state`, `docs: clarify feature boundaries`, `ci: add GitHub Actions workflow`.
- Ouvrez une PR vers `develop` et faites relire les changements.
- Le workflow `.github/workflows/ci.yml` lance `npm ci`, `npm run lint` et `npm run build` à chaque push et pull request.
- Attendez la réussite de la CI avant de fusionner une PR.
