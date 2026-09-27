import React, { useEffect, useRef, useState } from 'react';

interface PencilHeadingProps {
  text: string;
  dataPencil?: string;
  className?: string;
  viewBox?: string;
  textLength?: string;
  y?: string;
  maxWidth?: string;
}

export const PencilHeading: React.FC<PencilHeadingProps> = ({
  text,
  dataPencil,
  className = '',
  viewBox,
  textLength,
  y = '72',
  maxWidth,
}) => {
  const pencilKey = dataPencil || text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<SVGTextElement>(null);

  // Proportional character advance estimate for Space Grotesk Bold uppercase at 64px
  const getInitialWidth = (rawText: string): number => {
    const t = rawText.toUpperCase();
    let w = 0;
    for (const ch of t) {
      if (ch === ' ' || ch === 'I' || ch === '1' || ch === "'") {
        w += 22;
      } else if (ch === 'M' || ch === 'W' || ch === '&' || ch === '@') {
        w += 56;
      } else {
        w += 44;
      }
    }
    return Math.max(320, Math.ceil(w + 36));
  };

  const [viewWidth, setViewWidth] = useState<number>(() => getInitialWidth(text));

  useEffect(() => {
    const textEl = textRef.current;
    const container = containerRef.current;
    if (!textEl || !container) return;

    // Dynamically measure the exact subpixel bounding box of the rendered text
    try {
      const bbox = textEl.getBBox();
      if (bbox && bbox.width > 20) {
        setViewWidth(Math.ceil(bbox.width + 32));
      }
    } catch {}

    let totalLength = 2000;
    try {
      totalLength = textEl.getComputedTextLength() || 2000;
    } catch {
      totalLength = 2000;
    }

    textEl.style.strokeDasharray = `${totalLength}`;
    textEl.style.strokeDashoffset = `${totalLength}`;

    const updateAnimation = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const startPoint = windowHeight * 0.92;
      const endPoint = windowHeight * 0.35;

      let progress = (startPoint - rect.top) / (startPoint - endPoint);
      progress = Math.max(0, Math.min(1, progress));

      textEl.style.strokeDashoffset = `${totalLength * (1 - progress)}`;
      if (progress >= 0.7) {
        textEl.style.fillOpacity = `${(progress - 0.7) / 0.3}`;
      } else {
        textEl.style.fillOpacity = '0';
      }
    };

    window.addEventListener('scroll', updateAnimation, { passive: true });
    updateAnimation();

    return () => {
      window.removeEventListener('scroll', updateAnimation);
    };
  }, [text]);

  const activeViewBox = viewBox || `0 0 ${viewWidth} 100`;
  const containerMaxWidth = maxWidth || `${Math.min(960, viewWidth)}px`;

  return (
    <div 
      ref={containerRef}
      className={`pencil-heading ${className}`} 
      data-pencil={pencilKey}
      style={{ maxWidth: containerMaxWidth }}
    >
      <svg 
        className="pencil-svg" 
        viewBox={activeViewBox} 
        preserveAspectRatio="xMinYMid meet" 
        aria-label={text}
      >
        <text 
          ref={textRef}
          x="0" 
          y={y}
          {...(textLength ? { textLength, lengthAdjust: 'spacing' } : {})}
        >
          {text.toUpperCase()}
        </text>
      </svg>
    </div>
  );
};
