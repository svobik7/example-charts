import type { ChartCfg } from '@antv/g2/lib/interface';
import { Chart } from './Chart';

type Data = { group: string; x: string; y: number };
type Config = Partial<ChartCfg>;

type FactoryProps = { data: Data[]; config?: Config };

function factoryChart({ data, config = {} }: FactoryProps) {
  return async function renderChart(container: HTMLDivElement) {
    // dynamic import is used as workaround for SSR because G2 is not SSR compatible
    const G2 = await import('@antv/g2');

    const chart = new G2.Chart({
      container: container,
      autoFit: true,
      ...config,
    });

    chart.data(data);

    chart.scale('y', {
      nice: true,
    });

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
  return <Chart render={(container) => renderChart(container)} />;
}
