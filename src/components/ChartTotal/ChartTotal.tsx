import { PieChart } from '@/libs/g2-charts/PieChart';
import { trpc } from '@/utils/trpcUtils';
import { Skeleton } from 'antd';

type ChartTotalProps = { height: number };

export function ChartTotal({ height }: ChartTotalProps) {
  const summary = trpc.getCasesBySex.useQuery();

  if (!summary.data) {
    return <Skeleton />;
  }

  const totals = summary.data.reduce(
    (acc, item) => {
      acc.Females += item.femaleCases;
      acc.Males += item.maleCases;
      return acc;
    },
    {
      Females: 0,
      Males: 0,
    },
  );

  const chartData = Object.keys(totals).map((key) => ({
    group: key,
    value: totals[key as keyof typeof totals] / 1_000_000,
  }));

  return <PieChart data={chartData} config={{ height }} />;
}
