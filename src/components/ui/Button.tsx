import type { ComponentPropsWithoutRef } from "react";
import { cn } from "#/lib/cn";

export type ButtonVariant = "filled" | "outline" | "ghost";
export type ButtonSize = "sm" | "default";

export interface ButtonProps extends ComponentPropsWithoutRef<"a"> {
	variant?: ButtonVariant;
	size?: ButtonSize;
}

const base =
	"inline-flex items-center justify-center font-semibold transition-colors";

const variants: Record<ButtonVariant, string> = {
	filled: "bg-accent text-bg rounded-lg hover:opacity-85",
	outline:
		"bg-transparent text-text border border-border rounded-lg hover:border-accent hover:text-accent",
	ghost: "text-accent font-normal hover:opacity-80",
};

// Ghost renders as inline text — filled/outline are the boxed CTAs, so only
// they take the pill padding.
const sizes: Record<ButtonVariant, Record<ButtonSize, string>> = {
	filled: { sm: "text-sm px-4 py-2", default: "text-base px-6 py-3" },
	outline: { sm: "text-sm px-4 py-2", default: "text-base px-6 py-3" },
	ghost: { sm: "text-sm", default: "text-base" },
};

/** Every CTA in the design is an anchor, never a form-submitting button. */
export function Button({
	variant = "filled",
	size = "default",
	className,
	...props
}: ButtonProps) {
	return (
		<a
			className={cn(base, variants[variant], sizes[variant][size], className)}
			{...props}
		/>
	);
}
