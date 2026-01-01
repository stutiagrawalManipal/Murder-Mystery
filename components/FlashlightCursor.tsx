
import React, { useEffect, useState } from 'react';

interface FlashlightCursorProps {
  enabled: boolean;
}

export const FlashlightCursor: React.FC<FlashlightCursorProps> = ({ enabled }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      document.documentElement.style.setProperty('--x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!enabled) return null;

  return <div className="flashlight-overlay" />;
};
