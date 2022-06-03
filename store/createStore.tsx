import { Snapshot, RecoilValue, RecoilState, MutableSnapshot } from 'recoil';
import Storage from 'services/Storage';
import { StoreRehydration } from './persist';


export type Migration<T = any> = (oldState: any) => T;
export type RehydrationTuple<T> = [string, T];

interface IStateMap {
  [key: string]: RecoilValue<any>;
};

export interface IRecoilStoreOptions<State extends IStateMap, Selectors, Effects> {
  key: string;
  version: number;
  persist: (keyof State)[];
  state: State;
  effects: Effects;
  selectors: Selectors;
  migrations: Migration<State>[];
}

export interface IRecoilStore<State extends IStateMap, Selectors, Effects> extends IRecoilStoreOptions<State, Selectors, Effects> {
  getInitialState: () => Promise<RehydrationTuple<State | null>>;
  setInitialState: (snap: MutableSnapshot, value: StoreRehydration) => void;
  syncState: (snap: Snapshot) => any;
}



function createStore<S extends IStateMap, SS, E>(options: IRecoilStoreOptions<S, SS, E>): IRecoilStore<S, SS, E> {
  // when a store version is updated, find the most recent old version, and run it through
  // migrations
  const getLastState = async (): Promise<S | null> => {
    let version = options.version;
    let lastState = null;
    
    while (version > 0 && lastState === null) {
      version -= 1;
      const key = `${version}.${options.key}`;
      lastState = await Storage.getItem(key);
    }

    await Storage.removeItem(`${version}.${options.key}`);

    const migrations = options.migrations.slice(version, options.version);

    return migrations.reduce((memo, migration) => migration(memo), lastState) as S;
  };

  const getInitialState = async (): Promise<RehydrationTuple<S | null>> => {
    const storeKey = `${options.version}.${options.key}`;
    try {
      const storedValue = await Storage.getItem(storeKey) as S;
      return [options.key, storedValue];
    } catch (err) {
      const migratedValue = await getLastState();
      return [options.key, migratedValue];
    }
  };

  const syncState = (snap: Snapshot) => {
    const state: { [key: string]: any } = {};
    const key = `${options.version}.${options.key}`;
    
    for (const stateKey of options.persist) {
      state[stateKey as string] = snap.getLoadable(options.state[stateKey]).contents;
    }
    
    Storage.setItem(key, state);
  };

  const setInitialState = (snap: MutableSnapshot, value: StoreRehydration) => {
    if (value == null) return null;
    Object.keys(options.state).forEach((atomKey) => {
      const state = options.state[atomKey] as RecoilState<any>;
      if (state == null || state.constructor.name === 'RecoilValueReadOnly') {
        return;
      }
      snap.set(state, value[atomKey as string]);
    });
  };

  return {
    ...options,
    syncState,
    getInitialState,
    setInitialState,
  };
}

export default createStore;
