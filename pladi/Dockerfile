# Usa una imagen base que incluya el entorno de ejecución necesario para tu aplicación (por ejemplo, Node.js)
FROM node:14

# Copia los archivos necesarios de tu aplicación
WORKDIR /app
COPY . .

# Instala las dependencias
RUN npm install

# Expón el puerto en el que tu aplicación frontend se ejecuta
EXPOSE 80

# Comando para ejecutar la aplicación
CMD ["sh", "-c", "while ! nc -z backend 3000; do sleep 1; done; npm start"]
