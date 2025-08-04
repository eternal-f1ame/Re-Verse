"use client";

import { useState, useEffect } from "react";

export function MouseTracker() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 10,
        background: `radial-gradient(1000px circle at ${mousePosition.x}px ${mousePosition.y}px, 
          rgba(139, 102, 66, 0.2) 0%, 
          rgba(139, 102, 66, 0.2) 300px, 
          rgba(139, 102, 66, 0.15) 450px,
          rgba(139, 102, 66, 0.1) 600px,
          rgba(139, 102, 66, 0.05) 750px,
          rgba(139, 102, 66, 0) 900px)`,
        transition: "background 0.1s ease-out",
      }}
    />
  );
}