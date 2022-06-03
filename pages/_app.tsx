import React, { Suspense, PropsWithChildren } from 'react';
import { MutableSnapshot, RecoilRoot } from 'recoil';
import isEmpty from 'lodash-es/isEmpty';
import merge from 'lodash-es/merge';
import { getLocalState, Persist, StoreRehydration } from 'store/persist';
import { SpinnerFullScreen } from 'components/Loading';
import ThemeProvider from 'components/ThemeProvider';
import GlobalStyles from 'components/GlobalStyles';
import themeStore from 'store/theme';
import './global.scss';


/* === RECOIL STORE CONFIG === */
const activeStores = [
  themeStore,
];

type Store = typeof activeStores[number];
type StoreTuple = [Store, StoreRehydration];

interface RehydrationChamberProps {
  stores: StoreTuple[];
}

const RehydrationChamber = (props: PropsWithChildren<RehydrationChamberProps>) => {
  const { stores, children } = props;
  const storeList = stores.map((s) => s && s[0]);
  const localState = getLocalState(storeList);

  if (localState == null) {
    return null;
  }

  const initializeState = (snap: MutableSnapshot) => {
    stores.forEach((store) => {
      const m = merge(store[1] || {}, localState[store[0].key]);
      if (!isEmpty(m)) {
        store[0].setInitialState(snap, m);
      }
    });
  };

  return (
    <RecoilRoot initializeState={initializeState}>
      <Persist stores={storeList} />
      { children }
    </RecoilRoot>
  );
};


/* === MAIN APP === */
interface IAppProps {
  Component: React.ComponentType;
  pageProps: {
    [key: string]: any;
  };
  props: {
    [key: string]: any;
  };
}


export const App = ({ Component, pageProps, ...rest }: IAppProps) => {
  const stores: StoreTuple[] = [
    [themeStore, null],
  ];

  return (
    <>
      <link rel="stylesheet" href="https://use.typekit.net/tku5oyg.css"></link>
      <GlobalStyles />

      <Suspense fallback={<SpinnerFullScreen />}>
        <RehydrationChamber stores={stores}>
          <ThemeProvider>
            <Suspense fallback={<SpinnerFullScreen />}>
              <Component {...pageProps} />
            </Suspense>
          </ThemeProvider>
        </RehydrationChamber>
      </Suspense>
    </>
  );
};

export default App;
