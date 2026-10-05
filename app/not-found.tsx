import Link from "next/link";

export default function NotFound() {
  return <main className="not-found container"><a className="wordmark" href="./">prem<span className="wordmark-dot">.</span></a><p className="eyebrow">404 / OFF THE MAP</p><h1>A little detour.</h1><p>This page doesn’t exist. The good stuff is back home.</p><Link className="button button-primary" href="/">Back to the portfolio ↗</Link></main>;
}
