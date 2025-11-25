# Dockerfile
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .


# Accept env variables as a build argument
ARG VITE_ENV_FILE

# Write the env into .env for Vite
RUN echo "$VITE_ENV_FILE" > .env

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
