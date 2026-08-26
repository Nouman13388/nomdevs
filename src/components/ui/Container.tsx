import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "#/lib/cn";

export type ContainerWidth = "narrow" | "medium" | "wide" | "default";

// Exact max-widths from the design (DESIGN_SPEC.md §4/§5). Tailwind v4's
// dynamic spacing scale (calc(var(--spacing) * n)) covers these as plain
// numeric utilities — no arbitrary values or custom tokens needed.
const widths: Record<ContainerWidth, string> = {
	narrow: "max-w-200", // hero, 800px
	medium: "max-w-225", // before/after compare, 900px
	wide: "max-w-240", // stat strip, 960px
	default: "max-w-300", // featured work, case studies, services, team, 1200px
};

export interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
	width?: ContainerWidth;
}

/** Horizontal padding + centered max-width — every section wraps its content in this. */
export function Container({
	width = "default",
	className,
	...props
}: ContainerProps) {
	return (
		<div
			className={cn("mx-auto w-full px-12", widths[width], className)}
			{...props}
		/>
	);
}

export interface SectionProps extends ComponentPropsWithoutRef<"section"> {
	divider?: boolean;
	children: ReactNode;
}

/** Semantic section wrapper; `divider` adds the border-top used between sections. */
export function Section({
	divider = false,
	className,
	children,
	...props
}: SectionProps) {
	return (
		<section
			className={cn(divider && "border-t border-border", className)}
			{...props}
		>
			{children}
		</section>
	);
}
