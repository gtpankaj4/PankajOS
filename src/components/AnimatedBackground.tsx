import React from "react";

export default function AnimatedBackground() {
  return (
    <svg className="bg-animated" width="100vw" height="100vh" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <defs>
        <radialGradient id="blob1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#ffe066" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="blob2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#00eaff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="blob3" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#ff80ab" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g>
        <ellipse cx="400" cy="300" rx="220" ry="120" fill="url(#blob1)">
          <animate attributeName="cy" values="300;350;300" dur="12s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="1500" cy="700" rx="180" ry="100" fill="url(#blob2)">
          <animate attributeName="cy" values="700;750;700" dur="14s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="1000" cy="200" rx="140" ry="80" fill="url(#blob3)">
          <animate attributeName="cy" values="200;250;200" dur="16s" repeatCount="indefinite" />
        </ellipse>
      </g>
    </svg>
  );
} 