import type { ComponentPropsWithoutRef } from "react";

export type WordmarkProps = ComponentPropsWithoutRef<"svg">;

/**
 * The "<nom.devs/>" code-tag wordmark — same shape as public/logo.svg, kept
 * as inline JSX here so Nav/Footer render it without an extra asset
 * request. Update both together if the mark ever changes.
 *
 * Uses var(--color-*) so it stays tied to tokens.css; public/logo.svg uses
 * literal hex since it's a standalone file with no CSS context to pull
 * custom properties from (same split as Logomark.tsx/favicon.svg).
 */
export function Wordmark(props: WordmarkProps) {
	return (
		<svg viewBox="-6 -11 450 76" role="img" aria-label="nomdevs" {...props}>
			<title>nomdevs</title>
			<g
				fontFamily="'JetBrains Mono', ui-monospace, monospace"
				fontSize="48"
				fontWeight="500"
			>
				<text x="0" y="44" fill="var(--color-accent)">
					{"<"}
				</text>
				<text x="34" y="44" fill="var(--color-text)">
					nom
					<tspan fill="var(--color-accent)">.</tspan>
					devs
				</text>
				<text x="380" y="44" fill="var(--color-accent)">
					{"/>"}
				</text>
			</g>
		</svg>
	);
}
