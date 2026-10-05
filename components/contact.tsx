"use client";

import { useState, type FormEvent } from "react";
import { portfolio } from "@/data/portfolio";
import { Arrow, Reveal } from "@/components/ui";
import { useToast } from "@/components/experience";

export function Contact() {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const notify = useToast();
  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "";
  const useFormspree = /^https:\/\/formspree\.io\/f\/[a-z0-9]+$/i.test(endpoint);

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(portfolio.email); notify({ text: "Email copied. Let’s make something good." }); }
    catch { notify({ text: "Copy unavailable. Select the email below, or open it in your mail app.", tone: "error" }); }
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return;
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !email || !message) { setStatus("Please fill in your name, email, and message."); return; }
    if (!useFormspree) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
      const body = encodeURIComponent(`Hi Prem,\n\n${message}\n\n${name}\n${email}`);
      window.location.href = `mailto:${portfolio.email}?subject=${subject}&body=${body}`;
      setStatus("Your email draft is ready in your mail app. Review it and press Send there. If no app opens, use the email link on the left.");
      notify({ text: "Email draft prepared — send it from your mail app." });
      return;
    }
    setBusy(true);
    setStatus("");
    try {
      const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ name, email, message }), signal: AbortSignal.timeout(15000) });
      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      setStatus("Message sent. Thanks for reaching out!");
      notify({ text: "Message sent. Thanks for starting the conversation." });
    } catch {
      setStatus("Your message could not be sent. Please try again or email Prem directly. Your text is still here.");
      notify({ text: "Couldn’t send. Your message is saved in the form.", tone: "error" });
    } finally { setBusy(false); }
  };

  return <section className="contact-section section container" id="contact" aria-labelledby="contact-title"><Reveal className="contact-grid"><div className="contact-copy"><p className="eyebrow">{portfolio.contact.eyebrow}</p><h2 id="contact-title">{portfolio.contact.heading}</h2><p>{portfolio.contact.intro}</p><div className="contact-availability"><span className="status-dot" /><span>{portfolio.contact.note}</span></div><div className="contact-email"><a href={`mailto:${portfolio.email}`}>{portfolio.email}</a><button className="icon-button copy-button" type="button" onClick={copyEmail} aria-label="Copy email address"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" stroke="currentColor" strokeWidth="1.5" /></svg></button></div><div className="social-links"><a href={portfolio.github} target="_blank" rel="noopener noreferrer">GitHub <Arrow diagonal /></a><a href={portfolio.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <Arrow diagonal /></a></div></div>
      <form className="contact-form" onSubmit={submit}><div className="form-top"><span className="eyebrow">START A CONVERSATION</span><span aria-hidden="true">↗</span></div><label htmlFor="contact-name">Your name <span>*</span></label><input id="contact-name" name="name" autoComplete="name" placeholder="Alex Chen" required maxLength={100} disabled={busy} /><label htmlFor="contact-email">Email address <span>*</span></label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="alex@company.com" required maxLength={254} disabled={busy} /><label htmlFor="contact-message">What are you thinking? <span>*</span></label><textarea id="contact-message" name="message" placeholder="A role, a project, or a good idea…" rows={4} required maxLength={5000} disabled={busy} /><div className="honeypot" aria-hidden="true"><label htmlFor="contact-website">Leave this field empty</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div><button className="button button-primary form-submit" type="submit" disabled={busy} data-magnetic>{busy ? "Sending…" : useFormspree ? "Send message" : "Compose email"}<Arrow diagonal /></button><p className="form-note">{useFormspree ? "Delivered securely via Formspree." : "Opens a draft in your email app. You send it from there."}</p><p className="form-status" role="status" aria-live="polite">{status}</p></form>
    </Reveal></section>;
}
