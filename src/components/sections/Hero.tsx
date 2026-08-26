import { motion } from "motion/react";
import { Button } from "#/components/ui/Button";
import { Container } from "#/components/ui/Container";
import { Tag } from "#/components/ui/Tag";
import { BOOK_A_CALL_HREF } from "#/lib/constants";

export interface HeroProps {
	headline: string;
	subhead: string;
	techStack: ReadonlyArray<string>;
}

// Whole-block staggered fade-up, matching the source's fadeInUp keyframe —
// not a per-character reveal, so no react-bits SplitText here (see
// docs/DECISIONS.md).
const fadeUp = {
	initial: { opacity: 0, y: 12 },
	animate: { opacity: 1, y: 0 },
};

export function Hero({ headline, subhead, techStack }: HeroProps) {
	return (
		<Container
			width="narrow"
			className="flex flex-col items-center pt-24 pb-12 text-center"
		>
			<motion.h1
				{...fadeUp}
				transition={{ duration: 0.7, ease: "easeOut" }}
				className="m-0 text-[clamp(2rem,6vw,3rem)] font-bold leading-heading tracking-heading"
			>
				{headline}
			</motion.h1>
			<motion.p
				{...fadeUp}
				transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
				className="mt-4 max-w-140 text-base leading-normal text-text-muted"
			>
				{subhead}
			</motion.p>
			<motion.div
				{...fadeUp}
				transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
				className="mt-6 flex flex-wrap justify-center gap-2"
			>
				{techStack.map((tech) => (
					<Tag key={tech}>{tech}</Tag>
				))}
			</motion.div>
			<motion.div
				{...fadeUp}
				transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
				className="mt-8 flex flex-wrap justify-center gap-4"
			>
				<Button href={BOOK_A_CALL_HREF}>Book a Call</Button>
				<Button href="#work" variant="outline">
					View Work
				</Button>
			</motion.div>
		</Container>
	);
}
