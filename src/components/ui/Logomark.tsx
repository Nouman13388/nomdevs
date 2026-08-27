import type { ComponentPropsWithoutRef } from "react";

export type LogomarkProps = ComponentPropsWithoutRef<"svg">;

/**
 * The "> _" terminal-prompt mark — same shape as public/favicon.svg.
 *
 * No longer used inline in Nav/Footer (replaced by the Wordmark lockup —
 * see docs/DECISIONS.md), but its shape still lives on as the favicon and
 * apple-touch-icon: a wordmark can't work as a small square tab icon, so
 * this mark kept that job. Component kept unused rather than deleted, in
 * case a compact icon slot is needed again — update public/favicon.svg
 * together with this if the mark ever changes.
 */
export function Logomark(props: LogomarkProps) {
	return (
		<svg viewBox="0 0 64 64" aria-hidden="true" {...props}>
			<rect
				x="1.5"
				y="1.5"
				width="61"
				height="61"
				rx="14"
				fill="var(--color-bg)"
				stroke="var(--color-border)"
				strokeWidth="1.5"
			/>
			<path
				d="M22 20 L36 32 L22 44"
				fill="none"
				stroke="var(--color-accent)"
				strokeWidth="6"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<rect
				x="40"
				y="39"
				width="14"
				height="6"
				rx="3"
				fill="var(--color-accent)"
			/>
		</svg>
	);
}
