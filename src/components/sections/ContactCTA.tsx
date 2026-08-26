import { Button } from "#/components/ui/Button";
import { Container } from "#/components/ui/Container";
import { BOOK_A_CALL_HREF } from "#/lib/constants";

export interface ContactCTAProps {
	heading: string;
}

export function ContactCTA({ heading }: ContactCTAProps) {
	return (
		<section id="contact" className="border-t border-border">
			<Container className="py-24 text-center">
				<h2 className="m-0 text-3xl font-bold">{heading}</h2>
				<Button href={BOOK_A_CALL_HREF} className="mt-8">
					Book a Call
				</Button>
			</Container>
		</section>
	);
}
