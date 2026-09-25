Write-Host "🚀 Bắt đầu triển khai Hệ sinh thái Kim Sơn Automobiles..." -ForegroundColor Cyan

# 1. Dừng và xóa container cũ nếu có
Write-Host "🧹 Dọn dẹp container cũ..." -ForegroundColor Yellow
docker stop kimsonauto.com 2>$null
docker rm kimsonauto.com 2>$null

# 2. Build Docker Image
Write-Host "🐳 Đang build Docker Image từ Dockerfile (Node.js build bên trong)..." -ForegroundColor Cyan
docker build -t kimson-auto-image .

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build Docker thất bại!" -ForegroundColor Red
    exit 1
}

# 3. Khởi chạy container kimsonauto.com
Write-Host "🚢 Đang khởi chạy container kimsonauto.com..." -ForegroundColor Cyan
docker run -d `
  --name kimsonauto.com `
  -p 80:80 `
  --restart always `
  kimson-auto-image

Write-Host "✅ TRIỂN KHAI THÀNH CÔNG!" -ForegroundColor Green
Write-Host "👉 Truy cập website tại: http://localhost" -ForegroundColor Green
