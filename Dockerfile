FROM node:22-bookworm-slim AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts --no-audit --no-fund

FROM dependencies AS builder
COPY . .
ENV WRANGLER_LOG_PATH=.wrangler/wrangler.log
RUN npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
    WRANGLER_LOG_PATH=.wrangler/wrangler.log
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]
