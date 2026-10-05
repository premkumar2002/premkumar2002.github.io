import { portfolio } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/ui";

export function Journey() {
  return <section className="section container" id="experience" aria-labelledby="journey-title"><SectionHeading eyebrow={portfolio.sections.journey.eyebrow} title={portfolio.sections.journey.heading} /><h3 className="sr-only" id="journey-title">Education and experience</h3>
    <ol className="timeline">{portfolio.experience.map((item, index) => <li key={item.organisation}><Reveal className="timeline-entry" delay={index * 0.05}><div className="timeline-date"><span className="timeline-dot" /><p>{item.period}</p><span className="timeline-type">{item.type}</span></div><div className="timeline-content"><div className="timeline-top"><h3>{item.title}</h3><span className="timeline-index">0{index + 1}</span></div><p className="timeline-organisation">{item.organisation}<span> / {item.location}</span></p><p className="timeline-description">{item.description}</p></div></Reveal></li>)}</ol>
    <div className="credentials"><p className="eyebrow">{portfolio.sections.credentials.eyebrow}</p><div className="credential-row">{portfolio.certifications.map((item) => <Reveal className="credential" key={item.title}><span className="credential-mark" aria-hidden="true">{item.mark}</span><div><p>{item.issuer}</p><h3>{item.title}</h3></div><span className="credential-detail" aria-hidden="true">↗</span></Reveal>)}</div></div>
  </section>;
}
