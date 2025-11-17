# ---------- Stage 1: Build ----------
  FROM node:20-alpine AS builder

  RUN apk add --no-cache libc6-compat
  
  WORKDIR /app
  
  COPY package*.json ./
  RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi
  
  COPY . .
  RUN npm run build
  
  # ---------- Stage 2: Runtime ----------
  FROM node:20-alpine
  
  RUN apk add --no-cache libc6-compat
  
  WORKDIR /app
  ENV NODE_ENV=production \
     PORT=8080
  
  COPY package*.json ./
  RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else npm install --only=production; fi
  
  COPY --from=builder /app/dist ./dist

  EXPOSE 8080
  
  # NOTE: your compiled entry is dist/src/main.js
  CMD ["node", "dist/src/main.js"]
  