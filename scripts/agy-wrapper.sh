#!/bin/bash
# Wrapper script for Antigravity editor to handle argument formatting from launch-editor

# launch-editor passes arguments as: filename [line] [column]
# Antigravity (agy) expects: -g filename:line:column

FILE="$1"
LINE="$2"
COLUMN="$3"

if [ -z "$FILE" ]; then
  exit 0
fi

TARGET="$FILE"

if [ -n "$LINE" ]; then
  TARGET="$TARGET:$LINE"
  if [ -n "$COLUMN" ]; then
    TARGET="$TARGET:$COLUMN"
  fi
fi

# Use the absolute path to agy found earlier
AGY_BIN="/Users/chemex/.antigravity/antigravity/bin/agy"

"$AGY_BIN" -g "$TARGET"
