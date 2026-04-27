---
name: react-frontend-implementation
description: "Implement React frontend features with TypeScript. Use for creating components, hooks, feature workflows, refactoring UI code, writing tests, and improving accessibility in React + TypeScript projects."
argument-hint: "component, feature, refactor, test, accessibility"
user-invocable: true
---

# React Frontend Implementation

Use this skill when you need to build or improve React UI code with TypeScript. It is designed for component creation, end-to-end feature implementation, safe refactoring, and test writing with accessibility in mind.

## When to use
- Creating a new React component or page
- Implementing a full frontend feature from requirements to tests
- Refactoring existing UI code into smaller pieces or hooks
- Adding or improving tests with React Testing Library
- Auditing accessibility, keyboard behavior, and semantic HTML

## Core principles
- Type the data model first, then shape the UI around it.
- Prefer small, composable function components.
- Use semantic HTML before adding ARIA.
- Keep logic in hooks or helpers when JSX starts to carry too much state.
- Test user-visible behavior, not implementation details.

## Workflow
1. Clarify the request, constraints, and success criteria.
2. Identify the smallest stable UI boundary to change.
3. Choose the right structure: component, hook, context, or local state.
4. Define TypeScript types before implementing JSX where possible.
5. Build the UI with accessible markup and keyboard support.
6. Add tests for the main behavior and key edge cases.
7. Validate the result with a focused run or type check when available.

## Decision guide

### State choice
- Use local state for isolated UI interactions.
- Use a custom hook when stateful logic is reused or too noisy in the component.
- Use context when several sibling components need the same state.
- Use an external state library only when the app genuinely needs shared client state at scale.

### Component choice
- Create a new component when a UI block has its own structure, props, or interaction model.
- Split a component when one file mixes data loading, business logic, and presentation.
- Keep a component inline only if the logic is trivial and not reused.

### Testing choice
- Use React Testing Library for behavior-focused tests.
- Prefer queries by role, label, text, or placeholder only when role and label are not enough.
- Add accessibility checks for keyboard navigation, naming, and meaningful structure.

## Component creation
1. Define props and derived types.
2. Write the minimal JSX structure with semantic elements.
3. Add accessibility labels, headings, and keyboard-safe interactions.
4. Extract repeated UI into subcomponents only when repetition is real.
5. Style the component using the project’s existing conventions.
6. Add a test for the primary interaction and one important edge case.

Reference the template in [component-template.tsx](./assets/component-template.tsx).

## Feature implementation
1. Break the feature into UI, state, and data needs.
2. Decide which parts belong in components and which belong in hooks.
3. Define the TypeScript contracts for inputs, outputs, and API data.
4. Implement the UI flow in the smallest useful slice.
5. Add loading, empty, and error states if the feature touches async data.
6. Write tests for the main user path and the failure path.
7. Check keyboard flow, focus, and screen-reader naming before finishing.

Reference the hook and test templates:
- [hook-template.ts](./assets/hook-template.ts)
- [test-template.test.tsx](./assets/test-template.test.tsx)

## Refactoring
1. Find the real problem: duplicated logic, large props, or hard-to-test state.
2. Keep behavior stable while extracting the smallest useful unit.
3. Move reusable stateful logic into a hook.
4. Preserve or improve tests around the touched behavior.
5. Avoid refactors that change public API shape unless the task requires it.

## Testing
1. Test from the user’s perspective.
2. Prefer `getByRole` and `findByRole` for interactive elements.
3. Use `userEvent` for clicks, typing, and keyboard navigation.
4. Verify both success and failure states when the component can fail.
5. Keep test fixtures small and easy to read.

Reference the test template in [test-template.test.tsx](./assets/test-template.test.tsx).

## TypeScript guidance
- Use discriminated unions for variant-driven UI.
- Prefer explicit prop types for reusable components.
- Keep generic types simple and named clearly.
- Add exhaustive checks when a union must stay complete.

Reference common patterns in [types-template.ts](./assets/types-template.ts).

## Styling guidance
- Follow the existing project styling approach first.
- Keep class names predictable and component-scoped where possible.
- Favor responsive layouts over fixed-size assumptions.
- Avoid styling that makes keyboard focus hard to see.

Reference style notes in [style-patterns.md](./assets/style-patterns.md).

## Validation checklist
- Types compile without new errors.
- The main interaction works with keyboard and mouse.
- The component has a visible, meaningful label or heading.
- Tests cover the main success path.
- Async states are handled explicitly when relevant.

## Templates
- [component-template.tsx](./assets/component-template.tsx)
- [hook-template.ts](./assets/hook-template.ts)
- [test-template.test.tsx](./assets/test-template.test.tsx)
- [types-template.ts](./assets/types-template.ts)
- [style-patterns.md](./assets/style-patterns.md)