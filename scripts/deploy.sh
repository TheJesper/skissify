#!/bin/bash
set -e

DEPLOY_DIR="/root/skissify"
LOG_FILE="/var/log/skissify-deploy.log"

echo "$(date '+%Y-%m-%d %H:%M:%S') - Deploy started" >> "$LOG_FILE"

cd "$DEPLOY_DIR"
git pull origin master 2>&1 | tee -a "$LOG_FILE"
docker compose up -d --build --remove-orphans 2>&1 | tee -a "$LOG_FILE"
docker image prune -f 2>&1 | tee -a "$LOG_FILE"

echo "$(date '+%Y-%m-%d %H:%M:%S') - Deploy complete" >> "$LOG_FILE"
