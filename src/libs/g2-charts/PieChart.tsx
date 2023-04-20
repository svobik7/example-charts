import type { ChartCfg } from '@antv/g2/lib/interface';
import { Chart } from './Chart';

type Data = { group: string; value: number };
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

    chart.coordinate('theta', {
      radius: 0.75,
    });

    chart.tooltip({
      showMarkers: false,
    });

    chart
      .interval()
      .adjust('stack')
      .position('value')
      .color('group', ['#668bee', '#5ad4aa'])
      .label('value', () => ({
        content: (data) => String(Math.round(data.value)),
      }));

    chart.render();

    return chart;
  };
}

type PieChartProps = FactoryProps;

export function PieChart({ data, config }: PieChartProps) {
  const renderChart = factoryChart({ data, config });
  return <Chart render={(container) => renderChart(container)} />;
}
