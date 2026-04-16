# ─── Stage 1: 의존성 설치 ─────────────────────────────────────────────────────
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts --only=production

# ─── Stage 2: 빌드 ───────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# 프로덕션 의존성 복사
COPY --from=deps /app/node_modules ./node_modules

# 소스 코드 및 설정 복사
COPY package*.json ./
COPY prisma ./prisma
COPY src ./src
COPY public ./public
COPY tsconfig.json next.config.ts eslint.config.mjs ./

# 개발 의존성 설치 + Prisma 생성 + 빌드
RUN npm ci --ignore-scripts && \
    npx prisma generate && \
    npm run build && \
    npm prune --omit=dev

# ─── Stage 3: 프로덕션 런너 ──────────────────────────────────────────────────
FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

ENV NODE_ENV=production

# 시스템 사용자 생성 (보안)
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# standalone 빌드 파일 복사
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Prisma 클라이언트 복사
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
