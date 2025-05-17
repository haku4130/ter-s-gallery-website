FROM node:24-alpine AS builder

WORKDIR /app

COPY . .

ENV NUXT_PUBLIC_API_BASE=http://backend:8000

RUN npm ci
RUN npm run build

# Этап запуска
FROM node:24-slim

WORKDIR /app

COPY --from=builder /app ./

CMD ["node", ".output/server/index.mjs"]
