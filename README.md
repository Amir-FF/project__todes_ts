# Todos (React + TypeScript + Redux Toolkit)

A small todo-list app built with React 19, TypeScript, Redux Toolkit and Tailwind CSS. Todos are kept in a Redux store and automatically persisted to `localStorage`, so they survive page reloads.

## Features

- Add todos with inline validation (empty titles are rejected)
- Mark todos as completed / not completed
- Delete todos
- Toast notifications for every action ([React-Toastify](https://fkhadra.github.io/react-toastify/))
- Persistent state via `localStorage` (with safe parsing of stored data)
- Responsive, accessible UI styled with Tailwind CSS v4

## Tech Stack

| Area     | Tools                                              |
| -------- | -------------------------------------------------- |
| UI       | React 19, Tailwind CSS 4, React-Toastify           |
| State    | Redux Toolkit, React-Redux                         |
| Language | TypeScript (strict mode)                           |
| Tooling  | Vite, ESLint (flat config in TypeScript), Prettier |

## Getting Started

**Prerequisites:** a recent Node.js LTS (see the [Vite requirements](https://vite.dev/guide/#scaffolding-your-first-vite-project)) and npm.

```bash
npm install
npm run dev
```

The app will be available at the URL printed by Vite (usually `http://localhost:5173`).

## Scripts

| Script              | Description                                  |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Start the development server with HMR        |
| `npm run build`     | Type-check and create a production build     |
| `npm run preview`   | Preview the production build locally         |
| `npm run typecheck` | Run the TypeScript compiler without emitting |
| `npm run lint`      | Lint the project with ESLint                 |
| `npm run lint:fix`  | Lint and auto-fix problems                   |
| `npm run format`    | Format all files with Prettier               |

## Project Structure

```
.
├── public/                     # Static assets (favicon)
├── src/
│   ├── app/
│   │   ├── store.ts            # Redux store + localStorage persistence
│   │   └── hooks.ts            # Typed useAppDispatch / useAppSelector
│   ├── features/
│   │   └── todos/
│   │       ├── components/
│   │       │   ├── TodoForm.tsx    # "Create Todo" form with validation
│   │       │   ├── TodoTable.tsx   # Table of todos
│   │       │   └── TodoRow.tsx     # Single (memoized) table row
│   │       ├── todosSlice.ts       # Reducers: addTodo, toggleTodo, deleteTodo
│   │       ├── todosStorage.ts     # loadTodos / saveTodos (localStorage)
│   │       └── types.ts            # Todo and TodosState types
│   ├── styles/
│   │   └── index.css           # Tailwind entry point
│   ├── App.tsx
│   └── main.tsx
├── eslint.config.ts
├── vite.config.ts
└── tsconfig*.json
```

## How It Works

- **State shape:** `{ todos: { items: Todo[] } }`, where a `Todo` is `{ id: string; title: string; completed: boolean }`.
- **IDs:** each todo gets a unique `crypto.randomUUID()` id inside the `addTodo` action's `prepare` callback, so reducers stay pure. The `#` column in the table is just the row position.
- **Persistence:** `app/store.ts` preloads the state from `localStorage` (key: `todos`) and saves it again whenever the list changes. Stored data is validated before use; malformed entries are ignored.
- **Notifications:** toasts are triggered from the components, not from the reducers, to keep the Redux logic free of side effects.

## Code Conventions

- Components: `PascalCase.tsx`, one component per file, default export.
- Non-component modules: `camelCase.ts`.
- Feature-based folders under `src/features/`.
- Always use the typed hooks from `src/app/hooks.ts`.
- Run `npm run lint` and `npm run format` before committing.

## 🚀 Live Demo

You can view the live version of this project here: [**View Live Site**](https://project-redux-toolkit-react-js.amir-computer-04-ir.workers.dev/)
