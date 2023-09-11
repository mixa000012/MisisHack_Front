/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
		colors: {
			background: "#151618",
			sbackground: "#2E2F31",
			main: "#A470E5",
			secondary1: "#6A96ED",
			secondary2: "#80E1CA",
			binactive: "#FFFFFF",
			bhover: "linear-gradient(90deg, #A470E5 0%, #6A96ED 50.52%, #80E1CA 100%)",
			bpress: "#A470E5",
			text_main: "#E2E2E2",
			text_description: "#858585",
			text_main2: "#2E2F31",
		}
	},
	plugins: [],
}
