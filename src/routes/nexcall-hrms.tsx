import { createFileRoute } from "@tanstack/react-router";
import { CaseStudyPage } from "#/components/sections/CaseStudyPage";
import { projects } from "#/data/projects";

const project = projects.find((p) => p.slug === "nexcall-hrms");
if (!project) throw new Error("nexcall-hrms missing from src/data/projects.ts");

export const Route = createFileRoute("/nexcall-hrms")({
	component: () => <CaseStudyPage project={project} />,
});
