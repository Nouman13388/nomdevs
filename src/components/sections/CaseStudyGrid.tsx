import { motion } from "motion/react";
import { CaseStudyCard } from "#/components/sections/CaseStudyCard";
import { Container } from "#/components/ui/Container";
import type { Project } from "#/data/projects";
import {
	revealHidden,
	revealTransition,
	revealVisible,
	useScrollReveal,
} from "#/lib/useScrollReveal";

export interface CaseStudyGridProps {
	heading: string;
	projects: Array<Project>;
}

/**
 * Reflows for any item count. `minmax(min(320px,100%),1fr)` keeps the
 * 320px source floor on wide screens without overflowing at 375px, where
 * a hard 320px floor would clip (flagged in DESIGN_SPEC.md §5.3).
 */
export function CaseStudyGrid({ heading, projects }: CaseStudyGridProps) {
	const { ref, inView } = useScrollReveal<HTMLElement>();

	return (
		<motion.section
			id="work"
			ref={ref}
			initial={revealHidden}
			animate={inView ? revealVisible : revealHidden}
			transition={revealTransition}
			className="border-t border-border"
		>
			<Container className="py-16">
				<h2 className="m-0 mb-8 text-2xl font-bold">{heading}</h2>
				<div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-8">
					{projects.map((project, index) => (
						<CaseStudyCard key={project.slug} project={project} index={index} />
					))}
				</div>
			</Container>
		</motion.section>
	);
}
