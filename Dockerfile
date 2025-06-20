# Etapa de construcción
FROM node:18-alpine AS build

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y lockfile
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código fuente
COPY . .

# Construir la app de producción con Vite
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiar el contenido construido a la raíz pública de nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de Nginx (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
