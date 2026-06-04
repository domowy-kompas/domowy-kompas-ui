# Domowy Kompas UI

Frontend aplikacji **Domowy Kompas** — osobisty asystent finansów domowych.
Oparty o **React 19 + TypeScript + Vite 8**, z Firebase (Auth, Firestore, Analytics).

## 🚀 Uruchomienie lokalne

```bash
npm ci
npm run dev
```

Aplikacja uruchamia się domyślnie pod `http://localhost:5173`.

## ⚙️ Zmienne środowiskowe

Skonfiguruj plik `.env.local`:

```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

W trybie produkcyjnym wymagane są `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`.
Brak `VITE_FIREBASE_MEASUREMENT_ID` wyłącza jedynie analitykę.

## 📦 Dostępne skrypty

| Komenda | Opis |
|---------|------|
| `npm run dev` | Dev server (Vite HMR, `localhost:5173`) |
| `npm run build` | `tsc -b && vite build` → `dist/` |
| `npm run preview` | Podgląd buildu |
| `npm run lint` | ESLint (flat config) |
| `npm run test` | `vitest run` |
| `npm run test:watch` | `vitest` (watch) |

## 📖 Dokumentacja

| Dokument | Opis |
|----------|------|
| [Zrzuty ekranu](docs/screenshots.md) | Wygląd poszczególnych widoków aplikacji |
| [Analityka (Google Analytics)](docs/analytics.md) | Zdarzenia, konfiguracja, debugowanie |
| [Wyniki Hotjar](docs/hotjar.md) | Mapy ciepła, nagrania sesji, feedback |
| [Przewodnik dla agenta AI (struktura, konwencje)](AGENTS.md) | Architektura, routing, data flow, konwencje kodu |

## ☁️ CI/CD

Workflowy GitHub Actions wdrażające frontend na Firebase Hosting:

- preview dla Pull Requestów
- deployment na `master`

---

*Dokumentacja zaktualizowana: 2026-06-03*
