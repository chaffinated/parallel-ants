
export type FunctionWithCallback<T = any> = (func: (value: T) => void) => Promise<T>;

export function callbackToPromise<T = any>(func: FunctionWithCallback<T>) {
  return () => new Promise<T>((res, rej) => {
    try {
      func(res);
    } catch(err) {
      rej(err);
    }
  });
}
