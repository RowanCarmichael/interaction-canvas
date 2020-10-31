import React from 'react';
import { ItemProps } from '../item';
import { Container } from './styles';

export type CanvasProps = {
  children: React.ReactElement<ItemProps> | React.ReactElement<ItemProps>[];
};

const Canvas: React.FC<CanvasProps> = ({ children }) => <Container>{children}</Container>;

export default Canvas;
