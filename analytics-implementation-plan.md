# Analytics Implementation Plan

This plan covers the full set of suggested events and breaks implementation into safe, incremental steps. It assumes Firebase Analytics is initialized via `analyticsPromise` and uses a small helper to log events without breaking pages when Analytics is unavailable.

## Phase 0: Preparation
1. Add `VITE_FIREBASE_MEASUREMENT_ID` to the environment for each runtime (local, staging, production).
2. Confirm Firebase Analytics is enabled in the Firebase console for the project.
3. Decide the final event naming scheme (snake_case used below) and keep it consistent across all pages.

## Phase 1: Shared Analytics Helper (Foundation) ✅
1. Add a small `trackEvent(name, params)` helper that resolves `analyticsPromise` and calls `logEvent` when available.
2. Add an optional `trackPageView(pageName)` wrapper to keep page view events consistent.
3. Add a lightweight error-safe guard so the app never throws if Analytics is disabled or blocked.

## Phase 2: Core Page Views
Implement page view events for all main pages. Trigger once per page render (e.g., in `useEffect`).

- `page_view_landing` — `src/pages/LandingPage.tsx`
- `page_view_dashboard` — `src/pages/Dashboard/Dashboard.tsx`
- `page_view_transactions` — `src/features/transactions/TransactionsPage.tsx`
- `page_view_budgets` — `src/pages/Budgets.tsx`
- `page_view_goals` — `src/pages/Goals.tsx`
- `page_view_reports` — `src/pages/Reports.tsx`
- `page_view_settings` — `src/pages/Settings.tsx`
- `page_view_help` — `src/pages/Help.tsx`

## Phase 3: Authentication & Onboarding Events
Implement interaction events for auth flows.

- `user_login` — `src/components/LoginCard.tsx` (login submit)
- `user_logout` — `src/context/AuthContext.tsx` (logout action)
- `user_registration_started` — `src/pages/Register.tsx` (submit click)
- `user_registration_completed` — `src/context/AuthContext.tsx` (register success callback)
- `password_reset_requested` — `src/components/LoginCard.tsx` (reset action)

## Phase 4: Transactions Events
Track the highest-value operations and filters.

- `transaction_created` — `src/features/transactions/AddTransactionForm.tsx`
- `transaction_filtered` — `src/features/transactions/components/TransactionsHeader.tsx`
  - Suggested params: `filter_type`, `category`, `period`, `search` (bool only)

## Phase 5: Budgets & Goals Events
Track budgets and goals state changes.

- `budget_status_exceeded` — `src/pages/Budgets.tsx` (when `hasExceeded` becomes true)
- `goal_progress_tracked` — `src/pages/Goals.tsx` or `src/pages/Dashboard/GoalsCard.tsx`
  - Suggested params: `progress_percent` (rounded), `goal_count`

## Phase 6: Reports & Settings Events
Track report navigation and settings changes.

- `report_period_changed` — `src/pages/Reports.tsx`
  - Suggested params: `period` (month/quarter/year)
- `report_date_navigated` — `src/pages/Reports.tsx`
  - Suggested params: `direction` (prev/next)
- `payment_method_added` — `src/pages/Settings.tsx`
- `payment_method_removed` — `src/pages/Settings.tsx`
- `settings_tab_switched` — `src/pages/Settings.tsx`
  - Suggested params: `tab_name`

## Phase 7: Help & Support Events
Track help engagement and FAQ usage.

- `faq_expanded` — `src/pages/Help.tsx`
  - Suggested params: `faq_index`
- `help_topic_viewed` — `src/pages/Help.tsx`
  - Suggested params: `topic_name`

## Phase 8: Diagnostics & Error Events
Track failures that impact user experience.

- `auth_error` — `src/components/LoginCard.tsx`, `src/pages/Register.tsx`
  - Suggested params: `error_code`
- `transaction_save_failed` — `src/features/transactions/AddTransactionForm.tsx`
  - Suggested params: `error_code`
- `data_load_error` — dashboard, budgets, goals, reports pages
  - Suggested params: `page_name`

## Verification Checklist
- Each event fires once per intended interaction and not on every render.
- No sensitive or personally identifiable data is sent in event params.
- App behaves normally when `VITE_FIREBASE_MEASUREMENT_ID` is missing.
- Use Analytics DebugView or browser console logging in development to confirm events.

## Rollout Strategy
1. Implement Phase 1 + Phase 2 first and verify in DebugView.
2. Roll out Phases 3–4 and validate flow coverage.
3. Add remaining phases in small batches to keep event noise low and make validation easier.
