import { atom, selector } from 'recoil';
import themes from 'components/Themes';
import createStore from './createStore';

const themeName = atom({
  key: 'themeName',
  default: 'light',
});

const theme = selector({
  key: 'theme',
  get: ({ get }) => themes[get(themeName)] || themes.light,
});

const breakpoints = selector({
  key: 'breakpoints',
  get: ({ get }) => get(theme)?.breakpoints || [],
});

export default createStore({
  key: 'theme',
  version: 1,
  state: {
    themeName,
  },
  selectors: {
    theme,
    breakpoints,
  },
  effects: {

  },
  migrations: [

  ],
  persist: ['themeName'],
});
