export const tokens = {
  colors: {
    canvas: '#F7F5F1',
    surface: '#FFFFFF',
    surfaceSunk: '#F1EEE8',
    ink: '#0B1220',
    ink2: '#33404F',
    muted: '#667485',
    line: '#E4E0D8',
    lineStrong: '#CFC9BE',
    brand900: '#0C2E24',
    brand700: '#12513F',
    brand600: '#176B52',
    brand100: '#E3F0EA',
    ok: '#15803D',
    warn: '#B45309',
    danger: '#B42318',
  },
  shadows: {
    subtle: '0 1px 2px rgba(11,18,32,.04), 0 8px 24px -12px rgba(11,18,32,.10)',
  },
  layout: {
    maxWidth: '1200px',
  },
} as const;

export type ColorToken = keyof typeof tokens.colors;
