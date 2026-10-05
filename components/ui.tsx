"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function Arrow({ diagonal = false, className = "" }: { diagonal?: boolean; className?: string }) {
  return <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <m.div className={className} initial={false} whileInView={reduced ? undefined : { opacity: [0.4, 1], y: [18, 0] }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</m.div>;
}

export function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return <Reveal className="section-heading"><p className="eyebrow">{eyebrow}</p><div className="section-heading-row"><h2>{title}</h2>{children}</div></Reveal>;
}

export function Counter({ value, suffix, label, detail }: { value: number; suffix: string; label: string; detail: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!visible || reduced) return;
    let frame = 0;
    const start = performance.now();
    const animate = (time: number) => {
      const progress = Math.min((time - start) / 1050, 1);
      setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [visible, reduced, value]);

  return <div className="stat" ref={ref}><span className="stat-number" aria-hidden="true">{display}<span>{suffix}</span></span><span className="sr-only">{value}{suffix}</span><h3>{label}</h3><p>{detail}</p></div>;
}

export type ToastMessage = { text: string; tone?: "success" | "error" };

export function Toast({ message }: { message: ToastMessage | null }) {
  return <div className={`toast ${message ? "is-visible" : ""} ${message?.tone || ""}`} role="status" aria-live="polite" aria-atomic="true">{message && <><span className="toast-dot" />{message.text}</>}</div>;
}
