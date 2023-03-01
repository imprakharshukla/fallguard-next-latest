/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Outfit", "ui-sans-serif"],
            },
            colors: {
                primary: {
                    50: "#f2f8ff",
                    100: "#e6f1ff",
                    200: "#c8e1ff",
                    300: "#a9d1ff",
                    400: "#7dbbff",
                    500: "#4fa1ff",
                    600: "#2680fc",
                    700: "#1662db",
                    800: "#114ebe",
                    900: "#0b366b",
                },
                secondary: {
                    50: "#f8f8f8",
                    100: "#f1f1f1",
                    200: "#e1e1e1",
                    300: "#d1d1d1",
                    400: "#bbbbbb",
                    500: "#a1a1a1",
                    600: "#808080",
                    700: "#626262",
                    800: "#4e4e4e",
                    900: "#363636",
                },
                accent: {
                    50: "#fff8f2",
                    100: "#fff1e6",
                    200: "#ffe1c8",
                    300: "#ffd1a9",
                    400: "#ffbb7d",
                    500: "#ffa14f",
                    600: "#fc8026",
                    700: "#db6616",
                    800: "#be4e11",
                    900: "#6b300b",
                },
                success: {
                    50: "#f2fff8",
                    100: "#e6fff1",
                    200: "#c8ffe1",
                    300: "#a9ffd1",
                    400: "#7dffbb",
                    500: "#4fffa1",
                    600: "#26fc80",
                    700: "#16db66",
                    800: "#11be4e",
                    900: "#0b6b30",
                },
            }
        }
    },
    plugins:[
    require('prettier-plugin-tailwindcss'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
],
    darkMode:"class",
}
