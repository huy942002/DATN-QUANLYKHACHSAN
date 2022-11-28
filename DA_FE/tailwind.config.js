/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                'admin-login-hotel': "url('/src/assets/images/bg.svg')",
            },
        },
    },
    plugins: [require('flowbite/plugin')],
};
