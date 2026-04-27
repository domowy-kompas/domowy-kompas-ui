# AI Agent Guidelines — domowy-kompas-ui

React + TypeScript frontend application built with Vite, tested with Vitest, and linted with ESLint.

## Quick Reference

### Essential Commands
- **Dev server**: `npm run dev` (Vite HMR on http://localhost:5173)
- **Build**: `npm run build` (TypeScript check + Vite build to `dist/`)
- **Test**: `npm run test` (Vitest, one run)
- **Single test**: `npx vitest run src/path/to/Test.test.tsx` or `--testNamePattern` for specific test names
- **Test watch**: `npm run test:watch` (Vitest watch mode)
- **Lint**: `npm run lint` (ESLint flat config)
- **Preview**: `npm run preview` (serve built `dist/`)

### Tech Stack
- **React 19** with hooks-based components (no class components)
- **React Router v6** for client-side routing
- **TypeScript ~6.0** with strict type checking
- **Vite 8** for bundling and HMR
- **Vitest 4** with jsdom environment for DOM testing
- **Testing Library** for component testing (React Testing Library + jest-dom)
- **ESLint 10** with React hooks/refresh rules

## Project Structure

### Pages vs Components
- **Pages** (`src/pages/`): Route-based components that define full views
- **Components** (`src/components/`): Reusable UI elements (buttons, cards, nav, etc.)

```
src/
├── App.tsx              # Root component with Routes
├── main.tsx             # Entry point (createRoot + BrowserRouter)
├── index.css            # Global styles
├── App.css              # Component-scoped styles
├── pages/               # Route-based page components
│   ├── Login.tsx
│   ├── Login.test.tsx
│   ├── Dashboard.tsx
│   └── Dashboard.test.tsx
├── components/          # Reusable UI components
│   ├── Navigation.tsx
│   └── Navigation.test.tsx
├── test/
│   └── setup.ts         # Vitest setup (jest-dom matchers)
└── assets/              # Images, icons, SVGs
```

## Code Style Guidelines

### Imports
- **React imports**: `import { useState, useEffect } from 'react'`
- **Framework imports**: `import { render, screen } from '@testing-library/react'`
- **Router imports**: `import { Link, useNavigate } from 'react-router-dom'`
- **Group order**: React → testing-library → react-router → third-party → local (./*) → local (../*)
- **Named exports** preferred; default exports only for page components

### Formatting
- **Prettier**: Not configured (run `npm run lint` for formatting issues)
- **Indentation**: 2 spaces (match existing code)
- **Line length**: No hard limit; break at logical points
- **Trailing commas**: Allowed where helpful

### Type Safety
- **Always provide explicit return types** for functions: `function getName(): string { ... }`
- **Props types**: Explicit interface/type for component props
- **Avoid `any`**: Use `unknown` with type guards, or specific types
- **Strict mode**: Enabled in TypeScript (no implicit any)
- **Non-null assertion**: Avoid `!`; use conditional chaining or null checks

### Naming Conventions
- **Components**: PascalCase (`MyComponent.tsx`)
- **Files**: kebab-case for non-components (`login-page.tsx`), PascalCase for components
- **Hooks**: camelCase starting with `use` (`useAuth`, `useCounter`)
- **Props interfaces**: `InterfaceNameProps` (`ButtonProps`)
- **Test files**: `.test.tsx` suffix, co-located with source
- **Constants**: SCREAMING_SNAKE_CASE for config values
- **Variables**: camelCase

### Functional Components
```tsx
interface MyComponentProps {
  title: string;
  onSubmit: (data: Data) => void;
}

export function MyComponent({ title, onSubmit }: MyComponentProps) {
  const [value, setValue] = useState('')

  function handleSubmit() {
    onSubmit({ value })
  }

  return (
    <div>
      <h1>{title}</h1>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}
```

### Error Handling
- **Error boundaries**: Wrap potentially failing components
- **Try/catch**: Use for async operations and data fetching
- **Console errors**: Avoid in production code; use proper error states in UI
- **User feedback**: Show inline errors in forms; don't rely only on console

### CSS Guidelines
- **Import CSS inside components**: `import './Component.css'`
- **Avoid global class collisions**: Use semantic HTML + component-scoped styles
- **Testing Library queries**: Prefer `getByRole` over class names

## Routing & Navigation

### Tech Stack
- **React Router v6** for client-side routing
- `<BrowserRouter>` wrapper in `src/main.tsx` (entry point)
- **Route definitions**: All routes in `src/App.tsx` under `<Routes>`
- **Navigation**: Use `<Link>` from `react-router-dom`, not `<a>` tags for internal routes

### Adding a New Route
1. Create page component in `src/pages/NewPage.tsx`:
   ```tsx
   export function NewPage() {
     return <h1>New Page</h1>
   }
   ```
2. Add route to `src/App.tsx`:
   ```tsx
   <Route path="/new-page" element={<NewPage />} />
   ```
3. Add navigation link in `src/components/Navigation.tsx`:
   ```tsx
   <Link to="/new-page">New Page</Link>
   ```
4. Create test file `src/pages/NewPage.test.tsx` (wrap with `<BrowserRouter>` in tests)

### Testing Routes
- Always wrap components using `<Link>` or routing hooks with `<BrowserRouter>` in tests
- Use `screen.getByRole('link')` to query navigation links
- To test navigation between routes, use `userEvent` to click links and verify the URL changes via `window.location.pathname`

## Testing & Linting

### Vitest Setup
- **Environment**: jsdom (DOM APIs available)
- **Globals**: true (describe, it, expect available without imports)
- **Setup files**: `src/test/setup.ts` (jest-dom matchers loaded)
- **Config**: `vite.config.ts`

### Testing Pattern
```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { MyComponent } from './MyComponent'

function renderWithRouter(component: React.ReactElement) {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('MyComponent', () => {
  it('renders without crashing', () => {
    renderWithRouter(<MyComponent title="Test" onSubmit={vi.fn()} />)
    expect(screen.getByRole('heading')).toHaveTextContent('Test')
  })

  it('calls onSubmit when button clicked', async () => {
    const onSubmit = vi.fn()
    renderWithRouter(<MyComponent title="Test" onSubmit={onSubmit} />)

    await userEvent.click(screen.getByRole('button'))
    expect(onSubmit).toHaveBeenCalled()
  })
})
```

### ESLint Rules (eslint.config.js)
- React hooks rules (`react-hooks/rules-of-hooks`)
- React Refresh rules (`react-refresh/only-export-components`)
- TypeScript recommended config (tseslint)
- Run `npm run lint` before commits

### TypeScript (tsconfig.app.json)
- `strict: true` enabled
- `noImplicitAny: true`
- `noImplicitReturns: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`

## Common Pitfalls

1. **Missing dependencies** in hooks: Add to `useEffect` dependency arrays
2. **Props drilling**: Consider lifting state early or plan for context later
3. **Forgot to stringify state in JSX**: `{JSON.stringify(state)}` for debugging objects
4. **Test files not found**: Ensure `.test.tsx` suffix and co-locate with source files
5. **HMR issues**: Clear browser cache if hot reload doesn't pick up changes
6. **CSS specificity wars**: Import CSS inside components; avoid global class name collisions
7. **Forgot `<BrowserRouter>` wrapper**: Routes won't work; component tests will error when rendering components with `<Link>`
8. **Used `<a>` instead of `<Link>`**: Navigation will cause full page reload instead of client-side routing
9. **Used `any` type**: Use explicit types or `unknown` with type guards
10. **Forgot explicit return type**: Functions should have explicit return types
11. **Route path mismatch**: Verify exact path spelling; "/" and "/foo" are different routes
12. **Navigation not visible**: Ensure `<Navigation>` is rendered above `<Routes>` in `src/App.tsx`

## Tips for Agents

- **Run tests first** when modifying existing components to catch regressions
- **Use React DevTools** (install extension) to inspect component state during dev
- **Check ESLint output** before suggesting code; follow the rules already in place
- **Prefer TypeScript types** over runtime validation for props
- **Keep components small**; extract sub-components to keep JSX readable
- **Use semantic HTML** (button, a, input) for better accessibility and Testing Library queries
- **Type-check before build**: `npm run build` runs `tsc -b` first