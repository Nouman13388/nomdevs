export interface Project {
	slug: string;
	title: string;
	category: string;
	/** One-sentence problem statement — used as the hero teaser everywhere. */
	problem: string;
	/** Problem → Approach → Outcome narrative, paragraphs joined by "\n\n". */
	story: string;
	outcomes: Array<string>;
	stack: Array<string>;
	/** Live site URL, if the project is publicly visitable. Omit otherwise — the "Visit site" button only renders when this is set. */
	liveUrl?: string;
	/** Path under /public to a real screenshot (e.g. "/screenshots/ourgarden.png"). Falls back to the striped placeholder when unset. */
	screenshot?: string;
}

/**
 * Full case studies, each with its own page at `/${slug}`. Order matters:
 * the featured-work carousel shows the first 3 (see FeaturedWorkCarousel),
 * and CaseStudyGrid numbers every card by its position here.
 */
export const projects: Array<Project> = [
	{
		slug: "nexcall-portal",
		screenshot: "/screenshots/nexcall-portal.webp",
		liveUrl: "https://portal.nexcalltech.com",
		title: "NexCall Portal",
		category: "SaaS · Multi-tenant",
		problem:
			"Call centers tracked leads across spreadsheets and generic tools with no real tenant isolation or role control.",
		story: [
			"Lead management was scattered across spreadsheets and shared tools. There was no structural separation between call center clients. One team could accidentally see or edit another team's leads.",
			"We gave each tenant a database because shared rows aren't real isolation, which meant no query could leak across clients. Six roles and atomic lead-claim logic keep every agent working their own leads. No two agents can ever claim the same one.",
			"A production bug in a missing index was caught and fixed before customers noticed. A read-replica latency issue was silently slowing lead assignment. We found it and fixed it fast.",
		].join("\n\n"),
		outcomes: [
			"Every client's data stays structurally separate, not just filtered by a query.",
			"Six roles and atomic lead-claim logic mean no agent ever double-works a lead.",
			"New code ships automatically on every push, with no manual deploy step.",
		],
		stack: [
			"TanStack Start",
			"Cloudflare Workers",
			"D1",
			"Drizzle ORM",
			"Better Auth",
		],
	},
	{
		slug: "nexcall-hrms",
		screenshot: "/screenshots/nexcall-hrms.webp",
		liveUrl: "https://hrms.nexcalltech.com",
		title: "NexCall HRMS",
		category: "Internal Tool · HR",
		problem:
			"Call center attendance was tracked manually, with no session model and no link to tools the team used daily.",
		story: [
			"Attendance tracking had no session-based structure. There was no way to see who was working in real time. None of it connected to tools the team already used.",
			"We built it on the same Cloudflare stack as Nexcall Portal, because reusing proven infrastructure meant faster, safer delivery. Convex handles the real-time backend, so attendance updates sync instantly. Slack integration puts attendance events where the team already talks.",
			"Attendance now runs on a proper session model instead of manual logs. Managers see status changes as they happen. The team gets attendance visibility inside Slack, without switching tools.",
		].join("\n\n"),
		outcomes: [
			"Attendance is tracked by real sessions, replacing manual logs.",
			"Status updates sync in real time through the Convex backend.",
			"The team sees attendance directly in Slack, no extra tool needed.",
		],
		stack: ["TanStack Start", "Convex", "Cloudflare Workers", "Slack API"],
	},
	{
		slug: "ourgarden",
		screenshot: "/screenshots/ourgarden.webp",
		liveUrl:
			"https://our-garden-web-backend--our-garden-d2dcf.us-east4.hosted.app/",
		title: "OurGarden",
		category: "Marketplace · AI",
		problem:
			"Buying, selling, or trading plants locally meant scattered Facebook groups, with nowhere built for plant-specific commerce or care advice.",
		story: [
			"Plant owners were buying and selling in scattered Facebook groups. There was no dedicated space for plant-specific commerce. Care advice was scattered and hard to trust.",
			"We moved the app from Flutter to Next.js because a web platform reaches far more people than a mobile-only app. That let us add a full marketplace for buying, selling, and trading, plus community groups and care guides. We also built Sage, an AI assistant grounded in plant care instead of a generic chatbot.",
			"The marketplace now covers buying, selling, and local trading in one place. Sage answers plant-care questions, diagnoses pests, and helps plan gardens. The move to web kept every feature the app had, and added more.",
		].join("\n\n"),
		outcomes: [
			"Buyers and sellers can trade plants locally in one dedicated marketplace.",
			"Sage gives instant plant-care answers, from pest diagnosis to garden planning.",
			"The move from mobile to web kept every feature, with none lost.",
		],
		stack: ["Next.js", "Firebase"],
	},
	{
		slug: "reneespace",
		screenshot: "/screenshots/reneespace.webp",
		liveUrl: "https://reneespace.com",
		title: "ReneeSpace",
		category: "AI · Mental Health · Web App",
		problem:
			"Mental-health support chat needed to remember context across sessions, not forget everything the moment a user refreshed.",
		story: [
			"A mental-health support chat needs to remember context, not forget it on refresh. Generic chatbots reset with every new session. Users had to re-explain their situation every single time.",
			"We built persistent memory for logged-in users, because context matters more in mental-health support than almost anywhere else. The app recalls past conversations and recognizes patterns over time. People who aren't logged in can still chat freely, without losing anything they've typed.",
			"Logging in upgrades a session to persistent memory instantly. Nothing typed before login gets lost in the switch. Billing is built into the same sign-in flow, with no separate checkout step.",
		].join("\n\n"),
		outcomes: [
			"The app remembers context across sessions, instead of starting over each time.",
			"It recognizes patterns in a person's conversations over time.",
			"Subscription billing is built directly into sign-in, with no separate checkout.",
		],
		stack: ["Next.js", "Firebase", "Stripe", "ChromaDB"],
	},
	{
		slug: "makro-middleware",
		screenshot: "/screenshots/makro-middleware.webp",
		title: "Makro SCO Middleware",
		category: "Payment Middleware · Enterprise",
		problem:
			"A large retail self-checkout system needed to bridge legacy bank infrastructure with a modern transaction pipeline, reliably, at scale.",
		story: [
			"A large retail self-checkout system relied on legacy bank infrastructure. That infrastructure spoke an old SOAP protocol. Modern transaction flows needed something faster and more reliable.",
			"We modeled the full transaction lifecycle as a state machine, because payments need to be auditable at every step. Kafka streams events through the pipeline in real time. A REST bridge connects to the legacy SOAP system without disrupting it.",
			"Transactions now flow through an event-driven pipeline built for scale. Every step is auditable, from initiation to settlement. The legacy bank integration kept working without any disruption.",
		].join("\n\n"),
		outcomes: [
			"The self-checkout system handles high transaction volume without dropping events.",
			"The legacy bank connection kept working, with zero disruption during the switch.",
			"Every transaction is auditable end to end, as a single tracked state machine.",
		],
		stack: ["NestJS", "Kafka", "OracleDB", "Datadog"],
	},
	{
		slug: "everlooms",
		screenshot: "/screenshots/everlooms.webp",
		liveUrl: "https://everlooms.com",
		title: "Everlooms",
		category: "Web Platform · Headless",
		problem:
			"An existing site needed modernizing, but a full rebuild risked disrupting day-to-day content operations.",
		story: [
			"The existing site was slowing down content operations. A full rebuild risked disrupting the team's daily workflow. It needed modernizing without that disruption.",
			"We migrated the platform to headless Next.js, because a headless setup separates content from the frontend cleanly. Incremental static regeneration keeps pages fresh without full rebuilds. PostHog gives the team visibility into how the site performs.",
			"The migration finished without any downtime for content operations. Pages update without waiting on full rebuilds. The team can now see how visitors use the site.",
		].join("\n\n"),
		outcomes: [
			"Content stayed live throughout the migration, with no downtime.",
			"Pages update instantly, without waiting on a full site rebuild.",
			"The team can now see real analytics on how the site is used.",
		],
		stack: ["Next.js", "ISR", "PostHog"],
	},
];

export interface OtherWork {
	name: string;
	description: string;
}

/** One-line entries, no dedicated page — recent minor work plus older projects. */
export const otherWork: Array<OtherWork> = [
	{
		name: "Gemini AI Voice Agent",
		description:
			"An AI voice agent built on Cloudflare Workers using Gemini 2.0 Flash.",
	},
	{
		name: "Barcode Books App",
		description:
			"Amazon SP-API integration for barcode-based inventory and book management.",
	},
	{
		name: "GymBite",
		description:
			"A fitness and meal-tracking app with a built-in recommendation engine for personalized workout and nutrition suggestions.",
	},
	{
		name: "CalmSpace",
		description:
			"An early mental-wellness app focused on guided relaxation and mood tracking.",
	},
];
