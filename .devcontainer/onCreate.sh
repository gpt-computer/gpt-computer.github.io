#!/usr/bin/env bash
set -xEeuo pipefail
trap 'echo "[FAIL] line=$LINENO cmd=$BASH_COMMAND exit=$?"' ERR
# ----------------------------------------------------------
# Constants
# ----------------------------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_DIR="${WORKSPACE_DIR:-/workspaces/gpt-computer.github.io}"
TOOLS_BIN="${WORKSPACE_DIR}/.local/bin"
TOOLS_TMP="/tmp/devcontainer-tools"

mkdir -p "$TOOLS_BIN" "$TOOLS_TMP"

export PATH="$TOOLS_BIN:$PATH"

echo 'export PATH="'"$TOOLS_BIN"':$PATH"' >> "$HOME/.bashrc" || true
echo 'export PATH="'"$TOOLS_BIN"':$PATH"' >> "$HOME/.profile" || true

# ----------------------------------------------------------
# Helpers
# ----------------------------------------------------------
log() {
  echo
  echo "=================================================="
  echo "$1"
  echo "=================================================="
}

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "Missing required command: $1"
    exit 1
  }
}

detect_pkg_manager() {
  if command -v apk >/dev/null 2>&1; then
    echo "apk"
  elif command -v apt-get >/dev/null 2>&1; then
    echo "apt"
  elif command -v dnf >/dev/null 2>&1; then
    echo "dnf"
  elif command -v yum >/dev/null 2>&1; then
    echo "yum"
  else
    echo "none"
  fi
}

PKG_MANAGER="$(detect_pkg_manager)"
echo "Detected package manager: $PKG_MANAGER"

# ----------------------------------------------------------
# Install base packages
# ----------------------------------------------------------
log "Installing required packages"

run_priv() {
  if command -v sudo >/dev/null 2>&1; then
    sudo "$@"
  else
    "$@"
  fi
}

retry() {
  local attempts=3
  local count=1
  until "$@"; do
    if [ "$count" -ge "$attempts" ]; then
      echo "Command failed after ${attempts} attempts: $*"
      return 1
    fi
    echo "Retrying ($count/$attempts): $*"
    count=$((count + 1))
    sleep 2
  done
}

COMMON_PKGS="bash curl wget jq tar unzip git ripgrep inotify-tools ca-certificates nodejs npm"

case "$PKG_MANAGER" in
  apk)
    retry run_priv apk add --no-cache $COMMON_PKGS fd
    ;;
  apt)
    retry run_priv apt-get update
    retry run_priv apt-get install -y $COMMON_PKGS fd-find
    ;;
  dnf)
    retry run_priv dnf install -y $COMMON_PKGS fd-find
    ;;
  yum)
    retry run_priv yum install -y $COMMON_PKGS fd-find
    ;;
  *)
    echo "No supported package manager found: $PKG_MANAGER"
    exit 1
    ;;
esac

# normalize fd binary naming
if ! command -v fd >/dev/null 2>&1 && command -v fdfind >/dev/null 2>&1; then
  mkdir -p "$TOOLS_BIN"
  ln -sf "$(command -v fdfind)" "$TOOLS_BIN/fd"
fi

# ----------------------------------------------------------
# Validate required commands
# ----------------------------------------------------------
MISSING_CMDS=()

for cmd in bash curl wget jq tar unzip git rg npm node; do
  command -v "$cmd" >/dev/null 2>&1 || MISSING_CMDS+=("$cmd")
done

# fd validation
if ! command -v fd >/dev/null 2>&1 && ! command -v fdfind >/dev/null 2>&1; then
  MISSING_CMDS+=("fd")
fi

# inotify validation
if ! command -v inotifywait >/dev/null 2>&1; then
  MISSING_CMDS+=("inotify-tools")
fi

if [ "${#MISSING_CMDS[@]}" -gt 0 ]; then
  echo "Missing required commands after package install:"
  printf ' - %s\n' "${MISSING_CMDS[@]}"
  exit 1
fi

echo "Base package installation complete."

# ----------------------------------------------------------
# Install GitHub CLI (pinned deterministic)
# ----------------------------------------------------------
log "Installing GitHub CLI"

GH_VERSION="2.57.0"

ARCH="$(uname -m)"
case "$ARCH" in
  x86_64) GH_ARCH="amd64" ;;
  aarch64|arm64) GH_ARCH="arm64" ;;
  *)
    echo "Unsupported architecture: $ARCH"
    exit 1
    ;;
esac

curl -L \
  "https://github.com/cli/cli/releases/download/v${GH_VERSION}/gh_${GH_VERSION}_linux_${GH_ARCH}.tar.gz" \
  -o "$TOOLS_TMP/gh.tar.gz"

tar -xzf "$TOOLS_TMP/gh.tar.gz" -C "$TOOLS_TMP"
cp "$TOOLS_TMP"/gh_*_linux_${GH_ARCH}/bin/gh "$TOOLS_BIN/gh"
chmod +x "$TOOLS_BIN/gh"

gh --version || true

# ----------------------------------------------------------
# Install AzCopy (pinned deterministic)
# ----------------------------------------------------------
log "Installing AzCopy"

AZCOPY_VERSION="10.32.3"

curl -L \
  "https://github.com/Azure/azure-storage-azcopy/releases/download/v${AZCOPY_VERSION}/azcopy_linux_amd64_${AZCOPY_VERSION}.tar.gz" \
  -o "$TOOLS_TMP/azcopy.tar.gz"

tar -xzf "$TOOLS_TMP/azcopy.tar.gz" -C "$TOOLS_TMP"
AZCOPY_BIN="$(find "$TOOLS_TMP" -type f -name azcopy | head -n 1)"

cp "$AZCOPY_BIN" "$TOOLS_BIN/azcopy"
chmod +x "$TOOLS_BIN/azcopy"

azcopy --version || true

# ----------------------------------------------------------
# Install Spark SDK tools
# ----------------------------------------------------------
log "Installing Spark SDK"

if [ ! -f "$SCRIPT_DIR/refreshTools.sh" ]; then
  echo "Missing refreshTools.sh"
  exit 1
fi

LATEST_RELEASE="$(bash "$SCRIPT_DIR/refreshTools.sh" || true)"

if [ -z "$LATEST_RELEASE" ] || [ "$LATEST_RELEASE" = "null" ]; then
  echo "refreshTools.sh returned invalid release"
  exit 1
fi

mkdir -p /tmp/spark
cd /tmp/spark

LATEST_RELEASE="$LATEST_RELEASE" \
WORKSPACE_DIR="$WORKSPACE_DIR" \
bash "$WORKSPACE_DIR/spark-sdk-dist/install-tools.sh"

# ----------------------------------------------------------
# NPM project bootstrap
# ----------------------------------------------------------
log "Installing npm dependencies"

cd "$WORKSPACE_DIR"

npm install

mkdir -p "$HOME/.npm-global"
npm config set prefix "$HOME/.npm-global"

npm run optimize --override

# ----------------------------------------------------------
# Install OpenCode standalone binary
# ----------------------------------------------------------
log "Installing OpenCode"

OPENCODE_INSTALL_DIR="$TOOLS_BIN"
export OPENCODE_INSTALL_DIR

curl -fsSL https://opencode.ai/install | bash

if ! command -v opencode >/dev/null 2>&1; then
  echo "OpenCode install failed"
  exit 1
fi

opencode --version || true

# ----------------------------------------------------------
# Cleanup
# ----------------------------------------------------------
log "Cleanup"

rm -rf "$TOOLS_TMP"

echo
echo "Devcontainer bootstrap completed successfully."