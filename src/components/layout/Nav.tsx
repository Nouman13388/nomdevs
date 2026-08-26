import { useState } from "react";
import { Button } from "#/components/ui/Button";
import { Container } from "#/components/ui/Container";
import { Logomark } from "#/components/ui/Logomark";
import { NAV_LINKS } from "#/lib/constants";

/**
 * The source design has no mobile treatment for the link group — at 375px
 * width there isn't room for the logo + 4 links + CTA on one line (flagged
 * in DESIGN_SPEC.md §5.2). Below `md` the link group collapses behind a
 * hamburger toggle; the CTA stays visible at every width since it's the
 * primary conversion action.
 */
export function Nav() {
	const [open, setOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur">
			<Container className="flex h-18 items-center justify-between">
				{/*
				 * Now links home — the source design had it as a plain div, which
				 * made sense on a single-page site, but a logo that doesn't return
				 * home reads as broken once there are real subpages.
				 */}
				<a href="/" className="flex items-center gap-2">
					<Logomark className="size-8 shrink-0" />
					<div className="flex flex-col leading-tight">
						<span className="text-base font-bold tracking-logo text-text">
							nomdevs
						</span>
						<span className="font-mono text-sm text-text-muted">
							product engineering
						</span>
					</div>
				</a>

				<nav className="hidden items-center gap-8 md:flex">
					{NAV_LINKS.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className="text-sm text-text-muted transition-colors hover:text-text"
						>
							{link.label}
						</a>
					))}
				</nav>

				<div className="flex items-center gap-4">
					<Button href="/#contact" size="sm" className="hidden sm:inline-flex">
						Book a Call
					</Button>
					<button
						type="button"
						aria-label={open ? "Close menu" : "Open menu"}
						aria-expanded={open}
						onClick={() => setOpen((v) => !v)}
						className="flex size-9 items-center justify-center rounded-lg border border-border text-text md:hidden"
					>
						<svg
							viewBox="0 0 24 24"
							className="size-5"
							fill="none"
							stroke="currentColor"
							strokeWidth={2}
							aria-hidden="true"
						>
							{open ? (
								<path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
							) : (
								<path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
							)}
						</svg>
					</button>
				</div>
			</Container>

			{open && (
				<nav className="flex flex-col gap-1 border-t border-border px-12 py-4 md:hidden">
					{NAV_LINKS.map((link) => (
						<a
							key={link.href}
							href={link.href}
							onClick={() => setOpen(false)}
							className="py-2 text-sm text-text-muted transition-colors hover:text-text"
						>
							{link.label}
						</a>
					))}
					<Button
						href="/#contact"
						size="sm"
						className="mt-2 self-start sm:hidden"
					>
						Book a Call
					</Button>
				</nav>
			)}
		</header>
	);
}
