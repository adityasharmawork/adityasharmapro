import portfolioData from "@/data/portfolio.json";
import type { PortfolioData } from "@/types/portfolio";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Work } from "@/components/sections/work";
import { OpenSource } from "@/components/sections/open-source";
// import { Freelancing } from "@/components/sections/freelancing";
import { Projects } from "@/components/sections/projects";
import { SectionDivider } from "@/components/section-divider";

const CommitGraph = dynamic(() =>
  import("@/components/sections/commit-graph").then((m) => m.CommitGraph)
);
const Achievements = dynamic(() =>
  import("@/components/sections/achievements").then((m) => m.Achievements)
);
const HobbySection = dynamic(() =>
  import("@/components/sections/youtube").then((m) => m.HobbySection)
);
const XPosts = dynamic(() =>
  import("@/components/sections/x-posts").then((m) => m.XPosts)
);
const Contact = dynamic(() =>
  import("@/components/sections/contact").then((m) => m.Contact)
);

const data = portfolioData as PortfolioData;

export default function Home() {
  return (
    <main>
      <Hero personal={data.personal} />
      <SectionDivider />
      <CommitGraph />
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
      <HobbySection hobby={data.hobby} />
      <SectionDivider />
      <XPosts />
      <SectionDivider />
      <Contact personal={data.personal} socials={data.socials} />
    </main>
  );
}
