import { motion } from "motion/react";
import { TeamCard, type TeamMember } from "#/components/sections/TeamCard";
import { Container } from "#/components/ui/Container";
import {
	revealHidden,
	revealTransition,
	revealVisible,
	useScrollReveal,
} from "#/lib/useScrollReveal";

export interface TeamGridProps {
	heading: string;
	team: Array<TeamMember>;
}

// Unused (Team section removed from the homepage — see docs/DECISIONS.md).
// Kept on disk in case Team comes back.
/** Reflows for 1–8+ members. */
export function TeamGrid({ heading, team }: TeamGridProps) {
	const { ref, inView } = useScrollReveal<HTMLElement>();

	return (
		<motion.section
			id="team"
			ref={ref}
			initial={revealHidden}
			animate={inView ? revealVisible : revealHidden}
			transition={revealTransition}
			className="border-t border-border"
		>
			<Container className="py-16">
				<h2 className="m-0 mb-8 text-2xl font-bold">{heading}</h2>
				<div className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-8">
					{team.map((member) => (
						<TeamCard key={member.name} member={member} />
					))}
				</div>
			</Container>
		</motion.section>
	);
}
