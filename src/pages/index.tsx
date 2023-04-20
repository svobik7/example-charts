import { Button } from '@/components/Button/Button';
import { Card } from '@/components/Card/Card';
import { ChartCases } from '@/components/ChartByYears/ChartByYears';
import { ChartTotal } from '@/components/ChartTotal/ChartTotal';
import { LayoutPage } from '@/components/LayoutPage/LayoutPage';
import { Col, Row } from 'antd';
import { HiOutlineDownload, HiOutlineMenuAlt2 } from 'react-icons/hi';
import { IoFilter } from 'react-icons/io5';

export default function Index() {
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
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <Card title="By years [in millions]">
            <ChartCases height={300} />
          </Card>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <Card title="Total [in millions]">
            <ChartTotal height={300} />
          </Card>
        </Col>
      </Row>
    </LayoutPage>
  );
}
