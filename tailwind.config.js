/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'oc-bg':          'var(--oc-bg)',
        'oc-surface':     'var(--oc-surface)',
        'oc-overlay':     'var(--oc-overlay)',
        'oc-modal':       'var(--oc-modal)',
        'oc-border':      'var(--oc-border)',
        'oc-border-h':    'var(--oc-border-h)',
        'oc-text':        'var(--oc-text)',
        'oc-body':        'var(--oc-body)',
        'oc-muted':       'var(--oc-muted)',
        'oc-faint':       'var(--oc-faint)',
        'oc-primary':     'var(--oc-primary)',
        'oc-primary-h':   'var(--oc-primary-h)',
        'oc-link':        'var(--oc-link)',
        'oc-success':     'var(--oc-success)',
        'oc-success-fg':  'var(--oc-success-fg)',
        'oc-warning':     'var(--oc-warning)',
        'oc-error':       'var(--oc-error)',
        'oc-accent':      'var(--oc-accent)',
        'oc-done-bg':     'var(--oc-done-bg)',
        'oc-done-text':   'var(--oc-done-text)',
        'phase1':         'var(--phase1)',
        'phase2':         'var(--phase2)',
        'phase3':         'var(--phase3)',
        'phase4':         'var(--phase4)',
      },
      fontFamily: {
        'ui':   ['Inter', 'sans-serif'],
        'code': ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        'sm': '3px',
        DEFAULT: '6px',
        'lg': '12px',
        'full': '9999px',
      },
    },
  },
  plugins: [],
}
