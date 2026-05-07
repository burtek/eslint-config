#!/usr/bin/env bash

set -euo pipefail

# ---- helpers ----
usage() {
  echo "Usage: $0 <version>"
  echo "Example: $0 1.2.3"
  exit 1
}

# ---- validation ----
if [[ $# -ne 1 ]]; then
  usage
fi

VERSION="$1"
BRANCH="eslint-react-bump-${VERSION}"

if [[ ! -f package.json ]]; then
  echo "❌ package.json not found"
  exit 1
fi

if ! command -v jq >/dev/null 2>&1; then
  echo "❌ jq is required"
  exit 1
fi

# ---- update package.json ----
echo "🔧 Updating dependencies to version ${VERSION}..."

tmpfile=$(mktemp)

jq --arg v "$VERSION" '(.dependencies["@eslint-react/kit"] = $v) | (.dependencies["@eslint-react/eslint-plugin"] = $v)' package.json > "$tmpfile"

mv "$tmpfile" package.json

# ---- install ----
echo "📦 Running yarn..."
yarn

# ---- git branch ----
echo "🌿 Creating branch ${BRANCH}..."
git checkout -b "$BRANCH"

# ---- commit ----
echo "💾 Committing changes..."
git add package.json yarn.lock
git commit -m "chore: bump @eslint-react packages to ${VERSION}"

# ---- push ----
echo "🚀 Pushing branch..."
git push -u origin "$BRANCH"

# ---- create PR ----
echo "🔀 Creating PR..."
gh pr create \
  --base master \
  --head "$BRANCH" \
  --title "chore: bump @eslint-react packages to ${VERSION}" \
  --body "Automated bump to version ${VERSION}"

echo "✅ Done"
