import { useEffect, useRef } from 'react';

type ChartProps = {
  render: (container: HTMLDivElement) => void;
};

export function Chart({ render }: ChartProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isRendered = useRef(false);

  useEffect(() => {
    if (!isRendered.current && containerRef.current) {
      isRendered.current = true; // prevents re-rendering
      render(containerRef.current);
    }
  }, []);

  return <div ref={containerRef}></div>;
}
