export interface Project {
	slug: string;
	category: string;
	title: string;
	/** Short teaser used by FeaturedWorkStrip. */
	blurb: string;
	problem: string;
	solution: string;
	tags: Array<string>;
	outcomes: Array<string>;
	href: string;
}

export const projects: Array<Project> = [
	{
		slug: "ledger-rebuild",
		category: "FINTECH · WEB APP",
		title: "Ledger rebuild for a 40-person accounting firm",
		blurb: "12 years of records migrated, zero loss",
		problem: "Decade-old Access database, no audit trail.",
		solution: "Modern ledger app, 12 years of records migrated clean.",
		tags: ["React", "PostgreSQL", "AWS"],
		outcomes: [
			"60% faster month-end close",
			"12 years of records migrated without loss",
			"99.98% uptime since launch",
		],
		href: "#",
	},
	{
		slug: "scheduling-platform",
		category: "HEALTHCARE · INTERNAL TOOL",
		title: "Scheduling platform replacing six spreadsheets",
		blurb: "6 spreadsheets → 1 system, 200+ providers",
		problem: "Six disconnected spreadsheets, constant double-booking.",
		solution: "One shared scheduling system for 200+ providers.",
		tags: ["Next.js", "Node.js", "MySQL"],
		outcomes: [
			"6 spreadsheets consolidated into one system",
			"Scheduling conflicts down 80%",
			"Adopted by 200+ providers in 3 weeks",
		],
		href: "#",
	},
	{
		slug: "headless-storefront",
		category: "E-COMMERCE · STOREFRONT",
		title: "Headless storefront migration with zero downtime",
		blurb: "4.1s → 1.2s load, zero-downtime migration",
		problem: "4.1s load times, checkout drop-off climbing.",
		solution: "Headless rebuild shipped mid-peak-season, zero downtime.",
		tags: ["Next.js", "Shopify", "GraphQL"],
		outcomes: [
			"Page load time cut from 4.1s to 1.2s",
			"Zero downtime during migration",
			"Checkout conversion up 18%",
		],
		href: "#",
	},
];
