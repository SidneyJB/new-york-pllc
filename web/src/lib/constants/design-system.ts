// NY PLLC Formation Service - Design System
// Professional, trustworthy, and visually appealing

export const DESIGN_SYSTEM = {
  // Color Palette - Professional with visual interest
  colors: {
    // Primary Brand Colors
    primary: {
      50: '#f0f9ff',   // Lightest blue
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',  // Main primary - professional blue
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49',
    },

    // Secondary - Warm gray for balance
    secondary: {
      50: '#fafaf9',
      100: '#f5f5f4',
      200: '#e7e5e4',
      300: '#d6d3d1',
      400: '#a8a29e',
      500: '#78716c',  // Main secondary - warm gray
      600: '#57534e',
      700: '#44403c',
      800: '#292524',
      900: '#1c1917',
      950: '#0c0a09',
    },

    // Accent - Teal for professional freshness
    accent: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eead4',
      400: '#2dd4bf',
      500: '#14b8a6',  // Main accent - professional teal
      600: '#0d9488',
      700: '#0f766e',
      800: '#115e59',
      900: '#134e4a',
      950: '#042f2e',
    },

    // Complementary - Warm coral for visual interest
    complementary: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',  // Main complementary - professional coral
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a',
    },

    // Neutrals
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0a0a0a',
    },

    // Status Colors
    success: {
      50: '#f0fdf4',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
    },

    warning: {
      50: '#fffbeb',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
    },

    error: {
      50: '#fef2f2',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
    },
  },

  // Typography Scale
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },

    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
    },

    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },

  // Spacing Scale
  spacing: {
    0: '0px',
    1: '0.25rem',    // 4px
    2: '0.5rem',     // 8px
    3: '0.75rem',    // 12px
    4: '1rem',       // 16px
    5: '1.25rem',    // 20px
    6: '1.5rem',     // 24px
    8: '2rem',       // 32px
    10: '2.5rem',    // 40px
    12: '3rem',      // 48px
    16: '4rem',      // 64px
    20: '5rem',      // 80px
    24: '6rem',      // 96px
    32: '8rem',      // 128px
  },

  // Border Radius
  borderRadius: {
    none: '0px',
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
  },

  // Shadows
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },

  // Breakpoints (for reference)
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const

// Design Tokens for CSS Variables
export const DESIGN_TOKENS = {
  // Primary Colors
  '--color-primary-50': DESIGN_SYSTEM.colors.primary[50],
  '--color-primary-100': DESIGN_SYSTEM.colors.primary[100],
  '--color-primary-200': DESIGN_SYSTEM.colors.primary[200],
  '--color-primary-300': DESIGN_SYSTEM.colors.primary[300],
  '--color-primary-400': DESIGN_SYSTEM.colors.primary[400],
  '--color-primary-500': DESIGN_SYSTEM.colors.primary[500],
  '--color-primary-600': DESIGN_SYSTEM.colors.primary[600],
  '--color-primary-700': DESIGN_SYSTEM.colors.primary[700],
  '--color-primary-800': DESIGN_SYSTEM.colors.primary[800],
  '--color-primary-900': DESIGN_SYSTEM.colors.primary[900],
  '--color-primary-950': DESIGN_SYSTEM.colors.primary[950],

  // Secondary Colors
  '--color-secondary-50': DESIGN_SYSTEM.colors.secondary[50],
  '--color-secondary-100': DESIGN_SYSTEM.colors.secondary[100],
  '--color-secondary-200': DESIGN_SYSTEM.colors.secondary[200],
  '--color-secondary-300': DESIGN_SYSTEM.colors.secondary[300],
  '--color-secondary-400': DESIGN_SYSTEM.colors.secondary[400],
  '--color-secondary-500': DESIGN_SYSTEM.colors.secondary[500],
  '--color-secondary-600': DESIGN_SYSTEM.colors.secondary[600],
  '--color-secondary-700': DESIGN_SYSTEM.colors.secondary[700],
  '--color-secondary-800': DESIGN_SYSTEM.colors.secondary[800],
  '--color-secondary-900': DESIGN_SYSTEM.colors.secondary[900],
  '--color-secondary-950': DESIGN_SYSTEM.colors.secondary[950],

  // Accent Colors
  '--color-accent-50': DESIGN_SYSTEM.colors.accent[50],
  '--color-accent-100': DESIGN_SYSTEM.colors.accent[100],
  '--color-accent-200': DESIGN_SYSTEM.colors.accent[200],
  '--color-accent-300': DESIGN_SYSTEM.colors.accent[300],
  '--color-accent-400': DESIGN_SYSTEM.colors.accent[400],
  '--color-accent-500': DESIGN_SYSTEM.colors.accent[500],
  '--color-accent-600': DESIGN_SYSTEM.colors.accent[600],
  '--color-accent-700': DESIGN_SYSTEM.colors.accent[700],
  '--color-accent-800': DESIGN_SYSTEM.colors.accent[800],
  '--color-accent-900': DESIGN_SYSTEM.colors.accent[900],
  '--color-accent-950': DESIGN_SYSTEM.colors.accent[950],

  // Complementary Colors
  '--color-complementary-50': DESIGN_SYSTEM.colors.complementary[50],
  '--color-complementary-100': DESIGN_SYSTEM.colors.complementary[100],
  '--color-complementary-200': DESIGN_SYSTEM.colors.complementary[200],
  '--color-complementary-300': DESIGN_SYSTEM.colors.complementary[300],
  '--color-complementary-400': DESIGN_SYSTEM.colors.complementary[400],
  '--color-complementary-500': DESIGN_SYSTEM.colors.complementary[500],
  '--color-complementary-600': DESIGN_SYSTEM.colors.complementary[600],
  '--color-complementary-700': DESIGN_SYSTEM.colors.complementary[700],
  '--color-complementary-800': DESIGN_SYSTEM.colors.complementary[800],
  '--color-complementary-900': DESIGN_SYSTEM.colors.complementary[900],
  '--color-complementary-950': DESIGN_SYSTEM.colors.complementary[950],

  // Neutral Colors
  '--color-neutral-50': DESIGN_SYSTEM.colors.neutral[50],
  '--color-neutral-100': DESIGN_SYSTEM.colors.neutral[100],
  '--color-neutral-200': DESIGN_SYSTEM.colors.neutral[200],
  '--color-neutral-300': DESIGN_SYSTEM.colors.neutral[300],
  '--color-neutral-400': DESIGN_SYSTEM.colors.neutral[400],
  '--color-neutral-500': DESIGN_SYSTEM.colors.neutral[500],
  '--color-neutral-600': DESIGN_SYSTEM.colors.neutral[600],
  '--color-neutral-700': DESIGN_SYSTEM.colors.neutral[700],
  '--color-neutral-800': DESIGN_SYSTEM.colors.neutral[800],
  '--color-neutral-900': DESIGN_SYSTEM.colors.neutral[900],
  '--color-neutral-950': DESIGN_SYSTEM.colors.neutral[950],
} as const
