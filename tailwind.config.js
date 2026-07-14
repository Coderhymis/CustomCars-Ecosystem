/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#050508",
          secondary: "#0d0d12",
          card: "rgba(18, 18, 24, 0.75)",
        },
        accent: {
          blue: "#0066ff",
          "blue-hover": "#3385ff",
          red: "#ff3333",
          "red-hover": "#ff5555",
          green: "#10b981",
          yellow: "#f59e0b",
        },
        text: {
          primary: "#ffffff",
          secondary: "#94a3b8",
          muted: "#64748b",
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
      },
      borderRadius: {
        sm: "8px",
        md: "14px",
        lg: "24px",
      }
    },
  },
  plugins: [],
}
