import { SITE_URL } from "#/lib/constants";

export interface PageHeadOptions {
	title: string;
	description: string;
	/** Root-relative, e.g. "/" or "/nexcall-portal". */
	path: string;
	/** Root-relative or absolute. Defaults to the sitewide OG banner. */
	image?: string;
}

/**
 * Builds the full per-route <head> block: title, meta description, Open
 * Graph, Twitter Card, and canonical link. Every route calls this
 * explicitly with its own values — no shared default that needs
 * overriding, so there's no ambiguity about which route "owns" the title.
 */
export function pageHead({ title, description, path, image }: PageHeadOptions) {
	const url = `${SITE_URL}${path}`;
	const imageUrl = image
		? image.startsWith("http")
			? image
			: `${SITE_URL}${image}`
		: `${SITE_URL}/og-image.png`;

	return {
		meta: [
			{ title },
			{ name: "description", content: description },
			{ property: "og:type", content: "website" },
			{ property: "og:site_name", content: "nomdevs" },
			{ property: "og:title", content: title },
			{ property: "og:description", content: description },
			{ property: "og:url", content: url },
			{ property: "og:image", content: imageUrl },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: title },
			{ name: "twitter:description", content: description },
			{ name: "twitter:image", content: imageUrl },
		],
		links: [{ rel: "canonical", href: url }],
	};
}
