"use client";

import { useEffect, useRef, useState } from "react";
import { portfolio, projects, projectCategories, type Category, type Project } from "@/data/portfolio";
import { ProjectVisual } from "@/components/project-visual";
import { Arrow, Reveal, SectionHeading } from "@/components/ui";

function ProjectLinks({ project }: { project: Project }) {
  return <div className="project-links">{project.github ? <a className="text-link" href={project.github} target="_blank" rel="noopener noreferrer">Source code <Arrow diagonal /></a> : <span className="pending-link" title="Add this project’s repository URL in data/portfolio.ts">[ADD GITHUB LINK]</span>}{project.live ? <a className="text-link" href={project.live} target="_blank" rel="noopener noreferrer">Live project <Arrow diagonal /></a> : <span className="pending-link" title="Add this project’s deployed URL in data/portfolio.ts">[ADD LIVE LINK]</span>}</div>;
}

export function Projects() {
  const [filter, setFilter] = useState<Category | "All">("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const flagship = projects[0];
  const filtered = projects.slice(1).filter((project) => filter === "All" || project.categories.includes(filter));
  const flagshipVisible = !!flagship && (filter === "All" || flagship.categories.includes(filter));
  const count = filtered.length + Number(flagshipVisible);

  useEffect(() => {
    if (!selected || !dialog.current) return;
    const node = dialog.current;
    const previousOverflow = document.body.style.overflow;
    node.showModal();
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; if (node.open) node.close(); opener.current?.focus(); };
  }, [selected]);

  const open = (project: Project, target: HTMLElement) => { opener.current = target; setSelected(project); };

  return <section className="section work-section container" id="work" aria-labelledby="work-title"><SectionHeading eyebrow={portfolio.caseStudy.eyebrow} title={portfolio.caseStudy.headline}><p className="section-aside">{projects.length} {projects.length === 1 ? "exploration" : "explorations"}.<br />One builder’s mindset.</p></SectionHeading><h3 id="work-title" className="sr-only">Selected projects</h3>
    <div className="filter-row work-filters" role="group" aria-label="Filter projects">{(["All", ...projectCategories] as const).map((category) => <button type="button" key={category} onClick={() => setFilter(category)} className={`filter ${filter === category ? "is-active" : ""}`} aria-pressed={filter === category}>{category}{category === "All" && <span>{String(projects.length).padStart(2, "0")}</span>}</button>)}<span className="filter-count" role="status" aria-live="polite">{count} {count === 1 ? "project" : "projects"}</span></div>
    {flagshipVisible && <Reveal className="flagship"><div className="flagship-head"><span className="eyebrow"><span className="mini-spark" />{portfolio.caseStudy.label}</span><span className="flagship-number">{flagship.index} — {String(projects.length).padStart(2, "0")}</span></div><div className="flagship-intro"><div><h3>{flagship.title}</h3><p>{portfolio.caseStudy.heading}</p></div><button className="round-button" type="button" aria-label={`Open ${flagship.title} details`} onClick={(event) => open(flagship, event.currentTarget)}><Arrow diagonal /></button></div><ProjectVisual project={flagship} large /><div className="case-study-body"><div className="case-study-overview"><p>{portfolio.caseStudy.intro}</p><ul className="tech-tags">{flagship.tech.map((tech) => <li key={tech}>{tech}</li>)}</ul><ProjectLinks project={flagship} /></div><div className="case-study-chapters">{portfolio.caseStudy.chapters.map((chapter) => <div className="case-chapter" key={chapter.number}><span>{chapter.number}</span><div><h4>{chapter.title}</h4><p>{chapter.text}</p></div></div>)}</div></div></Reveal>}
    <div className="projects-grid">{filtered.map((project, index) => <Reveal key={project.id} className={`project-card card-${project.visual}`} delay={index * 0.03}><div className="project-preview"><ProjectVisual project={project} /><button className="project-preview-button" type="button" onClick={(event) => open(project, event.currentTarget)}><span className="preview-prompt">Explore {project.title} <Arrow diagonal /></span></button></div><div className="project-card-body"><div className="project-meta"><span>{project.kind}</span><span>{project.index} /</span></div><h3><button type="button" onClick={(event) => open(project, event.currentTarget)}>{project.title}<Arrow diagonal /></button></h3><p>{project.summary}</p><ul className="tech-tags">{project.tech.map((tech) => <li key={tech}>{tech}</li>)}</ul><ProjectLinks project={project} /></div></Reveal>)}</div>
    <a className="all-code-link" href={portfolio.github} target="_blank" rel="noopener noreferrer">More of the process lives on GitHub <Arrow diagonal /></a>
    <dialog ref={dialog} className="project-dialog" aria-labelledby="dialog-title" onCancel={() => setSelected(null)} onClose={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) { const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) setSelected(null); } }} data-lenis-prevent>
      {selected && <><div className="dialog-head"><p className="eyebrow">PROJECT {selected.index} / {selected.kind}</p><button className="icon-button dialog-close" type="button" aria-label="Close project details" onClick={() => setSelected(null)} autoFocus>×</button></div><ProjectVisual project={selected} /><div className="dialog-body"><h2 id="dialog-title">{selected.title}</h2><p>{selected.detail}</p><ul className="tech-tags">{selected.tech.map((tech) => <li key={tech}>{tech}</li>)}</ul><ProjectLinks project={selected} /></div></>}
    </dialog>
  </section>;
}
