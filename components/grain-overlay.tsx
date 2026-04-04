"use client";

export function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 animate-grain"
      style={{ opacity: 0.05 }}
    >
      <svg
        width="200%"
        height="200%"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -top-1/2 -left-1/2"
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves={3}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}
