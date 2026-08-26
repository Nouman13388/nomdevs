import { createFileRoute } from "@tanstack/react-router";
import { AlsoShipped } from "#/components/sections/AlsoShipped";
import { BeforeAfterCompare } from "#/components/sections/BeforeAfterCompare";
import { CaseStudyGrid } from "#/components/sections/CaseStudyGrid";
import { ContactCTA } from "#/components/sections/ContactCTA";
import { FeaturedWorkCarousel } from "#/components/sections/FeaturedWorkCarousel";
import { Hero } from "#/components/sections/Hero";
import { ServicesSection } from "#/components/sections/ServicesSection";
import { StatStrip } from "#/components/sections/StatStrip";
import { checklist } from "#/data/compare";
import { otherWork, projects } from "#/data/projects";
import { services } from "#/data/services";
import { siteContent } from "#/data/site";
import { stats } from "#/data/stats";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<>
			<Hero {...siteContent.hero} />
			<FeaturedWorkCarousel
				eyebrow={siteContent.featuredWork.eyebrow}
				projects={projects.slice(0, 3)}
			/>
			<StatStrip stats={stats} />
			<BeforeAfterCompare {...siteContent.compare} checklist={checklist} />
			<CaseStudyGrid heading={siteContent.work.heading} projects={projects} />
			<AlsoShipped
				heading={siteContent.alsoShipped.heading}
				items={otherWork}
			/>
			<ServicesSection
				heading={siteContent.services.heading}
				services={services}
			/>
			<ContactCTA {...siteContent.contact} />
		</>
	);
}
