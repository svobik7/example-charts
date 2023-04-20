import { Badge, Button as ButtonBase, Space, theme } from 'antd';
import type { ReactNode } from 'react';

import styles from './Button.module.css';

const { useToken } = theme;

type ButtonProps = {
  label: string;
  numberRight?: number;
  iconRight?: ReactNode;
  badge?: number;
  onClick?: () => void;
};

export function Button({
  label,
  numberRight,
  iconRight,
  badge,
  onClick,
}: ButtonProps) {
  const { token } = useToken();
  return (
    <ButtonBase type="default" onClick={onClick}>
      <Space size="small" align="center">
        {label}
        {numberRight !== undefined && (
          <span style={{ color: token.colorTextTertiary }}>
            ({numberRight})
          </span>
        )}
        {badge !== undefined && (
          <Badge
            size="small"
            count={badge}
            overflowCount={9}
            color={token.colorPrimary}
          />
        )}
        {iconRight !== undefined && (
          <span className={styles.icon} style={{ color: token.colorPrimary }}>
            {iconRight}
          </span>
        )}
      </Space>
    </ButtonBase>
  );
}
