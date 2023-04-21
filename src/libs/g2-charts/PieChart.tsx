import type { ChartCfg } from '@antv/g2/lib/interface';
import { Chart } from './Chart';

type Data = { group: string; value: number };
type Config = Partial<ChartCfg> & { annotation?: string };

type FactoryProps = { data: Data[]; config?: Config };

function factoryChart({ data, config = {} }: FactoryProps) {
  return async function renderChart(container: HTMLDivElement) {
    // dynamic import is used as workaround for SSR because G2 is not SSR compatible
    const G2 = await import('@antv/g2');

    const { annotation, ...chartConfig } = config;

    const chart = new G2.Chart({
      container: container,
      autoFit: true,
      ...chartConfig,
    });

    chart.data(data);

    chart.coordinate('theta', {
      radius: 0.75,
      innerRadius: annotation ? 0.6 : undefined,
    });

    chart.tooltip({
      showMarkers: false,
    });

    if (annotation) {
      chart.annotation().text({
        position: ['50%', '50%'],
        content: annotation,
        style: {
          fontSize: 12,
          fill: '#8c8c8c',
          textAlign: 'center',
        },
      });
    }

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
  return (
    <Chart
      height={config?.height}
      render={(container) => renderChart(container)}
    />
  );
}
