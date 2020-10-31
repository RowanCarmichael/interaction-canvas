import styled, { css } from 'styled-components';

export const Container = styled('div')`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
`;

const controlSize = 16;

const control = css`
  position: absolute;
  pointer-events: auto;
  width: ${controlSize}px;
  height: ${controlSize}px;
  background: white;
  border-radius: 50%;
`;

export const TopLeft = styled('div')`
  ${control};
  top: -${controlSize / 2}px;
  left: -${controlSize / 2}px;
  cursor: se-resize;
`;

export const TopRight = styled('div')`
  ${control};
  top: -${controlSize / 2}px;
  right: -${controlSize / 2}px;
  cursor: sw-resize;
`;

export const BottomLeft = styled('div')`
  ${control};
  bottom: -${controlSize / 2}px;
  left: -${controlSize / 2}px;
  cursor: sw-resize;
`;

export const BottomRight = styled('div')`
  ${control};
  bottom: -${controlSize / 2}px;
  right: -${controlSize / 2}px;
  cursor: se-resize;
`;

export const Rotator = styled('div')`
  ${control};
  top: calc(50% - ${controlSize / 2}px);
  left: calc(50% - ${controlSize / 2}px);
  cursor: grabbing;

  img {
    display: block;
  }
`;
