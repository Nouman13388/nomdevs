import type { ComponentPropsWithoutRef } from "react";
import { cn } from "#/lib/cn";

export type TagProps = ComponentPropsWithoutRef<"span">;

/** Mono pill used for tech-stack, case-study tags, skills, timeframes. */
export function Tag({ className, ...props }: TagProps) {
	return (
		<span
			className={cn(
				"inline-flex items-center rounded-lg border border-border bg-surface px-3 py-1 font-mono text-sm text-text-muted",
				className,
			)}
			{...props}
		/>
	);
}
