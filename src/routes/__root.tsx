import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { Footer } from "#/components/layout/Footer";
import { Nav } from "#/components/layout/Nav";
import { SITE_URL } from "#/lib/constants";
import appCss from "../styles/app.css?url";

// Organization structured data (schema.org) — no `sameAs` (the social
// links in data/socials.ts are still "#" placeholders; publishing fake
// profile URLs in structured data is worse than omitting the field) and
// no `contactPoint`/email (the email is deliberately not shown anywhere
// on the site — see docs/DECISIONS.md — putting it in JSON-LD would
// undo that).
const organizationSchema = {
	"@context": "https://schema.org",
	"@type": "Organization",
	name: "nomdevs",
	url: SITE_URL,
	logo: `${SITE_URL}/favicon.png`,
	description:
		"nomdevs designs and builds production software for founders and product teams.",
};

export const Route = createRootRoute({
	// Only truly page-independent tags/links live here. Title, description,
	// canonical, and Open Graph are per-route (see lib/seo.ts) — every route
	// calls pageHead() explicitly rather than relying on override/merge
	// semantics for something as important as the title tag.
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
		],
		links: [
			{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
			{ rel: "icon", type: "image/png", href: "/favicon.png" },
			{ rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
			{ rel: "preconnect", href: "https://fonts.googleapis.com" },
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
			},
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
				<script type="application/ld+json">
					{JSON.stringify(organizationSchema)}
				</script>
			</head>
			<body>
				<Nav />
				{children}
				<Footer />
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
