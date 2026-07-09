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

# Delete local prerelease tags so commit-and-tag-version uses the last stable
# tag as the start point when generating the full release changelog
prerelease_tags=$(git tag -l | grep -E '^v[0-9]+\.[0-9]+\.[0-9]+-' || true)
if [ -n "$prerelease_tags" ]; then
    echo "$prerelease_tags" | xargs git tag -d
fi
