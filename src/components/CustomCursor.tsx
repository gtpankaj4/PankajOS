"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor({ enabled = true }: { enabled?: boolean }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);

  // Mouse and animation state
  const mouse = useRef({ x: 0, y: 0 });
  const dot = useRef({ x: 0, y: 0 });
  const aura = useRef({ x: 0, y: 0 });

  // Cursor state
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const animate = () => {
      dot.current.x += (mouse.current.x - dot.current.x) * 0.25;
      dot.current.y += (mouse.current.y - dot.current.y) * 0.25;
      aura.current.x += (mouse.current.x - aura.current.x) * 0.13;
      aura.current.y += (mouse.current.y - aura.current.y) * 0.13;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.current.x - 6}px, ${dot.current.y - 6}px, 0) scale(${active ? 1.5 : 1})`;
      }
      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${aura.current.x - 35}px, ${aura.current.y - 35}px, 0) scale(${active ? 2.1 : 1})`;
        auraRef.current.style.opacity = active ? "0.18" : "0.12";
        auraRef.current.style.filter = active ? "blur(6px)" : "blur(2px)";
      }
      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMove);

    // Link and toggle button hover effect
    const handleLinkEnter = () => setActive(true);
    const handleLinkLeave = () => setActive(false);
    const links = document.querySelectorAll("a, [aria-label='Toggle dark mode']");
    links.forEach(link => {
      link.addEventListener("mouseenter", handleLinkEnter);
      link.addEventListener("mouseleave", handleLinkLeave);
    });

    requestAnimationFrame(animate);

    // Hide default cursor
    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", handleMove);
      links.forEach(link => {
        link.removeEventListener("mouseenter", handleLinkEnter);
        link.removeEventListener("mouseleave", handleLinkLeave);
      });
      document.body.style.cursor = "";
    };
  }, [enabled, active]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={auraRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 70,
          height: 70,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          background: "#fff",
          mixBlendMode: "difference",
          opacity: 0.12,
          transition: "opacity 0.2s, filter 0.2s",
          filter: "blur(2px)",
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "#111",
          pointerEvents: "none",
          zIndex: 10000,
          mixBlendMode: "difference",
          transition: "transform 0.18s cubic-bezier(.22,1,.36,1)",
        }}
      />
    </>
  );
} 