# Domowy Kompas UI

Projekt interfejsu systemu "Domowy Kompas" budowany w oparciu o Tauri v2, React 19 i Vite 7.

## 🏗 Architektura Projektu

Stosujemy podejście **Feature-First**. Każda nowa funkcjonalność powinna znajdować się w `src/features/[nazwa-feature]/`.

### Struktura Feature:
- `components/` - Komponenty UI specyficzne dla danego modułu.
- `hooks/` - Customowe hooki do logiki i pobierania danych.
- `types/` - Definicje interfejsów TypeScript.
- `[feature-name].css` - Stylizacja modułu (korzystająca z globalnych zmiennych).
- `[FeatureName]Page.tsx` - Główny kontener strony.

## 🛠 Rozwój i Mockowanie (Backend)

Obecnie backend jest mockowany za pomocą `json-server`.

- **Uruchamianie**: `npm run dev:mock` (uruchamia jednocześnie Vite i Mock Server).
- **Konfiguracja**: `mocks/db.json` zawiera bazę danych, a `mocks/server.js` obsługuje middleware (np. symulację opóźnień sieciowych 1-5s).
- **Pobieranie danych**: Używamy `src/api/client.ts` do komunikacji. Wszystkie endpointy powinny być w formacie `kebab-case`.

## 🎨 Standardy UI/UX

Aplikacja dąży do estetyki **premium desktop app**:

1.  **Layout (App Shell)**:
    - Cała aplikacja jest zamknięta w `100vh` bez scrolla głównego okna (`overflow: hidden` na `.layout`).
    - Tylko środkowy kontener `.layout-content` posiada `overflow-y: auto`.
    - Sidebar, TopNavBar i Footer są zawsze przypięte do krawędzi ekranu.
2.  **Loading States**:
    - Nie używamy prostych loaderów (spinnerów) tam, gdzie to możliwe.
    - Stosujemy **Skeleton Screens** (korzystając z `react-loading-skeleton`). Skelefony powinny odzwierciedlać finalną strukturę komponentu.
3.  **Stylizacja**:
    - Używamy Vanilla CSS z silnym oparciem o zmienne CSS zdefiniowane w `src/index.css` (blok `:root`).
    - Unikamy `min-height` na poziomie stron, aby nie wymuszać niepotrzebnych scrolli w układzie App Shell.

## 📊 Obsługa Danych

- **Filtrowanie/Pagowanie**: Preferujemy filtrowanie po stronie klienta dla mniejszych zestawów danych (np. transakcje), aby zapewnić natychmiastową reakcję UI.
- **Derived State**: Obliczamy sumy i statystyki w `useMemo` na podstawie pobranych surowych danych.

## 📊 Analityka

Korzystamy z Firebase Analytics. Kod pomocniczy znajduje się w `src/utils/analytics.ts`.

- **`trackEvent(name, params?)`** — wysyła dowolne zdarzenie (bezpiecznie, nigdy nie rzuca błędem)
- **`trackPageView(pageName)`** — skrót do `trackEvent('page_view_{pageName}')`

Wszystkie zdarzenia opisane są w [`docs/analytics.md`](docs/analytics.md).

> **Zasady**: Nie wysyłamy danych osobowych (PII). Zdarzenia pagowe odpalają się raz przy montowaniu komponentu. Gdy `MEASUREMENT_ID` brakuje, aplikacja działa normalnie bez analityki.

---

*Dokumentacja zaktualizowana: 2026-04-29*
