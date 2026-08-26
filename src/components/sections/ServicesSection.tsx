import { motion } from "motion/react";
import { ServiceCard } from "#/components/sections/ServiceCard";
import { Container } from "#/components/ui/Container";
import type { Service } from "#/data/services";
import {
	revealHidden,
	revealTransition,
	revealVisible,
	useScrollReveal,
} from "#/lib/useScrollReveal";

export interface ServicesSectionProps {
	heading: string;
	services: Array<Service>;
}

export function ServicesSection({ heading, services }: ServicesSectionProps) {
	const { ref, inView } = useScrollReveal<HTMLElement>();

	return (
		<motion.section
			id="services"
			ref={ref}
			initial={revealHidden}
			animate={inView ? revealVisible : revealHidden}
			transition={revealTransition}
			className="border-t border-border"
		>
			<Container className="py-16">
				<h2 className="m-0 mb-8 text-2xl font-bold">{heading}</h2>
				<div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-8">
					{services.map((service) => (
						<ServiceCard key={service.name} service={service} />
					))}
				</div>
			</Container>
		</motion.section>
	);
}
