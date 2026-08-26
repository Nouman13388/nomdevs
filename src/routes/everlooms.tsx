import { createFileRoute } from "@tanstack/react-router";
import { CaseStudyPage } from "#/components/sections/CaseStudyPage";
import { projects } from "#/data/projects";

const project = projects.find((p) => p.slug === "everlooms");
if (!project) throw new Error("everlooms missing from src/data/projects.ts");

export const Route = createFileRoute("/everlooms")({
	component: () => <CaseStudyPage project={project} />,
});
