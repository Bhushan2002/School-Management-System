import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        mainElements:"#736f60",
        secondaryElement: "#5c8dc5",
        secondaryText: "#E65447",
        secondGreenElement: "#afbdb0",
        skyLight: "#EDF9FD",
        thirdElement: "#909eae",
        thirdPink: '#Cf5376',
        lamaSkyLight: '#f3f5f7',
        lamaPurpleLight: '#f3f5f7',
        lamaYellowLight: '#f3f5f7',
        forthEle: '#AD9E90'
      },
    },
  },
  plugins: [],
};
export default config;
