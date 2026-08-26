import { motion } from "motion/react";
import { useRef, useState } from "react";
import { Container } from "#/components/ui/Container";
import type { ChecklistItem } from "#/data/compare";
import {
	revealHidden,
	revealTransition,
	revealVisible,
	useScrollReveal,
} from "#/lib/useScrollReveal";

export interface BeforeAfterCompareProps {
	heading: string;
	subhead: string;
	checklist: Array<ChecklistItem>;
}

/**
 * Bespoke drag-to-compare — not a react-bits match (see docs/DECISIONS.md).
 * Uses the Pointer Events API so mouse and touch share one set of handlers
 * (the source design duplicated mouse/touch listeners for this).
 */
export function BeforeAfterCompare({
	heading,
	subhead,
	checklist,
}: BeforeAfterCompareProps) {
	const { ref, inView } = useScrollReveal<HTMLElement>();
	const areaRef = useRef<HTMLDivElement>(null);
	const [dragPercent, setDragPercent] = useState(50);

	const updateFromClientX = (clientX: number) => {
		const rect = areaRef.current?.getBoundingClientRect();
		if (!rect) return;
		const pct = ((clientX - rect.left) / rect.width) * 100;
		setDragPercent(Math.max(0, Math.min(100, pct)));
	};

	const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		e.currentTarget.setPointerCapture(e.pointerId);
		updateFromClientX(e.clientX);
	};
	const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
		if (e.buttons !== 1) return;
		updateFromClientX(e.clientX);
	};

	return (
		<motion.section
			ref={ref}
			initial={revealHidden}
			animate={inView ? revealVisible : revealHidden}
			transition={revealTransition}
		>
			<Container width="medium" className="pt-4 pb-16">
				<h2 className="m-0 mb-2 text-center text-2xl font-bold">{heading}</h2>
				<p className="m-0 mb-8 text-center text-base text-text-muted">
					{subhead}
				</p>

				<div
					ref={areaRef}
					onPointerDown={onPointerDown}
					onPointerMove={onPointerMove}
					className="relative touch-none select-none overflow-hidden rounded-xl border border-border bg-surface"
					style={{ cursor: "ew-resize" }}
				>
					<div className="flex flex-col gap-4 p-8">
						{checklist.map((item) => (
							<div
								key={item.label}
								className="grid grid-cols-2 items-center gap-4"
							>
								<span className="text-base text-text">{item.label}</span>
								<span className="font-mono text-sm text-accent">
									{item.after}
								</span>
							</div>
						))}
					</div>

					<div
						className="absolute inset-0 flex flex-col gap-4 bg-surface p-8"
						style={{ clipPath: `inset(0 ${100 - dragPercent}% 0 0)` }}
					>
						{checklist.map((item) => (
							<div
								key={item.label}
								className="grid grid-cols-2 items-center gap-4"
							>
								<span className="text-base text-text">{item.label}</span>
								<span className="font-mono text-sm text-text-muted">
									{item.before}
								</span>
							</div>
						))}
					</div>

					<div
						className="pointer-events-none absolute inset-y-0 w-0.5 bg-accent"
						style={{ left: `${dragPercent}%` }}
					>
						<div className="absolute top-1/2 left-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg bg-accent text-sm text-bg">
							⇄
						</div>
					</div>
				</div>

				<div className="mt-2 flex justify-between">
					<span className="font-mono text-sm text-text-muted">before</span>
					<span className="font-mono text-sm text-accent">after</span>
				</div>
			</Container>
		</motion.section>
	);
}
