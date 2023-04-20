import { BarChart } from '@/libs/g2-charts/BarChart';
import { trpc } from '@/utils/trpcUtils';
import { Skeleton } from 'antd';

type ChartCasesProps = { height: number };

export function ChartCases({ height }: ChartCasesProps) {
  const summary = trpc.getCasesBySex.useQuery();

  if (!summary.data) {
    return <Skeleton />;
  }

  const chartData = summary.data.flatMap(({ year, femaleCases, maleCases }) => [
    { group: 'Females', x: String(year), y: femaleCases / 1_000_000 },
    { group: 'Males', x: String(year), y: maleCases / 1_000_000 },
  ]);

  return <BarChart data={chartData} config={{ height }} />;
}
