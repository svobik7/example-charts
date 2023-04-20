import { useEffect, useRef } from 'react';

type ChartProps<T> = {
  render: (container: HTMLDivElement) => void;
};

export function Chart<T>({ render }: ChartProps<T>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isRendered = useRef(false);

  useEffect(() => {
    if (!isRendered.current && containerRef.current) {
      isRendered.current = true;
      render(containerRef.current);
    }
  }, []);

  return <div ref={containerRef}></div>;
}
