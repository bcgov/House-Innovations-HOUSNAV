<!-- PROJECT SHIELDS -->
[![Build-and-Test](https://github.com/bcgov/House-Innovations-HOUSNAV/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/bcgov/House-Innovations-HOUSNAV/actions/workflows/build-and-test.yml/)
[![Deployment-Dev](https://github.com/bcgov/House-Innovations-HOUSNAV/actions/workflows/deploy-dev.yml/badge.svg)](https://github.com/bcgov/House-Innovations-HOUSNAV/actions/workflows/deploy-dev.yml/)
[![Deployment-UAT](https://github.com/bcgov/House-Innovations-HOUSNAV/actions/workflows/deploy-uat.yml/badge.svg)](https://github.com/bcgov/House-Innovations-HOUSNAV/actions/workflows/deploy-uat.yml/)

# House-Innovations-HOUSNAV

Housing Innovation Branch has received funding from Strategic Investment Funding (SIF) to partner with TELUS to design and develop a code consolidation proof of concept by September, 2024. This is the repository for the proof of concept.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps

These are located in the `apps` directory:

- `web`: a [Next.js](https://nextjs.org/) app that serves as the main application

### Packages

These are located in the `packages` directory:

- `@repo/ui`: a React component library used by the `web` application
  - Could be used by other applications in the future or replaced by the British Columbia Government Design System
- `@repo/constants`: shared constants
- `@repo/data`: data and data utilities
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/). Refer to each workspace's README for more information on each.

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

### Test

To run the unit tests, run the following command:

```
npm run test
```

Note: you generally shouldn't need to run unit tests directly as they run as part of our precommit hooks.

To run the Cypress e2e tests:

1. Ensure the application is running at [http://localhost:3000](http://localhost:3000)
2. Run one of the two following commands:
   - Use `npm run e2e` to run tests headlessly in your terminal.
   - Use `npm run e2e:open` to open the cypress test runner UI.

### Docker

This application uses Docker to provide containerization and portability. You can install Docker on your local
machine from this [link](https://docs.docker.com/engine/install/).

We utilize [docker-compose](https://docs.docker.com/compose/) to help with the building process

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

Pre-commit the `format`, `lint`, and `test` turbo tasks will run. This will run any `scripts` called `format:check`, `lint`, or `test` in any of the workspaces. Look at the `package.json` in each workspace for what executes in each. If there are any errors, the commit will be aborted. (Note: `test` normally includes the vitests.)

## Infrastructure & Deployment
The infrastructure uses a combination of GitHub Actions, JFrog Artifactory, OpenShift, and Helm to manage the continuous integration and deployment (CI/CD) of the application.
- **GitHub Actions:** Automates the build, test, and deployment workflows
- **JFrog Artifactory:** Serves as the Docker image repository
- **OpenShift:** Manages the deployment of applications in different environments (Dev and UAT)
- **Helm:** Simplifies deploying and managing Kubernetes applications, making deployments easy and consistent
### Workflows
#### Build and Test
This workflow runs on pull requests to the **main** branch and can also be manually triggered. It performs the following actions:
- Runs unit tests
- Builds the docker image
- Executes end-to-end tests with Cypress using the previously built image
- Runs a Trivy Vulnerability Scan using the previously built image
- Pushes the Docker image to JFrog Artifactory after successful tests
#### Analysis
This workflow runs on pull requests to the **main** branch and can also be manually triggered. It performs the following actions:
- Runs CodeQL semantic code analysis
- Runs Trivy vulnerability scanner in repo mode
#### Deploy to dev
This workflow runs on pushes to the **main** branch and can also be manually triggered. It performs the following actions:
- Extracts the pull request number associated with a commit
- Deploys the application to the dev environment in OpenShift using Helm and the tag extracted previously
#### Deploy to UAT
This workflow runs when the **Deployment-Dev** workflow completes successfully. The workflow pauses until one of the team members approves it (the list of team members is assigned in the repository settings). It performs the following actions:
- Extracts the pull request number associated with a commit
- Deploys the application to the dev environment in OpenShift using Helm and the tag extracted previously

## Components

This project builds on top of React Aria Components to start from a base of accessibility. You can find more information about React Aria Components [here](https://react-spectrum.adobe.com/react-aria/getting-started.html).

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
