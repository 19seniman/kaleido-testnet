// logger.js
import chalk from 'chalk';
import fs from 'fs';

// Nama file untuk menyimpan log
const LOG_FILE = 'activity.log';

// Hapus file log lama saat aplikasi dimulai agar log selalu baru
try {
  fs.unlinkSync(LOG_FILE);
} catch (error) {
  // Abaikan jika file tidak ada
}

// Stream untuk menulis log ke file secara efisien
const logStream = fs.createWriteStream(LOG_FILE, { flags: 'a' });

// Definisikan warna untuk setiap level log agar konsisten
const logLevels = {
  error: { color: chalk.redBright, label: 'ERROR' },
  success: { color: chalk.greenBright, label: 'SUCCESS' },
  start: { color: chalk.magentaBright, label: 'START' },
  wait: { color: chalk.yellowBright, label: 'WAIT' },
  info: { color: chalk.whiteBright, label: 'INFO' },
  delay: { color: chalk.cyanBright, label: 'DELAY' },
  debug: { color: chalk.blueBright, label: 'DEBUG' },
};

/**
 * Memformat pesan log untuk ditampilkan di UI dan disimpan di file.
 * @param {string} message - Pesan log.
 * @param {string} type - Tipe log ('info', 'error', dll.).
 * @param {boolean} forFile - Jika true, format tanpa warna untuk file.
 * @returns {string} - Pesan yang sudah diformat.
 */
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
  /**
   * Fungsi utama untuk mencatat log.
   * @param {string} message - Pesan log.
   * @param {string} type - Tipe log.
   * @param {function} uiCallback - Callback untuk mengirim pesan terformat ke UI.
   * @param {boolean} isDebug - Opsi untuk hanya mencatat jika mode debug aktif.
   */
  log(message, type = 'info', uiCallback, isDebug = false) {
    if (type === 'debug' && !isDebug) return;
    
    // Tulis log tanpa warna ke file
    logStream.write(formatMessage(message, type, true));

    // Jika ada callback UI, kirim pesan berwarna ke sana
    if (uiCallback) {
      const formattedForUI = formatMessage(message, type, false);
      uiCallback(formattedForUI);
    }
  }
};
