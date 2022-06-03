import { useMemo, useState, useEffect, useRef } from 'react';
import { useRecoilTransactionObserver_UNSTABLE } from 'recoil';
import { IRecoilStore, RehydrationTuple } from './createStore';

export type StoreRehydration = null | { [key: string]: any };

enum LocalStateStatus {
  'IDLE',
  'FETCHING',
  'SUCCESS',
  'ERROR',
}

interface LocalStateRequests {
  initial: null | Promise<RehydrationTuple<any>[]>;
}

const localStateRequests: LocalStateRequests = {
  initial: null,
};

export const getLocalState = (stores: IRecoilStore<any, any, any>[]) => {
  const [localState, setLocalState] = useState<StoreRehydration>(null);
  const [status, setStatus] = useState(LocalStateStatus.IDLE);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    setStatus(LocalStateStatus.FETCHING);
    localStateRequests.initial = Promise.all(stores.map((store) => store.getInitialState()));
    localStateRequests.initial
      .then((rehydratedStores) => {
        const newLocalState = rehydratedStores.reduce((memo, rehydratedStore) => {
          if (rehydratedStore == null) return memo;
          const [key, value] = rehydratedStore;
          return { ...memo, [key]: value };
        }, {});
        setLocalState(newLocalState);
        setStatus(LocalStateStatus.SUCCESS);
        return newLocalState;
      })
      .catch((err) => {
        setError(err);
        setStatus(LocalStateStatus.ERROR);
      });
  }, []);

  switch (status) {
    case LocalStateStatus.SUCCESS:
      return localState;
    case LocalStateStatus.ERROR:
      throw error;
    case LocalStateStatus.FETCHING:
      throw localStateRequests.initial;
    case LocalStateStatus.IDLE:
      return null;
  }
};



interface IPersistProps {
  stores: IRecoilStore<any, any, any>[];
}


export const Persist = (props: IPersistProps) => {
  const { stores } = props;
  
  useRecoilTransactionObserver_UNSTABLE(async ({ snapshot }) => {
    stores.forEach((store) => store.syncState(snapshot));
  });

  return null;
};
