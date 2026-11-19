#!/usr/bin/env bash
# why: the merge check. Hooks, CI and people all run this same file, and every step must pass.
set -euo pipefail
cd "$(dirname "$0")/.."
step() { printf '\n== %s ==\n' "$1"; }
step "1/6 standard"; npx --no-install ip-standards-verify
step "2/6 oxfmt";    npx --no-install oxfmt --check .
step "3/6 oxlint";   npx --no-install oxlint --deny-warnings src
step "4/6 tsc";      npx --no-install tsc
step "5/6 knip";     npx --no-install knip --no-progress
step "6/6 vitest";   npx --no-install vitest run
