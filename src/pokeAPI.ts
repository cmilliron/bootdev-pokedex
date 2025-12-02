import { Cache, CacheEntry } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  cache: Cache;

  constructor() {
    this.cache = new Cache(5000);
  }

  async fetchLocations(pageURL?: string | null): Promise<ShallowLocations> {
    const fullURL = pageURL ? pageURL : PokeAPI.baseURL + "/location-area";
    // console.log(fullURL);
    if (this.cache.get(fullURL)) {
      console.log("cache");
      const cacheValue = this.cache.get(fullURL) as ShallowLocations;
      return cacheValue;
    }
    // setTimeout(async () => {
    // }, 500);
    const rawResponse = await fetch(fullURL, {
      method: "GET",
    });
    console.log("fetch");
    const response = await rawResponse.json();
    this.cache.add(fullURL, response);
    return response;
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
