FROM node:16-alpine AS base
RUN apk update && apk add git

## Globally install turbo
RUN yarn global add turbo

# Prune the workspace for the `frontend` app
FROM base as pruner
COPY .git ./.git
COPY ../../ .
RUN turbo prune --scope=web

# Add pruned lockfile and package.json's of the pruned subworkspace
FROM pruner AS installer
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

# Copy source code of pruned subworkspace and build
FROM installer as builder
WORKDIR /app
COPY --from=pruner .git ./.git
COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
RUN turbo run build --scope=web

# Start the app
FROM builder as runner
EXPOSE 3000