# --- Build Stage ---
FROM node:20-slim AS build
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY .env.production .env

COPY . .
RUN npm run build

# --- Serve Stage ---
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
