import { createFileRoute } from "@tanstack/react-router";
import { CaseStudyPage } from "#/components/sections/CaseStudyPage";
import { projects } from "#/data/projects";
import { pageHead } from "#/lib/seo";

const project = projects.find((p) => p.slug === "ourgarden");
if (!project) throw new Error("ourgarden missing from src/data/projects.ts");

export const Route = createFileRoute("/ourgarden")({
	head: () =>
		pageHead({
			title: `${project.title} Case Study - nomdevs`,
			description: project.problem,
			path: "/ourgarden",
			image: project.screenshot,
		}),
	component: () => <CaseStudyPage project={project} />,
});
