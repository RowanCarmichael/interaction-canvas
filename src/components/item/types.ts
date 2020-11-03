import React from 'react';

type PositionType = {
  currentX: number;
  currentY: number;
  startX: number;
  startY: number;
  rotation: number;
};

export type ScaleOptionsType = {
  currentScaleX: number;
  currentScaleY: number;
  width: number;
  height: number;
  left: number;
  top: number;
} & PositionType;

export type ScalePositionOptionsType = {
  currentPosition: number;
  node: number;
} & PositionType;

export type EventType =
  | React.MouseEvent<HTMLDivElement, MouseEvent>
  | MouseEvent
  | React.TouchEvent<HTMLDivElement>
  | TouchEvent;

export type OuterStyleOptionsType = {
  itemExists: boolean;
  positionX: number;
  positionY: number;
  rotation: number;
  width: number;
  height: number;
  scaleX: number;
  scaleY: number;
};
