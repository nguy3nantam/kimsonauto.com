#!/bin/bash
# ------------------------------------------------------------------
# release.sh — Quy trình phát hành đầy đủ cho kimsonauto.com (VPS)
#   1. Lint + Build
#   2. Dọn dẹp file rác & cache (dist cũ, .vite, *.log, /tmp scratch)
#   3. Commit & Push lên GitHub (origin/main)
#   4. Deploy container qua docker-compose.vps.yml (Traefik + HTTPS)
#   5. Kiểm tra sức khỏe dịch vụ
#
# Dùng:  ./release.sh "nội dung commit"
# ------------------------------------------------------------------
set -euo pipefail
cd "$(dirname "$0")"

GREEN='\033[0;32m'; BLUE='\033[0;34m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'
MSG="${1:-Cập nhật kimsonauto.com}"

echo -e "${BLUE}🚀 Phát hành kimsonauto.com — commit: ${MSG}${NC}"

# 1) Lint + Build
echo -e "${YELLOW}🔍 Lint...${NC}"
npm run lint
echo -e "${YELLOW}🏗️  Build...${NC}"
npm run build

# 2) Dọn dẹp file rác & cache
echo -e "${YELLOW}🧹 Dọn dẹp file rác & cache...${NC}"
rm -rf .vite
find . -maxdepth 1 -name '*.log' -delete 2>/dev/null || true
rm -f /tmp/eco_origin.js /tmp/all_images.txt 2>/dev/null || true

# 3) Commit & Push
echo -e "${YELLOW}📦 Git commit & push...${NC}"
if [ -n "$(git status --porcelain)" ]; then
  git add -A
  git commit -q -m "$MSG"
  git push origin main
else
  echo "   (không có thay đổi mới để commit)"
fi

# 4) Deploy
echo -e "${YELLOW}🐳 Deploy container...${NC}"
docker compose -f docker-compose.vps.yml up -d --build

# Dọn cache build Docker (giữ image đang dùng)
docker builder prune -f >/dev/null 2>&1 || true

# 5) Kiểm tra
echo -e "${YELLOW}🩺 Kiểm tra dịch vụ...${NC}"
sleep 6
docker ps --filter name=kimsonauto.com --format '   {{.Names}} {{.Status}}'
echo -n "   /api/health -> "; curl -s -o /dev/null -w "%{http_code}\n" https://kimsonauto.com/api/health
echo -n "   /            -> "; curl -s -o /dev/null -w "%{http_code}\n" https://kimsonauto.com/

echo -e "${GREEN}✅ HOÀN TẤT! Đã deploy, dọn dẹp và đưa lên GitHub.${NC}"
