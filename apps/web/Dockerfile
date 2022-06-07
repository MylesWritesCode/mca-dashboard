FROM node:16-alpine AS base
RUN apk update && apk add git
WORKDIR /app
RUN yarn global add turbo

FROM base AS prune
WORKDIR /app
COPY . .
RUN turbo prune --scope=web --docker

FROM prune AS build_deps
COPY --from=prune /app/out/json .
COPY --from=prune /app/out/yarn.lock ./yarn.lock
RUN yarn install

FROM prune AS prod_deps
RUN yarn workspaces focus --all --production
RUN yarn workspace web prisma generate

FROM build_deps AS build
WORKDIR /app
COPY --from=prune /app/out/full/ .
RUN turbo run build --scope=web --filter=true --no-deps

FROM node:16-alpine AS deploy

COPY .env .env
ENV NODE_ENV production

RUN addgroup -g 1001 -S nextjs
RUN adduser -S nextjs -u 1001

COPY --from=build --chown=nextjs:nextjs /app/apps/web/.next .next
COPY --from=build --chown=nextjs:nextjs /app/apps/web/public ./public
COPY --from=build --chown=nextjs:nextjs /app/apps/web/package.json ./package.json
COPY --from=prod_deps --chown=nextjs:nextjs /app/node_modules node_modules

USER nextjs
