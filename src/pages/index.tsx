import { Button } from '@/components/Button/Button';
import { Card } from '@/components/Card/Card';
import { Chart } from '@/components/Chart/Chart';
import { LayoutPage } from '@/components/LayoutPage/LayoutPage';
import { Col, Row } from 'antd';
import { HiOutlineDownload, HiOutlineMenuAlt2 } from 'react-icons/hi';
import { IoFilter } from 'react-icons/io5';

export default function Index() {
  return (
    <LayoutPage
      title="Page Title"
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
          <Card title="Card Title">
            <Chart />
          </Card>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <Card title="Card Title">
            <Chart />
          </Card>
        </Col>
      </Row>
    </LayoutPage>
  );
}
