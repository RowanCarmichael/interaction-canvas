import React from 'react'

export const getScale = (currentScale: number, delta: number, size: number, inverse: boolean) => {
  return currentScale + (delta / size) * (inverse ? -1 : 1);
};

export const getRotation = (startX: number, startY: number, currentX: number, currentY: number) =>
  (Math.atan2(startY - currentY, startX - currentX) * 180) / Math.PI + 90;

type OuterStyleOptionsType = {
  itemExists: boolean;
  positionX: number;
  positionY: number;
  rotation: number;
  width: number;
  height: number;
  scaleX: number;
  scaleY: number;
};

export const getOuterStyles = ({
  itemExists,
  positionX,
  positionY,
  rotation,
  width,
  height,
  scaleX,
  scaleY,
}: OuterStyleOptionsType) => ({
  transform: `translate(${positionX}px, ${positionY}px) rotate(${rotation}deg)`,
  width: itemExists ? width * scaleX : 0,
  height: itemExists ? height * scaleY : 0,
  transformOrigin: itemExists ? `${(width * scaleX) / 2}px ${(height * scaleY) / 2}px` : 'center',
});

export type EventType = React.MouseEvent<HTMLDivElement, MouseEvent> | MouseEvent | React.TouchEvent<HTMLDivElement> | TouchEvent

export const getEventCoordinates = (event: EventType) => (
  'touches' in event ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : { x: event.clientX, y: event.clientY }
)
