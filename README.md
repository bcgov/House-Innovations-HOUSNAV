<!-- PROJECT SHIELDS -->
[![Build-and-Test](https://github.com/bcgov/House-Innovations-HOUSNAV/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/bcgov/House-Innovations-HOUSNAV/actions/workflows/build-and-test.yml/)
[![Deploy-Dev](https://github.com/bcgov/House-Innovations-HOUSNAV/actions/workflows/deploy-dev.yml/badge.svg)](https://github.com/bcgov/House-Innovations-HOUSNAV/actions/workflows/deploy-dev.yml/)
[![Deploy-UAT](https://github.com/bcgov/House-Innovations-HOUSNAV/actions/workflows/deploy-uat.yml/badge.svg)](https://github.com/bcgov/House-Innovations-HOUSNAV/actions/workflows/deploy-uat.yml/)

# House-Innovations-HOUSNAV

Housing Innovation Branch has received funding from Strategic Investment Funding (SIF) to partner with TELUS to design and develop a code consolidation proof of concept by September, 2024. This is the repository for the proof of concept.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org/) app that serves as the main application
- `@repo/ui`: a React component library used by the `web` application
  - Could be used by other applications in the future or replaced by the BC Gov Design System
- `@repo/constants`: shared constants
- `@repo/data`: data and data utilities
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo uses some additional tools to help with development, including:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Lefthook](https://github.com/evilmartians/lefthook) for git hooks

### Install

To install all the node modules, run the install command from the root directory. This will install all modules in the root of your repository, and in each workspace.

```
npm install
```

### Develop

To develop all apps and packages, run the following command:

```
npm run dev
```

This will start the `web` app in development mode, and watch for changes in all packages. For more information on developing each app/package, see the README in each workspace.

### Build

To build all apps and packages, run the following command:

```
npm run build
```

### Docker

This application is built with Docker to provide containerization and portability. You can install Docker on your local
machine from this [link](https://docs.docker.com/engine/install/).

We utilize [docker-compose](https://docs.docker.com/compose/) to help with the local building process

To run the application locally in a Docker container, run the following commands:

```
docker-compose build
```

```
docker-compose up
```

**NOTE**: Some security applications such as ZScaler may require additional configuration of the Docker install to 
utilize a security certificate file. Please read [this documentation](https://docs.docker.com/engine/security/certificates/) 
from the Docker website to learn more.

### Hooks

As noted above, this repository uses [Lefthook](https://github.com/evilmartians/lefthook) to run git hooks.

#### Pre-Commit

Pre-commit the `format`, `lint`, and `test` turbo tasks will run. This will run any `scripts` called `format`, `lint`, or `test` in any of the workspaces. Look at the `package.json` in each workspace for what executes in each. If there are any errors, the commit will be aborted. (Note: `test` normally includes the vitests.)

## Style Naming Conventions

This project uses a modified version of [BEM](http://getbem.com/naming/) (Block Element Modifier) naming conventions for CSS classes. The naming convention is as follows:

### Components
.[workspace]-[Block]--[Element] --[modifier]

```css
/* for example */
.web-Question--Title {}
.ui-Button.--primary {}
```

### Utilities
.u-[utility]

```css
/* for example */
.u-hidden {}
.u-mt-4 {}
```




## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
