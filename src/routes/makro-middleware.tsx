import { createFileRoute } from "@tanstack/react-router";
import { CaseStudyPage } from "#/components/sections/CaseStudyPage";
import { projects } from "#/data/projects";
import { pageHead } from "#/lib/seo";

const project = projects.find((p) => p.slug === "makro-middleware");
if (!project)
	throw new Error("makro-middleware missing from src/data/projects.ts");

export const Route = createFileRoute("/makro-middleware")({
	head: () =>
		pageHead({
			title: `${project.title} Case Study - nomdevs`,
			description: project.problem,
			path: "/makro-middleware",
			image: project.screenshot,
		}),
	component: () => <CaseStudyPage project={project} />,
});
