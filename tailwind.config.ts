import type { Config } from "tailwindcss";

// Note: With Tailwind CSS v4, most configuration is done in CSS via @theme.
// This file is kept for plugin compatibility only.
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
