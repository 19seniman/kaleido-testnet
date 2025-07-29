import chalk from 'chalk';
import fs from 'fs';

const LOG_FILE = 'activity.log';

try {
  fs.unlinkSync(LOG_FILE);
} catch (error) {
  // Abaikan jika file tidak ada
}

const logStream = fs.createWriteStream(LOG_FILE, { flags: 'a' });

const logLevels = {
  error: { color: chalk.redBright, label: 'ERROR' },
  success: { color: chalk.greenBright, label: 'SUCCESS' },
  start: { color: chalk.magentaBright, label: 'START' },
  wait: { color: chalk.yellowBright, label: 'WAIT' },
  info: { color: chalk.whiteBright, label: 'INFO' },
  delay: { color: chalk.cyanBright, label: 'DELAY' },
  debug: { color: chalk.blueBright, label: 'DEBUG' },
};

function formatMessage(message, type, forFile = false) {
  const timestamp = new Date().toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta' });
  const level = logLevels[type] || { color: chalk.white, label: 'LOG' };
  
  const formatted = `[${timestamp}] [${level.label.padEnd(7)}] ${message}`;

  if (forFile) {
    return `${formatted}\n`;
  }
  
  return level.color(formatted);
}

export default {
  
  log(message, type = 'info', uiCallback, isDebug = false) {
    if (type === 'debug' && !isDebug) return;
    
    logStream.write(formatMessage(message, type, true));

    if (uiCallback) {
      const formattedForUI = formatMessage(message, type, false);
      uiCallback(formattedForUI);
    }
  }
};
