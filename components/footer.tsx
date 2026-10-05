import { portfolio } from "@/data/portfolio";
import { Arrow } from "@/components/ui";

export function Footer() {
  return <footer className="footer container"><a className="wordmark" href="#top" aria-label="Prem, back to top">prem<span className="wordmark-dot">.</span></a><p>© {new Date().getFullYear()} {portfolio.name}. Built with intent.</p><a className="back-top" href="#top">Back to top <Arrow diagonal /></a></footer>;
}
