export interface ChecklistItem {
	label: string;
	before: string;
	after: string;
}

export const checklist: Array<ChecklistItem> = [
	{
		label: "Auth & access",
		before: "open to any user",
		after: "role-based, enforced",
	},
	{
		label: "Payments",
		before: "confirmed in browser",
		after: "server-verified",
	},
	{ label: "Data", before: "no backups", after: "versioned, backed up" },
	{
		label: "Secrets",
		before: "keys in the bundle",
		after: "server-only, rotated",
	},
	{
		label: "Deploys",
		before: "no rollback plan",
		after: "CI/CD, instant rollback",
	},
	{
		label: "Code review",
		before: "auto-accepted, unreviewed",
		after: "reviewed by senior engineers",
	},
];
