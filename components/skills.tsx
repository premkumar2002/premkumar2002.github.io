"use client";

import { useState } from "react";
import { portfolio } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/ui";

export function Skills() {
  const [selected, setSelected] = useState("All");
  const categories = ["All", ...portfolio.skills.map((skill) => skill.title)];
  return <section className="section container" id="skills" aria-labelledby="skills-title"><SectionHeading eyebrow={portfolio.sections.skills.eyebrow} title={portfolio.sections.skills.heading} /><h3 className="sr-only" id="skills-title">Technical skills</h3>
    <p className="section-description">{portfolio.sections.skills.description}</p>
    <div className="filter-row" role="group" aria-label="Filter skills">{categories.map((category) => <button type="button" key={category} className={category === selected ? "filter is-active" : "filter"} aria-pressed={category === selected} onClick={() => setSelected(category)}>{category}</button>)}</div>
    <div className="skills-grid">{portfolio.skills.filter((skill) => selected === "All" || selected === skill.title).map((skill, index) => <Reveal className="skill-card" key={skill.title} delay={index * 0.035}><div className="skill-card-top"><span className="skill-code">{skill.code} /</span><span className="skill-cross" aria-hidden="true">+</span></div><h3>{skill.title}</h3><p>{skill.description}</p><ul className="tech-tags">{skill.items.map((item) => <li key={item}>{item}</li>)}</ul></Reveal>)}</div>
  </section>;
}
