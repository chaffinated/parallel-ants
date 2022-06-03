import { baseColors, generateColors } from '../colors';

test('[themes] generates colors', () => {
  const palette = generateColors();
  Object.keys(baseColors).forEach(colorName => {
    const originalColor = baseColors[colorName].toLowerCase();
    const colorVariant = palette[`${colorName}s`][2].toLowerCase();
    expect(originalColor).toEqual(colorVariant);
  });
});
