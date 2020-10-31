import styled, { css } from 'styled-components';

export const container = css`
  position: absolute;
  pointer-events: none;
  user-select: none;
  -webkit-user-drag: none;
`;

export const OuterContainer = styled('div')`
  ${container};

  &:focus,
  &:hover {
    outline: solid 2px;
  }
`;

export const InnerContainer = styled('div')<{ showOutline: boolean }>`
  ${container};
  transform-origin: 0 0;

  ${({ showOutline }) =>
    showOutline &&
    css`
      &:hover {
        outline: solid 2px;
      }
    `}
`;

export const ItemContainer = styled('div')`
  pointer-events: auto;
  cursor: move;
  display: flex;
  flex-direction: column;

  * {
    cursor: move;
  }
`;
