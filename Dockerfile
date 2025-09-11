FROM node:18-alpine

WORKDIR /app

# Set ENV variables first
ENV NODE_ENV=production
ENV PORT=3000

# Copy and install dependencies
COPY package*.json ./
RUN npm ci

# Copy application files
COPY . .

# Build the application
RUN npm run build

# Copy static files and public folder to standalone (required for Next.js standalone)
RUN cp -r .next/static .next/standalone/.next/ && \
    cp -r public .next/standalone/ 2>/dev/null || true

# Expose port
EXPOSE 3000

# Start the standalone server from the standalone directory
CMD ["node", ".next/standalone/server.js"]