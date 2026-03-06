#!/bin/bash

# TUI Builder — One-click Termux Deploy
# Usage: curl -fsSL https://tui-builder.vercel.app/install.sh | bash

set -e

echo "🚀 TUI Builder — Termux Install"
echo "================================"

# Detect package manager
if ! command -v npm &> /dev/null; then
    echo "⚠️  Node.js not found. Installing..."
    pkg install nodejs -y
fi

# Create app directory
APP_DIR="$HOME/tui-builder"
mkdir -p "$APP_DIR"
cd "$APP_DIR"

echo "📦 Cloning TUI Builder..."
git clone https://github.com/your-repo/tui-builder.git . 2>/dev/null || echo "Using local files"

echo "📥 Installing dependencies..."
npm install --legacy-peer-deps

echo "🔨 Building production bundle..."
npm run build

echo "✅ Installation complete!"
echo ""
echo "📱 Running on Termux:"
echo "  npm run dev   — Start dev server"
echo "  npm run build — Production build"
echo ""
echo "🌐 Open: http://localhost:5173"
echo "⌨️  Ctrl+C to stop"

# Optionally start dev server
read -p "Start dev server now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npm run dev
fi
