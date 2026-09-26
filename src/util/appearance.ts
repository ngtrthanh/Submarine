export const DEFAULT_INFO_FONT = 'Consolas, "Courier New", monospace';

export function clampInfoFontSize(value: unknown): number {
  const size = Number(value);
  return Number.isFinite(size) ? Math.min(24, Math.max(10, size)) : 13;
}

export function terminalTheme() {
  if (localStorage.getItem('submarine-theme') === 'light') {
    return {
      background: '#ffffff', foreground: '#18181b', cursor: '#1d4ed8',
      cursorAccent: '#ffffff', selectionBackground: '#bfdbfe',
      black: '#18181b', red: '#b91c1c', green: '#166534', yellow: '#854d0e',
      blue: '#1d4ed8', magenta: '#7e22ce', cyan: '#0e7490', white: '#52525b',
      brightBlack: '#71717a', brightRed: '#dc2626', brightGreen: '#15803d',
      brightYellow: '#a16207', brightBlue: '#2563eb', brightMagenta: '#9333ea',
      brightCyan: '#0891b2', brightWhite: '#27272a',
    };
  }
  return {
    background: '#09090b', foreground: '#e4e4e7', cursor: '#60a5fa',
    cursorAccent: '#000000', selectionBackground: 'rgba(96, 165, 250, 0.3)',
    black: '#2e3436', red: '#cc0000', green: '#4e9a06', yellow: '#c4a000',
    blue: '#3465a4', magenta: '#75507b', cyan: '#06989a', white: '#d3d7cf',
    brightBlack: '#555753', brightRed: '#ef2929', brightGreen: '#8ae234',
    brightYellow: '#fce94f', brightBlue: '#729fcf', brightMagenta: '#ad7fa8',
    brightCyan: '#34e2e2', brightWhite: '#eeeeec',
  };
}
