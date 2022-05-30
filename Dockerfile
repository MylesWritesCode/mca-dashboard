FROM node:16-alpine AS base
ENV NODE_ENV development

RUN yarn global add turbo
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
COPY . .
RUN yarn install
EXPOSE $WEB_PORT $API_PORT

CMD ["yarn", "dev"]
