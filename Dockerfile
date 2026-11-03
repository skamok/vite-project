# Сборка
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Подпуть приложения (например /tanstackstart). Передаётся из Dokploy как Build-time Argument.
ARG BASE_PATH=/
ENV BASE_PATH=$BASE_PATH
RUN npm run build

# Запуск SSR-сервера TanStack Start
FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build /app/dist ./dist
USER node
EXPOSE 3000
# --static считается относительно папки энтри (dist/server), поэтому ../client
CMD ["./node_modules/.bin/srvx", "serve", "--prod", "--entry", "./dist/server/server.js", "--static", "../client"]
