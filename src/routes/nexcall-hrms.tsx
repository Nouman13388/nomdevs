import { createFileRoute } from "@tanstack/react-router";
import { CaseStudyPage } from "#/components/sections/CaseStudyPage";
import { projects } from "#/data/projects";
import { pageHead } from "#/lib/seo";

const project = projects.find((p) => p.slug === "nexcall-hrms");
if (!project) throw new Error("nexcall-hrms missing from src/data/projects.ts");

export const Route = createFileRoute("/nexcall-hrms")({
	head: () =>
		pageHead({
			title: `${project.title} Case Study - nomdevs`,
			description: project.problem,
			path: "/nexcall-hrms",
			image: project.screenshot,
		}),
	component: () => <CaseStudyPage project={project} />,
});
