const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					"primary": "#54BD9A",
					"secondary": "#fde047",
					"accent": "#06b6d4",
					"neutral": "#414558",
					"base-100": "#272935",
					"info": "#8BE8FD",
					"success": "#52FA7C",
					"warning": "#F1FA89",
					"error": "#FF5757",
				},
			},
		],
	},

	plugins: [forms, typography, require('daisyui')]
};

module.exports = config;
