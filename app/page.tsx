import { portfolio, siteUrl, basePath } from "@/data/portfolio";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Journey } from "@/components/journey";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: portfolio.name,
  url: `${siteUrl}${basePath}/`,
  description: portfolio.description,
  email: `mailto:${portfolio.email}`,
  sameAs: [portfolio.github, portfolio.linkedin],
  homeLocation: { "@type": "Place", name: portfolio.location },
  affiliation: { "@type": "CollegeOrUniversity", name: "Deakin University" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Amrita University" },
  knowsAbout: portfolio.skills.flatMap((skill) => [...skill.items]),
};

export default function Home() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} /><Navigation /><main id="main"><Hero /><About /><Projects /><Skills /><Journey /><Contact /></main><Footer /></>;
}
