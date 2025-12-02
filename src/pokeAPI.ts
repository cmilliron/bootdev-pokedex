import { Cache, CacheEntry } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  cache: Cache;

  constructor(cacheInterval: number) {
    this.cache = new Cache(cacheInterval);
  }

  closeCache() {
    this.cache.stopReapLoop();
  }

  async fetchLocations(pageURL?: string | null): Promise<ShallowLocations> {
    const fullURL = pageURL || PokeAPI.baseURL + "/location-area";
    // console.log(fullURL);
    const cacheValue = this.cache.get<ShallowLocations>(fullURL);
    if (cacheValue) {
      console.log("cache");
      return cacheValue;
    }
    try {
      const rawResponse = await fetch(fullURL, {
        method: "GET",
      });
      console.log("fetch");
      const response = await rawResponse.json();
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      this.cache.add(fullURL, response);
      return response;
    } catch (error) {
      throw new Error(`Error fetching locations: ${(error as Error).message}`);
    }
  }

  async fetchLocation(locationName: string): Promise<void> {
    //   Promise<Location>
    // implement this
  }
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  // add properties here
};
