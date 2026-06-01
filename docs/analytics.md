# Analytics

Firebase Analytics tracking for Domowy Kompas.

## Setup

Analytics is initialized in `src/config/firebase.ts`. It requires `VITE_FIREBASE_MEASUREMENT_ID` to be set in the environment. If the variable is missing, analytics is unavailable (app behaves normally).

## Helper API

Defined in `src/utils/analytics.ts`.

```ts
trackEvent(eventName: string, params?: Record<string, unknown>)
trackPageView(pageName: string)  // fires page_view_{pageName}
```

Both are error-safe — they silently return if Analytics is unavailable or blocked.

## Page View Events

| Component | Event | Phase |
|-----------|-------|-------|
| `LandingPage` | `page_view_landing` | ✅ |
| `Dashboard` | `page_view_dashboard` | ✅ |
| `TransactionsPage` | `page_view_transactions` | ✅ |
| `Budgets` | `page_view_budgets` | ✅ |
| `Goals` | `page_view_goals` | ✅ |
| `Reports` | `page_view_reports` | ✅ |
| `Settings` | `page_view_settings` | ✅ |
| `Help` | `page_view_help` | ✅ |

## Interaction Events

| Event | Location | Status |
|-------|----------|--------|
| `user_login` | `LoginCard` | ✅ |
| `user_logout` | `AuthContext` | ✅ |
| `user_registration_started` | `Register` | ✅ |
| `user_registration_completed` | `AuthContext` | ✅ |
| `password_reset_requested` | `LoginCard` | ✅ |
| `transaction_created` | `AddTransactionForm` | ❌ |
| `transaction_filtered` | `TransactionsHeader` | ❌ |
| `budget_status_exceeded` | `Budgets` | ❌ |
| `goal_progress_tracked` | `Goals` / `GoalsCard` | ❌ |
| `report_period_changed` | `Reports` | ❌ |
| `report_date_navigated` | `Reports` | ❌ |
| `payment_method_added` | `Settings` | ❌ |
| `payment_method_removed` | `Settings` | ❌ |
| `settings_tab_switched` | `Settings` | ❌ |
| `faq_expanded` | `Help` | ❌ |
| `help_topic_viewed` | `Help` | ❌ |
| `auth_error` | `LoginCard` / `Register` | ❌ |
| `transaction_save_failed` | `AddTransactionForm` | ❌ |
| `data_load_error` | Dashboard, Budgets, Goals, Reports | ❌ |

## Using an Event

```ts
import { trackEvent } from '../utils/analytics'

// Simple event
trackEvent('user_login')

// With params (no PII!)
trackEvent('transaction_created', { category: 'food' })
```

## Rules

- **No PII** — never send names, emails, addresses, amounts, or sensitive data
- **Fire once** — use `useEffect([], [])` for page views, avoid re-fires
- **Graceful degradation** — all calls are wrapped in try/catch; missing `MEASUREMENT_ID` is handled silently

## Debugging

In development, open **Analytics DebugView** in the Firebase console to see events live. You can also inspect network requests for `google-analytics.com/g/collect` calls in the browser DevTools.
