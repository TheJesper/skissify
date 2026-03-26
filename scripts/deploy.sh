#!/bin/bash
set -e

DEPLOY_DIR="/home/jesper/skissify"
LOG_FILE="/var/log/skissify-deploy.log"

echo "$(date '+%Y-%m-%d %H:%M:%S') - Deploy started" >> "$LOG_FILE"

cd "$DEPLOY_DIR"
git pull origin main 2>&1 | tee -a "$LOG_FILE"
docker compose build --no-cache 2>&1 | tee -a "$LOG_FILE"
docker compose up -d 2>&1 | tee -a "$LOG_FILE"

echo "$(date '+%Y-%m-%d %H:%M:%S') - Deploy complete" >> "$LOG_FILE"
