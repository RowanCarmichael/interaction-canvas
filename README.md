# interaction-canvas

A simple React application to try out basic canvas manipulation (drag / scale / rotate) of items. Check out the [Demo](https://RowanCarmichael.github.io/interaction-canvas/) here!
Built using React, TypeScript and StyledComponents

### Use

Wrap any component/HTML element in the <code><Item></code> component. Any number of <code><Item></code> components can be wrapped by a <code><Canvas></code>

```js
<Canvas>
  <Item>
    <img src={logo} alt='logo' />
  </Item>
  <Item defaultPosition={{ x: 20, y: 20 }}>
    <p>
      Edit <code>src/App.js</code> and save to reload.
    </p>
  </Item>
  <Item>
    <AnyReactComponent ... />
  </Item>
</Canvas>
```

### Canvas PropTypes

- **children** (array of Item components) - any number of Item components (required)

### Item PropTypes

- **children** (array of React Elements) - any children (required)
- **defaultPosition** (<code>{ x: number, y: number }</code>) - relative starting position of the item (optional - default value is <code>{ x: 0, y: 0 }</code>)
