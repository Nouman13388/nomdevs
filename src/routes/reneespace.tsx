import { createFileRoute } from "@tanstack/react-router";
import { CaseStudyPage } from "#/components/sections/CaseStudyPage";
import { projects } from "#/data/projects";

const project = projects.find((p) => p.slug === "reneespace");
if (!project) throw new Error("reneespace missing from src/data/projects.ts");

export const Route = createFileRoute("/reneespace")({
	component: () => <CaseStudyPage project={project} />,
});
