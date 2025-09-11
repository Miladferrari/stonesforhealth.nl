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

# Expose port
EXPOSE 3000

# Start the standalone server
CMD ["node", ".next/standalone/server.js"]