# Dockerfile for React + Vite + pnpm (Development)
FROM node:22.16.0-alpine AS builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN apk update
RUN apk add --no-cache libc6-compat

RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY . .

RUN pnpm install --frozen-lockfile
RUN pnpm build

# -- Development stage --
FROM builder AS development
EXPOSE 5173
CMD ["pnpm", "dev", "--host", "0.0.0.0"]

# -- Production stage --
FROM nginx:1.25-alpine AS production

RUN apk update
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache openssl

# Copy build files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config (optional, see below)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
    
CMD ["nginx", "-g", "daemon off;"]
