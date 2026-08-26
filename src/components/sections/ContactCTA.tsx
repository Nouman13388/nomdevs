import { Button } from "#/components/ui/Button";
import { Container } from "#/components/ui/Container";

export interface ContactCTAProps {
	heading: string;
	email: string;
}

export function ContactCTA({ heading, email }: ContactCTAProps) {
	return (
		<section id="contact" className="border-t border-border">
			<Container className="py-24 text-center">
				<h2 className="m-0 text-3xl font-bold">{heading}</h2>
				<Button href="#contact" className="mt-8">
					Book a Call
				</Button>
				<a
					href={`mailto:${email}`}
					className="mt-4 block font-mono text-base text-accent transition-opacity hover:opacity-80"
				>
					{email}
				</a>
			</Container>
		</section>
	);
}
