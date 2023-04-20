import { Button } from '@/components/Button/Button';
import { CardActions } from '@/components/CardActions.tsx/CardActions';
import { ChartCases } from '@/components/ChartByYears/ChartByYears';
import { ChartTotal } from '@/components/ChartTotal/ChartTotal';
import { LayoutPage } from '@/components/LayoutPage/LayoutPage';
import { getFavorites } from '@/libs/node-storage';
import { trpc } from '@/utils/trpcUtils';
import { Card, Col, Row } from 'antd';
import type { InferGetStaticPropsType } from 'next';
import { HiOutlineDownload, HiOutlineMenuAlt2 } from 'react-icons/hi';
import { IoFilter } from 'react-icons/io5';

const charts = [
  {
    id: 'chart-years',
    title: 'By years [in millions]',
    component: <ChartCases height={300} />,
  },
  {
    id: 'chart-total',
    title: 'Total [in millions]',
    component: <ChartTotal height={300} />,
  },
];

export default function Index({
  favorites,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const setFavorite = trpc.putFavorite.useMutation();
  return (
    <LayoutPage
      title="Covid19 statistics"
      toolbar={[
        <Button
          key="btn-export"
          label="Export to PDF"
          iconRight={<HiOutlineDownload />}
        />,
        <Button
          key="btn-notes"
          label="Notes"
          numberRight={3}
          iconRight={<HiOutlineMenuAlt2 />}
        />,
        <Button
          key="btn-filter"
          label="Filter"
          iconRight={<IoFilter />}
          badge={10}
        />,
      ]}
    >
      <Row gutter={[32, 16]} justify="space-between">
        {charts.map((c) => (
          <Col key={c.id} xs={{ span: 24 }} md={{ span: 12 }}>
            <Card
              title={c.title}
              actions={[
                <CardActions
                  isFavoriteActive={favorites[c.id] ?? false}
                  onFavoriteChange={(isActive) =>
                    setFavorite.mutate({ id: c.id, value: isActive })
                  }
                />,
              ]}
            >
              {c.component}
            </Card>
          </Col>
        ))}
      </Row>
    </LayoutPage>
  );
}

export async function getStaticProps() {
  const favorites = await getFavorites();
  return {
    props: {
      favorites,
    },
  };
}
