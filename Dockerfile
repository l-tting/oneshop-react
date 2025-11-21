# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy everything else
COPY . .

# Build-time environment variables
ARG VITE_LOGIN_URL
ARG VITE_COMPANY_URL
ARG VITE_RESETPASS_URL

# Make sure Vite uses them
ENV VITE_LOGIN_URL=$VITE_LOGIN_URL
ENV VITE_COMPANY_URL=$VITE_COMPANY_URL
ENV VITE_RESETPASS_URL=$VITE_RESETPASS_URL

# Build React app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy build files
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config if any
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
