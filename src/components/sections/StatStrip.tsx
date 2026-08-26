import { Container } from "#/components/ui/Container";
import { CountUp } from "#/components/ui/CountUp";
import type { Stat } from "#/data/stats";

export interface StatStripProps {
	stats: Array<Stat>;
}

/** CountUp (react-bits) springs each number once it scrolls into view. */
export function StatStrip({ stats }: StatStripProps) {
	return (
		<Container
			width="wide"
			className="mb-16 grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-8 border-y border-border py-12"
		>
			{stats.map((stat) => (
				<div key={stat.label} className="text-center">
					<div className="text-5xl font-bold text-accent">
						<CountUp
							to={stat.value}
							duration={1.4}
							separator={stat.separator}
						/>
						{stat.suffix}
					</div>
					<div className="mt-2 text-sm text-text-muted">{stat.label}</div>
				</div>
			))}
		</Container>
	);
}
