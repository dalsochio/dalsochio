/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				'acapulco': {
					'50': '#f4f9f7',
					'100': '#dbece5',
					'200': '#b6d9ca',
					'300': '#82baa4',
					'400': '#61a089',
					'500': '#47856f',
					'600': '#376a59',
					'700': '#2f564a',
					'800': '#29463d',
					'900': '#253c35',
					'950': '#11221d',
				},
			}
		},
		fontFamily: {
			'inter': ["'Inter'", "sans-serif"],
			'newsreader': ["'Newsreader'", "serif"]
		},
	},

	plugins: []
};

module.exports = config;
