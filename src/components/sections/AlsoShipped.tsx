import { motion } from "motion/react";
import { Container } from "#/components/ui/Container";
import type { OtherWork } from "#/data/projects";
import {
	revealHidden,
	revealTransition,
	revealVisible,
	useScrollReveal,
} from "#/lib/useScrollReveal";

export interface AlsoShippedProps {
	heading: string;
	items: Array<OtherWork>;
}

/** One-line entries with no dedicated case-study page — recent minor work and older projects. */
export function AlsoShipped({ heading, items }: AlsoShippedProps) {
	const { ref, inView } = useScrollReveal<HTMLElement>();

	return (
		<motion.section
			ref={ref}
			initial={revealHidden}
			animate={inView ? revealVisible : revealHidden}
			transition={revealTransition}
			className="border-t border-border"
		>
			<Container className="py-16">
				<h2 className="m-0 mb-8 text-2xl font-bold">{heading}</h2>
				<div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-6">
					{items.map((item) => (
						<div key={item.name} className="flex flex-col gap-1">
							<span className="text-base font-semibold text-text">
								{item.name}
							</span>
							<span className="text-sm text-text-muted">
								{item.description}
							</span>
						</div>
					))}
				</div>
			</Container>
		</motion.section>
	);
}
