# Arctior Frontend

Site public Arctior si panou de administrare pentru categorii si produse.

## Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- react-i18next
- Zod pentru validarea formularelor
- Vitest si Testing Library pentru teste

## Cerinte

- Node.js 20+
- npm 10+

## Setup Local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Aplicatia ruleaza implicit la `http://localhost:5173`.

## Comenzi

| Comanda | Descriere |
| --- | --- |
| `npm run dev` | Porneste serverul Vite |
| `npm run build` | Ruleaza TypeScript si build de productie |
| `npm run preview` | Preview local pentru build |
| `npm run lint` | Ruleaza ESLint |
| `npm run typecheck` | Ruleaza TypeScript fara emit |
| `npm test` | Ruleaza testele Vitest |
| `npm run test:watch` | Teste in watch mode |
| `npm run test:ui` | Interfata Vitest UI |

## Environment

Vezi `.env.example`.

| Variabila | Required | Descriere |
| --- | --- | --- |
| `VITE_API_BASE_URL` | Da in productie | URL public backend |
| `VITE_UPLOAD_ENDPOINT` | Nu | Endpoint upload, default `/upload` |
| `VITE_SENTRY_DSN` | Nu | DSN pentru error tracking |

Variabilele `VITE_*` ajung in bundle-ul client. Nu pune secrete acolo.

## Structura

```text
src/
  admin/       Panoul de administrare
  api/         Clientul API
  assets/      Imagini si asset-uri statice
  components/  Layout, sectiuni si UI reutilizabil
  context/     Provideri React
  lib/         Validatoare si utilitare
  pages/       Pagini publice
```

## Routing

- `/` pagina principala
- `/categorie/:slug` pagina categorie
- `/admin` login admin
- `/admin/register` register initial
- `/admin/recovery` recuperare parola
- `/admin/reset-password?token=...` reset parola
- `/admin/emergency` emergency reset
- `/admin/dashboard` dashboard protejat
- orice alta ruta afiseaza 404

## Securitate

- Vercel livreaza headere de securitate din `vercel.json`.
- API clientul foloseste `credentials: include`, pregatit pentru sesiuni cookie HttpOnly.
- Pentru compatibilitate cu backend-ul curent, tokenul Bearer existent este inca folosit unde endpointurile il cer.
- Mesajele afisate userilor sunt sanitizate prin coduri allowlist.
- Formularele admin au validare client cu Zod.

Migrarea completa de la localStorage la cookie HttpOnly necesita schimbari backend: setare cookie la login/setup/register, logout server-side si middleware care citeste cookie-ul.

## Workflow

```bash
git checkout main
git pull origin main
git checkout -b fix/nume-task
npm run lint
npm run typecheck
npm test
npm run build
```

Deschide Pull Request catre `main` dupa ce verificarile sunt verzi.
