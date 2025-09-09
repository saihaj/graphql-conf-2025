# Social Media App "Y"

[_A hands-on workshop project by Saihajpreet Singh (The Guild), part of GraphQL Conf 2025._](https://graphql.org/conf/2025/schedule/1ef800d68c28db994bfec011a6817fc8/?name=Workshop:%20Social%20Media%20App%20%22Y%22%20with%20GraphQL,%20Relay,%20and%20React%20Server%20Components%20-%20Saihajpreet%20Singh,%20The%20Guild)

---

##  Overview

This repository contains the full source code for the "Social Media App 'Y'" workshop, where we build a sleek, modern social media application using GraphQL, Relay, and React Server Components. You'll get to see how these technologies interlock to create a reactive, efficient, and scalable user experience.

Through this workshop, you’ll:

- Design and implement a GraphQL schema for user-generated content and real-time updates.
- Wire up Relay on both client and server to tap into GraphQL's optimizing data-fetching capabilities.
- Leverage React Server Components to seamlessly divide responsibilities between client and server for improved performance and user experience.

---

##  Architecture

```
GraphQL API (Node.js) ────────── Relay ─── React Server Components ─── Client UI
```

- **GraphQL API**: Written in Node.js (potentially using something like `graphql-js`, or `Apollo Server`). Supports queries, mutations, and subscriptions for key app features (e.g. posts, likes, comments, users).
- **Relay**: Handles data management on both client and server, optimizing for performance, consistency, and developer ergonomics.
- **React Server Components**: Used to render parts of the UI on the server. Enhances performance by sending ready-to-render markup and bundling critical data and hydration logic.

---

##  Quickstart

### Pre‑reqs

- Node.js v18+ (or latest LTS)
- `pnpm` (recommended) or `npm`
- Maybe a PostgreSQL (or other) database set-up if using `drizzle`—check `drizzle.config.ts`

### Getting Started

```bash
# 1. Clone this repo
git clone https://github.com/saihaj/graphql-conf-2025.git
cd graphql-conf-2025

# 2. Install dependencies
pnpm install

# 3. Setup your database
# (If using migrations—pick your DB and update `drizzle.config.ts`)
pnpm migrate up

# 4. Launch the dev server
pnpm dev

# 5. Open your browser
# Navigate to http://localhost:3000 (adjust if necessary)
```

---

##  Folder Breakdown

- `src/` – Core app code: React Server Components, UI, pages, GraphQL resolvers, Relay setup.
- `migrations/` – Database schema migrations.
- `scripts/` – Utility scripts (e.g. seeding, code generation, development helpers).
- `public/` – Static assets, favicon, publicly served files.
- Configs:
  - `drizzle.config.ts` – DB config for your ORM/migrations.
  - `relay.config.json` – Relay compiler config.
  - `schema.graphql` – Canonical GraphQL schema definitions.
  - `tsconfig.json` – TypeScript configuration.
  - `next.config.mjs` or `postcss.config.mjs` – Framework build setups (if using Next.js or similar).

---

##  Workshop Agenda

1. **Kick‑off** — Topic walkthrough, app architecture overview.
2. **Schema Design** — Building types for Posts, Users, Comments, Likes.
3. **GraphQL API** — Implementing queries, mutations, real‑time updates.
4. **Relay Integration** — Setting up Relay compiler, fragment containers, queries, mutations.
5. **React Server Components** — Splitting UI logic between client and server, optimizing load time.
6. **Enhancements** — Adding pagination, subscriptions (e.g. live comments), optimistic updates via Relay.
7. **Wrap‑up & Q&A**

---

##  Learnings You'll Walk Away With

- How Relay streamlines data handling for GraphQL apps.
- How React Server Components boost performance and maintainability.
- Best practices for designing GraphQL schema for modern frontend workflows.
- An end‑to‑end example of building a full-blown real-time app with state-of-the-art stacks.

---

##  Contributing & Feedback

This repo is workshop-oriented and not intended for production, but:

- Feel free to explore it afterward, add features like Direct Messaging or Reactions.
- Open issues or pull requests for typos, optimization ideas, or cool add-ons.
- Reach out via GitHub or The Guild's community channels for feedback, questions, future collabs.