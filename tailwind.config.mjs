import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
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
      },
      fontFamily: {
        serif: ['"Source Serif 4"', '"Source Serif 4 Fallback"', 'Georgia', 'serif'],
        sans: ['system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
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
            '--tw-prose-lead': 'var(--text-secondary)',
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
      }),
    },
  },
  plugins: [
    typography,
  ],
};
