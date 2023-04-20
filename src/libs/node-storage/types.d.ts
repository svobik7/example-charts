declare module 'node-storage' {
  class Storage {
    constructor(path: string);
    get<T = unknown>(key: string): T;
    put(key: string, value: unknown): void;
  }

  export default Storage;
}
