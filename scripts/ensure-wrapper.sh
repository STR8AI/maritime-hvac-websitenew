#!/usr/bin/env bash
set -euo pipefail

ROOT="highlevel-site/02-pages"
HEADER_FILE="highlevel-site/01-partials/header.html"
FOOTER_CLOSE="</div>"

HEADER_CONTENT=$(cat "$HEADER_FILE")

for file in "$ROOT"/*.html; do
  # Skip if wrapper already exists
  if grep -q '<div class="mh-site">' "$file"; then
    echo "✔ Skipping (already wrapped): $(basename "$file")"
    continue
  fi

  echo "➕ Wrapping: $(basename "$file")"

  tmpfile=$(mktemp)

  {
    echo '<div class="mh-site">'
    echo "$HEADER_CONTENT"
    cat "$file"
    echo "$FOOTER_CLOSE"
  } > "$tmpfile"

  mv "$tmpfile" "$file"
done
