import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const config = defineConfig({
	resolve: { tsconfigPaths: true },
	plugins: [
		devtools(),
		tailwindcss(),
		tanstackStart({
			// Static site: no server functions, no API routes. Prerender every
			// route to plain HTML at build time so the deployed output is just
			// static files (Cloudflare Pages), and crawl in-page links so new
			// routes stay covered automatically as the site grows.
			prerender: { enabled: true, crawlLinks: true },
		}),
		viteReact(),
	],
});

export default config;
