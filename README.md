# Tailwind Container Break Out

This is a TailwindCSS plugin that is used to 'break' out of the Tailwind `.container` class. It works seamlessly with your container padding customisations within `tailwind.config.js`. 

> Note: for best results, set your `.container` to center mode, or use `mx-auto` on your containers.

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

* Full width break out

```
// example-full-width-break-out.html

<div class="container">
  <h1>This content is in a container</h1>
  <div class="pull-left pull-right">
    <img src="example.jpg" class="w-full />
    <p>This whole div will expand beyond the container on both the left and right.</p>
  </div>
</div>
```

* Break out on one side only

```
// example-half-width-break-out.html

<div class="container grid grid-cols-2">
  <div>
    <h1>This content is in a container, and sits on the left side of the grid.</h1>
  </div>
  <div>
    <div class="pull-left pull-right">
      <img src="example.jpg" class="w-full" />
      <p>This div will expand beyond the container on both the right hand side.</p>
    </div>
  </div>
</div>
```