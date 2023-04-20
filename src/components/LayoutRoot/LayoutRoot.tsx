import { Layout, Typography, theme } from 'antd';
import { type PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './LayoutRoot.module.css';

const { useToken } = theme;
const { Header, Content } = Layout;
const { Title } = Typography;

type LayoutRootProps = PropsWithChildren;

export function LayoutRoot({ children }: LayoutRootProps) {
  const { token } = useToken();
  return (
    <Layout>
      <Header style={{ boxShadow: token.boxShadowTertiary }}>
        <div className={clsx(styles.container, styles.header)}>
          <Title level={3} style={{ marginBottom: 0 }}>
            App Title
          </Title>
        </div>
      </Header>
      <Content className={clsx(styles.container, styles.content)}>
        {children}
      </Content>
    </Layout>
  );
}
