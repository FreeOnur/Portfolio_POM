#!/bin/bash

echo "🚀 Setting up Cinematic Portfolio..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p public/data
mkdir -p lib
mkdir -p components

echo "✅ Setup complete!"
echo ""
echo "🎉 Your cinematic portfolio is ready!"
echo ""
echo "To start the development server, run:"
echo "npm run dev"
echo ""
echo "Then open http://localhost:3000 in your browser."
echo ""
echo "Happy coding! 🎨✨"
