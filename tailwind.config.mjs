import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Semantic CSS variable-mapped tokens per design review §6.1
        paper: {
          DEFAULT: 'var(--bg-main)',
          card: 'var(--bg-card)',
          muted: 'var(--bg-muted)',
        },
        rule: {
          DEFAULT: 'var(--rule)',
          strong: 'var(--rule-strong)',
        },
        fg: {
          DEFAULT: 'var(--text-primary)',
          body: 'var(--text-body)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        link: 'var(--link)',

        // Retained for palette helpers and compatibility
        parchment: {
          50: '#FDFBF7',
          100: '#FAF7F0',
          150: '#F5F0E6',
          200: '#EFE7DA',
          300: '#E1D7C6',
          400: '#CFC3AE',
        },
        ink: {
          50: '#FAF7F0',
          100: '#F5F0E6',
          200: '#D9DFE5',
          300: '#B8C2CC',
          400: '#8E9AA7',
          500: '#4E5762',
          600: '#383F47',
          700: '#252A30',
          800: '#171A1D',
          900: '#151412',
          950: '#0E1012',
        },
        darkSurface: {
          950: '#11100E',
          900: '#151412',
          850: '#1C1B18',
          800: '#23221E',
          750: '#34322D',
          700: '#4A4740',
          600: '#6B675E',
        },
        forest: {
          50: '#F2F6F3',
          100: '#E1ECE4',
          200: '#C2D8C9',
          500: '#38634D',
          600: '#2A4C3A',
          700: '#1E372A',
          800: '#15251D',
          900: '#0E1A14',
        },
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Charter', 'Georgia', 'serif'],
        sans: ['system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Consolas', 'monospace'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            fontFamily: theme('fontFamily.serif').join(', '),
            fontSize: '1.1875rem',
            lineHeight: '1.62',
            maxWidth: '38rem',
            color: 'var(--text-body)',
            '--tw-prose-body': 'var(--text-body)',
            '--tw-prose-headings': 'var(--text-primary)',
            '--tw-prose-lead': 'var(--text-muted)',
            '--tw-prose-links': 'var(--link)',
            '--tw-prose-bold': 'var(--text-primary)',
            '--tw-prose-counters': 'var(--text-muted)',
            '--tw-prose-bullets': 'var(--text-muted)',
            '--tw-prose-hr': 'var(--rule)',
            '--tw-prose-quotes': 'var(--text-primary)',
            '--tw-prose-quote-borders': 'var(--rule-strong)',
            '--tw-prose-captions': 'var(--text-muted)',
            '--tw-prose-code': 'var(--text-primary)',
            '--tw-prose-pre-code': 'var(--text-primary)',
            '--tw-prose-pre-bg': 'var(--bg-muted)',
            '--tw-prose-th-borders': 'var(--rule)',
            '--tw-prose-td-borders': 'var(--rule)',
            h1: {
              fontWeight: '400',
              fontFamily: theme('fontFamily.serif').join(', '),
              color: 'var(--text-primary)',
              letterSpacing: '-0.015em',
              lineHeight: '1.15',
              marginTop: '1.8em',
              marginBottom: '0.6em',
            },
            h2: {
              fontWeight: '500',
              fontSize: '1.5em',
              lineHeight: '1.2',
              marginTop: '2.2em',
              marginBottom: '0.8em',
              fontFamily: theme('fontFamily.serif').join(', '),
              color: 'var(--text-primary)',
            },
            h3: {
              fontFamily: theme('fontFamily.sans').join(', '),
              fontSize: '.8125rem',
              fontWeight: '600',
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginTop: '2.4em',
              marginBottom: '0.6em',
            },
            blockquote: {
              borderLeft: 'none',
              paddingLeft: 0,
              fontStyle: 'italic',
              fontSize: '1.2em',
              lineHeight: '1.45',
              color: 'var(--text-body)',
            },
            pre: {
              backgroundColor: 'var(--bg-muted)',
              color: 'var(--text-primary)',
              border: '1px solid var(--rule)',
              borderRadius: '2px',
            },
            p: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
            },
            a: {
              color: 'var(--link)',
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
            },
          },
        },
        invert: {
          css: {}, // Variables already flip with .dark - zero duplication needed
        },
      }),
    },
  },
  plugins: [
    typography,
  ],
};
