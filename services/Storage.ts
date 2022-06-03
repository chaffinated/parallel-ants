import LocalForage from 'localforage';

interface ILocalForageInitOptions {}
type LocalForageIterator<T, U> = (value: T, key: string, i: number) => U;

const NodeStorage = {
  clear() {
    // no op
    return Promise.resolve();
  },
  getItem(key: string) {
    // Custom implementation here...
    return Promise.resolve(null);
  },
  iterate<T, U>(iterator: LocalForageIterator<T, U>): Promise<U> {
    // Custom implementation here...
    return Promise.resolve(null as unknown as U);
  },
  key(n: number) {
    // Custom implementation here...
    return Promise.resolve('');
  },
  keys() {
    // no op
    return Promise.resolve([]);
  },
  length() {
    // no op
    return Promise.resolve(0);
  },
  removeItem(key: string) {
    return Promise.resolve();
  },
  setItem(key: string, value: any) {
    // Custom implementation here...
    return Promise.resolve(value);
  },
};

const Storage = !process.browser ? NodeStorage : LocalForage;

export default Storage;
