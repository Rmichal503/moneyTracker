/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    transparent: "transparent",
    current: "currentColor",
    extend: {
      colors: {
        // light mode
        tremor: {
          brand: {
            faint: "#a5daf3", // blue-50
            muted: "#a5daf3", // blue-200
            subtle: "#4bb5e7", // blue-400
            DEFAULT: "#10587a", // blue-500
            emphasis: "#1882b4", // blue-700
            inverted: "#ffffff", // white
          },
          background: {
            muted: "#d2edf9", // gray-50
            subtle: "#e7daf1", // gray-100
            DEFAULT: "#e9f6fc", // white
            emphasis: "#512970", // gray-700
          },
          border: {
            DEFAULT: "#d2edf9", // gray-200
          },
          ring: {
            DEFAULT: "#d2edf9", // gray-200
          },
          content: {
            subtle: "#49c9e9", // gray-400
            DEFAULT: "#052229", // gray-500
            emphasis: "#117088", // gray-700
            strong: "#06252d", // gray-900
            inverted: "#ffffff", // white
          },
        },
        // dark mode
        "dark-tremor": {
          brand: {
            faint: "#871237", // custom
            muted: "#e21d5c", // blue-950
            subtle: "#871237", // blue-800
            DEFAULT: "#5a0c25", // blue-500
            emphasis: "#2d0612", // blue-400
            inverted: "#e8f6fc", // gray-950
          },
          background: {
            muted: "#2d0612", // custom
            subtle: "#0c415a", // gray-800
            DEFAULT: "#031016", // gray-900
            emphasis: "#78c8ed", // gray-300
          },
          border: {
            DEFAULT: "#06212d", // gray-800
          },
          ring: {
            DEFAULT: "#06212d", // gray-800
          },
          content: {
            subtle: "#1cbbe3", // gray-600
            DEFAULT: "#d6f3fa", // gray-500
            emphasis: "#a4e4f4", // gray-200
            strong: "#e8f8fc", // gray-50
            inverted: "#000000", // black
          },
        },
      },
      boxShadow: {
        // light
        "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        // dark
        "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "dark-tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "dark-tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      borderRadius: {
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      fontSize: {
        "tremor-label": ["0.75rem"],
        "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
      },
      screens: {
        xs: "400px",
      },
      dropShadow: {
        darkSelectColor: "0 4px 3px rgba(232,246,252, 0.1)",
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [require("@headlessui/tailwindcss")],
};

// colors: {
//   // light mode
//   tremor: {
//     brand: {
//       faint: "#eff6ff", // blue-50
//       muted: "#bfdbfe", // blue-200
//       subtle: "#60a5fa", // blue-400
//       DEFAULT: "#3b82f6", // blue-500
//       emphasis: "#1d4ed8", // blue-700
//       inverted: "#ffffff", // white
//     },
//     background: {
//       muted: "#f9fafb", // gray-50
//       subtle: "#f3f4f6", // gray-100
//       DEFAULT: "#ffffff", // white
//       emphasis: "#374151", // gray-700
//     },
//     border: {
//       DEFAULT: "#e5e7eb", // gray-200
//     },
//     ring: {
//       DEFAULT: "#e5e7eb", // gray-200
//     },
//     content: {
//       subtle: "#9ca3af", // gray-400
//       DEFAULT: "#6b7280", // gray-500
//       emphasis: "#374151", // gray-700
//       strong: "#111827", // gray-900
//       inverted: "#ffffff", // white
//     },
//   },
//   // dark mode
//   "dark-tremor": {
//     brand: {
//       faint: "#0B1229", // custom
//       muted: "#172554", // blue-950
//       subtle: "#1e40af", // blue-800
//       DEFAULT: "#3b82f6", // blue-500
//       emphasis: "#60a5fa", // blue-400
//       inverted: "#030712", // gray-950
//     },
//     background: {
//       muted: "#131A2B", // custom
//       subtle: "#1f2937", // gray-800
//       DEFAULT: "#111827", // gray-900
//       emphasis: "#d1d5db", // gray-300
//     },
//     border: {
//       DEFAULT: "#1f2937", // gray-800
//     },
//     ring: {
//       DEFAULT: "#1f2937", // gray-800
//     },
//     content: {
//       subtle: "#4b5563", // gray-600
//       DEFAULT: "#6b7280", // gray-500
//       emphasis: "#e5e7eb", // gray-200
//       strong: "#f9fafb", // gray-50
//       inverted: "#000000", // black
//     },
//   },
// },
