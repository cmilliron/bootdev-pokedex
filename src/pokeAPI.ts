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
      console.log("fetch")
      const rawResponse = await fetch(fullURL, {
        method: "GET",
      });
      if (!rawResponse.ok) {
        throw new Error(`${rawResponse.status} ${rawResponse.statusText}`);
      }
      const response = await rawResponse.json();
      // console.log(response)
      this.cache.add(fullURL, response);
      return response;
    } catch (error) {
      throw new Error(`Error fetching locations: ${(error as Error).message}`);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const fullURL = `${PokeAPI.baseURL}/location-area/${locationName}`;
    console.log(fullURL)
    const cacheValue = this.cache.get<Location>(fullURL);
    if (cacheValue) {
      console.log('cache')
      return cacheValue;
    }
    try {
      const rawResponse = await fetch(fullURL, {
        method: "GET",
      });
      if (!rawResponse.ok) {
        throw new Error(`${rawResponse.status} ${rawResponse.statusText}`);
      }
      const response = await rawResponse.json();
      this.cache.add(fullURL, response);
      console.log('fetch')
      return response;
    } catch (error) {
      throw new Error(`Error fetching location: ${(error as Error).message}`);
    }
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
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};
