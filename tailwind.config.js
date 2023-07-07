/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    variants: {
        backgroundColor: ["responsive", "hover", "focus", "active"]
    },
    theme: {
        extend: {}
    },
    plugins: []
};
