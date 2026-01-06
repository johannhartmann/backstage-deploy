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

# Build frontend app first
RUN yarn workspace app build

# Build backend (includes frontend in bundle)
RUN yarn build:backend

# Extract the bundle into /bundle
WORKDIR /bundle
RUN tar xzf /app/packages/backend/dist/skeleton.tar.gz && \
    tar xzf /app/packages/backend/dist/bundle.tar.gz && \
    mkdir -p ./packages/app && \
    cp -r /app/packages/app/dist ./packages/app/dist && \
    cp /app/packages/app/package.json ./packages/app/package.json

# Stage 2: Production
FROM node:22-bookworm-slim

WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Copy the extracted bundle (contains packages/backend/dist/index.cjs.js)
COPY --from=build /bundle/ ./

# Install production dependencies
RUN corepack enable && yarn install --production

# Copy app-config
COPY app-config.yaml ./

# Set environment
ENV NODE_ENV=production

EXPOSE 7007

# Run the bundled backend
CMD ["node", "packages/backend/dist/index.cjs.js", "--config", "app-config.yaml"]
