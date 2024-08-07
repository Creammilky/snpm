#!/bin/bash

WORKDIR=$(pwd)

echo "Current working directory: $WORKDIR"

# make sure bin exist
BIN_DIR="$WORKDIR/bin"
if [ ! -d "$BIN_DIR" ]; then
    echo "Creating bin directory at $BIN_DIR"
    mkdir -p "$BIN_DIR"
fi

# make sure snpm.sh have x permission
SNPM_SH="$BIN_DIR/snpm.sh"
if [ ! -f "$SNPM_SH" ]; then
    echo "snpm.sh not found in $BIN_DIR. Please ensure snpm.sh is in the bin directory."
    exit 1
fi

chmod +x "$SNPM_SH"

TARGET_DIR="$HOME/bin"
if [ -d "$TARGET_DIR" ]; then
    sudo ln -sf "$SNPM_SH" "$TARGET_DIR/snpm"
elif [ -w "/usr/local/bin" ]; then
    sudo ln -sf "$SNPM_SH" "/usr/local/bin/snpm"
else
    echo "Cannot write to /usr/local/bin. Please check permissions."
    exit 1
fi

echo "snpm installed, run snpm --help to get help."

