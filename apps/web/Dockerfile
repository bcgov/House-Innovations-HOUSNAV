# -----Base Stage------- #
FROM node:18-alpine AS base

# Install common dependencies
RUN apk add --no-cache libc6-compat && \
    apk update

# Set working directory in Docker container
WORKDIR /app

# Copy files from the current directory into the /app directory in the Docker container
COPY . .

# Install turbo globally
RUN npm install -g turbo
# -----/Base Stage------- #

# -----Builder Stage------- #
FROM base AS builder

# Generate a partial monorepo with a pruned lockfile for a target workspace.
RUN turbo prune --scope web --docker 
# -----/Builder Stage------- #

# -----Installer Stage------- #
# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm install --verbose

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN turbo run build --filter=web...
# -----/Installer Stage------- #

# -----Runner Stage------- #
FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/web/next.config.js .
COPY --from=installer /app/apps/web/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

CMD node apps/web/server.js
# -----/Runner Stage------- #
