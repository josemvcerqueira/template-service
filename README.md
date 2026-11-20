# template-service

The starter for new Bun services. On GitHub press **Use this template**, then rename `ts-service` in `package.json` and `AGENTS.md`. Rules come from [`@interest-protocol/standards`](https://github.com/josemvcerqueira/standards) at a pinned tag: bump the tag to get rule updates, never copy rules into this repo.

```sh
bun install
bun run dev      # bun --watch, GET /health on PORT
bun run gate     # verify, oxfmt, oxlint, tsc, knip, bun test: the merge check
```

After the first push, make the gate required on `main` (needs repo admin):

```sh
gh api -X POST repos/OWNER/REPO/rulesets --input .github/ruleset.json
```

Included: a `src/platform/` layer (http, clock, log, server) that is the only code allowed to touch the runtime, Oxlint and oxfmt from `@interest-protocol/standards`, the house tsconfig, zod env parsing at boot, the standard `src/` folders, lefthook pre-commit and pre-push hooks, a GitHub Actions gate, and Claude Code hooks that block edits to the rules, lint after every edit, and keep Claude working until the gate passes. See STANDARD.md#enforcement.
