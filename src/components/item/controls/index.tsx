import React from 'react';
import { EventType } from '../helpers'
import { Container, TopLeft, TopRight, BottomLeft, BottomRight, Rotator } from './styles';
import loop from '../../../loop.svg';

export type ControlsProps = {
  onScaleMouseDown: (event: EventType, top: boolean, left: boolean) => void;
  onRotateMouseDown: (event: EventType) => void;
};

const Controls: React.FC<ControlsProps> = ({ onScaleMouseDown, onRotateMouseDown }) => {
  const onTopLeftMouseDown = (event: EventType) => onScaleMouseDown(event, true, true)
  const onTopRightMouseDown = (event: EventType) => onScaleMouseDown(event, true, false)
  const onBottomLeftMouseDown = (event: EventType) => onScaleMouseDown(event, false, true)
  const onBottomRightMouseDown = (event: EventType) => onScaleMouseDown(event, false, false)

  return (
  <Container>
    <TopLeft onMouseDown={onTopLeftMouseDown} onTouchStart={onTopLeftMouseDown} />
    <TopRight onMouseDown={onTopRightMouseDown} onTouchStart={onTopRightMouseDown} />
    <BottomLeft onMouseDown={onBottomLeftMouseDown} onTouchStart={onBottomLeftMouseDown} />
    <BottomRight onMouseDown={onBottomRightMouseDown} onTouchStart={onBottomRightMouseDown} />
    <Rotator onMouseDown={onRotateMouseDown} onTouchStart={onRotateMouseDown}>
      <img src={loop} alt='rotate' draggable={false} />
    </Rotator>
  </Container>
)};

export default Controls;
