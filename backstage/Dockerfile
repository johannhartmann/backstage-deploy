# Dockerfile that uses pre-built artifacts
FROM node:22-bookworm-slim

WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Copy the pre-built backend bundle (skeleton + bundle tarballs extracted)
COPY packages/backend/dist/skeleton.tar.gz /tmp/
COPY packages/backend/dist/bundle.tar.gz /tmp/

# Extract backend
RUN tar xzf /tmp/skeleton.tar.gz && \
    tar xzf /tmp/bundle.tar.gz && \
    rm /tmp/skeleton.tar.gz /tmp/bundle.tar.gz

# Copy the pre-built frontend
COPY packages/app/dist ./packages/app/dist
COPY packages/app/package.json ./packages/app/package.json

# Install production dependencies
RUN corepack enable && yarn install --production

# Copy app-config
COPY app-config.yaml ./

# Set environment
ENV NODE_ENV=production

EXPOSE 7007

# Run the bundled backend
CMD ["node", "packages/backend/dist/index.cjs.js", "--config", "app-config.yaml"]
