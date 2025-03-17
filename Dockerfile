# Dùng Nginx làm server
FROM node:18 AS build

WORKDIR /app

# Copy project vào container
COPY . .

# Cài đặt dependencies và build React app
RUN npm install && npm run build

# Dùng Nginx để serve frontend
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
