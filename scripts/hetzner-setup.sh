#!/bin/bash
set -e

# Initial setup for Skissify on Hetzner (65.109.62.25)
# Run this ONCE on the server to set up the project

echo "=== Skissify Hetzner Setup ==="

# 1. Generate SSH deploy key for GitHub
if [ ! -f /root/.ssh/github-skissify ]; then
  ssh-keygen -t ed25519 -f /root/.ssh/github-skissify -N "" -C "skissify-deploy-hetzner"
  echo ""
  echo "Add this deploy key to GitHub:"
  echo "  URL: https://github.com/TheJesper/skissify/settings/keys"
  echo "  Title: skissify-hetzner-deploy"
  echo "  Key:"
  cat /root/.ssh/github-skissify.pub
  echo ""
  echo "Press Enter after adding the key..."
  read -r
fi

# 2. Configure SSH for GitHub
if ! grep -q "github-skissify" /root/.ssh/config 2>/dev/null; then
  cat >> /root/.ssh/config <<'SSHEOF'

Host github-skissify
  HostName github.com
  User git
  IdentityFile /root/.ssh/github-skissify
  IdentitiesOnly yes
SSHEOF
  chmod 600 /root/.ssh/config
fi

# 3. Clone the repo
if [ ! -d /root/skissify ]; then
  git clone git@github-skissify:TheJesper/skissify.git /root/skissify
else
  echo "Repo already exists at /root/skissify"
fi

cd /root/skissify

# 4. Create .env.production from template
if [ ! -f .env.production ]; then
  cp .env.production.example .env.production

  # Generate NEXTAUTH_SECRET
  SECRET=$(openssl rand -base64 32)
  sed -i "s|NEXTAUTH_SECRET=.*|NEXTAUTH_SECRET=$SECRET|" .env.production

  echo ""
  echo "Edit .env.production to add Google OAuth credentials:"
  echo "  nano /root/skissify/.env.production"
  echo ""
  echo "Required:"
  echo "  GOOGLE_CLIENT_ID=..."
  echo "  GOOGLE_CLIENT_SECRET=..."
  echo ""
  echo "Press Enter after editing..."
  read -r
fi

# 5. Ensure traefik network exists
docker network create traefik-network 2>/dev/null || true

# 6. Build and start
docker compose up -d --build 2>&1 | tail -10

# 7. Health check
sleep 8
if curl -sf http://localhost:9700/ > /dev/null; then
  echo ""
  echo "=== Skissify is running! ==="
  echo "  Local: http://localhost:9700"
  echo "  Domain: https://skissify.conzeon.dev (after DNS propagation)"
else
  echo ""
  echo "=== WARNING: Health check failed ==="
  echo "Check logs: docker logs skissify --tail 50"
fi
