import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/_docs/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      opacity: {
        disabled: '0.4',
        loading: '0.2',
      },
      scale: {
        85: '0.85',
        250: '2.5',
      },
      blur: {
        '2xs': '1px',
        xs: '2px',
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      lime: {
        100: '#EEFBDA',
        200: '#D3F1A7',
        300: '#B3DF72',
        400: '#94C748',
        500: '#82B536',
        600: '#6A9A23',
        700: '#5B7F24',
        800: '#4C6B1F',
        900: '#37471F',
        1000: '#2A3818',
      },
      red: {
        100: '#FFEDEB',
        200: '#FFD2CC',
        300: '#FF9C8F',
        400: '#F87462',
        500: '#EF5C48',
        600: '#E34935',
        700: '#CA3521',
        800: '#AE2A19',
        900: '#601E16',
        1000: '#4F1C16',
      },
      orange: {
        100: '#FFF4E5',
        200: '#FFE2BD',
        300: '#FEC57B',
        400: '#FAA53D',
        500: '#F18D13',
        600: '#D97008',
        700: '#B65C02',
        800: '#974F0C',
        900: '#4A2B0F',
        1000: '#4A2B0F',
      },
      yellow: {
        100: '#FFF7D6',
        200: '#F8E6A0',
        300: '#F5CD47',
        400: '#E2B203',
        500: '#CF9F02',
        600: '#B38600',
        700: '#946F00',
        800: '#7F5F01',
        900: '#533F04',
        1000: '#3F3102',
      },
      green: {
        100: '#DFFCF0',
        200: '#BAF3DB',
        300: '#7EE2B8',
        400: '#4BCE97',
        500: '#2ABB7F',
        600: '#22A06B',
        700: '#1F845A',
        800: '#216E4E',
        900: '#164B35',
        1000: '#143C2B',
      },
      teal: {
        100: '#E3FAFC',
        200: '#C1F0F5',
        300: '#8BDBE5',
        400: '#60C6D2',
        500: '#37B4C3',
        600: '#1D9AAA',
        700: '#1D7F8C',
        800: '#206B74',
        900: '#1D474C',
        1000: '#15373B',
      },
      blue: {
        100: '#E9F2FF',
        200: '#CCE0FF',
        300: '#85B8FF',
        400: '#579DFF',
        500: '#388BFF',
        600: '#1D7AFC',
        700: '#0C66E4',
        800: '#0055CC',
        900: '#09326C',
        1000: '#092957',
      },
      purple: {
        100: '#F3F0FF',
        200: '#DFD8FD',
        300: '#B8ACF6',
        400: '#9F8FEF',
        500: '#8F7EE7',
        600: '#8270DB',
        700: '#6E5DC6',
        800: '#5E4DB2',
        900: '#352C63',
        1000: '#2B2451',
      },
      magenta: {
        100: '#FFECF8',
        200: '#FDD0EC',
        300: '#F797D2',
        400: '#E774BB',
        500: '#DA62AC',
        600: '#CD519D',
        700: '#AE4787',
        800: '#943D73',
        900: '#50253F',
        1000: '#421F34',
      },
      neutral: {
        0: '#FFFFFF',
        100: '#F7F8F9',
        200: '#F1F2F4',
        300: '#DCDFE4',
        400: '#B3B9C4',
        500: '#8590A2',
        600: '#758195',
        700: '#626F86',
        800: '#44546F',
        900: '#2C3E5D',
        1000: '#172B4D',
        1100: '#091E42',
      },
      'dark-neutral': {
        0: '#161A1D',
        100: '#1D2125',
        200: '#22272B',
        250: '#282E33',
        300: '#2C333A',
        350: '#38414A',
        400: '#454F59',
        500: '#596773',
        600: '#738496',
        700: '#8C9BAB',
        800: '#9FADBC',
        900: '#B6C2CF',
        1000: '#C7D1DB',
        1100: '#DEE4EA',
      }
    },
    screens: {
      xs: '30rem',
      sm: '40rem',
      md: '48rem',
      lg: '64rem',
      xl: '80rem',
      '2xl': '90rem',
    },
    spacing: {
      0: '0',
      0.25: '0.0625rem',
      0.5: '0.125rem',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      28: '7rem',
      32: '8rem',
    },
    fontFamily: {
      'sans': 'var(--font-inter)',
      'mono': ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Consolas', 'Liberation Mono', 'Menlo', 'monospace'],
    },
    fontSize: {
      75: '0.75rem',
      100: '0.875rem',
      200: '1rem',
      300: '1.25rem',
      400: '1.5rem',
      500: '1.75rem',
      600: '2rem',
      700: '2.5rem',
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      1: '1rem',
      2: '1.25rem',
      3: '1.5rem',
      4: '1.75rem',
      5: '2rem',
      6: '2.5rem',
      7: '3rem',
      'none': '1',
    },
    borderRadius: {
      0.5: '0.125rem',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.875rem',
      none: '0',
      full: '624.9375rem',
    },
    borderWidth: {
      1: '0.0625rem',
      2: '0.125rem',
      3: '0.1875rem',
      4: '0.25rem',
      5: '0.3125rem',
    },
    zIndex: {
      0: '0',
      100: '100',
      200: '200',
      300: '300',
      400: '400',
      500: '500',
      600: '600',
      700: '700',
      auto: 'auto',
    },
    transitionTimingFunction: {
      linear: 'cubic-bezier(0, 0, 1, 1)',
      ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      'ease-in-out': 'cubic-bezier(0.42, 0, 0.58, 1)',
      'ease-out': 'cubic-bezier(0, 0, 0.58, 1)',
      'ease-in': 'cubic-bezier(0.42, 0, 1, 1)',
    },
    transitionDuration: {
      0: '0ms',
      50: '50ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      250: '250ms',
      300: '300ms',
      350: '350ms',
      400: '400ms',
      450: '450ms',
      500: '500ms',
      1000: '1000ms',
      5000: '5000ms',
    },
    boxShadow: {
      none: 'none',
      xs: '0rem 0rem 0.125rem rgbargb(29, 33, 37, 0.24)',
      sm: '0rem 0.0625rem 0.0625rem rgba(29, 33, 37, 0.1)',
      md: '0rem 0.125rem 0.25rem rgba(29, 33, 37, 0.1), 0rem 0.0625rem 0.375rem rgba(29, 33, 37, 0.05)',
      lg: '0rem 0.25rem 0.75rem rgba(29, 33, 37, 0.2), 0rem 0.125rem 0.375rem rgba(29, 33, 37, 0.05)',
      xl: '0rem 0.25rem 1.125rem -0.125rem rgba(29, 33, 37, 0.08), 0rem 0.75rem 1.125rem -0.125rem rgba(29, 33, 37, 0.15)',
      '2xl': '',
      'inset-sm': 'inset 0rem 0rem 0.1875rem rgba(29, 33, 37, 0.56)',
      'inset-md': 'inset 0rem 0.125rem 0.25rem rgba(29, 33, 37, 0.32)',
      'inset-lg': 'inset 0rem 0rem 0.4375rem 0.125rem rgba(29, 33, 37, 0.18)',
    },
    animation: {
      none: 'none',
      spin: 'spin 0.85s cubic-bezier(0.4, 0.15, 0.6, 0.85) infinite normal',
      pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      bounce: 'bounce 1s infinite',
      'fade-in': 'fade-in 1s ease',
      'appear-above': 'appear-above 1s ease',
      'appear-below': 'appear-below 1s ease',
    },
    keyframes: ({ theme }) => ({
      bounce: {
        '65%, 85%': { transform: `scale(${theme('scale.100')})` },
        '75%': { transform: `scale(${theme('scale.85')})` },
        '82.5%': { transform: `scale(${theme('scale.105')})` }
      },
      pulse: {
        '0%, 75%': {
          transform: `scale(${theme('scale.85')})`,
          opacity: theme('opacity.100'),
        },
        '100%': {
          transform: `scale(${theme('scale.250')})`,
          opacity: theme('opacity.0'),
        }
      },
      spin: {
        '100%': { transform: 'rotate(1turn)' },
      },
      'fade-in': {
        '0%': { opacity: theme('opacity.0') },
        '100%': { opacity: theme('opacity.100') },
      },
      'appear-above': {
        '0%': {
          transform: `translateY(${theme('spacing.1')})`,
          opacity: theme('opacity.0'),
        },
        '100%': {
          transform: 'none',
          opacity: theme('opacity.100'),
        }
      },
      'appear-below': {
        '0%': {
          transform: `translateY(calc(${theme('spacing.1')} * -1))`,
          opacity: theme('opacity.0'),
        },
        '100%': {
          transform: 'none',
          opacity: theme('opacity.100'),
        }
      },
    }),
  },
  plugins: [],
}
export default config;
