import { createFileRoute } from "@tanstack/react-router";
import { CaseStudyPage } from "#/components/sections/CaseStudyPage";
import { projects } from "#/data/projects";

const project = projects.find((p) => p.slug === "nexcall-portal");
if (!project) throw new Error("nexcall-portal missing from src/data/projects.ts");

export const Route = createFileRoute("/nexcall-portal")({
	component: () => <CaseStudyPage project={project} />,
});
