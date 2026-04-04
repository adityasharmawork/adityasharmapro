import portfolioData from "@/data/portfolio.json";
import type { PortfolioData } from "@/types/portfolio";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Work } from "@/components/sections/work";
import { OpenSource } from "@/components/sections/open-source";
// import { Freelancing } from "@/components/sections/freelancing";
import { Projects } from "@/components/sections/projects";
import { Achievements } from "@/components/sections/achievements";
import { Contact } from "@/components/sections/contact";
import { SectionDivider } from "@/components/section-divider";

const data = portfolioData as PortfolioData;

export default function Home() {
  return (
    <main>
      <Hero personal={data.personal} />
      <SectionDivider />
      <About about={data.about} />
      <SectionDivider />
      <Work work={data.work} />
      <SectionDivider />
      <OpenSource openSource={data.openSource} />
      <SectionDivider />
      {/* <Freelancing freelancing={data.freelancing} /> */}
      <Projects projects={data.projects} />
      <SectionDivider />
      <Achievements achievements={data.achievements} />
      <SectionDivider />
      <Contact personal={data.personal} socials={data.socials} />
    </main>
  );
}
