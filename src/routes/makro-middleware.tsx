import { createFileRoute } from "@tanstack/react-router";
import { CaseStudyPage } from "#/components/sections/CaseStudyPage";
import { projects } from "#/data/projects";

const project = projects.find((p) => p.slug === "makro-middleware");
if (!project) throw new Error("makro-middleware missing from src/data/projects.ts");

export const Route = createFileRoute("/makro-middleware")({
	component: () => <CaseStudyPage project={project} />,
});
