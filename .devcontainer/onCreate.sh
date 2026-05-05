#!/usr/bin/env bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_DIR="${WORKSPACE_DIR:-/workspaces/gpt-computer.github.io}"

# ------------------------------------------------
# Helpers
# ------------------------------------------------
run_root() {
  if command -v sudo >/dev/null 2>&1; then
    sudo "$@"
  else
    "$@"
  fi
}

detect_pkg_manager() {
  if command -v apt-get >/dev/null 2>&1; then
    echo "apt"
  elif command -v apk >/dev/null 2>&1; then
    echo "apk"
  elif command -v dnf >/dev/null 2>&1; then
    echo "dnf"
  elif command -v yum >/dev/null 2>&1; then
    echo "yum"
  else
    echo "none"
  fi
}

PKG_MANAGER=$(detect_pkg_manager)

echo "Detected package manager: $PKG_MANAGER"

# ------------------------------------------------
# Create node user if missing
# ------------------------------------------------
if ! id node >/dev/null 2>&1; then
  echo "Creating node user"
  run_root mkdir -p /home/node
  if command -v useradd >/dev/null 2>&1; then
    run_root useradd -m -d /home/node -s /bin/bash node || true
  elif command -v adduser >/dev/null 2>&1; then
    run_root adduser -D -h /home/node node || true
  fi
fi

run_root mkdir -p /home/node
run_root chown -R "$(id -u node 2>/dev/null || echo 1000)":"$(id -g node 2>/dev/null || echo 1000)" /home/node

# ------------------------------------------------
# Install required packages
# ------------------------------------------------
echo "Installing required packages"

case "$PKG_MANAGER" in
  apt)
    run_root apt-get update
    run_root apt-get install -y wget jq curl tar unzip inotify-tools ripgrep fd-find supervisor ca-certificates git
    ;;
  apk)
    run_root apk add --no-cache wget jq curl tar unzip inotify-tools ripgrep fd supervisor ca-certificates git
    ;;
  dnf)
    run_root dnf install -y wget jq curl tar unzip inotify-tools ripgrep fd-find supervisor ca-certificates git
    ;;
  yum)
    run_root yum install -y wget jq curl tar unzip inotify-tools ripgrep fd-find supervisor ca-certificates git
    ;;
  *)
    echo "Unsupported base image: no package manager found"
    exit 1
    ;;
esac

echo "Installing GitHub CLI"

GH_VERSION=$(curl -fsSL \
  -H "Authorization: Bearer ${GITHUB_TOKEN:-}" \
  https://api.github.com/repos/cli/cli/releases/latest \
  | jq -r .tag_name 2>/dev/null || true)

[ -z "$GH_VERSION" ] || [ "$GH_VERSION" = "null" ] && GH_VERSION="2.57.0"
GH_VERSION="${GH_VERSION#v}"

ARCH=$(uname -m)
[ "$ARCH" = "x86_64" ] && GH_ARCH="amd64"
[ "$ARCH" = "aarch64" ] && GH_ARCH="arm64"

curl -L "https://github.com/cli/cli/releases/download/v${GH_VERSION}/gh_${GH_VERSION}_linux_${GH_ARCH}.tar.gz" -o /tmp/gh.tar.gz
tar -xzf /tmp/gh.tar.gz -C /tmp
mv /tmp/gh_*_linux_${GH_ARCH}/bin/gh /usr/local/bin/gh
chmod +x /usr/local/bin/gh
rm -rf /tmp/gh*

# ------------------------------------------------
# Install azcopy
# ------------------------------------------------
echo "Installing azcopy"

curl -L https://aka.ms/downloadazcopy-v10-linux -o /tmp/azcopy.tar.gz
tar -xzf /tmp/azcopy.tar.gz -C /tmp
AZCOPY_BIN=$(find /tmp -type f -name azcopy | head -n 1)
run_root mv "$AZCOPY_BIN" /usr/local/bin/azcopy
run_root chmod +x /usr/local/bin/azcopy
rm -rf /tmp/azcopy*

# ------------------------------------------------
# Install SDK
# ------------------------------------------------
echo "Installing sdk"

LATEST_RELEASE="$(bash "$SCRIPT_DIR/refreshTools.sh")"
mkdir -p /tmp/spark
cd /tmp/spark

LATEST_RELEASE="$LATEST_RELEASE" \
WORKSPACE_DIR="$WORKSPACE_DIR" \
bash "$WORKSPACE_DIR/spark-sdk-dist/install-tools.sh"

# ------------------------------------------------
# Node/npm section
# ------------------------------------------------
cd "$WORKSPACE_DIR"

echo "Installing npm dependencies"
run_root -u node npm install || npm install

echo "Configuring npm global directory"
run_root -u node mkdir -p /home/node/.npm-global || mkdir -p /home/node/.npm-global
run_root -u node npm config set prefix '/home/node/.npm-global' || npm config set prefix '/home/node/.npm-global'

echo "Pre-starting optimize"
run_root -u node npm run optimize --override || npm run optimize --override

echo "Done"