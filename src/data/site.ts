// Singular, one-off copy (headlines, section titles) that doesn't vary in
// shape/count the way projects/services/team/stats do. Still lives here,
// not inline in components, per the "never inline content in components"
// rule — src/routes/index.tsx only imports and wires this up.
export const siteContent = {
	seo: {
		title: "nomdevs - Software Engineering for Founders and Product Teams",
		description:
			"nomdevs designs and builds production software for founders and product teams. No hand-offs, no filler.",
	},
	hero: {
		headline: "Software built by engineers who ship.",
		subhead:
			"nomdevs designs and builds production software for founders and product teams. No hand-offs, no filler.",
		// Languages + broad capability areas rather than specific frameworks/
		// vendors, reflecting the actual spread across case studies (web,
		// mobile, cloud, AI) instead of any one stack.
		techStack: [
			"TypeScript",
			"Python",
			"Dart",
			"Cloud Infrastructure",
			"AI Integration",
		],
	},
	featuredWork: {
		eyebrow: "Featured work",
	},
	compare: {
		heading: "Before it's AI-generated. After it's engineer-reviewed.",
		subhead:
			"AI can write code fast. Here's what a senior engineer still checks.",
	},
	work: {
		heading: "Selected work",
	},
	alsoShipped: {
		heading: "Also shipped",
	},
	services: {
		heading: "Services",
	},
	contact: {
		heading: "Have a project in mind?",
	},
} as const;
