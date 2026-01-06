# Stage 1: Build
FROM node:22-bookworm-slim AS build

WORKDIR /app

# Install dependencies for native modules
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    g++ \
    make \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package.json yarn.lock* ./
COPY packages/backend/package.json ./packages/backend/
COPY packages/app/package.json ./packages/app/

# Install dependencies
RUN corepack enable && yarn install --frozen-lockfile || yarn install

# Copy source code
COPY . .

# Build backend and app
RUN yarn build:backend

# Stage 2: Production
FROM node:22-bookworm-slim

WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Copy built backend
COPY --from=build /app/packages/backend/dist ./packages/backend/dist
COPY --from=build /app/packages/backend/package.json ./packages/backend/
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
COPY app-config.yaml ./

# Set environment
ENV NODE_ENV=production

EXPOSE 7007

CMD ["node", "packages/backend/dist/index.cjs.js"]
