# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all project files
COPY . .

# Build the Next.js application
# The build will use default/empty values for environment variables
# Actual values will be provided at runtime by CapRover
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copy package.json for version info
COPY --from=builder /app/package.json ./package.json

# Set runtime environment variables
# These will be overridden by CapRover environment variables
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Start the standalone server
CMD ["node", "server.js"]