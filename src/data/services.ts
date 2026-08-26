export interface Service {
	name: string;
	desc: string;
	bullets: Array<string>;
	timeframe: string;
}

export const services: Array<Service> = [
	{
		name: "MVP Sprint",
		desc: "Validate one core flow with a working product, not a mockup.",
		bullets: [
			"Scoped in a single 2-hour session",
			"One product engineer, one designer",
			"Working software, not slides",
			"Codebase you own outright",
		],
		timeframe: "ships in 4 weeks",
	},
	{
		name: "Full Build",
		desc: "End-to-end product design and engineering from spec to launch.",
		bullets: [
			"Dedicated 2-3 person team",
			"Weekly demos, no black box",
			"Production infra and monitoring included",
			"Handoff docs and runbooks",
		],
		timeframe: "ships in 8-12 weeks",
	},
	{
		name: "Embedded Team",
		desc: "Senior engineers working inside your team on an ongoing basis.",
		bullets: [
			"Slots into your existing sprint process",
			"Direct Slack access, no account managers",
			"Scales up or down monthly",
			"Same engineers, every sprint",
		],
		timeframe: "ongoing, month to month",
	},
];
