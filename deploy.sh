#!/bin/bash

# Màu sắc thông báo
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 Bắt đầu triển khai Hệ sinh thái Kim Sơn Automobiles...${NC}"

# 1. Dừng và xóa container cũ
echo -e "${YELLOW}🧹 Dọn dẹp container cũ nếu có...${NC}"
docker stop kimsonauto.com 2>/dev/null || true
docker rm kimsonauto.com 2>/dev/null || true

# 2. Build Docker Image (Quá trình build diễn ra bên trong Docker)
echo -e "${BLUE}🐳 Đang build Docker Image từ Dockerfile...${NC}"
docker build -t kimson-auto-image .

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Build Docker thất bại!${NC}"
  exit 1
fi

# 3. Chạy Container với tên kimsonauto.com
echo -e "${BLUE}🚢 Đang khởi chạy container kimsonauto.com...${NC}"
docker run -d \
  --name kimsonauto.com \
  -p 80:80 \
  --restart always \
  kimson-auto-image

echo -e "${GREEN}✅ TRIỂN KHAI THÀNH CÔNG!${NC}"
echo -e "${GREEN}👉 Truy cập website tại: http://localhost${NC}"
