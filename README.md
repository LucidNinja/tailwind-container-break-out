# Tailwind Container Break Out

This is a TailwindCSS plugin that is used to 'break' out of the Tailwind `.container` class. It works seamlessly with any container padding customisations or custom breakpoints that are set within your `tailwind.config.js`.

For best results, set your `.container` to center mode in your `tailwind.config.js`, or use `mx-auto` whenever you use the `.container` class. 

The `pull-{left|right}` classes can be used anywhere inside of a container. However, these are simple utilities that only calculate the negative margins needed for an element to 'break out' at each responsive break point - they do not account for any extra padding or margins that have been added to your markup.

## Example

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

### Use the `pull-left` and `pull-right` classes in your markup.

- Full width break out

```
// example-full-width-break-out.html

<div class="container">
  <h1>This content is in a container</h1>
  <div class="pull-left pull-right">
    <img src="example.jpg" class="w-full" />
    <p>This whole div will expand beyond the container on both the left and right.</p>
  </div>
</div>
```

- Break out on one side only

```
// example-half-width-break-out.html

<div class="container grid grid-cols-2">
  <div>
    <h1>This content is in a container, and sits on the left side of the grid.</h1>
  </div>
  <div>
    <div class="pull-right">
      <img src="example.jpg" class="w-full" />
      <p>This div will expand beyond the container on the right hand side.</p>
    </div>
  </div>
</div>
```

## Working example with NextJS

See working example on Codesandbox [here](https://codesandbox.io/s/patient-firefly-2ldnj?file=/pages/index.js).
