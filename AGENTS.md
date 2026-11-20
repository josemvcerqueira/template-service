# ts-service

A Bun TypeScript service built on the Interest Protocol house standard. Read `node_modules/@interest-protocol/standards/STANDARD.md` once; the lint rules enforce the rest and their messages tell you the fix.

## Where code goes

`src/app` entry points · `src/features/<name>` one folder per feature · `src/data` storage and external APIs · `src/config/env.ts` the parsed environment · `src/lib` pure helpers. A feature never imports another feature.

Bun is the runtime, package manager and test runner: `bun install`, `bun add`, `bun test`. Never npm, pnpm or yarn.

## Gate

`bun run gate` (standard check, oxfmt, oxlint, tsc, knip, bun test) is the merge check. Hooks lint after every edit and will not let you finish while the gate fails. Lint, format, compiler, hook and CI config are read-only for agents: change the code, not the rules.

## Review

A different agent reviews every PR from the diff alone. A comment that comes up twice becomes a lint rule in `@interest-protocol/standards`.

## Not allowed without Jose

Secrets in the repo, deploys, branch-protection changes.
