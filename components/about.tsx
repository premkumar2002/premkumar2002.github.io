import { portfolio } from "@/data/portfolio";
import { Counter, Reveal, SectionHeading } from "@/components/ui";

export function About() {
  return <section className="section container" id="about" aria-labelledby="about-title"><SectionHeading eyebrow={portfolio.about.eyebrow} title={portfolio.about.heading} />
    <div className="about-grid"><Reveal className="about-story"><h3 id="about-title" className="sr-only">About Prem</h3>{portfolio.about.paragraphs.map((text) => <p key={text}>{text}</p>)}<div className="about-signature"><span className="signature-line" /><span>Prem</span><small>Engineer. Learner. Builder.</small></div></Reveal>
      <Reveal className="about-note" delay={0.1}><span className="note-symbol" aria-hidden="true">↗</span><p>{portfolio.about.note}</p><span className="eyebrow">MINDSET / PRODUCT × ENGINEERING</span></Reveal>
    </div><Reveal className="stats-row">{portfolio.about.stats.map((stat) => <Counter key={stat.label} {...stat} />)}<div className="stat stat-volvo"><span className="stat-word">VOLVO<span>GROUP</span></span><h3>Software engineering intern</h3><p>AWS monitoring · Grafana</p></div></Reveal>
  </section>;
}
