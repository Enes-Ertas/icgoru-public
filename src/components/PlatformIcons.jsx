// src/components/PlatformIcons.jsx
import React from "react";

export default function PlatformIcons() {
  const icons = [
    { src: "/assets/icons/x.svg", alt: "X (Twitter)" },
    { src: "/assets/icons/instagram.svg", alt: "Instagram" },
    { src: "/assets/icons/linkedin.svg", alt: "LinkedIn" },
  ];

  return (
    <div className="flex items-center justify-center space-x-8 mt-12">
      {icons.map(({ src, alt }) => (
        <img
          key={alt}
          src={src}
          alt={alt}
          className="w-8 h-8 hover:opacity-80 transition-opacity"
        />
      ))}
    </div>
  );
}
