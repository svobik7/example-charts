import { Avatar, Button, Col, Row, Space, theme } from 'antd';
import {
  MdOutlineFavorite,
  MdOutlineFavoriteBorder,
  MdOutlineInsertComment,
} from 'react-icons/md';

import { useState, type ReactNode } from 'react';
import styles from './CardActions.module.css';
import Image from 'next/image';

const { useToken } = theme;

type ActionProps = {
  count?: number;
  isActiveDefault?: boolean;
  renderContent: (isActive: boolean) => ReactNode;
};

function Action({
  count = 0,
  isActiveDefault = false,
  renderContent,
}: ActionProps) {
  const [isActive, setIsActive] = useState(isActiveDefault);
  const { token } = useToken();
  return (
    <Button
      type="ghost"
      onClick={() => setIsActive((prev) => !prev)}
      style={{
        color: isActive ? token.colorPrimary : token.colorTextTertiary,
      }}
    >
      <Space size="small" align="start">
        {count > 0 && <span>{count}</span>}
        {renderContent(isActive)}
      </Space>
    </Button>
  );
}

export function CardActions() {
  return (
    <div className={styles.container}>
      <Row justify="space-between" gutter={32}>
        <Col>
          <Action
            renderContent={() => (
              <div className={styles.avatar}>
                <Image
                  src="/dummy-avatar.jpg"
                  alt="Picture of the author"
                  width={24}
                  height={24}
                />
              </div>
            )}
          />
        </Col>
        <Col>
          <Action
            renderContent={(isActive) =>
              isActive ? (
                <MdOutlineFavorite size="1.5rem" />
              ) : (
                <MdOutlineFavoriteBorder size="1.5rem" />
              )
            }
          />
        </Col>
        <Col>
          <Action
            count={3}
            renderContent={() => <MdOutlineInsertComment size="1.5rem" />}
          />
        </Col>
      </Row>
    </div>
  );
}
