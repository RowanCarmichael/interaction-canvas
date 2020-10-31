import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  background-color: #282c34;
  height: 100vh;
  width: 100vw;
  font-size: calc(10px + 2vmin);
  color: white;
  white-space: nowrap;

  p {
    margin: 0;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Image = styled.img`
  height: 40vmin;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${rotate} infinite 20s linear;
  }
`;

export const Link = styled.a`
  color: #61dafb;
`;
