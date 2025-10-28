@echo off
echo 🚀 Setting up Cinematic Portfolio...

echo 📦 Installing dependencies...
npm install

echo 📁 Creating directories...
if not exist "public\data" mkdir "public\data"
if not exist "lib" mkdir "lib"
if not exist "components" mkdir "components"

echo ✅ Setup complete!
echo.
echo 🎉 Your cinematic portfolio is ready!
echo.
echo To start the development server, run:
echo npm run dev
echo.
echo Then open http://localhost:3000 in your browser.
echo.
echo Happy coding! 🎨✨
pause
