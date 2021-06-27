const _ = require('lodash');
const plugin = require('tailwindcss/plugin');

function extractMinWidths(breakpoints) {
  return _.flatMap(breakpoints, breakpoints => {
    if (_.isString(breakpoints)) {
      breakpoints = { min: breakpoints };
    }

    if (!Array.isArray(breakpoints)) {
      breakpoints = [breakpoints];
    }

    return _(breakpoints)
      .filter(breakpoint => {
        return _.has(breakpoint, 'min') || _.has(breakpoint, 'min-width');
      })
      .map(breakpoint => {
        return _.get(breakpoint, 'min-width', breakpoint.min);
      })
      .value();
  });
}

function mapMinWidthsToPadding(minWidths, screens, paddings) {
  if (typeof paddings === 'undefined') {
    return [];
  }

  if (!_.isObject(paddings)) {
    return [
      {
        screen: 'DEFAULT',
        minWidth: 0,
        padding: paddings
      }
    ];
  }

  const mapping = [];

  if (paddings.DEFAULT) {
    mapping.push({
      screen: 'DEFAULT',
      minWidth: 0,
      padding: paddings.DEFAULT
    });
  }

  _.each(minWidths, minWidth => {
    Object.keys(screens).forEach(screen => {
      const screenMinWidth = _.isPlainObject(screens[screen])
        ? screens[screen].min || screens[screen]['min-width']
        : screens[screen];

      if (`${screenMinWidth}` === `${minWidth}`) {
        mapping.push({
          screen,
          minWidth,
          padding: paddings[screen]
        });
      }
    });
  });

  return mapping;
}

module.exports = plugin(function ({ addUtilities, theme }) {
  const screens = theme('container.screens', theme('screens'));
  const minWidths = extractMinWidths(screens);
  const paddings = mapMinWidthsToPadding(minWidths, screens, theme('container.padding'));

  // TODO - account for non-centered containers.
  const generateMarginFor = (minWidth, xAxis) => {
    let paddingConfig;
    if (paddings.length === 1) {
      paddingConfig = paddings[0];
    } else {
      paddingConfig = _.find(paddings, padding => `${padding.minWidth}` === `${minWidth}`);
    }

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
      return {
        [`margin${xAxis}`]: `-${paddingConfig.padding}`
      };
    }

    if (!paddingConfig) {
      if (xAxis === 'x') {
        return {
          marginLeft: `calc(-100vw / 2 + ${minWidth} / 2 )`,
          marginRight: `calc(-100vw / 2 + ${minWidth} / 2 )`
        };
      }
      return {
        [`margin${xAxis}`]: `calc(-100vw / 2 + ${minWidth} / 2 )`
      };
    }

    if (xAxis === 'x') {
      return {
        marginLeft: `calc(-100vw / 2 + ${minWidth} / 2 - ${paddingConfig.padding} )`,
        marginRight: `calc(-100vw / 2 + ${minWidth} / 2 - ${paddingConfig.padding} )`
      };
    }

    return {
      [`margin${xAxis}`]: `calc(-100vw / 2 + ${minWidth} / 2 - ${paddingConfig.padding} )`
    };
  };

  const generatePaddingFor = (minWidth, xAxis) => {
    let paddingConfig;
    if (paddings.length === 1) {
      paddingConfig = paddings[0];
    } else {
      paddingConfig = _.find(paddings, padding => `${padding.minWidth}` === `${minWidth}`);
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
      return {
        [`padding${xAxis}`]: `${paddingConfig.padding}`
      };
    }

    if (!paddingConfig) {
      if (xAxis === 'x') {
        return {
          paddingLeft: `calc(100vw / 2 - ${minWidth} / 2 )`,
          paddingRight: `calc(100vw / 2 - ${minWidth} / 2 )`
        };
      }
      return {
        [`padding${xAxis}`]: `calc(100vw / 2 - ${minWidth} / 2 )`
      };
    }

    if (xAxis === 'x') {
      return {
        paddingLeft: `calc(100vw / 2 - ${minWidth} / 2 + ${paddingConfig.padding} )`,
        paddingRight: `calc(100vw / 2 - ${minWidth} / 2 + ${paddingConfig.padding} )`
      };
    }

    return {
      [`padding${xAxis}`]: `calc(100vw / 2 - ${minWidth} / 2 + ${paddingConfig.padding} )`
    };
  };

  const atRules = _(minWidths)
    .sortBy(minWidth => parseInt(minWidth))
    .sortedUniq()
    .map(minWidth => {
      return {
        [`@media (min-width: ${minWidth})`]: {
          '.ml-break-out': {
            ...generateMarginFor(minWidth, 'Left')
          },
          '.mr-break-out': {
            ...generateMarginFor(minWidth, 'Right')
          },
          '.mx-break-out': {
            ...generateMarginFor(minWidth, 'x')
          },
          '.pl-break-out': {
            ...generatePaddingFor(minWidth, 'Left')
          },
          '.pr-break-out': {
            ...generatePaddingFor(minWidth, 'Right')
          },
          '.px-break-out': {
            ...generatePaddingFor(minWidth, 'x')
          }
        }
      };
    })
    .value();

  addUtilities([
    {
      '.ml-break-out': Object.assign(generateMarginFor(0, 'Left'))
    },
    {
      '.mr-break-out': Object.assign(generateMarginFor(0, 'Right'))
    },
    {
      '.mx-break-out': Object.assign(generateMarginFor(0, 'x'))
    },
    {
      '.pl-break-out': Object.assign(generatePaddingFor(0, 'Left'))
    },
    {
      '.pr-break-out': Object.assign(generatePaddingFor(0, 'Right'))
    },
    {
      '.px-break-out': Object.assign(generatePaddingFor(0, 'x'))
    },
    ...atRules
  ]);
});
