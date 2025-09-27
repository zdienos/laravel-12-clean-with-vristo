// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/js/**/*.tsx", // Ini akan memindai semua file .tsx di dalam resources/js
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
