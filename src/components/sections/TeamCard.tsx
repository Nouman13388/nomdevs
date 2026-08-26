import { Button } from "#/components/ui/Button";
import { Tag } from "#/components/ui/Tag";
import { cn } from "#/lib/cn";
import { PLACEHOLDER_STRIPE_BG } from "#/lib/constants";

// Unused (Team section removed from the homepage — see docs/DECISIONS.md).
// Kept on disk in case Team comes back; inlined rather than importing from
// a data/team.ts that no longer exists, so this stays self-contained.
export interface TeamMember {
	name: string;
	role: string;
	skills: Array<string>;
}

export function TeamCard({ member }: { member: TeamMember }) {
	return (
		<div className="flex flex-col items-center text-center">
			<div
				className={cn(
					"flex aspect-square w-full items-center justify-center rounded-xl",
					PLACEHOLDER_STRIPE_BG,
				)}
			>
				<span className="font-mono text-sm text-text-muted">photo</span>
			</div>
			<div className="mt-3 text-base font-semibold">{member.name}</div>
			<div className="text-sm text-text-muted">{member.role}</div>
			<div className="mt-2 flex flex-wrap justify-center gap-2">
				{member.skills.map((skill) => (
					<Tag key={skill}>{skill}</Tag>
				))}
			</div>
			<Button href="#" variant="ghost" size="sm" className="mt-2">
				View profile
			</Button>
		</div>
	);
}
