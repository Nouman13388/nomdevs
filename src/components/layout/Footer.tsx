import { Container } from "#/components/ui/Container";
import { Wordmark } from "#/components/ui/Wordmark";
import { socials } from "#/data/socials";

export function Footer() {
	return (
		<footer className="border-t border-border">
			<Container className="flex flex-wrap items-center justify-between gap-4 py-6">
				<div className="flex flex-col gap-1">
					<Wordmark className="h-5 w-auto" />
					<span className="text-sm text-text-muted">
						© {new Date().getFullYear()} nomdevs. All rights reserved.
					</span>
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
