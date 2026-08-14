import React, { useState, useEffect } from 'react';

/**
 * Custom hook to dynamically calculate the number of shelf columns
 * based on current viewport width so that shelf tiers never break or wrap
 * unexpectedly during window resize.
 * 
 * - Mobile (< 640px): 2 columns
 * - Tablet (640px - 1023px): 3 columns (or 2 on smaller tablets)
 * - Desktop (>= 1024px): 4 columns
 */
export function useResponsiveShelfColumns(): number {
  const getColumns = () => {
    if (typeof window === 'undefined') return 4;
    const width = window.innerWidth;
    if (width < 640) return 2;
    if (width < 1024) return 3;
    return 4;
  };

  const [columns, setColumns] = useState<number>(getColumns);

  useEffect(() => {
    const handleResize = () => {
      setColumns(getColumns());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return columns;
}
