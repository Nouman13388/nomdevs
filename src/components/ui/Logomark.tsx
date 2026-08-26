import type { ComponentPropsWithoutRef } from "react";

export type LogomarkProps = ComponentPropsWithoutRef<"svg">;

/**
 * The "> _" terminal-prompt mark — same shape as public/favicon.svg, kept
 * as inline JSX here so Nav/Footer render it without an extra asset
 * request. Update both together if the mark ever changes.
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
