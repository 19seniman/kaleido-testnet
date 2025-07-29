import blessed from 'blessed';
import figlet from 'figlet';
import chalk from 'chalk';

export function createUI() {
  const screen = blessed.screen({
    smartCSR: true,
    title: 'Kaleido Testnet',
  });

  const headerText = figlet.textSync('Kaleido Testnet', { font: 'Def Leppard' });
  const header = blessed.box({
    parent: screen,
    top: 0,
    left: 'center',
    width: '100%',
    height: '15%',
    content: chalk.bold.magentaBright(headerText),
    align: 'center',
    valign: 'middle',
  });

  // Panel Daftar Wallet (kiri)
  const walletList = blessed.list({
    parent: screen,
    top: '15%',
    left: 0,
    width: '35%',
    height: '75%',
    label: ' Wallets ',
    items: ['Loading wallets...'],
    keys: true,
    vi: true,
    mouse: true,
    border: { type: 'line' },
    style: {
      border: { fg: 'cyan' },
      selected: { bg: 'blue' },
      label: { fg: 'white', bold: true },
    },
  });

  const statusBox = blessed.box({
    parent: screen,
    top: '15%',
    left: '35%',
    width: '65%',
    height: '25%',
    label: ' Status ',
    content: 'Initializing...',
    padding: 1,
    border: { type: 'line' },
    style: {
      border: { fg: 'yellow' },
      label: { fg: 'white', bold: true },
    },
  });

  // Panel Log (kanan bawah)
  const logBox = blessed.log({
    parent: screen,
    top: '40%',
    left: '35%',
    width: '65%',
    height: '50%',
    label: ' Transaction Logs ',
    keys: true,
    vi: true,
    mouse: true,
    scrollable: true,
    scrollbar: {
      ch: ' ',
      track: { bg: 'blue' },
      style: { inverse: true },
    },
    border: { type: 'line' },
    style: {
      border: { fg: 'green' },
      label: { fg: 'white', bold: true },
    },
  });

  // Footer
  const footer = blessed.box({
    parent: screen,
    bottom: 0,
    width: '100%',
    height: '10%',
    align: 'center',
    valign: 'middle',
    content: `
${chalk.cyan('S')} - Start/Stop  |  ${chalk.cyan('C')} - Clear Logs  |  ${chalk.cyan('R')} - Refresh Wallets  |  ${chalk.cyan('Q')} - Quit
    `,
  });

  // Tutup aplikasi dengan 'q' atau Ctrl+C
  screen.key(['q', 'C-c'], () => process.exit(0));

  screen.render();

  return { screen, walletList, statusBox, logBox };
}
