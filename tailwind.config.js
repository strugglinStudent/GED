const path = require('path');
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');
const generatePalette = require(path.resolve(__dirname, ('src/app/shared/tailwind/utils/generate-palette')));

/**
 * Custom palettes
 *
 * Uses the generatePalette helper method to generate
 * Tailwind-like color palettes automatically
 */
const customPalettes = {
    gedPrimary: generatePalette('#3e4e88'),
    gedSecondary: generatePalette('#ddf3ff'),
    gedThird: generatePalette('#ddf3ff'),
    gedWhiteSecondary: generatePalette('#F6F6FB'),
    gedOrange: generatePalette('#20308e'),
    gedRed: generatePalette('#E2063B'),
    gedPurple: generatePalette('#75287A'),
    gedGrey: generatePalette('#DEDDEE'),
    gedGreyDark: generatePalette('#F9F8F7'),
    gedTW: generatePalette('#2D9BF0'),
    gedFB: generatePalette('#3567CB'),
    gedGoogle: generatePalette('#455898'),
    gedWhite: generatePalette('#ddf3ff'),
    gedScrollBar: generatePalette('#808080'),
    gedScrollBarHover : generatePalette('#A9A9A9'),
};

/**
 * Themes
 */
const themes = {
  // Default theme is required for theming system to work correctly!
  'default': {
    primary  : {
      ...colors.indigo,
      DEFAULT: colors.indigo[600]
    },
    accent   : {
      ...colors.slate,
      DEFAULT: colors.slate[800]
    },
    warn     : {
      ...colors.red,
      DEFAULT: colors.red[600]
    },
    'on-warn': {
      500: colors.red['50']
    }
  },
  // Rest of the themes will use the 'default' as the base
  // theme and will extend it with their given configuration.
   'ged' : {
    primary: customPalettes.gedPrimary,

    accent   : customPalettes.gedSecondary,
    warn     : {
      ...colors.red,
      DEFAULT: colors.red[600]
    },
    secondary     : customPalettes.gedSecondary,
    third     : customPalettes.gedThird,
    whiteSecondary     : customPalettes.gedWhiteSecondary,
    orange     : customPalettes.gedOrange,
    purple     : customPalettes.gedPurple,
    red     : customPalettes.gedRed,
    grey     : customPalettes.gedGrey,
    greyDark     : customPalettes.gedGreyDark,
    twitter     : customPalettes.gedTW,
    facebook     : customPalettes.gedFB,
    google     : customPalettes.gedGoogle,
    white     : customPalettes.gedWhite,
    scrollBar     : customPalettes.gedScrollBar,
    scrollBarHover     : customPalettes.gedScrollBarHover ,
    'on-warn': {
      500: colors.red['50']
    }
  },
};

/**
 * Tailwind configuration
 */
const config = {
  darkMode   : 'class',
  content    : ['./src/**/*.{html,scss,ts}'],
  important  : true,
  theme      : {
    fontSize: {
      'xs'  : '0.625rem',
      'sm'  : '0.75rem',
      'md'  : '0.8125rem',
      'base': '0.875rem',
      'lg'  : '1rem',
      'xl'  : '1.125rem',
      '2xl' : '1.25rem',
      '3xl' : '1.5rem',
      '4xl' : '2rem',
      '5xl' : '2.25rem',
      '6xl' : '2.5rem',
      '7xl' : '3rem',
      '8xl' : '4rem',
      '9xl' : '6rem',
      '10xl': '8rem'
    },
    screens : {
      sm: '600px',
      md: '960px',
      lg: '1280px',
      xl: '1440px'
    },
    extend  : {
      animation               : {
        'spin-slow': 'spin 3s linear infinite'
      },
      colors                  : {
        gray: colors.slate
      },
      flex                    : {
        '0': '0 0 auto'
      },
      fontFamily              : {
        sans: `"Inter var", ${defaultTheme.fontFamily.sans.join(',')}`,
        mono: `"IBM Plex Mono", ${defaultTheme.fontFamily.mono.join(',')}`
      },
      opacity                 : {
        12: '0.12',
        38: '0.38',
        87: '0.87'
      },
      rotate                  : {
        '-270': '270deg',
        '15'  : '15deg',
        '30'  : '30deg',
        '60'  : '60deg',
        '270' : '270deg'
      },
      scale                   : {
        '-1': '-1'
      },
      zIndex                  : {
        '-1'   : -1,
        '49'   : 49,
        '60'   : 60,
        '70'   : 70,
        '80'   : 80,
        '90'   : 90,
        '99'   : 99,
        '999'  : 999,
        '9999' : 9999,
        '99999': 99999
      },
      spacing                 : {
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '50': '12.5rem',
        '90': '22.5rem',

        // Bigger values
        '100': '25rem',
        '120': '30rem',
        '128': '32rem',
        '140': '35rem',
        '160': '40rem',
        '180': '45rem',
        '192': '48rem',
        '200': '50rem',
        '240': '60rem',
        '256': '64rem',
        '280': '70rem',
        '320': '80rem',
        '360': '90rem',
        '400': '100rem',
        '480': '120rem',

        // Fractional values
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%'
      },
      minHeight               : ({theme}) => ({
        ...theme('spacing')
      }),
      maxHeight               : {
        none: 'none'
      },
      minWidth                : ({theme}) => ({
        ...theme('spacing'),
        screen: '100vw'
      }),
      maxWidth                : ({theme}) => ({
        ...theme('spacing'),
        screen: '100vw'
      }),
      transitionDuration      : {
        '400': '400ms'
      },
      transitionTimingFunction: {
        'drawer': 'cubic-bezier(0.25, 0.8, 0.25, 1)'
      },

      // @tailwindcss/typography
      typography: ({theme}) => ({
        DEFAULT: {
          css: {
            color              : 'var(--ged-text-default)',
            '[class~="lead"]'  : {
              color: 'var(--ged-text-secondary)'
            },
            a                  : {
              color: 'var(--ged-primary-500)'
            },
            strong             : {
              color: 'var(--ged-text-default)'
            },
            'ol > li::before'  : {
              color: 'var(--ged-text-secondary)'
            },
            'ul > li::before'  : {
              backgroundColor: 'var(--ged-text-hint)'
            },
            hr                 : {
              borderColor: 'var(--ged-border)'
            },
            blockquote         : {
              color          : 'var(--ged-text-default)',
              borderLeftColor: 'var(--ged-border)'
            },
            h1                 : {
              color: 'var(--ged-text-default)'
            },
            h2                 : {
              color: 'var(--ged-text-default)'
            },
            h3                 : {
              color: 'var(--ged-text-default)'
            },
            h4                 : {
              color: 'var(--ged-text-default)'
            },
            'figure figcaption': {
              color: 'var(--ged-text-secondary)'
            },
            code               : {
              color     : 'var(--ged-text-default)',
              fontWeight: '500'
            },
            'a code'           : {
              color: 'var(--ged-primary)'
            },
            pre                : {
              color          : theme('colors.white'),
              backgroundColor: theme('colors.gray.800')
            },
            thead              : {
              color            : 'var(--ged-text-default)',
              borderBottomColor: 'var(--ged-border)'
            },
            'tbody tr'         : {
              borderBottomColor: 'var(--ged-border)'
            },
            'ol[type="A" s]'   : false,
            'ol[type="a" s]'   : false,
            'ol[type="I" s]'   : false,
            'ol[type="i" s]'   : false
          }
        },
        sm     : {
          css: {
            code : {
              fontSize: '1em'
            },
            pre  : {
              fontSize: '1em'
            },
            table: {
              fontSize: '1em'
            }
          }
        }
      })
    }
  },
  corePlugins: {
    appearance        : false,
    container         : false,
    float             : false,
    clear             : false,
    placeholderColor  : false,
    placeholderOpacity: false,
    verticalAlign     : false
  },
  plugins    : [

    // GED - Tailwind plugins
    require(path.resolve(__dirname, ('src/app/shared/tailwind/plugins/utilities'))),
    require(path.resolve(__dirname, ('src/app/shared/tailwind/plugins/icon-size'))),
    require(path.resolve(__dirname, ('src/app/shared/tailwind/plugins/theming')))({themes}),

    // Other third party and/or custom plugins
    require('@tailwindcss/typography')({modifiers: ['sm', 'lg']}),
  ]
};

module.exports = config;
