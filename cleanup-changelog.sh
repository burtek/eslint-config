#!/usr/bin/env sh
set -eu

file="${1:-CHANGELOG.md}"
tmp="${file}.tmp"

awk '
  BEGIN { skip = 0; n_pre = 0; n_section = 0 }

  # Enter skip mode for prerelease section headers
  /^## \[[^]]*-[^]]+\]/ {
    n_section = 0
    skip = 1
    next
  }

  # Stable release header: exit skip mode, discard any buffered empty section
  /^## \[/ {
    skip = 0
    if (n_section > 0) {
      # An empty section was pending (all items filtered out) - replace it with
      # a single blank separator line before the next release header
      n_section = 0
      n_pre = 0
      print ""
    } else {
      for (i = 0; i < n_pre; i++) print pre[i]
      n_pre = 0
    }
    print
    next
  }

  skip { next }

  # Skip prerelease release-bump commit lines within stable release entries
  /^\* \*\*release:\*\* [0-9]+\.[0-9]+\.[0-9]+-/ { next }

  # Subsection header: absorb preceding blank lines into the section buffer so
  # that they are discarded together if the section turns out to be empty
  /^### / {
    n_section = 0
    for (i = 0; i < n_pre; i++) section[i] = pre[i]
    n_section = n_pre
    n_pre = 0
    section[n_section++] = $0
    next
  }

  # Blank line: buffer inside a pending section, otherwise in the pre-blank pool
  /^[[:space:]]*$/ {
    if (n_section > 0) {
      section[n_section++] = $0
    } else {
      pre[n_pre++] = $0
    }
    next
  }

  # Any other content: flush buffered section header (with its pre-blanks) then print
  {
    for (i = 0; i < n_section; i++) print section[i]
    n_section = 0
    for (i = 0; i < n_pre; i++) print pre[i]
    n_pre = 0
    print
  }

  END {
    for (i = 0; i < n_pre; i++) print pre[i]
  }
' "$file" > "$tmp"

mv "$tmp" "$file"

# Delete local prerelease tags so commit-and-tag-version uses the last stable
# tag as the start point when generating the full release changelog
prerelease_tags=$(git tag -l | grep -E '^v[0-9]+\.[0-9]+\.[0-9]+-' || true)
if [ -n "$prerelease_tags" ]; then
    echo "$prerelease_tags" | xargs git tag -d
fi
