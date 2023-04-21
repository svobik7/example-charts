import { BarChart } from '@/libs/g2-charts/BarChart';
import { trpc } from '@/utils/trpcUtils';
import { Skeleton } from 'antd';

type ChartYearsProps = { height: number };

export function ChartYears({ height }: ChartYearsProps) {
  const cases = trpc.getCases.useQuery();

  if (!cases.data) {
    return <Skeleton style={{ height }} />;
  }

  const chartData = cases.data.flatMap(({ year, femaleCases, maleCases }) => [
    { group: 'Females', x: String(year), y: femaleCases / 1_000_000 },
    { group: 'Males', x: String(year), y: maleCases / 1_000_000 },
  ]);

  return (
    <BarChart data={chartData} config={{ height, yLabel: '# of people' }} />
  );
}
