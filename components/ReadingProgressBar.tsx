'use client';

import React, { useEffect, useState } from 'react';

export default function ReadingProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-50 bg-transparent" role="progressbar" aria-label="Progres membaca" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(scrollProgress)}>
      <div
        className="h-full bg-gradient-to-r from-kn-500 via-ex-400 to-sun-400"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
