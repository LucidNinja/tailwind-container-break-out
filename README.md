# Tailwind Container Break Out

This is a TailwindCSS plugin that is used to 'break' child elements out of the Tailwind `.container` class. It works with any container padding customisations or custom breakpoints that are set within your `tailwind.config.js`.

For best results, set your `.container` to center mode in your `tailwind.config.js`, or use `mx-auto` whenever you use the `.container` class.

The `m{l|r|x}-break-out` and `p{l|r|x}-break-out` classes can be used anywhere inside of a container, but for the most reliable results, apply them to a direct child of `.container`.

These classes are simple utilities that calculate the negative margins (and inner padding, where required) needed for an element to 'break out' of the container at each responsive break point - they do not account for any extra padding or margins that have been added to your markup.

## Installation

`npm i tailwind-container-break-out`

## Quick Start

### Require the plugin in your tailwind.config.js

```
// tailwind.config.js

module.exports = {
  theme: {
    container: {
      center: true,
      padding: '1rem'
    },
  },
  plugins: [require('tailwind-container-break-out')]
};

```

### Use the `m{l|r|x}-break-out` and `p{l|r|x}-break-out` classes in your markup.

- Full width break out

```
<div class="container">
  <h1>This content is in a container</h1>
  <div class="mx-break-out">
    <img src="example.jpg" class="w-full" />
    <p>This whole div will expand beyond the container on both the left and right.</p>
  </div>
</div>
```

- Break out on one side only

```
<div class="container grid grid-cols-2">
  <div>
    <h1>This content is in a container, and sits on the left side of the grid.</h1>
  </div>
  <div class="mr-break-out">
    <img src="example.jpg" class="w-full" />
    <p>This div will expand beyond the container on the right hand side.</p>
  </div>
</div>
```

- Break out on one side only, with `p{l|r|x}-break-out` classes to keep inner content in line with `.container`

```
<div class="container grid grid-cols-2">
  <div class="bg-green-500 ml-break-out pl-break-out">
    <h1>This content is in a container, and sits on the left side of the grid.</h1>
    <p>The background color will break out of the `.container` but this text will align to the `.container` edge.
  </div>
  <div class="mr-break-out>
    <img src="example.jpg" class="w-full" />
    <p>This div will expand beyond the container on the right hand side.</p>
  </div>
</div>
```

## Examples

![Tailwind Container Break Out Examples](./examples/examples.png?raw=true 'Tailwind Container Break Out Examples')

## Working example with NextJS

See working example on Codesandbox [here](https://codesandbox.io/s/sharp-andras-60kl4?file=/pages/index.js:1808-1812).
