import { createFileRoute } from "@tanstack/react-router";
import { BeforeAfterCompare } from "#/components/sections/BeforeAfterCompare";
import { CaseStudyGrid } from "#/components/sections/CaseStudyGrid";
import { ContactCTA } from "#/components/sections/ContactCTA";
import { FeaturedWorkStrip } from "#/components/sections/FeaturedWorkStrip";
import { Hero } from "#/components/sections/Hero";
import { ServicesSection } from "#/components/sections/ServicesSection";
import { StatStrip } from "#/components/sections/StatStrip";
import { TeamGrid } from "#/components/sections/TeamGrid";
import { checklist } from "#/data/compare";
import { projects } from "#/data/projects";
import { services } from "#/data/services";
import { siteContent } from "#/data/site";
import { stats } from "#/data/stats";
import { team } from "#/data/team";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<>
			<Hero {...siteContent.hero} />
			<FeaturedWorkStrip
				eyebrow={siteContent.featuredWork.eyebrow}
				projects={projects}
			/>
			<StatStrip stats={stats} />
			<BeforeAfterCompare {...siteContent.compare} checklist={checklist} />
			<CaseStudyGrid heading={siteContent.work.heading} projects={projects} />
			<ServicesSection
				heading={siteContent.services.heading}
				services={services}
			/>
			<TeamGrid heading={siteContent.team.heading} team={team} />
			<ContactCTA {...siteContent.contact} />
		</>
	);
}
