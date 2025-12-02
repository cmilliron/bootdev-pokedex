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
    this.#startReapLoop();
  }

  add<T>(key: string, val: T) {
    const cacheEntry: CacheEntry<T> = {
      createdAt: Date.now(),
      val: val,
    };
    this.#cache.set(key, cacheEntry);
  }

  get<T>(key: string): T | undefined {
    if (this.#cache.has(key)) {
      const cacheItem: CacheEntry<T> = this.#cache.get(key) as CacheEntry<T>;
      return cacheItem.val;
    }
    return undefined;
  }

  #reap() {
    // console.log("in Reap", this.#cache.size);
    for (let key of this.#cache.keys()) {
      const cacheItem = this.#cache.get(key);
      //   console.log("Debuing", cacheItem?.createdAt);
      if (cacheItem) {
        if (cacheItem.createdAt < Date.now() - this.#interval) {
          this.#cache.delete(key);
        }
      }
    }
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}
