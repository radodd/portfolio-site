"use client";

import { useRef, useEffect } from "react";

interface RevealWrapperProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function RevealWrapper({ children, className, style }: RevealWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-reveal", "visible");
          io.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} data-reveal className={className} style={style}>
      {children}
    </div>
  );
}
