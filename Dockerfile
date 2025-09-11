# Single stage build for CapRover
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy all project files
COPY . .

# Build the Next.js application
RUN npm run build

# Remove dev dependencies after build
RUN npm prune --production

# Set runtime environment variables
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Start the application using the standalone server
CMD ["node", ".next/standalone/server.js"]