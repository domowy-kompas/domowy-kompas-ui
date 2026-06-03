# Domowy Kompas UI

Frontend aplikacji **Domowy Kompas** oparty o **React 19 + TypeScript + Vite 8**.
Projekt korzysta z **Firebase Authentication**, **Cloud Firestore** oraz **Firebase Analytics**.

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

W trybie produkcyjnym wymagane są: `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`.
Brak `VITE_FIREBASE_MEASUREMENT_ID` wyłącza jedynie analitykę (bez wpływu na działanie aplikacji).

## 📦 Dostępne skrypty

- `npm run dev` — uruchomienie środowiska developerskiego (Vite)
- `npm run build` — build produkcyjny (`tsc -b && vite build`)
- `npm run preview` — podgląd buildu
- `npm run lint` — linting ESLint
- `npm run test` — testy (`vitest run`)
- `npm run test:watch` — testy w trybie watch

## 🧱 Architektura i struktura

- Routing i bramy dostępu: `src/App.tsx` (`PublicOnlyRoute`, `ProtectedRoute`)
- Kontekst autoryzacji: `src/context/AuthContext.tsx`
- Warstwa danych Firebase: `src/api/auth.ts`, `src/api/firestore.ts`
- Konfiguracja Firebase: `src/config/firebase.ts`
- Moduły domenowe: `src/features/*`
- Strony aplikacji: `src/pages/*`

## 🎨 UI/UX

- Layout aplikacji oparty o App Shell (`Layout`) z wydzielonym obszarem scrollowania treści.
- Preferowane są **Skeleton Screens** (`react-loading-skeleton`) zamiast prostych spinnerów.
- Stylizacja oparta o **Vanilla CSS** i zmienne globalne z `src/index.css`.

## 📊 Analityka

Helpery analityczne:

- `trackEvent(name, params?)`
- `trackPageView(pageName)`

Szczegóły zdarzeń i zasady użycia znajdują się w [`docs/analytics.md`](docs/analytics.md).

## ☁️ CI/CD

Repozytorium posiada workflowy GitHub Actions wdrażające frontend na Firebase Hosting:

- preview dla Pull Requestów
- deployment na `master`

---

*Dokumentacja zaktualizowana: 2026-06-03*
