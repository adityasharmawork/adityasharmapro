import portfolioData from "@/data/portfolio.json";
import type { PortfolioData } from "@/types/portfolio";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Work } from "@/components/sections/work";
import { OpenSource } from "@/components/sections/open-source";
import { Projects } from "@/components/sections/projects";
import { Achievements } from "@/components/sections/achievements";
import { Contact } from "@/components/sections/contact";

const data = portfolioData as PortfolioData;

export default function Home() {
  return (
    <main>
      <Hero personal={data.personal} />
      <About about={data.about} />
      <Work work={data.work} />
      <OpenSource openSource={data.openSource} />
      <Projects projects={data.projects} />
      <Achievements achievements={data.achievements} />
      <Contact personal={data.personal} socials={data.socials} />
    </main>
  );
}
