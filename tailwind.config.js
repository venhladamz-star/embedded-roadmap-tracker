/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'oc-bg':          '#0D1117',
        'oc-surface':     '#161B22',
        'oc-overlay':     '#1C2128',
        'oc-modal':       '#21262D',
        'oc-border':      '#30363D',
        'oc-border-h':    '#484F58',
        'oc-text':        '#E6EDF3',
        'oc-body':        '#C9D1D9',
        'oc-muted':       '#8B949E',
        'oc-faint':       '#484F58',
        'oc-primary':     '#2F81F7',
        'oc-primary-h':   '#388BFD',
        'oc-link':        '#58A6FF',
        'oc-success':     '#238636',
        'oc-success-fg':  '#3FB950',
        'oc-warning':     '#D29922',
        'oc-error':       '#F85149',
        'oc-accent':      '#F78166',
        'oc-done-bg':     '#0A3622',
        'phase1':         '#2F81F7',
        'phase2':         '#238636',
        'phase3':         '#D29922',
        'phase4':         '#F85149',
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
