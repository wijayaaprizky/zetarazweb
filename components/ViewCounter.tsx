'use client';

import { useEffect, useRef } from 'react';

interface ViewCounterProps {
  slug: string;
}

export default function ViewCounter({ slug }: ViewCounterProps) {
  const hasIncremented = useRef(false);

  useEffect(() => {
    if (hasIncremented.current) return;
    hasIncremented.current = true;

    fetch(`/api/articles/${slug}/view`, {
      method: 'POST',
    }).catch(() => {
      // ignore silently on client failure
    });
  }, [slug]);

  return null;
}
