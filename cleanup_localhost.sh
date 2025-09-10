#\!/bin/bash

echo "🧹 Cleaning up all localhost processes..."

# Kill all Node.js processes
echo "Stopping Node.js processes..."
pkill -f node || true
pkill -f npm || true
pkill -f yarn || true
pkill -f next || true

# Kill Python servers
echo "Stopping Python servers..."
pkill -f "python.*server" || true
pkill -f "python.*runserver" || true

# Kill other common dev servers
echo "Stopping other dev servers..."
pkill -f webpack || true
pkill -f vite || true
pkill -f parcel || true

# Clear common ports
echo "Checking ports..."
for port in 3000 3001 3002 4000 5000 5173 8000 8080 8081 9000; do
    lsof -ti:$port | xargs kill -9 2>/dev/null || true
done

echo "✅ All localhost processes cleaned\!"
echo ""
echo "📝 Next steps:"
echo "1. Clear your browser cache and cookies for localhost"
echo "2. Try an incognito/private window"
echo "3. Disable browser extensions temporarily"
echo "4. Start your Next.js app fresh with: npm run dev"
