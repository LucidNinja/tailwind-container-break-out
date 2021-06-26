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

const breakOutOfContainer = plugin(function ({ addUtilities, theme }) {
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
      return {
        [`margin${xAxis}`]: `-${paddingConfig.padding}`
      };
    }

    if (!paddingConfig) {
      return {
        [`margin${xAxis}`]: `calc(-100vw / 2 + ${minWidth} / 2 )`
      };
    }

    return {
      [`margin${xAxis}`]: `calc(-100vw / 2 + ${minWidth} / 2 - ${paddingConfig.padding} )`
    };
  };

  const atRules = _(minWidths)
    .sortBy(minWidth => parseInt(minWidth))
    .sortedUniq()
    .map(minWidth => {
      return {
        [`@media (min-width: ${minWidth})`]: {
          '.pull-left': {
            ...generateMarginFor(minWidth, 'Left')
          },
          '.pull-right': {
            ...generateMarginFor(minWidth, 'Right')
          }
        }
      };
    })
    .value();

  addUtilities([
    {
      '.pull-left': Object.assign(generateMarginFor(0, 'Left'))
    },
    {
      '.pull-right': Object.assign(generateMarginFor(0, 'Right'))
    },
    ...atRules
  ]);
});

module.exports = breakOutOfContainer;
