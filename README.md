# Project documentation

This project uses [Next.js] React framework to build the application with [TypeScript].

[next.js]: https://nextjs.org/
[typescript]: https://www.typescriptlang.org/

Currently, the project generates all of the routes as **static [MPA] pages**.\
**Disclaimer**, [Next.js] allows writing a layout component(s), which provides
**the identical user experience as using [SPA].**

[pwa]: https://en.wikipedia.org/wiki/Progressive_web_application
[mpa]: https://blog.bitsrc.io/when-to-use-multi-page-apps-587030b0f37b
[spa]: https://blog.bitsrc.io/when-to-use-multi-page-apps-587030b0f37b
[next-pwa]: https://github.com/shadowwalker/next-pwa

---

## Scripts

List of available scripts are in the [package.json](./package.json) file.
They're organized and descriptive enough.

To quickly start developing, you can use:

```sh
pnpm dev
```

### Analyzing the bundle size

Use the following script:

```sh
pnpm analyze
```

It builds the project with analysis using the [next-bundle-analyzer] _(aka
webpack-bundle-analyzer)_.

[next-bundle-analyzer]: https://github.com/vercel/next.js/tree/canary/packages/next-bundle-analyzer

### Serve locally

To serve the build on your device, you can use:

```sh
pnpm serve
```

---

### Deployment

It uses [Vercel]. To deploy it quickly, use:

```sh
pnpm deploy
```

[vercel]: https://vercel.com/

---

## Project architecture

A quick guide to help navigate through the codebase.

### Data state management

**[React hooks]** are used for managing the applications data state.
All of the available hooks are inside the [./source/hooks](./source/hooks) directory.

[react hooks]: https://reactjs.org/docs/hooks-intro.html

Several tools do state management. These handpicked below tools vary on the
state data type.\
Their devtools are visible only in the `development` mode.

| Tool              | Devtool                    | Purpose                                                                                                                                    |
| ----------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [React Query]     | [React Query devtools]     | For the **Data stored in the API**, as well as processing them. Examples: `useAuthentication`, `useFactories`, `useMachines`.              |
| [Zustand]         | [Redux devtools]           | For the **Global data** _(including browser's storage)_. Example: `usePage`, `useAPI`. Optimized with [React tracked].                     |
| [React Hook Form] | [React Hook Form devtools] | For managing the form states. The validity state is powered by [zod] library, which provides an easy solution to validate the data schema. |

[react query]: https://github.com/tannerlinsley/react-query
[react query devtools]: https://react-query.tanstack.com/devtools#_top
[zustand]: https://github.com/pmndrs/zustand
[redux devtools]: https://github.com/reduxjs/redux-devtools
[react tracked]: https://github.com/dai-shi/react-tracked
[react hook form]: https://react-hook-form.com/
[react hook form devtools]: https://react-hook-form.com/dev-tools/#main
[zod]: https://github.com/colinhacks/zod

### Components

They're organized using [Atomic Design]. All of them are available in
[./source/components](./source/components) folder.

[atomic design]: https://bradfrost.com/blog/post/atomic-web-design/

### Routes

To avoid confusion. **Next.js names `routes` as `pages`**.\
Currently it is impossible to change the directory name,
and they're located in [./pages](./pages) directory.

**Remember**:
They're not the same as `pages` from the Atomic Design.\
**They're `routes`**, and all of the route handling happens inside them.

Each of the route uses the `layout` option.\
This property is configured and defined in the [./source/pages/\_app.tsx](./source/pages/_app.tsx).

### Layouts

There's an [./source/layouts](./source/layouts) folder, which can split app' layouts into:

-   for protected routes - `default`,
-   and for unprotected routes - e.g. `dashboard`.

### Globals

All possible global settings, such as this project application routes or the
API routes, are configured in the [./source/globals](./source/globals) directory.

### Helpers

Small and reusable code snippets are organized in the
[./source/helpers](./source/helpers) directory.\
They are following the [Functional Programming principles].

[functional programming principles]: https://www.freecodecamp.org/news/functional-programming-in-javascript-for-beginners/

### Utilities

The data models and their methods are available in [./source/utils](./source/utils)
directory.\
They're organized by using classes and Object-Oriented Programming principles _(OOP)_.

### Styles

The project uses [Sass] and [CSS modules].\
It also uses [TailwindCSS] _(just for the `@apply` or `theme("...")` features
to improve the developer's experience with its LSP and speed up the development)_.

[css modules]: https://css-tricks.com/css-modules-part-1-need/
[sass]: https://sass-lang.com/
[tailwindcss]: https://tailwindcss.com/
