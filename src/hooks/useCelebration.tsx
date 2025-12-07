import { useCallback } from 'react';

declare global {
  interface Window {
    confetti: any;
  }
}

// Load confetti script dynamically
const loadConfetti = (): Promise<void> => {
  return new Promise((resolve) => {
    if (window.confetti) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js';
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
};

export const useCelebration = () => {
  // Basic confetti burst
  const triggerConfetti = useCallback(async () => {
    await loadConfetti();
    window.confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2d7a4e', '#f97316', '#fbbf24', '#22c55e', '#3b82f6']
    });
  }, []);

  // Firework effect
  const triggerFireworks = useCallback(async () => {
    await loadConfetti();
    const duration = 2000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      
      window.confetti({
        ...defaults,
        particleCount,
        origin: { x: Math.random() * 0.4 + 0.1, y: Math.random() - 0.2 },
        colors: ['#2d7a4e', '#f97316', '#fbbf24']
      });
      window.confetti({
        ...defaults,
        particleCount,
        origin: { x: Math.random() * 0.4 + 0.5, y: Math.random() - 0.2 },
        colors: ['#22c55e', '#3b82f6', '#ec4899']
      });
    }, 250);
  }, []);

  // Coin rain effect
  const triggerCoinRain = useCallback(async () => {
    await loadConfetti();
    const duration = 2500;
    const animationEnd = Date.now() + duration;
    
    const frame = () => {
      window.confetti({
        particleCount: 3,
        angle: 90,
        spread: 45,
        startVelocity: 45,
        origin: { x: Math.random(), y: -0.1 },
        colors: ['#fbbf24', '#f59e0b', '#d97706'],
        shapes: ['circle'],
        gravity: 1.2,
        scalar: 1.2,
        drift: 0,
        ticks: 300
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  // Combined celebration (confetti + coins)
  const triggerCelebration = useCallback(async () => {
    await loadConfetti();
    
    // Initial burst
    window.confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.7 },
      colors: ['#2d7a4e', '#f97316', '#fbbf24', '#22c55e']
    });

    // Side cannons
    setTimeout(() => {
      window.confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#2d7a4e', '#22c55e', '#fbbf24']
      });
      window.confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f97316', '#ec4899', '#3b82f6']
      });
    }, 200);
  }, []);

  return {
    triggerConfetti,
    triggerFireworks,
    triggerCoinRain,
    triggerCelebration
  };
};
