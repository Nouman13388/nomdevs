import { createFileRoute } from "@tanstack/react-router";
import { CaseStudyPage } from "#/components/sections/CaseStudyPage";
import { projects } from "#/data/projects";
import { pageHead } from "#/lib/seo";

const project = projects.find((p) => p.slug === "reneespace");
if (!project) throw new Error("reneespace missing from src/data/projects.ts");

export const Route = createFileRoute("/reneespace")({
	head: () =>
		pageHead({
			title: `${project.title} Case Study - nomdevs`,
			description: project.problem,
			path: "/reneespace",
			image: project.screenshot,
		}),
	component: () => <CaseStudyPage project={project} />,
});
