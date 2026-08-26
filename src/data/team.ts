export interface TeamMember {
	name: string;
	role: string;
	skills: Array<string>;
}

export const team: Array<TeamMember> = [
	{
		name: "Ava Chen",
		role: "Founder & Engineering Lead",
		skills: ["TypeScript", "Systems Design", "React"],
	},
	{
		name: "Marcus Webb",
		role: "Backend Engineer",
		skills: ["Node.js", "PostgreSQL", "AWS"],
	},
	{
		name: "Priya Nair",
		role: "Frontend Engineer",
		skills: ["React", "Next.js", "CSS"],
	},
	{
		name: "Diego Ruiz",
		role: "DevOps Engineer",
		skills: ["Kubernetes", "Terraform", "CI/CD"],
	},
	{
		name: "Sofia Lindqvist",
		role: "Product Designer",
		skills: ["Figma", "Design Systems", "Prototyping"],
	},
];
