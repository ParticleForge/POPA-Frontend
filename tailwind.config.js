/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./node_modules/flowbite/**/*.js"
    ],
    theme: {
        extend: {
            backgroundImage : {
                "hero": "url('assets/background2.png')",
                "marketplace-banner" : "url('/src/market/assets/background.png')",
                "marketplace-background" : "url('/src/market/assets/Marketplace-background.png')"
            }
        },
        fontFamily: {
            'proxima-nova': ['PriximaNova', 'sans-serif'],
            'open-sans': ['Open Sans', 'sans-serif'],
            'lato': ['Lato', 'sans-serif']
        },
        colors: {
            'primary-color2': '#00364A',
            'blue-shade1': '#00C1ED',
            'blue-shade2': '#3464C3',
            'orange-shade1': '#FC4422',
            'yellow-shade1': '#FFBB32',
            'primary-color': '#13A9C0',
            'primary-color-lite': '#f8f7ff',
            'primary-background-color' : '#D0EBEF',
            'marketplace-background-color' : '#000640',
            'aigen-background-color' : '#000640',
            'aigen-background-color-shade-1' : '#404580',
            'aigen-background-color-shade-2' : '#353A6B',
            'marketplace-primary-color-lite' : '#BDC9E0',
            'input-border-primary-color' : '#3B3F6A',
            'aigen-background-color-shade-3': '#151A4E',
            'blue-bikini':'#00C1ED',
            'aigen-background-color-shade-4':'#0F154E'
        }
    },
    plugins: [
        require('flowbite/plugin')
    ],
}
