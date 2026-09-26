import colors from 'tailwindcss/colors.js';
import plugin from 'tailwindcss/plugin.js';

// Keep existing utility classes and their alpha/hover variants. Only their
// RGB tokens change with the selected theme; no filter is applied to content.
const families = ['zinc', 'slate', 'amber', 'emerald', 'fuchsia', 'indigo',
  'orange', 'red', 'rose', 'sky', 'violet'];
const rgb = hex => hex.match(/[a-f\d]{2}/gi).map(v => parseInt(v, 16)).join(' ');
const themedColors = {};
const dark = { '--ui-white': '255 255 255', '--ui-black': '0 0 0' };
const light = { '--ui-white': '24 24 27', '--ui-black': '255 255 255' };
const opposite = { 50: 950, 100: 900, 200: 800, 300: 700, 400: 600,
  500: 500, 600: 400, 700: 300, 800: 200, 900: 100, 950: 50 };
for (const family of families) {
  themedColors[family] = {};
  for (const [shade, hex] of Object.entries(colors[family])) {
    const token = `--ui-${family}-${shade}`;
    themedColors[family][shade] = `rgb(var(${token}) / <alpha-value>)`;
    dark[token] = rgb(hex);
    light[token] = rgb(colors[family][opposite[shade]]);
  }
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ...themedColors,
        white: 'rgb(var(--ui-white) / <alpha-value>)',
        black: 'rgb(var(--ui-black) / <alpha-value>)',
        background: "var(--background)",
        surface: "var(--surface, #09090b)",
        panel: "var(--panel, #121214)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        border: "var(--border)",    
        muted: "rgb(var(--ui-zinc-400) / <alpha-value>)",
      }
    },
  },
  plugins: [plugin(({ addBase, e }) => {
    const selectors = {};
    // Legacy arbitrary dark surfaces, including hover and opacity variants.
    // These are all the literal background colors in the current frontend.
    for (const hex of ['09090b', '0a0a0c', '0a0a0d', '0c0c0e', '0d0d10',
      '0e0e10', '0f0f12', '111114', '121214', '121215', '141418', '15151a',
      '161619', '16161a', '1a1a1e', '1c1c21', '232328']) {
      const value = parseInt(hex.slice(0, 2), 16) < 16 ? '#ffffff' : '#f4f4f5';
      selectors[`:root[data-theme="light"] .${e(`bg-[#${hex}]`)}`] = { backgroundColor: value };
      selectors[`:root[data-theme="light"] .${e(`hover:bg-[#${hex}]`)}:hover`] = { backgroundColor: '#e4e4e7' };
      for (const opacity of [50, 95]) {
        selectors[`:root[data-theme="light"] .${e(`bg-[#${hex}]/${opacity}`)}`] = {
          backgroundColor: `rgb(${rgb(value)} / ${opacity / 100})`,
        };
      }
    }
    // Dim dark-mode text also needs sufficient contrast on a light surface.
    for (const shade of [500, 600, 700]) {
      selectors[`:root[data-theme="light"] .text-zinc-${shade}`] = { color: colors.zinc[600] };
    }
    addBase({
      ':root': dark,
      ':root[data-theme="light"]': { ...light, '--surface': '#ffffff', '--panel': '#f4f4f5' },
      ...selectors,
    });
  })],
}
