import React from 'react';
import { Container, TopLeft, TopRight, BottomLeft, BottomRight, Rotator } from './styles';
import loop from '../../../loop.svg';

export type ControlsProps = {
  onScaleMouseDown: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, top: boolean, left: boolean) => void;
  onRotateMouseDown: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const Controls: React.FC<ControlsProps> = ({ onScaleMouseDown, onRotateMouseDown }) => (
  <Container>
    <TopLeft onMouseDown={(event) => onScaleMouseDown(event, true, true)} />
    <TopRight onMouseDown={(event) => onScaleMouseDown(event, true, false)} />
    <BottomLeft onMouseDown={(event) => onScaleMouseDown(event, false, true)} />
    <BottomRight onMouseDown={(event) => onScaleMouseDown(event, false, false)} />
    <Rotator onMouseDown={onRotateMouseDown}>
      <img src={loop} alt='rotate' draggable={false} />
    </Rotator>
  </Container>
);

export default Controls;
