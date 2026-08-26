import { Container } from "#/components/ui/Container";
import { Logomark } from "#/components/ui/Logomark";
import { socials } from "#/data/socials";

export function Footer() {
	return (
		<footer className="border-t border-border">
			<Container className="flex flex-wrap items-center justify-between gap-4 py-6">
				<div className="flex items-center gap-2">
					<Logomark className="size-7 shrink-0" />
					<div className="flex flex-col gap-1">
						<span className="text-base font-bold text-text">nomdevs</span>
						<span className="text-sm text-text-muted">
							© {new Date().getFullYear()} nomdevs. All rights reserved.
						</span>
					</div>
				</div>
				<div className="flex gap-4">
					{socials.map((social) => (
						<a
							key={social.label}
							href={social.href}
							className="flex size-8 items-center justify-center rounded-lg border border-border font-mono text-sm text-text-muted transition-colors hover:border-accent hover:text-accent"
						>
							{social.label}
						</a>
					))}
				</div>
			</Container>
		</footer>
	);
}
