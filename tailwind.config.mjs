/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				dark: "#333",
				accent: "#883aea",
				accentMuted: "#b882f9",
				subtle: "#888",
			}
		},
	},
	plugins: [],
}
