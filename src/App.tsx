import React from 'react';
import logo from './logo.svg';
import Canvas from './components/canvas';
import Item from './components/item';
import { Container, Image, Link } from './styles';

const centerPosition = {
  x: window.innerWidth / 2 - Math.min(window.innerWidth, window.innerHeight) * 0.2,
  y: window.innerHeight / 2 - Math.min(window.innerWidth, window.innerHeight) * 0.2,
};

const App = () => (
  <Container>
    <Canvas>
      <Item defaultPosition={centerPosition}>
        <Image src={logo} alt='logo' />
      </Item>
      <Item defaultPosition={{ x: 20, y: 20 }}>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </Item>
      <Item defaultPosition={{ x: 20, y: 60 }}>
        <Link href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </Link>
      </Item>
    </Canvas>
  </Container>
);

export default App;
