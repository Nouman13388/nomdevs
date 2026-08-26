export interface NavLink {
	href: string;
	label: string;
}

// Absolute (/#work, not #work) so they still resolve correctly from a
// case-study page, not just from "/" — needed once the site became
// multi-page (see docs/DECISIONS.md).
export const NAV_LINKS: Array<NavLink> = [
	{ href: "/#work", label: "Work" },
	{ href: "/#services", label: "Services" },
	{ href: "/#contact", label: "Contact" },
];

/**
 * Diagonal stripe pattern standing in for real imagery ("case study
 * screenshot", "photo") — an explicit placeholder in the source design
 * (DESIGN_SPEC.md §5.8), shared by CaseStudyCard and TeamCard.
 */
export const PLACEHOLDER_STRIPE_BG =
	"bg-[repeating-linear-gradient(135deg,var(--color-placeholder-stripe),var(--color-placeholder-stripe)_10px,var(--color-surface)_10px,var(--color-surface)_20px)]";
