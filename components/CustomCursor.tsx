
import React, { useState, useEffect } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect if the device has a touch screen
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    
    checkTouch();

    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    if (!isTouchDevice) {
      window.addEventListener('mousemove', moveCursor);
      window.addEventListener('mouseover', handleMouseOver);
    }

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible, isTouchDevice]);

  // Hide cursor on touch devices entirely
  if (!isVisible || isTouchDevice) return null;

  return (
    <>
      <div 
        className={`fixed top-0 left-0 w-6 h-6 bg-blue-500/30 rounded-full pointer-events-none z-[9999] transition-transform duration-100 ease-out border border-blue-400/50 ${isHovering ? 'scale-[2.5]' : 'scale-100'}`}
        style={{ 
          transform: `translate(${position.x - 12}px, ${position.y - 12}px)`,
          mixBlendMode: 'screen'
        }}
      />
      <div 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[10000]"
        style={{ 
          transform: `translate(${position.x - 3}px, ${position.y - 3}px)`
        }}
      />
    </>
  );
};

export default CustomCursor;
