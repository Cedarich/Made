import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function StarBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const starCount = 220;
    const stars = [];

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      const size = Math.random() * 2 + 0.5;
      star.className = 'absolute bg-white rounded-full';
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.opacity = `${Math.random() * 0.8 + 0.2}`;
      star.style.boxShadow = `0 0 ${size * 2}px ${size}px rgba(255, 255, 255, 0.3)`;
      containerRef.current.appendChild(star);
      stars.push(star);
    }

    const tl = gsap.timeline({ repeat: -1 });
    stars.forEach(star => {
      tl.to(star, {
        duration: Math.random() * 2 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut',
        boxShadow: `0 0 ${Math.random() * 4 + 2}px ${Math.random() * 2 + 1}px rgba(255, 255, 255, 0.5)`
      }, Math.random() * -1);
    });

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse at bottom, #0a0f1a 0%, #000000 100%)',
        backdropFilter: 'blur(1px)',
      }}
    />
  );
} 