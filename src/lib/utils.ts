
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Enhanced device fingerprinting for tracking votes
export async function getBrowserFingerprint(): Promise<string> {
  // Check if we already have a fingerprint in localStorage
  const storedFingerprint = localStorage.getItem('moviepulse-browser-fingerprint');
  
  if (storedFingerprint) {
    return storedFingerprint;
  }
  
  try {
    // Load FingerprintJS
    const fpPromise = FingerprintJS.load();
    
    // Get the visitor identifier
    const fp = await fpPromise;
    const result = await fp.get();
    
    // Use the visitorId as fingerprint
    const fingerprint = result.visitorId;
    
    // Store it for future use
    localStorage.setItem('moviepulse-browser-fingerprint', fingerprint);
    
    return fingerprint;
  } catch (error) {
    // Fallback to a simple browser-based fingerprint
    const fallbackFingerprint = generateFallbackFingerprint();
    localStorage.setItem('moviepulse-browser-fingerprint', fallbackFingerprint);
    
    return fallbackFingerprint;
  }
}

// Fallback fingerprinting method if the main library fails
function generateFallbackFingerprint(): string {
  const nav = window.navigator;
  const screen = window.screen;
  
  // Collect various browser and device information
  const data = [
    nav.userAgent,
    nav.language,
    new Date().getTimezoneOffset(),
    screen.colorDepth,
    screen.width + 'x' + screen.height,
    nav.platform,
    'plugins:' + Array.from(nav.plugins || []).map(p => p.name).join(','),
    'cpu:' + (nav.hardwareConcurrency || 'unknown'),
    // Use safer access to deviceMemory which may not be available in all browsers
    'memory:' + ((nav as any).deviceMemory || 'unknown')
  ].join('|||');
  
  // Create a simple hash from the data
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Add a timestamp to reduce collisions
  const timestamp = Date.now().toString(36);
  
  return 'fp_' + Math.abs(hash).toString(36) + '_' + timestamp;
}

// Animation utility functions
export function fadeInAnimation(delay = 0, duration = 0.5, initialY = 20) {
  return {
    initial: { opacity: 0, y: initialY },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration }
  };
}

export function pulseAnimation(scale = 1.05, duration = 2) {
  return {
    animate: {
      scale: [1, scale, 1],
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
}

export function slideInAnimation(direction = "right", delay = 0, duration = 0.5) {
  const x = direction === "right" ? 100 : direction === "left" ? -100 : 0;
  const y = direction === "up" ? -100 : direction === "down" ? 100 : 0;
  
  return {
    initial: { opacity: 0, x, y },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: { delay, duration }
  };
}

// Helper for smooth scrolling to page sections
export function scrollToSection(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Helper to determine if the user is on mobile
export function isMobileDevice() {
  return window.innerWidth <= 768;
}

// Add more animation utilities
export function bounceAnimation(scale = 1.1, duration = 0.5) {
  return {
    whileHover: {
      scale: scale,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    whileTap: { scale: 0.95 },
    transition: { duration }
  };
}

export function floatAnimation(yOffset = 10, duration = 6) {
  return {
    animate: {
      y: [0, -yOffset, 0],
      transition: {
        duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };
}

export function shimmerAnimation() {
  return {
    animate: {
      backgroundPosition: ["200% 0", "-200% 0"],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "linear"
      }
    },
    style: {
      backgroundSize: "400% 100%",
      backgroundImage: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)"
    }
  };
}

// Helper function to format numbers with commas
export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

// Helper function to get a random item from an array
export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
