import { Button } from "#/components/ui/Button";
import { Container } from "#/components/ui/Container";
import { Tag } from "#/components/ui/Tag";
import type { Project } from "#/data/projects";
import { cn } from "#/lib/cn";
import { PLACEHOLDER_STRIPE_BG } from "#/lib/constants";

export interface CaseStudyPageProps {
	project: Project;
}

/**
 * Shared template for every case-study route — one route file per project
 * just passes its `Project` in here, so the layout lives in one place.
 */
export function CaseStudyPage({ project }: CaseStudyPageProps) {
	const paragraphs = project.story.split("\n\n");

	return (
		<>
			<Container
				width="narrow"
				className="flex flex-col items-center pt-24 pb-12 text-center"
			>
				<Tag>{project.category}</Tag>
				<h1 className="m-0 mt-4 text-[clamp(2rem,6vw,3rem)] font-bold leading-heading tracking-heading">
					{project.title}
				</h1>
				<p className="mt-4 max-w-140 text-base leading-normal text-text-muted">
					{project.problem}
				</p>
				{project.liveUrl && (
					<Button
						href={project.liveUrl}
						target="_blank"
						rel="noopener noreferrer"
						variant="outline"
						className="mt-6"
					>
						Visit site ↗
					</Button>
				)}
			</Container>

			<Container className="pb-16">
				<div
					className={cn(
						"flex aspect-21/9 items-center justify-center rounded-xl",
						PLACEHOLDER_STRIPE_BG,
					)}
				>
					<span className="font-mono text-sm text-text-muted">
						screenshot — supplied separately
					</span>
				</div>
			</Container>

			<Container width="narrow" className="flex flex-col gap-4 pb-16">
				{paragraphs.map((paragraph) => (
					<p key={paragraph} className="m-0 text-base leading-normal text-text">
						{paragraph}
					</p>
				))}
			</Container>

			<Container width="narrow" className="flex flex-wrap gap-2 pb-16">
				{project.stack.map((tech) => (
					<Tag key={tech}>{tech}</Tag>
				))}
			</Container>

			<Container width="narrow" className="pb-24">
				<ul className="m-0 flex list-none flex-col gap-3 p-0">
					{project.outcomes.map((outcome) => (
						<li
							key={outcome}
							className="flex items-start gap-2 text-base text-text"
						>
							<span className="text-accent">▸</span>
							<span>{outcome}</span>
						</li>
					))}
				</ul>
				<Button href="/" variant="ghost" className="mt-8 font-semibold">
					← Back home
				</Button>
			</Container>
		</>
	);
}
