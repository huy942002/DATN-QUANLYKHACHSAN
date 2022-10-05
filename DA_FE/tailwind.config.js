/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                'login-hotel': "url('/src/assets/images/background.jpeg')",
            },
        },
    },
    plugins: [],
};
