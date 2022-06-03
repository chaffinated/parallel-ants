import React, { PropsWithChildren } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { useRecoilValue } from 'recoil';
import themeStore from 'store/theme';

type ThemeStoreProps = typeof defaultProps;

const defaultProps = {};

const ThemeStoreProvider = (props: PropsWithChildren<ThemeStoreProps>) => {
  const { children } = props;
  const theme = useRecoilValue(themeStore.selectors.theme);

  return (
    <ThemeProvider theme={theme}>
      { children }
    </ThemeProvider>
  );
};

export default ThemeStoreProvider;
