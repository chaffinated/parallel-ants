import { useState, useCallback, useEffect } from 'react';
import { NetworkRequestStatus } from 'types/network';

export type AsyncRequest<T = any> = {
  status: NetworkRequestStatus;
  error: Error | null;
  data: T | null;
  fetch?: () => Promise<T | null>;
  reset?: () => void;
}


export function useAsync<T = any>(func: () => Promise<T>): AsyncRequest<T> {
  const [request, setRequest] = useState<AsyncRequest<T>>({
    status: NetworkRequestStatus.IDLE,
    error: null,
    data: null,
  });

  const reset = () => {
    setRequest({ ...request, status: NetworkRequestStatus.IDLE, data: null });
  };

  useEffect(() => {
    setRequest(() => ({
      ...request,
      data: null,
      status: NetworkRequestStatus.FETCHING,
      error: null,
    }));
    func()
      .then((data) => setRequest(() => ({ ...request, status: NetworkRequestStatus.SUCCESS, error: null, data })))
      .catch((err) => setRequest(() => ({ ...request, status: NetworkRequestStatus.ERROR, error: err })));
  }, [func]);

  return {
    ...request,
    reset,
  };
}


export function useAsyncHandler<T>(func: () => Promise<T>): AsyncRequest<T> {
  const fetch = () => {
    setRequest(() => ({
      ...request,
      status: NetworkRequestStatus.FETCHING,
      error: null,
    }));
    return func()
      .then((data) => {
        setRequest(() => ({ ...request, data, status: NetworkRequestStatus.SUCCESS, error: null }));
        return data;
      })
      .catch((err) => {
        setRequest(() => ({ ...request, status: NetworkRequestStatus.ERROR, error: err }));
        return null;
      });
  };

  const reset = () => setRequest({ ...request, status: NetworkRequestStatus.IDLE });

  const [request, setRequest] = useState<AsyncRequest<T>>({
    status: NetworkRequestStatus.IDLE,
    error: null,
    data: null,
  });

  return {
    ...request,
    fetch,
    reset: reset,
  };
}