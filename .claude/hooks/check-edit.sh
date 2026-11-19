#!/usr/bin/env bash
# why: Claude Code PostToolUse hook. Formats the file Claude just wrote and lints its package, so Claude reads
# why: the rule's fix-it message while it is still editing. Exit 2 sends stderr back to Claude.
set -uo pipefail
file=$(node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const i=JSON.parse(s).tool_input??{};process.stdout.write(i.file_path??"")})')
case "$file" in *.ts|*.tsx|*.js|*.mjs|*.json|*.md) ;; *) exit 0 ;; esac
[ -f "$file" ] || exit 0
cd "${CLAUDE_PROJECT_DIR:-.}"
npx --no-install oxfmt "$file" >/dev/null 2>&1 || true
case "$file" in *.json|*.md) exit 0 ;; esac
if ! out=$(npx --no-install oxlint --deny-warnings src 2>&1); then
  printf 'Lint failed after your edit. Fix these before moving on:\n%s\n' "$out" >&2
  exit 2
fi
