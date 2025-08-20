import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF', // Example custom color
        secondary: '#9333EA',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Example font
      },
    },
  },
  plugins: [
    require("daisyui")
  ],
};

export const daisyui = {
  themes: ["dark"],
};

export default config
