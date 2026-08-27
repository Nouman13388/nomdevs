import { createFileRoute } from "@tanstack/react-router";
import { CaseStudyPage } from "#/components/sections/CaseStudyPage";
import { projects } from "#/data/projects";
import { pageHead } from "#/lib/seo";

const project = projects.find((p) => p.slug === "everlooms");
if (!project) throw new Error("everlooms missing from src/data/projects.ts");

export const Route = createFileRoute("/everlooms")({
	head: () =>
		pageHead({
			title: `${project.title} Case Study - nomdevs`,
			description: project.problem,
			path: "/everlooms",
			image: project.screenshot,
		}),
	component: () => <CaseStudyPage project={project} />,
});
