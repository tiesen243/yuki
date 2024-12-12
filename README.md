# Yuki

## Installation

> [!NOTE]
>
> Make sure to follow the system requirements specified in [`package.json#engines`](./package.json#L33) before proceeding.

```bash
bun create turbo@latest --example https://github.com/tiesen243/yuki --package-manager bun
```

## About

Ever wondered how to migrate your Yuki application into a monorepo? Stop right here! This is the perfect starter repo to get you running with the perfect stack!

It uses [Turborepo](https://turborepo.org) and contains:

```text
.github
  └─ workflows
        └─ CI with pnpm cache setup
apps
  ├─ www
  |   ├─ Next.js 15
  |   ├─ React 19
  |   ├─ Tailwind CSS
  |   └─ E2E Typesafe API Server & Client
  └─ dashboard
      ├─ Next.js 15
      ├─ React 19
      ├─ Tailwind CSS
      └─ E2E Typesafe API Server & Client
packages
  ├─ api
  |   └─ tRPC v11 router definition
  ├─ auth
  |   └─ Authentication using lucia-auth.
  ├─ db
  |   └─ Typesafe db calls using Prisma & Neon
  ├─ email
  |   └─ Email API using Resend and React Email
  └─ ui
      └─ Start of a UI package for the webapp using shadcn-ui
tooling
  ├─ eslint
  |   └─ shared, fine-grained, eslint presets
  ├─ prettier
  |   └─ shared prettier configuration
  ├─ tailwind
  |   └─ shared tailwind configuration
  └─ typescript
      └─ shared tsconfig you can extend from
```

## Quick Start

> [!NOTE]
>
> The [db](./packages/db) package is preconfigured to use PostgreSQL. If you're using something else, make the necessary modifications to the [schema](./packages/db/prisma/schema.prisma) as well as the [client](./packages/db/src/index.ts). Neon is a serverless database, so it can be used with Next.js edge functions. If you're using a different database, you can use the [Prisma Accelerate](https://www.prisma.io/accelerate) package to do the same.
> To get it running, follow the steps below

### 1. Setup dependencies

```bash
# Install dependencies
bun i

# Configure environment variables
# There is an `.env.example` in the root directory you can use for reference
cp .env.example .env

# Push the Prisma schema to the database
bun db:push
```

### 2a. When it's time to add a new UI component

Run the `ui-add` script to add a new UI component using the interactive [`shadcn/ui`](https://ui.shadcn.com) CLI:

```bash
bun ui-add
```

When the component(s) has been installed, you should be good to go and start using it in your app.

### 2b. When it's time to add a new package

To add a new package, simply run `bun turbo gen init` in the monorepo root. This will prompt you for a package name as well as if you want to install any dependencies to the new package (of course you can also do this yourself later).

The generator sets up the `package.json`, `tsconfig.json` and a `index.ts`, as well as configures all the necessary configurations for tooling around your package such as formatting, linting and typechecking. When the package is created, you're ready to go build out the package.

## Deployment

### Prerequisites

> [!NOTE]
>
> Please note that the Next.js application with tRPC must be deployed in order for the Expo app to communicate with the server in a production environment.

### Deploy to Vercel

Let's deploy the Next.js application to [Vercel](https://vercel.com). If you've never deployed a Turborepo app there, don't worry, the steps are quite straightforward. You can also read the [official Turborepo guide](https://vercel.com/docs/concepts/monorepos/turborepo) on deploying to Vercel.

1. Create a new project on Vercel, select the `apps/nextjs` folder as the root directory. Vercel's zero-config system should handle all configurations for you.

2. Add your environment variable.

3. Done! Your app should successfully deploy.

## References

The stack originates from [create-yuki-app](https://github.com/tiesen243/create-yuki-app).

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

<img src="./.github/yuki.gif" alt="yuki" width="100%" />
