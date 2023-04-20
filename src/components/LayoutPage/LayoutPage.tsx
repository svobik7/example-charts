import { Col, Row, Space, Typography } from 'antd';
import type { PropsWithChildren, ReactNode } from 'react';
import styles from './LayoutPage.module.css';

const { Title } = Typography;

type LayoutPageProps = PropsWithChildren<{
  title: string;
  toolbar: ReactNode;
}>;

export function LayoutPage({ title, toolbar, children }: LayoutPageProps) {
  return (
    <div className={styles.page}>
      <Row gutter={[32, 16]} justify="space-between">
        <Col xs={{ span: 24 }} md={{ span: 8 }}>
          <Title level={4}>{title}</Title>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 16 }} className={styles.toolbar}>
          <Space size="middle" align="end" wrap>
            {toolbar}
          </Space>
        </Col>
        <Col span={24}>{children}</Col>
      </Row>
    </div>
  );
}
