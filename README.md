# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
flowchart LR
  subgraph entry[main.tsx]
    A[<AppProviders>]
  end

  subgraph providers[AppProviders]
    subgraph theme[ColorModeContext]
      T1[(mode: 'light'|'dark')]
      T2[effect:\n• toggle <html>.classList('dark')\n• localStorage['color-mode']]
    end

    subgraph width[AppWidthProvider]
      W1[(width: '3xl'|'4xl'|'5xl'|'6xl'|'full')]
      W2[effect:\n• set --app-max-w on <html>\n• localStorage['app-width']]
    end

    subgraph amplify[Amplify ThemeProvider]
      AMP[<ThemeProvider colorMode={mode}>]
    end
  end

  subgraph app[App]
    R[<RootRouter>]
    H[<Header>\n• Light/Dark buttons\n• <GlobalWidthSelect>\n• Logos: dark:hidden / dark:block]
    N[<NavTabs>]
    M[<main class="app-container">]
    P1[HomePage]
    P2[PlaygroundPage]
  end

  entry --> providers --> app
  theme --> amplify
  R --> H --> N --> M
  M --> P1
  M --> P2

  style providers fill:#0b2545,stroke:#0b2545,color:#fff
  style amplify fill:#123d6b,stroke:#123d6b,color:#fff
  style app fill:#0a173f,stroke:#0a173f,color:#fff

sequenceDiagram
  autonumber
  participant U as User
  participant H as Header (buttons)
  participant C as ColorModeContext
  participant P as AppProviders effect
  participant HTML as <html>
  participant TW as Tailwind + CSS Vars
  participant AMP as Amplify ThemeProvider

  U->>H: click "dark" / "light"
  H->>C: setMode('dark'|'light')
  C-->>P: mode changed
  P->>HTML: add/remove class "dark"\n+ persist localStorage['color-mode']
  HTML-->>TW: .dark selector active/inactive
  TW-->>H: dark:hidden / dark:block logo flip
  TW-->>App: dark: utilities apply\n:root vars swap (--color-surface, --color-text)
  C-->>AMP: colorMode={mode}
  AMP-->>App: Amplify components restyle

sequenceDiagram
  autonumber
  participant U as User
  participant GW as GlobalWidthSelect
  participant W as AppWidthProvider
  participant HTML as <html>
  participant CSS as .app-container (index.css)

  U->>GW: choose "5xl"
  GW->>W: setWidth('5xl')
  W->>HTML: style.setProperty('--app-max-w','64rem')
  W->>W: persist localStorage['app-width']='5xl'
  HTML-->>CSS: var(--app-max-w) updated
  CSS-->>Pages: containers instantly resize

