import { useInView } from "motion/react";
import { useRef } from "react";

/**
 * Shared scroll-reveal behavior for BeforeAfterCompare, CaseStudyGrid,
 * ServicesSection, and TeamGrid — matches the source design's per-section
 * IntersectionObserver reveal (fade + 16px translate, once).
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
	const ref = useRef<T>(null);
	const inView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
	return { ref, inView };
}

export const revealTransition = { duration: 0.6, ease: "easeOut" as const };
export const revealHidden = { opacity: 0, y: 16 };
export const revealVisible = { opacity: 1, y: 0 };
