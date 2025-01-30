# Yuki

An innovative E-Commerce application built using Turbo repo and Next.js, offering a seamless shopping experience with fast performance and modern design.

## Installation

> [!NOTE]
>
> Make sure to follow the system requirements specified in [`package.json#engines`](./package.json#L41) before proceeding.

There are two ways of initializing an app using the `create-yuki-turbo` starter. You can either use this repository as a template:

Click the "Use this template" button on the top right of the repository,

or use Turbo's CLI to init your project (use PNPM as package manager):

```bash
npx create-turbo@latest -e https://github.com/tiesen243/create-yuki-turbo
```

## About

This template is forked from [create-t3-turbo](https://github.com/t3-oss/create-t3-turbo) with some modifications to fit my personal preferences. It is a monorepos template for building full-stack applications with [Turborepo](https://turbo.build), [Next.js](https://nextjs.org), [tRPC](https://trpc.io) and more.

It uses [Turborepo](https://turborepo.org) and contains:

```text
.github
  └─ workflows
        └─ CI to check the monorepo: format, lint, and typecheck
apps
  ├─ web
  |   ├─ Next.js 15
  |   ├─ React 19
  |   ├─ Tailwind CSS
  |   └─ E2E Typesafe API Server & Client
  └─ dashboard
      ├─ Vue 3
      ├─ Tailwind CSS
      └─ E2E Typesafe Client
packages
  ├─ api
  |   └─ tRPC v11 router definition
  ├─ auth
  |   └─ Authentication from scratch using arctic for OAuth.
  ├─ db
  |   └─ Typesafe db calls using Prisma & Neon
  |       └─ Seed data using Python and Faker
  └─ ui
      └─ Start of a UI package for the webapp using shadcn-ui
          └─ Migration to Vue components
tooling
  ├─ eslint
  |   └─ shared, fine-grained, eslint presets
  ├─ prettier
  |   └─ shared prettier configuration
  └─ typescript
      └─ shared tsconfig you can extend from
```

> In this template, we use `@yuki` as a placeholder for package names. As a user, you might want to replace it with your own organization or project name. You can use find-and-replace to change all the instances of `@yuki` to something like `@my-company` or `@project-name`.

## Quick Start

> **Note**
> The [db](./packages/db) package is preconfigured to use Neon and is **edge-bound**. If you're using something else, make the necessary modifications to the [schema](./packages/db/prisma/schema.prisma) as well as the [client](./packages/db/src/index.ts). If you want to switch to non-edge database driver, remove `export const runtime = "edge";` [from all pages and api routes](https://github.com/t3-oss/create-t3-turbo/issues/634#issuecomment-1730240214).

To get it running, follow the steps below:

### 1. Setup dependencies

```bash
# Install dependencies
bun i

# Configure environment variables
# There is an `.env.example` in the root directory you can use for reference
cp .env.example .env

# Push the Drizzle schema to the database
bun db:push
```

### 2a. When it's time to add a new UI component

Run the `ui-add` script to add a new UI component using the interactive `shadcn/ui` CLI:

```bash
bun ui-add
```

When the component(s) has been installed, you should be good to go and start using it in your app.

### 2b. When it's time to add a new package

To add a new package, simply run `bun turbo gen init` in the monorepo root. This will prompt you for a package name as well as if you want to install any dependencies to the new package (of course you can also do this yourself later).

The generator sets up the `package.json`, `tsconfig.json` and a `index.ts`, as well as configures all the necessary configurations for tooling around your package such as formatting, linting and typechecking. When the package is created, you're ready to go build out the package.

### 2c. When it's time to update the dependencies

To update the dependencies, run the following command:

```bash
bun bump-deps
```

This will update all the dependencies in the monorepos to the latest version.

## Deployment

### Next.js

#### Prerequisites

> **Note**
> Please note that the Next.js application with tRPC must be deployed in order for the Expo app to communicate with the server in a production environment.

#### Deploy to Vercel

Let's deploy the Next.js application to [Vercel](https://vercel.com). If you've never deployed a Turborepo app there, don't worry, the steps are quite straightforward. You can also read the [official Turborepo guide](https://vercel.com/docs/concepts/monorepos/turborepo) on deploying to Vercel.

1. Create a new project on Vercel, select the `apps/nextjs` folder as the root directory. Vercel's zero-config system should handle all configurations for you.

2. Add your `DATABASE_URL` environment variable.

3. Done! Your app should successfully deploy. Assign your domain and use that instead of `localhost` for the `url` in the Expo app so that your Expo app can communicate with your backend when you are not in development.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

![Yuki](./.github/yuki.gif)
