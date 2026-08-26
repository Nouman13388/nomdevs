import { Card } from "#/components/ui/Card";
import { Container } from "#/components/ui/Container";
import type { Project } from "#/data/projects";

export interface FeaturedWorkStripProps {
	eyebrow: string;
	projects: Array<Project>;
}

/** Compact teaser row linking into #work — full detail lives in CaseStudyGrid. */
export function FeaturedWorkStrip({
	eyebrow,
	projects,
}: FeaturedWorkStripProps) {
	return (
		<Container className="pb-16">
			<div className="mb-4 font-mono text-sm text-text-muted">{eyebrow}</div>
			<div className="flex flex-wrap gap-4">
				{projects.map((project) => (
					<Card
						key={project.slug}
						href="#work"
						className="flex min-w-60 flex-1 flex-col gap-2"
					>
						<span className="text-base font-semibold text-text">
							{project.title}
						</span>
						<span className="text-sm text-text-muted">{project.blurb}</span>
						<span className="mt-2 text-sm text-accent">View →</span>
					</Card>
				))}
			</div>
		</Container>
	);
}
