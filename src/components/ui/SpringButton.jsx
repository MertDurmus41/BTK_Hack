import { useSpring, animated } from '@react-spring/web';
import { useState } from 'react';

export function SpringButton({ 
  children, 
  onClick, 
  className = "btn btn-primary", 
  style = {}, 
  disabled = false 
}) {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Physics-based spring config
  const props = useSpring({
    scale: isPressed ? 0.95 : isHovered ? 1.05 : 1,
    config: { tension: 300, friction: 15 }
  });

  return (
    <animated.button
      className={className}
      style={{ ...style, ...props }}
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => { setIsPressed(false); setIsHovered(false); }}
      onMouseEnter={() => !disabled && setIsHovered(true)}
    >
      {children}
    </animated.button>
  );
}
