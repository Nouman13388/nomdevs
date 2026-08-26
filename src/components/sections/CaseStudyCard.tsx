import { Button } from "#/components/ui/Button";
import { Card } from "#/components/ui/Card";
import { Tag } from "#/components/ui/Tag";
import type { Project } from "#/data/projects";
import { cn } from "#/lib/cn";
import { PLACEHOLDER_STRIPE_BG } from "#/lib/constants";

export function CaseStudyCard({ project }: { project: Project }) {
	return (
		<Card className="flex flex-col overflow-hidden p-0">
			<div
				className={cn(
					"flex aspect-video items-center justify-center",
					PLACEHOLDER_STRIPE_BG,
				)}
			>
				<span className="font-mono text-sm text-text-muted">
					case study screenshot
				</span>
			</div>

			<div className="flex flex-1 flex-col gap-2 p-6">
				<div className="font-mono text-sm text-text-muted">
					{project.category}
				</div>
				<h3 className="m-0 text-2xl font-semibold text-text">
					{project.title}
				</h3>

				<div className="mt-1 flex flex-col gap-1">
					<p className="m-0 text-base leading-normal">
						<span className="font-mono text-sm text-text-muted">
							Problem —{" "}
						</span>
						<span className="text-text">{project.problem}</span>
					</p>
					<p className="m-0 text-base leading-normal">
						<span className="font-mono text-sm text-text-muted">
							Solution —{" "}
						</span>
						<span className="text-text">{project.solution}</span>
					</p>
				</div>

				<div className="mt-2 flex flex-wrap gap-2">
					{project.tags.map((tag) => (
						<Tag key={tag}>{tag}</Tag>
					))}
				</div>

				<ul className="m-0 mt-2 flex list-none flex-col gap-2 p-0">
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

				<Button
					href={project.href}
					variant="ghost"
					className="mt-4 self-start font-semibold"
				>
					View Case Study →
				</Button>
			</div>
		</Card>
	);
}
