# AI Agent Guidelines — domowy-kompas-ui

React + TypeScript (TS 6.0) personal finance management SPA built with Vite 8, Firebase (Auth + Firestore), tested with Vitest, linted with ESLint 10.

Polish-language UI ("Domowy Kompas" = "Home Compass").

---

## Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Vite HMR dev server on http://localhost:5173 |
| `npm run build` | `tsc -b && vite build` → `dist/` |
| `npm run test` | `vitest run` (single run, jsdom) |
| `npm run test:watch` | `vitest` (watch mode) |
| `npm run lint` | ESLint flat config |
| `npm run preview` | Vite preview of built `dist/` |

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| **Framework** | React 19 (hooks only, no classes) |
| **Routing** | React Router v7 (`BrowserRouter`, nested routes, `<Outlet />`) |
| **Language** | TypeScript ~6.0, strict mode, `verbatimModuleSyntax`, `erasableSyntaxOnly` |
| **Bundler** | Vite 8 + `@vitejs/plugin-react` |
| **Testing** | Vitest 4 + jsdom, React Testing Library, jest-dom |
| **Linting** | ESLint 10 + `typescript-eslint` + `react-hooks` + `react-refresh` |
| **Auth** | Firebase Auth (email/password, persistence, password reset) |
| **Database** | Cloud Firestore (per-user subcollections: `budgets`, `goals`, `transactions`, `reports`, `metadata`) |
| **Analytics** | Firebase Analytics (graceful fallback when no `MEASUREMENT_ID`) |
| **Icons** | `lucide-react`, PNG assets per feature |
| **Charts** | `recharts` (BarChart, PieChart) |
| **Skeletons** | `react-loading-skeleton` |
| **Hosting** | Firebase Hosting (SPA with `**` rewrite to `index.html`) |

---

## Project Structure

```
domowy-kompas-ui/
├── index.html              # Entry HTML (Inter font, ContentSquare)
├── vite.config.ts          # Vite + Vitest config
├── firebase.json           # Hosting config (SPA rewrite)
├── .firebaserc             # Default project: domowy-kompas
├── eslint.config.js        # Flat ESLint config
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
│
├── .github/
│   ├── AGENTS.md           ← you are here
│   ├── workflows/          # CI/CD (PR preview + merge deploy)
│   └── skills/             # react-frontend-implementation skill
│
├── docs/
│   └── analytics.md        # Event catalog (page views + interactions)
│
└── src/
    ├── main.tsx            # Entry: createRoot + StrictMode + App
    ├── App.tsx             # BrowserRouter + AuthProvider + NotificationProvider + Routes
    ├── App.css
    ├── index.css           # Global CSS variables + auth-page styles
    │
    ├── config/
    │   └── firebase.ts     # Firebase init (app, auth, db, analytics)
    │
    ├── context/
    │   ├── AuthContext.tsx         # AuthProvider + useAuth hook
    │   └── NotificationContext.tsx # NotificationProvider + useNotification + ToastContainer
    │
    ├── api/
    │   ├── auth.ts         # Firebase Auth API (login, register, logout, reset, observeAuthState)
    │   └── firestore.ts    # Firestore DAL (CRUD for users, budgets, goals, transactions, reports)
    │
    ├── types/
    │   ├── auth.ts         # AuthUser, AuthState, LoginCredentials, RegisterCredentials
    │   └── notifications.ts # Notification, NotificationType
    │
    ├── hooks/
    │   ├── useDashboardData.ts  # Aggregates budgets + goals + transactions for Dashboard
    │   ├── useBudgetsData.ts    # Fetches budgets from Firestore + computes summary
    │   ├── useGoalsData.ts      # Fetches goals from Firestore + computes summary
    │   └── useReportsData.ts    # Fetches reports + historical from Firestore
    │
    ├── utils/
    │   ├── analytics.ts    # trackEvent() + trackPageView() (error-safe)
    │   ├── format.ts       # formatCurrency(), formatCurrencySigned()
    │   └── firebaseErrors.ts # Firebase auth error code → Polish message
    │
    ├── constants/
    │   └── storage.ts      # AUTH_TOKEN_KEY, AUTH_USER_KEY
    │
    ├── components/         # Shared/reusable UI components
    │   ├── Layout.tsx       # App shell: Sidebar + TopNavBar + <Outlet/> + Footer
    │   ├── Layout.css
    │   ├── PublicLayout.tsx # Minimal shell for landing/auth pages
    │   ├── PublicLayout.css
    │   ├── Sidebar.tsx      # NavLinks + logout + "New transaction" button
    │   ├── Sidebar.css
    │   ├── TopNavBar.tsx    # Page title + user avatar
    │   ├── TopNavBar.css
    │   ├── Footer.tsx       # App name + copyright
    │   ├── Footer.css
    │   ├── LoginCard.tsx    # Login form (left branding + right form)
    │   ├── LoginCard.css
    │   ├── ProtectedRoute.tsx    # Redirects to /login if unauthenticated
    │   ├── PublicOnlyRoute.tsx   # Redirects to /dashboard if authenticated
    │   ├── Spinner.tsx / Spinner.css
    │   └── Notifications/
    │       ├── Toast.tsx
    │       ├── ToastContainer.tsx
    │       └── Notifications.css
    │
    ├── pages/              # Route-level page components
    │   ├── LandingPage.tsx     # Public landing / hero page
    │   ├── Login.tsx           # Wraps LoginCard
    │   ├── Register.tsx        # Registration form
    │   ├── Dashboard/          # Subdirectory with many subcomponents
    │   │   ├── Dashboard.tsx       # KPI cards + budgets + goals + recent ops
    │   │   ├── Dashboard.css
    │   │   ├── DashboardSkeletons.tsx
    │   │   ├── dashboardData.ts    # View types: KpiData, BudgetItem, GoalItem, etc.
    │   │   ├── Greeting.tsx / Greeting.css
    │   │   ├── KpiCards.tsx / KpiCards.css / KpiCard.css
    │   │   ├── BudgetsCard.tsx
    │   │   ├── GoalsCard.tsx
    │   │   ├── RecentOperations.tsx / RecentOperations.css
    │   │   ├── CardWithList.css
    │   │   ├── IconPlaceholder.tsx / IconPlaceholder.css
    │   │   ├── ProgressBar.tsx / ProgressBar.css
    │   │   └── index.ts
    │   ├── Transactions.tsx    # Delegates to TransactionsPage in features/
    │   ├── Budgets.tsx / Budgets.css
    │   ├── BudgetsSkeletons.tsx
    │   ├── Goals.tsx / Goals.css
    │   ├── GoalsSkeletons.tsx
    │   ├── Reports.tsx / Reports.css
    │   ├── ReportsSkeletons.tsx
    │   ├── Help.tsx / Help.css
    │   ├── Settings.tsx / Settings.css
    │   └── AddTransaction.tsx  # Wraps AddTransactionForm
    │
    ├── features/           # Feature-first modules
    │   ├── transactions/
    │   │   ├── types/index.ts       # Transaction, TransactionsSummary, BudgetStatus
    │   │   ├── hooks/useTransactions.ts  # Fetch + filter + paginate
    │   │   ├── components/
    │   │   │   ├── TransactionsHeader.tsx
    │   │   │   ├── TransactionsList.tsx
    │   │   │   ├── TransactionRow.tsx
    │   │   │   ├── SummaryWidget.tsx
    │   │   │   ├── BudgetWidget.tsx
    │   │   │   ├── ContextWidgets.tsx / ContextWidgets.css
    │   │   │   └── TransactionsSkeletons.tsx
    │   │   ├── TransactionsPage.tsx
    │   │   ├── AddTransactionForm.tsx / AddTransactionForm.css
    │   │   └── transactions.css
    │   └── payments/
    │       ├── types/index.ts           # PaymentMethod
    │       ├── hooks/usePaymentMethods.ts  # In-memory CRUD for payment methods
    │       └── ... (used by Settings page)
    │
    ├── test/
    │   └── setup.ts         # Vitest setup: mocks firebase/auth, firestore, localStorage, fetch
    │
    └── assets/              # PNG icons per feature/section
        ├── appIcon.png, plus.png, logout.png
        ├── login/
        ├── landing-page/
        ├── sidebar/ (white/ + green/ variants)
        ├── dashboard/
        ├── budgets/
        ├── goals/
        ├── help/
        └── ...
```

---

## Routing Architecture

```
<BrowserRouter>
  <AuthProvider>
    <NotificationProvider>
      <Routes>
        <!-- Public-only (redirect to /dashboard if logged in) -->
        <Route element={<PublicOnlyRoute />}>
          <Route element={<PublicLayout />}>     <!-- Footer only -->
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        <!-- Protected (redirect to /login if not auth) -->
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>           <!-- Sidebar + TopNavBar + Footer -->
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/transactions/create" element={<AddTransaction />} />
            <Route path="/budgets" element={<Budgets />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/help" element={<Help />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </NotificationProvider>
  </AuthProvider>
</BrowserRouter>
```

### Route Guard Behavior

| Guard | If loading | If authenticated | If not authenticated |
|-------|-----------|-----------------|---------------------|
| `ProtectedRoute` | Spinner | Render children/Outlet | Navigate to `/login` with `state.from` |
| `PublicOnlyRoute` | Spinner | Navigate to `/dashboard` | Render children/Outlet |

---

## Data Flow

### Firebase Auth

1. `src/config/firebase.ts` — initializes Firebase app, auth, db, analytics
2. `src/api/auth.ts` — wraps Firebase Auth methods:
   - `login(credentials, rememberMe)` — sets persistence, signs in, returns token + user
   - `register(credentials)` — creates user, updates profile, creates Firestore doc in `users/{uid}`
   - `logout()` — signs out
   - `observeAuthState(callback)` — subscribes to auth state, resolves Firestore profile before emitting
   - `sendPasswordReset(email)` — sends reset email
3. `src/context/AuthContext.tsx` — AuthProvider manages `user`, `isLoading`, `isSubmitting` state
4. Components call `useAuth()` from context

### Firestore Structure

```
users/{uid}/
├── (user document: name, surname, email, createdAt, updatedAt)
├── budgets/{id}        # name, spent, limit, color, createdAt, updatedAt
├── goals/{id}          # name, current, target, deadline, monthlyContribution, percentage, image, category
├── transactions/{id}   # date, time, title, category, categoryIcon, method, methodIcon, amount
├── reports/{id}        # summary, historicalData, categories, period
└── metadata/
    └── historical      # { data: HistoricalData[], updatedAt }
```

All mutating operations on subcollections add `createdAt`/`updatedAt` via `serverTimestamp()`.

### Data Hooks Pattern

Each page has a dedicated hook (`useDashboardData`, `useBudgetsData`, `useGoalsData`, `useReportsData`, `useTransactions`) that:
1. Gets current `user` from `useAuth()`
2. Calls Firestore DAL functions from `src/api/firestore.ts`
3. Computes derived state (summaries, percentages) locally with `useMemo`-equivalent logic
4. Returns `{ data, isLoading, error }` tuple

**Derived state is computed client-side** from raw Firestore data (no server-side aggregation).

### Transactions Feature Pattern

The `features/transactions/` module has a richer pattern:
- `useTransactions()` hook: fetches data, computes summary, manages filters (search, period, category, type), implements frontend pagination (pageSize=4)
- Filtering + pagination are done in-memory via `useMemo`
- Returns `{ transactions, summary, budget, filters, updateFilters, pagination }`

### Analytics

- `trackEvent(name, params?)` — fires `logEvent` on Firebase Analytics, error-safe
- `trackPageView(pageName)` — shorthands to `trackEvent('page_view_{name}')`
- Fired in `useEffect([], [])` on each page component mount
- Full event catalog: `docs/analytics.md`

---

## UI/UX Conventions

### Layout (App Shell)
- **100vh** with `overflow: hidden` on `.layout`
- Only `.layout-content` scrolls (`overflow-y: auto`)
- Sidebar, TopNavBar, Footer pinned to edges

### Loading States
- Use **Skeleton Screens** (`react-loading-skeleton`) that reflect final component structure
- Dedicated `*Skeletons.tsx` files per page (e.g. `DashboardSkeletons.tsx`, `BudgetsSkeletons.tsx`)
- Avoid plain spinners for data-loading (Spinner is for route-guard loading only)

### Error States
- Each page has `if (error) return <div>...</div>` with the error message
- Error is also tracked via `trackEvent('data_load_error', { page_name })`

### Styling
- **Vanilla CSS** only, no CSS-in-JS, no Tailwind, no Sass
- CSS variables in `:root` in `src/index.css`
- No `min-height` on page containers (breaks the App Shell scroll contract)
- Component CSS files co-located (e.g. `Footer.tsx` + `Footer.css`)

### Notifications
- Toast system via `NotificationContext` + `ToastContainer`
- `useNotification().showNotification(message, type, duration, link?)`
- Types: `success`, `error`, `info`, `warning`

---

## Code Style

### Imports (strict ordering)
1. React (`import { useState } from 'react'`)
2. React Router (`import { NavLink } from 'react-router-dom'`)
3. Third-party (`lucide-react`, `recharts`, etc.)
4. Firebase (`firebase/auth`, `firebase/firestore`)
5. Local (context, hooks, utils, components, CSS)

**Type imports**: `import type { ReactNode } from 'react'`

### Formatting
- No Prettier — rely on ESLint `npm run lint`
- 2-space indentation
- Single quotes
- No semicolons (check existing code; some files use semicolons inconsistently — match the file you're editing)
- Named exports everywhere except `App` (default export)

### TypeScript Rules
- Explicit return types on all functions: `function Foo(): ReactElement`
- Props interfaces: `interface FooProps { ... }`
- Never `any` — prefer `unknown` with type guards
- No non-null assertion (`!`) — use conditional checks
- `verbatimModuleSyntax: true` — use `import type` for type-only imports
- `erasableSyntaxOnly: true` — no enums, no namespaces, no parameter properties

### Naming
| Thing | Convention | Example |
|-------|-----------|---------|
| Components | PascalCase | `Dashboard.tsx`, `KpiCard.tsx` |
| Hooks | camelCase with `use` prefix | `useDashboardData` |
| Props interfaces | `ComponentNameProps` | `LayoutProps` |
| Test files | `.test.tsx` suffix, co-located | `Budgets.test.tsx` |
| Constants | SCREAMING_SNAKE_CASE | `AUTH_TOKEN_KEY` |
| Utils | kebab-case | `format.ts`, `firebaseErrors.ts` |

### Component Template
```tsx
import type { ReactElement, ReactNode } from 'react'
import './Component.css'

interface ComponentProps {
  children: ReactNode
}

export function Component({ children }: ComponentProps): ReactElement {
  return (
    <div className="component">
      {children}
    </div>
  )
}
```

---

## Testing

### Setup (`src/test/setup.ts`)
- jest-dom matchers loaded globally
- `firebase/auth` mocked: `getAuth`, `signInWithEmailAndPassword`, `createUserWithEmailAndPassword`, `onAuthStateChanged` (auto-emits mock user), etc.
- `firebase/firestore` mocked: `doc`, `getDoc` (returns mock user profile), `setDoc`, `serverTimestamp`
- `localStorage` mocked with `auth_user` pre-set
- `fetch` mocked with response routing for common endpoints

### Test Pattern
```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { Dashboard } from './Dashboard'

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('Dashboard', () => {
  it('renders heading', async () => {
    renderWithRouter(<Dashboard />)
    expect(await screen.findByRole('heading', { name: /dzień dobry/i })).toBeInTheDocument()
  })
})
```

### Key Testing Rules
- Components using `<NavLink>` or `<Link>` need `<BrowserRouter>` wrapper
- Components using `useAuth` need `<AuthProvider>` wrapper
- Async operations: prefer `findBy*` (waits up to 1s) over `getBy*`
- Test user-visible behavior, not implementation details
- `userEvent` for interactions (not `fireEvent`)

---

## Adding a New Feature

### New Page
1. Create `src/pages/NewPage.tsx` with `export function NewPage(): ReactElement`
2. Create `src/pages/NewPage.css`
3. Create `src/pages/NewPageSkeletons.tsx` if data-loading
4. Add route in `App.tsx` under `<ProtectedRoute>` / `<Layout>`
5. Add nav item in `src/components/Sidebar.tsx` (with white + green icon variants)
6. Create test file `src/pages/NewPage.test.tsx`

### New Feature Module
Follow the feature-first pattern in `src/features/`:
```
src/features/{feature}/
├── types/index.ts           # Data interfaces
├── hooks/use{Feature}.ts    # Data fetching + logic
├── components/              # Feature-specific UI components
├── {Feature}Page.tsx        # Page-level component (or used by page wrapper)
└── {feature}.css            # Styles
```

---

## Common Pitfalls

1. **Missing `<BrowserRouter>` in tests** — components using `<NavLink>` will throw
2. **Missing `<AuthProvider>` in tests** — components using `useAuth()` will throw
3. **Using `<a>` instead of `<NavLink>`** — causes full page reload (OK in Footer for `#` links)
4. **`any` type** — use `unknown` with type guards
5. **Missing return types** — functions should declare `: ReactElement` or `: void`
6. **Unused imports/vars** — ESLint `noUnusedLocals` will fail the build
7. **CSS imports** — `import './Component.css'` inside the component file
8. **Semicolons** — the codebase is inconsistent; match the surrounding file
9. **`verbatimModuleSyntax`** — type-only imports MUST use `import type { ... }`
10. **`erasableSyntaxOnly`** — no enums, no `parameter properties`, no `namespace`
11. **Auth state in tests** — `onAuthStateChanged` auto-emits a mock user in setup
12. **Firestore in tests** — `getDoc` returns mock profile; no real Firestore
13. **Feature-first vs pages** — features have their own types/hooks/components; pages import them
14. **Skeleton loading** — use skeletons, not spinners, for data-loading states
