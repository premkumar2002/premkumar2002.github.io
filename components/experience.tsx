"use client";

import { LazyMotion, domAnimation, MotionConfig, useReducedMotion } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Toast, type ToastMessage } from "@/components/ui";

const ToastContext = createContext<(message: ToastMessage) => void>(() => {});
export const useToast = () => useContext(ToastContext);

function AmbientInteractions() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const finePointer = window.matchMedia("(pointer: fine)");
    const cursor = document.querySelector<HTMLElement>(".custom-cursor");
    let pointerFrame = 0;
    let activeMagnet: HTMLElement | null = null;
    const resetMagnet = () => {
      activeMagnet?.style.removeProperty("translate");
      activeMagnet = null;
    };
    const move = (event: PointerEvent) => {
      if (!finePointer.matches || event.pointerType === "touch") return;
      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        if (cursor) {
          cursor.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
          cursor.classList.add("visible");
          cursor.classList.toggle("hovering", !!(event.target as Element)?.closest?.("a,button,input,textarea,summary"));
        }
        const magnet = (event.target as Element)?.closest?.<HTMLElement>("[data-magnetic]") || null;
        if (activeMagnet !== magnet) resetMagnet();
        if (magnet) {
          activeMagnet = magnet;
          const bounds = magnet.getBoundingClientRect();
          magnet.style.translate = `${(event.clientX - bounds.left - bounds.width / 2) * 0.1}px ${(event.clientY - bounds.top - bounds.height / 2) * 0.15}px`;
        }
      });
    };
    const leave = () => { cursor?.classList.remove("visible"); resetMagnet(); };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(pointerFrame);
      resetMagnet();
    };
  }, [reduced]);

  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    let disposed = false;
    let destroy: (() => void) | undefined;
    // Load smooth scrolling only for pointer-driven devices that allow motion.
    void import("lenis").then(({ default: Lenis }) => {
      if (disposed) return;
      // Lenis already reads CSS scroll-padding; an extra offset would be counted twice.
      const lenis = new Lenis({ autoRaf: true, duration: 0.85, anchors: true, smoothWheel: true });
      destroy = () => lenis.destroy();
    });
    return () => { disposed = true; destroy?.(); };
  }, [reduced]);

  return <div className="custom-cursor" aria-hidden="true"><span /></div>;
}

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<ToastMessage | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const notify = useCallback((next: ToastMessage) => {
    if (timer.current) clearTimeout(timer.current);
    setMessage(next);
    timer.current = setTimeout(() => setMessage(null), 6500);
  }, []);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  return <MotionConfig reducedMotion="user"><LazyMotion features={domAnimation}><ToastContext.Provider value={notify}>{children}<AmbientInteractions /><Toast message={message} /></ToastContext.Provider></LazyMotion></MotionConfig>;
}
