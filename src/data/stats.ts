export interface Stat {
	value: number;
	label: string;
	suffix?: string;
	/** Thousands separator passed to CountUp (matches the source's 18,000). */
	separator?: string;
}

export const stats: Array<Stat> = [
	{ value: 42, label: "Projects shipped" },
	{ value: 6, label: "Years in production" },
	{ value: 18000, label: "Hours delivered", suffix: "+", separator: "," },
];
