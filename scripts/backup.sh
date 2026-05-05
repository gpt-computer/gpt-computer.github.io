#!/bin/bash
# GPT Computer Website - Backup Script
# Creates a timestamped archive of the project

set -e

PROJECT_NAME="gpt-computer-website"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/tmp/backups"
ARCHIVE_NAME="${PROJECT_NAME}_${DATE}.tar.gz"

echo "🔧 Creating backup of ${PROJECT_NAME}..."

# Create backup directory
mkdir -p "${BACKUP_DIR}"

# Create archive (excluding node_modules, .git, dist)
tar -czf "${BACKUP_DIR}/${ARCHIVE_NAME}" \
  --exclude=node_modules \
  --exclude=.git \
  --exclude=dist \
  --exclude=.devcontainer \
  .

echo "✅ Backup created: ${BACKUP_DIR}/${ARCHIVE_NAME}"
echo "📦 Archive size: $(du -h "${BACKUP_DIR}/${ARCHIVE_NAME}" | cut -f1)"

# List archive contents
echo ""
echo "📄 Archive contents:"
tar -tzf "${BACKUP_DIR}/${ARCHIVE_NAME}" | head -20
echo "... ($(tar -tzf "${BACKUP_DIR}/${ARCHIVE_NAME}" | wc -l) files total)"
