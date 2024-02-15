# Usa una imagen base que incluya el entorno de ejecución necesario para tu aplicación (por ejemplo, Node.js, Python, etc.)
FROM node:14

# Copia los archivos necesarios de tu aplicación
WORKDIR /app
COPY . .

# Instala las dependencias
RUN npm install

# Expón el puerto en el que tu aplicación escucha
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
