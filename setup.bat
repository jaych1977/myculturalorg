@echo off
REM My Cultural Organisation - Windows Setup Script
REM Run this script to set up both frontend and backend

echo 🚀 My Cultural Organisation - Setup Script
echo ==========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js v14 or higher
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js version: %NODE_VERSION%

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✅ npm version: %NPM_VERSION%
echo.

REM Backend setup
echo 📦 Setting up Backend...
echo =========================
cd backend

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📥 Installing backend dependencies...
    call npm install
    if %ERRORLEVEL% EQU 0 (
        echo ✅ Backend dependencies installed
    ) else (
        echo ❌ Failed to install backend dependencies
        exit /b 1
    )
) else (
    echo ✅ Backend dependencies already installed
)

REM Check if .env exists
if not exist ".env" (
    echo.
    echo ⚠️  .env file not found in backend/
    echo 📝 Creating .env from .env.example...
    copy .env.example .env
    echo ✅ .env created. Please edit it with your credentials:
    echo    - RAZORPAY_KEY_ID
    echo    - RAZORPAY_KEY_SECRET
) else (
    echo ✅ .env file exists in backend/
)

cd ..

REM Frontend setup
echo.
echo 📦 Setting up Frontend...
echo ==========================
cd frontend

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📥 Installing frontend dependencies...
    call npm install
    if %ERRORLEVEL% EQU 0 (
        echo ✅ Frontend dependencies installed
    ) else (
        echo ❌ Failed to install frontend dependencies
        exit /b 1
    )
) else (
    echo ✅ Frontend dependencies already installed
)

REM Check if .env.local exists
if not exist ".env.local" (
    echo.
    echo ⚠️  .env.local file not found in frontend/
    echo 📝 Creating .env.local from .env.example...
    copy .env.example .env.local
    echo ✅ .env.local created. Please edit it with your credentials:
    echo    - REACT_APP_RAZORPAY_KEY
    echo    - REACT_APP_API_BASE_URL
) else (
    echo ✅ .env.local file exists in frontend/
)

cd ..

echo.
echo ==========================================
echo ✅ Setup Complete!
echo ==========================================
echo.
echo 📚 Next Steps:
echo 1. Edit backend\.env with your Razorpay test credentials
echo 2. Edit frontend\.env.local with your Razorpay test key
echo 3. Start backend: cd backend ^&^& npm start
echo 4. Start frontend: cd frontend ^&^& npm start (new terminal)
echo 5. Open http://localhost:3000 in your browser
echo.
echo 📖 Documentation:
echo - README.md - Complete project overview
echo - QUICKSTART.md - Quick setup guide
echo - API_DOCUMENTATION.md - API reference
echo.
echo 🎉 Happy coding!
