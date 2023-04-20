import { useEffect, useRef } from 'react';

const data = [
  { name: 'London', month: 'Jan.', value: 18.9 },
  { name: 'London', month: 'Feb.', value: 28.8 },
  { name: 'London', month: 'Mar.', value: 39.3 },
  { name: 'Berlin', month: 'Jan.', value: 12.4 },
  { name: 'Berlin', month: 'Feb.', value: 23.2 },
  { name: 'Berlin', month: 'Mar.', value: 34.5 },
];

async function getChart() {
  const g2 = await import('@antv/g2');
  return g2.Chart;
}

async function renderBarChart(container: HTMLDivElement) {
  const Chart = await getChart();
  const chart = new Chart({
    container: container,
    autoFit: true,
    height: 300,
    // padding: [20, 20, 95, 80],
  });

  chart.data(data);
  chart.scale('value', {
    nice: true,
  });
  chart.tooltip({
    showMarkers: false,
    shared: true,
  });

  chart
    .interval()
    .position('month*value')
    .color('name')
    .adjust([
      {
        type: 'dodge',
        marginRatio: 0,
      },
    ]);

  chart.render();
  return chart;
}

export function Chart() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isRendered = useRef(false);

  useEffect(() => {
    if (!isRendered.current && containerRef.current) {
      isRendered.current = true;
      renderBarChart(containerRef.current);
    }
  }, []);

  return <div ref={containerRef}></div>;
}
