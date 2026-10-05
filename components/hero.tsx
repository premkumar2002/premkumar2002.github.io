"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { portfolio, assetPath } from "@/data/portfolio";
import { Arrow } from "@/components/ui";
import { useToast } from "@/components/experience";

export function Hero() {
  const scene = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const notify = useToast();

  useEffect(() => {
    const node = scene.current;
    if (!node || reduced || !window.matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        node.style.setProperty("--orbit-x", `${x * 20}deg`);
        node.style.setProperty("--orbit-y", `${-y * 20}deg`);
        node.style.setProperty("--mesh-x", `${x * 32}px`);
        node.style.setProperty("--mesh-y", `${y * 32}px`);
      });
    };
    const reset = () => { ["--orbit-x", "--orbit-y", "--mesh-x", "--mesh-y"].forEach((property) => node.style.removeProperty(property)); };
    node.addEventListener("pointermove", move, { passive: true });
    node.addEventListener("pointerleave", reset);
    return () => { node.removeEventListener("pointermove", move); node.removeEventListener("pointerleave", reset); cancelAnimationFrame(frame); };
  }, [reduced]);

  return <section className="hero container" id="top" aria-labelledby="hero-heading">
    <div className="hero-copy"><p className="eyebrow hero-enter">{portfolio.hero.eyebrow}</p>
      <h1 id="hero-heading"><span className="hero-line hero-enter">{portfolio.hero.lines[0]}</span><span className="hero-line hero-enter"><em>{portfolio.hero.lines[1]}</em></span></h1>
      <p className="hero-intro hero-enter">{portfolio.hero.intro}</p>
      <div className="hero-ctas hero-enter"><a className="button button-primary" href="#work" data-magnetic>Explore my work <Arrow diagonal /></a>
        {portfolio.resume ? <a className="button button-secondary" href={assetPath(portfolio.resume)} download data-magnetic>Download résumé <Arrow /></a> : <button className="button button-secondary" type="button" onClick={() => notify({ text: "Résumé coming soon. Email Prem to request a copy." })} data-magnetic>Download résumé <Arrow /></button>}
        <a className="hero-contact" href="#contact">Get in touch <Arrow diagonal /></a>
      </div>
      <div className="hero-status hero-enter"><span className="status-dot" /><span>{portfolio.availability}</span></div>
    </div>
    <div ref={scene} className="hero-scene" aria-hidden="true"><div className="scene-grid" /><div className="mesh-glow mesh-one" /><div className="mesh-glow mesh-two" /><div className="orbital-system"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" /><div className="orb-core"><span className="orb-glyph">p<span>.</span></span></div><div className="orbit-node node-one" /><div className="orbit-node node-two" /><div className="orbit-node node-three" /></div><span className="scene-coordinate coordinate-one">37.8136° S / 144.9631° E</span><span className="scene-coordinate coordinate-two">CURIOUS BY DEFAULT</span><span className="scene-label"><span /> SYSTEM: ALWAYS EVOLVING</span><div className="scene-cross cross-one">+</div><div className="scene-cross cross-two">+</div></div>
    <div className="hero-bottom"><p>{portfolio.hero.footnote}</p><a href="#about" className="scroll-cue">Scroll to discover <span>↓</span></a></div>
  </section>;
}
