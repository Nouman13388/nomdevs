import { useRef } from "react";
import { Button } from "#/components/ui/Button";
import { Card } from "#/components/ui/Card";
import { Container } from "#/components/ui/Container";
import type { Project } from "#/data/projects";

export interface FeaturedWorkCarouselProps {
	eyebrow: string;
	/** Exactly 3 — the first 3 entries of `projects`, in order. */
	projects: Array<Project>;
}

/**
 * Swipeable carousel under the hero, replacing FeaturedWorkStrip (kept on
 * disk unused — see docs/DECISIONS.md). Native CSS scroll-snap handles
 * touch swipe and trackpad scroll; prev/next buttons cover mouse-only
 * desktop users and give it a keyboard-reachable control.
 *
 * The card itself isn't a link (unlike FeaturedWorkStrip) — it holds two
 * independent actions (live site + case study), and nesting a link inside
 * a whole-card link would be invalid HTML.
 */
export function FeaturedWorkCarousel({
	eyebrow,
	projects,
}: FeaturedWorkCarouselProps) {
	const scrollerRef = useRef<HTMLDivElement>(null);

	const scroll = (direction: 1 | -1) => {
		scrollerRef.current?.scrollBy({
			left: direction * scrollerRef.current.clientWidth * 0.9,
			behavior: "smooth",
		});
	};

	return (
		<Container className="pb-16">
			<div className="mb-4 flex items-center justify-between">
				<span className="font-mono text-sm text-text-muted">{eyebrow}</span>
				<div className="flex gap-2">
					<button
						type="button"
						onClick={() => scroll(-1)}
						aria-label="Previous"
						className="flex size-8 items-center justify-center rounded-lg border border-border text-text transition-colors hover:border-accent hover:text-accent"
					>
						‹
					</button>
					<button
						type="button"
						onClick={() => scroll(1)}
						aria-label="Next"
						className="flex size-8 items-center justify-center rounded-lg border border-border text-text transition-colors hover:border-accent hover:text-accent"
					>
						›
					</button>
				</div>
			</div>

			<div
				ref={scrollerRef}
				className="flex snap-x snap-mandatory gap-6 overflow-x-auto scrollbar-none"
			>
				{projects.map((project, index) => (
					<Card
						key={project.slug}
						className="flex w-[85%] shrink-0 snap-center flex-col gap-3 sm:w-[45%] lg:w-[31%]"
					>
						<span className="font-mono text-3xl font-bold text-accent">
							{String(index + 1).padStart(2, "0")}
						</span>
						<span className="font-mono text-sm text-text-muted">
							{project.category}
						</span>
						<span className="text-xl font-semibold text-text">
							{project.title}
						</span>
						<span className="text-sm text-text-muted">{project.problem}</span>
						<div className="mt-auto flex flex-wrap items-center gap-4 pt-2">
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
								View case study →
							</Button>
						</div>
					</Card>
				))}
			</div>
		</Container>
	);
}
