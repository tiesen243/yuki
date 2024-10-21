#!/bin/bash

bun clean:workspaces
bun update

# Base directories
BASE_DIRS=("apps" "packages" "tooling")

# Iterate over each base directory
for BASE_DIR in "${BASE_DIRS[@]}"; do
  # Find all package.json files within the base directory, excluding directories starting with a dot
  find "$BASE_DIR" -name ".*" -prune -o -name "package.json" -print | while read -r PACKAGE_JSON; do
    # Get the directory of the package.json file
    PACKAGE_DIR=$(dirname "$PACKAGE_JSON")

    # Check if the package is outdated
    echo "Outdated packages in $PACKAGE_DIR"
    (cd "$PACKAGE_DIR" && bun outdated)

    # Check if the package is in the packages/ui directory
    if [[ "$PACKAGE_DIR" == *"packages/ui"* ]]; then
     echo "Updating $PACKAGE_DIR with bun update --latest"
      (cd "$PACKAGE_DIR" && bun update --latest)
    else
      echo "Updating $PACKAGE_DIR with bun update"
      (cd "$PACKAGE_DIR" && bun update)
    fi
  done
done
