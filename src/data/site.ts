// Singular, one-off copy (headlines, section titles) that doesn't vary in
// shape/count the way projects/services/team/stats do. Still lives here,
// not inline in components, per the "never inline content in components"
// rule — src/routes/index.tsx only imports and wires this up.
export const siteContent = {
	hero: {
		headline: "Software built by engineers who ship.",
		subhead:
			"nomdevs designs and builds production software for founders and product teams. No hand-offs, no filler.",
		techStack: ["TypeScript", "React", "Node.js", "PostgreSQL", "AWS"],
	},
	featuredWork: {
		eyebrow: "Featured work",
	},
	compare: {
		heading: "Before it ships. After it's production-ready.",
		subhead: "Drag to compare.",
	},
	work: {
		heading: "Selected work",
	},
	services: {
		heading: "Services",
	},
	team: {
		heading: "Team",
	},
	contact: {
		heading: "Have a project in mind?",
		email: "hello@nomdevs.com",
	},
} as const;
