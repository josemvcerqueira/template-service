#!/usr/bin/env bash
# why: the merge check. Hooks, CI and people all run this same file, and every step must pass.
set -euo pipefail
cd "$(dirname "$0")/.."
step() { printf '\n== %s ==\n' "$1"; }
step "1/6 standard"; bunx ip-standards-verify
step "2/6 oxfmt";    bunx oxfmt --check .
step "3/6 oxlint";   bunx oxlint --deny-warnings src
step "4/6 tsc";      bunx tsc
step "5/6 knip";     bunx knip --no-progress
step "6/6 bun test"; bun test
