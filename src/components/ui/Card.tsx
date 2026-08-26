import type { ComponentPropsWithoutRef } from "react";
import { cn } from "#/lib/cn";

const base = "rounded-xl border border-border bg-surface p-6";

export type CardProps = ComponentPropsWithoutRef<"div"> & { href?: undefined };
export type LinkCardProps = ComponentPropsWithoutRef<"a"> & { href: string };

/**
 * Base surface for featured-work, case-study, and service cards. Default
 * padding (p-6 = 24px) matches most usages; ServiceCard overrides to p-8 —
 * tailwind-merge (via `cn`) resolves that conflict correctly.
 *
 * Pass `href` to render the whole card as a link (FeaturedWorkStrip) with
 * the accent border-hover; omit it for a static card (CaseStudyCard,
 * ServiceCard) where only inner content is interactive.
 */
export function Card({ className, href, ...props }: CardProps | LinkCardProps) {
	if (href) {
		return (
			<a
				href={href}
				className={cn(base, "transition-colors hover:border-accent", className)}
				{...(props as ComponentPropsWithoutRef<"a">)}
			/>
		);
	}
	return (
		<div
			className={cn(base, className)}
			{...(props as ComponentPropsWithoutRef<"div">)}
		/>
	);
}
