export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReadLoop();
  }

  add<T>(key: string, val: T) {
    const cacheEntry: CacheEntry<T> = {
      createdAt: Date.now(),
      val: val,
    };
    this.#cache.set(key, cacheEntry);
  }

  get<T>(key: string): CacheEntry<T> | undefined {
    if (this.#cache.has(key)) {
      return this.#cache.get(key);
    }
    return undefined;
  }

  #reap() {
    for (let key in this.#cache) {
      const cacheItem = this.get(key);
      if (cacheItem) {
        if (cacheItem.createdAt < Date.now() - this.#interval) {
          this.#cache.delete(key);
        }
      }
    }
  }

  #startReadLoop() {
    this.#reapIntervalId = setInterval(this.#reap, this.#interval);
  }

  stopReadLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}
