#!/bin/bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Creating home directory for node user"
sudo mkdir -p /home/node
sudo chown node:node /home/node

echo "Installing required packages"
sudo apt-get update
sudo apt-get install -y wget jq inotify-tools ripgrep fd-find

echo "Installing the GitHub CLI"
sudo mkdir -p -m 755 /etc/apt/keyrings
out=$(mktemp)
wget -nv -O"$out" https://cli.github.com/packages/githubcli-archive-keyring.gpg
sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg < "$out" > /dev/null
sudo chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt-get update
sudo apt-get install -y gh

echo "Installing azcopy"
sudo wget -O /usr/local/bin/azcopytar https://aka.ms/downloadazcopy-v10-linux
sudo tar -xvf /usr/local/bin/azcopytar -C /usr/local/bin/
sudo rm /usr/local/bin/azcopytar
azcopy_dir=$(find /usr/local/bin/ -type d -name "azcopy*" | head -n 1)
sudo mv "$azcopy_dir/azcopy" /usr/local/bin/azcopy
sudo rm -rf "$azcopy_dir"

echo "Installing sdk"
LATEST_RELEASE=$(bash "$SCRIPT_DIR/refreshTools.sh")
cd /tmp/spark
LATEST_RELEASE="$LATEST_RELEASE" WORKSPACE_DIR="$WORKSPACE_DIR" bash spark-sdk-dist/install-tools.sh

cd /workspaces/gpt-computer.github.io
echo "Installing npm dependencies"
sudo -u node npm install

echo "Configuring npm global directory"
sudo -u node mkdir -p /home/node/.npm-global
sudo -u node npm config set prefix '/home/node/.npm-global'

echo "Pre-starting the server and generating the optimized assets"
sudo -u node npm run optimize --override

echo "Installing supervisor"
sudo apt-get install -y supervisor
