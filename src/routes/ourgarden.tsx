import { createFileRoute } from "@tanstack/react-router";
import { CaseStudyPage } from "#/components/sections/CaseStudyPage";
import { projects } from "#/data/projects";

const project = projects.find((p) => p.slug === "ourgarden");
if (!project) throw new Error("ourgarden missing from src/data/projects.ts");

export const Route = createFileRoute("/ourgarden")({
	component: () => <CaseStudyPage project={project} />,
});
