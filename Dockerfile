FROM node:alpine AS base
RUN apk update && apk add git
WORKDIR /app
RUN yarn global add turbo

FROM base AS prune
WORKDIR /app
COPY . .
RUN turbo prune --scope=web --docker

FROM prune AS install
COPY --from=prune /app/out/json .
COPY --from=prune /app/out/yarn.lock ./yarn.lock
RUN yarn install 

FROM install AS build
WORKDIR /app
COPY .git .git
COPY --from=prune /app/out/full/ .
RUN turbo run build --scope=web --filter=true 

FROM node:alpine AS deploy

ENV NODE_ENV production

RUN addgroup -g 1001 -S nextjs
RUN adduser -S nextjs -u 1001

COPY --from=build /app/apps/web/.next .next
COPY --from=build /app/apps/web/public ./public
COPY --from=build /app/apps/web/package.json ./package.json
COPY --from=install /app/node_modules node_modules

# EXPOSE 3000
# RUN ["yarn", "start"]