/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                'login-hotel': "url('/src/assets/images/background.jpeg')",
            },
        },
    },
    plugins: [require('flowbite/plugin')],
};
