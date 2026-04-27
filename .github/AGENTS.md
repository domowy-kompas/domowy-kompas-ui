# AI Agent Guidelines — domowy-kompas-ui

React + TypeScript frontend built with Vite, tested with Vitest, linted with ESLint.

## Commands

- **Dev**: `npm run dev` (Vite HMR on http://localhost:5173)
- **Build**: `npm run build` (TypeScript check + Vite build to `dist/`)
- **Test all**: `npm run test` (Vitest, single run)
- **Single test file**: `npx vitest run src/pages/Dashboard.tsx` or `npm run test -- --run src/pages/Dashboard.tsx`
- **Single test by name**: `npx vitest run --testNamePattern="test name"`
- **Test watch**: `npm run test:watch`
- **Lint**: `npm run lint` (ESLint flat config)
- **Preview**: `npm run preview`

## Tech Stack

- **React 19** with hooks (no class components)
- **React Router v7** for client-side routing
- **TypeScript ~6.0** with strict mode (`tsconfig.app.json`)
- **Vite 8** for bundling and HMR
- **Vitest 4** with jsdom environment
- **Testing Library** (React Testing Library + jest-dom)
- **ESLint 10** with React hooks/refresh rules

## Project Structure

```
src/
├── App.tsx              # Root component with Routes
├── main.tsx             # Entry point (createRoot + BrowserRouter + StrictMode)
├── index.css            # Global styles
├── App.css              # App-level styles
├── pages/               # Route-based page components
│   ├── Dashboard.tsx
│   ├── Transactions.tsx
│   ├── Budgets.tsx
│   └── Misc.tsx         # Goals, Reports, Help exports
├── components/          # Reusable UI components
│   ├── Layout.tsx       # Wrapper with Sidebar + Footer
│   ├── Sidebar.tsx      # Navigation with NavLink
│   └── Footer.tsx
├── test/
│   └── setup.ts         # Vitest setup (jest-dom matchers)
└── assets/              # Images, icons, SVGs
```

## Code Style

### Imports
- **React**: `import { useState } from 'react'` (destructured, not `import React`)
- **Type imports**: `import type { ReactNode } from 'react'`
- **Router**: `import { NavLink } from 'react-router-dom'`
- **Group order**: React → react-router → testing-library → third-party → local
- **Named exports** preferred; default export only for App

### Formatting
- **No Prettier**: Rely on `npm run lint` and consistent manual formatting
- **Indentation**: 2 spaces
- **Quotes**: Single quotes preferred
- **Semicolons**: Omit (check existing code style)

### Type Safety
- **Explicit return types** for functions: `function getName(): string { ... }`
- **Props interfaces**: `interface LayoutProps { children: ReactNode }`
- **Avoid `any`**: Use `unknown` with type guards or specific types
- **Strict mode enabled**: `strict: true` in tsconfig.app.json
- **No non-null assertion**: Avoid `!`; use conditional checks

### Naming Conventions
- **Components**: PascalCase (`Dashboard.tsx`, `Sidebar.tsx`)
- **Files**: PascalCase for components, kebab-case for utils
- **Hooks**: camelCase starting with `use`
- **Props interfaces**: `ComponentNameProps` (`LayoutProps`)
- **Test files**: `.test.tsx` suffix, co-located with source
- **Constants**: SCREAMING_SNAKE_CASE for config values

### Components
```tsx
import type { ReactNode } from 'react'
import './Layout.css'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <Sidebar />
      <main>{children}</main>
    </div>
  )
}
```

## Routing

- **React Router v7** with `<BrowserRouter>` in `main.tsx`
- **Routes defined** in `App.tsx` under `<Routes>`
- **Navigation**: Use `<NavLink>` from `react-router-dom` (not `<a>` tags)
- **Active state**: `className={({ isActive }) => isActive ? 'active' : ''}`

### Adding a Route
1. Create page in `src/pages/NewPage.tsx`
2. Add `<Route path="/new-page" element={<NewPage />} />` in `App.tsx`
3. Add nav item to `Sidebar.tsx` using `<NavLink>`
4. Create test file `NewPage.test.tsx` (wrap with `<BrowserRouter>` in tests)

## Testing

### Setup
- **Environment**: jsdom (`vite.config.ts`)
- **Globals**: `true` (describe, it, expect available without imports)
- **Setup file**: `src/test/setup.ts` loads jest-dom matchers

### Pattern
```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { Dashboard } from './Dashboard'

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('Dashboard', () => {
  it('renders heading', () => {
    renderWithRouter(<Dashboard />)
    expect(screen.getByRole('heading')).toHaveTextContent('Dashboard')
  })
})
```

## ESLint & TypeScript

### ESLint (`eslint.config.js`)
- `eslint-plugin-react-hooks` (rules-of-hooks, exhaustive-deps)
- `eslint-plugin-react-refresh` (vite preset)
- `typescript-eslint` recommended config
- Run `npm run lint` before commits

### TypeScript (`tsconfig.app.json`)
- `strict: true`, `noImplicitAny: true`
- `noUnusedLocals: true`, `noUnusedParameters: true`
- `verbatimModuleSyntax: true`, `erasableSyntaxOnly: true`

## Common Pitfalls

1. **Missing router wrapper** in tests: Components using `<NavLink>` need `<BrowserRouter>`
2. **Used `<a>` instead of `<NavLink>`**: Causes full page reload
3. **`any` type**: Use explicit types or `unknown` with guards
4. **Missing return types**: Functions should declare return types
5. **Unused imports/vars**: ESLint will flag; remove before committing
6. **Assets import**: Use `import img from '../assets/image.png'` for images
7. **CSS imports**: Place `import './Component.css'` inside component file
