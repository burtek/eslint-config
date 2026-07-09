#!/usr/bin/env sh
set -eu

file="${1:-CHANGELOG.md}"
tmp="${file}.tmp"

awk '
  /^## \[[^]]*-[^]]+\]/ {
    skip = 1
    next
  }

  /^## \[/ {
    skip = 0
  }

  !skip {
    print
  }
' "$file" > "$tmp"

mv "$tmp" "$file"
