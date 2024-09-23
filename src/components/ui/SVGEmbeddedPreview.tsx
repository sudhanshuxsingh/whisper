'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface SVGEmbeddedPreviewProps {
  children: React.ReactNode;
  width: number;
  height: number;
  scale?: number;
  className?: string;
}

export default function SVGEmbeddedPreview({
  children,
  width,
  height,
  scale = 1,
  className = '',
}: SVGEmbeddedPreviewProps) {
  const [mounted, setMounted] = useState(false);
  const foreignObjectRef = useRef<SVGForeignObjectElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`pointer-events-none overflow-hidden ${className}`}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <foreignObject
          ref={foreignObjectRef}
          width={width}
          height={height}
          transform={`scale(${scale})`}
          style={{ transformOrigin: 'top left', outline: 'none' }}
        >
          {mounted &&
            createPortal(
              <div className="h-full w-full overflow-hidden">{children}</div>,
              foreignObjectRef.current!
            )}
        </foreignObject>
      </svg>
    </div>
  );
}
