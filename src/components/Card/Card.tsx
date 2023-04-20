import { Card as CardBase } from 'antd';
import type { PropsWithChildren } from 'react';
import { CardActions } from '../CardActions.tsx/CardActions';

type CardProps = PropsWithChildren<{ title: string }>;

export function Card({ children, title }: CardProps) {
  return (
    <CardBase title={title} actions={[<CardActions />]}>
      {children}
    </CardBase>
  );
}
