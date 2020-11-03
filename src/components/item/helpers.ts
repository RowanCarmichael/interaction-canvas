import { EventType, OuterStyleOptionsType, ScaleOptionsType, ScalePositionOptionsType } from './types';

const toRadians = (degree: number) => (degree * Math.PI) / 180;
const convertX = (x: number, y: number, degree: number) =>
  x * Math.cos(toRadians(degree)) + y * Math.sin(toRadians(degree));
const convertY = (x: number, y: number, degree: number) =>
  y * Math.cos(toRadians(degree)) - x * Math.sin(toRadians(degree));

export const getScale = ({
  currentScaleX,
  currentScaleY,
  currentX,
  currentY,
  startX,
  startY,
  rotation,
  width,
  height,
  left,
  top,
}: ScaleOptionsType) => ({
  scaleX:
    currentScaleX + ((convertX(currentX, currentY, rotation) - convertX(startX, startY, rotation)) / width) * -left,
  scaleY:
    currentScaleY + ((convertY(currentX, currentY, rotation) - convertY(startX, startY, rotation)) / height) * -top,
});

export const getScalePositionX = ({
  currentPosition,
  node,
  currentX,
  currentY,
  startX,
  startY,
  rotation,
}: ScalePositionOptionsType) => {
  const deltaX = startX - currentX;
  const deltaY = startY - currentY;
  const radians = toRadians(rotation);

  return currentPosition - deltaX * ((Math.cos(radians) + node) / (node * 2)) - (node * Math.sin(radians) * deltaY) / 2;
};

export const getScalePositionY = ({
  currentPosition,
  node,
  currentX,
  currentY,
  startX,
  startY,
  rotation,
}: ScalePositionOptionsType) => {
  const deltaX = startX - currentX;
  const deltaY = startY - currentY;
  const radians = toRadians(rotation);

  return currentPosition + (node * Math.sin(radians) * deltaX) / 2 - deltaY * ((Math.cos(radians) + node) / (node * 2));
};

export const getRotation = (startX: number, startY: number, currentX: number, currentY: number) =>
  (Math.atan2(startY - currentY, startX - currentX) * 180) / Math.PI + 90;

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
});

export const getEventCoordinates = (event: EventType) =>
  'touches' in event
    ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
    : { x: event.clientX, y: event.clientY };
