# Build stage
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies (this will create a new package-lock.json)
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Install envsubst for variable substitution
RUN apk add --no-cache gettext

# Set default BACKEND_URL (can be overridden at runtime)
ENV BACKEND_URL=http://bridgecraft-backend:8080

# Copy built assets from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx configuration template
COPY nginx.conf.template /etc/nginx/conf.d/default.conf.template

# Expose port 80
EXPOSE 80

# Substitute only BACKEND_URL in nginx.conf.template and start nginx
CMD /bin/sh -c 'envsubst '\''$BACKEND_URL'\'' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g "daemon off;"'