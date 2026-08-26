import { Card } from "#/components/ui/Card";
import { Tag } from "#/components/ui/Tag";
import type { Service } from "#/data/services";

export function ServiceCard({ service }: { service: Service }) {
	return (
		<Card className="flex flex-col gap-4 p-8">
			<h3 className="m-0 text-2xl font-semibold">{service.name}</h3>
			<p className="m-0 text-base leading-normal text-text-muted">
				{service.desc}
			</p>
			<ul className="m-0 flex list-none flex-col gap-2 p-0">
				{service.bullets.map((bullet) => (
					<li
						key={bullet}
						className="flex items-start gap-2 text-base text-text"
					>
						<span className="text-accent">–</span>
						<span>{bullet}</span>
					</li>
				))}
			</ul>
			<Tag className="mt-auto self-start">{service.timeframe}</Tag>
		</Card>
	);
}
