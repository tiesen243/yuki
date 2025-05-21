# Yukinu

## Installation

> [!NOTE]
>
> Make sure to follow the system requirements specified in [`package.json#engines`](./package.json#L39) before proceeding.

There are two ways of initializing an app using the `create-yuki-turbo` starter. You can either use this repository as a template:

Click the "Use this template" button on the top right of the repository,

or use Turbo's CLI to init your project (use Bun as package manager):

```bash
bun create turbo@latest --example https://github.com/tiesen243/yukinu
```

## About

This template is based on [create-t3-turbo](https://github.com/t3-oss/create-t3-turbo) by @t3-oss with some modifications to fit my personal preferences.

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
      ├─ React Router 7
      ├─ React 19
      ├─ Tailwind CSS
      └─ E2E Typesafe API Server & Client
packages
  ├─ api
  |   └─ tRPC v11 router definition
  ├─ auth
  |   └─ Authentication from scratch using arctic for OAuth.
  ├─ db
  |   └─ Typesafe db calls using Drizzle ORM
  ├─ env
  |   └─ Typesafe environment variables
  ├─ ui
  |   └─ Start of a UI package for the webapp using shadcn-ui
  └─ validators
      └─ Shared input validation schemas using zod
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
> The [db](./packages/db) package is preconfigured to use Neon and is **edge-bound**. If you're using something else, make the necessary modifications to the [schema](./packages/db/src/schema) as well as the [client](./packages/db/src/index.ts). If you want to switch to non-edge database driver, remove `export const runtime = "edge";` [from all pages and api routes](https://github.com/t3-oss/create-t3-turbo/issues/634#issuecomment-1730240214).

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

## Deployment

Let's deploy the Next.js application to [Vercel](https://vercel.com). If you've never deployed a Turborepo app there, don't worry, the steps are quite straightforward. You can also read the [official Turborepo guide](https://vercel.com/docs/concepts/monorepos/turborepo) on deploying to Vercel.

1. Create a new project on Vercel, select the `apps/nextjs` or `apps/react-router` or `apps/tanstack-start` folder as the root directory. Vercel's zero-config system should handle all configurations for you.

2. Add your environment variable. See `.env.example` for required variables.

3. Done! Your app should successfully deploy.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
