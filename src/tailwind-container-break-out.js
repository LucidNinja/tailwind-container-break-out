const plugin = require('tailwindcss/plugin');

function normalizeScreens(screens, root = true) {
  if (Array.isArray(screens)) {
    return screens.map(screen => {
      if (root && Array.isArray(screen)) {
        throw new Error('The tuple syntax is not supported for `screens`.');
      }

      if (typeof screen === 'string') {
        return { name: screen.toString(), values: [{ min: screen, max: undefined }] };
      }

      let [name, options] = screen;
      name = name.toString();

      if (typeof options === 'string') {
        return { name, values: [{ min: options, max: undefined }] };
      }

      if (Array.isArray(options)) {
        return { name, values: options.map(option => resolveValue(option)) };
      }

      return { name, values: [resolveValue(options)] };
    });
  }

  return normalizeScreens(Object.entries(screens ?? {}), false);
}

function resolveValue({ 'min-width': _minWidth, min = _minWidth, max, raw } = {}) {
  return { min, max, raw };
}

function extractMinWidths(breakpoints = []) {
  return breakpoints
    .flatMap(breakpoint => breakpoint.values.map(breakpoint => breakpoint.min))
    .filter(v => v !== undefined);
}

function mapMinWidthsToPadding(minWidths, screens, paddings) {
  if (typeof paddings === 'undefined') {
    return [];
  }

  if (!(typeof paddings === 'object' && paddings !== null)) {
    return [
      {
        screen: 'DEFAULT',
        minWidth: 0,
        padding: paddings
      }
    ];
  }

  let mapping = [];

  if (paddings.DEFAULT) {
    mapping.push({
      screen: 'DEFAULT',
      minWidth: 0,
      padding: paddings.DEFAULT
    });
  }

  let lastNonNullPadding = null;

  for (let minWidth of minWidths) {
    for (let screen of screens) {
      for (let { min } of screen.values) {
        if (min === minWidth) {
          const paddingForScreenName = paddings[screen.name];
          if (paddingForScreenName !== undefined) {
            mapping.push({ minWidth, padding: paddingForScreenName });
            lastNonNullPadding = paddingForScreenName;
          } else if (lastNonNullPadding !== null) {
            mapping.push({ minWidth, padding: lastNonNullPadding });
          }
        }
      }
    }
  }

  return mapping;
}

module.exports = plugin(function ({ addComponents, addBase, theme }) {
  const screens = normalizeScreens(theme('container.screens', theme('screens')));
  const minWidths = extractMinWidths(screens);
  const paddings = mapMinWidthsToPadding(minWidths, screens, theme('container.padding'));

  // TODO - account for non-centered containers.
  const generateMarginFor = (minWidth, xAxis) => {
    let paddingConfig;
    if (paddings.length === 1) {
      paddingConfig = paddings[0];
    } else {
      paddingConfig = paddings.find(padding => `${padding.minWidth}` === `${minWidth}`);
    }

    // If the minWidth is zero (screen size is more than zero), there's no need to do complex calc.
    if (minWidth === 0) {
      if (!paddingConfig) {
        return {};
      }
      if (xAxis === 'x') {
        return {
          marginLeft: `-${paddingConfig.padding}`,
          marginRight: `-${paddingConfig.padding}`
        };
      }
      if (xAxis === 'r') {
        return {
          marginRight: `-${paddingConfig.padding}`
        };
      }
      if (xAxis === 'l') {
        return {
          marginLeft: `-${paddingConfig.padding}`
        };
      }
    }

    // If there is a minWidth, but there's no padding config, just do calc but don't worry about the padding.
    if (!paddingConfig) {
      if (xAxis === 'x') {
        return {
          marginLeft: `calc((-100vw + var(--twcb-scrollbar-width)) / 2 + ${minWidth} / 2 )`,
          marginRight: `calc((-100vw + var(--twcb-scrollbar-width)) / 2 + ${minWidth} / 2 )`
        };
      }
      if (xAxis === 'r') {
        return {
          marginRight: `calc((-100vw + var(--twcb-scrollbar-width)) / 2 + ${minWidth} / 2 )`
        };
      }
      if (xAxis === 'l') {
        return {
          marginLeft: `calc((-100vw + var(--twcb-scrollbar-width)) / 2 + ${minWidth} / 2 )`
        };
      }
    }

    // If there is a padding config and there is a minWidth, do complex calc.
    if (xAxis === 'x') {
      return {
        marginLeft: `calc((-100vw + var(--twcb-scrollbar-width)) / 2 + ${minWidth} / 2 - ${paddingConfig.padding} )`,
        marginRight: `calc((-100vw + var(--twcb-scrollbar-width)) / 2 + ${minWidth} / 2 - ${paddingConfig.padding} )`
      };
    }
    if (xAxis === 'r') {
      return {
        marginRight: `calc((-100vw + var(--twcb-scrollbar-width)) / 2 + ${minWidth} / 2 - ${paddingConfig.padding} )`
      };
    }
    if (xAxis === 'l') {
      return {
        marginLeft: `calc((-100vw + var(--twcb-scrollbar-width)) / 2 + ${minWidth} / 2 - ${paddingConfig.padding} )`
      };
    }
  };

  const generatePaddingFor = (minWidth, xAxis) => {
    let paddingConfig;
    if (paddings.length === 1) {
      paddingConfig = paddings[0];
    } else {
      paddingConfig = paddings.find(padding => `${padding.minWidth}` === `${minWidth}`);
    }

    if (minWidth === 0) {
      if (!paddingConfig) {
        return {};
      }
      if (xAxis === 'x') {
        return {
          paddingLeft: `${paddingConfig.padding}`,
          paddingRight: `${paddingConfig.padding}`
        };
      }
      if (xAxis === 'r') {
        return {
          paddingRight: `${paddingConfig.padding}`
        };
      }
      if (xAxis === 'l') {
        return {
          paddingLeft: `${paddingConfig.padding}`
        };
      }
    }

    if (!paddingConfig) {
      if (xAxis === 'x') {
        return {
          paddingLeft: `calc((100vw - var(--twcb-scrollbar-width)) / 2 - ${minWidth} / 2 )`,
          paddingRight: `calc((100vw - var(--twcb-scrollbar-width)) / 2 - ${minWidth} / 2 )`
        };
      }
      if (xAxis === 'r') {
        return {
          paddingRight: `calc((100vw - var(--twcb-scrollbar-width)) / 2 - ${minWidth} / 2 )`
        };
      }
      if (xAxis === 'l') {
        return {
          paddingLeft: `calc((100vw - var(--twcb-scrollbar-width)) / 2 - ${minWidth} / 2 )`
        };
      }
    }

    if (xAxis === 'x') {
      return {
        paddingLeft: `calc((100vw - var(--twcb-scrollbar-width)) / 2 - ${minWidth} / 2 + ${paddingConfig.padding} )`,
        paddingRight: `calc((100vw - var(--twcb-scrollbar-width)) / 2 - ${minWidth} / 2 + ${paddingConfig.padding} )`
      };
    }
    if (xAxis === 'r') {
      return {
        paddingRight: `calc((100vw - var(--twcb-scrollbar-width)) / 2 - ${minWidth} / 2 + ${paddingConfig.padding} )`
      };
    }
    if (xAxis === 'l') {
      return {
        paddingLeft: `calc((100vw - var(--twcb-scrollbar-width)) / 2 - ${minWidth} / 2 + ${paddingConfig.padding} )`
      };
    }
  };

  const atRules = Array.from(new Set(minWidths.slice().sort((a, z) => parseInt(a) - parseInt(z)))).map(
    (minWidth, i) => {
      return {
        [`@media (min-width: ${minWidth})`]: {
          '.mx-break-out': {
            ...generateMarginFor(minWidth, 'x')
          },
          '.ml-break-out': {
            ...generateMarginFor(minWidth, 'l')
          },
          '.mr-break-out': {
            ...generateMarginFor(minWidth, 'r')
          },
          '.px-break-out': {
            ...generatePaddingFor(minWidth, 'x')
          },
          '.pl-break-out': {
            ...generatePaddingFor(minWidth, 'l')
          },
          '.pr-break-out': {
            ...generatePaddingFor(minWidth, 'r')
          }
        }
      };
    }
  );

  addBase({
    ':root': {
      '--twcb-scrollbar-width': '0px'
    }
  });

  addComponents([
    {
      '.mx-break-out': generateMarginFor(0, 'x')
    },
    {
      '.ml-break-out': generateMarginFor(0, 'l')
    },
    {
      '.mr-break-out': generateMarginFor(0, 'r')
    },
    {
      '.px-break-out': generatePaddingFor(0, 'x')
    },
    {
      '.pl-break-out': generatePaddingFor(0, 'l')
    },
    {
      '.pr-break-out': generatePaddingFor(0, 'r')
    },
    ...atRules
  ]);
});
