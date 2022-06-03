import type { Theme } from './types';
import light from './light';
import dark from './dark';

const themes: { [key: string]: Theme } = {
  light,
  dark,
};

export default themes;
