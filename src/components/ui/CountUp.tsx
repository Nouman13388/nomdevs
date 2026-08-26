// Adapted from react-bits (https://github.com/DavidHDev/react-bits) CountUp,
// TS port. Springs a number from `from` to `to` once it scrolls into view.
import { useInView, useMotionValue, useSpring } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

export interface CountUpProps {
	to: number;
	from?: number;
	direction?: "up" | "down";
	delay?: number;
	duration?: number;
	className?: string;
	startWhen?: boolean;
	separator?: string;
}

export function CountUp({
	to,
	from = 0,
	direction = "up",
	delay = 0,
	duration = 2,
	className = "",
	startWhen = true,
	separator = "",
}: CountUpProps) {
	const ref = useRef<HTMLSpanElement>(null);
	const motionValue = useMotionValue(direction === "down" ? to : from);

	const damping = 20 + 40 * (1 / duration);
	const stiffness = 100 * (1 / duration);
	const springValue = useSpring(motionValue, { damping, stiffness });
	const isInView = useInView(ref, { once: true, margin: "0px" });

	const getDecimalPlaces = (num: number) => {
		const str = num.toString();
		if (str.includes(".")) {
			const decimals = str.split(".")[1];
			if (parseInt(decimals, 10) !== 0) return decimals.length;
		}
		return 0;
	};

	const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

	const formatValue = useCallback(
		(latest: number) => {
			const hasDecimals = maxDecimals > 0;
			const formatted = new Intl.NumberFormat("en-US", {
				useGrouping: !!separator,
				minimumFractionDigits: hasDecimals ? maxDecimals : 0,
				maximumFractionDigits: hasDecimals ? maxDecimals : 0,
			}).format(latest);
			return separator ? formatted.replace(/,/g, separator) : formatted;
		},
		[maxDecimals, separator],
	);

	useEffect(() => {
		if (ref.current) {
			ref.current.textContent = formatValue(direction === "down" ? to : from);
		}
	}, [from, to, direction, formatValue]);

	useEffect(() => {
		if (!isInView || !startWhen) return;
		const startId = setTimeout(() => {
			motionValue.set(direction === "down" ? from : to);
		}, delay * 1000);
		return () => clearTimeout(startId);
	}, [isInView, startWhen, motionValue, direction, from, to, delay]);

	useEffect(() => {
		const unsubscribe = springValue.on("change", (latest) => {
			if (ref.current) ref.current.textContent = formatValue(latest);
		});
		return () => unsubscribe();
	}, [springValue, formatValue]);

	return <span className={className} ref={ref} />;
}
