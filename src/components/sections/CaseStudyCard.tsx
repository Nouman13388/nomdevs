import { Button } from "#/components/ui/Button";
import { Card } from "#/components/ui/Card";
import { Tag } from "#/components/ui/Tag";
import type { Project } from "#/data/projects";
import { cn } from "#/lib/cn";
import { PLACEHOLDER_STRIPE_BG } from "#/lib/constants";

export interface CaseStudyCardProps {
	project: Project;
	/** 0-based position in the projects array — renders as "01 · category". */
	index: number;
}

export function CaseStudyCard({ project, index }: CaseStudyCardProps) {
	const number = String(index + 1).padStart(2, "0");

	return (
		<Card className="flex flex-col overflow-hidden p-0">
			{project.screenshot ? (
				<img
					src={project.screenshot}
					alt={`${project.title} screenshot`}
					className="aspect-video w-full object-cover object-top"
				/>
			) : (
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
			)}

			<div className="flex flex-1 flex-col gap-2 p-6">
				<div className="font-mono text-sm text-text-muted">
					{number} · {project.category}
				</div>
				<h3 className="m-0 text-2xl font-semibold text-text">
					{project.title}
				</h3>

				<p className="m-0 mt-1 text-base leading-normal text-text-muted">
					{project.problem}
				</p>

				<div className="mt-2 flex flex-wrap gap-2">
					{project.stack.map((tech) => (
						<Tag key={tech}>{tech}</Tag>
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

				<div className="mt-4 flex flex-wrap items-center gap-4">
					{project.liveUrl && (
						<Button
							href={project.liveUrl}
							target="_blank"
							rel="noopener noreferrer"
							variant="outline"
							size="sm"
						>
							Visit site ↗
						</Button>
					)}
					<Button
						href={`/${project.slug}`}
						variant="ghost"
						className="font-semibold"
					>
						View Case Study →
					</Button>
				</div>
			</div>
		</Card>
	);
}
