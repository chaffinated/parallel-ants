import range from 'lodash-es/range';
import chroma from 'chroma-js';
import { ButtonProps } from 'components/Button';
import type { Colors } from './types';

/* === Colors === */
interface BaseColors {
  red?: string;
  orange?: string;
  yellow?: string;
  green?: string;
  blue?: string;
  violet?: string;
  [key: string]: any;
}

export const baseColors: BaseColors = {
  white: '#FFFFFF',
  black: '#404c56',
  red: '#F45B69',
  orange: '#FC7753',
  yellow: '#FBD97A',
  green: '#59C3C3',
  blue: '#4062BB',
  violet: '#52489C',
};

export const generateColors = (newBaseColors?: BaseColors, numberVariations = 5) => {
  const colors = Object.assign({}, baseColors, newBaseColors);
  const half = Math.floor(numberVariations / 2);
  const r = range(0, numberVariations);
  const variants = Object.keys(colors).reduce((memo, colorName) => {
    const color = colors[colorName];
    memo[`${colorName}s`] = r.map((i) => chroma(color).saturate(i - half).brighten(i - half).hex())
    return memo;
  }, colors);
  return variants;
};

/* === Buttons === */
export const makeButtonVariant = (
  colors: Colors,
  buttonProps: ButtonProps,
  brightness = 1.1,
  saturation = 1.1
): ButtonProps => {
  const backgroundColor = buttonProps.backgroundColor || colors.white;
  return {
    borderStyle: 'solid',
    lineHeight: [2, 3],
    fontSize: [2],
    fontWeight: [4],
    borderRadius: [3],
    minWidth: [1, 1, 2],
    padding: [3],
    my: [2, 2, 3],
    transition: 'all 140ms linear',
    textTransform: 'uppercase',
    '&:hover': {
      backgroundColor: chroma(backgroundColor).brighten(brightness).saturate(saturation).hex(),
      borderColor: chroma(backgroundColor).brighten(brightness).saturate(saturation).hex(),
    },
    ...buttonProps,
  };
};
