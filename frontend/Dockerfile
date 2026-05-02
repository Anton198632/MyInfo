# 1. Используем Node.js для сборки
FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile --force

COPY . ./
RUN npm run build

# 2. Используем Nginx для сервировки статики
FROM nginx:1.23

# Копируем собранные файлы React в Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Копируем наш конфиг Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY public/favicon.ico /usr/share/nginx/html/static/favicon.ico

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]