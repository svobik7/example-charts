import type { ChartCfg } from '@antv/g2/lib/interface';
import { Chart } from './Chart';

type Data = { group: string; x: string; y: number };
type Config = Partial<ChartCfg> & { yLabel?: string };

type FactoryProps = { data: Data[]; config?: Config };

function factoryChart({ data, config = {} }: FactoryProps) {
  return async function renderChart(container: HTMLDivElement) {
    // dynamic import is used as workaround for SSR because G2 is not SSR compatible
    const G2 = await import('@antv/g2');

    const { yLabel, ...chartConfig } = config;

    const chart = new G2.Chart({
      container: container,
      autoFit: true,
      ...chartConfig,
    });

    chart.data(data);

    chart.scale('y', {
      alias: yLabel,
    });

    if (yLabel) {
      chart.axis('y', {
        title: {
          offset: 60,
          style: {
            fill: '#8c8c8c',
          },
        },
      });
    }

    chart.tooltip({
      showMarkers: false,
      shared: true,
    });

    chart
      .interval()
      .position('x*y')
      .color('group')
      .adjust([
        {
          type: 'dodge',
          marginRatio: 0,
        },
      ]);

    chart.render();

    return chart;
  };
}

type BarChartProps = FactoryProps;

export function BarChart({ data, config }: BarChartProps) {
  const renderChart = factoryChart({ data, config });
  return (
    <Chart
      height={config?.height}
      render={(container) => renderChart(container)}
    />
  );
}
