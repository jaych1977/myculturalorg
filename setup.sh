#!/bin/bash

# My Cultural Organisation - Setup Script
# Run this script to set up both frontend and backend

echo "🚀 My Cultural Organisation - Setup Script"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v14 or higher"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Backend setup
echo "📦 Setting up Backend..."
echo "========================"
cd backend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📥 Installing backend dependencies..."
    npm install
    if [ $? -eq 0 ]; then
        echo "✅ Backend dependencies installed"
    else
        echo "❌ Failed to install backend dependencies"
        exit 1
    fi
else
    echo "✅ Backend dependencies already installed"
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo ""
    echo "⚠️  .env file not found in backend/"
    echo "📝 Creating .env from .env.example..."
    cp .env.example .env
    echo "✅ .env created. Please edit it with your credentials:"
    echo "   - RAZORPAY_KEY_ID"
    echo "   - RAZORPAY_KEY_SECRET"
    echo "   - GOOGLE_SHEET_ID (optional for now)"
else
    echo "✅ .env file exists in backend/"
fi

cd ..

# Frontend setup
echo ""
echo "📦 Setting up Frontend..."
echo "========================="
cd frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📥 Installing frontend dependencies..."
    npm install
    if [ $? -eq 0 ]; then
        echo "✅ Frontend dependencies installed"
    else
        echo "❌ Failed to install frontend dependencies"
        exit 1
    fi
else
    echo "✅ Frontend dependencies already installed"
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo ""
    echo "⚠️  .env.local file not found in frontend/"
    echo "📝 Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "✅ .env.local created. Please edit it with your credentials:"
    echo "   - REACT_APP_RAZORPAY_KEY"
    echo "   - REACT_APP_API_BASE_URL"
else
    echo "✅ .env.local file exists in frontend/"
fi

cd ..

echo ""
echo "=========================================="
echo "✅ Setup Complete!"
echo "=========================================="
echo ""
echo "📚 Next Steps:"
echo "1. Edit backend/.env with your Razorpay test credentials"
echo "2. Edit frontend/.env.local with your Razorpay test key"
echo "3. Start backend: cd backend && npm start"
echo "4. Start frontend: cd frontend && npm start (new terminal)"
echo "5. Open http://localhost:3000 in your browser"
echo ""
echo "📖 Documentation:"
echo "- README.md - Complete project overview"
echo "- QUICKSTART.md - Quick setup guide"
echo "- API_DOCUMENTATION.md - API reference"
echo ""
echo "🎉 Happy coding!"
