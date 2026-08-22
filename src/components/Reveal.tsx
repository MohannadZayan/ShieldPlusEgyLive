"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Scroll reveal. Animates opacity + transform only — no layout properties, so
 * it stays on the compositor.
 *
 * Reduced motion is handled in CSS (`.fade-up` resolves to its final state),
 * so this component doesn't need to branch on the media query.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  /** Stagger offset in ms, for sequencing siblings. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  // Must start `false` on both server and client. Feature-detecting
  // IntersectionObserver in the initialiser would return true under SSR (Node
  // has no such global) and false in the browser, which hydrates as a mismatch.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver: reveal immediately rather than leaving the
    // content stuck at opacity 0. This runs once as a capability fallback, so
    // it can't cascade.
    if (typeof IntersectionObserver === "undefined") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // reveal once, never re-hide
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`fade-up ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
