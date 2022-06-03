import React, { PropsWithChildren } from 'react';
import { DialogProvider, DialogRoot } from 'components/Dialog';
import { LoadingFullScreen } from 'components/Loading';
import ErrorBoundary from 'components/ErrorBoundary';
import Background from 'components/Background';
import { Main } from 'components/Section';
import Toggle from 'components/Toggle';
import AppBar from 'components/AppBar';
import SEO from 'components/SEO';
import { useRecoilState } from 'recoil';
import themeStore from 'store/theme';
import Flex from './Flex';


interface LayoutProps {
  backgroundColor?: string;
  preserveColors?: boolean;
  className?: string;
}

const defaultProps = {
  backgroundColor: 'background',
};

const Layout = (props: PropsWithChildren<LayoutProps> = defaultProps) => {
  const { children, backgroundColor, className, preserveColors = false, ...rest } = Object.assign({}, defaultProps, props);
  const [themeName, setThemeName] = useRecoilState(themeStore.state.themeName);

  return (
    <Background
      className={className}
      backgroundColor={backgroundColor}
      minHeight="100vh"
      {...rest} // for data- attributes
    >
      <SEO />
      
      <AppBar>
        <Flex width='100%' flexDirection='row' justifyContent={'flex-end'}>
          <Toggle
            choices={[{label: 'light', value: 'light' }, {label: 'dark', value: 'dark' }]}
            selection={themeName}
            onToggle={() => themeName === 'light' ? setThemeName('dark') : setThemeName('light')}
          />
        </Flex>
      </AppBar>

      <DialogProvider>
        <ErrorBoundary>
          <LoadingFullScreen>
            <Main minHeight={'64vh'}>
              {children}
            </Main>
          </LoadingFullScreen>
        </ErrorBoundary>

        <DialogRoot />
      </DialogProvider>
    </Background>
  );
};

export default Layout;
